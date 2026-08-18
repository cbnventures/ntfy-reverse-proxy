import { REGEX_TITLE_PART_SUFFIX } from '../../lib/regex.js';

import type {
  Worker_Pipeline_Send_Attachment,
  Worker_Pipeline_Send_AttachmentHeaders,
  Worker_Pipeline_Send_FallbackDeliveryNote,
  Worker_Pipeline_Send_FallbackResults,
  Worker_Pipeline_Send_Filename,
  Worker_Pipeline_Send_IsFallback,
  Worker_Pipeline_Send_Messages,
  Worker_Pipeline_Send_MessagesToSend,
  Worker_Pipeline_Send_Mode,
  Worker_Pipeline_Send_Options,
  Worker_Pipeline_Send_OrderedServers,
  Worker_Pipeline_Send_PrimaryServer,
  Worker_Pipeline_Send_Results,
  Worker_Pipeline_Send_Returns,
  Worker_Pipeline_Send_Send_BaseTitle,
  Worker_Pipeline_Send_Send_CharBytes,
  Worker_Pipeline_Send_Send_CombinedBody,
  Worker_Pipeline_Send_Send_CombinedByteLength,
  Worker_Pipeline_Send_Send_CurrentBytes,
  Worker_Pipeline_Send_Send_CurrentChunk,
  Worker_Pipeline_Send_Send_Encoder,
  Worker_Pipeline_Send_Send_FallbackNote,
  Worker_Pipeline_Send_Send_NewTotal,
  Worker_Pipeline_Send_Send_OverflowChunk,
  Worker_Pipeline_Send_Send_RenumberedMessages,
  Worker_Pipeline_Send_SendToServer_Attachment,
  Worker_Pipeline_Send_SendToServer_AttachmentErrorMessage,
  Worker_Pipeline_Send_SendToServer_AttachmentHeaders,
  Worker_Pipeline_Send_SendToServer_AttachmentRequestHeaders,
  Worker_Pipeline_Send_SendToServer_AttachmentResponse,
  Worker_Pipeline_Send_SendToServer_ErrorMessage,
  Worker_Pipeline_Send_SendToServer_Filename,
  Worker_Pipeline_Send_SendToServer_Headers,
  Worker_Pipeline_Send_SendToServer_LastStatus,
  Worker_Pipeline_Send_SendToServer_Messages,
  Worker_Pipeline_Send_SendToServer_PartIndex,
  Worker_Pipeline_Send_SendToServer_PartLabel,
  Worker_Pipeline_Send_SendToServer_Response,
  Worker_Pipeline_Send_SendToServer_Server,
  Worker_Pipeline_Send_SendToServer_Stages,
  Worker_Pipeline_Send_SendToServer_Topic,
  Worker_Pipeline_Send_SendToServer_TotalParts,
  Worker_Pipeline_Send_SendToServer_Url,
  Worker_Pipeline_Send_SendToServer_VisitorIp,
  Worker_Pipeline_Send_ServerResult,
  Worker_Pipeline_Send_Servers,
  Worker_Pipeline_Send_Topic,
  Worker_Pipeline_Send_ToServerReturns,
  Worker_Pipeline_Send_VisitorIp,
} from '../../types/worker/pipeline/send.d.ts';

/**
 * Worker - Pipeline - Send - Max Bytes.
 *
 * Maximum UTF-8 byte length allowed per notification part,
 * matching the split pipeline's chunk size budget.
 *
 * @since 2.1.0
 */
const MAX_BYTES = 4000;

/**
 * Worker - Pipeline - Send - To Server.
 *
 * Delivers one or more message parts and an optional attachment
 * to a single ntfy server, recording each stage outcome.
 *
 * @since 2.0.0
 */
async function sendToServer(
  server: Worker_Pipeline_Send_SendToServer_Server,
  messages: Worker_Pipeline_Send_SendToServer_Messages,
  topic: Worker_Pipeline_Send_SendToServer_Topic,
  visitorIp?: Worker_Pipeline_Send_SendToServer_VisitorIp,
  attachment?: Worker_Pipeline_Send_SendToServer_Attachment,
  filename?: Worker_Pipeline_Send_SendToServer_Filename,
  attachmentHeaders?: Worker_Pipeline_Send_SendToServer_AttachmentHeaders,
): Worker_Pipeline_Send_ToServerReturns {
  const stages: Worker_Pipeline_Send_SendToServer_Stages = [];
  const url: Worker_Pipeline_Send_SendToServer_Url = `${server['server']}/${topic}`;
  let lastStatus: Worker_Pipeline_Send_SendToServer_LastStatus = 0;

  const totalParts: Worker_Pipeline_Send_SendToServer_TotalParts = messages.length;

  let partIndex: Worker_Pipeline_Send_SendToServer_PartIndex = 0;

  for (const message of messages) {
    const partLabel: Worker_Pipeline_Send_SendToServer_PartLabel = (totalParts > 1) ? `stage-1 (${String(partIndex + 1)}/${String(totalParts)})` : 'stage-1';
    const headers: Worker_Pipeline_Send_SendToServer_Headers = {
      ...message['headers'],
      Authorization: `Bearer ${server['token']}`,
    };

    if (visitorIp !== undefined) {
      Reflect.set(headers, 'X-Forwarded-For', visitorIp);
    }

    try {
      const response: Worker_Pipeline_Send_SendToServer_Response = await fetch(url, {
        method: 'POST',
        headers,
        body: message['body'],
      });

      lastStatus = response['status'];

      if (response['ok'] === false) {
        stages.push(`${partLabel}: failed (HTTP ${String(response['status'])})`);

        return {
          name: server['name'],
          success: false,
          status: response['status'],
          stages,
          error: `HTTP ${String(response['status'])}`,
        };
      }

      stages.push(`${partLabel}: ok`);
    } catch (err) {
      const errorMessage: Worker_Pipeline_Send_SendToServer_ErrorMessage = (err instanceof Error) ? err.message : 'Unknown error';

      stages.push(`${partLabel}: failed (${errorMessage})`);

      return {
        name: server['name'],
        success: false,
        status: 0,
        stages,
        error: errorMessage,
      };
    }

    partIndex += 1;
  }

  if (attachment !== undefined) {
    const attachmentRequestHeaders: Worker_Pipeline_Send_SendToServer_AttachmentRequestHeaders = {
      Authorization: `Bearer ${server['token']}`,
      ...attachmentHeaders,
    };

    if (visitorIp !== undefined) {
      Reflect.set(attachmentRequestHeaders, 'X-Forwarded-For', visitorIp);
    }

    if (filename !== undefined) {
      Reflect.set(attachmentRequestHeaders, 'X-Filename', filename);
    }

    try {
      const attachmentResponse: Worker_Pipeline_Send_SendToServer_AttachmentResponse = await fetch(url, {
        method: 'PUT',
        headers: attachmentRequestHeaders,
        body: attachment,
      });

      lastStatus = attachmentResponse['status'];

      if (attachmentResponse['ok'] === false) {
        stages.push(`stage-2: failed (HTTP ${String(attachmentResponse['status'])})`);

        return {
          name: server['name'],
          success: false,
          status: attachmentResponse['status'],
          stages,
          error: `HTTP ${String(attachmentResponse['status'])}`,
        };
      }

      stages.push('stage-2: ok');
    } catch (err) {
      const attachmentErrorMessage: Worker_Pipeline_Send_SendToServer_AttachmentErrorMessage = (err instanceof Error) ? err.message : 'Unknown error';

      stages.push(`stage-2: failed (${attachmentErrorMessage})`);

      return {
        name: server['name'],
        success: false,
        status: 0,
        stages,
        error: attachmentErrorMessage,
      };
    }
  }

  return {
    name: server['name'],
    success: true,
    status: lastStatus,
    stages,
  };
}

/**
 * Worker - Pipeline - Send.
 *
 * Orchestrates delivery across all configured servers using
 * either send-all or send-once-with-fallback strategy.
 *
 * @since 2.0.0
 */
async function send(options: Worker_Pipeline_Send_Options): Worker_Pipeline_Send_Returns {
  const messages: Worker_Pipeline_Send_Messages = options['messages'];
  const servers: Worker_Pipeline_Send_Servers = options['servers'];
  const primaryServer: Worker_Pipeline_Send_PrimaryServer = options['primaryServer'];
  const topic: Worker_Pipeline_Send_Topic = options['topic'];
  const mode: Worker_Pipeline_Send_Mode = options['mode'];
  const visitorIp: Worker_Pipeline_Send_VisitorIp = options['visitorIp'];
  const attachment: Worker_Pipeline_Send_Attachment = options['attachment'];
  const filename: Worker_Pipeline_Send_Filename = options['filename'];
  const attachmentHeaders: Worker_Pipeline_Send_AttachmentHeaders = options['attachmentHeaders'];

  if (mode === 'send-all') {
    const results: Worker_Pipeline_Send_Results = await Promise.all(servers.map((server) => sendToServer(server, messages, topic, visitorIp, attachment, filename, attachmentHeaders)));

    return {
      results,
      fallbackUsed: false,
    };
  }

  const orderedServers: Worker_Pipeline_Send_OrderedServers = [
    primaryServer,
    ...servers.filter((server) => server['name'] !== primaryServer['name']),
  ];

  const fallbackResults: Worker_Pipeline_Send_FallbackResults = [];

  for (const server of orderedServers) {
    const isFallback: Worker_Pipeline_Send_IsFallback = server['name'] !== primaryServer['name'];
    let messagesToSend: Worker_Pipeline_Send_MessagesToSend = messages;

    if (isFallback === true && messages.length > 0) {
      const fallbackNote: Worker_Pipeline_Send_Send_FallbackNote = `\u26A0\uFE0F Primary server "${primaryServer['name']}" was unreachable. This notification was delivered via "${server['name']}".\n\n`;
      const combinedBody: Worker_Pipeline_Send_Send_CombinedBody = `${fallbackNote}${messages[0]!['body']}`;
      const encoder: Worker_Pipeline_Send_Send_Encoder = new TextEncoder();
      const combinedByteLength: Worker_Pipeline_Send_Send_CombinedByteLength = encoder.encode(combinedBody).length;

      if (combinedByteLength > MAX_BYTES) {
        let currentChunk: Worker_Pipeline_Send_Send_CurrentChunk = '';
        let currentBytes: Worker_Pipeline_Send_Send_CurrentBytes = 0;

        for (const char of combinedBody) {
          const charBytes: Worker_Pipeline_Send_Send_CharBytes = encoder.encode(char).length;

          if (currentBytes + charBytes > MAX_BYTES) {
            break;
          }

          currentChunk += char;
          currentBytes += charBytes;
        }

        const overflowChunk: Worker_Pipeline_Send_Send_OverflowChunk = combinedBody.slice(currentChunk.length);
        const baseTitle: Worker_Pipeline_Send_Send_BaseTitle = (messages[0]!['headers']['X-Title'] ?? 'Message').replace(new RegExp(REGEX_TITLE_PART_SUFFIX), '');
        const newTotal: Worker_Pipeline_Send_Send_NewTotal = messages.length + 1;

        const renumberedMessages: Worker_Pipeline_Send_Send_RenumberedMessages = [
          {
            body: currentChunk,
            headers: {
              ...messages[0]!['headers'],
              'X-Title': `${baseTitle} (1/${newTotal})`,
            },
          },
          {
            body: overflowChunk,
            headers: {
              ...messages[0]!['headers'],
              'X-Title': `${baseTitle} (2/${newTotal})`,
            },
          },
          ...messages.slice(1).map((msg, index) => ({
            body: msg['body'],
            headers: {
              ...msg['headers'],
              'X-Title': `${baseTitle} (${index + 3}/${newTotal})`,
            },
          })),
        ];

        messagesToSend = renumberedMessages;
      } else {
        messagesToSend = [
          {
            body: combinedBody,
            headers: messages[0]!['headers'],
          },
          ...messages.slice(1),
        ];
      }
    }

    const serverResult: Worker_Pipeline_Send_ServerResult = await sendToServer(server, messagesToSend, topic, visitorIp, attachment, filename, attachmentHeaders);

    fallbackResults.push(serverResult);

    if (serverResult['success'] === true) {
      const fallbackDeliveryNote: Worker_Pipeline_Send_FallbackDeliveryNote = `Delivered via fallback server "${server['name']}"`;

      return {
        results: fallbackResults,
        fallbackUsed: isFallback,
        fallbackNote: (isFallback === true) ? fallbackDeliveryNote : undefined,
      };
    }
  }

  return {
    results: fallbackResults,
    fallbackUsed: false,
  };
}

export {
  send,
};

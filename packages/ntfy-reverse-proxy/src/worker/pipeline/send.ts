import type {
  WorkerPipelineSendAttachment,
  WorkerPipelineSendAttachmentHeaders,
  WorkerPipelineSendErrorMessage,
  WorkerPipelineSendFallbackNote,
  WorkerPipelineSendFilename,
  WorkerPipelineSendFirstMessage,
  WorkerPipelineSendHeaders,
  WorkerPipelineSendIsFallback,
  WorkerPipelineSendLastStatus,
  WorkerPipelineSendMessages,
  WorkerPipelineSendMessagesToSend,
  WorkerPipelineSendMode,
  WorkerPipelineSendModifiedMessages,
  WorkerPipelineSendOptions,
  WorkerPipelineSendOrderedServers,
  WorkerPipelineSendPartIndex,
  WorkerPipelineSendPartLabel,
  WorkerPipelineSendPrimaryServer,
  WorkerPipelineSendResponse,
  WorkerPipelineSendResultsList,
  WorkerPipelineSendReturns,
  WorkerPipelineSendSendAllResults,
  WorkerPipelineSendServerResult,
  WorkerPipelineSendServers,
  WorkerPipelineSendStage,
  WorkerPipelineSendStages,
  WorkerPipelineSendTopic,
  WorkerPipelineSendToServerAttachment,
  WorkerPipelineSendToServerAttachmentHeaders,
  WorkerPipelineSendToServerFilename,
  WorkerPipelineSendToServerMessages,
  WorkerPipelineSendToServerReturns,
  WorkerPipelineSendToServerServer,
  WorkerPipelineSendToServerTopic,
  WorkerPipelineSendToServerVisitorIp,
  WorkerPipelineSendTotalParts,
  WorkerPipelineSendUrl,
  WorkerPipelineSendVisitorIp,
} from '../../types/worker/pipeline/send.d.ts';

/**
 * Worker - Pipeline - Send - To Server.
 *
 * Delivers one or more message parts and an optional attachment
 * to a single ntfy server, recording each stage outcome.
 *
 * @since 2.0.0
 */
async function sendToServer(
  server: WorkerPipelineSendToServerServer,
  messages: WorkerPipelineSendToServerMessages,
  topic: WorkerPipelineSendToServerTopic,
  visitorIp?: WorkerPipelineSendToServerVisitorIp,
  attachment?: WorkerPipelineSendToServerAttachment,
  filename?: WorkerPipelineSendToServerFilename,
  attachmentHeaders?: WorkerPipelineSendToServerAttachmentHeaders,
): WorkerPipelineSendToServerReturns {
  const stages: WorkerPipelineSendStages = [];
  const url: WorkerPipelineSendUrl = `${server['server']}/${topic}`;
  let lastStatus: WorkerPipelineSendLastStatus = 0;

  const totalParts: WorkerPipelineSendTotalParts = messages.length;

  let partIndex: WorkerPipelineSendPartIndex = 0;

  for (const message of messages) {
    const partLabel: WorkerPipelineSendPartLabel = (totalParts > 1) ? `stage-1 (${String(partIndex + 1)}/${String(totalParts)})` : 'stage-1';
    const headers: WorkerPipelineSendHeaders = {
      ...message['headers'],
      Authorization: `Bearer ${server['token']}`,
    };

    if (visitorIp !== undefined) {
      Reflect.set(headers, 'X-Forwarded-For', visitorIp);
    }

    try {
      const response: WorkerPipelineSendResponse = await fetch(url, {
        method: 'POST',
        headers,
        body: message['body'],
      });

      lastStatus = response.status;

      if (response.ok === false) {
        const stage: WorkerPipelineSendStage = `${partLabel}: failed (HTTP ${String(response.status)})`;

        stages.push(stage);

        return {
          name: server['name'],
          success: false,
          status: response.status,
          stages,
          error: `HTTP ${String(response.status)}`,
        };
      }

      const okStage: WorkerPipelineSendStage = `${partLabel}: ok`;

      stages.push(okStage);
    } catch (err) {
      const errorMessage: WorkerPipelineSendErrorMessage = (err instanceof Error) ? err.message : 'Unknown error';
      const stage: WorkerPipelineSendStage = `${partLabel}: failed (${errorMessage})`;

      stages.push(stage);

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
    const headers: WorkerPipelineSendHeaders = {
      Authorization: `Bearer ${server['token']}`,
      ...attachmentHeaders,
    };

    if (visitorIp !== undefined) {
      Reflect.set(headers, 'X-Forwarded-For', visitorIp);
    }

    if (filename !== undefined) {
      Reflect.set(headers, 'X-Filename', filename);
    }

    try {
      const response: WorkerPipelineSendResponse = await fetch(url, {
        method: 'PUT',
        headers,
        body: attachment,
      });

      lastStatus = response.status;

      if (response.ok === false) {
        const stage: WorkerPipelineSendStage = `stage-2: failed (HTTP ${String(response.status)})`;

        stages.push(stage);

        return {
          name: server['name'],
          success: false,
          status: response.status,
          stages,
          error: `HTTP ${String(response.status)}`,
        };
      }

      const okStage: WorkerPipelineSendStage = 'stage-2: ok';

      stages.push(okStage);
    } catch (err) {
      const errorMessage: WorkerPipelineSendErrorMessage = (err instanceof Error) ? err.message : 'Unknown error';
      const stage: WorkerPipelineSendStage = `stage-2: failed (${errorMessage})`;

      stages.push(stage);

      return {
        name: server['name'],
        success: false,
        status: 0,
        stages,
        error: errorMessage,
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
async function send(options: WorkerPipelineSendOptions): WorkerPipelineSendReturns {
  const messages: WorkerPipelineSendMessages = options['messages'];
  const servers: WorkerPipelineSendServers = options['servers'];
  const primaryServer: WorkerPipelineSendPrimaryServer = options['primaryServer'];
  const topic: WorkerPipelineSendTopic = options['topic'];
  const mode: WorkerPipelineSendMode = options['mode'];
  const visitorIp: WorkerPipelineSendVisitorIp = options['visitorIp'];
  const attachment: WorkerPipelineSendAttachment = options['attachment'];
  const filename: WorkerPipelineSendFilename = options['filename'];
  const attachmentHeaders: WorkerPipelineSendAttachmentHeaders = options['attachmentHeaders'];

  if (mode === 'send-all') {
    const results: WorkerPipelineSendSendAllResults = await Promise.all(servers.map((server) => sendToServer(server, messages, topic, visitorIp, attachment, filename, attachmentHeaders)));

    return {
      results,
      fallbackUsed: false,
    };
  }

  const orderedServers: WorkerPipelineSendOrderedServers = [
    primaryServer,
    ...servers.filter((server) => server['name'] !== primaryServer['name']),
  ];

  const results: WorkerPipelineSendResultsList = [];

  for (const server of orderedServers) {
    const isFallback: WorkerPipelineSendIsFallback = server['name'] !== primaryServer['name'];
    let messagesToSend: WorkerPipelineSendMessagesToSend = messages;

    if (isFallback === true && messages.length > 0) {
      const fallbackNote: WorkerPipelineSendFallbackNote = `\u26A0\uFE0F Primary server "${primaryServer['name']}" was unreachable. This notification was delivered via "${server['name']}".\n\n`;
      const firstMessage: WorkerPipelineSendFirstMessage = messages[0] as WorkerPipelineSendFirstMessage;
      const modifiedMessages: WorkerPipelineSendModifiedMessages = [
        {
          body: `${fallbackNote}${firstMessage['body']}`, headers: firstMessage['headers'],
        },
        ...messages.slice(1),
      ];

      messagesToSend = modifiedMessages;
    }

    const result: WorkerPipelineSendServerResult = await sendToServer(server, messagesToSend, topic, visitorIp, attachment, filename, attachmentHeaders);

    results.push(result);

    if (result['success'] === true) {
      const fallbackDeliveryNote: WorkerPipelineSendFallbackNote = `Delivered via fallback server "${server['name']}"`;

      return {
        results,
        fallbackUsed: isFallback,
        fallbackNote: (isFallback === true) ? fallbackDeliveryNote : undefined,
      };
    }
  }

  return {
    results,
    fallbackUsed: false,
  };
}

export {
  send,
};

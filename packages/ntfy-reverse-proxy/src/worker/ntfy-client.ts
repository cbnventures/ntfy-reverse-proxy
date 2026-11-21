import type {
  Worker_NtfyClient_Runner_BuildMessageHeaders_Headers,
  Worker_NtfyClient_Runner_BuildMessageHeaders_Message,
  Worker_NtfyClient_Runner_BuildMessageHeaders_Returns,
  Worker_NtfyClient_Runner_Publish_Headers,
  Worker_NtfyClient_Runner_Publish_Message,
  Worker_NtfyClient_Runner_Publish_Options,
  Worker_NtfyClient_Runner_Publish_Response,
  Worker_NtfyClient_Runner_Publish_Returns,
  Worker_NtfyClient_Runner_Publish_Server,
  Worker_NtfyClient_Runner_Publish_Topic,
  Worker_NtfyClient_Runner_ReadStoredMessage_Headers,
  Worker_NtfyClient_Runner_ReadStoredMessage_Priority,
  Worker_NtfyClient_Runner_ReadStoredMessage_Returns,
  Worker_NtfyClient_Runner_ReadStoredMessage_Stored,
  Worker_NtfyClient_Runner_ReadStoredTitle_AttachmentHeaders,
  Worker_NtfyClient_Runner_ReadStoredTitle_AttachmentTitle,
  Worker_NtfyClient_Runner_ReadStoredTitle_Returns,
  Worker_NtfyClient_Runner_Upload_Attachment,
  Worker_NtfyClient_Runner_Upload_Headers,
  Worker_NtfyClient_Runner_Upload_Options,
  Worker_NtfyClient_Runner_Upload_Response,
  Worker_NtfyClient_Runner_Upload_Returns,
  Worker_NtfyClient_Runner_Upload_Server,
  Worker_NtfyClient_Runner_Upload_Topic,
} from '../types/worker/ntfy-client.d.ts';

/**
 * Worker - Ntfy Client.
 *
 * Adapter for the ntfy publishing API. Header names, auth, and the request shape
 * stay here, and the pipeline only builds project-owned messages.
 *
 * @since 2.5.0
 */
export class Runner {
  /**
   * Worker - Ntfy Client - Build Message Headers.
   *
   * Turns a message's title, priority, tags, and other fields into the ntfy
   * headers for them, leaving out every field the message doesn't set.
   *
   * @param {Worker_NtfyClient_Runner_BuildMessageHeaders_Message} message - Message.
   *
   * @returns {Worker_NtfyClient_Runner_BuildMessageHeaders_Returns}
   *
   * @since 2.5.0
   */
  public static buildMessageHeaders(message: Worker_NtfyClient_Runner_BuildMessageHeaders_Message): Worker_NtfyClient_Runner_BuildMessageHeaders_Returns {
    const headers: Worker_NtfyClient_Runner_BuildMessageHeaders_Headers = {};

    if (message['title'] !== undefined) {
      Reflect.set(headers, 'X-Title', message['title']);
    }

    if (message['priority'] !== undefined) {
      Reflect.set(headers, 'X-Priority', String(message['priority']));
    }

    if (message['tags'] !== undefined) {
      Reflect.set(headers, 'X-Tags', message['tags'].join(','));
    }

    if (message['markdown'] !== undefined) {
      Reflect.set(headers, 'X-Markdown', String(message['markdown']));
    }

    if (message['icon'] !== undefined) {
      Reflect.set(headers, 'X-Icon', message['icon']);
    }

    if (message['actions'] !== undefined) {
      Reflect.set(headers, 'X-Actions', message['actions']);
    }

    if (message['attach'] !== undefined) {
      Reflect.set(headers, 'X-Attach', message['attach']);
    }

    if (message['filename'] !== undefined) {
      Reflect.set(headers, 'X-Filename', message['filename']);
    }

    return headers;
  }

  /**
   * Worker - Ntfy Client - Publish.
   *
   * Posts one message to a topic on a server with its access token. A network
   * failure throws; any HTTP answer comes back as its status.
   *
   * @param {Worker_NtfyClient_Runner_Publish_Server}  server  - Server.
   * @param {Worker_NtfyClient_Runner_Publish_Topic}   topic   - Topic.
   * @param {Worker_NtfyClient_Runner_Publish_Message} message - Message.
   * @param {Worker_NtfyClient_Runner_Publish_Options} options - Options.
   *
   * @returns {Worker_NtfyClient_Runner_Publish_Returns}
   *
   * @since 2.5.0
   */
  public static async publish(server: Worker_NtfyClient_Runner_Publish_Server, topic: Worker_NtfyClient_Runner_Publish_Topic, message: Worker_NtfyClient_Runner_Publish_Message, options: Worker_NtfyClient_Runner_Publish_Options): Worker_NtfyClient_Runner_Publish_Returns {
    const headers: Worker_NtfyClient_Runner_Publish_Headers = {
      ...Runner.buildMessageHeaders(message),
      Authorization: `Bearer ${server['token']}`,
    };

    if (options['sequenceId'] !== undefined) {
      Reflect.set(headers, 'X-Sequence-ID', options['sequenceId']);
    }

    if (options['forwardedFor'] !== undefined) {
      Reflect.set(headers, 'X-Forwarded-For', options['forwardedFor']);
    }

    const response: Worker_NtfyClient_Runner_Publish_Response = await fetch(`${server['server']}/${topic}`, {
      method: 'POST',
      headers,
      body: message['body'],
    });

    return {
      ok: response['ok'],
      status: response['status'],
    };
  }

  /**
   * Worker - Ntfy Client - Read Stored Message.
   *
   * Reads a message saved in the delivery outbox. Messages queued before this
   * version kept ntfy headers, so those are read back into message fields.
   *
   * @param {Worker_NtfyClient_Runner_ReadStoredMessage_Stored} stored - Stored.
   *
   * @returns {Worker_NtfyClient_Runner_ReadStoredMessage_Returns}
   *
   * @since 2.5.0
   */
  public static readStoredMessage(stored: Worker_NtfyClient_Runner_ReadStoredMessage_Stored): Worker_NtfyClient_Runner_ReadStoredMessage_Returns {
    if ('headers' in stored === false) {
      return stored;
    }

    const headers: Worker_NtfyClient_Runner_ReadStoredMessage_Headers = stored['headers'];
    const priority: Worker_NtfyClient_Runner_ReadStoredMessage_Priority = (headers['X-Priority'] !== undefined) ? Number(headers['X-Priority']) : undefined;

    return {
      body: stored['body'],
      ...((headers['X-Title'] !== undefined) ? { title: headers['X-Title'] } : {}),
      ...((priority !== undefined) ? { priority } : {}),
      ...((headers['X-Tags'] !== undefined) ? { tags: headers['X-Tags'].split(',') } : {}),
      ...((headers['X-Markdown'] !== undefined) ? { markdown: headers['X-Markdown'] === 'true' } : {}),
      ...((headers['X-Icon'] !== undefined) ? { icon: headers['X-Icon'] } : {}),
      ...((headers['X-Actions'] !== undefined) ? { actions: headers['X-Actions'] } : {}),
      ...((headers['X-Attach'] !== undefined) ? { attach: headers['X-Attach'] } : {}),
      ...((headers['X-Filename'] !== undefined) ? { filename: headers['X-Filename'] } : {}),
    };
  }

  /**
   * Worker - Ntfy Client - Read Stored Title.
   *
   * Reads an attachment's title saved in the delivery outbox, from the title
   * field or, for deliveries queued before this version, its ntfy headers.
   *
   * @param {Worker_NtfyClient_Runner_ReadStoredTitle_AttachmentTitle}   attachmentTitle   - Attachment title.
   * @param {Worker_NtfyClient_Runner_ReadStoredTitle_AttachmentHeaders} attachmentHeaders - Attachment headers.
   *
   * @returns {Worker_NtfyClient_Runner_ReadStoredTitle_Returns}
   *
   * @since 2.5.0
   */
  public static readStoredTitle(attachmentTitle: Worker_NtfyClient_Runner_ReadStoredTitle_AttachmentTitle, attachmentHeaders: Worker_NtfyClient_Runner_ReadStoredTitle_AttachmentHeaders): Worker_NtfyClient_Runner_ReadStoredTitle_Returns {
    if (attachmentTitle !== undefined) {
      return attachmentTitle;
    }

    return (attachmentHeaders !== undefined) ? attachmentHeaders['X-Title'] : undefined;
  }

  /**
   * Worker - Ntfy Client - Upload.
   *
   * Puts an attachment on a topic on a server with its access token, title, and
   * file name. A network failure throws; any HTTP answer comes back as its status.
   *
   * @param {Worker_NtfyClient_Runner_Upload_Server}     server     - Server.
   * @param {Worker_NtfyClient_Runner_Upload_Topic}      topic      - Topic.
   * @param {Worker_NtfyClient_Runner_Upload_Attachment} attachment - Attachment.
   * @param {Worker_NtfyClient_Runner_Upload_Options}    options    - Options.
   *
   * @returns {Worker_NtfyClient_Runner_Upload_Returns}
   *
   * @since 2.5.0
   */
  public static async upload(server: Worker_NtfyClient_Runner_Upload_Server, topic: Worker_NtfyClient_Runner_Upload_Topic, attachment: Worker_NtfyClient_Runner_Upload_Attachment, options: Worker_NtfyClient_Runner_Upload_Options): Worker_NtfyClient_Runner_Upload_Returns {
    const headers: Worker_NtfyClient_Runner_Upload_Headers = {
      Authorization: `Bearer ${server['token']}`,
    };

    if (options['title'] !== undefined) {
      Reflect.set(headers, 'X-Title', options['title']);
    }

    if (options['sequenceId'] !== undefined) {
      Reflect.set(headers, 'X-Sequence-ID', options['sequenceId']);
    }

    if (options['forwardedFor'] !== undefined) {
      Reflect.set(headers, 'X-Forwarded-For', options['forwardedFor']);
    }

    if (options['filename'] !== undefined) {
      Reflect.set(headers, 'X-Filename', options['filename']);
    }

    const response: Worker_NtfyClient_Runner_Upload_Response = await fetch(`${server['server']}/${topic}`, {
      method: 'PUT',
      headers,
      body: attachment,
    });

    return {
      ok: response['ok'],
      status: response['status'],
    };
  }
}

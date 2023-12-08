import { serializeError } from 'serialize-error';

import type {
  SendNtfyRequestContent,
  SendNtfyRequestReturns,
  SendNtfyRequestServer,
  SendNtfyRequestToken,
  SendNtfyRequestTopic,
} from '@/types/index.d.ts';

/**
 * Send ntfy request.
 *
 * @param {SendNtfyRequestContent} content - Content.
 * @param {SendNtfyRequestServer}  server  - Server.
 * @param {SendNtfyRequestTopic}   topic   - Topic.
 * @param {SendNtfyRequestToken}   token   - Token.
 *
 * @returns {SendNtfyRequestReturns}
 *
 * @since 1.0.0
 */
export async function sendNtfyRequest(content: SendNtfyRequestContent, server: SendNtfyRequestServer, topic: SendNtfyRequestTopic, token: SendNtfyRequestToken): SendNtfyRequestReturns {
  try {
    await fetch(
      `${server}/${topic}`,
      {
        body: [
          `${content.description}`,
          `${content.content}`,
          ...(content.ip !== null) ? [
            `Successful request originally initiated by user with IP address of ${content.ip}`,
          ] : [],
        ].join('\n\n'),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'text/plain',
          Markdown: 'yes',
          'X-Title': content.title,
        },
        method: 'POST',
      },
    );
  } catch (error) {
    console.error('sendNtfyRequest()', serializeError(error));

    return false;
  }

  return true;
}

import { serializeError } from 'serialize-error';

import type {
  SendNtfyAlertContent,
  SendNtfyAlertReturns,
  SendNtfyAlertServer,
  SendNtfyAlertToken,
  SendNtfyAlertTopic,
  SendNtfyRequestContent,
  SendNtfyRequestReturns,
  SendNtfyRequestServer,
  SendNtfyRequestToken,
  SendNtfyRequestTopic,
} from '@/types';

/**
 * Send ntfy alert.
 *
 * @param {SendNtfyAlertContent} content - Content.
 * @param {SendNtfyAlertServer}  server  - Server.
 * @param {SendNtfyAlertTopic}   topic   - Topic.
 * @param {SendNtfyAlertToken}   token   - Token.
 *
 * @returns {SendNtfyAlertReturns}
 *
 * @since 1.0.0
 */
export async function sendNtfyAlert(content: SendNtfyAlertContent, server: SendNtfyAlertServer, topic: SendNtfyAlertTopic, token: SendNtfyAlertToken): SendNtfyAlertReturns {
  try {
    await fetch(
      `${server}/${topic}`,
      {
        body: content,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'text/plain',
          'X-Title': 'Error occurred on "ntfy-reverse-proxy"',
        },
        method: 'POST',
      },
    );
  } catch (error) {
    console.error('sendNtfyAlert()', serializeError(error));

    return false;
  }

  return true;
}

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
          `${content.description}\n`,
          `${content.content}\n`,
        ].join('\n'),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'text/plain',
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

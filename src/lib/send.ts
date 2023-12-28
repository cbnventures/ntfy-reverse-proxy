import _ from 'lodash';

import { createNtfyHeaders } from '@/lib/utility.js';
import type {
  SendNtfyRequestsLastResponseSuccess,
  SendNtfyRequestsRequest,
  SendNtfyRequestsResponses,
  SendNtfyRequestsReturns,
} from '@/types/index.d.ts';

/**
 * Send ntfy requests.
 *
 * @param {SendNtfyRequestsRequest} request - Request.
 *
 * @returns {SendNtfyRequestsReturns}
 *
 * @since 1.0.0
 */
export async function sendNtfyRequests(request: SendNtfyRequestsRequest): SendNtfyRequestsReturns {
  const {
    body,
    cfProperties,
    headers,
    hostname,
    mode,
    servers,
    showVisitorInfo,
  } = request;

  const headerCfConnectingIp = headers.get('cf-connecting-ip');
  const headerXMarkdown = headers.get('x-markdown');
  const matchedServers = servers.filter((server) => server.subdomain === hostname.split('.')[0]);
  const responses: SendNtfyRequestsResponses = [];

  let lastResponseSuccess: SendNtfyRequestsLastResponseSuccess = null;

  for (let i = 0; i < matchedServers.length; i += 1) {
    // If config says to only "send-once", and last request was successful, stop here.
    if (mode === 'send-once' && lastResponseSuccess === true) {
      break;
    }

    try {
      // Only send if body is text or if user requested to show visitor info.
      if (
        body.type === 'text'
        || (
          showVisitorInfo
          && cfProperties !== undefined
        )
      ) {
        const isMarkdown = headerXMarkdown !== null && ['true', '1', 'yes'].includes(headerXMarkdown);
        const response = await fetch(
          `${matchedServers[i].server}/${matchedServers[i].topic}`,
          {
            body: [
              ...(body.type === 'binary') ? [
                [
                  'An attachment was received and will arrive shortly.',
                  ...(isMarkdown) ? [
                    'If the attachment did not arrive, change the `show_response_output` setting to `true` and try the same request again to see more information about the responses.',
                  ] : [
                    'If the attachment did not arrive, change the "show_response_output" setting to "true" and try the same request again to see more information about the responses.',
                  ],
                ].join('\n\n'),
              ] : [
                body.data,
              ],
              ...(showVisitorInfo && cfProperties !== undefined) ? [
                [
                  ...(isMarkdown) ? ['__« Incoming Request Details »__'] : ['« Incoming Request Details »'],
                  [
                    ...(isMarkdown) ? ['__IP address__'] : ['IP address'],
                    headerCfConnectingIp,
                  ].join(': '),
                  [
                    ...(isMarkdown) ? ['__Location__'] : ['Location'],
                    `${cfProperties.region} (country: ${cfProperties.country}, colo: ${cfProperties.colo})`,
                  ].join(': '),
                  [
                    ...(isMarkdown) ? ['__Coordinates__'] : ['Coordinates'],
                    `${cfProperties.latitude}, ${cfProperties.longitude}`,
                  ].join(': '),
                  [
                    ...(isMarkdown) ? ['__Provider__'] : ['Provider'],
                    `${cfProperties.asOrganization} (asn: ${cfProperties.asn})`,
                  ].join(': '),
                ].join('\n'),
              ] : [],
            ].join('\n\n'),
            headers: {
              Authorization: `Bearer ${matchedServers[i].token}`,
              ...createNtfyHeaders(1, body.type, headers, showVisitorInfo),
              ...(headerCfConnectingIp !== null) ? {
                'X-Forwarded-For': headerCfConnectingIp,
              } : {},
            },
            method: 'POST',
          },
        );

        // If response did not come back with a success.
        if (response.status !== 200) {
          // If config says to only "send-once", set "lastResponseSuccess" to false.
          if (mode === 'send-once') {
            lastResponseSuccess = false;
          }

          responses.push({
            success: false,
            response: {
              headers: Object.fromEntries(response.headers),
              ok: response.ok,
              status: response.status,
              statusText: response.statusText,
              text: await response.text(),
              url: response.url,
            },
          });

          // Attachment will skip sending since the first request to that server already failed.
          continue;
        }

        // If config says to only "send-once", set "lastResponseSuccess" to true.
        if (mode === 'send-once') {
          lastResponseSuccess = true;
        }

        responses.push({
          success: true,
          response: {
            headers: Object.fromEntries(response.headers),
            ok: response.ok,
            status: response.status,
            statusText: response.statusText,
            text: await response.text(),
            url: response.url,
          },
        });
      }

      // Send a request containing only the binary data.
      if (body.type === 'binary') {
        const response = await fetch(
          `${matchedServers[i].server}/${matchedServers[i].topic}`,
          {
            body: body.data,
            headers: {
              Authorization: `Bearer ${matchedServers[i].token}`,
              ...createNtfyHeaders(2, body.type, headers, showVisitorInfo),
              ...(headerCfConnectingIp !== null) ? {
                'X-Forwarded-For': headerCfConnectingIp,
              } : {},
            },
            method: 'PUT',
          },
        );

        // If response did not come back with a success.
        if (response.status !== 200) {
          responses.push({
            success: false,
            response: {
              headers: Object.fromEntries(response.headers),
              ok: response.ok,
              status: response.status,
              statusText: response.statusText,
              text: await response.text(),
              url: response.url,
            },
          });

          // Continue on to the next iteration.
          continue;
        }

        responses.push({
          success: true,
          response: {
            headers: Object.fromEntries(response.headers),
            ok: response.ok,
            status: response.status,
            statusText: response.statusText,
            text: await response.text(),
            url: response.url,
          },
        });
      }
    } catch (error) {
      // If config says to only "send-once", set "lastResponseSuccess" to false.
      if (mode === 'send-once') {
        lastResponseSuccess = false;
      }

      responses.push({
        success: false,
        response: (_.isError(error)) ? {
          message: error.message,
          stack: error.stack,
        } : {},
      });
    }
  }

  return responses;
}

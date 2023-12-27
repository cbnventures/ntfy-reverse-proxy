import _ from 'lodash';

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
  const headerCfConnectingIp = request.headers.get('cf-connecting-ip');
  const headerXActions = request.headers.get('x-actions');
  const headerXAttach = request.headers.get('x-attach');
  const headerXCache = request.headers.get('x-cache');
  const headerXCall = request.headers.get('x-call');
  const headerXClick = request.headers.get('x-click');
  const headerXDelay = request.headers.get('x-delay');
  const headerXEmail = request.headers.get('x-email');
  const headerXFilename = request.headers.get('x-filename');
  const headerXFirebase = request.headers.get('x-firebase');
  const headerXIcon = request.headers.get('x-icon');
  const headerXMarkdown = request.headers.get('x-markdown');
  const headerXPriority = request.headers.get('x-priority');
  const headerXTags = request.headers.get('x-tags');
  const headerXTitle = request.headers.get('x-title');
  const headerXUnifiedPush = request.headers.get('x-unifiedpush');
  const matchedServers = request.servers.filter((server) => server.subdomain === request.hostname.split('.')[0]);
  const responses: SendNtfyRequestsResponses = [];

  let lastResponseSuccess: SendNtfyRequestsLastResponseSuccess = null;

  for (let i = 0; i < matchedServers.length; i += 1) {
    // If config says to only "send-once", and last request was successful, stop here.
    if (request.mode === 'send-once' && lastResponseSuccess === true) {
      break;
    }

    try {
      const isMarkdown = headerXMarkdown !== null && ['true', '1', 'yes'].includes(headerXMarkdown);
      const response = await fetch(
        `${matchedServers[i].server}/${matchedServers[i].topic}`,
        {
          body: [
            request.content,
            ...(request.showVisitorInfo && request.cfProperties !== undefined) ? [
              [
                ...(isMarkdown) ? ['__« Incoming Request Details »__'] : ['« Incoming Request Details »'],
                [
                  ...(isMarkdown) ? ['__IP address__'] : ['IP address'],
                  headerCfConnectingIp,
                ].join(': '),
                [
                  ...(isMarkdown) ? ['__Location__'] : ['Location'],
                  `${request.cfProperties.region} (country: ${request.cfProperties.country}, colo: ${request.cfProperties.colo})`,
                ].join(': '),
                [
                  ...(isMarkdown) ? ['__Provider__'] : ['Provider'],
                  `${request.cfProperties.asOrganization} (asn: ${request.cfProperties.asn})`,
                ].join(': '),
              ].join('\n'),
            ] : [],
          ].join('\n\n'),
          headers: {
            Authorization: `Bearer ${matchedServers[i].token}`,
            ...(headerXActions !== null) ? {
              'X-Actions': headerXActions,
            } : {},
            ...(headerXAttach !== null) ? {
              'X-Attach': headerXAttach,
            } : {},
            ...(headerXCache !== null) ? {
              'X-Cache': headerXCache,
            } : {},
            ...(headerXCall !== null) ? {
              'X-Call': headerXCall,
            } : {},
            ...(headerXClick !== null) ? {
              'X-Click': headerXClick,
            } : {},
            ...(headerXDelay !== null) ? {
              'X-Delay': headerXDelay,
            } : {},
            ...(headerXEmail !== null) ? {
              'X-Email': headerXEmail,
            } : {},
            ...(headerXFilename !== null) ? {
              'X-Filename': headerXFilename,
            } : {},
            ...(headerXFirebase !== null) ? {
              'X-Firebase': headerXFirebase,
            } : {},
            ...(headerCfConnectingIp !== null) ? {
              'X-Forwarded-For': headerCfConnectingIp,
            } : {},
            ...(headerXIcon !== null) ? {
              'X-Icon': headerXIcon,
            } : {},
            ...(headerXMarkdown !== null) ? {
              'X-Markdown': headerXMarkdown,
            } : {},
            ...(headerXPriority !== null) ? {
              'X-Priority': headerXPriority,
            } : {},
            ...(headerXTags !== null) ? {
              'X-Tags': headerXTags,
            } : {},
            ...(headerXTitle !== null) ? {
              'X-Title': headerXTitle,
            } : {},
            ...(headerXUnifiedPush !== null) ? {
              'X-UnifiedPush': headerXUnifiedPush,
            } : {},
          },
          method: request.method,
        },
      );

      // If response did not come back with a success.
      if (response.status !== 200) {
        // If config says to only "send-once", set "lastResponseSuccess" to false.
        if (request.mode === 'send-once') {
          lastResponseSuccess = false;
        }

        responses.push({
          success: false,
          response: {
            body: response.body,
            headers: Object.fromEntries(response.headers),
            ok: response.ok,
            status: response.status,
            statusText: response.statusText,
            text: await response.text(),
            url: response.url,
          },
        });

        continue;
      }

      // If config says to only "send-once", set "lastResponseSuccess" to true.
      if (request.mode === 'send-once') {
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
    } catch (error) {
      // If config says to only "send-once", set "lastResponseSuccess" to false.
      if (request.mode === 'send-once') {
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

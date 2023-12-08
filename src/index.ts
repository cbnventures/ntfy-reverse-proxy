import { ntfyTopicArray } from '@/lib/regex.js';
import {
  envSchema,
  requestBodySchema,
  requestCfSchema,
  requestHeaderCfConnectingIpSchema,
  requestHeaderContentTypeSchema,
  requestHeaderUserAgentSchema,
  requestMethodSchema,
} from '@/lib/schema.js';
import { sendNtfyRequest } from '@/lib/send.js';
import { fetchRequestJson } from '@/lib/utility.js';
import type { FetchEnv, FetchRequest, FetchReturns } from '@/types/index.d.ts';

/**
 * Fetch.
 *
 * @param {FetchRequest} request - Request.
 * @param {FetchEnv}     env     - Env.
 *
 * @returns {FetchReturns}
 *
 * @since 1.0.0
 */
export async function fetch(request: FetchRequest, env: FetchEnv): FetchReturns {
  const requestBody = await fetchRequestJson(request);
  const requestCf = request.cf;
  const requestHeaderCfConnectingIp = request.headers.get('cf-connecting-ip');
  const requestHeaderContentType = request.headers.get('content-type');
  const requestHeaderUserAgent = request.headers.get('user-agent');
  const requestMethod = request.method;
  const requestUrl = new URL(request.url);

  // Redirect to HTTPS if not in development mode.
  if (requestUrl.hostname !== 'localhost' && requestUrl.protocol === 'http:') {
    requestUrl.protocol = 'https:';

    return Response.redirect(requestUrl.href, 301);
  }

  const parsedEnv = envSchema.safeParse(env);
  const parsedRequestBody = requestBodySchema.safeParse(requestBody);
  const parsedRequestCf = requestCfSchema.safeParse(requestCf);
  const parsedRequestHeaderCfConnectingIp = requestHeaderCfConnectingIpSchema.safeParse(requestHeaderCfConnectingIp);
  const parsedRequestHeaderContentType = requestHeaderContentTypeSchema.safeParse(requestHeaderContentType);
  const parsedRequestHeaderUserAgent = requestHeaderUserAgentSchema.safeParse(requestHeaderUserAgent);
  const parsedRequestMethod = requestMethodSchema.safeParse(requestMethod);

  // If environment variables are not defined correctly.
  if (!parsedEnv.success) {
    return new Response('Internal Server Error', {
      status: 500,
    });
  }

  // If the incoming request is invalid.
  if (
    !parsedRequestBody.success
    || !parsedRequestCf.success
    || !parsedRequestHeaderCfConnectingIp.success
    || !parsedRequestHeaderContentType.success
    || !parsedRequestHeaderUserAgent.success
    || !parsedRequestMethod.success
  ) {
    // Only send alert if the Cloudflare request information is invalid.
    if (!parsedRequestCf.success || !parsedRequestHeaderCfConnectingIp.success) {
      await sendNtfyRequest(
        {
          title: 'Invalid Incoming Request Alert',
          description: 'The incoming request appears to be invalid. Please review the errors below:',
          content: [
            ...(!parsedRequestBody.success) ? [
              '__parsedRequestBody:__',
              '```',
              JSON.stringify(parsedRequestBody.error.errors, null, 2),
              '```',
              '\r',
            ] : [],
            ...(!parsedRequestCf.success) ? [
              '__parsedRequestCf:__',
              '```',
              JSON.stringify(parsedRequestCf.error.errors, null, 2),
              '```',
              '\r',
            ] : [],
            ...(!parsedRequestHeaderCfConnectingIp.success) ? [
              '__parsedRequestHeaderCfConnectingIp:__',
              '```',
              JSON.stringify(parsedRequestHeaderCfConnectingIp.error.errors, null, 2),
              '```',
              '\r',
            ] : [],
            ...(!parsedRequestHeaderContentType.success) ? [
              '__parsedRequestHeaderContentType:__',
              '```',
              JSON.stringify(parsedRequestHeaderContentType.error.errors, null, 2),
              '```',
              '\r',
            ] : [],
            ...(!parsedRequestHeaderUserAgent.success) ? [
              '__parsedRequestHeaderUserAgent:__',
              '```',
              JSON.stringify(parsedRequestHeaderUserAgent.error.errors, null, 2),
              '```',
              '\r',
            ] : [],
            ...(!parsedRequestMethod.success) ? [
              '__parsedRequestMethod:__',
              '```',
              JSON.stringify(parsedRequestMethod.error.errors, null, 2),
              '```',
            ] : [],
          ].join('\n'),
          ip: (parsedRequestHeaderCfConnectingIp.success) ? parsedRequestHeaderCfConnectingIp.data : null,
        },
        parsedEnv.data.NTFY_SERVER_LINK,
        parsedEnv.data.NTFY_SERVER_ALERT,
        parsedEnv.data.NTFY_SERVER_TOKEN,
      );
    }

    return new Response('Service Unavailable', {
      status: 503,
    });
  }

  // If the incoming request is blocked.
  if (
    parsedRequestCf.data.country === undefined
    || !parsedEnv.data.ALLOWED_COUNTRIES.includes(parsedRequestCf.data.country)
    || !parsedEnv.data.ALLOWED_USER_AGENTS.includes(parsedRequestHeaderUserAgent.data.split('/')[0])
    || parsedEnv.data.DISALLOWED_IP_ADDRESSES.includes(parsedRequestHeaderCfConnectingIp.data)
  ) {
    return new Response('Forbidden', {
      status: 403,
    });
  }

  // Map the beginning of the hostname to the topic.
  let currentTopic = parsedEnv.data.NTFY_TOPICS.find((topic) => {
    const subdomain = topic.replace(ntfyTopicArray, '$2');

    return requestUrl.hostname.startsWith(subdomain);
  });

  // If current topic does not exist.
  if (currentTopic === undefined) {
    // Return a "Bad Request" if not in development mode.
    if (requestUrl.hostname !== 'localhost') {
      return new Response('Unprocessable Content', {
        status: 422,
      });
    }

    // Replace with default topic (under original format so regex can replace).
    currentTopic = `${parsedEnv.data.NTFY_SERVER_ALERT} || a1b2c3d4e5`;
  }

  const response = await sendNtfyRequest(
    {
      title: parsedRequestBody.data.title,
      description: parsedRequestBody.data.description,
      content: parsedRequestBody.data.content,
      ip: parsedRequestHeaderCfConnectingIp.data,
    },
    parsedEnv.data.NTFY_SERVER_LINK,
    currentTopic.replace(ntfyTopicArray, '$1'),
    parsedEnv.data.NTFY_SERVER_TOKEN,
  );

  if (!response) {
    return new Response('Bad Request', {
      status: 400,
    });
  }

  return new Response('OK', {
    status: 200,
  });
}

// Export the worker using Wrangler's "service-worker" format.
export default { fetch };

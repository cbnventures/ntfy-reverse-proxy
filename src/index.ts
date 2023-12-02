import { ntfyTopicArray } from '@/lib/regex';
import {
  envSchema,
  requestBodySchema,
  requestCfSchema,
  requestHeaderCfConnectingIpSchema,
  requestHeaderContentTypeSchema,
  requestMethodSchema,
} from '@/lib/schema';
import { sendNtfyAlert, sendNtfyRequest } from '@/lib/send';
import { fetchRequestJson } from '@/lib/utility';
import type { FetchEnv, FetchRequest, FetchReturns } from '@/types';

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
    || !parsedRequestMethod.success
  ) {
    await sendNtfyAlert(
      [
        'The incoming request appears to be invalid. Please review the errors below:\n',
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
        ...(!parsedRequestMethod.success) ? [
          '__parsedRequestMethod:__',
          '```',
          JSON.stringify(parsedRequestMethod.error.errors, null, 2),
          '```',
          '\r',
        ] : [],
        ...(parsedRequestHeaderCfConnectingIp.success) ? [
          `Failed request originally initiated by user with IP address of ${parsedRequestHeaderCfConnectingIp.data}.`,
        ] : [],
      ].join('\n'),
      parsedEnv.data.NTFY_SERVER_LINK,
      parsedEnv.data.NTFY_SERVER_ALERT,
      parsedEnv.data.NTFY_SERVER_TOKEN,
    );

    return new Response('Service Unavailable', {
      status: 503,
    });
  }

  // If the incoming request is blocked.
  if (
    parsedRequestCf.data.country === undefined
    || !parsedEnv.data.ALLOWED_COUNTRIES.includes(parsedRequestCf.data.country)
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

    // Replace the topic with the default topic and fake subdomain.
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

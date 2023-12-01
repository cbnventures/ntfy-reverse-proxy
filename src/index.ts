import { ntfyTopicArray } from '@/lib/regex';
import {
  environmentVariables,
  incomingRequestBody,
  incomingRequestCf,
  incomingRequestMethod,
} from '@/lib/schema';
import { sendNtfyAlert, sendNtfyRequest } from '@/lib/send';
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
  let requestBody;

  try {
    requestBody = await request.clone().json();
  } catch {
    return new Response('Bad Request', {
      status: 400,
    });
  }

  const requestContentType = request.headers.get('content-type');
  const requestUrl = new URL(request.url);
  const parsedEnv = environmentVariables.safeParse(env);
  const parsedRequestBody = incomingRequestBody.safeParse(requestBody);
  const parsedRequestCf = incomingRequestCf.safeParse(request.cf);
  const parsedRequestMethod = incomingRequestMethod.safeParse(request.method);

  // Redirect to HTTPS if not in development mode.
  if (requestUrl.hostname !== 'localhost' && requestUrl.protocol === 'http:') {
    requestUrl.protocol = 'https:';

    return Response.redirect(requestUrl.href, 301);
  }

  // If environment variables are not defined correctly.
  if (!parsedEnv.success) {
    return new Response('Internal Server Error', {
      status: 500,
    });
  }

  // If the incoming request Cloudflare properties are invalid.
  if (!parsedRequestCf.success) {
    await sendNtfyAlert(
      [
        'Incoming Cloudflare properties appear to be invalid. Please review the errors below:\n',
        JSON.stringify(parsedRequestCf.error.errors, null, 2),
      ].join('\n'),
      parsedEnv.data.NTFY_SERVER_LINK,
      parsedEnv.data.NTFY_SERVER_ALERT,
      parsedEnv.data.NTFY_SERVER_TOKEN,
    );

    return new Response('Service Unavailable', {
      status: 503,
    });
  }

  // If the incoming request is valid and allowed.
  if (
    !parsedRequestBody.success
    || !parsedRequestMethod.success
    || parsedRequestCf.data.country === undefined
    || !parsedEnv.data.ALLOWED_COUNTRIES.includes(parsedRequestCf.data.country)
    || requestContentType !== 'application/json'
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
      return new Response('Bad Request', {
        status: 400,
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

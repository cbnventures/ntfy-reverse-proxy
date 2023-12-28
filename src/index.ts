import _ from 'lodash';

import { envSchema } from '@/lib/schema.js';
import { sendNtfyRequests } from '@/lib/send.js';
import {
  fetchRequestBody,
  fetchRequestHeader,
  isInputValid,
  prettyPrint,
} from '@/lib/utility.js';
import type { InitializeEnv, InitializeRequest, InitializeReturns } from '@/types/index.d.ts';

/**
 * Initialize.
 *
 * @param {InitializeRequest} request - Request.
 * @param {InitializeEnv}     env     - Env.
 *
 * @returns {InitializeReturns}
 *
 * @since 1.0.0
 */
export async function initialize(request: InitializeRequest, env: InitializeEnv): InitializeReturns {
  const parsedEnv = envSchema.safeParse(env);

  // If the environment variables are not defined correctly.
  if (!parsedEnv.success) {
    return new Response([
      'Internal Server Error',
      prettyPrint(parsedEnv),
    ].join('\n\n'), {
      status: 500,
    });
  }

  const { data } = parsedEnv;
  const {
    countries,
    ip_addresses: ipAddresses,
    servers,
    settings,
    user_agents: userAgents,
  } = data;

  try {
    const requestUrl = new URL(request.url);

    // Redirect to HTTPS if "force_https" is true.
    if (settings.force_https && requestUrl.protocol === 'http:') {
      requestUrl.protocol = 'https:';

      return Response.redirect(requestUrl.href, 301);
    }

    const requestBody = await fetchRequestBody(request);
    const requestIp = fetchRequestHeader(request, 'cf-connecting-ip');
    const requestIpCountry = fetchRequestHeader(request, 'cf-ipcountry');
    const requestMethod = request.method;
    const requestUserAgent = fetchRequestHeader(request, 'user-agent');

    // Validate the inputs.
    const validBody = requestBody.type !== 'unknown';
    const validIp = isInputValid(ipAddresses.mode, ipAddresses.list, requestIp);
    const validIpCountry = isInputValid(countries.mode, countries.list, requestIpCountry);
    const validMethod = ['POST', 'PUT'].includes(requestMethod);
    const validUserAgent = isInputValid(userAgents.mode, userAgents.list, requestUserAgent);

    // If the request is invalid based on the requirements.
    if (
      !validBody
      || !validIp
      || !validIpCountry
      || !validMethod
      || !validUserAgent
    ) {
      return new Response([
        'Forbidden',
        ...(settings.show_response_output) ? [prettyPrint({
          validBody,
          validIp,
          validIpCountry,
          validMethod,
          validUserAgent,
        })] : [],
      ].join('\n\n'), {
        status: 403,
      });
    }

    // Send request to defined ntfy servers.
    const ntfyResponses = await sendNtfyRequests({
      body: requestBody,
      headers: request.headers,
      cfProperties: request.cf,
      hostname: requestUrl.hostname,
      showVisitorInfo: settings.show_visitor_info,
      mode: servers.mode,
      servers: servers.list,
    });

    // If some or all requests are not successful.
    if (ntfyResponses.some((ntfyResponse) => ntfyResponse.success === false)) {
      return new Response([
        'OK',
        ...(settings.show_response_output) ? [prettyPrint(ntfyResponses)] : [],
      ].join('\n\n'), {
        status: 200,
      });
    }

    return new Response([
      'OK',
      ...(settings.show_response_output) ? [prettyPrint(ntfyResponses)] : [],
    ].join('\n\n'), {
      status: 200,
    });
  } catch (error) {
    return new Response([
      'Internal Server Error',
      ...(settings.show_response_output) ? [prettyPrint({
        ...(_.isError(error)) ? {
          message: error.message,
          stack: error.stack,
        } : {},
      })] : [],
    ].join('\n\n'), {
      status: 500,
    });
  }
}

// Export the worker using Wrangler's "service-worker" format.
export default { fetch: initialize };

import { landingPage } from './landing/page.js';
import { authenticate } from './pipeline/authenticate.js';
import { parseEmail } from './pipeline/email.js';
import { format } from './pipeline/format.js';
import { interpret } from './pipeline/interpret.js';
import { parse } from './pipeline/parse.js';
import { receive } from './pipeline/receive.js';
import { respond } from './pipeline/respond.js';
import { route } from './pipeline/route.js';
import { send } from './pipeline/send.js';
import { split } from './pipeline/split.js';

import type {
  WorkerAuthResult,
  WorkerBody,
  WorkerCloned,
  WorkerCtx,
  WorkerDebugRawEmailStr,
  WorkerDebugRawRequestStr,
  WorkerEmailAuthResult,
  WorkerEmailCtx,
  WorkerEmailDebugLogStr,
  WorkerEmailErrorAttachmentBuffer,
  WorkerEmailErrorAttachmentData,
  WorkerEmailErrorAttachmentJson,
  WorkerEmailErrorIssues,
  WorkerEmailErrorIssuesRaw,
  WorkerEmailErrorMessage,
  WorkerEmailErrorName,
  WorkerEmailErrorStack,
  WorkerEmailFormatted,
  WorkerEmailInput,
  WorkerEmailInterpreted,
  WorkerEmailMessages,
  WorkerEmailParsed,
  WorkerEmailPrimaryServer,
  WorkerEmailResolvedServers,
  WorkerEmailRouted,
  WorkerEmailSendResult,
  WorkerErrorAttachmentBuffer,
  WorkerErrorAttachmentData,
  WorkerErrorAttachmentHeaderEntries,
  WorkerErrorAttachmentHeaderEntryName,
  WorkerErrorAttachmentHeaderEntryValue,
  WorkerErrorAttachmentHeaders,
  WorkerErrorAttachmentJson,
  WorkerErrorAttachmentParsed,
  WorkerErrorIssues,
  WorkerErrorIssuesRaw,
  WorkerErrorMessage,
  WorkerErrorName,
  WorkerErrorStack,
  WorkerFormatted,
  WorkerHandleEmailConfig,
  WorkerHandleEmailFrom,
  WorkerHandleEmailKv,
  WorkerHandleEmailRawEmail,
  WorkerHandleEmailReturn,
  WorkerHandleRequestConfig,
  WorkerHandleRequestKv,
  WorkerHandleRequestRequest,
  WorkerHandleRequestReturn,
  WorkerInput,
  WorkerInterpreted,
  WorkerMessages,
  WorkerParsed,
  WorkerPrimaryServer,
  WorkerRawBodyJsonStr,
  WorkerRawBodyText,
  WorkerReceived,
  WorkerRecipientLocalPart,
  WorkerResolvedServers,
  WorkerResponse,
  WorkerResponseBody,
  WorkerRouted,
  WorkerSendResult,
  WorkerSubdomain,
  WorkerVisitorIpHeader,
} from '../types/worker/index.d.ts';

/**
 * Worker - Handlers - Handle Request.
 *
 * Processes incoming HTTP requests through the full pipeline
 * of receive, route, authenticate, parse, interpret, and send.
 *
 * @since 2.0.0
 */
async function handleRequest(request: WorkerHandleRequestRequest, config: WorkerHandleRequestConfig, kv: WorkerHandleRequestKv): WorkerHandleRequestReturn {
  try {
    // 1. Receive.
    const received: WorkerReceived = await receive(request, config['settings']['base_domain']);

    if (received['redirect'] !== undefined) {
      return Response.redirect(received['redirect'], 301);
    }

    if (received['error'] !== undefined) {
      return new Response(JSON.stringify({
        status: 'error', message: received['error'],
      }, null, 2), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (received['isGet'] === true) {
      return landingPage(config);
    }

    // 2. Route.
    const subdomain: WorkerSubdomain = received['hostname'].split('.')[0] ?? '';
    const routed: WorkerRouted = route('http', subdomain, config);

    if (
      routed['error'] !== undefined
      || routed['context'] === undefined
      || routed['resolvedServers'] === undefined
      || routed['primaryServer'] === undefined
    ) {
      return new Response(JSON.stringify({
        status: 'error', message: routed['error'] ?? 'No context found',
      }, null, 2), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const ctx: WorkerCtx = routed['context'] as WorkerCtx;
    const resolvedServers: WorkerResolvedServers = routed['resolvedServers'];
    const primaryServer: WorkerPrimaryServer = routed['primaryServer'];

    // 3. Authenticate.
    const authResult: WorkerAuthResult = authenticate(
      {
        type: 'http', ...(ctx['token'] !== undefined ? { token: ctx['token'] } : {}),
      },
      {
        authorization: received['headers'].get('authorization') ?? undefined, from: undefined,
      },
    );

    if (authResult['authenticated'] === false) {
      if (ctx['error_topic'] !== undefined) {
        try {
          // Mask the authorization header value rather than stripping the field — matches Cloudflare tail behavior and signals whether the client even attempted to authenticate.
          const errorAttachmentHeaderEntries: WorkerErrorAttachmentHeaderEntries = [...received['headers'].entries()].map((entry) => {
            const entryName: WorkerErrorAttachmentHeaderEntryName = entry[0];
            const entryValue: WorkerErrorAttachmentHeaderEntryValue = entry[1];

            if (entryName.toLowerCase() === 'authorization') {
              return [
                entryName,
                'REDACTED',
              ];
            }

            return [
              entryName,
              entryValue,
            ];
          });
          const errorAttachmentHeaders: WorkerErrorAttachmentHeaders = Object.fromEntries(errorAttachmentHeaderEntries);

          // Parse the body just for the attachment so the unauthorized payload is visible — auth runs before the main parse step.
          const errorAttachmentParsed: WorkerErrorAttachmentParsed = parse(received['rawBody'], received['headers']);

          const errorAttachmentData: WorkerErrorAttachmentData = {
            timestamp: new Date().toISOString(),
            error: {
              type: 'authentication',
              message: authResult['reason'],
            },
            context: {
              name: ctx['name'],
              interpreter: ctx['interpreter'],
              stage: 'authentication',
            },
            request: {
              method: received['method'],
              url: received['url'],
              headers: errorAttachmentHeaders,
              ...(received['cfProperties'] !== undefined ? { cf: received['cfProperties'] } : {}),
            },
            response: {
              status: 403,
            },
            body: {
              type: errorAttachmentParsed['type'],
              ...(errorAttachmentParsed['json'] !== undefined ? { json: errorAttachmentParsed['json'] } : {}),
              ...(errorAttachmentParsed['text'] !== undefined ? { text: errorAttachmentParsed['text'] } : {}),
            },
          };
          const errorAttachmentJson: WorkerErrorAttachmentJson = JSON.stringify(errorAttachmentData, null, 2);
          const errorAttachmentBuffer: WorkerErrorAttachmentBuffer = new TextEncoder().encode(errorAttachmentJson).buffer as ArrayBuffer;

          await send({
            messages: [],
            servers: resolvedServers,
            primaryServer,
            topic: ctx['error_topic'],
            mode: ctx['mode'],
            visitorIp: received['headers'].get('cf-connecting-ip') ?? undefined,
            attachment: errorAttachmentBuffer,
            filename: 'error-debug.json',
            attachmentHeaders: { 'X-Title': 'Authentication Error' },
          });
        } catch {
          // Best-effort error notification; ignore failures.
        }
      }

      return new Response(JSON.stringify({
        status: 'error', message: 'Unauthorized',
      }, null, 2), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 4. Parse.
    const parsed: WorkerParsed = parse(received['rawBody'], received['headers']);

    if (parsed['type'] === 'unknown') {
      return new Response(JSON.stringify({
        status: 'error', message: 'Unknown content type',
      }, null, 2), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Debug log raw request body.
    const rawBodyJsonStr: WorkerRawBodyJsonStr = (parsed['json'] !== undefined) ? JSON.stringify(parsed['json']) : '';
    const rawBodyText: WorkerRawBodyText = parsed['text'] ?? ((rawBodyJsonStr.length > 0) ? rawBodyJsonStr : undefined);
    const debugRawRequestStr: WorkerDebugRawRequestStr = JSON.stringify({
      debug: 'raw_request', type: parsed['type'], body: rawBodyText ?? '(binary)',
    });

    console.info(debugRawRequestStr);

    // 5. Interpret.
    const input: WorkerInput = parsed['json']
      ?? parsed['text']
      ?? parsed['binary']
      ?? '';
    let interpreted: WorkerInterpreted = undefined;

    try {
      interpreted = await interpret(ctx['interpreter'], input, (kv !== undefined) ? { kv } : {});
    } catch (err) {
      const errorName: WorkerErrorName = (err instanceof Error) ? err.name : 'Error';
      const errorMessage: WorkerErrorMessage = (err instanceof Error) ? err.message : 'Unknown interpretation error';
      const errorStack: WorkerErrorStack = (err instanceof Error) ? err.stack : undefined;
      let errorIssues: WorkerErrorIssues = undefined;

      if (
        err instanceof Error
        && err.name === 'ZodError'
        && 'issues' in err
      ) {
        const errorIssuesRaw: WorkerErrorIssuesRaw = Reflect.get(err, 'issues');

        if (Array.isArray(errorIssuesRaw) === true) {
          errorIssues = errorIssuesRaw;
        }
      }

      if (ctx['error_topic'] !== undefined) {
        try {
          // Mask the authorization header value rather than stripping the field.
          const errorAttachmentHeaderEntries: WorkerErrorAttachmentHeaderEntries = [...received['headers'].entries()].map((entry) => {
            const entryName: WorkerErrorAttachmentHeaderEntryName = entry[0];
            const entryValue: WorkerErrorAttachmentHeaderEntryValue = entry[1];

            if (entryName.toLowerCase() === 'authorization') {
              return [
                entryName,
                'REDACTED',
              ];
            }

            return [
              entryName,
              entryValue,
            ];
          });
          const errorAttachmentHeaders: WorkerErrorAttachmentHeaders = Object.fromEntries(errorAttachmentHeaderEntries);

          const errorAttachmentData: WorkerErrorAttachmentData = {
            timestamp: new Date().toISOString(),
            error: {
              type: 'interpretation',
              name: errorName,
              message: errorMessage,
              ...(errorStack !== undefined ? { stack: errorStack } : {}),
              ...(errorIssues !== undefined ? { issues: errorIssues } : {}),
            },
            context: {
              name: ctx['name'],
              interpreter: ctx['interpreter'],
              stage: 'interpretation',
            },
            request: {
              method: received['method'],
              url: received['url'],
              headers: errorAttachmentHeaders,
              ...(received['cfProperties'] !== undefined ? { cf: received['cfProperties'] } : {}),
            },
            response: {
              status: 422,
            },
            body: {
              type: parsed['type'],
              ...(parsed['json'] !== undefined ? { json: parsed['json'] } : {}),
              ...(parsed['text'] !== undefined ? { text: parsed['text'] } : {}),
            },
          };
          const errorAttachmentJson: WorkerErrorAttachmentJson = JSON.stringify(errorAttachmentData, null, 2);
          const errorAttachmentBuffer: WorkerErrorAttachmentBuffer = new TextEncoder().encode(errorAttachmentJson).buffer as ArrayBuffer;

          await send({
            messages: [],
            servers: resolvedServers,
            primaryServer,
            topic: ctx['error_topic'],
            mode: ctx['mode'],
            visitorIp: received['headers'].get('cf-connecting-ip') ?? undefined,
            attachment: errorAttachmentBuffer,
            filename: 'error-debug.json',
            attachmentHeaders: { 'X-Title': 'Interpretation Error' },
          });
        } catch {
          // Best-effort error notification; ignore failures.
        }
      }

      return new Response(JSON.stringify({
        status: 'error', message: errorMessage,
      }, null, 2), {
        status: 422,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Null result means the interpreter intentionally ignored the payload.
    if (interpreted === null) {
      return new Response(JSON.stringify({ status: 'ignored' }, null, 2), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Title fallback to context name if interpreter didn't set one.
    if (interpreted['notification']['title'] === undefined) {
      Reflect.set(interpreted['notification'], 'title', ctx['name']);
    }

    // 6. Format.
    const visitorIpHeader: WorkerVisitorIpHeader = received['headers'].get('cf-connecting-ip');
    const formatted: WorkerFormatted = format(interpreted['notification'], {
      showVisitorInfo: ctx['show_visitor_info'],
      ...((visitorIpHeader !== null) ? { visitorIp: visitorIpHeader } : {}),
      ...((received['cfProperties'] !== undefined) ? { cfProperties: received['cfProperties'] } : {}),
    });

    // 7. Split.
    const messages: WorkerMessages = split(formatted['body'], formatted['headers']);

    // 8. Send.
    const sendResult: WorkerSendResult = await send({
      messages,
      servers: resolvedServers,
      primaryServer,
      topic: ctx['topic'],
      mode: ctx['mode'],
      visitorIp: received['headers'].get('cf-connecting-ip') ?? undefined,
      attachment: interpreted['attachment'],
      filename: interpreted['notification']['filename'],
    });

    // 9. Respond.
    const response: WorkerResponse = respond(sendResult, {
      showResponseOutput: config['settings']['show_response_output'],
      contextName: ctx['name'],
      interpreterName: ctx['interpreter'],
      messageTitle: interpreted['notification']['title'],
      bodySize: formatted['body'].length,
      parts: messages.length,
      hasAttachment: interpreted['attachment'] !== undefined,
    });

    // Debug log for Cloudflare real-time logs.
    const cloned: WorkerCloned = response.clone();
    const responseBody: WorkerResponseBody = await cloned.text();

    console.info(responseBody);

    return response;
  } catch (err) {
    const errorMessage: WorkerErrorMessage = (err instanceof Error) ? err.message : 'Internal server error';
    const body: WorkerBody = (config['settings']['show_response_output'] === true) ? {
      status: 'error', message: errorMessage,
    } : {
      status: 'error', message: 'Internal server error',
    };

    return new Response(JSON.stringify(body, null, 2), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

/**
 * Worker - Handlers - Handle Email.
 *
 * Processes incoming email messages through the pipeline of
 * parse, route, authenticate, interpret, format, and send.
 *
 * @since 2.0.0
 */
async function handleEmail(rawEmail: WorkerHandleEmailRawEmail, from: WorkerHandleEmailFrom, config: WorkerHandleEmailConfig, kv: WorkerHandleEmailKv): WorkerHandleEmailReturn {
  // 1. Parse email.
  const parsed: WorkerEmailParsed = await parseEmail(rawEmail);

  // Debug log raw email.
  const debugRawEmailStr: WorkerDebugRawEmailStr = JSON.stringify({
    debug: 'raw_email', from, to: parsed['to'], subject: parsed['subject'], rawEmail,
  });

  console.info(debugRawEmailStr);

  // 2. Route by recipient local part.
  const recipientLocalPart: WorkerRecipientLocalPart = parsed['to'].split('@')[0] ?? '';
  const routed: WorkerEmailRouted = route('email', recipientLocalPart, config);

  if (
    routed['error'] !== undefined
    || routed['context'] === undefined
    || routed['resolvedServers'] === undefined
    || routed['primaryServer'] === undefined
  ) {
    return;
  }

  const ctx: WorkerEmailCtx = routed['context'] as WorkerEmailCtx;
  const resolvedServers: WorkerEmailResolvedServers = routed['resolvedServers'] as WorkerEmailResolvedServers;
  const primaryServer: WorkerEmailPrimaryServer = routed['primaryServer'];

  // 3. Authenticate.
  const authResult: WorkerEmailAuthResult = authenticate(
    {
      type: 'email', ...(ctx['allowed_from'] !== undefined ? { allowed_from: ctx['allowed_from'] } : {}),
    },
    {
      authorization: undefined, from,
    },
  );

  if (authResult['authenticated'] === false) {
    if (ctx['error_topic'] !== undefined) {
      try {
        const errorAttachmentData: WorkerEmailErrorAttachmentData = {
          timestamp: new Date().toISOString(),
          error: {
            type: 'authentication',
            message: authResult['reason'],
          },
          context: {
            name: ctx['name'],
            interpreter: ctx['interpreter'],
            stage: 'authentication',
          },
          email: {
            from,
            to: parsed['to'],
            subject: parsed['subject'],
            textBody: parsed['textBody'],
          },
        };
        const errorAttachmentJson: WorkerEmailErrorAttachmentJson = JSON.stringify(errorAttachmentData, null, 2);
        const errorAttachmentBuffer: WorkerEmailErrorAttachmentBuffer = new TextEncoder().encode(errorAttachmentJson).buffer as ArrayBuffer;

        await send({
          messages: [],
          servers: resolvedServers,
          primaryServer,
          topic: ctx['error_topic'],
          mode: ctx['mode'],
          attachment: errorAttachmentBuffer,
          filename: 'error-debug.json',
          attachmentHeaders: { 'X-Title': 'Email Authentication Error' },
        });
      } catch {
        // Best-effort error notification; ignore failures.
      }
    }

    return;
  }

  // 4. Interpret.
  const emailInput: WorkerEmailInput = {
    subject: parsed['subject'],
    textBody: parsed['textBody'],
    from: parsed['from'],
    to: parsed['to'],
  };

  let interpreted: WorkerEmailInterpreted = undefined;

  try {
    interpreted = await interpret(ctx['interpreter'], emailInput, (kv !== undefined) ? { kv } : {});
  } catch (err) {
    const errorName: WorkerEmailErrorName = (err instanceof Error) ? err.name : 'Error';
    const errorMessage: WorkerEmailErrorMessage = (err instanceof Error) ? err.message : 'Unknown interpretation error';
    const errorStack: WorkerEmailErrorStack = (err instanceof Error) ? err.stack : undefined;
    let errorIssues: WorkerEmailErrorIssues = undefined;

    if (
      err instanceof Error
      && err.name === 'ZodError'
      && 'issues' in err
    ) {
      const errorIssuesRaw: WorkerEmailErrorIssuesRaw = Reflect.get(err, 'issues');

      if (Array.isArray(errorIssuesRaw) === true) {
        errorIssues = errorIssuesRaw;
      }
    }

    if (ctx['error_topic'] !== undefined) {
      try {
        const errorAttachmentData: WorkerEmailErrorAttachmentData = {
          timestamp: new Date().toISOString(),
          error: {
            type: 'interpretation',
            name: errorName,
            message: errorMessage,
            ...(errorStack !== undefined ? { stack: errorStack } : {}),
            ...(errorIssues !== undefined ? { issues: errorIssues } : {}),
          },
          context: {
            name: ctx['name'],
            interpreter: ctx['interpreter'],
            stage: 'interpretation',
          },
          email: {
            from,
            to: parsed['to'],
            subject: parsed['subject'],
            textBody: parsed['textBody'],
          },
        };
        const errorAttachmentJson: WorkerEmailErrorAttachmentJson = JSON.stringify(errorAttachmentData, null, 2);
        const errorAttachmentBuffer: WorkerEmailErrorAttachmentBuffer = new TextEncoder().encode(errorAttachmentJson).buffer as ArrayBuffer;

        await send({
          messages: [],
          servers: resolvedServers,
          primaryServer,
          topic: ctx['error_topic'],
          mode: ctx['mode'],
          attachment: errorAttachmentBuffer,
          filename: 'error-debug.json',
          attachmentHeaders: { 'X-Title': 'Email Interpretation Error' },
        });
      } catch {
        // Best-effort error notification; ignore failures.
      }
    }

    return;
  }

  // Null result means the interpreter intentionally ignored the payload.
  if (interpreted === null) {
    return;
  }

  // Title fallback to context name if interpreter didn't set one.
  if (interpreted['notification']['title'] === undefined) {
    Reflect.set(interpreted['notification'], 'title', ctx['name']);
  }

  // 5. Format.
  const formatted: WorkerEmailFormatted = format(interpreted['notification'], {
    showVisitorInfo: ctx['show_visitor_info'],
  });

  // 6. Split.
  const messages: WorkerEmailMessages = split(formatted['body'], formatted['headers']);

  // 7. Send.
  const sendResult: WorkerEmailSendResult = await send({
    messages,
    servers: resolvedServers,
    primaryServer,
    topic: ctx['topic'],
    mode: ctx['mode'],
    attachment: interpreted['attachment'],
    filename: interpreted['notification']['filename'],
  });

  // Debug log for Cloudflare real-time logs.
  const debugLogStr: WorkerEmailDebugLogStr = JSON.stringify({
    context: ctx['name'],
    interpreter: ctx['interpreter'],
    servers: sendResult['results'],
    bodySize: formatted['body'].length,
    parts: messages.length,
  }, null, 2);

  console.info(debugLogStr);

  return;
}

export {
  handleEmail,
  handleRequest,
};

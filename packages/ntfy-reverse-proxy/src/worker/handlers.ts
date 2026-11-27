import { SECRET_PATH_PREFIX } from '../lib/item.js';
import { landingPage } from './landing/page.js';
import { authenticate, timingSafeEqual } from './pipeline/authenticate.js';
import { deliver } from './pipeline/deliver.js';
import { parseEmail } from './pipeline/email.js';
import { format } from './pipeline/format.js';
import { interpret } from './pipeline/interpret.js';
import { parse } from './pipeline/parse.js';
import { receive } from './pipeline/receive.js';
import { respond } from './pipeline/respond.js';
import { route } from './pipeline/route.js';
import { send } from './pipeline/send.js';
import {
  issueSession,
  SESSION_PATH,
  verifySession,
} from './pipeline/session.js';
import { split } from './pipeline/split.js';

import type {
  Worker_Handlers_HandleEmail_AuthErrorAttachmentBuffer,
  Worker_Handlers_HandleEmail_AuthErrorAttachmentData,
  Worker_Handlers_HandleEmail_AuthErrorAttachmentJson,
  Worker_Handlers_HandleEmail_AuthResult,
  Worker_Handlers_HandleEmail_Config,
  Worker_Handlers_HandleEmail_Ctx,
  Worker_Handlers_HandleEmail_DebugLogStr,
  Worker_Handlers_HandleEmail_DebugRawEmailStr,
  Worker_Handlers_HandleEmail_DeliveryResult,
  Worker_Handlers_HandleEmail_EmailInput,
  Worker_Handlers_HandleEmail_ErrorIssues,
  Worker_Handlers_HandleEmail_ErrorIssuesRaw,
  Worker_Handlers_HandleEmail_ErrorMessage,
  Worker_Handlers_HandleEmail_ErrorName,
  Worker_Handlers_HandleEmail_ErrorStack,
  Worker_Handlers_HandleEmail_FatalDebugStr,
  Worker_Handlers_HandleEmail_FatalErrorMessage,
  Worker_Handlers_HandleEmail_Formatted,
  Worker_Handlers_HandleEmail_From,
  Worker_Handlers_HandleEmail_Interpreted,
  Worker_Handlers_HandleEmail_InterpretErrorAttachmentBuffer,
  Worker_Handlers_HandleEmail_InterpretErrorAttachmentData,
  Worker_Handlers_HandleEmail_InterpretErrorAttachmentJson,
  Worker_Handlers_HandleEmail_Kv,
  Worker_Handlers_HandleEmail_Messages,
  Worker_Handlers_HandleEmail_Outbox,
  Worker_Handlers_HandleEmail_Parsed,
  Worker_Handlers_HandleEmail_PrimaryServer,
  Worker_Handlers_HandleEmail_RawEmail,
  Worker_Handlers_HandleEmail_RecipientLocalPart,
  Worker_Handlers_HandleEmail_ResolvedServers,
  Worker_Handlers_HandleEmail_Returns,
  Worker_Handlers_HandleEmail_Routed,
  Worker_Handlers_HandleRequest_AttachmentUrl,
  Worker_Handlers_HandleRequest_AuthEntryName,
  Worker_Handlers_HandleRequest_AuthEntryValue,
  Worker_Handlers_HandleRequest_AuthErrorAttachmentBuffer,
  Worker_Handlers_HandleRequest_AuthErrorAttachmentData,
  Worker_Handlers_HandleRequest_AuthErrorAttachmentHeaderEntries,
  Worker_Handlers_HandleRequest_AuthErrorAttachmentHeaders,
  Worker_Handlers_HandleRequest_AuthErrorAttachmentJson,
  Worker_Handlers_HandleRequest_AuthErrorAttachmentParsed,
  Worker_Handlers_HandleRequest_AuthResult,
  Worker_Handlers_HandleRequest_Body,
  Worker_Handlers_HandleRequest_ClientIp,
  Worker_Handlers_HandleRequest_Cloned,
  Worker_Handlers_HandleRequest_Config,
  Worker_Handlers_HandleRequest_Ctx,
  Worker_Handlers_HandleRequest_DebugRawRequestStr,
  Worker_Handlers_HandleRequest_DeliveryResult,
  Worker_Handlers_HandleRequest_FatalErrorMessage,
  Worker_Handlers_HandleRequest_Formatted,
  Worker_Handlers_HandleRequest_HostnameLabel,
  Worker_Handlers_HandleRequest_Input,
  Worker_Handlers_HandleRequest_Interpreted,
  Worker_Handlers_HandleRequest_InterpretEntryName,
  Worker_Handlers_HandleRequest_InterpretEntryValue,
  Worker_Handlers_HandleRequest_InterpretErrorAttachmentBuffer,
  Worker_Handlers_HandleRequest_InterpretErrorAttachmentData,
  Worker_Handlers_HandleRequest_InterpretErrorAttachmentHeaderEntries,
  Worker_Handlers_HandleRequest_InterpretErrorAttachmentHeaders,
  Worker_Handlers_HandleRequest_InterpretErrorAttachmentJson,
  Worker_Handlers_HandleRequest_InterpretErrorIssues,
  Worker_Handlers_HandleRequest_InterpretErrorIssuesRaw,
  Worker_Handlers_HandleRequest_InterpretErrorMessage,
  Worker_Handlers_HandleRequest_InterpretErrorName,
  Worker_Handlers_HandleRequest_InterpretErrorStack,
  Worker_Handlers_HandleRequest_Issued,
  Worker_Handlers_HandleRequest_Kv,
  Worker_Handlers_HandleRequest_LocalContext,
  Worker_Handlers_HandleRequest_Messages,
  Worker_Handlers_HandleRequest_Outbox,
  Worker_Handlers_HandleRequest_Parsed,
  Worker_Handlers_HandleRequest_Pathname,
  Worker_Handlers_HandleRequest_PrimaryServer,
  Worker_Handlers_HandleRequest_RawBodyJsonStr,
  Worker_Handlers_HandleRequest_RawBodyText,
  Worker_Handlers_HandleRequest_Received,
  Worker_Handlers_HandleRequest_Request,
  Worker_Handlers_HandleRequest_RequestUrl,
  Worker_Handlers_HandleRequest_ResolvedServers,
  Worker_Handlers_HandleRequest_Response,
  Worker_Handlers_HandleRequest_ResponseBody,
  Worker_Handlers_HandleRequest_Returns,
  Worker_Handlers_HandleRequest_Routed,
  Worker_Handlers_HandleRequest_SecretPath,
  Worker_Handlers_HandleRequest_SecretPathCandidate,
  Worker_Handlers_HandleRequest_Subdomain,
  Worker_Handlers_HandleRequest_VisitorIpHeader,
  Worker_Handlers_ShouldNotifyError_Category,
  Worker_Handlers_ShouldNotifyError_Ctx,
  Worker_Handlers_ShouldNotifyError_Returns,
} from '../types/worker/handlers.d.ts';

/**
 * Worker - Handlers - Local Context Header.
 *
 * Header a local request uses to name its context. Wrangler dev serves every request as
 * localhost, so the hostname cannot say which context is meant.
 *
 * @since 2.3.0
 */
const LOCAL_CONTEXT_HEADER = 'X-NRP-Context';

/**
 * Worker - Handlers - Should Notify Error.
 *
 * Decides whether an error of the given category should trigger an
 * error-topic notification for the context, honoring the optional
 * error_events allow-list (absent means every category notifies).
 *
 * @param {Worker_Handlers_ShouldNotifyError_Ctx}      ctx      - Ctx.
 * @param {Worker_Handlers_ShouldNotifyError_Category} category - Category.
 *
 * @returns {Worker_Handlers_ShouldNotifyError_Returns}
 *
 * @since 2.1.0
 */
function shouldNotifyError(ctx: Worker_Handlers_ShouldNotifyError_Ctx, category: Worker_Handlers_ShouldNotifyError_Category): Worker_Handlers_ShouldNotifyError_Returns {
  if (ctx['error_topic'] === undefined) {
    return false;
  }

  if (ctx['error_events'] === undefined) {
    return true;
  }

  return ctx['error_events'].includes(category);
}

/**
 * Worker - Handlers - Handle Request.
 *
 * Processes incoming HTTP requests through the full pipeline
 * of receive, route, authenticate, parse, interpret, and send.
 *
 * @param {Worker_Handlers_HandleRequest_Request} request - Request.
 * @param {Worker_Handlers_HandleRequest_Config}  config  - Config.
 * @param {Worker_Handlers_HandleRequest_Kv}      kv      - Kv.
 * @param {Worker_Handlers_HandleRequest_Outbox}  outbox  - Outbox.
 *
 * @returns {Worker_Handlers_HandleRequest_Returns}
 *
 * @since 2.0.0
 */
async function handleRequest(request: Worker_Handlers_HandleRequest_Request, config: Worker_Handlers_HandleRequest_Config, kv: Worker_Handlers_HandleRequest_Kv, outbox: Worker_Handlers_HandleRequest_Outbox): Worker_Handlers_HandleRequest_Returns {
  try {
    // 1. Receive.
    const received: Worker_Handlers_HandleRequest_Received = await receive(request, config['settings']['base_domain']);

    if (received['redirect'] !== undefined) {
      return Response.redirect(received['redirect'], 301);
    }

    if (received['error'] !== undefined) {
      return new Response(JSON.stringify({
        status: 'error',
        message: received['error'],
      }, null, 2), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (received['isGet'] === true) {
      return landingPage(config);
    }

    // 2. Route. Only a localhost request may name its context in a header; deployed requests use the hostname.
    const localContext: Worker_Handlers_HandleRequest_LocalContext = (received['hostname'] === 'localhost') ? received['headers'].get(LOCAL_CONTEXT_HEADER) : null;
    const hostnameLabel: Worker_Handlers_HandleRequest_HostnameLabel = received['hostname'].split('.')[0] ?? '';
    const subdomain: Worker_Handlers_HandleRequest_Subdomain = localContext ?? hostnameLabel;
    const routed: Worker_Handlers_HandleRequest_Routed = route('http', subdomain, config);

    if (
      routed['error'] !== undefined
      || routed['context'] === undefined
      || routed['resolvedServers'] === undefined
      || routed['primaryServer'] === undefined
    ) {
      return new Response(JSON.stringify({
        status: 'error',
        message: routed['error'] ?? 'No context found',
      }, null, 2), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const ctx: Worker_Handlers_HandleRequest_Ctx = routed['context'] as Worker_Handlers_HandleRequest_Ctx;
    const resolvedServers: Worker_Handlers_HandleRequest_ResolvedServers = routed['resolvedServers'];
    const primaryServer: Worker_Handlers_HandleRequest_PrimaryServer = routed['primaryServer'];

    // A context with a secret path answers every other path like an unknown host, so a probe cannot tell it exists.
    const requestUrl: Worker_Handlers_HandleRequest_RequestUrl = new URL(received['url']);
    const pathname: Worker_Handlers_HandleRequest_Pathname = requestUrl.pathname;
    const secretPath: Worker_Handlers_HandleRequest_SecretPath = ctx['secret_path'];

    if (secretPath !== undefined) {
      const secretPathCandidate: Worker_Handlers_HandleRequest_SecretPathCandidate = (pathname.endsWith('/') === true) ? pathname.slice(0, -1) : pathname;

      // Same body the route step gives a hostname with no context.
      if (timingSafeEqual(secretPathCandidate, `${SECRET_PATH_PREFIX}${secretPath}`) === false) {
        return new Response(JSON.stringify({
          status: 'error',
          message: `No context found for http identifier: ${subdomain}`,
        }, null, 2), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // Error notifications show the secret path as REDACTED, so the secret never lands on an ntfy topic.
    const attachmentUrl: Worker_Handlers_HandleRequest_AttachmentUrl = (secretPath !== undefined) ? `${requestUrl.origin}/REDACTED${requestUrl.search}` : received['url'];

    // 3. Authenticate. A context with sessions hands out tokens on the session path and checks them everywhere else.
    const clientIp: Worker_Handlers_HandleRequest_ClientIp = received['headers'].get('cf-connecting-ip') ?? 'unknown';

    if (pathname === SESSION_PATH) {
      if (ctx['session'] === undefined) {
        return new Response(JSON.stringify({
          status: 'error',
          message: 'Sessions are not enabled for this context',
        }, null, 2), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const issued: Worker_Handlers_HandleRequest_Issued = await issueSession({
        contextId: ctx['id'],
        session: ctx['session'],
        clientIp,
        kv,
      });

      if (issued['issued'] === false) {
        return new Response(JSON.stringify({
          status: 'error',
          message: issued['reason'],
        }, null, 2), {
          status: issued['status'],
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({
        status: 'success',
        token: issued['token'],
        expires_in: issued['expiresIn'],
      }, null, 2), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      });
    }

    const authResult: Worker_Handlers_HandleRequest_AuthResult = (ctx['session'] !== undefined) ? await verifySession({
      contextId: ctx['id'],
      session: ctx['session'],
      authorization: received['headers'].get('authorization') ?? undefined,
      clientIp,
      kv,
    }) : authenticate(
      {
        type: 'http',
        ...((ctx['token'] !== undefined) ? { token: ctx['token'] } : {}),
      },
      {
        authorization: received['headers'].get('authorization') ?? undefined,
        from: undefined,
      },
    );

    if (authResult['authenticated'] === false) {
      if (ctx['error_topic'] !== undefined && shouldNotifyError(ctx, 'authentication') === true) {
        try {
          // Mask the authorization header value rather than stripping the field - matches Cloudflare tail behavior and signals whether the client even attempted to authenticate.
          const authErrorAttachmentHeaderEntries: Worker_Handlers_HandleRequest_AuthErrorAttachmentHeaderEntries = [...received['headers'].entries()].map((entry) => {
            const authEntryName: Worker_Handlers_HandleRequest_AuthEntryName = entry[0];
            const authEntryValue: Worker_Handlers_HandleRequest_AuthEntryValue = entry[1];

            if (authEntryName.toLowerCase() === 'authorization') {
              return [
                authEntryName,
                'REDACTED',
              ];
            }

            return [
              authEntryName,
              authEntryValue,
            ];
          });
          const authErrorAttachmentHeaders: Worker_Handlers_HandleRequest_AuthErrorAttachmentHeaders = Object.fromEntries(authErrorAttachmentHeaderEntries);

          // Parse the body just for the attachment so the unauthorized payload is visible - auth runs before the main parse step.
          const authErrorAttachmentParsed: Worker_Handlers_HandleRequest_AuthErrorAttachmentParsed = parse(received['rawBody'], received['headers']);

          const authErrorAttachmentData: Worker_Handlers_HandleRequest_AuthErrorAttachmentData = {
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
              url: attachmentUrl,
              headers: authErrorAttachmentHeaders,
              ...((received['cfProperties'] !== undefined) ? { cf: received['cfProperties'] } : {}),
            },
            response: {
              status: 403,
            },
            body: {
              type: authErrorAttachmentParsed['type'],
              ...((authErrorAttachmentParsed['json'] !== undefined) ? { json: authErrorAttachmentParsed['json'] } : {}),
              ...((authErrorAttachmentParsed['text'] !== undefined) ? { text: authErrorAttachmentParsed['text'] } : {}),
            },
          };
          const authErrorAttachmentJson: Worker_Handlers_HandleRequest_AuthErrorAttachmentJson = JSON.stringify(authErrorAttachmentData, null, 2);
          const authErrorAttachmentBuffer: Worker_Handlers_HandleRequest_AuthErrorAttachmentBuffer = new TextEncoder().encode(authErrorAttachmentJson).buffer as ArrayBuffer;

          await send({
            messages: [],
            servers: resolvedServers,
            primaryServer,
            topic: ctx['error_topic'],
            mode: ctx['mode'],
            visitorIp: received['headers'].get('cf-connecting-ip') ?? undefined,
            attachment: authErrorAttachmentBuffer,
            filename: 'error-debug.json',
            attachmentTitle: 'Authentication Error',
          });
        } catch {
          // Best-effort error notification; ignore failures.
        }
      }

      return new Response(JSON.stringify({
        status: 'error',
        message: 'Unauthorized',
      }, null, 2), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 4. Parse.
    const parsed: Worker_Handlers_HandleRequest_Parsed = parse(received['rawBody'], received['headers']);

    if (parsed['type'] === 'unknown') {
      return new Response(JSON.stringify({
        status: 'error',
        message: 'Unknown content type',
      }, null, 2), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Debug log raw request body.
    const rawBodyJsonStr: Worker_Handlers_HandleRequest_RawBodyJsonStr = (parsed['json'] !== undefined) ? JSON.stringify(parsed['json']) : '';
    const rawBodyText: Worker_Handlers_HandleRequest_RawBodyText = parsed['text'] ?? ((rawBodyJsonStr.length > 0) ? rawBodyJsonStr : undefined);
    const debugRawRequestStr: Worker_Handlers_HandleRequest_DebugRawRequestStr = JSON.stringify({
      debug: 'raw_request',
      type: parsed['type'],
      body: rawBodyText ?? '(binary)',
    });

    console.info(debugRawRequestStr);

    // 5. Interpret.
    const input: Worker_Handlers_HandleRequest_Input = parsed['json']
      ?? parsed['text']
      ?? parsed['binary']
      ?? '';
    let interpreted: Worker_Handlers_HandleRequest_Interpreted = undefined;

    try {
      interpreted = await interpret(ctx['interpreter'], input, (kv !== undefined) ? { kv } : {});
    } catch (err) {
      const interpretErrorName: Worker_Handlers_HandleRequest_InterpretErrorName = (err instanceof Error) ? err.name : 'Error';
      const interpretErrorMessage: Worker_Handlers_HandleRequest_InterpretErrorMessage = (err instanceof Error) ? err.message : 'Unknown interpretation error';
      const interpretErrorStack: Worker_Handlers_HandleRequest_InterpretErrorStack = (err instanceof Error) ? err.stack : undefined;
      let interpretErrorIssues: Worker_Handlers_HandleRequest_InterpretErrorIssues = undefined;

      if (
        err instanceof Error
        && err.name === 'ZodError'
        && 'issues' in err
      ) {
        const interpretErrorIssuesRaw: Worker_Handlers_HandleRequest_InterpretErrorIssuesRaw = Reflect.get(err, 'issues');

        if (Array.isArray(interpretErrorIssuesRaw) === true) {
          interpretErrorIssues = interpretErrorIssuesRaw;
        }
      }

      if (ctx['error_topic'] !== undefined && shouldNotifyError(ctx, 'interpretation') === true) {
        try {
          // Mask the authorization header value rather than stripping the field.
          const interpretErrorAttachmentHeaderEntries: Worker_Handlers_HandleRequest_InterpretErrorAttachmentHeaderEntries = [...received['headers'].entries()].map((entry) => {
            const interpretEntryName: Worker_Handlers_HandleRequest_InterpretEntryName = entry[0];
            const interpretEntryValue: Worker_Handlers_HandleRequest_InterpretEntryValue = entry[1];

            if (interpretEntryName.toLowerCase() === 'authorization') {
              return [
                interpretEntryName,
                'REDACTED',
              ];
            }

            return [
              interpretEntryName,
              interpretEntryValue,
            ];
          });
          const interpretErrorAttachmentHeaders: Worker_Handlers_HandleRequest_InterpretErrorAttachmentHeaders = Object.fromEntries(interpretErrorAttachmentHeaderEntries);

          const interpretErrorAttachmentData: Worker_Handlers_HandleRequest_InterpretErrorAttachmentData = {
            timestamp: new Date().toISOString(),
            error: {
              type: 'interpretation',
              name: interpretErrorName,
              message: interpretErrorMessage,
              ...((interpretErrorStack !== undefined) ? { stack: interpretErrorStack } : {}),
              ...((interpretErrorIssues !== undefined) ? { issues: interpretErrorIssues } : {}),
            },
            context: {
              name: ctx['name'],
              interpreter: ctx['interpreter'],
              stage: 'interpretation',
            },
            request: {
              method: received['method'],
              url: attachmentUrl,
              headers: interpretErrorAttachmentHeaders,
              ...((received['cfProperties'] !== undefined) ? { cf: received['cfProperties'] } : {}),
            },
            response: {
              status: 422,
            },
            body: {
              type: parsed['type'],
              ...((parsed['json'] !== undefined) ? { json: parsed['json'] } : {}),
              ...((parsed['text'] !== undefined) ? { text: parsed['text'] } : {}),
            },
          };
          const interpretErrorAttachmentJson: Worker_Handlers_HandleRequest_InterpretErrorAttachmentJson = JSON.stringify(interpretErrorAttachmentData, null, 2);
          const interpretErrorAttachmentBuffer: Worker_Handlers_HandleRequest_InterpretErrorAttachmentBuffer = new TextEncoder().encode(interpretErrorAttachmentJson).buffer as ArrayBuffer;

          await send({
            messages: [],
            servers: resolvedServers,
            primaryServer,
            topic: ctx['error_topic'],
            mode: ctx['mode'],
            visitorIp: received['headers'].get('cf-connecting-ip') ?? undefined,
            attachment: interpretErrorAttachmentBuffer,
            filename: 'error-debug.json',
            attachmentTitle: 'Interpretation Error',
          });
        } catch {
          // Best-effort error notification; ignore failures.
        }
      }

      return new Response(JSON.stringify({
        status: 'error',
        message: interpretErrorMessage,
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
    const visitorIpHeader: Worker_Handlers_HandleRequest_VisitorIpHeader = received['headers'].get('cf-connecting-ip');
    const formatted: Worker_Handlers_HandleRequest_Formatted = format(interpreted['notification'], {
      showVisitorInfo: ctx['show_visitor_info'],
      ...((visitorIpHeader !== null) ? { visitorIp: visitorIpHeader } : {}),
      ...((received['cfProperties'] !== undefined) ? { cfProperties: received['cfProperties'] } : {}),
    });

    // 7. Split.
    const messages: Worker_Handlers_HandleRequest_Messages = (interpreted['attachment'] !== undefined && formatted['body'].length === 0) ? [] : split(formatted);

    // 8. Persist and deliver.
    const deliveryResult: Worker_Handlers_HandleRequest_DeliveryResult = await deliver(ctx['id'], outbox, {
      messages,
      servers: resolvedServers,
      primaryServer,
      topic: ctx['topic'],
      mode: ctx['mode'],
      contextName: ctx['name'],
      interpreterName: ctx['interpreter'],
      errorTopic: ctx['error_topic'],
      visitorIp: received['headers'].get('cf-connecting-ip') ?? undefined,
      attachment: interpreted['attachment'],
      filename: interpreted['notification']['filename'],
    });

    // 9. Respond.
    const response: Worker_Handlers_HandleRequest_Response = respond(deliveryResult, {
      showResponseOutput: config['settings']['show_response_output'],
      contextName: ctx['name'],
      interpreterName: ctx['interpreter'],
      messageTitle: interpreted['notification']['title'],
      bodySize: formatted['body'].length,
      parts: messages.length,
      hasAttachment: interpreted['attachment'] !== undefined,
    });

    // Debug log for Cloudflare real-time logs.
    const cloned: Worker_Handlers_HandleRequest_Cloned = response.clone();
    const responseBody: Worker_Handlers_HandleRequest_ResponseBody = await cloned.text();

    console.info(responseBody);

    return response;
  } catch (err) {
    const fatalErrorMessage: Worker_Handlers_HandleRequest_FatalErrorMessage = (err instanceof Error) ? err.message : 'Internal server error';
    const body: Worker_Handlers_HandleRequest_Body = (config['settings']['show_response_output'] === true) ? {
      status: 'error',
      message: fatalErrorMessage,
    } : {
      status: 'error',
      message: 'Internal server error',
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
 * @param {Worker_Handlers_HandleEmail_RawEmail} rawEmail - Raw email.
 * @param {Worker_Handlers_HandleEmail_From}     from     - From.
 * @param {Worker_Handlers_HandleEmail_Config}   config   - Config.
 * @param {Worker_Handlers_HandleEmail_Kv}       kv       - Kv.
 * @param {Worker_Handlers_HandleEmail_Outbox}   outbox   - Outbox.
 *
 * @returns {Worker_Handlers_HandleEmail_Returns}
 *
 * @since 2.0.0
 */
async function handleEmail(rawEmail: Worker_Handlers_HandleEmail_RawEmail, from: Worker_Handlers_HandleEmail_From, config: Worker_Handlers_HandleEmail_Config, kv: Worker_Handlers_HandleEmail_Kv, outbox: Worker_Handlers_HandleEmail_Outbox): Worker_Handlers_HandleEmail_Returns {
  try {
    // 1. Parse email.
    const parsed: Worker_Handlers_HandleEmail_Parsed = await parseEmail(rawEmail);

    // Debug log raw email.
    const debugRawEmailStr: Worker_Handlers_HandleEmail_DebugRawEmailStr = JSON.stringify({
      debug: 'raw_email',
      from,
      to: parsed['to'],
      subject: parsed['subject'],
      rawEmail,
    });

    console.info(debugRawEmailStr);

    // 2. Route by recipient local part.
    const recipientLocalPart: Worker_Handlers_HandleEmail_RecipientLocalPart = parsed['to'].split('@')[0] ?? '';
    const routed: Worker_Handlers_HandleEmail_Routed = route('email', recipientLocalPart, config);

    if (
      routed['error'] !== undefined
      || routed['context'] === undefined
      || routed['resolvedServers'] === undefined
      || routed['primaryServer'] === undefined
    ) {
      return;
    }

    const ctx: Worker_Handlers_HandleEmail_Ctx = routed['context'] as Worker_Handlers_HandleEmail_Ctx;
    const resolvedServers: Worker_Handlers_HandleEmail_ResolvedServers = routed['resolvedServers'] as Worker_Handlers_HandleEmail_ResolvedServers;
    const primaryServer: Worker_Handlers_HandleEmail_PrimaryServer = routed['primaryServer'];

    // 3. Authenticate.
    const authResult: Worker_Handlers_HandleEmail_AuthResult = authenticate(
      {
        type: 'email',
        ...((ctx['allowed_from'] !== undefined) ? { allowed_from: ctx['allowed_from'] } : {}),
      },
      {
        authorization: undefined,
        from,
      },
    );

    if (authResult['authenticated'] === false) {
      if (ctx['error_topic'] !== undefined && shouldNotifyError(ctx, 'authentication') === true) {
        try {
          const authErrorAttachmentData: Worker_Handlers_HandleEmail_AuthErrorAttachmentData = {
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
          const authErrorAttachmentJson: Worker_Handlers_HandleEmail_AuthErrorAttachmentJson = JSON.stringify(authErrorAttachmentData, null, 2);
          const authErrorAttachmentBuffer: Worker_Handlers_HandleEmail_AuthErrorAttachmentBuffer = new TextEncoder().encode(authErrorAttachmentJson).buffer as ArrayBuffer;

          await send({
            messages: [],
            servers: resolvedServers,
            primaryServer,
            topic: ctx['error_topic'],
            mode: ctx['mode'],
            attachment: authErrorAttachmentBuffer,
            filename: 'error-debug.json',
            attachmentTitle: 'Email Authentication Error',
          });
        } catch {
          // Best-effort error notification; ignore failures.
        }
      }

      return;
    }

    // 4. Interpret.
    const emailInput: Worker_Handlers_HandleEmail_EmailInput = {
      subject: parsed['subject'],
      textBody: parsed['textBody'],
      from: parsed['from'],
      to: parsed['to'],
    };

    let interpreted: Worker_Handlers_HandleEmail_Interpreted = undefined;

    try {
      interpreted = await interpret(ctx['interpreter'], emailInput, (kv !== undefined) ? { kv } : {});
    } catch (err) {
      const errorName: Worker_Handlers_HandleEmail_ErrorName = (err instanceof Error) ? err.name : 'Error';
      const errorMessage: Worker_Handlers_HandleEmail_ErrorMessage = (err instanceof Error) ? err.message : 'Unknown interpretation error';
      const errorStack: Worker_Handlers_HandleEmail_ErrorStack = (err instanceof Error) ? err.stack : undefined;
      let errorIssues: Worker_Handlers_HandleEmail_ErrorIssues = undefined;

      if (
        err instanceof Error
        && err.name === 'ZodError'
        && 'issues' in err
      ) {
        const errorIssuesRaw: Worker_Handlers_HandleEmail_ErrorIssuesRaw = Reflect.get(err, 'issues');

        if (Array.isArray(errorIssuesRaw) === true) {
          errorIssues = errorIssuesRaw;
        }
      }

      if (ctx['error_topic'] !== undefined && shouldNotifyError(ctx, 'interpretation') === true) {
        try {
          const interpretErrorAttachmentData: Worker_Handlers_HandleEmail_InterpretErrorAttachmentData = {
            timestamp: new Date().toISOString(),
            error: {
              type: 'interpretation',
              name: errorName,
              message: errorMessage,
              ...((errorStack !== undefined) ? { stack: errorStack } : {}),
              ...((errorIssues !== undefined) ? { issues: errorIssues } : {}),
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
          const interpretErrorAttachmentJson: Worker_Handlers_HandleEmail_InterpretErrorAttachmentJson = JSON.stringify(interpretErrorAttachmentData, null, 2);
          const interpretErrorAttachmentBuffer: Worker_Handlers_HandleEmail_InterpretErrorAttachmentBuffer = new TextEncoder().encode(interpretErrorAttachmentJson).buffer as ArrayBuffer;

          await send({
            messages: [],
            servers: resolvedServers,
            primaryServer,
            topic: ctx['error_topic'],
            mode: ctx['mode'],
            attachment: interpretErrorAttachmentBuffer,
            filename: 'error-debug.json',
            attachmentTitle: 'Email Interpretation Error',
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
    const formatted: Worker_Handlers_HandleEmail_Formatted = format(interpreted['notification'], {
      showVisitorInfo: ctx['show_visitor_info'],
    });

    // 6. Split.
    const messages: Worker_Handlers_HandleEmail_Messages = (interpreted['attachment'] !== undefined && formatted['body'].length === 0) ? [] : split(formatted);

    // 7. Persist and deliver.
    const deliveryResult: Worker_Handlers_HandleEmail_DeliveryResult = await deliver(ctx['id'], outbox, {
      messages,
      servers: resolvedServers,
      primaryServer,
      topic: ctx['topic'],
      mode: ctx['mode'],
      contextName: ctx['name'],
      interpreterName: ctx['interpreter'],
      errorTopic: ctx['error_topic'],
      attachment: interpreted['attachment'],
      filename: interpreted['notification']['filename'],
    });

    // Debug log for Cloudflare real-time logs.
    const debugLogStr: Worker_Handlers_HandleEmail_DebugLogStr = JSON.stringify({
      context: ctx['name'],
      interpreter: ctx['interpreter'],
      deliveryState: deliveryResult['state'],
      pending: deliveryResult['pending'],
      servers: (deliveryResult['sendResult'] === undefined) ? [] : deliveryResult['sendResult']['results'],
      bodySize: formatted['body'].length,
      parts: messages.length,
    }, null, 2);

    console.info(debugLogStr);
  } catch (err) {
    // Log for Cloudflare real-time logs and return void so the email is accepted rather than bounced.
    const fatalErrorMessage: Worker_Handlers_HandleEmail_FatalErrorMessage = (err instanceof Error) ? err.message : 'Unknown error';
    const fatalDebugStr: Worker_Handlers_HandleEmail_FatalDebugStr = JSON.stringify({
      debug: 'fatal_email_error',
      error: fatalErrorMessage,
    });

    console.info(fatalDebugStr);
  }

  return;
}

export {
  handleEmail,
  handleRequest,
  shouldNotifyError,
};

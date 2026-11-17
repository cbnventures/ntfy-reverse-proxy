import {
  describe, expect, it, vi,
} from 'vitest';

import { handleEmail, handleRequest } from '../../worker/handlers.js';
import { createWorker } from '../../worker/index.js';
import { send } from '../../worker/pipeline/send.js';

import type {
  Tests_Worker_Index_CloudflareWorkers_DurableObject,
  Tests_Worker_Index_CreateMockKv_KvCast,
  Tests_Worker_Index_CreateMockKv_Resolved,
  Tests_Worker_Index_CreateMockKv_Returns,
  Tests_Worker_Index_CreateMockKv_Store,
  Tests_Worker_Index_CreateWorker_IgnoresAnEmailWhenTheConfigIsInvalid_Message,
  Tests_Worker_Index_CreateWorker_IgnoresAnEmailWhenTheConfigIsInvalid_MockFetch,
  Tests_Worker_Index_CreateWorker_IgnoresAnEmailWhenTheConfigIsInvalid_RawEmail,
  Tests_Worker_Index_CreateWorker_IgnoresAnEmailWhenTheConfigIsInvalid_Worker,
  Tests_Worker_Index_CreateWorker_ProcessesAnEmailWithAValidConfig_Message,
  Tests_Worker_Index_CreateWorker_ProcessesAnEmailWithAValidConfig_MockFetch,
  Tests_Worker_Index_CreateWorker_ProcessesAnEmailWithAValidConfig_RawEmail,
  Tests_Worker_Index_CreateWorker_ProcessesAnEmailWithAValidConfig_Worker,
  Tests_Worker_Index_CreateWorker_ProcessesARequestWithAValidConfig_Body,
  Tests_Worker_Index_CreateWorker_ProcessesARequestWithAValidConfig_MockFetch,
  Tests_Worker_Index_CreateWorker_ProcessesARequestWithAValidConfig_Request,
  Tests_Worker_Index_CreateWorker_ProcessesARequestWithAValidConfig_Response,
  Tests_Worker_Index_CreateWorker_ProcessesARequestWithAValidConfig_Worker,
  Tests_Worker_Index_CreateWorker_Returns500ForARequestWhenTheConfigIsInvalid_Body,
  Tests_Worker_Index_CreateWorker_Returns500ForARequestWhenTheConfigIsInvalid_MockFetch,
  Tests_Worker_Index_CreateWorker_Returns500ForARequestWhenTheConfigIsInvalid_Request,
  Tests_Worker_Index_CreateWorker_Returns500ForARequestWhenTheConfigIsInvalid_Response,
  Tests_Worker_Index_CreateWorker_Returns500ForARequestWhenTheConfigIsInvalid_Worker,
  Tests_Worker_Index_Env,
  Tests_Worker_Index_HandleEmail_AcceptsEmailFromAuthorizedSender_MockFetch,
  Tests_Worker_Index_HandleEmail_AcceptsEmailFromAuthorizedSender_RawEmail,
  Tests_Worker_Index_HandleEmail_AllowsEmailWhenNoAllowedFromIsConfigured_MockFetch,
  Tests_Worker_Index_HandleEmail_AllowsEmailWhenNoAllowedFromIsConfigured_RawEmail,
  Tests_Worker_Index_HandleEmail_ProcessesAValidEmailThroughThePipeline_MockFetch,
  Tests_Worker_Index_HandleEmail_ProcessesAValidEmailThroughThePipeline_RawEmail,
  Tests_Worker_Index_HandleEmail_RejectsEmailFromUnauthorizedSender_MockFetch,
  Tests_Worker_Index_HandleEmail_RejectsEmailFromUnauthorizedSender_RawEmail,
  Tests_Worker_Index_HandleEmail_SilentlyIgnoresEmailsWithNoMatchingContext_MockFetch,
  Tests_Worker_Index_HandleEmail_SilentlyIgnoresEmailsWithNoMatchingContext_RawEmail,
  Tests_Worker_Index_HandleEmail_SuppressesAuthErrorNotificationWhenEmailErrorEventsExcludesAuthentication_MockFetch,
  Tests_Worker_Index_HandleEmail_SuppressesAuthErrorNotificationWhenEmailErrorEventsExcludesAuthentication_RawEmail,
  Tests_Worker_Index_HandleRequest_AcceptsOneMessageWithASessionTokenFromTheSessionPath_Kv,
  Tests_Worker_Index_HandleRequest_AcceptsOneMessageWithASessionTokenFromTheSessionPath_MessageRequest,
  Tests_Worker_Index_HandleRequest_AcceptsOneMessageWithASessionTokenFromTheSessionPath_MessageResponse,
  Tests_Worker_Index_HandleRequest_AcceptsOneMessageWithASessionTokenFromTheSessionPath_ReplayRequest,
  Tests_Worker_Index_HandleRequest_AcceptsOneMessageWithASessionTokenFromTheSessionPath_ReplayResponse,
  Tests_Worker_Index_HandleRequest_AcceptsOneMessageWithASessionTokenFromTheSessionPath_SessionBody,
  Tests_Worker_Index_HandleRequest_AcceptsOneMessageWithASessionTokenFromTheSessionPath_SessionRequest,
  Tests_Worker_Index_HandleRequest_AcceptsOneMessageWithASessionTokenFromTheSessionPath_SessionResponse,
  Tests_Worker_Index_HandleRequest_IgnoresTheContextHeaderOutsideLocalhost_Request,
  Tests_Worker_Index_HandleRequest_IgnoresTheContextHeaderOutsideLocalhost_Response,
  Tests_Worker_Index_HandleRequest_PassesThroughWhenNoTokenConfigured_Request,
  Tests_Worker_Index_HandleRequest_PassesThroughWhenNoTokenConfigured_Response,
  Tests_Worker_Index_HandleRequest_PreservesBinaryRequestBodiesAsAttachments_Bytes,
  Tests_Worker_Index_HandleRequest_PreservesBinaryRequestBodiesAsAttachments_MockFetch,
  Tests_Worker_Index_HandleRequest_PreservesBinaryRequestBodiesAsAttachments_Request,
  Tests_Worker_Index_HandleRequest_PreservesBinaryRequestBodiesAsAttachments_Response,
  Tests_Worker_Index_HandleRequest_ProcessesAValidPOSTRequestThroughThePipeline_Body,
  Tests_Worker_Index_HandleRequest_ProcessesAValidPOSTRequestThroughThePipeline_Request,
  Tests_Worker_Index_HandleRequest_ProcessesAValidPOSTRequestThroughThePipeline_Response,
  Tests_Worker_Index_HandleRequest_ProcessesLaterNotificationsAfterAnErrorTopicAttachmentFails_Enqueue,
  Tests_Worker_Index_HandleRequest_ProcessesLaterNotificationsAfterAnErrorTopicAttachmentFails_FailedRequest,
  Tests_Worker_Index_HandleRequest_ProcessesLaterNotificationsAfterAnErrorTopicAttachmentFails_FailedResponse,
  Tests_Worker_Index_HandleRequest_ProcessesLaterNotificationsAfterAnErrorTopicAttachmentFails_IsolatedOutbox,
  Tests_Worker_Index_HandleRequest_ProcessesLaterNotificationsAfterAnErrorTopicAttachmentFails_MockFetch,
  Tests_Worker_Index_HandleRequest_ProcessesLaterNotificationsAfterAnErrorTopicAttachmentFails_ValidRequest,
  Tests_Worker_Index_HandleRequest_ProcessesLaterNotificationsAfterAnErrorTopicAttachmentFails_ValidResponse,
  Tests_Worker_Index_HandleRequest_RejectsAMessageWithoutASessionTokenWhenSessionsAreOn_Request,
  Tests_Worker_Index_HandleRequest_RejectsAMessageWithoutASessionTokenWhenSessionsAreOn_Response,
  Tests_Worker_Index_HandleRequest_Returns403WithNoAuthorizationHeaderWhenTokenRequired_Request,
  Tests_Worker_Index_HandleRequest_Returns403WithNoAuthorizationHeaderWhenTokenRequired_Response,
  Tests_Worker_Index_HandleRequest_Returns403WithWrongToken_Body,
  Tests_Worker_Index_HandleRequest_Returns403WithWrongToken_Request,
  Tests_Worker_Index_HandleRequest_Returns403WithWrongToken_Response,
  Tests_Worker_Index_HandleRequest_Returns404ForUnmatchedSubdomain_Request,
  Tests_Worker_Index_HandleRequest_Returns404ForUnmatchedSubdomain_Response,
  Tests_Worker_Index_HandleRequest_Returns404OnTheSessionPathWhenSessionsAreOff_Body,
  Tests_Worker_Index_HandleRequest_Returns404OnTheSessionPathWhenSessionsAreOff_Request,
  Tests_Worker_Index_HandleRequest_Returns404OnTheSessionPathWhenSessionsAreOff_Response,
  Tests_Worker_Index_HandleRequest_Returns405ForUnsupportedMethods_Request,
  Tests_Worker_Index_HandleRequest_Returns405ForUnsupportedMethods_Response,
  Tests_Worker_Index_HandleRequest_RoutesALocalhostRequestByItsContextHeader_Body,
  Tests_Worker_Index_HandleRequest_RoutesALocalhostRequestByItsContextHeader_Request,
  Tests_Worker_Index_HandleRequest_RoutesALocalhostRequestByItsContextHeader_Response,
  Tests_Worker_Index_HandleRequest_SendsErrorNotificationWhenAuthFailsAndErrorTopicConfigured_MockFetch,
  Tests_Worker_Index_HandleRequest_SendsErrorNotificationWhenAuthFailsAndErrorTopicConfigured_Request,
  Tests_Worker_Index_HandleRequest_SendsErrorNotificationWhenAuthFailsAndErrorTopicConfigured_Response,
  Tests_Worker_Index_HandleRequest_ServesLandingPageForGETRequests_ContentType,
  Tests_Worker_Index_HandleRequest_ServesLandingPageForGETRequests_Request,
  Tests_Worker_Index_HandleRequest_ServesLandingPageForGETRequests_Response,
  Tests_Worker_Index_HandleRequest_SucceedsWithCorrectTokenInAuthorizationHeader_Body,
  Tests_Worker_Index_HandleRequest_SucceedsWithCorrectTokenInAuthorizationHeader_Request,
  Tests_Worker_Index_HandleRequest_SucceedsWithCorrectTokenInAuthorizationHeader_Response,
  Tests_Worker_Index_HandleRequest_SuppressesAuthErrorNotificationWhenErrorEventsExcludesAuthentication_MockFetch,
  Tests_Worker_Index_HandleRequest_SuppressesAuthErrorNotificationWhenErrorEventsExcludesAuthentication_Request,
  Tests_Worker_Index_HandleRequest_SuppressesAuthErrorNotificationWhenErrorEventsExcludesAuthentication_Response,
  Tests_Worker_Index_MockConfig,
  Tests_Worker_Index_MockConfigWithErrorTopic,
  Tests_Worker_Index_MockConfigWithErrorTopicAndErrorEvents,
  Tests_Worker_Index_MockConfigWithSession,
  Tests_Worker_Index_MockConfigWithToken,
  Tests_Worker_Index_MockEmailConfig,
  Tests_Worker_Index_MockEmailConfigWithAllowedFrom,
  Tests_Worker_Index_MockEmailConfigWithErrorTopicAndErrorEvents,
  Tests_Worker_Index_Outbox,
  Tests_Worker_Index_SendResult,
} from '../../types/tests/worker/index.test.d.ts';

/**
 * Tests - Worker.
 *
 * Stands in for the Workers runtime module, because the Worker entry also exports
 * the delivery outbox Durable Object, which extends a class only Workers provide.
 *
 * @since 2.3.0
 */
vi.mock('cloudflare:workers', () => {
  const durableObject: Tests_Worker_Index_CloudflareWorkers_DurableObject = vi.fn();

  return {
    DurableObject: durableObject,
  };
});

/**
 * Tests - Worker.
 *
 * @since 2.0.0
 */
vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('ok', { status: 200 })));

/**
 * Tests - Worker - Mock Config.
 *
 * @since 2.0.0
 */
const mockConfig: Tests_Worker_Index_MockConfig = {
  settings: {
    worker_name: 'test-worker',
    base_domain: 'ntfy.example.com',
    show_response_output: false,
  },
  servers: [{
    name: 'alpha',
    server: 'https://ntfy.alpha.example.com',
    token: 'tk_abc',
  }],
  contexts: [{
    id: 'abc123',
    name: 'test-context',
    type: 'http' as const,
    interpreter: 'plain-text' as const,
    topic: 'test-topic',
    error_topic: undefined,
    mode: 'send-once' as const,
    show_visitor_info: false,
    primary_server: 'alpha',
    servers: ['alpha'],
    token: undefined,
  }],
};

/**
 * Tests - Worker - Mock Config With Token.
 *
 * @since 2.0.0
 */
const mockConfigWithToken: Tests_Worker_Index_MockConfigWithToken = {
  settings: {
    worker_name: 'test-worker',
    base_domain: 'ntfy.example.com',
    show_response_output: false,
  },
  servers: [{
    name: 'alpha',
    server: 'https://ntfy.alpha.example.com',
    token: 'tk_abc',
  }],
  contexts: [{
    id: 'secured',
    name: 'token-context',
    type: 'http' as const,
    interpreter: 'plain-text' as const,
    topic: 'secure-topic',
    error_topic: undefined,
    mode: 'send-once' as const,
    show_visitor_info: false,
    primary_server: 'alpha',
    servers: ['alpha'],
    token: 'my-secret-token',
  }],
};

/**
 * Tests - Worker - Mock Config With Error Topic.
 *
 * @since 2.0.0
 */
const mockConfigWithErrorTopic: Tests_Worker_Index_MockConfigWithErrorTopic = {
  settings: {
    worker_name: 'test-worker',
    base_domain: 'ntfy.example.com',
    show_response_output: false,
  },
  servers: [{
    name: 'alpha',
    server: 'https://ntfy.alpha.example.com',
    token: 'tk_abc',
  }],
  contexts: [{
    id: 'errctx',
    name: 'error-context',
    type: 'http' as const,
    interpreter: 'plain-text' as const,
    topic: 'error-topic',
    error_topic: 'error-notifications',
    mode: 'send-once' as const,
    show_visitor_info: false,
    primary_server: 'alpha',
    servers: ['alpha'],
    token: 'my-secret-token',
  }],
};

/**
 * Tests - Worker - Mock Email Config.
 *
 * @since 2.0.0
 */
const mockEmailConfig: Tests_Worker_Index_MockEmailConfig = {
  settings: {
    worker_name: 'test-worker',
    base_domain: 'ntfy.example.com',
    show_response_output: false,
  },
  servers: [{
    name: 'alpha',
    server: 'https://ntfy.alpha.example.com',
    token: 'tk_abc',
  }],
  contexts: [{
    id: 'pfsense',
    name: 'email-context',
    type: 'email' as const,
    interpreter: 'pfsense' as const,
    topic: 'email-topic',
    error_topic: undefined,
    mode: 'send-once' as const,
    show_visitor_info: false,
    primary_server: 'alpha',
    servers: ['alpha'],
    allowed_from: undefined,
  }],
};

/**
 * Tests - Worker - Mock Email Config With Allowed From.
 *
 * @since 2.0.0
 */
const mockEmailConfigWithAllowedFrom: Tests_Worker_Index_MockEmailConfigWithAllowedFrom = {
  settings: {
    worker_name: 'test-worker',
    base_domain: 'ntfy.example.com',
    show_response_output: false,
  },
  servers: [{
    name: 'alpha',
    server: 'https://ntfy.alpha.example.com',
    token: 'tk_abc',
  }],
  contexts: [{
    id: 'restricted',
    name: 'restricted-email',
    type: 'email' as const,
    interpreter: 'pfsense' as const,
    topic: 'restricted-topic',
    error_topic: undefined,
    mode: 'send-once' as const,
    show_visitor_info: false,
    primary_server: 'alpha',
    servers: ['alpha'],
    allowed_from: 'trusted@example.com',
  }],
};

/**
 * Tests - Worker - Mock Email Config With Error Topic And Error Events.
 *
 * @since 2.1.0
 */
const mockEmailConfigWithErrorTopicAndErrorEvents: Tests_Worker_Index_MockEmailConfigWithErrorTopicAndErrorEvents = {
  settings: {
    worker_name: 'test-worker',
    base_domain: 'ntfy.example.com',
    show_response_output: false,
  },
  servers: [{
    name: 'alpha',
    server: 'https://ntfy.alpha.example.com',
    token: 'tk_abc',
  }],
  contexts: [{
    id: 'email-filtered',
    name: 'email-filtered-context',
    type: 'email' as const,
    interpreter: 'pfsense' as const,
    topic: 'email-filtered-topic',
    error_topic: 'error-notifications',
    error_events: ['interpretation'] as const,
    mode: 'send-once' as const,
    show_visitor_info: false,
    primary_server: 'alpha',
    servers: ['alpha'],
    allowed_from: 'trusted@example.com',
  }],
};

/**
 * Tests - Worker - Mock Config With Error Topic And Error Events.
 *
 * @since 2.1.0
 */
const mockConfigWithErrorTopicAndErrorEvents: Tests_Worker_Index_MockConfigWithErrorTopicAndErrorEvents = {
  settings: {
    worker_name: 'test-worker',
    base_domain: 'ntfy.example.com',
    show_response_output: false,
  },
  servers: [{
    name: 'alpha',
    server: 'https://ntfy.alpha.example.com',
    token: 'tk_abc',
  }],
  contexts: [{
    id: 'filtered',
    name: 'filtered-error-context',
    type: 'http' as const,
    interpreter: 'plain-text' as const,
    topic: 'filtered-topic',
    error_topic: 'error-notifications',
    error_events: ['interpretation'] as const,
    mode: 'send-once' as const,
    show_visitor_info: false,
    primary_server: 'alpha',
    servers: ['alpha'],
    token: 'my-secret-token',
  }],
};

/**
 * Tests - Worker - Mock Config With Session.
 *
 * @since 2.4.0
 */
const mockConfigWithSession: Tests_Worker_Index_MockConfigWithSession = {
  settings: {
    worker_name: 'test-worker',
    base_domain: 'ntfy.example.com',
    show_response_output: false,
  },
  servers: [{
    name: 'alpha',
    server: 'https://ntfy.alpha.example.com',
    token: 'tk_abc',
  }],
  contexts: [{
    id: 'sessioned',
    name: 'session-context',
    type: 'http' as const,
    interpreter: 'plain-text' as const,
    topic: 'session-topic',
    error_topic: undefined,
    mode: 'send-once' as const,
    show_visitor_info: false,
    primary_server: 'alpha',
    servers: ['alpha'],
    session: {
      secret: 'test-secret-that-is-at-least-32-characters-long',
    },
  }],
};

/**
 * Tests - Worker - Create Mock Kv.
 *
 * Map-backed stand-in for the KV namespace that session tokens use to
 * count requests and remember spent tokens.
 *
 * @returns {Tests_Worker_Index_CreateMockKv_Returns}
 *
 * @since 2.4.0
 */
function createMockKv(): Tests_Worker_Index_CreateMockKv_Returns {
  const store: Tests_Worker_Index_CreateMockKv_Store = new Map();

  return {
    get: vi.fn((key) => {
      const resolved: Tests_Worker_Index_CreateMockKv_Resolved = store.get(key) ?? null;

      return Promise.resolve(resolved);
    }),
    put: vi.fn((key, value) => {
      store.set(key, value);

      return Promise.resolve();
    }),
  } as Tests_Worker_Index_CreateMockKv_KvCast as KVNamespace;
}

/**
 * Tests - Worker - Outbox.
 *
 * Lightweight adapter used by pipeline-focused handler tests. Durable
 * persistence and FIFO behavior are covered by the Workers runtime tests.
 *
 * @since 2.2.1
 */
const outbox: Tests_Worker_Index_Outbox = {
  getByName: () => ({
    enqueue: async (options) => {
      const sendResult: Tests_Worker_Index_SendResult = await send({
        messages: options['messages'],
        servers: [{
          name: 'alpha',
          server: 'https://ntfy.alpha.example.com',
          token: 'tk_abc',
        }],
        primaryServer: {
          name: 'alpha',
          server: 'https://ntfy.alpha.example.com',
          token: 'tk_abc',
        },
        topic: options['topic'],
        mode: options['mode'],
        visitorIp: options['visitorIp'],
        attachment: options['attachment'],
        filename: options['filename'],
        attachmentHeaders: options['attachmentHeaders'],
        deliveryId: 'test-delivery',
      });

      return {
        deliveryId: 'test-delivery',
        state: 'delivered',
        pending: 0,
        sendResult,
      };
    },
  }),
};

/**
 * Tests - Worker - Env.
 *
 * Bindings handed to the Worker handlers. The KV namespace stays unset, like a
 * deploy that has not created one yet.
 *
 * @since 2.3.0
 */
const env: Tests_Worker_Index_Env = {
  DELIVERY_OUTBOX: outbox,
};

/**
 * Tests - Worker - Create Worker.
 *
 * @since 2.3.0
 */
describe('createWorker', () => {
  /**
   * Tests - Worker.
   *
   * @since 2.3.0
   */
  it('processes a request with a valid config', async () => {
    const mockFetch: Tests_Worker_Index_CreateWorker_ProcessesARequestWithAValidConfig_MockFetch = vi.fn().mockResolvedValue(new Response('ok', { status: 200 }));

    vi.stubGlobal('fetch', mockFetch);

    const worker: Tests_Worker_Index_CreateWorker_ProcessesARequestWithAValidConfig_Worker = createWorker(mockConfig);
    const request: Tests_Worker_Index_CreateWorker_ProcessesARequestWithAValidConfig_Request = new Request('https://abc123.ntfy.example.com/', {
      method: 'POST',
      body: 'Hello world',
    });
    const response: Tests_Worker_Index_CreateWorker_ProcessesARequestWithAValidConfig_Response = await worker.fetch(request, env);

    expect(response['status']).toBe(200);

    const body: Tests_Worker_Index_CreateWorker_ProcessesARequestWithAValidConfig_Body = await response.json();

    expect(body['status']).toBe('success');

    expect(mockFetch).toHaveBeenCalled();

    return;
  });

  /**
   * Tests - Worker.
   *
   * @since 2.3.0
   */
  it('returns 500 for a request when the config is invalid', async () => {
    const mockFetch: Tests_Worker_Index_CreateWorker_Returns500ForARequestWhenTheConfigIsInvalid_MockFetch = vi.fn().mockResolvedValue(new Response('ok', { status: 200 }));

    vi.stubGlobal('fetch', mockFetch);

    const worker: Tests_Worker_Index_CreateWorker_Returns500ForARequestWhenTheConfigIsInvalid_Worker = createWorker({
      ...mockConfig,
      contexts: 'not-a-list',
    });
    const request: Tests_Worker_Index_CreateWorker_Returns500ForARequestWhenTheConfigIsInvalid_Request = new Request('https://abc123.ntfy.example.com/', {
      method: 'POST',
      body: 'Hello world',
    });
    const response: Tests_Worker_Index_CreateWorker_Returns500ForARequestWhenTheConfigIsInvalid_Response = await worker.fetch(request, env);

    expect(response['status']).toBe(500);

    const body: Tests_Worker_Index_CreateWorker_Returns500ForARequestWhenTheConfigIsInvalid_Body = await response.json();

    expect(body['status']).toBe('error');

    expect(body['message']).toBe('Invalid configuration');

    expect(mockFetch).not.toHaveBeenCalled();

    return;
  });

  /**
   * Tests - Worker.
   *
   * @since 2.3.0
   */
  it('processes an email with a valid config', async () => {
    const mockFetch: Tests_Worker_Index_CreateWorker_ProcessesAnEmailWithAValidConfig_MockFetch = vi.fn().mockResolvedValue(new Response('ok', { status: 200 }));

    vi.stubGlobal('fetch', mockFetch);

    const worker: Tests_Worker_Index_CreateWorker_ProcessesAnEmailWithAValidConfig_Worker = createWorker(mockEmailConfig);
    const rawEmail: Tests_Worker_Index_CreateWorker_ProcessesAnEmailWithAValidConfig_RawEmail = [
      'From: sender@example.com',
      'To: pfsense@ntfy.example.com',
      'Subject: Test Alert',
      'Content-Type: text/plain',
      '',
      'This is a test email body.',
    ].join('\r\n');
    const message: Tests_Worker_Index_CreateWorker_ProcessesAnEmailWithAValidConfig_Message = {
      from: 'sender@example.com',
      to: 'pfsense@ntfy.example.com',
      headers: new Headers(),
      raw: new Blob([rawEmail]).stream(),
    };

    await worker.email(message, env);

    expect(mockFetch).toHaveBeenCalled();

    return;
  });

  /**
   * Tests - Worker.
   *
   * @since 2.3.0
   */
  it('ignores an email when the config is invalid', async () => {
    const mockFetch: Tests_Worker_Index_CreateWorker_IgnoresAnEmailWhenTheConfigIsInvalid_MockFetch = vi.fn().mockResolvedValue(new Response('ok', { status: 200 }));

    vi.stubGlobal('fetch', mockFetch);

    const worker: Tests_Worker_Index_CreateWorker_IgnoresAnEmailWhenTheConfigIsInvalid_Worker = createWorker({
      ...mockEmailConfig,
      contexts: 'not-a-list',
    });
    const rawEmail: Tests_Worker_Index_CreateWorker_IgnoresAnEmailWhenTheConfigIsInvalid_RawEmail = [
      'From: sender@example.com',
      'To: pfsense@ntfy.example.com',
      'Subject: Test Alert',
      'Content-Type: text/plain',
      '',
      'This is a test email body.',
    ].join('\r\n');
    const message: Tests_Worker_Index_CreateWorker_IgnoresAnEmailWhenTheConfigIsInvalid_Message = {
      from: 'sender@example.com',
      to: 'pfsense@ntfy.example.com',
      headers: new Headers(),
      raw: new Blob([rawEmail]).stream(),
    };

    await worker.email(message, env);

    expect(mockFetch).not.toHaveBeenCalled();

    return;
  });

  return;
});

/**
 * Tests - Worker - Handle Request.
 *
 * @since 2.0.0
 */
describe('handleRequest', () => {
  /**
   * Tests - Worker.
   *
   * @since 2.0.0
   */
  it('processes a valid POST request through the pipeline', async () => {
    const request: Tests_Worker_Index_HandleRequest_ProcessesAValidPOSTRequestThroughThePipeline_Request = new Request('https://abc123.ntfy.example.com/', {
      method: 'POST',
      body: 'Hello world',
    });
    const response: Tests_Worker_Index_HandleRequest_ProcessesAValidPOSTRequestThroughThePipeline_Response = await handleRequest(request, mockConfig, undefined, outbox);

    expect(response['status']).toBe(200);

    const body: Tests_Worker_Index_HandleRequest_ProcessesAValidPOSTRequestThroughThePipeline_Body = await response.json();

    expect(body['status']).toBe('success');

    return;
  });

  /**
   * Tests - Worker.
   *
   * @since 2.3.0
   */
  it('preserves binary request bodies as attachments', async () => {
    const mockFetch: Tests_Worker_Index_HandleRequest_PreservesBinaryRequestBodiesAsAttachments_MockFetch = vi.fn().mockResolvedValue(new Response('ok', { status: 200 }));

    vi.stubGlobal('fetch', mockFetch);

    const bytes: Tests_Worker_Index_HandleRequest_PreservesBinaryRequestBodiesAsAttachments_Bytes = new Uint8Array([
      137,
      80,
      78,
      71,
      0,
      255,
    ]);
    const request: Tests_Worker_Index_HandleRequest_PreservesBinaryRequestBodiesAsAttachments_Request = new Request('https://abc123.ntfy.example.com/', {
      method: 'POST',
      headers: { 'Content-Type': 'image/png' },
      body: bytes.buffer,
    });
    const response: Tests_Worker_Index_HandleRequest_PreservesBinaryRequestBodiesAsAttachments_Response = await handleRequest(request, mockConfig, undefined, outbox);

    expect(response['status']).toBe(200);

    expect(mockFetch).toHaveBeenCalledOnce();

    expect(mockFetch).toHaveBeenCalledWith('https://ntfy.alpha.example.com/test-topic', expect.objectContaining({ method: 'PUT' }));

    expect(new Uint8Array((mockFetch.mock.calls[0]![1] as RequestInit)['body'] as ArrayBuffer)).toEqual(bytes);

    return;
  });

  /**
   * Tests - Worker.
   *
   * @since 2.0.0
   */
  it('serves landing page for GET requests', async () => {
    const request: Tests_Worker_Index_HandleRequest_ServesLandingPageForGETRequests_Request = new Request('https://abc123.ntfy.example.com/', {
      method: 'GET',
    });
    const response: Tests_Worker_Index_HandleRequest_ServesLandingPageForGETRequests_Response = await handleRequest(request, mockConfig, undefined, outbox);
    const contentType: Tests_Worker_Index_HandleRequest_ServesLandingPageForGETRequests_ContentType = response.headers.get('content-type');

    expect(contentType).toContain('text/html');

    return;
  });

  /**
   * Tests - Worker.
   *
   * @since 2.0.0
   */
  it('returns 405 for unsupported methods', async () => {
    const request: Tests_Worker_Index_HandleRequest_Returns405ForUnsupportedMethods_Request = new Request('https://abc123.ntfy.example.com/', {
      method: 'DELETE',
    });
    const response: Tests_Worker_Index_HandleRequest_Returns405ForUnsupportedMethods_Response = await handleRequest(request, mockConfig, undefined, outbox);

    expect(response['status']).toBe(405);

    return;
  });

  /**
   * Tests - Worker.
   *
   * @since 2.0.0
   */
  it('returns 404 for unmatched subdomain', async () => {
    const request: Tests_Worker_Index_HandleRequest_Returns404ForUnmatchedSubdomain_Request = new Request('https://unknown.ntfy.example.com/', {
      method: 'POST',
      body: 'test',
    });
    const response: Tests_Worker_Index_HandleRequest_Returns404ForUnmatchedSubdomain_Response = await handleRequest(request, mockConfig, undefined, outbox);

    expect(response['status']).toBe(404);

    return;
  });

  /**
   * Tests - Worker.
   *
   * @since 2.3.0
   */
  it('routes a localhost request by its context header', async () => {
    const request: Tests_Worker_Index_HandleRequest_RoutesALocalhostRequestByItsContextHeader_Request = new Request('http://localhost/', {
      method: 'POST',
      headers: { 'X-NRP-Context': 'abc123' },
      body: 'Hello world',
    });
    const response: Tests_Worker_Index_HandleRequest_RoutesALocalhostRequestByItsContextHeader_Response = await handleRequest(request, mockConfig, undefined, outbox);

    expect(response['status']).toBe(200);

    const body: Tests_Worker_Index_HandleRequest_RoutesALocalhostRequestByItsContextHeader_Body = await response.json();

    expect(body['status']).toBe('success');

    return;
  });

  /**
   * Tests - Worker.
   *
   * @since 2.3.0
   */
  it('ignores the context header outside localhost', async () => {
    const request: Tests_Worker_Index_HandleRequest_IgnoresTheContextHeaderOutsideLocalhost_Request = new Request('https://unknown.ntfy.example.com/', {
      method: 'POST',
      headers: { 'X-NRP-Context': 'abc123' },
      body: 'test',
    });
    const response: Tests_Worker_Index_HandleRequest_IgnoresTheContextHeaderOutsideLocalhost_Response = await handleRequest(request, mockConfig, undefined, outbox);

    expect(response['status']).toBe(404);

    return;
  });

  /**
   * Tests - Worker.
   *
   * @since 2.0.0
   */
  it('succeeds with correct token in Authorization header', async () => {
    const request: Tests_Worker_Index_HandleRequest_SucceedsWithCorrectTokenInAuthorizationHeader_Request = new Request('https://secured.ntfy.example.com/', {
      method: 'POST',
      body: 'Authenticated request',
      headers: { Authorization: 'Bearer my-secret-token' },
    });
    const response: Tests_Worker_Index_HandleRequest_SucceedsWithCorrectTokenInAuthorizationHeader_Response = await handleRequest(request, mockConfigWithToken, undefined, outbox);

    expect(response['status']).toBe(200);

    const body: Tests_Worker_Index_HandleRequest_SucceedsWithCorrectTokenInAuthorizationHeader_Body = await response.json();

    expect(body['status']).toBe('success');

    return;
  });

  /**
   * Tests - Worker.
   *
   * @since 2.0.0
   */
  it('returns 403 with wrong token', async () => {
    const request: Tests_Worker_Index_HandleRequest_Returns403WithWrongToken_Request = new Request('https://secured.ntfy.example.com/', {
      method: 'POST',
      body: 'Authenticated request',
      headers: { Authorization: 'Bearer wrong-token' },
    });
    const response: Tests_Worker_Index_HandleRequest_Returns403WithWrongToken_Response = await handleRequest(request, mockConfigWithToken, undefined, outbox);

    expect(response['status']).toBe(403);

    const body: Tests_Worker_Index_HandleRequest_Returns403WithWrongToken_Body = await response.json();

    expect(body['message']).toBe('Unauthorized');

    return;
  });

  /**
   * Tests - Worker.
   *
   * @since 2.0.0
   */
  it('returns 403 with no Authorization header when token required', async () => {
    const request: Tests_Worker_Index_HandleRequest_Returns403WithNoAuthorizationHeaderWhenTokenRequired_Request = new Request('https://secured.ntfy.example.com/', {
      method: 'POST',
      body: 'No auth header',
    });
    const response: Tests_Worker_Index_HandleRequest_Returns403WithNoAuthorizationHeaderWhenTokenRequired_Response = await handleRequest(request, mockConfigWithToken, undefined, outbox);

    expect(response['status']).toBe(403);

    return;
  });

  /**
   * Tests - Worker.
   *
   * @since 2.0.0
   */
  it('passes through when no token configured', async () => {
    const request: Tests_Worker_Index_HandleRequest_PassesThroughWhenNoTokenConfigured_Request = new Request('https://abc123.ntfy.example.com/', {
      method: 'POST',
      body: 'No auth needed',
    });
    const response: Tests_Worker_Index_HandleRequest_PassesThroughWhenNoTokenConfigured_Response = await handleRequest(request, mockConfig, undefined, outbox);

    expect(response['status']).toBe(200);

    return;
  });

  /**
   * Tests - Worker.
   *
   * @since 2.0.0
   */
  it('sends error notification when auth fails and error_topic configured', async () => {
    const mockFetch: Tests_Worker_Index_HandleRequest_SendsErrorNotificationWhenAuthFailsAndErrorTopicConfigured_MockFetch = vi.fn().mockResolvedValue(new Response('ok', { status: 200 }));

    vi.stubGlobal('fetch', mockFetch);

    const request: Tests_Worker_Index_HandleRequest_SendsErrorNotificationWhenAuthFailsAndErrorTopicConfigured_Request = new Request('https://errctx.ntfy.example.com/', {
      method: 'POST',
      body: 'Bad auth',
      headers: { Authorization: 'Bearer wrong' },
    });
    const response: Tests_Worker_Index_HandleRequest_SendsErrorNotificationWhenAuthFailsAndErrorTopicConfigured_Response = await handleRequest(request, mockConfigWithErrorTopic, undefined, outbox);

    expect(response['status']).toBe(403);

    expect(mockFetch).toHaveBeenCalled();

    return;
  });

  /**
   * Tests - Worker.
   *
   * @since 2.3.0
   */
  it('processes later notifications after an error-topic attachment fails', async () => {
    const mockFetch: Tests_Worker_Index_HandleRequest_ProcessesLaterNotificationsAfterAnErrorTopicAttachmentFails_MockFetch = vi.fn()
      .mockResolvedValueOnce(new Response('too large', { status: 413 }));
    const enqueue: Tests_Worker_Index_HandleRequest_ProcessesLaterNotificationsAfterAnErrorTopicAttachmentFails_Enqueue = vi.fn().mockResolvedValue({
      deliveryId: 'later-delivery',
      state: 'delivered',
      pending: 0,
      sendResult: {
        results: [{
          name: 'alpha',
          success: true,
          status: 200,
          stages: ['stage-1: ok'],
        }],
        fallbackUsed: false,
      },
    });
    const isolatedOutbox: Tests_Worker_Index_HandleRequest_ProcessesLaterNotificationsAfterAnErrorTopicAttachmentFails_IsolatedOutbox = {
      getByName: vi.fn(() => ({ enqueue })),
    };

    vi.stubGlobal('fetch', mockFetch);

    const failedRequest: Tests_Worker_Index_HandleRequest_ProcessesLaterNotificationsAfterAnErrorTopicAttachmentFails_FailedRequest = new Request('https://errctx.ntfy.example.com/', {
      method: 'POST',
      body: 'Bad auth',
      headers: { Authorization: 'Bearer wrong' },
    });
    const failedResponse: Tests_Worker_Index_HandleRequest_ProcessesLaterNotificationsAfterAnErrorTopicAttachmentFails_FailedResponse = await handleRequest(failedRequest, mockConfigWithErrorTopic, undefined, isolatedOutbox);

    expect(failedResponse['status']).toBe(403);

    expect(mockFetch).toHaveBeenCalledOnce();

    expect(mockFetch).toHaveBeenCalledWith('https://ntfy.alpha.example.com/error-notifications', expect.objectContaining({ method: 'PUT' }));

    expect(enqueue).not.toHaveBeenCalled();

    const validRequest: Tests_Worker_Index_HandleRequest_ProcessesLaterNotificationsAfterAnErrorTopicAttachmentFails_ValidRequest = new Request('https://errctx.ntfy.example.com/', {
      method: 'POST',
      body: 'Later alert',
      headers: { Authorization: 'Bearer my-secret-token' },
    });
    const validResponse: Tests_Worker_Index_HandleRequest_ProcessesLaterNotificationsAfterAnErrorTopicAttachmentFails_ValidResponse = await handleRequest(validRequest, mockConfigWithErrorTopic, undefined, isolatedOutbox);

    expect(validResponse['status']).toBe(200);

    expect(enqueue).toHaveBeenCalledOnce();

    expect(enqueue).toHaveBeenCalledWith(expect.objectContaining({ topic: 'error-topic' }));

    return;
  });

  /**
   * Tests - Worker.
   *
   * @since 2.1.0
   */
  it('suppresses auth error notification when error_events excludes authentication', async () => {
    const mockFetch: Tests_Worker_Index_HandleRequest_SuppressesAuthErrorNotificationWhenErrorEventsExcludesAuthentication_MockFetch = vi.fn().mockResolvedValue(new Response('ok', { status: 200 }));

    vi.stubGlobal('fetch', mockFetch);

    const request: Tests_Worker_Index_HandleRequest_SuppressesAuthErrorNotificationWhenErrorEventsExcludesAuthentication_Request = new Request('https://filtered.ntfy.example.com/', {
      method: 'POST',
      body: 'Bad auth',
      headers: { Authorization: 'Bearer wrong' },
    });
    const response: Tests_Worker_Index_HandleRequest_SuppressesAuthErrorNotificationWhenErrorEventsExcludesAuthentication_Response = await handleRequest(request, mockConfigWithErrorTopicAndErrorEvents, undefined, outbox);

    expect(response['status']).toBe(403);

    expect(mockFetch).not.toHaveBeenCalled();

    return;
  });

  /**
   * Tests - Worker.
   *
   * @since 2.4.0
   */
  it('accepts one message with a session token from the session path', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('ok', { status: 200 })));

    const kv: Tests_Worker_Index_HandleRequest_AcceptsOneMessageWithASessionTokenFromTheSessionPath_Kv = createMockKv();
    const sessionRequest: Tests_Worker_Index_HandleRequest_AcceptsOneMessageWithASessionTokenFromTheSessionPath_SessionRequest = new Request('https://sessioned.ntfy.example.com/session', {
      method: 'POST',
      headers: { 'CF-Connecting-IP': '203.0.113.10' },
    });
    const sessionResponse: Tests_Worker_Index_HandleRequest_AcceptsOneMessageWithASessionTokenFromTheSessionPath_SessionResponse = await handleRequest(sessionRequest, mockConfigWithSession, kv, outbox);

    expect(sessionResponse['status']).toBe(200);

    const sessionBody: Tests_Worker_Index_HandleRequest_AcceptsOneMessageWithASessionTokenFromTheSessionPath_SessionBody = await sessionResponse.json();

    expect(sessionBody['expires_in']).toBe(300);

    const messageRequest: Tests_Worker_Index_HandleRequest_AcceptsOneMessageWithASessionTokenFromTheSessionPath_MessageRequest = new Request('https://sessioned.ntfy.example.com/', {
      method: 'POST',
      body: 'Session request',
      headers: {
        'Authorization': `Bearer ${sessionBody['token']}`,
        'CF-Connecting-IP': '203.0.113.10',
      },
    });
    const messageResponse: Tests_Worker_Index_HandleRequest_AcceptsOneMessageWithASessionTokenFromTheSessionPath_MessageResponse = await handleRequest(messageRequest, mockConfigWithSession, kv, outbox);

    expect(messageResponse['status']).toBe(200);

    const replayRequest: Tests_Worker_Index_HandleRequest_AcceptsOneMessageWithASessionTokenFromTheSessionPath_ReplayRequest = new Request('https://sessioned.ntfy.example.com/', {
      method: 'POST',
      body: 'Session request',
      headers: {
        'Authorization': `Bearer ${sessionBody['token']}`,
        'CF-Connecting-IP': '203.0.113.10',
      },
    });
    const replayResponse: Tests_Worker_Index_HandleRequest_AcceptsOneMessageWithASessionTokenFromTheSessionPath_ReplayResponse = await handleRequest(replayRequest, mockConfigWithSession, kv, outbox);

    expect(replayResponse['status']).toBe(403);

    return;
  });

  /**
   * Tests - Worker.
   *
   * @since 2.4.0
   */
  it('rejects a message without a session token when sessions are on', async () => {
    const request: Tests_Worker_Index_HandleRequest_RejectsAMessageWithoutASessionTokenWhenSessionsAreOn_Request = new Request('https://sessioned.ntfy.example.com/', {
      method: 'POST',
      body: 'No session',
      headers: { 'CF-Connecting-IP': '203.0.113.10' },
    });
    const response: Tests_Worker_Index_HandleRequest_RejectsAMessageWithoutASessionTokenWhenSessionsAreOn_Response = await handleRequest(request, mockConfigWithSession, createMockKv(), outbox);

    expect(response['status']).toBe(403);

    return;
  });

  /**
   * Tests - Worker.
   *
   * @since 2.4.0
   */
  it('returns 404 on the session path when sessions are off', async () => {
    const request: Tests_Worker_Index_HandleRequest_Returns404OnTheSessionPathWhenSessionsAreOff_Request = new Request('https://abc123.ntfy.example.com/session', {
      method: 'POST',
    });
    const response: Tests_Worker_Index_HandleRequest_Returns404OnTheSessionPathWhenSessionsAreOff_Response = await handleRequest(request, mockConfig, createMockKv(), outbox);

    expect(response['status']).toBe(404);

    const body: Tests_Worker_Index_HandleRequest_Returns404OnTheSessionPathWhenSessionsAreOff_Body = await response.json();

    expect(body['message']).toBe('Sessions are not enabled for this context');

    return;
  });

  return;
});

/**
 * Tests - Worker - Handle Email.
 *
 * @since 2.0.0
 */
describe('handleEmail', () => {
  /**
   * Tests - Worker.
   *
   * @since 2.0.0
   */
  it('processes a valid email through the pipeline', async () => {
    const mockFetch: Tests_Worker_Index_HandleEmail_ProcessesAValidEmailThroughThePipeline_MockFetch = vi.fn().mockResolvedValue(new Response('ok', { status: 200 }));

    vi.stubGlobal('fetch', mockFetch);

    const rawEmail: Tests_Worker_Index_HandleEmail_ProcessesAValidEmailThroughThePipeline_RawEmail = [
      'From: sender@example.com',
      'To: pfsense@ntfy.example.com',
      'Subject: Test Alert',
      'Content-Type: text/plain',
      '',
      'This is a test email body.',
    ].join('\r\n');

    await handleEmail(rawEmail, 'sender@example.com', mockEmailConfig, undefined, outbox);

    expect(mockFetch).toHaveBeenCalled();

    return;
  });

  /**
   * Tests - Worker.
   *
   * @since 2.0.0
   */
  it('silently ignores emails with no matching context', async () => {
    const mockFetch: Tests_Worker_Index_HandleEmail_SilentlyIgnoresEmailsWithNoMatchingContext_MockFetch = vi.fn().mockResolvedValue(new Response('ok', { status: 200 }));

    vi.stubGlobal('fetch', mockFetch);

    const rawEmail: Tests_Worker_Index_HandleEmail_SilentlyIgnoresEmailsWithNoMatchingContext_RawEmail = [
      'From: sender@example.com',
      'To: unknown@ntfy.example.com',
      'Subject: Test',
      'Content-Type: text/plain',
      '',
      'Body.',
    ].join('\r\n');

    await handleEmail(rawEmail, 'sender@example.com', mockEmailConfig, undefined, outbox);

    expect(mockFetch).not.toHaveBeenCalled();

    return;
  });

  /**
   * Tests - Worker.
   *
   * @since 2.0.0
   */
  it('allows email when no allowed_from is configured', async () => {
    const mockFetch: Tests_Worker_Index_HandleEmail_AllowsEmailWhenNoAllowedFromIsConfigured_MockFetch = vi.fn().mockResolvedValue(new Response('ok', { status: 200 }));

    vi.stubGlobal('fetch', mockFetch);

    const rawEmail: Tests_Worker_Index_HandleEmail_AllowsEmailWhenNoAllowedFromIsConfigured_RawEmail = [
      'From: anyone@anywhere.com',
      'To: pfsense@ntfy.example.com',
      'Subject: Open Relay',
      'Content-Type: text/plain',
      '',
      'Email from anyone.',
    ].join('\r\n');

    await handleEmail(rawEmail, 'anyone@anywhere.com', mockEmailConfig, undefined, outbox);

    expect(mockFetch).toHaveBeenCalled();

    return;
  });

  /**
   * Tests - Worker.
   *
   * @since 2.0.0
   */
  it('rejects email from unauthorized sender', async () => {
    const mockFetch: Tests_Worker_Index_HandleEmail_RejectsEmailFromUnauthorizedSender_MockFetch = vi.fn().mockResolvedValue(new Response('ok', { status: 200 }));

    vi.stubGlobal('fetch', mockFetch);

    const rawEmail: Tests_Worker_Index_HandleEmail_RejectsEmailFromUnauthorizedSender_RawEmail = [
      'From: untrusted@example.com',
      'To: restricted@ntfy.example.com',
      'Subject: Unauthorized',
      'Content-Type: text/plain',
      '',
      'Should be rejected.',
    ].join('\r\n');

    await handleEmail(rawEmail, 'untrusted@example.com', mockEmailConfigWithAllowedFrom, undefined, outbox);

    expect(mockFetch).not.toHaveBeenCalled();

    return;
  });

  /**
   * Tests - Worker.
   *
   * @since 2.0.0
   */
  it('accepts email from authorized sender', async () => {
    const mockFetch: Tests_Worker_Index_HandleEmail_AcceptsEmailFromAuthorizedSender_MockFetch = vi.fn().mockResolvedValue(new Response('ok', { status: 200 }));

    vi.stubGlobal('fetch', mockFetch);

    const rawEmail: Tests_Worker_Index_HandleEmail_AcceptsEmailFromAuthorizedSender_RawEmail = [
      'From: trusted@example.com',
      'To: restricted@ntfy.example.com',
      'Subject: Authorized',
      'Content-Type: text/plain',
      '',
      'Should be accepted.',
    ].join('\r\n');

    await handleEmail(rawEmail, 'trusted@example.com', mockEmailConfigWithAllowedFrom, undefined, outbox);

    expect(mockFetch).toHaveBeenCalled();

    return;
  });

  /**
   * Tests - Worker.
   *
   * @since 2.1.0
   */
  it('suppresses auth error notification when email error_events excludes authentication', async () => {
    const mockFetch: Tests_Worker_Index_HandleEmail_SuppressesAuthErrorNotificationWhenEmailErrorEventsExcludesAuthentication_MockFetch = vi.fn().mockResolvedValue(new Response('ok', { status: 200 }));

    vi.stubGlobal('fetch', mockFetch);

    const rawEmail: Tests_Worker_Index_HandleEmail_SuppressesAuthErrorNotificationWhenEmailErrorEventsExcludesAuthentication_RawEmail = [
      'From: sender@example.com',
      'To: email-filtered@ntfy.example.com',
      'Subject: Test Alert',
      'Content-Type: text/plain',
      '',
      'This is a test email body.',
    ].join('\r\n');

    await handleEmail(rawEmail, 'sender@example.com', mockEmailConfigWithErrorTopicAndErrorEvents, undefined, outbox);

    expect(mockFetch).not.toHaveBeenCalled();

    return;
  });

  return;
});

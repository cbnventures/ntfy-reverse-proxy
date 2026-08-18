import {
  describe, expect, it, vi,
} from 'vitest';

import { handleEmail, handleRequest } from '../../worker/handlers.js';

import type {
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
  Tests_Worker_Index_HandleRequest_PassesThroughWhenNoTokenConfigured_Request,
  Tests_Worker_Index_HandleRequest_PassesThroughWhenNoTokenConfigured_Response,
  Tests_Worker_Index_HandleRequest_ProcessesAValidPOSTRequestThroughThePipeline_Body,
  Tests_Worker_Index_HandleRequest_ProcessesAValidPOSTRequestThroughThePipeline_Request,
  Tests_Worker_Index_HandleRequest_ProcessesAValidPOSTRequestThroughThePipeline_Response,
  Tests_Worker_Index_HandleRequest_Returns403WithNoAuthorizationHeaderWhenTokenRequired_Request,
  Tests_Worker_Index_HandleRequest_Returns403WithNoAuthorizationHeaderWhenTokenRequired_Response,
  Tests_Worker_Index_HandleRequest_Returns403WithWrongToken_Body,
  Tests_Worker_Index_HandleRequest_Returns403WithWrongToken_Request,
  Tests_Worker_Index_HandleRequest_Returns403WithWrongToken_Response,
  Tests_Worker_Index_HandleRequest_Returns404ForUnmatchedSubdomain_Request,
  Tests_Worker_Index_HandleRequest_Returns404ForUnmatchedSubdomain_Response,
  Tests_Worker_Index_HandleRequest_Returns405ForUnsupportedMethods_Request,
  Tests_Worker_Index_HandleRequest_Returns405ForUnsupportedMethods_Response,
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
  Tests_Worker_Index_MockConfigWithToken,
  Tests_Worker_Index_MockEmailConfig,
  Tests_Worker_Index_MockEmailConfigWithAllowedFrom,
  Tests_Worker_Index_MockEmailConfigWithErrorTopicAndErrorEvents,
} from '../../types/tests/worker/index.test.d.ts';

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
    const response: Tests_Worker_Index_HandleRequest_ProcessesAValidPOSTRequestThroughThePipeline_Response = await handleRequest(request, mockConfig, undefined);

    expect(response['status']).toBe(200);

    const body: Tests_Worker_Index_HandleRequest_ProcessesAValidPOSTRequestThroughThePipeline_Body = await response.json();

    expect(body['status']).toBe('success');

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
    const response: Tests_Worker_Index_HandleRequest_ServesLandingPageForGETRequests_Response = await handleRequest(request, mockConfig, undefined);
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
    const response: Tests_Worker_Index_HandleRequest_Returns405ForUnsupportedMethods_Response = await handleRequest(request, mockConfig, undefined);

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
    const response: Tests_Worker_Index_HandleRequest_Returns404ForUnmatchedSubdomain_Response = await handleRequest(request, mockConfig, undefined);

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
    const response: Tests_Worker_Index_HandleRequest_SucceedsWithCorrectTokenInAuthorizationHeader_Response = await handleRequest(request, mockConfigWithToken, undefined);

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
    const response: Tests_Worker_Index_HandleRequest_Returns403WithWrongToken_Response = await handleRequest(request, mockConfigWithToken, undefined);

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
    const response: Tests_Worker_Index_HandleRequest_Returns403WithNoAuthorizationHeaderWhenTokenRequired_Response = await handleRequest(request, mockConfigWithToken, undefined);

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
    const response: Tests_Worker_Index_HandleRequest_PassesThroughWhenNoTokenConfigured_Response = await handleRequest(request, mockConfig, undefined);

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
    const response: Tests_Worker_Index_HandleRequest_SendsErrorNotificationWhenAuthFailsAndErrorTopicConfigured_Response = await handleRequest(request, mockConfigWithErrorTopic, undefined);

    expect(response['status']).toBe(403);

    expect(mockFetch).toHaveBeenCalled();

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
    const response: Tests_Worker_Index_HandleRequest_SuppressesAuthErrorNotificationWhenErrorEventsExcludesAuthentication_Response = await handleRequest(request, mockConfigWithErrorTopicAndErrorEvents, undefined);

    expect(response['status']).toBe(403);

    expect(mockFetch).not.toHaveBeenCalled();

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

    await handleEmail(rawEmail, 'sender@example.com', mockEmailConfig, undefined);

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

    await handleEmail(rawEmail, 'sender@example.com', mockEmailConfig, undefined);

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

    await handleEmail(rawEmail, 'anyone@anywhere.com', mockEmailConfig, undefined);

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

    await handleEmail(rawEmail, 'untrusted@example.com', mockEmailConfigWithAllowedFrom, undefined);

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

    await handleEmail(rawEmail, 'trusted@example.com', mockEmailConfigWithAllowedFrom, undefined);

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

    await handleEmail(rawEmail, 'sender@example.com', mockEmailConfigWithErrorTopicAndErrorEvents, undefined);

    expect(mockFetch).not.toHaveBeenCalled();

    return;
  });

  return;
});

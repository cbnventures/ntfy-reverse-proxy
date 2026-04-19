import { describe, expect, it } from 'vitest';

import { landingPage } from '../../../worker/landing/page.js';

import type {
  TestsWorkerLandingPageContentType,
  TestsWorkerLandingPageContextsStart,
  TestsWorkerLandingPageDebugConfig,
  TestsWorkerLandingPageHtml,
  TestsWorkerLandingPageIdIndex,
  TestsWorkerLandingPageMockConfig,
  TestsWorkerLandingPageNameIndex,
  TestsWorkerLandingPageResponse,
  TestsWorkerLandingPageTypeIndex,
} from '../../../types/tests/worker/landing/page.test.d.ts';

/**
 * Tests - Worker - Landing - Page - Mock Config.
 *
 * @since 2.0.0
 */
const mockConfig: TestsWorkerLandingPageMockConfig = {
  settings: {
    worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: false,
  },
  servers: [{
    name: 'alpha', server: 'https://ntfy.alpha.example.com', token: 'tk_abc123',
  }],
  contexts: [{
    id: 'abcdefghijklmnopqrst',
    name: 'homebridge',
    type: 'http',
    interpreter: 'plain-text',
    topic: 'homebridge-alerts',
    mode: 'send-once',
    show_visitor_info: true,
    primary_server: 'alpha',
    servers: ['alpha'],
    token: undefined,
  }],
};

/**
 * Tests - Worker - Landing - Page.
 *
 * @since 2.0.0
 */
describe('landingPage', () => {
  it('returns HTML with branding', async () => {
    const response: TestsWorkerLandingPageResponse = landingPage(mockConfig);
    const html: TestsWorkerLandingPageHtml = await response.text();

    const contentType: TestsWorkerLandingPageContentType = response.headers.get('content-type');

    expect(contentType).toContain('text/html');

    expect(html).toContain('Reverse Proxy for ntfy');

    expect(html).toContain('reverse proxy for ntfy');

    return;
  });

  it('includes GitHub link', async () => {
    const response: TestsWorkerLandingPageResponse = landingPage(mockConfig);
    const html: TestsWorkerLandingPageHtml = await response.text();

    expect(html).toContain('github.com/cbnventures/ntfy-reverse-proxy');

    return;
  });

  it('does not show debug info when show_response_output is false', async () => {
    const response: TestsWorkerLandingPageResponse = landingPage(mockConfig);
    const html: TestsWorkerLandingPageHtml = await response.text();

    expect(html).not.toContain('tk_abc123');

    expect(html).not.toContain('ntfy.alpha.example.com');

    return;
  });

  it('shows masked debug info when show_response_output is true', async () => {
    const debugConfig: TestsWorkerLandingPageDebugConfig = {
      settings: {
        worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: true,
      },
      servers: mockConfig['servers'],
      contexts: mockConfig['contexts'],
    };

    const response: TestsWorkerLandingPageResponse = landingPage(debugConfig);
    const html: TestsWorkerLandingPageHtml = await response.text();

    expect(html).not.toContain('ntfy.alpha.example.com');

    expect(html).not.toContain('tk_abc123');

    expect(html).not.toContain('ntfy.example.com');

    expect(html).not.toContain('abcdefghijklmnopqrst');

    expect(html).toContain('***');

    return;
  });

  it('shows full name in debug output', async () => {
    const debugConfig: TestsWorkerLandingPageDebugConfig = {
      settings: {
        worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: true,
      },
      servers: mockConfig['servers'],
      contexts: mockConfig['contexts'],
    };

    const response: TestsWorkerLandingPageResponse = landingPage(debugConfig);
    const html: TestsWorkerLandingPageHtml = await response.text();

    expect(html).toContain('homebridge');

    return;
  });

  it('shows id, name, type ordering in debug output', async () => {
    const debugConfig: TestsWorkerLandingPageDebugConfig = {
      settings: {
        worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: true,
      },
      servers: mockConfig['servers'],
      contexts: mockConfig['contexts'],
    };

    const response: TestsWorkerLandingPageResponse = landingPage(debugConfig);
    const html: TestsWorkerLandingPageHtml = await response.text();
    const contextsStart: TestsWorkerLandingPageContextsStart = html.indexOf('&quot;contexts&quot;');
    const idIndex: TestsWorkerLandingPageIdIndex = html.indexOf('&quot;id&quot;', contextsStart);
    const nameIndex: TestsWorkerLandingPageNameIndex = html.indexOf('&quot;name&quot;', contextsStart);
    const typeIndex: TestsWorkerLandingPageTypeIndex = html.indexOf('&quot;type&quot;', contextsStart);

    expect(idIndex).toBeLessThan(nameIndex);

    expect(nameIndex).toBeLessThan(typeIndex);

    return;
  });

  return;
});

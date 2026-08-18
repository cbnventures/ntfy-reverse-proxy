import { describe, expect, it } from 'vitest';

import { landingPage } from '../../../worker/landing/page.js';

import type {
  Tests_Worker_Landing_Page_LandingPage_DoesNotShowDebugInfoWhenShowResponseOutputIsFalse_Html,
  Tests_Worker_Landing_Page_LandingPage_DoesNotShowDebugInfoWhenShowResponseOutputIsFalse_Response,
  Tests_Worker_Landing_Page_LandingPage_IncludesGitHubLink_Html,
  Tests_Worker_Landing_Page_LandingPage_IncludesGitHubLink_Response,
  Tests_Worker_Landing_Page_LandingPage_ReturnsHTMLWithBranding_ContentType,
  Tests_Worker_Landing_Page_LandingPage_ReturnsHTMLWithBranding_Html,
  Tests_Worker_Landing_Page_LandingPage_ReturnsHTMLWithBranding_Response,
  Tests_Worker_Landing_Page_LandingPage_ShowsFullNameInDebugOutput_DebugConfig,
  Tests_Worker_Landing_Page_LandingPage_ShowsFullNameInDebugOutput_Html,
  Tests_Worker_Landing_Page_LandingPage_ShowsFullNameInDebugOutput_Response,
  Tests_Worker_Landing_Page_LandingPage_ShowsIdNameTypeOrderingInDebugOutput_ContextsStart,
  Tests_Worker_Landing_Page_LandingPage_ShowsIdNameTypeOrderingInDebugOutput_DebugConfig,
  Tests_Worker_Landing_Page_LandingPage_ShowsIdNameTypeOrderingInDebugOutput_Html,
  Tests_Worker_Landing_Page_LandingPage_ShowsIdNameTypeOrderingInDebugOutput_IdIndex,
  Tests_Worker_Landing_Page_LandingPage_ShowsIdNameTypeOrderingInDebugOutput_NameIndex,
  Tests_Worker_Landing_Page_LandingPage_ShowsIdNameTypeOrderingInDebugOutput_Response,
  Tests_Worker_Landing_Page_LandingPage_ShowsIdNameTypeOrderingInDebugOutput_TypeIndex,
  Tests_Worker_Landing_Page_LandingPage_ShowsMaskedDebugInfoWhenShowResponseOutputIsTrue_DebugConfig,
  Tests_Worker_Landing_Page_LandingPage_ShowsMaskedDebugInfoWhenShowResponseOutputIsTrue_Html,
  Tests_Worker_Landing_Page_LandingPage_ShowsMaskedDebugInfoWhenShowResponseOutputIsTrue_Response,
  Tests_Worker_Landing_Page_MockConfig,
} from '../../../types/tests/worker/landing/page.test.d.ts';

/**
 * Tests - Worker - Landing - Page - Mock Config.
 *
 * @since 2.0.0
 */
const mockConfig: Tests_Worker_Landing_Page_MockConfig = {
  settings: {
    worker_name: 'test-worker',
    base_domain: 'ntfy.example.com',
    show_response_output: false,
  },
  servers: [{
    name: 'alpha',
    server: 'https://ntfy.alpha.example.com',
    token: 'tk_abc123',
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
    const response: Tests_Worker_Landing_Page_LandingPage_ReturnsHTMLWithBranding_Response = landingPage(mockConfig);
    const html: Tests_Worker_Landing_Page_LandingPage_ReturnsHTMLWithBranding_Html = await response.text();

    const contentType: Tests_Worker_Landing_Page_LandingPage_ReturnsHTMLWithBranding_ContentType = response.headers.get('content-type');

    expect(contentType).toContain('text/html');

    expect(html).toContain('Reverse Proxy for ntfy');

    expect(html).toContain('reverse proxy for ntfy');

    return;
  });

  it('includes GitHub link', async () => {
    const response: Tests_Worker_Landing_Page_LandingPage_IncludesGitHubLink_Response = landingPage(mockConfig);
    const html: Tests_Worker_Landing_Page_LandingPage_IncludesGitHubLink_Html = await response.text();

    expect(html).toContain('github.com/cbnventures/ntfy-reverse-proxy');

    return;
  });

  it('does not show debug info when show_response_output is false', async () => {
    const response: Tests_Worker_Landing_Page_LandingPage_DoesNotShowDebugInfoWhenShowResponseOutputIsFalse_Response = landingPage(mockConfig);
    const html: Tests_Worker_Landing_Page_LandingPage_DoesNotShowDebugInfoWhenShowResponseOutputIsFalse_Html = await response.text();

    expect(html).not.toContain('tk_abc123');

    expect(html).not.toContain('ntfy.alpha.example.com');

    return;
  });

  it('shows masked debug info when show_response_output is true', async () => {
    const debugConfig: Tests_Worker_Landing_Page_LandingPage_ShowsMaskedDebugInfoWhenShowResponseOutputIsTrue_DebugConfig = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: true,
      },
      servers: mockConfig['servers'],
      contexts: mockConfig['contexts'],
    };

    const response: Tests_Worker_Landing_Page_LandingPage_ShowsMaskedDebugInfoWhenShowResponseOutputIsTrue_Response = landingPage(debugConfig);
    const html: Tests_Worker_Landing_Page_LandingPage_ShowsMaskedDebugInfoWhenShowResponseOutputIsTrue_Html = await response.text();

    expect(html).not.toContain('ntfy.alpha.example.com');

    expect(html).not.toContain('tk_abc123');

    expect(html).not.toContain('ntfy.example.com');

    expect(html).not.toContain('abcdefghijklmnopqrst');

    expect(html).toContain('***');

    return;
  });

  it('shows full name in debug output', async () => {
    const debugConfig: Tests_Worker_Landing_Page_LandingPage_ShowsFullNameInDebugOutput_DebugConfig = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: true,
      },
      servers: mockConfig['servers'],
      contexts: mockConfig['contexts'],
    };

    const response: Tests_Worker_Landing_Page_LandingPage_ShowsFullNameInDebugOutput_Response = landingPage(debugConfig);
    const html: Tests_Worker_Landing_Page_LandingPage_ShowsFullNameInDebugOutput_Html = await response.text();

    expect(html).toContain('homebridge');

    return;
  });

  it('shows id, name, type ordering in debug output', async () => {
    const debugConfig: Tests_Worker_Landing_Page_LandingPage_ShowsIdNameTypeOrderingInDebugOutput_DebugConfig = {
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: true,
      },
      servers: mockConfig['servers'],
      contexts: mockConfig['contexts'],
    };

    const response: Tests_Worker_Landing_Page_LandingPage_ShowsIdNameTypeOrderingInDebugOutput_Response = landingPage(debugConfig);
    const html: Tests_Worker_Landing_Page_LandingPage_ShowsIdNameTypeOrderingInDebugOutput_Html = await response.text();
    const contextsStart: Tests_Worker_Landing_Page_LandingPage_ShowsIdNameTypeOrderingInDebugOutput_ContextsStart = html.indexOf('&quot;contexts&quot;');
    const idIndex: Tests_Worker_Landing_Page_LandingPage_ShowsIdNameTypeOrderingInDebugOutput_IdIndex = html.indexOf('&quot;id&quot;', contextsStart);
    const nameIndex: Tests_Worker_Landing_Page_LandingPage_ShowsIdNameTypeOrderingInDebugOutput_NameIndex = html.indexOf('&quot;name&quot;', contextsStart);
    const typeIndex: Tests_Worker_Landing_Page_LandingPage_ShowsIdNameTypeOrderingInDebugOutput_TypeIndex = html.indexOf('&quot;type&quot;', contextsStart);

    expect(idIndex).toBeLessThan(nameIndex);

    expect(nameIndex).toBeLessThan(typeIndex);

    return;
  });

  return;
});

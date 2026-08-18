import { describe, expect, it } from 'vitest';

import { format } from '../../../worker/pipeline/format.js';

import type {
  Tests_Worker_Pipeline_Format_BaseNotification,
  Tests_Worker_Pipeline_Format_Format_AppendsVisitorInfoWhenEnabled_CfProperties,
  Tests_Worker_Pipeline_Format_Format_AppendsVisitorInfoWhenEnabled_Result,
  Tests_Worker_Pipeline_Format_Format_DoesNotIncludeVisitorInfoWhenDisabled_Result,
  Tests_Worker_Pipeline_Format_Format_MapsOptionalNotificationFieldsToHeaders_Notification,
  Tests_Worker_Pipeline_Format_Format_MapsOptionalNotificationFieldsToHeaders_Result,
  Tests_Worker_Pipeline_Format_Format_OmitsUndefinedOptionalHeaders_Result,
  Tests_Worker_Pipeline_Format_Format_ReturnsFormattedBodyAndNtfyHeaders_Result,
} from '../../../types/tests/worker/pipeline/format.test.d.ts';

/**
 * Tests - Worker - Pipeline - Format.
 *
 * @since 2.0.0
 */
describe('format', () => {
  const baseNotification: Tests_Worker_Pipeline_Format_BaseNotification = {
    title: 'Test Title',
    body: 'Test body message',
    priority: 3,
    tags: ['test'],
    markdown: true,
  };

  it('returns formatted body and ntfy headers', () => {
    const result: Tests_Worker_Pipeline_Format_Format_ReturnsFormattedBodyAndNtfyHeaders_Result = format(baseNotification, { showVisitorInfo: false });

    expect(result['body']).toBe('Test body message');

    expect(result['headers']['X-Title']).toBe('Test Title');

    expect(result['headers']['X-Priority']).toBe('3');

    expect(result['headers']['X-Tags']).toBe('test');

    expect(result['headers']['X-Markdown']).toBe('true');

    return;
  });

  it('appends visitor info when enabled', () => {
    const cfProperties: Tests_Worker_Pipeline_Format_Format_AppendsVisitorInfoWhenEnabled_CfProperties = {
      country: 'US',
      region: 'California',
      city: 'San Francisco',
      colo: 'SFO',
      latitude: '37.7749',
      longitude: '-122.4194',
      asn: 13335,
      asOrganization: 'Cloudflare Inc',
    };

    const result: Tests_Worker_Pipeline_Format_Format_AppendsVisitorInfoWhenEnabled_Result = format(baseNotification, {
      showVisitorInfo: true,
      visitorIp: '1.2.3.4',
      cfProperties,
    });

    expect(result['body']).toContain('1.2.3.4');

    expect(result['body']).toContain('California');

    return;
  });

  it('does not include visitor info when disabled', () => {
    const result: Tests_Worker_Pipeline_Format_Format_DoesNotIncludeVisitorInfoWhenDisabled_Result = format(baseNotification, { showVisitorInfo: false });

    expect(result['body']).not.toContain('Visitor');

    return;
  });

  it('maps optional notification fields to headers', () => {
    const notification: Tests_Worker_Pipeline_Format_Format_MapsOptionalNotificationFieldsToHeaders_Notification = {
      title: 'Test Title',
      body: 'Test body message',
      priority: 3,
      tags: ['test'],
      markdown: true,
      icon: 'https://example.com/icon.png',
      actions: 'view, Open, https://example.com',
    };

    const result: Tests_Worker_Pipeline_Format_Format_MapsOptionalNotificationFieldsToHeaders_Result = format(notification, { showVisitorInfo: false });

    expect(result['headers']['X-Icon']).toBe('https://example.com/icon.png');

    expect(result['headers']['X-Actions']).toBe('view, Open, https://example.com');

    return;
  });

  it('omits undefined optional headers', () => {
    const result: Tests_Worker_Pipeline_Format_Format_OmitsUndefinedOptionalHeaders_Result = format(baseNotification, { showVisitorInfo: false });

    expect(result['headers']['X-Icon']).toBeUndefined();

    return;
  });

  return;
});

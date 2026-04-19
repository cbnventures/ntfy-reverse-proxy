import { describe, expect, it } from 'vitest';

import { format } from '../../../worker/pipeline/format.js';

import type {
  TestsWorkerPipelineFormatBaseNotification,
  TestsWorkerPipelineFormatCfProperties,
  TestsWorkerPipelineFormatNotificationWithOptionals,
  TestsWorkerPipelineFormatResult,
} from '../../../types/tests/worker/pipeline/format.test.d.ts';

/**
 * Tests - Worker - Pipeline - Format.
 *
 * @since 2.0.0
 */
describe('format', () => {
  const baseNotification: TestsWorkerPipelineFormatBaseNotification = {
    title: 'Test Title',
    body: 'Test body message',
    priority: 3,
    tags: ['test'],
    markdown: true,
  };

  it('returns formatted body and ntfy headers', () => {
    const result: TestsWorkerPipelineFormatResult = format(baseNotification, { showVisitorInfo: false });

    expect(result['body']).toBe('Test body message');

    expect(result['headers']['X-Title']).toBe('Test Title');

    expect(result['headers']['X-Priority']).toBe('3');

    expect(result['headers']['X-Tags']).toBe('test');

    expect(result['headers']['X-Markdown']).toBe('true');

    return;
  });

  it('appends visitor info when enabled', () => {
    const cfProperties: TestsWorkerPipelineFormatCfProperties = {
      country: 'US',
      region: 'California',
      city: 'San Francisco',
      colo: 'SFO',
      latitude: '37.7749',
      longitude: '-122.4194',
      asn: 13335,
      asOrganization: 'Cloudflare Inc',
    };

    const result: TestsWorkerPipelineFormatResult = format(baseNotification, {
      showVisitorInfo: true,
      visitorIp: '1.2.3.4',
      cfProperties,
    });

    expect(result['body']).toContain('1.2.3.4');

    expect(result['body']).toContain('California');

    return;
  });

  it('does not include visitor info when disabled', () => {
    const result: TestsWorkerPipelineFormatResult = format(baseNotification, { showVisitorInfo: false });

    expect(result['body']).not.toContain('Visitor');

    return;
  });

  it('maps optional notification fields to headers', () => {
    const notification: TestsWorkerPipelineFormatNotificationWithOptionals = {
      title: 'Test Title',
      body: 'Test body message',
      priority: 3,
      tags: ['test'],
      markdown: true,
      icon: 'https://example.com/icon.png',
      actions: 'view, Open, https://example.com',
    };

    const result: TestsWorkerPipelineFormatResult = format(notification, { showVisitorInfo: false });

    expect(result['headers']['X-Icon']).toBe('https://example.com/icon.png');

    expect(result['headers']['X-Actions']).toBe('view, Open, https://example.com');

    return;
  });

  it('omits undefined optional headers', () => {
    const result: TestsWorkerPipelineFormatResult = format(baseNotification, { showVisitorInfo: false });

    expect(result['headers']['X-Icon']).toBeUndefined();

    return;
  });

  return;
});

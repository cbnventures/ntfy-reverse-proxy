import { describe, expect, it } from 'vitest';

import { parseEmail } from '../../../worker/pipeline/email.js';

import type {
  TestsWorkerPipelineEmailBoundary,
  TestsWorkerPipelineEmailRaw,
  TestsWorkerPipelineEmailResult,
} from '../../../types/tests/worker/pipeline/email.test.d.ts';

/**
 * Tests - Worker - Pipeline - Email - Parse Email.
 *
 * @since 2.0.0
 */
describe('parseEmail', () => {
  it('extracts subject and plain text body', async () => {
    const raw: TestsWorkerPipelineEmailRaw = [
      'From: admin@pfsense.local',
      'To: pfsense@ntfy.example.com',
      'Subject: firewall.example.com - Notification',
      'Content-Type: text/plain; charset=UTF-8',
      '',
      'Notifications in this message: 1',
      '========================================',
      '14:32:05 Gateway WAN_DHCP is down',
    ].join('\r\n');

    const result: TestsWorkerPipelineEmailResult = await parseEmail(raw);

    expect(result['subject']).toBe('firewall.example.com - Notification');

    expect(result['textBody']).toContain('Gateway WAN_DHCP is down');

    return;
  });

  it('strips HTML from HTML-only emails', async () => {
    const raw: TestsWorkerPipelineEmailRaw = [
      'From: noreply@ui.com',
      'To: unifi@ntfy.example.com',
      'Subject: [UniFi Network] AP Disconnected',
      'Content-Type: text/html; charset=UTF-8',
      '',
      '<html><body><h1>Alert</h1><p>AP-LivingRoom has <b>disconnected</b></p></body></html>',
    ].join('\r\n');

    const result: TestsWorkerPipelineEmailResult = await parseEmail(raw);

    expect(result['subject']).toBe('[UniFi Network] AP Disconnected');

    expect(result['textBody']).toContain('AP-LivingRoom has disconnected');

    expect(result['textBody']).not.toContain('<');

    return;
  });

  it('handles multipart with text/plain', async () => {
    const boundary: TestsWorkerPipelineEmailBoundary = '----boundary123';
    const raw: TestsWorkerPipelineEmailRaw = [
      'From: admin@pfsense.local',
      'To: pfsense@ntfy.example.com',
      'Subject: Test Multipart',
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
      '',
      `--${boundary}`,
      'Content-Type: text/plain; charset=UTF-8',
      '',
      'This is plain text.',
      `--${boundary}`,
      'Content-Type: text/html; charset=UTF-8',
      '',
      '<html><body><p>This is HTML.</p></body></html>',
      `--${boundary}--`,
    ].join('\r\n');

    const result: TestsWorkerPipelineEmailResult = await parseEmail(raw);

    expect(result['textBody']).toBe('This is plain text.');

    return;
  });

  it('extracts from and to addresses', async () => {
    const raw: TestsWorkerPipelineEmailRaw = [
      'From: admin@pfsense.local',
      'To: pfsense@ntfy.example.com',
      'Subject: Test',
      'Content-Type: text/plain',
      '',
      'body text',
    ].join('\r\n');

    const result: TestsWorkerPipelineEmailResult = await parseEmail(raw);

    expect(result['from']).toBe('admin@pfsense.local');

    expect(result['to']).toBe('pfsense@ntfy.example.com');

    return;
  });

  return;
});

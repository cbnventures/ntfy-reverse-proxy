import { describe, expect, it } from 'vitest';

import { mailmaskInterpreter } from '../../../worker/interpreters/mailmask.js';

import type {
  Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_AcceptsAFutureReasonValueWithinVersion1_Result,
  Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsARefusalNotification_Result,
  Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsATestEvent_Result,
  Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsEveryReasonValue_Event,
  Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsEveryReasonValue_Reasons,
  Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsEveryReasonValue_Result,
  Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_RejectsMalformedBodiesAndUnknownVersions_FutureVersion,
  Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_RejectsMalformedBodiesAndUnknownVersions_InvalidDetails,
  Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_RejectsMalformedBodiesAndUnknownVersions_Malformed,
  Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_RejectsMalformedBodiesAndUnknownVersions_UnknownEvent,
  Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_RejectsPayloadsFromAnotherApp_Alert,
} from '../../../types/tests/worker/interpreters/mailmask.test.d.ts';

/**
 * Tests - Worker - Interpreters - Mailmask - Interpreter.
 *
 * @since 2.4.0
 */
describe('mailmaskInterpreter', () => {
  it('accepts a future reason value within version 1', () => {
    const result: Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_AcceptsAFutureReasonValueWithinVersion1_Result = mailmaskInterpreter({
      version: 1,
      app: 'mailmask',
      event: 'message-refused',
      title: 'Mailmask refused a message',
      message: 'Mailmask used a future refusal reason.',
      priority: 3,
      tags: ['email'],
      occurredAt: '2026-11-05T12:00:00.000Z',
      details: {
        alias: 'alias@example.com',
        envelopeSender: 'sender@example.com',
        recipient: 'alias@example.com',
        reason: 'future-reason',
      },
    });

    expect(result['notification']['body']).toContain('Reason: future-reason');

    return;
  });

  it('reads a refusal notification', () => {
    const result: Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsARefusalNotification_Result = mailmaskInterpreter({
      version: 1,
      app: 'mailmask',
      event: 'message-refused',
      title: 'Mailmask refused a message',
      message: 'Mail to old@example.com from sender@shop.test was rejected: Address is disabled.',
      priority: 3,
      tags: ['email'],
      occurredAt: '2026-11-05T12:00:00.000Z',
      details: {
        alias: 'old@example.com',
        envelopeSender: 'sender@shop.test',
        recipient: 'old@example.com',
        reason: 'disabled',
      },
    });

    expect(result['notification']).toStrictEqual({
      title: '[Mailmask] Mailmask refused a message',
      body: [
        'Mail to old@example.com from sender@shop.test was rejected: Address is disabled.',
        '',
        'Alias: old@example.com',
        'Envelope sender: sender@shop.test',
        'Reason: disabled',
      ].join('\n'),
      priority: 3,
      tags: [
        'mailmask',
        'email',
      ],
    });

    return;
  });

  it('reads a test event', () => {
    const result: Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsATestEvent_Result = mailmaskInterpreter({
      version: 1,
      app: 'mailmask',
      event: 'test',
      title: 'Mailmask test notification',
      message: 'Mailmask successfully sent this test notification.',
      priority: 3,
      tags: [
        'email',
        'test',
      ],
      occurredAt: '2026-11-05T12:00:00.000Z',
      details: {
        alias: 'test@example.com',
        envelopeSender: 'sender@example.com',
        recipient: 'test@example.com',
        reason: 'test',
      },
    });

    expect(result['notification']).toStrictEqual({
      title: '[Mailmask] Mailmask test notification',
      body: [
        'Mailmask successfully sent this test notification.',
        '',
        'Alias: test@example.com',
        'Envelope sender: sender@example.com',
        'Reason: test',
      ].join('\n'),
      priority: 3,
      tags: [
        'mailmask',
        'email',
        'test',
      ],
    });

    return;
  });

  it('reads every reason value', () => {
    const reasons: Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsEveryReasonValue_Reasons = [
      'disabled',
      'expired',
      'filtered',
      'misconfigured',
      'refused',
      'test',
    ];

    for (const reason of reasons) {
      const event: Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsEveryReasonValue_Event = (reason === 'test') ? 'test' : 'message-refused';
      const result: Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsEveryReasonValue_Result = mailmaskInterpreter({
        version: 1,
        app: 'mailmask',
        event,
        title: 'Reason notification',
        message: 'Mailmask reason test.',
        priority: 3,
        tags: ['email'],
        occurredAt: '2026-11-05T12:00:00.000Z',
        details: {
          alias: 'alias@example.com',
          envelopeSender: 'sender@example.com',
          recipient: 'alias@example.com',
          reason,
        },
      });

      expect(result['notification']['body']).toContain(`Reason: ${reason}`);
    }

    return;
  });

  it('rejects malformed bodies and unknown versions', () => {
    const malformed: Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_RejectsMalformedBodiesAndUnknownVersions_Malformed = {
      version: 1,
      app: 'mailmask',
      event: 'message-refused',
    };
    const futureVersion: Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_RejectsMalformedBodiesAndUnknownVersions_FutureVersion = {
      version: 2,
      app: 'mailmask',
      event: 'message-refused',
      title: 'Future notification',
      message: 'A future payload.',
      priority: 3,
      tags: ['email'],
      occurredAt: '2026-11-05T12:00:00.000Z',
      details: {
        alias: 'alias@example.com',
        envelopeSender: 'sender@example.com',
        recipient: 'alias@example.com',
        reason: 'refused',
      },
    };
    const unknownEvent: Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_RejectsMalformedBodiesAndUnknownVersions_UnknownEvent = {
      version: 1,
      app: 'mailmask',
      event: 'future-event',
      title: 'Future event',
      message: 'A future event.',
      priority: 3,
      tags: ['email'],
      occurredAt: '2026-11-05T12:00:00.000Z',
      details: {
        alias: 'alias@example.com',
        envelopeSender: 'sender@example.com',
        recipient: 'alias@example.com',
        reason: 'refused',
      },
    };
    const invalidDetails: Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_RejectsMalformedBodiesAndUnknownVersions_InvalidDetails = {
      version: 1,
      app: 'mailmask',
      event: 'message-refused',
      title: 'Invalid details',
      message: 'Invalid reason type.',
      priority: 3,
      tags: ['email'],
      occurredAt: '2026-11-05T12:00:00.000Z',
      details: {
        alias: 'alias@example.com',
        envelopeSender: 'sender@example.com',
        recipient: 'alias@example.com',
        reason: 3,
      },
    };

    expect(() => mailmaskInterpreter(malformed)).toThrow();

    expect(() => mailmaskInterpreter('Mailmask refused a message')).toThrow();

    expect(() => mailmaskInterpreter(futureVersion)).toThrow();

    expect(() => mailmaskInterpreter(unknownEvent)).toThrow();

    expect(() => mailmaskInterpreter(invalidDetails)).toThrow();

    return;
  });

  it('rejects payloads from another app', () => {
    const alert: Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_RejectsPayloadsFromAnotherApp_Alert = {
      version: 1,
      app: 'outpost',
      event: 'test',
      title: 'Outpost test notification',
      message: 'This alert belongs to Outpost.',
      priority: 3,
      tags: ['bell'],
      occurredAt: '2026-11-05T12:00:00.000Z',
      details: {},
    };

    expect(() => mailmaskInterpreter(alert)).toThrow('This context reads Mailmask alerts, but the payload came from outpost. Set the context\'s interpreter to outpost.');

    return;
  });

  return;
});

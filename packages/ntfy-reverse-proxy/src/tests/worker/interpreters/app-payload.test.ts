import { describe, expect, it } from 'vitest';

import { interpretAppPayload } from '../../../worker/interpreters/app-payload.js';

import type {
  Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_BuildsANotificationFromAnAlert_Result,
  Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_NamesTheRightInterpreterForAnAlertFromAnotherApp_Alert,
  Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_ReadsAJSONStringAndAnArrayBuffer_Buffer,
  Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_ReadsAJSONStringAndAnArrayBuffer_Bytes,
  Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_ReadsAJSONStringAndAnArrayBuffer_FromBuffer,
  Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_ReadsAJSONStringAndAnArrayBuffer_FromString,
  Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_ReadsAJSONStringAndAnArrayBuffer_Payload,
  Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_RejectsAnUnknownAppWithoutSuggestingItAsAnInterpreter_Alert,
  Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_RejectsAPayloadOfTheWrongShape_FutureVersion,
  Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_RejectsAPayloadOfTheWrongShape_Shapeless,
} from '../../../types/tests/worker/interpreters/app-payload.test.d.ts';

/**
 * Tests - Worker - Interpreters - App Payload - Interpret App Payload.
 *
 * @since 2.3.0
 */
describe('interpretAppPayload', () => {
  it('builds a notification from an alert', () => {
    const result: Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_BuildsANotificationFromAnAlert_Result = interpretAppPayload({
      key: 'transmission-vpn',
      name: 'Transmission VPN',
    }, {
      version: 1,
      app: 'transmission-vpn',
      event: 'vpn-dropped',
      title: 'VPN dropped',
      message: 'The VPN went down and hasn\'t come back after a minute. Transmission\'s traffic is blocked until it does.',
      priority: 4,
      tags: ['warning'],
      occurredAt: '2026-10-26T12:00:00.000Z',
      details: { lastError: 'OpenVPN exited' },
    });

    expect(result['notification']).toStrictEqual({
      title: '[Transmission VPN] VPN dropped',
      body: 'The VPN went down and hasn\'t come back after a minute. Transmission\'s traffic is blocked until it does.',
      priority: 4,
      tags: [
        'transmission-vpn',
        'warning',
      ],
    });

    return;
  });

  it('names the right interpreter for an alert from another app', () => {
    const alert: Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_NamesTheRightInterpreterForAnAlertFromAnotherApp_Alert = {
      version: 1,
      app: 'pfsense-actions',
      event: 'wol-sent',
      title: 'Wake-on-LAN sent',
      message: 'Sent a wake packet to 00:11:22:33:44:55 on 192.168.1.255.',
      priority: 2,
      tags: ['zap'],
      occurredAt: '2026-10-26T12:00:00.000Z',
      details: {},
    };

    expect(() => interpretAppPayload({
      key: 'transmission-vpn',
      name: 'Transmission VPN',
    }, alert)).toThrow('This context reads Transmission VPN alerts, but the payload came from pfsense-actions. Set the context\'s interpreter to pfsense-actions.');

    return;
  });

  it('rejects an unknown app without suggesting it as an interpreter', () => {
    const alert: Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_RejectsAnUnknownAppWithoutSuggestingItAsAnInterpreter_Alert = {
      version: 1,
      app: 'future-producer',
      event: 'future-event',
      title: 'Future alert',
      message: 'This producer does not have an interpreter.',
      priority: 3,
      tags: [],
      occurredAt: '2026-10-26T12:00:00.000Z',
      details: {},
    };

    expect(() => interpretAppPayload({
      key: 'outpost',
      name: 'Outpost',
    }, alert)).toThrow('That app is unsupported. Use one of these interpreters: transmission-vpn, pfsense-actions, discord-stonker-bot, outpost.');

    return;
  });

  it('reads a JSON string and an ArrayBuffer', () => {
    const payload: Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_ReadsAJSONStringAndAnArrayBuffer_Payload = JSON.stringify({
      version: 1,
      app: 'outpost',
      event: 'test',
      title: 'Test notification',
      message: 'This is a test from Outpost. Alerts for the events you chose will look like this.',
      priority: 3,
      tags: ['bell'],
      occurredAt: '2026-10-26T12:00:00.000Z',
      details: {},
    });
    const bytes: Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_ReadsAJSONStringAndAnArrayBuffer_Bytes = new TextEncoder().encode(payload);
    const buffer: Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_ReadsAJSONStringAndAnArrayBuffer_Buffer = new ArrayBuffer(bytes.byteLength);

    new Uint8Array(buffer).set(bytes);

    const fromString: Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_ReadsAJSONStringAndAnArrayBuffer_FromString = interpretAppPayload({
      key: 'outpost',
      name: 'Outpost',
    }, payload);
    const fromBuffer: Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_ReadsAJSONStringAndAnArrayBuffer_FromBuffer = interpretAppPayload({
      key: 'outpost',
      name: 'Outpost',
    }, buffer);

    expect(fromString['notification']['title']).toBe('[Outpost] Test notification');

    expect(fromBuffer).toStrictEqual(fromString);

    return;
  });

  it('rejects a payload of the wrong shape', () => {
    const shapeless: Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_RejectsAPayloadOfTheWrongShape_Shapeless = { title: 'Containers updated' };
    const futureVersion: Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_RejectsAPayloadOfTheWrongShape_FutureVersion = {
      version: 2,
      app: 'outpost',
      event: 'updates-applied',
      title: 'Containers updated',
      message: 'Updated 1 container: web (nginx:1).',
      priority: 3,
      tags: ['whale'],
      occurredAt: '2026-10-26T12:00:00.000Z',
      details: {},
    };

    expect(() => interpretAppPayload({
      key: 'outpost',
      name: 'Outpost',
    }, shapeless)).toThrow();

    expect(() => interpretAppPayload({
      key: 'outpost',
      name: 'Outpost',
    }, 'Containers updated')).toThrow();

    expect(() => interpretAppPayload({
      key: 'outpost',
      name: 'Outpost',
    }, futureVersion)).toThrow();

    return;
  });

  return;
});

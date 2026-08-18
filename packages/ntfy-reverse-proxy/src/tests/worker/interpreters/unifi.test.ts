import { describe, expect, it } from 'vitest';

import { unifiInterpreter } from '../../../worker/interpreters/unifi.js';

import type {
  Tests_Worker_Interpreters_Unifi_UnifiInterpreter_AddsApDeviceTag_Result,
  Tests_Worker_Interpreters_Unifi_UnifiInterpreter_AddsGatewayTagForWANEvents_Result,
  Tests_Worker_Interpreters_Unifi_UnifiInterpreter_AddsUnifiTag_Result,
  Tests_Worker_Interpreters_Unifi_UnifiInterpreter_EnablesMarkdown_Result,
  Tests_Worker_Interpreters_Unifi_UnifiInterpreter_ExtractsEventFromSubject_Result,
  Tests_Worker_Interpreters_Unifi_UnifiInterpreter_HandlesStringInputAsFallback_Result,
  Tests_Worker_Interpreters_Unifi_UnifiInterpreter_MapsDisconnectToHighPriority_Result,
  Tests_Worker_Interpreters_Unifi_UnifiInterpreter_MapsReconnectToLowPriority_Result,
  Tests_Worker_Interpreters_Unifi_UnifiInterpreter_MapsSecurityEventsToHighestPriority_Result,
} from '../../../types/tests/worker/interpreters/unifi.test.d.ts';

/**
 * Tests - Worker - Interpreters - Unifi - Interpreter.
 *
 * @since 2.0.0
 */
describe('unifiInterpreter', () => {
  /**
   * Tests - Worker - Interpreters - Unifi.
   *
   * @since 2.0.0
   */
  it('extracts event from subject', () => {
    const result: Tests_Worker_Interpreters_Unifi_UnifiInterpreter_ExtractsEventFromSubject_Result = unifiInterpreter({
      subject: '[UniFi Network] AP Disconnected',
      textBody: 'AP-LivingRoom has disconnected from the network.',
      from: 'noreply@ui.com',
      to: 'unifi@ntfy.example.com',
    });

    expect(result['notification']['title']).toContain('AP Disconnected');

    return;
  });

  /**
   * Tests - Worker - Interpreters - Unifi.
   *
   * @since 2.0.0
   */
  it('maps disconnect to high priority', () => {
    const result: Tests_Worker_Interpreters_Unifi_UnifiInterpreter_MapsDisconnectToHighPriority_Result = unifiInterpreter({
      subject: '[UniFi Network] AP Disconnected',
      textBody: 'AP down',
      from: 'a@b',
      to: 'c@d',
    });

    expect(result['notification']['priority']).toBeGreaterThanOrEqual(4);

    return;
  });

  /**
   * Tests - Worker - Interpreters - Unifi.
   *
   * @since 2.0.0
   */
  it('maps reconnect to low priority', () => {
    const result: Tests_Worker_Interpreters_Unifi_UnifiInterpreter_MapsReconnectToLowPriority_Result = unifiInterpreter({
      subject: '[UniFi Network] AP Connected',
      textBody: 'AP reconnected',
      from: 'a@b',
      to: 'c@d',
    });

    expect(result['notification']['priority']).toBeLessThanOrEqual(2);

    return;
  });

  /**
   * Tests - Worker - Interpreters - Unifi.
   *
   * @since 2.0.0
   */
  it('adds unifi tag', () => {
    const result: Tests_Worker_Interpreters_Unifi_UnifiInterpreter_AddsUnifiTag_Result = unifiInterpreter({
      subject: 'UniFi Alert',
      textBody: 'test',
      from: 'a@b',
      to: 'c@d',
    });

    expect(result['notification']['tags']).toContain('unifi');

    return;
  });

  /**
   * Tests - Worker - Interpreters - Unifi.
   *
   * @since 2.0.0
   */
  it('handles string input as fallback', () => {
    const result: Tests_Worker_Interpreters_Unifi_UnifiInterpreter_HandlesStringInputAsFallback_Result = unifiInterpreter('plain text fallback');

    expect(result['notification']['body']).toContain('plain text fallback');

    expect(result['notification']['tags']).toContain('unifi');

    return;
  });

  /**
   * Tests - Worker - Interpreters - Unifi.
   *
   * @since 2.0.0
   */
  it('enables markdown', () => {
    const result: Tests_Worker_Interpreters_Unifi_UnifiInterpreter_EnablesMarkdown_Result = unifiInterpreter({
      subject: '[UniFi Network] AP Disconnected',
      textBody: 'AP down',
      from: 'a@b',
      to: 'c@d',
    });

    expect(result['notification']['markdown']).toBe(true);

    return;
  });

  /**
   * Tests - Worker - Interpreters - Unifi.
   *
   * @since 2.0.0
   */
  it('adds ap device tag', () => {
    const result: Tests_Worker_Interpreters_Unifi_UnifiInterpreter_AddsApDeviceTag_Result = unifiInterpreter({
      subject: '[UniFi Network] AP Disconnected',
      textBody: 'AP-LivingRoom disconnected',
      from: 'a@b',
      to: 'c@d',
    });

    expect(result['notification']['tags']).toContain('ap');

    return;
  });

  /**
   * Tests - Worker - Interpreters - Unifi.
   *
   * @since 2.0.0
   */
  it('adds gateway tag for WAN events', () => {
    const result: Tests_Worker_Interpreters_Unifi_UnifiInterpreter_AddsGatewayTagForWANEvents_Result = unifiInterpreter({
      subject: '[UniFi Network] WAN Failover',
      textBody: 'WAN failover detected',
      from: 'a@b',
      to: 'c@d',
    });

    expect(result['notification']['tags']).toContain('gateway');

    return;
  });

  /**
   * Tests - Worker - Interpreters - Unifi.
   *
   * @since 2.0.0
   */
  it('maps security events to highest priority', () => {
    const result: Tests_Worker_Interpreters_Unifi_UnifiInterpreter_MapsSecurityEventsToHighestPriority_Result = unifiInterpreter({
      subject: '[UniFi Network] IDS Alert',
      textBody: 'IDS detected suspicious traffic',
      from: 'a@b',
      to: 'c@d',
    });

    expect(result['notification']['priority']).toBe(5);

    return;
  });

  return;
});

import { describe, expect, it } from 'vitest';

import { pfsenseInterpreter } from '../../../worker/interpreters/pfsense.js';

import type {
  Tests_Worker_Interpreters_Pfsense_PfsenseInterpreter_AddsGatewayContentTag_Result,
  Tests_Worker_Interpreters_Pfsense_PfsenseInterpreter_AddsPfsenseTag_Result,
  Tests_Worker_Interpreters_Pfsense_PfsenseInterpreter_EnablesMarkdown_Result,
  Tests_Worker_Interpreters_Pfsense_PfsenseInterpreter_ExtractsHostnameFromSubject_Result,
  Tests_Worker_Interpreters_Pfsense_PfsenseInterpreter_HandlesBatchedNotifications_Body,
  Tests_Worker_Interpreters_Pfsense_PfsenseInterpreter_HandlesBatchedNotifications_Result,
  Tests_Worker_Interpreters_Pfsense_PfsenseInterpreter_HandlesStringInputAsFallback_Result,
  Tests_Worker_Interpreters_Pfsense_PfsenseInterpreter_MapsErrorKeywordToPriority4_Result,
  Tests_Worker_Interpreters_Pfsense_PfsenseInterpreter_MapsGatewayAvailableToLowPriority_Result,
  Tests_Worker_Interpreters_Pfsense_PfsenseInterpreter_MapsGatewayDownToHighPriority_Result,
  Tests_Worker_Interpreters_Pfsense_PfsenseInterpreter_MapsPacketLossToPriority3_Result,
  Tests_Worker_Interpreters_Pfsense_PfsenseInterpreter_RendersANotificationWithoutASeparator_Result,
} from '../../../types/tests/worker/interpreters/pfsense.test.d.ts';

/**
 * Tests - Worker - Interpreters - Pfsense - Interpreter.
 *
 * @since 2.0.0
 */
describe('pfsenseInterpreter', () => {
  it('extracts hostname from subject', () => {
    const result: Tests_Worker_Interpreters_Pfsense_PfsenseInterpreter_ExtractsHostnameFromSubject_Result = pfsenseInterpreter({
      subject: 'firewall.example.com - Notification',
      textBody: '14:32:05 Gateway WAN_DHCP is down',
      from: 'pfsense@firewall.local',
      to: 'pfsense@ntfy.example.com',
    });

    expect(result['notification']['title']).toContain('firewall.example.com');

    return;
  });

  it('maps gateway down to high priority', () => {
    const result: Tests_Worker_Interpreters_Pfsense_PfsenseInterpreter_MapsGatewayDownToHighPriority_Result = pfsenseInterpreter({
      subject: 'fw.local - Notification',
      textBody: '14:32:05 Gateway WAN is down',
      from: 'a@b',
      to: 'c@d',
    });

    expect(result['notification']['priority']).toBe(5);

    return;
  });

  it('maps gateway available to low priority', () => {
    const result: Tests_Worker_Interpreters_Pfsense_PfsenseInterpreter_MapsGatewayAvailableToLowPriority_Result = pfsenseInterpreter({
      subject: 'fw.local - Notification',
      textBody: '14:32:05 Gateway WAN is available now',
      from: 'a@b',
      to: 'c@d',
    });

    expect(result['notification']['priority']).toBe(2);

    return;
  });

  it('handles batched notifications', () => {
    const body: Tests_Worker_Interpreters_Pfsense_PfsenseInterpreter_HandlesBatchedNotifications_Body = [
      'Notifications in this message: 2',
      '========================================',
      '14:32:05 Gateway down',
      '14:32:10 Gateway up',
    ].join('\n');
    const result: Tests_Worker_Interpreters_Pfsense_PfsenseInterpreter_HandlesBatchedNotifications_Result = pfsenseInterpreter({
      subject: 'fw.local - Notification',
      textBody: body,
      from: 'a@b',
      to: 'c@d',
    });

    expect(result['notification']['body']).toContain('Gateway down');

    expect(result['notification']['body']).toContain('Gateway up');

    return;
  });

  it('adds pfsense tag', () => {
    const result: Tests_Worker_Interpreters_Pfsense_PfsenseInterpreter_AddsPfsenseTag_Result = pfsenseInterpreter({
      subject: 'fw - Notification',
      textBody: 'test',
      from: 'a@b',
      to: 'c@d',
    });

    expect(result['notification']['tags']).toContain('pfsense');

    return;
  });

  it('handles string input as fallback', () => {
    const result: Tests_Worker_Interpreters_Pfsense_PfsenseInterpreter_HandlesStringInputAsFallback_Result = pfsenseInterpreter('plain text fallback');

    expect(result['notification']['body']).toContain('plain text fallback');

    expect(result['notification']['tags']).toContain('pfsense');

    return;
  });

  it('enables markdown', () => {
    const result: Tests_Worker_Interpreters_Pfsense_PfsenseInterpreter_EnablesMarkdown_Result = pfsenseInterpreter({
      subject: 'fw - Notification',
      textBody: 'test',
      from: 'a@b',
      to: 'c@d',
    });

    expect(result['notification']['markdown']).toBe(true);

    return;
  });

  it('adds gateway content tag', () => {
    const result: Tests_Worker_Interpreters_Pfsense_PfsenseInterpreter_AddsGatewayContentTag_Result = pfsenseInterpreter({
      subject: 'fw - Notification',
      textBody: 'Gateway WAN_DHCP is down',
      from: 'a@b',
      to: 'c@d',
    });

    expect(result['notification']['tags']).toContain('gateway');

    return;
  });

  it('maps error keyword to priority 4', () => {
    const result: Tests_Worker_Interpreters_Pfsense_PfsenseInterpreter_MapsErrorKeywordToPriority4_Result = pfsenseInterpreter({
      subject: 'fw - Notification',
      textBody: 'An error occurred on interface',
      from: 'a@b',
      to: 'c@d',
    });

    expect(result['notification']['priority']).toBe(4);

    return;
  });

  it('maps packet loss to priority 3', () => {
    const result: Tests_Worker_Interpreters_Pfsense_PfsenseInterpreter_MapsPacketLossToPriority3_Result = pfsenseInterpreter({
      subject: 'fw - Notification',
      textBody: 'Gateway has packet loss',
      from: 'a@b',
      to: 'c@d',
    });

    expect(result['notification']['priority']).toBe(3);

    return;
  });

  it('renders a notification without a separator', () => {
    const result: Tests_Worker_Interpreters_Pfsense_PfsenseInterpreter_RendersANotificationWithoutASeparator_Result = pfsenseInterpreter({
      subject: 'fw.local - Notification',
      textBody: '14:32:05 Gateway WAN_DHCP is down',
      from: 'a@b',
      to: 'c@d',
    });

    expect(result['notification']['body']).toContain('Gateway WAN_DHCP is down');

    return;
  });

  return;
});

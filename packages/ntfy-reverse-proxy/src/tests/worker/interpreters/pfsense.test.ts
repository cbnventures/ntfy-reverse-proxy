import { describe, expect, it } from 'vitest';

import { pfsenseInterpreter } from '../../../worker/interpreters/pfsense.js';

import type {
  TestsWorkerInterpretersPfsenseBody,
  TestsWorkerInterpretersPfsenseResult,
} from '../../../types/tests/worker/interpreters/pfsense.test.d.ts';

/**
 * Tests - Worker - Interpreters - Pfsense - Interpreter.
 *
 * @since 2.0.0
 */
describe('pfsenseInterpreter', () => {
  /**
   * Tests - Worker - Interpreters - Pfsense.
   *
   * @since 2.0.0
   */
  it('extracts hostname from subject', () => {
    const result: TestsWorkerInterpretersPfsenseResult = pfsenseInterpreter({
      subject: 'firewall.example.com - Notification',
      textBody: '14:32:05 Gateway WAN_DHCP is down',
      from: 'pfsense@firewall.local', to: 'pfsense@ntfy.example.com',
    });

    expect(result['notification']['title']).toContain('firewall.example.com');

    return;
  });

  /**
   * Tests - Worker - Interpreters - Pfsense.
   *
   * @since 2.0.0
   */
  it('maps gateway down to high priority', () => {
    const result: TestsWorkerInterpretersPfsenseResult = pfsenseInterpreter({
      subject: 'fw.local - Notification', textBody: '14:32:05 Gateway WAN is down',
      from: 'a@b', to: 'c@d',
    });

    expect(result['notification']['priority']).toBe(5);

    return;
  });

  /**
   * Tests - Worker - Interpreters - Pfsense.
   *
   * @since 2.0.0
   */
  it('maps gateway available to low priority', () => {
    const result: TestsWorkerInterpretersPfsenseResult = pfsenseInterpreter({
      subject: 'fw.local - Notification', textBody: '14:32:05 Gateway WAN is available now',
      from: 'a@b', to: 'c@d',
    });

    expect(result['notification']['priority']).toBe(2);

    return;
  });

  /**
   * Tests - Worker - Interpreters - Pfsense.
   *
   * @since 2.0.0
   */
  it('handles batched notifications', () => {
    const body: TestsWorkerInterpretersPfsenseBody = [
      'Notifications in this message: 2',
      '========================================',
      '14:32:05 Gateway down',
      '14:32:10 Gateway up',
    ].join('\n');
    const result: TestsWorkerInterpretersPfsenseResult = pfsenseInterpreter({
      subject: 'fw.local - Notification', textBody: body, from: 'a@b', to: 'c@d',
    });

    expect(result['notification']['body']).toContain('Gateway down');

    expect(result['notification']['body']).toContain('Gateway up');

    return;
  });

  /**
   * Tests - Worker - Interpreters - Pfsense.
   *
   * @since 2.0.0
   */
  it('adds pfsense tag', () => {
    const result: TestsWorkerInterpretersPfsenseResult = pfsenseInterpreter({
      subject: 'fw - Notification', textBody: 'test', from: 'a@b', to: 'c@d',
    });

    expect(result['notification']['tags']).toContain('pfsense');

    return;
  });

  /**
   * Tests - Worker - Interpreters - Pfsense.
   *
   * @since 2.0.0
   */
  it('handles string input as fallback', () => {
    const result: TestsWorkerInterpretersPfsenseResult = pfsenseInterpreter('plain text fallback');

    expect(result['notification']['body']).toContain('plain text fallback');

    expect(result['notification']['tags']).toContain('pfsense');

    return;
  });

  /**
   * Tests - Worker - Interpreters - Pfsense.
   *
   * @since 2.0.0
   */
  it('enables markdown', () => {
    const result: TestsWorkerInterpretersPfsenseResult = pfsenseInterpreter({
      subject: 'fw - Notification', textBody: 'test', from: 'a@b', to: 'c@d',
    });

    expect(result['notification']['markdown']).toBe(true);

    return;
  });

  /**
   * Tests - Worker - Interpreters - Pfsense.
   *
   * @since 2.0.0
   */
  it('adds gateway content tag', () => {
    const result: TestsWorkerInterpretersPfsenseResult = pfsenseInterpreter({
      subject: 'fw - Notification', textBody: 'Gateway WAN_DHCP is down',
      from: 'a@b', to: 'c@d',
    });

    expect(result['notification']['tags']).toContain('gateway');

    return;
  });

  /**
   * Tests - Worker - Interpreters - Pfsense.
   *
   * @since 2.0.0
   */
  it('maps error keyword to priority 4', () => {
    const result: TestsWorkerInterpretersPfsenseResult = pfsenseInterpreter({
      subject: 'fw - Notification', textBody: 'An error occurred on interface',
      from: 'a@b', to: 'c@d',
    });

    expect(result['notification']['priority']).toBe(4);

    return;
  });

  /**
   * Tests - Worker - Interpreters - Pfsense.
   *
   * @since 2.0.0
   */
  it('maps packet loss to priority 3', () => {
    const result: TestsWorkerInterpretersPfsenseResult = pfsenseInterpreter({
      subject: 'fw - Notification', textBody: 'Gateway has packet loss',
      from: 'a@b', to: 'c@d',
    });

    expect(result['notification']['priority']).toBe(3);

    return;
  });

  return;
});

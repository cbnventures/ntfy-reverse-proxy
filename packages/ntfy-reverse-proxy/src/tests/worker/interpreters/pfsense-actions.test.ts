import { describe, expect, it } from 'vitest';

import { pfsenseActionsInterpreter } from '../../../worker/interpreters/pfsense-actions.js';

import type { Tests_Worker_Interpreters_PfsenseActions_PfsenseActionsInterpreter_ReadsAnUnreachableAlert_Result } from '../../../types/tests/worker/interpreters/pfsense-actions.test.d.ts';

/**
 * Tests - Worker - Interpreters - Pfsense Actions - Pfsense Actions Interpreter.
 *
 * @since 2.3.0
 */
describe('pfsenseActionsInterpreter', () => {
  it('reads an unreachable alert', () => {
    const result: Tests_Worker_Interpreters_PfsenseActions_PfsenseActionsInterpreter_ReadsAnUnreachableAlert_Result = pfsenseActionsInterpreter({
      version: 1,
      app: 'pfsense-actions',
      event: 'pfsense-unreachable',
      title: 'pfSense can\'t be reached',
      message: 'Couldn\'t sign in to pfSense at 192.168.1.1:22 over SSH in two checks in a row. Actions fail until it answers again.',
      priority: 4,
      tags: ['warning'],
      occurredAt: '2026-10-26T12:00:00.000Z',
      details: {
        address: '192.168.1.1',
        port: 22,
      },
    });

    expect(result['notification']).toStrictEqual({
      title: '[pfSense Actions] pfSense can\'t be reached',
      body: 'Couldn\'t sign in to pfSense at 192.168.1.1:22 over SSH in two checks in a row. Actions fail until it answers again.',
      priority: 4,
      tags: [
        'pfsense-actions',
        'warning',
      ],
    });

    return;
  });

  return;
});

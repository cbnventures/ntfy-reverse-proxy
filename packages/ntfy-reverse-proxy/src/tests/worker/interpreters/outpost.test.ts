import { describe, expect, it } from 'vitest';

import { outpostInterpreter } from '../../../worker/interpreters/outpost.js';

import type { Tests_Worker_Interpreters_Outpost_OutpostInterpreter_ReadsAnUpdatesAppliedAlert_Result } from '../../../types/tests/worker/interpreters/outpost.test.d.ts';

/**
 * Tests - Worker - Interpreters - Outpost - Interpreter.
 *
 * @since 2.3.0
 */
describe('outpostInterpreter', () => {
  it('reads an updates applied alert', () => {
    const result: Tests_Worker_Interpreters_Outpost_OutpostInterpreter_ReadsAnUpdatesAppliedAlert_Result = outpostInterpreter({
      version: 1,
      app: 'outpost',
      event: 'updates-applied',
      title: 'Containers updated',
      message: 'Updated 2 containers: pihole (pihole/pihole:latest), homeassistant (ghcr.io/home-assistant/home-assistant:stable).',
      priority: 3,
      tags: [
        'whale',
        'white_check_mark',
      ],
      occurredAt: '2026-10-26T12:00:00.000Z',
      details: {},
    });

    expect(result['notification']).toStrictEqual({
      title: '[Outpost] Containers updated',
      body: 'Updated 2 containers: pihole (pihole/pihole:latest), homeassistant (ghcr.io/home-assistant/home-assistant:stable).',
      priority: 3,
      tags: [
        'outpost',
        'whale',
        'white_check_mark',
      ],
    });

    return;
  });

  return;
});

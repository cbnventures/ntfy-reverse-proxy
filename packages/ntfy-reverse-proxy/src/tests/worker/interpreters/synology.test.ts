import { describe, expect, it } from 'vitest';

import { synologyInterpreter } from '../../../worker/interpreters/synology.js';

import type { TestsWorkerInterpretersSynologyResult } from '../../../types/tests/worker/interpreters/synology.test.d.ts';

/**
 * Tests - Worker - Interpreters - Synology - Interpreter.
 *
 * @since 2.0.0
 */
describe('synologyInterpreter', () => {
  /**
   * Tests - Worker - Interpreters - Synology.
   *
   * @since 2.0.0
   */
  it('handles plain text Synology webhook', () => {
    const result: TestsWorkerInterpretersSynologyResult = synologyInterpreter('System: Storage pool 1 has degraded');

    expect(result['notification']['body']).toContain('Storage pool 1 has degraded');

    expect(result['notification']['tags']).toBeDefined();

    return;
  });

  /**
   * Tests - Worker - Interpreters - Synology.
   *
   * @since 2.0.0
   */
  it('handles JSON Synology webhook with known fields', () => {
    const result: TestsWorkerInterpretersSynologyResult = synologyInterpreter({
      event: 'SystemEvent',
      severity: 'warning',
      message: 'Disk 1 has bad sectors',
      hostname: 'nas-01',
    });

    expect(result['notification']['body']).toContain('Disk 1 has bad sectors');

    expect(result['notification']['title']).toContain('nas-01');

    expect(result['notification']['priority']).toBeGreaterThanOrEqual(3);

    return;
  });

  /**
   * Tests - Worker - Interpreters - Synology.
   *
   * @since 2.0.0
   */
  it('maps severity to ntfy priority', () => {
    const warning: TestsWorkerInterpretersSynologyResult = synologyInterpreter({
      message: 'test', severity: 'warning',
    });
    const error: TestsWorkerInterpretersSynologyResult = synologyInterpreter({
      message: 'test', severity: 'error',
    });
    const info: TestsWorkerInterpretersSynologyResult = synologyInterpreter({
      message: 'test', severity: 'info',
    });

    expect(warning['notification']['priority']).toBe(3);

    expect(error['notification']['priority']).toBe(4);

    expect(info['notification']['priority']).toBe(2);

    return;
  });

  /**
   * Tests - Worker - Interpreters - Synology.
   *
   * @since 2.0.0
   */
  it('adds synology tag', () => {
    const result: TestsWorkerInterpretersSynologyResult = synologyInterpreter('test message');

    expect(result['notification']['tags']).toContain('synology');

    return;
  });

  /**
   * Tests - Worker - Interpreters - Synology.
   *
   * @since 2.0.0
   */
  it('enables markdown', () => {
    const result: TestsWorkerInterpretersSynologyResult = synologyInterpreter('test');

    expect(result['notification']['markdown']).toBe(true);

    return;
  });

  return;
});

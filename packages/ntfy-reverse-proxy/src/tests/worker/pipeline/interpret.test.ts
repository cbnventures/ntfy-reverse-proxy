import { describe, expect, it } from 'vitest';

import { interpret } from '../../../worker/pipeline/interpret.js';

import type {
  TestsWorkerPipelineInterpretInput,
  TestsWorkerPipelineInterpretPromiseResult,
  TestsWorkerPipelineInterpretRejectsExpectation,
  TestsWorkerPipelineInterpretResult,
} from '../../../types/tests/worker/pipeline/interpret.test.d.ts';

/**
 * Tests - Worker - Pipeline - Interpret.
 *
 * @since 2.0.0
 */
describe('interpret', () => {
  it('dispatches to plain-text interpreter', async () => {
    const result: TestsWorkerPipelineInterpretResult = await interpret('plain-text', 'hello world');

    expect(result).not.toStrictEqual(null);

    expect(result!['notification']['body']).toBe('hello world');

    return;
  });

  it('dispatches to ntfy-json interpreter', async () => {
    const result: TestsWorkerPipelineInterpretResult = await interpret('ntfy-json', { body: 'test message' });

    expect(result).not.toStrictEqual(null);

    expect(result!['notification']['body']).toBe('test message');

    return;
  });

  it('dispatches to synology interpreter', async () => {
    const result: TestsWorkerPipelineInterpretResult = await interpret('synology', 'Disk warning');

    expect(result).not.toStrictEqual(null);

    expect(result!['notification']['tags']).toContain('synology');

    return;
  });

  it('dispatches to statuspage interpreter', async () => {
    const input: TestsWorkerPipelineInterpretInput = {
      page: { name: 'Test' },
      incident: {
        name: 'Outage', status: 'investigating', impact: 'major', incident_updates: [],
      },
    };

    const result: TestsWorkerPipelineInterpretResult = await interpret('statuspage', input);

    expect(result).not.toStrictEqual(null);

    expect(result!['notification']['tags']).toContain('statuspage');

    return;
  });

  it('throws on unknown interpreter', async () => {
    const promise: TestsWorkerPipelineInterpretPromiseResult = interpret('unknown', 'test');

    const expectation: TestsWorkerPipelineInterpretRejectsExpectation = expect(promise).rejects.toThrow('Unknown interpreter');

    await expectation;

    return;
  });

  return;
});

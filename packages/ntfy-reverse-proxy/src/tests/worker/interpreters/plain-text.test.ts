import { describe, expect, it } from 'vitest';

import { plainTextInterpreter } from '../../../worker/interpreters/plain-text.js';

import type {
  TestsWorkerInterpretersPlainTextBuffer,
  TestsWorkerInterpretersPlainTextResult,
} from '../../../types/tests/worker/interpreters/plain-text.test.d.ts';

/**
 * Tests - Worker - Interpreters - Plain Text - Plain Text Interpreter.
 *
 * @since 2.0.0
 */
describe('plainTextInterpreter', () => {
  /**
   * Tests - Worker - Interpreters - Plain Text.
   *
   * @since 2.0.0
   */
  it('passes text through as body', () => {
    const result: TestsWorkerInterpretersPlainTextResult = plainTextInterpreter('Hello world');

    expect(result['notification']['body']).toBe('Hello world');

    return;
  });

  /**
   * Tests - Worker - Interpreters - Plain Text.
   *
   * @since 2.0.0
   */
  it('has no attachment', () => {
    const result: TestsWorkerInterpretersPlainTextResult = plainTextInterpreter('test');

    expect(result['attachment']).toBeUndefined();

    return;
  });

  /**
   * Tests - Worker - Interpreters - Plain Text.
   *
   * @since 2.0.0
   */
  it('handles binary input by converting to string representation', () => {
    const buffer: TestsWorkerInterpretersPlainTextBuffer = new TextEncoder().encode('binary content').buffer as ArrayBuffer;
    const result: TestsWorkerInterpretersPlainTextResult = plainTextInterpreter(buffer);

    expect(result['notification']['body']).toBe('binary content');

    return;
  });

  /**
   * Tests - Worker - Interpreters - Plain Text.
   *
   * @since 2.0.0
   */
  it('stringifies object input', () => {
    const result: TestsWorkerInterpretersPlainTextResult = plainTextInterpreter({ key: 'value' });

    expect(result['notification']['body']).toContain('key');

    expect(result['notification']['body']).toContain('value');

    return;
  });

  return;
});

import { describe, expect, it } from 'vitest';

import { ntfyJsonInterpreter } from '../../../worker/interpreters/ntfy-json.js';

import type {
  TestsWorkerInterpretersNtfyJsonRecordCast,
  TestsWorkerInterpretersNtfyJsonResult,
  TestsWorkerInterpretersNtfyJsonUnknownField,
} from '../../../types/tests/worker/interpreters/ntfy-json.test.d.ts';

/**
 * Tests - Worker - Interpreters - Ntfy JSON - Ntfy JSON Interpreter.
 *
 * @since 2.0.0
 */
describe('ntfyJsonInterpreter', () => {
  /**
   * Tests - Worker - Interpreters - Ntfy JSON.
   *
   * @since 2.0.0
   */
  it('maps JSON fields to notification object', () => {
    const result: TestsWorkerInterpretersNtfyJsonResult = ntfyJsonInterpreter({
      title: 'Alert',
      body: 'Something happened',
      priority: 4,
      tags: ['warning'],
    });

    if (result === null) {
      expect(result).not.toBeNull();
      return;
    }

    expect(result['notification']['title']).toBe('Alert');

    expect(result['notification']['body']).toBe('Something happened');

    expect(result['notification']['priority']).toBe(4);

    expect(result['notification']['tags']).toEqual(['warning']);

    return;
  });

  /**
   * Tests - Worker - Interpreters - Ntfy JSON.
   *
   * @since 2.0.0
   */
  it('requires body field', () => {
    expect(() => ntfyJsonInterpreter({ title: 'No body' })).toThrow();

    return;
  });

  /**
   * Tests - Worker - Interpreters - Ntfy JSON.
   *
   * @since 2.0.0
   */
  it('ignores unknown fields', () => {
    const result: TestsWorkerInterpretersNtfyJsonResult = ntfyJsonInterpreter({
      body: 'test', unknown_field: 'ignored',
    });

    if (result === null) {
      expect(result).not.toBeNull();
      return;
    }

    const unknownField: TestsWorkerInterpretersNtfyJsonUnknownField = (result['notification'] as TestsWorkerInterpretersNtfyJsonRecordCast)['unknown_field'];

    expect(result['notification']['body']).toBe('test');

    expect(unknownField).toBeUndefined();

    return;
  });

  /**
   * Tests - Worker - Interpreters - Ntfy JSON.
   *
   * @since 2.0.0
   */
  it('handles string input by parsing JSON', () => {
    const result: TestsWorkerInterpretersNtfyJsonResult = ntfyJsonInterpreter('{"body":"from string"}');

    if (result === null) {
      expect(result).not.toBeNull();
      return;
    }

    expect(result['notification']['body']).toBe('from string');

    return;
  });

  /**
   * Tests - Worker - Interpreters - Ntfy JSON.
   *
   * @since 2.0.0
   */
  it('returns null on non-JSON string input', () => {
    const result: TestsWorkerInterpretersNtfyJsonResult = ntfyJsonInterpreter('not json');

    expect(result).toBeNull();

    return;
  });

  /**
   * Tests - Worker - Interpreters - Ntfy JSON.
   *
   * @since 2.0.0
   */
  it('maps optional ntfy fields', () => {
    const result: TestsWorkerInterpretersNtfyJsonResult = ntfyJsonInterpreter({
      body: 'test',
      icon: 'https://example.com/icon.png',
      attach: 'https://example.com/file.pdf',
      filename: 'report.pdf',
      markdown: true,
    });

    if (result === null) {
      expect(result).not.toBeNull();
      return;
    }

    expect(result['notification']['icon']).toBe('https://example.com/icon.png');

    expect(result['notification']['attach']).toBe('https://example.com/file.pdf');

    expect(result['notification']['filename']).toBe('report.pdf');

    expect(result['notification']['markdown']).toBe(true);

    return;
  });

  return;
});

import { describe, expect, it } from 'vitest';

import { split } from '../../../worker/pipeline/split.js';

import type {
  TestsWorkerPipelineSplitBody,
  TestsWorkerPipelineSplitHeaders,
  TestsWorkerPipelineSplitLongBody,
  TestsWorkerPipelineSplitResult,
} from '../../../types/tests/worker/pipeline/split.test.d.ts';

/**
 * Tests - Worker - Pipeline - Split.
 *
 * @since 2.0.0
 */
describe('split', () => {
  it('returns single message when under limit', () => {
    const result: TestsWorkerPipelineSplitResult = split('Short message', { 'X-Title': 'Test' });

    expect(result).toHaveLength(1);

    expect(result[0]!['body']).toBe('Short message');

    return;
  });

  it('splits message exceeding ~4000 bytes', () => {
    const longBody: TestsWorkerPipelineSplitLongBody = 'A'.repeat(5000);
    const result: TestsWorkerPipelineSplitResult = split(longBody, { 'X-Title': 'Test' });

    expect(result.length).toBeGreaterThan(1);

    return;
  });

  it('adds part numbers to title', () => {
    const longBody: TestsWorkerPipelineSplitLongBody = 'A'.repeat(5000);
    const result: TestsWorkerPipelineSplitResult = split(longBody, { 'X-Title': 'Test' });

    expect(result[0]!['headers']['X-Title']).toContain('(1/');

    expect(result[result.length - 1]!['headers']['X-Title']).toContain(`(${result.length}/`);

    return;
  });

  it('preserves all headers on each part', () => {
    const longBody: TestsWorkerPipelineSplitLongBody = 'A'.repeat(5000);
    const headers: TestsWorkerPipelineSplitHeaders = {
      'X-Title': 'Test', 'X-Tags': 'important', 'X-Priority': '4',
    };
    const result: TestsWorkerPipelineSplitResult = split(longBody, headers);

    for (const part of result) {
      expect(part['headers']['X-Tags']).toBe('important');

      expect(part['headers']['X-Priority']).toBe('4');
    }

    return;
  });

  it('does not split on multi-byte character boundaries', () => {
    const body: TestsWorkerPipelineSplitBody = 'Hello '.repeat(500);
    const result: TestsWorkerPipelineSplitResult = split(body, { 'X-Title': 'Emoji' });

    for (const part of result) {
      expect(() => new TextEncoder().encode(part['body'])).not.toThrow();
    }

    return;
  });

  it('creates title if none exists when splitting', () => {
    const longBody: TestsWorkerPipelineSplitLongBody = 'A'.repeat(5000);
    const result: TestsWorkerPipelineSplitResult = split(longBody, {});

    expect(result[0]!['headers']['X-Title']).toContain('(1/');

    return;
  });

  return;
});

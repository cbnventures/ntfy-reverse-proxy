import { describe, expect, it } from 'vitest';

import { split } from '../../../worker/pipeline/split.js';

import type {
  Tests_Worker_Pipeline_Split_Split_AddsPartNumbersToTitle_LongBody,
  Tests_Worker_Pipeline_Split_Split_AddsPartNumbersToTitle_Result,
  Tests_Worker_Pipeline_Split_Split_CreatesTitleIfNoneExistsWhenSplitting_LongBody,
  Tests_Worker_Pipeline_Split_Split_CreatesTitleIfNoneExistsWhenSplitting_Result,
  Tests_Worker_Pipeline_Split_Split_DoesNotSplitOnMultiByteCharacterBoundaries_Body,
  Tests_Worker_Pipeline_Split_Split_DoesNotSplitOnMultiByteCharacterBoundaries_Result,
  Tests_Worker_Pipeline_Split_Split_PreservesAllHeadersOnEachPart_Headers,
  Tests_Worker_Pipeline_Split_Split_PreservesAllHeadersOnEachPart_LongBody,
  Tests_Worker_Pipeline_Split_Split_PreservesAllHeadersOnEachPart_Result,
  Tests_Worker_Pipeline_Split_Split_ReturnsSingleMessageWhenUnderLimit_Result,
  Tests_Worker_Pipeline_Split_Split_SplitsMessageExceeding4000Bytes_LongBody,
  Tests_Worker_Pipeline_Split_Split_SplitsMessageExceeding4000Bytes_Result,
} from '../../../types/tests/worker/pipeline/split.test.d.ts';

/**
 * Tests - Worker - Pipeline - Split.
 *
 * @since 2.0.0
 */
describe('split', () => {
  it('returns single message when under limit', () => {
    const result: Tests_Worker_Pipeline_Split_Split_ReturnsSingleMessageWhenUnderLimit_Result = split('Short message', { 'X-Title': 'Test' });

    expect(result).toHaveLength(1);

    expect(result[0]!['body']).toBe('Short message');

    return;
  });

  it('splits message exceeding ~4000 bytes', () => {
    const longBody: Tests_Worker_Pipeline_Split_Split_SplitsMessageExceeding4000Bytes_LongBody = 'A'.repeat(5000);
    const result: Tests_Worker_Pipeline_Split_Split_SplitsMessageExceeding4000Bytes_Result = split(longBody, { 'X-Title': 'Test' });

    expect(result.length).toBeGreaterThan(1);

    return;
  });

  it('adds part numbers to title', () => {
    const longBody: Tests_Worker_Pipeline_Split_Split_AddsPartNumbersToTitle_LongBody = 'A'.repeat(5000);
    const result: Tests_Worker_Pipeline_Split_Split_AddsPartNumbersToTitle_Result = split(longBody, { 'X-Title': 'Test' });

    expect(result[0]!['headers']['X-Title']).toContain('(1/');

    expect(result[result.length - 1]!['headers']['X-Title']).toContain(`(${result.length}/`);

    return;
  });

  it('preserves all headers on each part', () => {
    const longBody: Tests_Worker_Pipeline_Split_Split_PreservesAllHeadersOnEachPart_LongBody = 'A'.repeat(5000);
    const headers: Tests_Worker_Pipeline_Split_Split_PreservesAllHeadersOnEachPart_Headers = {
      'X-Title': 'Test',
      'X-Tags': 'important',
      'X-Priority': '4',
    };
    const result: Tests_Worker_Pipeline_Split_Split_PreservesAllHeadersOnEachPart_Result = split(longBody, headers);

    for (const part of result) {
      expect(part['headers']['X-Tags']).toBe('important');

      expect(part['headers']['X-Priority']).toBe('4');
    }

    return;
  });

  it('does not split on multi-byte character boundaries', () => {
    const body: Tests_Worker_Pipeline_Split_Split_DoesNotSplitOnMultiByteCharacterBoundaries_Body = 'Hello '.repeat(500);
    const result: Tests_Worker_Pipeline_Split_Split_DoesNotSplitOnMultiByteCharacterBoundaries_Result = split(body, { 'X-Title': 'Emoji' });

    for (const part of result) {
      expect(() => new TextEncoder().encode(part['body'])).not.toThrow();
    }

    return;
  });

  it('creates title if none exists when splitting', () => {
    const longBody: Tests_Worker_Pipeline_Split_Split_CreatesTitleIfNoneExistsWhenSplitting_LongBody = 'A'.repeat(5000);
    const result: Tests_Worker_Pipeline_Split_Split_CreatesTitleIfNoneExistsWhenSplitting_Result = split(longBody, {});

    expect(result[0]!['headers']['X-Title']).toContain('(1/');

    return;
  });

  return;
});

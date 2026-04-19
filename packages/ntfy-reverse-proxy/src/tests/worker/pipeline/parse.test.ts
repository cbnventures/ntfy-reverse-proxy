import { describe, expect, it } from 'vitest';

import { parse } from '../../../worker/pipeline/parse.js';

import type {
  TestsWorkerPipelineParseBody,
  TestsWorkerPipelineParseEmptyBody,
  TestsWorkerPipelineParseHeaders,
  TestsWorkerPipelineParseResult,
} from '../../../types/tests/worker/pipeline/parse.test.d.ts';

/**
 * Tests - Worker - Pipeline - Parse.
 *
 * @since 2.0.0
 */
describe('parse', () => {
  it('detects plain text body', () => {
    const body: TestsWorkerPipelineParseBody = new TextEncoder().encode('Hello world');
    const headers: TestsWorkerPipelineParseHeaders = new Headers({ 'content-type': 'text/plain' });
    const result: TestsWorkerPipelineParseResult = parse(body.buffer as ArrayBuffer, headers);

    expect(result['type']).toBe('text');

    expect(result['text']).toBe('Hello world');

    return;
  });

  it('detects JSON body', () => {
    const body: TestsWorkerPipelineParseBody = new TextEncoder().encode('{"title":"test","body":"hello"}');
    const headers: TestsWorkerPipelineParseHeaders = new Headers({ 'content-type': 'application/json' });
    const result: TestsWorkerPipelineParseResult = parse(body.buffer as ArrayBuffer, headers);

    expect(result['type']).toBe('json');

    expect(result['json']).toEqual({
      title: 'test', body: 'hello',
    });

    return;
  });

  it('detects JSON without content-type header by parsing', () => {
    const body: TestsWorkerPipelineParseBody = new TextEncoder().encode('{"key":"value"}');
    const headers: TestsWorkerPipelineParseHeaders = new Headers();
    const result: TestsWorkerPipelineParseResult = parse(body.buffer as ArrayBuffer, headers);

    expect(result['type']).toBe('json');

    return;
  });

  it('detects binary body via null bytes', () => {
    const body: TestsWorkerPipelineParseBody = new Uint8Array([
      parseInt('89', 16),
      parseInt('50', 16),
      parseInt('4E', 16),
      parseInt('47', 16),
      parseInt('00', 16),
      parseInt('0D', 16),
      parseInt('0A', 16),
    ]);
    const headers: TestsWorkerPipelineParseHeaders = new Headers({ 'content-type': 'application/octet-stream' });

    const result: TestsWorkerPipelineParseResult = parse(body.buffer as ArrayBuffer, headers);

    expect(result['type']).toBe('binary');

    expect(result['binary']).toBeInstanceOf(ArrayBuffer);

    return;
  });

  it('detects binary when text decoding finds null bytes', () => {
    const body: TestsWorkerPipelineParseBody = new Uint8Array([
      parseInt('48', 16),
      parseInt('65', 16),
      parseInt('6C', 16),
      parseInt('00', 16),
      parseInt('6F', 16),
    ]);
    const headers: TestsWorkerPipelineParseHeaders = new Headers();

    const result: TestsWorkerPipelineParseResult = parse(body.buffer as ArrayBuffer, headers);

    expect(result['type']).toBe('binary');

    return;
  });

  it('returns unknown for empty body', () => {
    const body: TestsWorkerPipelineParseEmptyBody = new ArrayBuffer(0);
    const headers: TestsWorkerPipelineParseHeaders = new Headers();
    const result: TestsWorkerPipelineParseResult = parse(body, headers);

    expect(result['type']).toBe('unknown');

    return;
  });

  return;
});

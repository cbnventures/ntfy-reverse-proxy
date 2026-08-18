import { describe, expect, it } from 'vitest';

import { parse } from '../../../worker/pipeline/parse.js';

import type {
  Tests_Worker_Pipeline_Parse_Parse_DetectsBinaryBodyViaNullBytes_Body,
  Tests_Worker_Pipeline_Parse_Parse_DetectsBinaryBodyViaNullBytes_Headers,
  Tests_Worker_Pipeline_Parse_Parse_DetectsBinaryBodyViaNullBytes_Result,
  Tests_Worker_Pipeline_Parse_Parse_DetectsBinaryWhenTextDecodingFindsNullBytes_Body,
  Tests_Worker_Pipeline_Parse_Parse_DetectsBinaryWhenTextDecodingFindsNullBytes_Headers,
  Tests_Worker_Pipeline_Parse_Parse_DetectsBinaryWhenTextDecodingFindsNullBytes_Result,
  Tests_Worker_Pipeline_Parse_Parse_DetectsJSONBody_Body,
  Tests_Worker_Pipeline_Parse_Parse_DetectsJSONBody_Headers,
  Tests_Worker_Pipeline_Parse_Parse_DetectsJSONBody_Result,
  Tests_Worker_Pipeline_Parse_Parse_DetectsJSONWithoutContentTypeHeaderByParsing_Body,
  Tests_Worker_Pipeline_Parse_Parse_DetectsJSONWithoutContentTypeHeaderByParsing_Headers,
  Tests_Worker_Pipeline_Parse_Parse_DetectsJSONWithoutContentTypeHeaderByParsing_Result,
  Tests_Worker_Pipeline_Parse_Parse_DetectsPlainTextBody_Body,
  Tests_Worker_Pipeline_Parse_Parse_DetectsPlainTextBody_Headers,
  Tests_Worker_Pipeline_Parse_Parse_DetectsPlainTextBody_Result,
  Tests_Worker_Pipeline_Parse_Parse_ReturnsUnknownForEmptyBody_Body,
  Tests_Worker_Pipeline_Parse_Parse_ReturnsUnknownForEmptyBody_Headers,
  Tests_Worker_Pipeline_Parse_Parse_ReturnsUnknownForEmptyBody_Result,
} from '../../../types/tests/worker/pipeline/parse.test.d.ts';

/**
 * Tests - Worker - Pipeline - Parse.
 *
 * @since 2.0.0
 */
describe('parse', () => {
  it('detects plain text body', () => {
    const body: Tests_Worker_Pipeline_Parse_Parse_DetectsPlainTextBody_Body = new TextEncoder().encode('Hello world');
    const headers: Tests_Worker_Pipeline_Parse_Parse_DetectsPlainTextBody_Headers = new Headers({ 'content-type': 'text/plain' });
    const result: Tests_Worker_Pipeline_Parse_Parse_DetectsPlainTextBody_Result = parse(body.buffer as ArrayBuffer, headers);

    expect(result['type']).toBe('text');

    expect(result['text']).toBe('Hello world');

    return;
  });

  it('detects JSON body', () => {
    const body: Tests_Worker_Pipeline_Parse_Parse_DetectsJSONBody_Body = new TextEncoder().encode('{"title":"test","body":"hello"}');
    const headers: Tests_Worker_Pipeline_Parse_Parse_DetectsJSONBody_Headers = new Headers({ 'content-type': 'application/json' });
    const result: Tests_Worker_Pipeline_Parse_Parse_DetectsJSONBody_Result = parse(body.buffer as ArrayBuffer, headers);

    expect(result['type']).toBe('json');

    expect(result['json']).toEqual({
      title: 'test',
      body: 'hello',
    });

    return;
  });

  it('detects JSON without content-type header by parsing', () => {
    const body: Tests_Worker_Pipeline_Parse_Parse_DetectsJSONWithoutContentTypeHeaderByParsing_Body = new TextEncoder().encode('{"key":"value"}');
    const headers: Tests_Worker_Pipeline_Parse_Parse_DetectsJSONWithoutContentTypeHeaderByParsing_Headers = new Headers();
    const result: Tests_Worker_Pipeline_Parse_Parse_DetectsJSONWithoutContentTypeHeaderByParsing_Result = parse(body.buffer as ArrayBuffer, headers);

    expect(result['type']).toBe('json');

    return;
  });

  it('detects binary body via null bytes', () => {
    const body: Tests_Worker_Pipeline_Parse_Parse_DetectsBinaryBodyViaNullBytes_Body = new Uint8Array([
      parseInt('89', 16),
      parseInt('50', 16),
      parseInt('4E', 16),
      parseInt('47', 16),
      parseInt('00', 16),
      parseInt('0D', 16),
      parseInt('0A', 16),
    ]);
    const headers: Tests_Worker_Pipeline_Parse_Parse_DetectsBinaryBodyViaNullBytes_Headers = new Headers({ 'content-type': 'application/octet-stream' });

    const result: Tests_Worker_Pipeline_Parse_Parse_DetectsBinaryBodyViaNullBytes_Result = parse(body.buffer as ArrayBuffer, headers);

    expect(result['type']).toBe('binary');

    expect(result['binary']).toBeInstanceOf(ArrayBuffer);

    return;
  });

  it('detects binary when text decoding finds null bytes', () => {
    const body: Tests_Worker_Pipeline_Parse_Parse_DetectsBinaryWhenTextDecodingFindsNullBytes_Body = new Uint8Array([
      parseInt('48', 16),
      parseInt('65', 16),
      parseInt('6C', 16),
      parseInt('00', 16),
      parseInt('6F', 16),
    ]);
    const headers: Tests_Worker_Pipeline_Parse_Parse_DetectsBinaryWhenTextDecodingFindsNullBytes_Headers = new Headers();

    const result: Tests_Worker_Pipeline_Parse_Parse_DetectsBinaryWhenTextDecodingFindsNullBytes_Result = parse(body.buffer as ArrayBuffer, headers);

    expect(result['type']).toBe('binary');

    return;
  });

  it('returns unknown for empty body', () => {
    const body: Tests_Worker_Pipeline_Parse_Parse_ReturnsUnknownForEmptyBody_Body = new ArrayBuffer(0);
    const headers: Tests_Worker_Pipeline_Parse_Parse_ReturnsUnknownForEmptyBody_Headers = new Headers();
    const result: Tests_Worker_Pipeline_Parse_Parse_ReturnsUnknownForEmptyBody_Result = parse(body, headers);

    expect(result['type']).toBe('unknown');

    return;
  });

  return;
});

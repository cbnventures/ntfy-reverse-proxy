import { describe, expect, it } from 'vitest';

import { receive } from '../../../worker/pipeline/receive.js';

import type {
  TestsWorkerPipelineReceiveBaseDomain,
  TestsWorkerPipelineReceiveBody,
  TestsWorkerPipelineReceiveHeaderValue,
  TestsWorkerPipelineReceiveRequest,
  TestsWorkerPipelineReceiveResult,
} from '../../../types/tests/worker/pipeline/receive.test.d.ts';

/**
 * Tests - Worker - Pipeline - Receive.
 *
 * @since 2.0.0
 */
describe('receive', () => {
  const baseDomain: TestsWorkerPipelineReceiveBaseDomain = 'ntfy.example.com';

  it('extracts metadata from a valid POST request', async () => {
    const request: TestsWorkerPipelineReceiveRequest = new Request('https://abc.ntfy.example.com/test', {
      method: 'POST',
      body: 'hello',
    });

    const result: TestsWorkerPipelineReceiveResult = await receive(request, baseDomain);

    expect(result['method']).toBe('POST');

    expect(result['hostname']).toBe('abc.ntfy.example.com');

    expect(result['isGet']).toBe(false);

    return;
  });

  it('identifies GET requests', async () => {
    const request: TestsWorkerPipelineReceiveRequest = new Request('https://abc.ntfy.example.com/', {
      method: 'GET',
    });

    const result: TestsWorkerPipelineReceiveResult = await receive(request, baseDomain);

    expect(result['isGet']).toBe(true);

    return;
  });

  it('returns redirect for HTTP in production', async () => {
    const request: TestsWorkerPipelineReceiveRequest = new Request('http://abc.ntfy.example.com/test', {
      method: 'POST',
      body: 'hello',
    });

    const result: TestsWorkerPipelineReceiveResult = await receive(request, baseDomain);

    expect(result['redirect']).toBeDefined();

    expect(result['redirect']).toContain('https://');

    return;
  });

  it('does not redirect HTTP on localhost', async () => {
    const request: TestsWorkerPipelineReceiveRequest = new Request('http://localhost:8787/test', {
      method: 'POST',
      body: 'hello',
    });

    const result: TestsWorkerPipelineReceiveResult = await receive(request, 'localhost');

    expect(result['redirect']).toBeUndefined();

    return;
  });

  it('rejects unsupported HTTP methods', async () => {
    const request: TestsWorkerPipelineReceiveRequest = new Request('https://abc.ntfy.example.com/test', {
      method: 'DELETE',
    });

    const result: TestsWorkerPipelineReceiveResult = await receive(request, baseDomain);

    expect(result['error']).toBeDefined();

    expect(result['error']).toContain('Method not allowed');

    return;
  });

  it('extracts raw body as ArrayBuffer', async () => {
    const body: TestsWorkerPipelineReceiveBody = 'test message';

    const request: TestsWorkerPipelineReceiveRequest = new Request('https://abc.ntfy.example.com/test', {
      method: 'POST',
      body,
    });

    const result: TestsWorkerPipelineReceiveResult = await receive(request, baseDomain);

    expect(result['rawBody']).toBeInstanceOf(ArrayBuffer);

    return;
  });

  it('extracts headers from the request', async () => {
    const request: TestsWorkerPipelineReceiveRequest = new Request('https://abc.ntfy.example.com/test', {
      method: 'POST',
      body: 'hello',
      headers: { 'X-Title': 'Test Title' },
    });

    const result: TestsWorkerPipelineReceiveResult = await receive(request, baseDomain);

    const headerValue: TestsWorkerPipelineReceiveHeaderValue = result['headers'].get('x-title');

    expect(headerValue).toBe('Test Title');

    return;
  });

  return;
});

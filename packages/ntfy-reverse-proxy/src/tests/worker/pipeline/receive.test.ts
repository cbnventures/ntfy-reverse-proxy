import { describe, expect, it } from 'vitest';

import { receive } from '../../../worker/pipeline/receive.js';

import type {
  Tests_Worker_Pipeline_Receive_Receive_BaseDomain,
  Tests_Worker_Pipeline_Receive_Receive_DoesNotRedirectHTTPOnLocalhost_Request,
  Tests_Worker_Pipeline_Receive_Receive_DoesNotRedirectHTTPOnLocalhost_Result,
  Tests_Worker_Pipeline_Receive_Receive_ExtractsHeadersFromTheRequest_HeaderValue,
  Tests_Worker_Pipeline_Receive_Receive_ExtractsHeadersFromTheRequest_Request,
  Tests_Worker_Pipeline_Receive_Receive_ExtractsHeadersFromTheRequest_Result,
  Tests_Worker_Pipeline_Receive_Receive_ExtractsMetadataFromAValidPOSTRequest_Request,
  Tests_Worker_Pipeline_Receive_Receive_ExtractsMetadataFromAValidPOSTRequest_Result,
  Tests_Worker_Pipeline_Receive_Receive_ExtractsRawBodyAsArrayBuffer_Body,
  Tests_Worker_Pipeline_Receive_Receive_ExtractsRawBodyAsArrayBuffer_Request,
  Tests_Worker_Pipeline_Receive_Receive_ExtractsRawBodyAsArrayBuffer_Result,
  Tests_Worker_Pipeline_Receive_Receive_IdentifiesGETRequests_Request,
  Tests_Worker_Pipeline_Receive_Receive_IdentifiesGETRequests_Result,
  Tests_Worker_Pipeline_Receive_Receive_RejectsUnsupportedHTTPMethods_Request,
  Tests_Worker_Pipeline_Receive_Receive_RejectsUnsupportedHTTPMethods_Result,
  Tests_Worker_Pipeline_Receive_Receive_ReturnsRedirectForHTTPInProduction_Request,
  Tests_Worker_Pipeline_Receive_Receive_ReturnsRedirectForHTTPInProduction_Result,
} from '../../../types/tests/worker/pipeline/receive.test.d.ts';

/**
 * Tests - Worker - Pipeline - Receive.
 *
 * @since 2.0.0
 */
describe('receive', () => {
  const baseDomain: Tests_Worker_Pipeline_Receive_Receive_BaseDomain = 'ntfy.example.com';

  it('extracts metadata from a valid POST request', async () => {
    const request: Tests_Worker_Pipeline_Receive_Receive_ExtractsMetadataFromAValidPOSTRequest_Request = new Request('https://abc.ntfy.example.com/test', {
      method: 'POST',
      body: 'hello',
    });

    const result: Tests_Worker_Pipeline_Receive_Receive_ExtractsMetadataFromAValidPOSTRequest_Result = await receive(request, baseDomain);

    expect(result['method']).toBe('POST');

    expect(result['hostname']).toBe('abc.ntfy.example.com');

    expect(result['isGet']).toBe(false);

    return;
  });

  it('identifies GET requests', async () => {
    const request: Tests_Worker_Pipeline_Receive_Receive_IdentifiesGETRequests_Request = new Request('https://abc.ntfy.example.com/', {
      method: 'GET',
    });

    const result: Tests_Worker_Pipeline_Receive_Receive_IdentifiesGETRequests_Result = await receive(request, baseDomain);

    expect(result['isGet']).toBe(true);

    return;
  });

  it('returns redirect for HTTP in production', async () => {
    const request: Tests_Worker_Pipeline_Receive_Receive_ReturnsRedirectForHTTPInProduction_Request = new Request('http://abc.ntfy.example.com/test', {
      method: 'POST',
      body: 'hello',
    });

    const result: Tests_Worker_Pipeline_Receive_Receive_ReturnsRedirectForHTTPInProduction_Result = await receive(request, baseDomain);

    expect(result['redirect']).toBeDefined();

    expect(result['redirect']).toContain('https://');

    return;
  });

  it('does not redirect HTTP on localhost', async () => {
    const request: Tests_Worker_Pipeline_Receive_Receive_DoesNotRedirectHTTPOnLocalhost_Request = new Request('http://localhost:8787/test', {
      method: 'POST',
      body: 'hello',
    });

    const result: Tests_Worker_Pipeline_Receive_Receive_DoesNotRedirectHTTPOnLocalhost_Result = await receive(request, 'localhost');

    expect(result['redirect']).toBeUndefined();

    return;
  });

  it('rejects unsupported HTTP methods', async () => {
    const request: Tests_Worker_Pipeline_Receive_Receive_RejectsUnsupportedHTTPMethods_Request = new Request('https://abc.ntfy.example.com/test', {
      method: 'DELETE',
    });

    const result: Tests_Worker_Pipeline_Receive_Receive_RejectsUnsupportedHTTPMethods_Result = await receive(request, baseDomain);

    expect(result['error']).toBeDefined();

    expect(result['error']).toContain('Method not allowed');

    return;
  });

  it('extracts raw body as ArrayBuffer', async () => {
    const body: Tests_Worker_Pipeline_Receive_Receive_ExtractsRawBodyAsArrayBuffer_Body = 'test message';

    const request: Tests_Worker_Pipeline_Receive_Receive_ExtractsRawBodyAsArrayBuffer_Request = new Request('https://abc.ntfy.example.com/test', {
      method: 'POST',
      body,
    });

    const result: Tests_Worker_Pipeline_Receive_Receive_ExtractsRawBodyAsArrayBuffer_Result = await receive(request, baseDomain);

    expect(result['rawBody']).toBeInstanceOf(ArrayBuffer);

    return;
  });

  it('extracts headers from the request', async () => {
    const request: Tests_Worker_Pipeline_Receive_Receive_ExtractsHeadersFromTheRequest_Request = new Request('https://abc.ntfy.example.com/test', {
      method: 'POST',
      body: 'hello',
      headers: { 'X-Title': 'Test Title' },
    });

    const result: Tests_Worker_Pipeline_Receive_Receive_ExtractsHeadersFromTheRequest_Result = await receive(request, baseDomain);

    const headerValue: Tests_Worker_Pipeline_Receive_Receive_ExtractsHeadersFromTheRequest_HeaderValue = result['headers'].get('x-title');

    expect(headerValue).toBe('Test Title');

    return;
  });

  return;
});

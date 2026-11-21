import {
  afterEach, describe, expect, it, vi,
} from 'vitest';

import { Runner as CloudflareClient } from '../../lib/cloudflare.js';

import type {
  Tests_Lib_Cloudflare_Client_CreatesAndDeletesEmailRoutingRules_FetchSpy,
  Tests_Lib_Cloudflare_Client_FindsTheZoneWithABearerToken_FetchSpy,
  Tests_Lib_Cloudflare_Client_FindsTheZoneWithABearerToken_Zone,
  Tests_Lib_Cloudflare_Client_ListsEveryKvNamespaceAndCreatesOne_FetchSpy,
  Tests_Lib_Cloudflare_Client_ListsEveryKvNamespaceAndCreatesOne_Namespaces,
  Tests_Lib_Cloudflare_Client_NamesEachMissingPermission_Missing,
  Tests_Lib_Cloudflare_Client_ReadsEmailRoutingRulesAsAddressesAndWorkers_Rules,
  Tests_Lib_Cloudflare_Client_RecognisesEmailRoutingMxHosts_Matches,
  Tests_Lib_Cloudflare_CloudflareResponse_Result,
  Tests_Lib_Cloudflare_CloudflareResponse_Returns,
  Tests_Lib_Cloudflare_CloudflareResponse_Success,
} from '../../types/tests/lib/cloudflare.test.d.ts';

afterEach(() => {
  vi.restoreAllMocks();

  return;
});

/**
 * Tests - Lib - Cloudflare - Response.
 *
 * Builds a Cloudflare v4 envelope around a result, so each test only describes
 * the part of the answer the client reads.
 *
 * @param {Tests_Lib_Cloudflare_CloudflareResponse_Result}  result    - Result.
 * @param {Tests_Lib_Cloudflare_CloudflareResponse_Success} [success] - Success.
 *
 * @returns {Tests_Lib_Cloudflare_CloudflareResponse_Returns}
 *
 * @since 2.5.0
 */
function cloudflareResponse(result: Tests_Lib_Cloudflare_CloudflareResponse_Result, success: Tests_Lib_Cloudflare_CloudflareResponse_Success = true): Tests_Lib_Cloudflare_CloudflareResponse_Returns {
  return new Response(JSON.stringify({
    success,
    errors: (success === true) ? [] : [{
      code: 10000,
      message: 'Authentication error',
    }],
    result,
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Tests - Lib - Cloudflare - Client.
 *
 * @since 2.5.0
 */
describe('client', () => {
  it('finds the zone with a bearer token', async () => {
    const fetchSpy: Tests_Lib_Cloudflare_Client_FindsTheZoneWithABearerToken_FetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(cloudflareResponse([{
      id: 'zone-id',
      name: 'example.com',
      account: { id: 'account-id' },
    }])).mockResolvedValueOnce(new Response('', { status: 403 }));

    const zone: Tests_Lib_Cloudflare_Client_FindsTheZoneWithABearerToken_Zone = await CloudflareClient.findZone('token', 'example.com');

    expect(zone).toEqual({
      zoneId: 'zone-id',
      accountId: 'account-id',
      zoneName: 'example.com',
    });

    expect(String(fetchSpy.mock.calls[0]![0])).toBe('https://api.cloudflare.com/client/v4/zones?name=example.com');

    expect(new Headers(fetchSpy.mock.calls[0]![1]!['headers']).get('Authorization')).toBe('Bearer token');

    await expect(CloudflareClient.findZone('token', 'example.org')).resolves.toBeUndefined();

    return;
  });

  it('names each missing permission', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => cloudflareResponse([], String(input).includes('/storage/kv/') === false));

    const missing: Tests_Lib_Cloudflare_Client_NamesEachMissingPermission_Missing = await CloudflareClient.findMissingPermissions('token', 'zone-id', 'account-id', true);

    expect(missing).toEqual(['Account > Workers KV Storage > Edit']);

    return;
  });

  it('lists every kv namespace and creates one', async () => {
    const fetchSpy: Tests_Lib_Cloudflare_Client_ListsEveryKvNamespaceAndCreatesOne_FetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(async (_input, init) => {
      if (init !== undefined && init['method'] === 'POST') {
        return cloudflareResponse({ id: 'new-namespace' });
      }

      return cloudflareResponse([{
        id: 'namespace-1',
        title: 'ntfy-kv',
      }]);
    });

    const namespaces: Tests_Lib_Cloudflare_Client_ListsEveryKvNamespaceAndCreatesOne_Namespaces = await CloudflareClient.listKvNamespaces('token', 'account-id');

    expect(namespaces).toEqual([{
      id: 'namespace-1',
      title: 'ntfy-kv',
    }]);

    await expect(CloudflareClient.createKvNamespace('token', 'account-id', 'proxy-kv')).resolves.toBe('new-namespace');

    expect(fetchSpy.mock.calls[1]![1]).toMatchObject({
      method: 'POST',
      body: JSON.stringify({ title: 'proxy-kv' }),
    });

    return;
  });

  it('reads email routing rules as addresses and workers', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(cloudflareResponse([{
      tag: 'rule-1',
      name: 'ntfy: alerts',
      enabled: true,
      matchers: [{
        type: 'literal',
        field: 'to',
        value: 'alerts@example.com',
      }],
      actions: [{
        type: 'worker',
        value: ['ntfy'],
      }],
    }])).mockResolvedValueOnce(new Response('', { status: 500 }));

    const rules: Tests_Lib_Cloudflare_Client_ReadsEmailRoutingRulesAsAddressesAndWorkers_Rules = await CloudflareClient.listEmailRoutingRules('token', 'zone-id');

    expect(rules).toEqual([{
      id: 'rule-1',
      toAddresses: ['alerts@example.com'],
      workerNames: ['ntfy'],
    }]);

    await expect(CloudflareClient.listEmailRoutingRules('token', 'zone-id')).rejects.toThrow('Failed to list email routing rules: HTTP 500');

    return;
  });

  it('creates and deletes email routing rules', async () => {
    const fetchSpy: Tests_Lib_Cloudflare_Client_CreatesAndDeletesEmailRoutingRules_FetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(cloudflareResponse({})).mockResolvedValueOnce(cloudflareResponse(null, false));

    await CloudflareClient.createEmailRoutingRule('token', 'zone-id', 'alerts@example.com', 'ntfy: alerts', 'ntfy');

    expect(JSON.parse(String(fetchSpy.mock.calls[0]![1]!['body']))).toEqual({
      matchers: [{
        type: 'literal',
        field: 'to',
        value: 'alerts@example.com',
      }],
      actions: [{
        type: 'worker',
        value: ['ntfy'],
      }],
      name: 'ntfy: alerts',
      enabled: true,
    });

    await expect(CloudflareClient.deleteEmailRoutingRule('token', 'zone-id', 'rule-1')).rejects.toThrow('Failed to delete email routing rule "rule-1": 10000: Authentication error');

    return;
  });

  it('recognises email routing mx hosts', () => {
    const matches: Tests_Lib_Cloudflare_Client_RecognisesEmailRoutingMxHosts_Matches = CloudflareClient.isEmailRoutingMxHost('route1.mx.cloudflare.net.');

    expect(matches).toBe(true);

    expect(CloudflareClient.isEmailRoutingMxHost('mx.example.com')).toBe(false);

    return;
  });

  return;
});

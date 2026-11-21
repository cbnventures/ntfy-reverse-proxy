import {
  afterEach, describe, expect, it, vi,
} from 'vitest';

import { Runner as PublicDnsAdapter } from '../../lib/public-dns.js';

import type {
  Tests_Lib_PublicDns_Adapter_AsksTheResolverForJson_FetchSpy,
  Tests_Lib_PublicDns_Adapter_AsksTheResolverForJson_Url,
  Tests_Lib_PublicDns_Adapter_ReportsRecordsStillMissingAfterTheLastAttempt_FetchSpy,
  Tests_Lib_PublicDns_Adapter_ReportsRecordsStillMissingAfterTheLastAttempt_Pending,
  Tests_Lib_PublicDns_Adapter_TreatsAMissingNameOrAFailedLookupAsNoRecords_Values,
  Tests_Lib_PublicDns_Adapter_WaitsUntilEveryRecordResolves_Answers,
  Tests_Lib_PublicDns_Adapter_WaitsUntilEveryRecordResolves_Pending,
  Tests_Lib_PublicDns_Adapter_WaitsUntilEveryRecordResolves_Round,
  Tests_Lib_PublicDns_Adapter_WaitsUntilEveryRecordResolves_Url,
  Tests_Lib_PublicDns_DnsResponse_Answers,
  Tests_Lib_PublicDns_DnsResponse_Returns,
  Tests_Lib_PublicDns_DnsResponse_Status,
} from '../../types/tests/lib/public-dns.test.d.ts';

afterEach(() => {
  vi.restoreAllMocks();

  return;
});

/**
 * Tests - Lib - Public DNS - DNS Response.
 *
 * Builds a DNS over HTTPS JSON answer, so each test only lists the records the
 * resolver returns.
 *
 * @param {Tests_Lib_PublicDns_DnsResponse_Answers} answers  - Answers.
 * @param {Tests_Lib_PublicDns_DnsResponse_Status}  [status] - Status.
 *
 * @returns {Tests_Lib_PublicDns_DnsResponse_Returns}
 *
 * @since 2.5.0
 */
function dnsResponse(answers: Tests_Lib_PublicDns_DnsResponse_Answers, status: Tests_Lib_PublicDns_DnsResponse_Status = 0): Tests_Lib_PublicDns_DnsResponse_Returns {
  return new Response(JSON.stringify({
    Status: status,
    Answer: answers,
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/dns-json' },
  });
}

/**
 * Tests - Lib - Public DNS - Adapter.
 *
 * @since 2.5.0
 */
describe('adapter', () => {
  it('asks the resolver for json', async () => {
    const fetchSpy: Tests_Lib_PublicDns_Adapter_AsksTheResolverForJson_FetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(async () => dnsResponse([
      {
        type: 5,
        data: 'other.example.com.',
      },
      {
        type: 16,
        data: '"v=spf1 include:_spf.mx.cloudflare.net ~all"',
      },
    ]));

    await expect(PublicDnsAdapter.lookup('cf-bounce.example.com', 'TXT')).resolves.toEqual(['"v=spf1 include:_spf.mx.cloudflare.net ~all"']);

    const url: Tests_Lib_PublicDns_Adapter_AsksTheResolverForJson_Url = new URL(String(fetchSpy.mock.calls[0]![0]));

    expect(url['origin']).toBe('https://cloudflare-dns.com');

    expect(url.searchParams.get('name')).toBe('cf-bounce.example.com');

    expect(url.searchParams.get('type')).toBe('TXT');

    expect(new Headers(fetchSpy.mock.calls[0]![1]!['headers']).get('Accept')).toBe('application/dns-json');

    return;
  });

  it('treats a missing name or a failed lookup as no records', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementationOnce(async () => dnsResponse([], 3)).mockRejectedValueOnce(new Error('network down'));

    const values: Tests_Lib_PublicDns_Adapter_TreatsAMissingNameOrAFailedLookupAsNoRecords_Values = await PublicDnsAdapter.lookup('missing.example.com', 'TXT');

    expect(values).toEqual([]);

    await expect(PublicDnsAdapter.lookup('missing.example.com', 'TXT')).resolves.toEqual([]);

    return;
  });

  it('waits until every record resolves', async () => {
    let round: Tests_Lib_PublicDns_Adapter_WaitsUntilEveryRecordResolves_Round = 0;

    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
      const answers: Tests_Lib_PublicDns_Adapter_WaitsUntilEveryRecordResolves_Answers = [];
      const url: Tests_Lib_PublicDns_Adapter_WaitsUntilEveryRecordResolves_Url = new URL(String(input));

      if (url.searchParams.get('type') === 'MX') {
        round += 1;

        if (round > 1) {
          answers.push({
            type: 15,
            data: '13 Route1.MX.Cloudflare.net.',
          });
        }
      }

      if (url.searchParams.get('type') === 'TXT' && url.searchParams.get('name') === 'cf-bounce.example.com') {
        answers.push({
          type: 16,
          data: '"v=spf1 include:_spf.mx" ".cloudflare.net ~all"',
        });
      }

      if (url.searchParams.get('name') === '_dmarc.example.com') {
        answers.push({
          type: 16,
          data: '"v=DMARC1; p=none"',
        });
      }

      return dnsResponse(answers);
    });

    const pending: Tests_Lib_PublicDns_Adapter_WaitsUntilEveryRecordResolves_Pending = await PublicDnsAdapter.findPendingRecords([
      {
        type: 'MX',
        name: 'cf-bounce.example.com',
        content: 'route1.mx.cloudflare.net',
      },
      {
        type: 'TXT',
        name: 'cf-bounce.example.com',
        content: 'v=spf1 include:_spf.mx.cloudflare.net ~all',
      },
      {
        type: 'TXT',
        name: '_dmarc.example.com',
        content: undefined,
      },
    ], 3, 0);

    expect(pending).toEqual([]);

    expect(round).toBe(2);

    return;
  });

  it('reports records still missing after the last attempt', async () => {
    const fetchSpy: Tests_Lib_PublicDns_Adapter_ReportsRecordsStillMissingAfterTheLastAttempt_FetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(async () => dnsResponse([{
      type: 16,
      data: '"v=spf1 -all"',
    }]));

    const pending: Tests_Lib_PublicDns_Adapter_ReportsRecordsStillMissingAfterTheLastAttempt_Pending = await PublicDnsAdapter.findPendingRecords([{
      type: 'TXT',
      name: 'cf-bounce.example.com',
      content: 'v=spf1 include:_spf.mx.cloudflare.net ~all',
    }], 2, 0);

    expect(pending).toEqual(['TXT cf-bounce.example.com']);

    expect(fetchSpy).toHaveBeenCalledTimes(2);

    return;
  });

  return;
});

import { Runner as PublicDnsUnreachableError } from './public-dns-unreachable-error.js';
import { dnsOverHttpsAnswerSchema } from './schema.js';

import type {
  Lib_PublicDns_RecordTypeCodes,
  Lib_PublicDns_Runner_FindPendingRecords_Attempt,
  Lib_PublicDns_Runner_FindPendingRecords_Attempts,
  Lib_PublicDns_Runner_FindPendingRecords_IntervalMilliseconds,
  Lib_PublicDns_Runner_FindPendingRecords_Pending,
  Lib_PublicDns_Runner_FindPendingRecords_Records,
  Lib_PublicDns_Runner_FindPendingRecords_Resolved,
  Lib_PublicDns_Runner_FindPendingRecords_Returns,
  Lib_PublicDns_Runner_Lookup_Answer,
  Lib_PublicDns_Runner_Lookup_Name,
  Lib_PublicDns_Runner_Lookup_Response,
  Lib_PublicDns_Runner_Lookup_ResponseData,
  Lib_PublicDns_Runner_Lookup_Returns,
  Lib_PublicDns_Runner_Lookup_Type,
  Lib_PublicDns_Runner_Lookup_TypeCode,
  Lib_PublicDns_Runner_Lookup_Url,
  Lib_PublicDns_Runner_Normalize_Data,
  Lib_PublicDns_Runner_Normalize_Returns,
  Lib_PublicDns_Runner_Normalize_Type,
  Lib_PublicDns_Runner_Normalize_Value,
  Lib_PublicDns_Runner_Resolves_Expected,
  Lib_PublicDns_Runner_Resolves_Record,
  Lib_PublicDns_Runner_Resolves_Returns,
  Lib_PublicDns_Runner_Resolves_Values,
  Lib_PublicDns_Runner_Wait_Milliseconds,
  Lib_PublicDns_Runner_Wait_Returns,
} from '../types/lib/public-dns.d.ts';

/**
 * Lib - Public DNS - DNS Over HTTPS Host.
 *
 * The resolver's host name from the URL below, which the unreachable error names
 * so a warning says which host deploy tried to reach.
 *
 * @since 2.6.2
 */
const DNS_OVER_HTTPS_HOST = 'cloudflare-dns.com';

/**
 * Lib - Public DNS - DNS Over HTTPS URL.
 *
 * Cloudflare's public resolver (1.1.1.1) in its JSON form, which answers the way
 * the rest of the internet sees a record, not the way the zone stores it.
 *
 * @since 2.5.0
 */
const DNS_OVER_HTTPS_URL = 'https://cloudflare-dns.com/dns-query';

/**
 * Lib - Public DNS - DNS Over HTTPS Timeout Milliseconds.
 *
 * How long one lookup waits for the resolver before giving up, so a network that
 * drops the request doesn't leave deploy waiting with no end.
 *
 * @since 2.6.2
 */
const DNS_OVER_HTTPS_TIMEOUT_MILLISECONDS = 5000;

/**
 * Lib - Public DNS - Record Type Codes.
 *
 * The numeric record types a JSON answer uses, so a CNAME on the way to the record
 * isn't mistaken for the record itself.
 *
 * @since 2.5.0
 */
const recordTypeCodes: Lib_PublicDns_RecordTypeCodes = {
  A: 1,
  AAAA: 28,
  CNAME: 5,
  MX: 15,
  TXT: 16,
};

/**
 * Lib - Public DNS.
 *
 * Adapter for public DNS over HTTPS lookups. The resolver URL, request headers,
 * and answer shape stay here, and deploy only sees project-owned records.
 *
 * @since 2.5.0
 */
export class Runner {
  /**
   * Lib - Public DNS - Find Pending Records.
   *
   * Looks each record up until all of them resolve publicly or the attempts run out,
   * and returns the ones that still don't, as "TYPE name". An unreachable resolver
   * throws on the first round instead of being retried.
   *
   * @param {Lib_PublicDns_Runner_FindPendingRecords_Records}              records                - Records.
   * @param {Lib_PublicDns_Runner_FindPendingRecords_Attempts}             [attempts]             - Attempts.
   * @param {Lib_PublicDns_Runner_FindPendingRecords_IntervalMilliseconds} [intervalMilliseconds] - Interval milliseconds.
   *
   * @returns {Lib_PublicDns_Runner_FindPendingRecords_Returns}
   *
   * @since 2.5.0
   */
  public static async findPendingRecords(records: Lib_PublicDns_Runner_FindPendingRecords_Records, attempts: Lib_PublicDns_Runner_FindPendingRecords_Attempts = 12, intervalMilliseconds: Lib_PublicDns_Runner_FindPendingRecords_IntervalMilliseconds = 5000): Lib_PublicDns_Runner_FindPendingRecords_Returns {
    let pending: Lib_PublicDns_Runner_FindPendingRecords_Pending = records;
    let attempt: Lib_PublicDns_Runner_FindPendingRecords_Attempt = 0;

    // Polling: each round waits for the one before it, and only rounds after the first pause.
    do {
      if (attempt > 0) {
        await Runner.wait(intervalMilliseconds);
      }

      const resolved: Lib_PublicDns_Runner_FindPendingRecords_Resolved = await Promise.all(pending.map((pendingRecord) => Runner.resolves(pendingRecord)));

      pending = pending.filter((_pendingRecord, pendingIndex) => resolved[pendingIndex] !== true);
      attempt += 1;
    } while (pending.length > 0 && attempt < attempts);

    return pending.map((pendingRecord) => `${pendingRecord['type']} ${pendingRecord['name']}`);
  }

  /**
   * Lib - Public DNS - Lookup.
   *
   * Asks the public resolver for one name and type, and returns each answer's data.
   * A missing name, an error answer, or a bad response gives an empty list, and a
   * request that fails or times out throws a public DNS unreachable error.
   *
   * @param {Lib_PublicDns_Runner_Lookup_Name} name - Name.
   * @param {Lib_PublicDns_Runner_Lookup_Type} type - Type.
   *
   * @returns {Lib_PublicDns_Runner_Lookup_Returns}
   *
   * @since 2.5.0
   */
  public static async lookup(name: Lib_PublicDns_Runner_Lookup_Name, type: Lib_PublicDns_Runner_Lookup_Type): Lib_PublicDns_Runner_Lookup_Returns {
    const url: Lib_PublicDns_Runner_Lookup_Url = `${DNS_OVER_HTTPS_URL}?name=${encodeURIComponent(name)}&type=${encodeURIComponent(type)}`;
    const typeCode: Lib_PublicDns_Runner_Lookup_TypeCode = recordTypeCodes[type.toUpperCase()];
    let response: Lib_PublicDns_Runner_Lookup_Response = undefined;

    try {
      response = await fetch(url, {
        headers: { Accept: 'application/dns-json' },
        signal: AbortSignal.timeout(DNS_OVER_HTTPS_TIMEOUT_MILLISECONDS),
      });
    } catch {
      throw new PublicDnsUnreachableError(DNS_OVER_HTTPS_HOST);
    }

    try {
      const responseData: Lib_PublicDns_Runner_Lookup_ResponseData = await response.json();
      const answer: Lib_PublicDns_Runner_Lookup_Answer = dnsOverHttpsAnswerSchema.safeParse(responseData);

      if (
        response['ok'] === false
        || answer['success'] === false
        || answer['data']['Status'] !== 0
      ) {
        return [];
      }

      return (answer['data']['Answer'] ?? []).filter((answerRecord) => typeCode === undefined || answerRecord['type'] === typeCode).map((answerRecord) => answerRecord['data']);
    } catch (error) {
      // The timeout also covers reading the body, so a resolver that stalls mid-answer is unreachable too.
      if (
        error instanceof Error
        && error['name'] === 'TimeoutError'
      ) {
        throw new PublicDnsUnreachableError(DNS_OVER_HTTPS_HOST);
      }

      return [];
    }
  }

  /**
   * Lib - Public DNS - Resolves.
   *
   * Reports whether a record resolves publicly with the expected value, or with any
   * value when none is expected.
   *
   * @param {Lib_PublicDns_Runner_Resolves_Record} record - Record.
   *
   * @private
   *
   * @returns {Lib_PublicDns_Runner_Resolves_Returns}
   *
   * @since 2.5.0
   */
  private static async resolves(record: Lib_PublicDns_Runner_Resolves_Record): Lib_PublicDns_Runner_Resolves_Returns {
    const values: Lib_PublicDns_Runner_Resolves_Values = await Runner.lookup(record['name'], record['type']);

    if (record['content'] === undefined) {
      return values.length > 0;
    }

    const expected: Lib_PublicDns_Runner_Resolves_Expected = Runner.normalize('', record['content']);

    return values.some((value) => Runner.normalize(record['type'], value) === expected);
  }

  /**
   * Lib - Public DNS - Normalize.
   *
   * Joins a TXT value split into quoted strings, drops quotes, a trailing dot, and an
   * MX answer's priority, and lowercases the rest so values compare as equal.
   *
   * @param {Lib_PublicDns_Runner_Normalize_Type} type - Type.
   * @param {Lib_PublicDns_Runner_Normalize_Data} data - Data.
   *
   * @private
   *
   * @returns {Lib_PublicDns_Runner_Normalize_Returns}
   *
   * @since 2.5.0
   */
  private static normalize(type: Lib_PublicDns_Runner_Normalize_Type, data: Lib_PublicDns_Runner_Normalize_Data): Lib_PublicDns_Runner_Normalize_Returns {
    let value: Lib_PublicDns_Runner_Normalize_Value = data.replaceAll('" "', '').replaceAll('"', '').trim().toLowerCase();

    if (type.toUpperCase() === 'MX') {
      value = value.split(' ').at(-1) ?? '';
    }

    return (value.endsWith('.') === true) ? value.slice(0, -1) : value;
  }

  /**
   * Lib - Public DNS - Wait.
   *
   * Pauses between lookup rounds so a record Cloudflare just added has time to
   * reach the public resolver.
   *
   * @param {Lib_PublicDns_Runner_Wait_Milliseconds} milliseconds - Milliseconds.
   *
   * @private
   *
   * @returns {Lib_PublicDns_Runner_Wait_Returns}
   *
   * @since 2.5.0
   */
  private static async wait(milliseconds: Lib_PublicDns_Runner_Wait_Milliseconds): Lib_PublicDns_Runner_Wait_Returns {
    await new Promise((resolve) => {
      setTimeout(resolve, milliseconds);

      return;
    });

    return;
  }
}

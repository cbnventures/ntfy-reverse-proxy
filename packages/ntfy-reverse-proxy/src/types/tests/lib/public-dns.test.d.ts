import type { MockInstance } from 'vitest';

/**
 * Tests - Lib - Public DNS - Adapter - Asks The Resolver For Json.
 *
 * @since 2.5.0
 */
export type Tests_Lib_PublicDns_Adapter_AsksTheResolverForJson_FetchSpy = MockInstance<typeof fetch>;

export type Tests_Lib_PublicDns_Adapter_AsksTheResolverForJson_Url = URL;

/**
 * Tests - Lib - Public DNS - Adapter - Reports Records Still Missing After The Last Attempt.
 *
 * @since 2.5.0
 */
export type Tests_Lib_PublicDns_Adapter_ReportsRecordsStillMissingAfterTheLastAttempt_FetchSpy = MockInstance<typeof fetch>;

export type Tests_Lib_PublicDns_Adapter_ReportsRecordsStillMissingAfterTheLastAttempt_Pending = string[];

/**
 * Tests - Lib - Public DNS - Adapter - Treats A Missing Name Or A Failed Lookup As No Records.
 *
 * @since 2.5.0
 */
export type Tests_Lib_PublicDns_Adapter_TreatsAMissingNameOrAFailedLookupAsNoRecords_Values = string[];

/**
 * Tests - Lib - Public DNS - Adapter - Waits Until Every Record Resolves.
 *
 * @since 2.5.0
 */
export type Tests_Lib_PublicDns_Adapter_WaitsUntilEveryRecordResolves_Round = number;

export type Tests_Lib_PublicDns_Adapter_WaitsUntilEveryRecordResolves_AnswerType = number;

export type Tests_Lib_PublicDns_Adapter_WaitsUntilEveryRecordResolves_AnswerData = string;

export type Tests_Lib_PublicDns_Adapter_WaitsUntilEveryRecordResolves_Answer = {
  type: Tests_Lib_PublicDns_Adapter_WaitsUntilEveryRecordResolves_AnswerType;
  data: Tests_Lib_PublicDns_Adapter_WaitsUntilEveryRecordResolves_AnswerData;
};

export type Tests_Lib_PublicDns_Adapter_WaitsUntilEveryRecordResolves_Answers = Tests_Lib_PublicDns_Adapter_WaitsUntilEveryRecordResolves_Answer[];

export type Tests_Lib_PublicDns_Adapter_WaitsUntilEveryRecordResolves_Url = URL;

export type Tests_Lib_PublicDns_Adapter_WaitsUntilEveryRecordResolves_Pending = string[];

/**
 * Tests - Lib - Public DNS - DNS Response.
 *
 * @since 2.5.0
 */
export type Tests_Lib_PublicDns_DnsResponse_AnswerType = number;

export type Tests_Lib_PublicDns_DnsResponse_AnswerData = string;

export type Tests_Lib_PublicDns_DnsResponse_Answer = {
  type: Tests_Lib_PublicDns_DnsResponse_AnswerType;
  data: Tests_Lib_PublicDns_DnsResponse_AnswerData;
};

export type Tests_Lib_PublicDns_DnsResponse_Answers = Tests_Lib_PublicDns_DnsResponse_Answer[];

export type Tests_Lib_PublicDns_DnsResponse_Status = number;

export type Tests_Lib_PublicDns_DnsResponse_Returns = Response;

import type { z } from 'zod';

import type { Shared_PublicDnsRecord } from '../shared.d.ts';
import type { Lib_Schema_DnsOverHttpsAnswer } from './schema.d.ts';

/**
 * Lib - Public DNS - Record Type Codes.
 *
 * @since 2.5.0
 */
export type Lib_PublicDns_RecordTypeCodes = Record<string, number>;

/**
 * Lib - Public DNS - Runner - Find Pending Records.
 *
 * @since 2.5.0
 */
export type Lib_PublicDns_Runner_FindPendingRecords_Records = Shared_PublicDnsRecord[];

export type Lib_PublicDns_Runner_FindPendingRecords_Attempts = number;

export type Lib_PublicDns_Runner_FindPendingRecords_IntervalMilliseconds = number;

export type Lib_PublicDns_Runner_FindPendingRecords_Returns = Promise<Lib_PublicDns_Runner_FindPendingRecords_PendingNames>;

export type Lib_PublicDns_Runner_FindPendingRecords_PendingName = string;

export type Lib_PublicDns_Runner_FindPendingRecords_PendingNames = Lib_PublicDns_Runner_FindPendingRecords_PendingName[];

export type Lib_PublicDns_Runner_FindPendingRecords_Pending = Shared_PublicDnsRecord[];

export type Lib_PublicDns_Runner_FindPendingRecords_Attempt = number;

export type Lib_PublicDns_Runner_FindPendingRecords_Resolved = boolean[];

/**
 * Lib - Public DNS - Runner - Lookup.
 *
 * @since 2.5.0
 */
export type Lib_PublicDns_Runner_Lookup_Name = string;

export type Lib_PublicDns_Runner_Lookup_Type = string;

export type Lib_PublicDns_Runner_Lookup_Returns = Promise<Lib_PublicDns_Runner_Lookup_Values>;

export type Lib_PublicDns_Runner_Lookup_Value = string;

export type Lib_PublicDns_Runner_Lookup_Values = Lib_PublicDns_Runner_Lookup_Value[];

export type Lib_PublicDns_Runner_Lookup_Url = string;

export type Lib_PublicDns_Runner_Lookup_TypeCode = number | undefined;

export type Lib_PublicDns_Runner_Lookup_Response = Response;

export type Lib_PublicDns_Runner_Lookup_ResponseData = unknown;

export type Lib_PublicDns_Runner_Lookup_Answer = z.ZodSafeParseResult<Lib_Schema_DnsOverHttpsAnswer>;

/**
 * Lib - Public DNS - Runner - Normalize.
 *
 * @since 2.5.0
 */
export type Lib_PublicDns_Runner_Normalize_Type = string;

export type Lib_PublicDns_Runner_Normalize_Data = string;

export type Lib_PublicDns_Runner_Normalize_Returns = string;

export type Lib_PublicDns_Runner_Normalize_Value = string;

/**
 * Lib - Public DNS - Runner - Resolves.
 *
 * @since 2.5.0
 */
export type Lib_PublicDns_Runner_Resolves_Record = Shared_PublicDnsRecord;

export type Lib_PublicDns_Runner_Resolves_Returns = Promise<boolean>;

export type Lib_PublicDns_Runner_Resolves_Value = string;

export type Lib_PublicDns_Runner_Resolves_Values = Lib_PublicDns_Runner_Resolves_Value[];

export type Lib_PublicDns_Runner_Resolves_Expected = string;

/**
 * Lib - Public DNS - Runner - Wait.
 *
 * @since 2.5.0
 */
export type Lib_PublicDns_Runner_Wait_Milliseconds = number;

export type Lib_PublicDns_Runner_Wait_Returns = Promise<void>;

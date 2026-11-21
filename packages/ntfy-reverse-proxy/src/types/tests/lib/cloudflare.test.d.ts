import type { MockInstance } from 'vitest';

import type {
  Shared_CloudflareEmailRoutingRule,
  Shared_CloudflareKvNamespace,
  Shared_CloudflareZone,
} from '../../shared.d.ts';

/**
 * Tests - Lib - Cloudflare - Client - Creates And Deletes Email Routing Rules.
 *
 * @since 2.5.0
 */
export type Tests_Lib_Cloudflare_Client_CreatesAndDeletesEmailRoutingRules_FetchSpy = MockInstance<typeof fetch>;

/**
 * Tests - Lib - Cloudflare - Client - Finds The Zone With A Bearer Token.
 *
 * @since 2.5.0
 */
export type Tests_Lib_Cloudflare_Client_FindsTheZoneWithABearerToken_FetchSpy = MockInstance<typeof fetch>;

export type Tests_Lib_Cloudflare_Client_FindsTheZoneWithABearerToken_Zone = Shared_CloudflareZone | undefined;

/**
 * Tests - Lib - Cloudflare - Client - Lists Every Kv Namespace And Creates One.
 *
 * @since 2.5.0
 */
export type Tests_Lib_Cloudflare_Client_ListsEveryKvNamespaceAndCreatesOne_FetchSpy = MockInstance<typeof fetch>;

export type Tests_Lib_Cloudflare_Client_ListsEveryKvNamespaceAndCreatesOne_Namespaces = Shared_CloudflareKvNamespace[];

/**
 * Tests - Lib - Cloudflare - Client - Names Each Missing Permission.
 *
 * @since 2.5.0
 */
export type Tests_Lib_Cloudflare_Client_NamesEachMissingPermission_Missing = string[];

/**
 * Tests - Lib - Cloudflare - Client - Reads Email Routing Rules As Addresses And Workers.
 *
 * @since 2.5.0
 */
export type Tests_Lib_Cloudflare_Client_ReadsEmailRoutingRulesAsAddressesAndWorkers_Rules = Shared_CloudflareEmailRoutingRule[];

/**
 * Tests - Lib - Cloudflare - Client - Recognises Email Routing Mx Hosts.
 *
 * @since 2.5.0
 */
export type Tests_Lib_Cloudflare_Client_RecognisesEmailRoutingMxHosts_Matches = boolean;

/**
 * Tests - Lib - Cloudflare - Cloudflare Response.
 *
 * @since 2.5.0
 */
export type Tests_Lib_Cloudflare_CloudflareResponse_Result = unknown;

export type Tests_Lib_Cloudflare_CloudflareResponse_Success = boolean;

export type Tests_Lib_Cloudflare_CloudflareResponse_Returns = Response;

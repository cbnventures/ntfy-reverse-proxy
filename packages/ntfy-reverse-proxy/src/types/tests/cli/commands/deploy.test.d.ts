import type { Logger } from '@cbnventures/nova/toolkit';
import type { MockInstance } from 'vitest';

import type { Runner as PublicDnsAdapter } from '../../../../lib/public-dns.js';
import type { Lib_Schema_ContextConfig, Lib_Schema_SettingsConfig } from '../../../lib/schema.d.ts';
import type { Shared_CloudflareZone } from '../../../shared.d.ts';

/**
 * Tests - CLI - Commands - Deploy.
 *
 * @since 2.5.0
 */
export type Tests_Cli_Commands_Deploy_ZoneInfo = Shared_CloudflareZone & {};

export type Tests_Cli_Commands_Deploy_Settings = Lib_Schema_SettingsConfig & {};

export type Tests_Cli_Commands_Deploy_Contexts = Array<Lib_Schema_ContextConfig & {}>;

/**
 * Tests - CLI - Commands - Deploy - Check Readiness - Confirms Custom Domains And Email Routing.
 *
 * @since 2.5.0
 */
export type Tests_Cli_Commands_Deploy_CheckReadiness_ConfirmsCustomDomainsAndEmailRouting_PendingSpy = MockInstance<typeof PublicDnsAdapter['findPendingRecords']>;

export type Tests_Cli_Commands_Deploy_CheckReadiness_ConfirmsCustomDomainsAndEmailRouting_InfoSpy = MockInstance<typeof Logger['info']>;

/**
 * Tests - CLI - Commands - Deploy - Check Readiness - Skips The Dns Checks When Public Dns Cannot Be Reached.
 *
 * @since 2.6.2
 */
export type Tests_Cli_Commands_Deploy_CheckReadiness_SkipsTheDnsChecksWhenPublicDnsCannotBeReached_WarnSpy = MockInstance<typeof Logger['warn']>;

/**
 * Tests - CLI - Commands - Deploy - Check Readiness - Warns About Pending Domains And Missing Email Routing.
 *
 * @since 2.5.0
 */
export type Tests_Cli_Commands_Deploy_CheckReadiness_WarnsAboutPendingDomainsAndMissingEmailRouting_WarnSpy = MockInstance<typeof Logger['warn']>;

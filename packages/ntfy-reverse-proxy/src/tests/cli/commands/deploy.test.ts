import { Logger } from '@cbnventures/nova/toolkit';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';

import { checkReadiness } from '../../../cli/commands/deploy.js';
import { Runner as PublicDnsAdapter } from '../../../lib/public-dns.js';

import type {
  Tests_Cli_Commands_Deploy_CheckReadiness_ConfirmsCustomDomainsAndEmailRouting_InfoSpy,
  Tests_Cli_Commands_Deploy_CheckReadiness_ConfirmsCustomDomainsAndEmailRouting_PendingSpy,
  Tests_Cli_Commands_Deploy_CheckReadiness_WarnsAboutPendingDomainsAndMissingEmailRouting_WarnSpy,
  Tests_Cli_Commands_Deploy_Contexts,
  Tests_Cli_Commands_Deploy_Settings,
  Tests_Cli_Commands_Deploy_ZoneInfo,
} from '../../../types/tests/cli/commands/deploy.test.d.ts';

/**
 * Tests - CLI - Commands - Deploy - Zone Info.
 *
 * @since 2.5.0
 */
const zoneInfo: Tests_Cli_Commands_Deploy_ZoneInfo = {
  zoneId: 'zone-id',
  accountId: 'account-id',
  zoneName: 'example.com',
};

/**
 * Tests - CLI - Commands - Deploy - Settings.
 *
 * @since 2.5.0
 */
const settings: Tests_Cli_Commands_Deploy_Settings = {
  worker_name: 'ntfy',
  base_domain: 'example.com',
  show_response_output: false,
};

/**
 * Tests - CLI - Commands - Deploy - Contexts.
 *
 * @since 2.5.0
 */
const contexts: Tests_Cli_Commands_Deploy_Contexts = [
  {
    type: 'http',
    name: 'Alerts',
    id: 'alerts',
    interpreter: 'plain-text',
    topic: 'alerts',
    mode: 'send-once',
    show_visitor_info: false,
    primary_server: 'alpha',
    servers: ['alpha'],
  },
  {
    type: 'email',
    name: 'Mail',
    id: 'mail',
    interpreter: 'plain-text',
    topic: 'mail',
    mode: 'send-once',
    show_visitor_info: false,
    primary_server: 'alpha',
    servers: ['alpha'],
  },
];

afterEach(() => {
  vi.restoreAllMocks();

  return;
});

/**
 * Tests - CLI - Commands - Deploy - Check Readiness.
 *
 * @since 2.5.0
 */
describe('checkReadiness', () => {
  it('confirms custom domains and email routing', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({
      success: true,
      errors: [],
      result: [{
        hostname: 'alerts.example.com',
        service: 'ntfy',
      }],
    })));

    vi.spyOn(PublicDnsAdapter, 'lookup').mockResolvedValue(['13 route1.mx.cloudflare.net.']);

    const pendingSpy: Tests_Cli_Commands_Deploy_CheckReadiness_ConfirmsCustomDomainsAndEmailRouting_PendingSpy = vi.spyOn(PublicDnsAdapter, 'findPendingRecords').mockResolvedValue([]);
    const infoSpy: Tests_Cli_Commands_Deploy_CheckReadiness_ConfirmsCustomDomainsAndEmailRouting_InfoSpy = vi.spyOn(Logger, 'info').mockImplementation(() => undefined);

    await checkReadiness('token', zoneInfo, settings, contexts);

    expect(pendingSpy).toHaveBeenCalledWith([{
      type: 'A',
      name: 'alerts.example.com',
      content: undefined,
    }]);

    expect(infoSpy).toHaveBeenCalledWith('Custom domains are attached to the Worker and resolve publicly.');

    expect(infoSpy).toHaveBeenCalledWith('"example.com" receives mail through Cloudflare Email Routing.');

    return;
  });

  it('warns about pending domains and missing email routing', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({
      success: true,
      errors: [],
      result: [],
    })));

    vi.spyOn(PublicDnsAdapter, 'lookup').mockResolvedValue(['10 mx.example.net.']);

    vi.spyOn(PublicDnsAdapter, 'findPendingRecords').mockResolvedValue([]);

    vi.spyOn(Logger, 'info').mockImplementation(() => undefined);

    const warnSpy: Tests_Cli_Commands_Deploy_CheckReadiness_WarnsAboutPendingDomainsAndMissingEmailRouting_WarnSpy = vi.spyOn(Logger, 'warn').mockImplementation(() => undefined);

    await checkReadiness('token', zoneInfo, settings, contexts);

    expect(warnSpy).toHaveBeenCalledWith('"alerts.example.com" is not attached to the "ntfy" Worker. Check Workers & Pages > ntfy > Settings > Domains & Routes in the Cloudflare dashboard.');

    expect(warnSpy).toHaveBeenCalledWith('"example.com" has no MX records pointing at Cloudflare Email Routing on public DNS, so email contexts won\'t receive mail. Turn on Email Routing for it in the Cloudflare dashboard.');

    return;
  });

  return;
});

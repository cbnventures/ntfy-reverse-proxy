import { describe, expect, it } from 'vitest';

import { transmissionVpnInterpreter } from '../../../worker/interpreters/transmission-vpn.js';

import type { Tests_Worker_Interpreters_TransmissionVpn_TransmissionVpnInterpreter_ReadsAFinishedTorrentsAlert_Result } from '../../../types/tests/worker/interpreters/transmission-vpn.test.d.ts';

/**
 * Tests - Worker - Interpreters - Transmission Vpn - Transmission Vpn Interpreter.
 *
 * @since 2.3.0
 */
describe('transmissionVpnInterpreter', () => {
  it('reads a finished torrents alert', () => {
    const result: Tests_Worker_Interpreters_TransmissionVpn_TransmissionVpnInterpreter_ReadsAFinishedTorrentsAlert_Result = transmissionVpnInterpreter({
      version: 1,
      app: 'transmission-vpn',
      event: 'torrent-finished',
      title: 'Torrent finished',
      message: '3 torrents finished downloading: Ubuntu 24.04, Debian 13, Fedora 42.',
      priority: 3,
      tags: ['white_check_mark'],
      occurredAt: '2026-10-26T12:00:00.000Z',
      details: { torrents: [] },
    });

    expect(result['notification']).toStrictEqual({
      title: '[Transmission VPN] Torrent finished',
      body: '3 torrents finished downloading: Ubuntu 24.04, Debian 13, Fedora 42.',
      priority: 3,
      tags: [
        'transmission-vpn',
        'white_check_mark',
      ],
    });

    return;
  });

  return;
});

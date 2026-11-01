import { interpretAppPayload } from './app-payload.js';

import type {
  Worker_Interpreters_TransmissionVpn_Input,
  Worker_Interpreters_TransmissionVpn_Returns,
  Worker_Interpreters_TransmissionVpn_TransmissionVpnInterpreter,
  Worker_Interpreters_TransmissionVpn_TransmissionVpnInterpreter_App,
} from '../../types/worker/interpreters/transmission-vpn.d.ts';

/**
 * Worker - Interpreters - Transmission Vpn - Transmission Vpn Interpreter.
 *
 * Reads the alerts Transmission VPN sends, such as a dropped VPN or a finished torrent.
 * The app name goes before each title, and the alert keeps its priority and tags.
 *
 * @returns {Worker_Interpreters_TransmissionVpn_Returns}
 *
 * @since 2.3.0
 */
const transmissionVpnInterpreter: Worker_Interpreters_TransmissionVpn_TransmissionVpnInterpreter = (input: Worker_Interpreters_TransmissionVpn_Input): Worker_Interpreters_TransmissionVpn_Returns => {
  const app: Worker_Interpreters_TransmissionVpn_TransmissionVpnInterpreter_App = {
    key: 'transmission-vpn',
    name: 'Transmission VPN',
  };

  return interpretAppPayload(app, input);
};

export {
  transmissionVpnInterpreter,
};

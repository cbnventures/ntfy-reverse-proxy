import type {
  Worker_Pipeline_Interpret_Input,
  Worker_Pipeline_Interpret_Result,
} from '../pipeline/interpret.d.ts';

/**
 * Worker - Interpreters - Transmission Vpn.
 *
 * @since 2.3.0
 */
export type Worker_Interpreters_TransmissionVpn_Input = Worker_Pipeline_Interpret_Input;

export type Worker_Interpreters_TransmissionVpn_Returns = Worker_Pipeline_Interpret_Result;

export type Worker_Interpreters_TransmissionVpn_TransmissionVpnInterpreter = (input: Worker_Interpreters_TransmissionVpn_Input) => Worker_Interpreters_TransmissionVpn_Returns;

/**
 * Worker - Interpreters - Transmission Vpn - Transmission Vpn Interpreter.
 *
 * @since 2.3.0
 */
export type Worker_Interpreters_TransmissionVpn_TransmissionVpnInterpreter_AppKey = string;

export type Worker_Interpreters_TransmissionVpn_TransmissionVpnInterpreter_AppName = string;

export type Worker_Interpreters_TransmissionVpn_TransmissionVpnInterpreter_App = {
  key: Worker_Interpreters_TransmissionVpn_TransmissionVpnInterpreter_AppKey;
  name: Worker_Interpreters_TransmissionVpn_TransmissionVpnInterpreter_AppName;
};

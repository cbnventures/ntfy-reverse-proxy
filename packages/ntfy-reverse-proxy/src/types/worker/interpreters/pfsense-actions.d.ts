import type {
  Worker_Pipeline_Interpret_Input,
  Worker_Pipeline_Interpret_Result,
} from '../pipeline/interpret.d.ts';

/**
 * Worker - Interpreters - Pfsense Actions.
 *
 * @since 2.3.0
 */
export type Worker_Interpreters_PfsenseActions_Input = Worker_Pipeline_Interpret_Input;

export type Worker_Interpreters_PfsenseActions_Returns = Worker_Pipeline_Interpret_Result;

export type Worker_Interpreters_PfsenseActions_PfsenseActionsInterpreter = (input: Worker_Interpreters_PfsenseActions_Input) => Worker_Interpreters_PfsenseActions_Returns;

/**
 * Worker - Interpreters - Pfsense Actions - Pfsense Actions Interpreter.
 *
 * @since 2.3.0
 */
export type Worker_Interpreters_PfsenseActions_PfsenseActionsInterpreter_AppKey = string;

export type Worker_Interpreters_PfsenseActions_PfsenseActionsInterpreter_AppName = string;

export type Worker_Interpreters_PfsenseActions_PfsenseActionsInterpreter_App = {
  key: Worker_Interpreters_PfsenseActions_PfsenseActionsInterpreter_AppKey;
  name: Worker_Interpreters_PfsenseActions_PfsenseActionsInterpreter_AppName;
};

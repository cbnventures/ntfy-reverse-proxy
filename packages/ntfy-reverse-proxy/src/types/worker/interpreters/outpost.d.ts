import type {
  Worker_Pipeline_Interpret_Input,
  Worker_Pipeline_Interpret_Result,
} from '../pipeline/interpret.d.ts';

/**
 * Worker - Interpreters - Outpost.
 *
 * @since 2.3.0
 */
export type Worker_Interpreters_Outpost_Input = Worker_Pipeline_Interpret_Input;

export type Worker_Interpreters_Outpost_Returns = Worker_Pipeline_Interpret_Result;

export type Worker_Interpreters_Outpost_OutpostInterpreter = (input: Worker_Interpreters_Outpost_Input) => Worker_Interpreters_Outpost_Returns;

/**
 * Worker - Interpreters - Outpost - Interpreter.
 *
 * @since 2.3.0
 */
export type Worker_Interpreters_Outpost_OutpostInterpreter_AppKey = string;

export type Worker_Interpreters_Outpost_OutpostInterpreter_AppName = string;

export type Worker_Interpreters_Outpost_OutpostInterpreter_App = {
  key: Worker_Interpreters_Outpost_OutpostInterpreter_AppKey;
  name: Worker_Interpreters_Outpost_OutpostInterpreter_AppName;
};

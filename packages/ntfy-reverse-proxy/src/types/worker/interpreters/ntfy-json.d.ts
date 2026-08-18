import type {
  Worker_Pipeline_Interpret_Input,
  Worker_Pipeline_Interpret_Result,
} from '../pipeline/interpret.d.ts';

/**
 * Worker - Interpreters - Ntfy JSON.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_NtfyJson_Input = Worker_Pipeline_Interpret_Input;

export type Worker_Interpreters_NtfyJson_Result = Worker_Pipeline_Interpret_Result | null;

/**
 * Worker - Interpreters - Ntfy JSON - Ntfy JSON Interpreter.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_NtfyJson_NtfyJsonInterpreter = (input: Worker_Interpreters_NtfyJson_Input) => Worker_Interpreters_NtfyJson_Result;

export type Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_Parsed = unknown;

export type Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_Decoder = TextDecoder;

export type Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_DecodedBody = string;

export type Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_Notification = Worker_Pipeline_Interpret_Result['notification'];

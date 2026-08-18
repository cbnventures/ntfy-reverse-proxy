import type {
  Worker_Pipeline_Interpret_Input,
  Worker_Pipeline_Interpret_Result,
} from '../pipeline/interpret.d.ts';

/**
 * Worker - Interpreters - Plain Text.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_PlainText_Input = Worker_Pipeline_Interpret_Input;

export type Worker_Interpreters_PlainText_Result = Worker_Pipeline_Interpret_Result;

export type Worker_Interpreters_PlainText_PlainTextInterpreter = (input: Worker_Interpreters_PlainText_Input) => Worker_Interpreters_PlainText_Result;

/**
 * Worker - Interpreters - Plain Text - Plain Text Interpreter.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_PlainText_PlainTextInterpreter_Body = string | undefined;

export type Worker_Interpreters_PlainText_PlainTextInterpreter_Decoder = TextDecoder;

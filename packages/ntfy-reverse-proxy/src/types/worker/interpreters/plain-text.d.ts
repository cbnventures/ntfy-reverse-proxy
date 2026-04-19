import type {
  WorkerPipelineInterpretInput,
  WorkerPipelineInterpretResult,
} from '../pipeline/interpret.d.ts';

/**
 * Worker - Interpreters - Plain Text.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersPlainTextInput = WorkerPipelineInterpretInput;

export type WorkerInterpretersPlainTextResult = WorkerPipelineInterpretResult;

export type WorkerInterpretersPlainTextInterpreter = (input: WorkerInterpretersPlainTextInput) => WorkerInterpretersPlainTextResult;

/**
 * Worker - Interpreters - Plain Text - Plain Text Interpreter.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersPlainTextPlainTextInterpreterBody = string | undefined;

export type WorkerInterpretersPlainTextPlainTextInterpreterDecoder = TextDecoder;

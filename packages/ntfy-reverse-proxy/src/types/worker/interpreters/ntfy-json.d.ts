import type {
  WorkerPipelineInterpretInput,
  WorkerPipelineInterpretResult,
} from '../pipeline/interpret.d.ts';

/**
 * Worker - Interpreters - Ntfy JSON.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersNtfyJsonInput = WorkerPipelineInterpretInput;

export type WorkerInterpretersNtfyJsonResult = WorkerPipelineInterpretResult | null;

export type WorkerInterpretersNtfyJsonInterpreter = (input: WorkerInterpretersNtfyJsonInput) => WorkerInterpretersNtfyJsonResult;

/**
 * Worker - Interpreters - Ntfy JSON - Ntfy JSON Interpreter.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersNtfyJsonNtfyJsonInterpreterParsed = unknown;

export type WorkerInterpretersNtfyJsonNtfyJsonInterpreterDecoder = TextDecoder;

export type WorkerInterpretersNtfyJsonNtfyJsonInterpreterDecodedBody = string;

export type WorkerInterpretersNtfyJsonNtfyJsonInterpreterNotification = WorkerPipelineInterpretResult['notification'];

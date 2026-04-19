import type {
  WorkerPipelineInterpretInput,
  WorkerPipelineInterpretNotificationObjectPriority,
  WorkerPipelineInterpretResult,
} from '../pipeline/interpret.d.ts';

/**
 * Worker - Interpreters - Synology.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersSynologyInput = WorkerPipelineInterpretInput;

export type WorkerInterpretersSynologyResult = WorkerPipelineInterpretResult;

export type WorkerInterpretersSynologyInterpreter = (input: WorkerInterpretersSynologyInput) => WorkerInterpretersSynologyResult;

/**
 * Worker - Interpreters - Synology - Interpreter.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersSynologyInterpreterBody = string | undefined;

export type WorkerInterpretersSynologyInterpreterDecoder = TextDecoder;

export type WorkerInterpretersSynologyInterpreterData = Record<string, unknown>;

export type WorkerInterpretersSynologyInterpreterRawMessage = unknown;

export type WorkerInterpretersSynologyInterpreterMessage = string;

export type WorkerInterpretersSynologyInterpreterRawPrefix = unknown;

export type WorkerInterpretersSynologyInterpreterHostname = string | undefined;

export type WorkerInterpretersSynologyInterpreterTimestamp = string | undefined;

export type WorkerInterpretersSynologyInterpreterPrefixParts = string[];

export type WorkerInterpretersSynologyInterpreterRawHostname = unknown;

export type WorkerInterpretersSynologyInterpreterRawDate = unknown;

export type WorkerInterpretersSynologyInterpreterRawTime = unknown;

export type WorkerInterpretersSynologyInterpreterDate = string | undefined;

export type WorkerInterpretersSynologyInterpreterTime = string | undefined;

export type WorkerInterpretersSynologyInterpreterParts = string;

export type WorkerInterpretersSynologyInterpreterRawSeverity = unknown;

export type WorkerInterpretersSynologyInterpreterSeverity = string;

export type WorkerInterpretersSynologyInterpreterRawEvent = unknown;

export type WorkerInterpretersSynologyInterpreterEvent = string | undefined;

export type WorkerInterpretersSynologyInterpreterTitle = string;

export type WorkerInterpretersSynologyInterpreterPriority = WorkerPipelineInterpretNotificationObjectPriority;

export type WorkerInterpretersSynologyInterpreterLowerMessage = string;

export type WorkerInterpretersSynologyInterpreterTags = string[];

export type WorkerInterpretersSynologyInterpreterSanitizedEvent = string;

export type WorkerInterpretersSynologyInterpreterBodyLines = string[];

export type WorkerInterpretersSynologyInterpreterRawProxyConfigDefault = Record<string, unknown>;

export type WorkerInterpretersSynologyInterpreterProxyConfig = Record<string, unknown>;

export type WorkerInterpretersSynologyInterpreterRawUrl = unknown;

export type WorkerInterpretersSynologyInterpreterDsmUrl = string | undefined;

/**
 * Worker - Interpreters - Synology - Map Severity To Priority.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersSynologyMapSeverityToPrioritySeverity = string;

export type WorkerInterpretersSynologyMapSeverityToPriorityReturns = WorkerPipelineInterpretNotificationObjectPriority;

/**
 * Worker - Interpreters - Synology - Validate URL.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersSynologyValidateUrlRawUrl = string;

export type WorkerInterpretersSynologyValidateUrlReturns = string | undefined;

export type WorkerInterpretersSynologyValidateUrlUrl = URL;

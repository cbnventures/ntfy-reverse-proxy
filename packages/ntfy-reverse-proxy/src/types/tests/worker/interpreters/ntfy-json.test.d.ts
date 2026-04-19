import type {
  WorkerPipelineInterpretNotificationObject,
  WorkerPipelineInterpretResult,
} from '../../../worker/pipeline/interpret.d.ts';

/**
 * Tests - Worker - Interpreters - Ntfy JSON.
 *
 * @since 2.0.0
 */
export type TestsWorkerInterpretersNtfyJsonResult = WorkerPipelineInterpretResult | null;

export type TestsWorkerInterpretersNtfyJsonInput = Record<string, unknown>;

export type TestsWorkerInterpretersNtfyJsonNotification = WorkerPipelineInterpretNotificationObject;

export type TestsWorkerInterpretersNtfyJsonUnknownField = unknown;

export type TestsWorkerInterpretersNtfyJsonRecordCast = Record<string, unknown>;

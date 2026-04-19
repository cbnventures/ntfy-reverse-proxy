import type {
  WorkerPipelineInterpretNotificationObject,
  WorkerPipelineInterpretResult,
} from '../../../worker/pipeline/interpret.d.ts';

/**
 * Tests - Worker - Interpreters - Statuspage.
 *
 * @since 2.0.0
 */
export type TestsWorkerInterpretersStatuspageKvInitial = Record<string, string>;

export type TestsWorkerInterpretersStatuspageKvMock = {
  get: TestsWorkerInterpretersStatuspageKvMockFn;
  put: TestsWorkerInterpretersStatuspageKvMockFn;
  delete: TestsWorkerInterpretersStatuspageKvMockFn;
  store: TestsWorkerInterpretersStatuspageKvStore;
};

export type TestsWorkerInterpretersStatuspageKvStore = Map<string, string>;

export type TestsWorkerInterpretersStatuspageKvGetFn = (key: string) => Promise<string | null>;

export type TestsWorkerInterpretersStatuspageStoredRaw = string | undefined;

export type TestsWorkerInterpretersStatuspageKvGetReturn = string | null;

export type TestsWorkerInterpretersStatuspageKvPutFn = (key: string, value: string) => Promise<void>;

export type TestsWorkerInterpretersStatuspageKvDeleteFn = (key: string) => Promise<void>;

export type TestsWorkerInterpretersStatuspageKvMockFn = ReturnType<typeof import('vitest')['vi']['fn']>;

export type TestsWorkerInterpretersStatuspageImpact = string;

export type TestsWorkerInterpretersStatuspageMakeInputReturn = Record<string, unknown>;

export type TestsWorkerInterpretersStatuspageInput = Record<string, unknown>;

export type TestsWorkerInterpretersStatuspageResult = WorkerPipelineInterpretResult | null;

export type TestsWorkerInterpretersStatuspageKvCast = unknown;

export type TestsWorkerInterpretersStatuspageStoredParsed = Record<string, unknown>;

export type TestsWorkerInterpretersStatuspageStoredRawCast = string;

export type TestsWorkerInterpretersStatuspageStoredComponentsRecord = Record<string, unknown>;

export type TestsWorkerInterpretersStatuspageExistingState = string;

export type TestsWorkerInterpretersStatuspageNotification = WorkerPipelineInterpretNotificationObject;

export type TestsWorkerInterpretersStatuspageResultNotNull = WorkerPipelineInterpretResult;

export type TestsWorkerInterpretersStatuspageStoreHasResult = boolean;

export type TestsWorkerInterpretersStatuspagePromise = Promise<WorkerPipelineInterpretResult | null>;

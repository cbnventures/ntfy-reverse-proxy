/**
 * Tests - Worker - Pipeline - Parse.
 *
 * @since 2.0.0
 */
export type TestsWorkerPipelineParseBody = Uint8Array;

export type TestsWorkerPipelineParseHeaders = Headers;

export type TestsWorkerPipelineParseResult = {
  type: string;
  text?: string;
  json?: Record<string, unknown>;
  binary?: ArrayBuffer;
};

export type TestsWorkerPipelineParseEmptyBody = ArrayBuffer;

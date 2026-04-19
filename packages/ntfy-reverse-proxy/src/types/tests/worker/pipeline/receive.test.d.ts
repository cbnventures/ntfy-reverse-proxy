/**
 * Tests - Worker - Pipeline - Receive.
 *
 * @since 2.0.0
 */
export type TestsWorkerPipelineReceiveBaseDomain = string;

export type TestsWorkerPipelineReceiveRequest = Request;

export type TestsWorkerPipelineReceiveResult = {
  method: string;
  hostname: string;
  url: string;
  headers: Headers;
  rawBody: ArrayBuffer;
  isGet: boolean;
  redirect?: string;
  error?: string;
};

export type TestsWorkerPipelineReceiveBody = string;

export type TestsWorkerPipelineReceiveHeaderValue = string | null;

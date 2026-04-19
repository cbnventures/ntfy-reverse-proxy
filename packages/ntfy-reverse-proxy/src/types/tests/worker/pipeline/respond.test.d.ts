/**
 * Tests - Worker - Pipeline - Respond.
 *
 * @since 2.0.0
 */
export type TestsWorkerPipelineRespondSendResult = {
  results: TestsWorkerPipelineRespondServerResult[];
  fallbackUsed: boolean;
};

export type TestsWorkerPipelineRespondServerResult = {
  name: string;
  success: boolean;
  status: number;
  stages: string[];
};

export type TestsWorkerPipelineRespondResponse = Response;

export type TestsWorkerPipelineRespondBody = Record<string, unknown>;

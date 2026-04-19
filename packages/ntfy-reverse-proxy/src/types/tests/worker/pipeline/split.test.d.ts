/**
 * Tests - Worker - Pipeline - Split.
 *
 * @since 2.0.0
 */
export type TestsWorkerPipelineSplitResultPart = {
  body: string;
  headers: Record<string, string>;
};

export type TestsWorkerPipelineSplitResult = TestsWorkerPipelineSplitResultPart[];

export type TestsWorkerPipelineSplitLongBody = string;

export type TestsWorkerPipelineSplitHeaders = Record<string, string>;

export type TestsWorkerPipelineSplitBody = string;

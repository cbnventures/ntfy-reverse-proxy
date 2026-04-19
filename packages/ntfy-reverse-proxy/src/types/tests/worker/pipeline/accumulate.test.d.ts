/**
 * Tests - Worker - Pipeline - Accumulate.
 *
 * @since 2.0.0
 */
export type TestsWorkerPipelineAccumulatePrevious = Record<string, TestsWorkerPipelineAccumulateComponentState>;

export type TestsWorkerPipelineAccumulateCurrent = Record<string, TestsWorkerPipelineAccumulateComponentState>;

export type TestsWorkerPipelineAccumulateComponentState = {
  name: string;
  status: string;
};

export type TestsWorkerPipelineAccumulateDiffEntry = {
  name: string;
  oldStatus: string | undefined;
  newStatus: string;
  changed: boolean;
};

export type TestsWorkerPipelineAccumulateDiff = TestsWorkerPipelineAccumulateDiffEntry[];

export type TestsWorkerPipelineAccumulateChangedEntries = TestsWorkerPipelineAccumulateDiffEntry[];

export type TestsWorkerPipelineAccumulateUnchangedEntries = TestsWorkerPipelineAccumulateDiffEntry[];

export type TestsWorkerPipelineAccumulateLines = string[];

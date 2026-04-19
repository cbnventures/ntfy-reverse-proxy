/**
 * Worker - Pipeline - Accumulate.
 *
 * @since 2.0.0
 */

import type {
  WorkerPipelineSharedComponentDiff,
  WorkerPipelineSharedComponentsMap,
  WorkerPipelineSharedComponentState,
  WorkerPipelineSharedStoredState,
} from './shared.d.ts';

/**
 * Worker - Pipeline - Accumulate - Delete State.
 *
 * @since 2.0.0
 */
export type WorkerPipelineAccumulateDeleteStateKv = KVNamespace;

export type WorkerPipelineAccumulateDeleteStatePageId = string;

export type WorkerPipelineAccumulateDeleteStateReturns = Promise<void>;

/**
 * Worker - Pipeline - Accumulate - Diff Components.
 *
 * @since 2.0.0
 */
export type WorkerPipelineAccumulateDiffComponentsPrevious = WorkerPipelineSharedComponentsMap;

export type WorkerPipelineAccumulateDiffComponentsCurrent = WorkerPipelineSharedComponentsMap;

export type WorkerPipelineAccumulateDiffComponentsReturns = WorkerPipelineSharedComponentDiff;

export type WorkerPipelineAccumulateDiffComponentsCurrentEntry = WorkerPipelineSharedComponentState | undefined;

export type WorkerPipelineAccumulateDiffComponentsPreviousEntry = WorkerPipelineSharedComponentState | undefined;

/**
 * Worker - Pipeline - Accumulate - Format Component Lines.
 *
 * @since 2.0.0
 */
export type WorkerPipelineAccumulateFormatComponentLinesDiff = WorkerPipelineSharedComponentDiff;

export type WorkerPipelineAccumulateFormatComponentLinesReturns = string[];

export type WorkerPipelineAccumulateFormatComponentLinesCleanName = string;

export type WorkerPipelineAccumulateFormatComponentLinesHumanized = string;

/**
 * Worker - Pipeline - Accumulate - Read State.
 *
 * @since 2.0.0
 */
export type WorkerPipelineAccumulateReadStateKv = KVNamespace;

export type WorkerPipelineAccumulateReadStatePageId = string;

export type WorkerPipelineAccumulateReadStateReturns = Promise<WorkerPipelineSharedStoredState | null>;

export type WorkerPipelineAccumulateReadStateRaw = string | null;

/**
 * Worker - Pipeline - Accumulate - Write State.
 *
 * @since 2.0.0
 */
export type WorkerPipelineAccumulateWriteStateKv = KVNamespace;

export type WorkerPipelineAccumulateWriteStatePageId = string;

export type WorkerPipelineAccumulateWriteStateState = WorkerPipelineSharedStoredState;

export type WorkerPipelineAccumulateWriteStateReturns = Promise<void>;

export type WorkerPipelineAccumulateWriteStateSerializedState = string;

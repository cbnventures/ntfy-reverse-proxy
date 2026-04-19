import { REGEX_PARENTHETICAL_CONTENT } from '../../lib/regex.js';

import type {
  WorkerPipelineAccumulateDeleteStateKv,
  WorkerPipelineAccumulateDeleteStatePageId,
  WorkerPipelineAccumulateDeleteStateReturns,
  WorkerPipelineAccumulateDiffComponentsCurrent,
  WorkerPipelineAccumulateDiffComponentsCurrentEntry,
  WorkerPipelineAccumulateDiffComponentsPrevious,
  WorkerPipelineAccumulateDiffComponentsPreviousEntry,
  WorkerPipelineAccumulateDiffComponentsReturns,
  WorkerPipelineAccumulateFormatComponentLinesCleanName,
  WorkerPipelineAccumulateFormatComponentLinesDiff,
  WorkerPipelineAccumulateFormatComponentLinesHumanized,
  WorkerPipelineAccumulateFormatComponentLinesReturns,
  WorkerPipelineAccumulateReadStateKv,
  WorkerPipelineAccumulateReadStatePageId,
  WorkerPipelineAccumulateReadStateRaw,
  WorkerPipelineAccumulateReadStateReturns,
  WorkerPipelineAccumulateWriteStateKv,
  WorkerPipelineAccumulateWriteStatePageId,
  WorkerPipelineAccumulateWriteStateReturns,
  WorkerPipelineAccumulateWriteStateSerializedState,
  WorkerPipelineAccumulateWriteStateState,
} from '../../types/worker/pipeline/accumulate.d.ts';
import type {
  WorkerPipelineSharedComponentDiff,
  WorkerPipelineSharedComponentDiffEntry,
  WorkerPipelineSharedComponentDiffEntryChanged,
  WorkerPipelineSharedComponentDiffEntryName,
  WorkerPipelineSharedComponentDiffEntryNewStatus,
  WorkerPipelineSharedComponentDiffEntryOldStatus,
  WorkerPipelineSharedComponentsMap,
} from '../../types/worker/pipeline/shared.d.ts';

/**
 * Worker - Pipeline - Accumulate - Read State.
 *
 * Retrieves a previously stored Statuspage incident state from
 * KV storage using the page identifier as the lookup key.
 *
 * @param {WorkerPipelineAccumulateReadStateKv}     kv     - Kv.
 * @param {WorkerPipelineAccumulateReadStatePageId} pageId - Page id.
 *
 * @returns {WorkerPipelineAccumulateReadStateReturns}
 *
 * @since 2.0.0
 */
export async function readState(kv: WorkerPipelineAccumulateReadStateKv, pageId: WorkerPipelineAccumulateReadStatePageId): WorkerPipelineAccumulateReadStateReturns {
  const raw: WorkerPipelineAccumulateReadStateRaw = await kv.get(`statuspage:${pageId}`);

  if (raw === null) {
    return null;
  }

  return JSON.parse(raw);
}

/**
 * Worker - Pipeline - Accumulate - Write State.
 *
 * Persists the current Statuspage incident state into KV storage
 * with a 24-hour TTL so stale entries expire automatically.
 *
 * @param {WorkerPipelineAccumulateWriteStateKv}     kv     - Kv.
 * @param {WorkerPipelineAccumulateWriteStatePageId} pageId - Page id.
 * @param {WorkerPipelineAccumulateWriteStateState}  state  - State.
 *
 * @returns {WorkerPipelineAccumulateWriteStateReturns}
 *
 * @since 2.0.0
 */
export async function writeState(kv: WorkerPipelineAccumulateWriteStateKv, pageId: WorkerPipelineAccumulateWriteStatePageId, state: WorkerPipelineAccumulateWriteStateState): WorkerPipelineAccumulateWriteStateReturns {
  const serializedState: WorkerPipelineAccumulateWriteStateSerializedState = JSON.stringify(state);

  await kv.put(`statuspage:${pageId}`, serializedState, { expirationTtl: 86400 });

  return;
}

/**
 * Worker - Pipeline - Accumulate - Delete State.
 *
 * Removes the stored Statuspage incident state from KV storage
 * when the incident is resolved and no longer needs tracking.
 *
 * @param {WorkerPipelineAccumulateDeleteStateKv}     kv     - Kv.
 * @param {WorkerPipelineAccumulateDeleteStatePageId} pageId - Page id.
 *
 * @returns {WorkerPipelineAccumulateDeleteStateReturns}
 *
 * @since 2.0.0
 */
export async function deleteState(kv: WorkerPipelineAccumulateDeleteStateKv, pageId: WorkerPipelineAccumulateDeleteStatePageId): WorkerPipelineAccumulateDeleteStateReturns {
  await kv.delete(`statuspage:${pageId}`);

  return;
}

/**
 * Worker - Pipeline - Accumulate - Diff Components.
 *
 * Compares previous and current component maps to produce a diff
 * array indicating which components changed status.
 *
 * @param {WorkerPipelineAccumulateDiffComponentsPrevious} previous - Previous.
 * @param {WorkerPipelineAccumulateDiffComponentsCurrent}  current  - Current.
 *
 * @returns {WorkerPipelineAccumulateDiffComponentsReturns}
 *
 * @since 2.0.0
 */
export function diffComponents(previous: WorkerPipelineAccumulateDiffComponentsPrevious, current: WorkerPipelineAccumulateDiffComponentsCurrent): WorkerPipelineAccumulateDiffComponentsReturns {
  const diff: WorkerPipelineSharedComponentDiff = [];
  const previousMap: WorkerPipelineSharedComponentsMap = previous;
  const currentMap: WorkerPipelineSharedComponentsMap = current;

  for (const id of Object.keys(currentMap)) {
    const currentEntry: WorkerPipelineAccumulateDiffComponentsCurrentEntry = currentMap[id];

    if (currentEntry === undefined) {
      continue;
    }

    const name: WorkerPipelineSharedComponentDiffEntryName = currentEntry['name'];
    const newStatus: WorkerPipelineSharedComponentDiffEntryNewStatus = currentEntry['status'];
    const previousEntry: WorkerPipelineAccumulateDiffComponentsPreviousEntry = previousMap[id];
    const oldStatus: WorkerPipelineSharedComponentDiffEntryOldStatus = (previousEntry !== undefined) ? previousEntry['status'] : undefined;
    const changed: WorkerPipelineSharedComponentDiffEntryChanged = oldStatus !== newStatus;

    const entry: WorkerPipelineSharedComponentDiffEntry = {
      name,
      oldStatus,
      newStatus,
      changed,
    };

    diff.push(entry);
  }

  return diff;
}

/**
 * Worker - Pipeline - Accumulate - Format Component Lines.
 *
 * Converts a component diff array into human-readable lines
 * for inclusion in the notification body text.
 *
 * @param {WorkerPipelineAccumulateFormatComponentLinesDiff} diff - Diff.
 *
 * @returns {WorkerPipelineAccumulateFormatComponentLinesReturns}
 *
 * @since 2.0.0
 */
export function formatComponentLines(diff: WorkerPipelineAccumulateFormatComponentLinesDiff): WorkerPipelineAccumulateFormatComponentLinesReturns {
  const inputDiff: WorkerPipelineSharedComponentDiff = diff;

  return inputDiff.map((entry) => {
    const cleanName: WorkerPipelineAccumulateFormatComponentLinesCleanName = entry['name'].replace(new RegExp(REGEX_PARENTHETICAL_CONTENT, 'g'), '').trim();
    const humanized: WorkerPipelineAccumulateFormatComponentLinesHumanized = entry['newStatus']
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return `- ${cleanName} (${humanized})`;
  });
}

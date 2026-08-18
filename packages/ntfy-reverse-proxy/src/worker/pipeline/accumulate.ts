import { REGEX_PARENTHETICAL_CONTENT } from '../../lib/regex.js';

import type {
  Worker_Pipeline_Accumulate_DiffComponents_Changed,
  Worker_Pipeline_Accumulate_DiffComponents_Current,
  Worker_Pipeline_Accumulate_DiffComponents_CurrentEntry,
  Worker_Pipeline_Accumulate_DiffComponents_Diff,
  Worker_Pipeline_Accumulate_DiffComponents_Entry,
  Worker_Pipeline_Accumulate_DiffComponents_Name,
  Worker_Pipeline_Accumulate_DiffComponents_NewStatus,
  Worker_Pipeline_Accumulate_DiffComponents_OldStatus,
  Worker_Pipeline_Accumulate_DiffComponents_Previous,
  Worker_Pipeline_Accumulate_DiffComponents_PreviousEntry,
  Worker_Pipeline_Accumulate_DiffComponents_Returns,
  Worker_Pipeline_Accumulate_FormatComponentLines_CleanName,
  Worker_Pipeline_Accumulate_FormatComponentLines_Diff,
  Worker_Pipeline_Accumulate_FormatComponentLines_Humanized,
  Worker_Pipeline_Accumulate_FormatComponentLines_Returns,
  Worker_Pipeline_Accumulate_ReadState_Kv,
  Worker_Pipeline_Accumulate_ReadState_PageId,
  Worker_Pipeline_Accumulate_ReadState_Raw,
  Worker_Pipeline_Accumulate_ReadState_Returns,
  Worker_Pipeline_Accumulate_WriteState_Kv,
  Worker_Pipeline_Accumulate_WriteState_PageId,
  Worker_Pipeline_Accumulate_WriteState_Returns,
  Worker_Pipeline_Accumulate_WriteState_SerializedState,
  Worker_Pipeline_Accumulate_WriteState_State,
} from '../../types/worker/pipeline/accumulate.d.ts';

/**
 * Worker - Pipeline - Accumulate - Read State.
 *
 * Retrieves a previously stored Statuspage incident state from
 * KV storage using the page identifier as the lookup key.
 *
 * @param {Worker_Pipeline_Accumulate_ReadState_Kv}     kv     - Kv.
 * @param {Worker_Pipeline_Accumulate_ReadState_PageId} pageId - Page id.
 *
 * @returns {Worker_Pipeline_Accumulate_ReadState_Returns}
 *
 * @since 2.0.0
 */
export async function readState(kv: Worker_Pipeline_Accumulate_ReadState_Kv, pageId: Worker_Pipeline_Accumulate_ReadState_PageId): Worker_Pipeline_Accumulate_ReadState_Returns {
  const raw: Worker_Pipeline_Accumulate_ReadState_Raw = await kv.get(`statuspage:${pageId}`);

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
 * @param {Worker_Pipeline_Accumulate_WriteState_Kv}     kv     - Kv.
 * @param {Worker_Pipeline_Accumulate_WriteState_PageId} pageId - Page id.
 * @param {Worker_Pipeline_Accumulate_WriteState_State}  state  - State.
 *
 * @returns {Worker_Pipeline_Accumulate_WriteState_Returns}
 *
 * @since 2.0.0
 */
export async function writeState(kv: Worker_Pipeline_Accumulate_WriteState_Kv, pageId: Worker_Pipeline_Accumulate_WriteState_PageId, state: Worker_Pipeline_Accumulate_WriteState_State): Worker_Pipeline_Accumulate_WriteState_Returns {
  const serializedState: Worker_Pipeline_Accumulate_WriteState_SerializedState = JSON.stringify(state);

  await kv.put(`statuspage:${pageId}`, serializedState, { expirationTtl: 86400 });

  return;
}

/**
 * Worker - Pipeline - Accumulate - Diff Components.
 *
 * Compares previous and current component maps to produce a diff
 * array indicating which components changed status.
 *
 * @param {Worker_Pipeline_Accumulate_DiffComponents_Previous} previous - Previous.
 * @param {Worker_Pipeline_Accumulate_DiffComponents_Current}  current  - Current.
 *
 * @returns {Worker_Pipeline_Accumulate_DiffComponents_Returns}
 *
 * @since 2.0.0
 */
export function diffComponents(previous: Worker_Pipeline_Accumulate_DiffComponents_Previous, current: Worker_Pipeline_Accumulate_DiffComponents_Current): Worker_Pipeline_Accumulate_DiffComponents_Returns {
  const diff: Worker_Pipeline_Accumulate_DiffComponents_Diff = [];

  for (const id of Object.keys(current)) {
    const currentEntry: Worker_Pipeline_Accumulate_DiffComponents_CurrentEntry = current[id];

    if (currentEntry === undefined) {
      continue;
    }

    const name: Worker_Pipeline_Accumulate_DiffComponents_Name = currentEntry['name'];
    const newStatus: Worker_Pipeline_Accumulate_DiffComponents_NewStatus = currentEntry['status'];
    const previousEntry: Worker_Pipeline_Accumulate_DiffComponents_PreviousEntry = previous[id];
    const oldStatus: Worker_Pipeline_Accumulate_DiffComponents_OldStatus = (previousEntry !== undefined) ? previousEntry['status'] : undefined;
    const changed: Worker_Pipeline_Accumulate_DiffComponents_Changed = oldStatus !== newStatus;

    const entry: Worker_Pipeline_Accumulate_DiffComponents_Entry = {
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
 * @param {Worker_Pipeline_Accumulate_FormatComponentLines_Diff} diff - Diff.
 *
 * @returns {Worker_Pipeline_Accumulate_FormatComponentLines_Returns}
 *
 * @since 2.0.0
 */
export function formatComponentLines(diff: Worker_Pipeline_Accumulate_FormatComponentLines_Diff): Worker_Pipeline_Accumulate_FormatComponentLines_Returns {
  return diff.map((entry) => {
    const cleanName: Worker_Pipeline_Accumulate_FormatComponentLines_CleanName = entry['name'].replace(new RegExp(REGEX_PARENTHETICAL_CONTENT, 'g'), '').trim();
    const humanized: Worker_Pipeline_Accumulate_FormatComponentLines_Humanized = entry['newStatus']
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return `- ${cleanName} (${humanized})`;
  });
}

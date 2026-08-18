/**
 * Worker - Pipeline - Accumulate.
 *
 * @since 2.0.0
 */

import type {
  Shared_StatusPage_ComponentDiff,
  Shared_StatusPage_ComponentsMap,
  Shared_StatusPage_ComponentState,
  Shared_StatusPage_StoredState,
} from '../../shared.d.ts';

/**
 * Worker - Pipeline - Accumulate - Diff Components.
 *
 * @since 2.0.0
 */
export type Worker_Pipeline_Accumulate_DiffComponents_Previous = Shared_StatusPage_ComponentsMap;

export type Worker_Pipeline_Accumulate_DiffComponents_Current = Shared_StatusPage_ComponentsMap;

export type Worker_Pipeline_Accumulate_DiffComponents_Returns = Shared_StatusPage_ComponentDiff;

export type Worker_Pipeline_Accumulate_DiffComponents_Entry_Name = string;

export type Worker_Pipeline_Accumulate_DiffComponents_Entry_OldStatus = string | undefined;

export type Worker_Pipeline_Accumulate_DiffComponents_Entry_NewStatus = string;

export type Worker_Pipeline_Accumulate_DiffComponents_Entry_Changed = boolean;

export type Worker_Pipeline_Accumulate_DiffComponents_Entry = {
  name: Worker_Pipeline_Accumulate_DiffComponents_Entry_Name;
  oldStatus: Worker_Pipeline_Accumulate_DiffComponents_Entry_OldStatus;
  newStatus: Worker_Pipeline_Accumulate_DiffComponents_Entry_NewStatus;
  changed: Worker_Pipeline_Accumulate_DiffComponents_Entry_Changed;
};

export type Worker_Pipeline_Accumulate_DiffComponents_Diff = Worker_Pipeline_Accumulate_DiffComponents_Entry[];

export type Worker_Pipeline_Accumulate_DiffComponents_CurrentEntry = Shared_StatusPage_ComponentState | undefined;

export type Worker_Pipeline_Accumulate_DiffComponents_Name = string;

export type Worker_Pipeline_Accumulate_DiffComponents_NewStatus = string;

export type Worker_Pipeline_Accumulate_DiffComponents_PreviousEntry = Shared_StatusPage_ComponentState | undefined;

export type Worker_Pipeline_Accumulate_DiffComponents_OldStatus = string | undefined;

export type Worker_Pipeline_Accumulate_DiffComponents_Changed = boolean;

/**
 * Worker - Pipeline - Accumulate - Format Component Lines.
 *
 * @since 2.0.0
 */
export type Worker_Pipeline_Accumulate_FormatComponentLines_Diff = Shared_StatusPage_ComponentDiff;

export type Worker_Pipeline_Accumulate_FormatComponentLines_Returns = string[];

export type Worker_Pipeline_Accumulate_FormatComponentLines_CleanName = string;

export type Worker_Pipeline_Accumulate_FormatComponentLines_Humanized = string;

/**
 * Worker - Pipeline - Accumulate - Read State.
 *
 * @since 2.0.0
 */
export type Worker_Pipeline_Accumulate_ReadState_Kv = KVNamespace;

export type Worker_Pipeline_Accumulate_ReadState_PageId = string;

export type Worker_Pipeline_Accumulate_ReadState_Returns = Promise<Shared_StatusPage_StoredState | null>;

export type Worker_Pipeline_Accumulate_ReadState_Raw = string | null;

/**
 * Worker - Pipeline - Accumulate - Write State.
 *
 * @since 2.0.0
 */
export type Worker_Pipeline_Accumulate_WriteState_Kv = KVNamespace;

export type Worker_Pipeline_Accumulate_WriteState_PageId = string;

export type Worker_Pipeline_Accumulate_WriteState_State = Shared_StatusPage_StoredState;

export type Worker_Pipeline_Accumulate_WriteState_Returns = Promise<void>;

export type Worker_Pipeline_Accumulate_WriteState_SerializedState = string;

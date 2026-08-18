import type { vi } from 'vitest';

import type { Worker_Pipeline_Interpret_Result } from '../../../worker/pipeline/interpret.d.ts';

/**
 * Tests - Worker - Interpreters - Statuspage.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Interpreters_Statuspage_KvCast = unknown;

export type Tests_Worker_Interpreters_Statuspage_StoredRawCast = string;

export type Tests_Worker_Interpreters_Statuspage_ResultNotNull = Worker_Pipeline_Interpret_Result;

/**
 * Tests - Worker - Interpreters - Statuspage - Create Mock Kv.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Interpreters_Statuspage_CreateMockKv_Initial = Record<string, string>;

export type Tests_Worker_Interpreters_Statuspage_CreateMockKv_Returns_Get = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Interpreters_Statuspage_CreateMockKv_Returns_Put = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Interpreters_Statuspage_CreateMockKv_Returns_Delete = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Interpreters_Statuspage_CreateMockKv_Returns_Store = Map<string, string>;

export type Tests_Worker_Interpreters_Statuspage_CreateMockKv_Returns = {
  get: Tests_Worker_Interpreters_Statuspage_CreateMockKv_Returns_Get;
  put: Tests_Worker_Interpreters_Statuspage_CreateMockKv_Returns_Put;
  delete: Tests_Worker_Interpreters_Statuspage_CreateMockKv_Returns_Delete;
  store: Tests_Worker_Interpreters_Statuspage_CreateMockKv_Returns_Store;
};

export type Tests_Worker_Interpreters_Statuspage_CreateMockKv_Store = Map<string, string>;

export type Tests_Worker_Interpreters_Statuspage_CreateMockKv_Value = string | undefined;

export type Tests_Worker_Interpreters_Statuspage_CreateMockKv_Resolved = string | null;

/**
 * Tests - Worker - Interpreters - Statuspage - Make Input.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Interpreters_Statuspage_MakeInput_Impact = string;

export type Tests_Worker_Interpreters_Statuspage_MakeInput_Returns = Record<string, unknown>;

/**
 * Tests - Worker - Interpreters - Statuspage - Statuspage Interpreter - Deduplicates Identical Incident Webhooks With Same Update Id.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DeduplicatesIdenticalIncidentWebhooksWithSameUpdateId_ExistingState = string;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DeduplicatesIdenticalIncidentWebhooksWithSameUpdateId_Kv_Get = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DeduplicatesIdenticalIncidentWebhooksWithSameUpdateId_Kv_Put = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DeduplicatesIdenticalIncidentWebhooksWithSameUpdateId_Kv_Delete = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DeduplicatesIdenticalIncidentWebhooksWithSameUpdateId_Kv_Store = Map<string, string>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DeduplicatesIdenticalIncidentWebhooksWithSameUpdateId_Kv = {
  get: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DeduplicatesIdenticalIncidentWebhooksWithSameUpdateId_Kv_Get;
  put: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DeduplicatesIdenticalIncidentWebhooksWithSameUpdateId_Kv_Put;
  delete: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DeduplicatesIdenticalIncidentWebhooksWithSameUpdateId_Kv_Delete;
  store: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DeduplicatesIdenticalIncidentWebhooksWithSameUpdateId_Kv_Store;
};

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DeduplicatesIdenticalIncidentWebhooksWithSameUpdateId_Input = Record<string, unknown>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DeduplicatesIdenticalIncidentWebhooksWithSameUpdateId_Result = Worker_Pipeline_Interpret_Result | null;

/**
 * Tests - Worker - Interpreters - Statuspage - Statuspage Interpreter - Does Not Crash When Component Fields Are Null.
 *
 * @since 2.1.0
 */
export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DoesNotCrashWhenComponentFieldsAreNull_Input = Record<string, unknown>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DoesNotCrashWhenComponentFieldsAreNull_Result = Worker_Pipeline_Interpret_Result | null;

/**
 * Tests - Worker - Interpreters - Statuspage - Statuspage Interpreter - Does Not Crash When Incident Is Null.
 *
 * @since 2.1.0
 */
export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DoesNotCrashWhenIncidentIsNull_Input = Record<string, unknown>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DoesNotCrashWhenIncidentIsNull_Result = Worker_Pipeline_Interpret_Result | null;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DoesNotCrashWhenIncidentIsNull_Notification = Record<string, unknown>;

/**
 * Tests - Worker - Interpreters - Statuspage - Statuspage Interpreter - Does Not Crash When Page Is Null.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DoesNotCrashWhenPageIsNull_Input = Record<string, unknown>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DoesNotCrashWhenPageIsNull_Result = Worker_Pipeline_Interpret_Result | null;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_DoesNotCrashWhenPageIsNull_Notification = Record<string, unknown>;

/**
 * Tests - Worker - Interpreters - Statuspage - Statuspage Interpreter - Falls Back To Original Behavior Without KV Context.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FallsBackToOriginalBehaviorWithoutKVContext_Input = Record<string, unknown>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FallsBackToOriginalBehaviorWithoutKVContext_Result = Worker_Pipeline_Interpret_Result | null;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FallsBackToOriginalBehaviorWithoutKVContext_Notification = Record<string, unknown>;

/**
 * Tests - Worker - Interpreters - Statuspage - Statuspage Interpreter - Fires Notification On Incident Webhook With Accumulated Components.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FiresNotificationOnIncidentWebhookWithAccumulatedComponents_ExistingState = string;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FiresNotificationOnIncidentWebhookWithAccumulatedComponents_Kv_Get = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FiresNotificationOnIncidentWebhookWithAccumulatedComponents_Kv_Put = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FiresNotificationOnIncidentWebhookWithAccumulatedComponents_Kv_Delete = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FiresNotificationOnIncidentWebhookWithAccumulatedComponents_Kv_Store = Map<string, string>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FiresNotificationOnIncidentWebhookWithAccumulatedComponents_Kv = {
  get: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FiresNotificationOnIncidentWebhookWithAccumulatedComponents_Kv_Get;
  put: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FiresNotificationOnIncidentWebhookWithAccumulatedComponents_Kv_Put;
  delete: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FiresNotificationOnIncidentWebhookWithAccumulatedComponents_Kv_Delete;
  store: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FiresNotificationOnIncidentWebhookWithAccumulatedComponents_Kv_Store;
};

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FiresNotificationOnIncidentWebhookWithAccumulatedComponents_Input = Record<string, unknown>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FiresNotificationOnIncidentWebhookWithAccumulatedComponents_Result = Worker_Pipeline_Interpret_Result | null;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_FiresNotificationOnIncidentWebhookWithAccumulatedComponents_Notification = Record<string, unknown>;

/**
 * Tests - Worker - Interpreters - Statuspage - Statuspage Interpreter - Keeps KV State On Resolved Incident For Dedup.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_ExistingState = string;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_Kv_Get = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_Kv_Put = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_Kv_Delete = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_Kv_Store = Map<string, string>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_Kv = {
  get: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_Kv_Get;
  put: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_Kv_Put;
  delete: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_Kv_Delete;
  store: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_Kv_Store;
};

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_Input = Record<string, unknown>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_Result = Worker_Pipeline_Interpret_Result | null;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_Notification = Record<string, unknown>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_HasKey = boolean;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_StoredRaw = string | undefined;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_KeepsKVStateOnResolvedIncidentForDedup_Stored = Record<string, unknown>;

/**
 * Tests - Worker - Interpreters - Statuspage - Statuspage Interpreter - Maps Impact To Priority Correctly.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_MapsImpactToPriorityCorrectly_MinorInput = Record<string, unknown>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_MapsImpactToPriorityCorrectly_MinorResult = Worker_Pipeline_Interpret_Result | null;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_MapsImpactToPriorityCorrectly_MinorNotification = Record<string, unknown>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_MapsImpactToPriorityCorrectly_MajorInput = Record<string, unknown>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_MapsImpactToPriorityCorrectly_MajorResult = Worker_Pipeline_Interpret_Result | null;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_MapsImpactToPriorityCorrectly_MajorNotification = Record<string, unknown>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_MapsImpactToPriorityCorrectly_CriticalInput = Record<string, unknown>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_MapsImpactToPriorityCorrectly_CriticalResult = Worker_Pipeline_Interpret_Result | null;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_MapsImpactToPriorityCorrectly_CriticalNotification = Record<string, unknown>;

/**
 * Tests - Worker - Interpreters - Statuspage - Statuspage Interpreter - Returns Null For Component Only Webhooks Without KV.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_ReturnsNullForComponentOnlyWebhooksWithoutKV_Input = Record<string, unknown>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_ReturnsNullForComponentOnlyWebhooksWithoutKV_Result = Worker_Pipeline_Interpret_Result | null;

/**
 * Tests - Worker - Interpreters - Statuspage - Statuspage Interpreter - Silently Accumulates Component Only Webhooks In KV.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_SilentlyAccumulatesComponentOnlyWebhooksInKV_Kv_Get = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_SilentlyAccumulatesComponentOnlyWebhooksInKV_Kv_Put = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_SilentlyAccumulatesComponentOnlyWebhooksInKV_Kv_Delete = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_SilentlyAccumulatesComponentOnlyWebhooksInKV_Kv_Store = Map<string, string>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_SilentlyAccumulatesComponentOnlyWebhooksInKV_Kv = {
  get: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_SilentlyAccumulatesComponentOnlyWebhooksInKV_Kv_Get;
  put: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_SilentlyAccumulatesComponentOnlyWebhooksInKV_Kv_Put;
  delete: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_SilentlyAccumulatesComponentOnlyWebhooksInKV_Kv_Delete;
  store: Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_SilentlyAccumulatesComponentOnlyWebhooksInKV_Kv_Store;
};

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_SilentlyAccumulatesComponentOnlyWebhooksInKV_Input = Record<string, unknown>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_SilentlyAccumulatesComponentOnlyWebhooksInKV_Result = Worker_Pipeline_Interpret_Result | null;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_SilentlyAccumulatesComponentOnlyWebhooksInKV_StoredRaw = string | undefined;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_SilentlyAccumulatesComponentOnlyWebhooksInKV_Stored = Record<string, unknown>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_SilentlyAccumulatesComponentOnlyWebhooksInKV_StoredComponents = Record<string, unknown>;

/**
 * Tests - Worker - Interpreters - Statuspage - Statuspage Interpreter - Throws On Unrecognized Payload.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_ThrowsOnUnrecognizedPayload_Input = Record<string, unknown>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_ThrowsOnUnrecognizedPayload_Promise = Promise<Worker_Pipeline_Interpret_Result | null>;

/**
 * Tests - Worker - Interpreters - Statuspage - Statuspage Interpreter - Uses Incident Name In Title And Status Impact In Body.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_UsesIncidentNameInTitleAndStatusImpactInBody_Input = Record<string, unknown>;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_UsesIncidentNameInTitleAndStatusImpactInBody_Result = Worker_Pipeline_Interpret_Result | null;

export type Tests_Worker_Interpreters_Statuspage_StatuspageInterpreter_UsesIncidentNameInTitleAndStatusImpactInBody_Notification = Record<string, unknown>;

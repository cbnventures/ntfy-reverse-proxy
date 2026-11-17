import type { vi } from 'vitest';

import type { Runner as DeliveryOutbox } from '../../../../worker/durable-objects/delivery-outbox.js';

import type {
  Worker_Pipeline_Deliver_EnqueueOptions,
  Worker_Pipeline_Deliver_Result,
} from '../../../worker/pipeline/deliver.d.ts';

/**
 * Tests - Worker - Durable Objects - Delivery Outbox.
 *
 * @since 2.4.0
 */
export type Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner_AlarmTimes = number[];

export type Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner_Close = () => void;

export type Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner_ConsumeAlarm = () => void;

export type Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner_CreateState = () => DurableObjectState;

export type Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner_GetAlarm = () => Promise<number | null>;

export type Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner_Query_Query = string;

export type Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner_Query_Bindings = SqlStorageValue[] | undefined;

export type Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner_Query_Returns = Array<Record<string, SqlStorageValue>>;

export type Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner_Query = (
  query: Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner_Query_Query,
  bindings?: Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner_Query_Bindings,
) => Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner_Query_Returns;

export type Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner = {
  alarmTimes: Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner_AlarmTimes;
  close: Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner_Close;
  consumeAlarm: Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner_ConsumeAlarm;
  createState: Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner_CreateState;
  getAlarm: Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner_GetAlarm;
  query: Tests_Worker_DurableObjects_DeliveryOutbox_StorageRunner_Query;
};

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Cloudflare Workers.
 *
 * @since 2.4.0
 */
export type Tests_Worker_DurableObjects_DeliveryOutbox_CloudflareWorkers_InitializeDurableObject = (
  this: Tests_Worker_DurableObjects_DeliveryOutbox_CloudflareWorkers_InitializeDurableObject_This,
  ctx: Tests_Worker_DurableObjects_DeliveryOutbox_CloudflareWorkers_InitializeDurableObject_Ctx,
  env: Tests_Worker_DurableObjects_DeliveryOutbox_CloudflareWorkers_InitializeDurableObject_Env,
) => Tests_Worker_DurableObjects_DeliveryOutbox_CloudflareWorkers_InitializeDurableObject_Returns;

export type Tests_Worker_DurableObjects_DeliveryOutbox_CloudflareWorkers_InitializeDurableObject_This = object;

export type Tests_Worker_DurableObjects_DeliveryOutbox_CloudflareWorkers_InitializeDurableObject_Ctx = DurableObjectState;

export type Tests_Worker_DurableObjects_DeliveryOutbox_CloudflareWorkers_InitializeDurableObject_Env = Record<string, unknown>;

export type Tests_Worker_DurableObjects_DeliveryOutbox_CloudflareWorkers_InitializeDurableObject_Returns = void;

export type Tests_Worker_DurableObjects_DeliveryOutbox_CloudflareWorkers_DurableObject = ReturnType<typeof vi['fn']>;

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Create Delivery Outbox.
 *
 * @since 2.4.0
 */
export type Tests_Worker_DurableObjects_DeliveryOutbox_CreateDeliveryOutbox_Returns = DeliveryOutbox & {};

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Create Options.
 *
 * @since 2.4.0
 */
export type Tests_Worker_DurableObjects_DeliveryOutbox_CreateOptions_Body = string;

export type Tests_Worker_DurableObjects_DeliveryOutbox_CreateOptions_ErrorTopic = string | undefined;

export type Tests_Worker_DurableObjects_DeliveryOutbox_CreateOptions_Returns = Worker_Pipeline_Deliver_EnqueueOptions & {};

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Create Storage Runner.
 *
 * @since 2.4.0
 */
export type Tests_Worker_DurableObjects_DeliveryOutbox_CreateStorageRunner_ReturnsAlarmTimes = number[];

export type Tests_Worker_DurableObjects_DeliveryOutbox_CreateStorageRunner_ReturnsClose = () => void;

export type Tests_Worker_DurableObjects_DeliveryOutbox_CreateStorageRunner_ReturnsConsumeAlarm = () => void;

export type Tests_Worker_DurableObjects_DeliveryOutbox_CreateStorageRunner_ReturnsCreateState = () => DurableObjectState;

export type Tests_Worker_DurableObjects_DeliveryOutbox_CreateStorageRunner_ReturnsGetAlarm = () => Promise<number | null>;

export type Tests_Worker_DurableObjects_DeliveryOutbox_CreateStorageRunner_ReturnsQuery = (
  query: string,
  bindings?: SqlStorageValue[],
) => Array<Record<string, SqlStorageValue>>;

export type Tests_Worker_DurableObjects_DeliveryOutbox_CreateStorageRunner_Returns = {
  alarmTimes: Tests_Worker_DurableObjects_DeliveryOutbox_CreateStorageRunner_ReturnsAlarmTimes;
  close: Tests_Worker_DurableObjects_DeliveryOutbox_CreateStorageRunner_ReturnsClose;
  consumeAlarm: Tests_Worker_DurableObjects_DeliveryOutbox_CreateStorageRunner_ReturnsConsumeAlarm;
  createState: Tests_Worker_DurableObjects_DeliveryOutbox_CreateStorageRunner_ReturnsCreateState;
  getAlarm: Tests_Worker_DurableObjects_DeliveryOutbox_CreateStorageRunner_ReturnsGetAlarm;
  query: Tests_Worker_DurableObjects_DeliveryOutbox_CreateStorageRunner_ReturnsQuery;
};

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Delivery Outbox - Discards An Invalid Queued Payload.
 *
 * @since 2.4.0
 */
export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAnInvalidQueuedPayload_Outbox = DeliveryOutbox & {};

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAnInvalidQueuedPayload_Rows = Array<Record<string, SqlStorageValue>>;

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Delivery Outbox - Discards A Permanent 400 Head And Delivers Later Rows In FIFO Order.
 *
 * @since 2.4.0
 */
export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_Outbox = DeliveryOutbox & {};

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_MockFetch = ReturnType<typeof vi['fn']>;

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_Poison = Promise<Worker_Pipeline_Deliver_Result>;

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_GoodFirst = Promise<Worker_Pipeline_Deliver_Result>;

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_GoodSecond = Promise<Worker_Pipeline_Deliver_Result>;

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_Results_ResultDeliveryId = string;

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_Results_ResultState = 'delivered' | 'discarded' | 'queued';

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_Results_ResultPending = number;

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_Results_ResultSendResult = Worker_Pipeline_Deliver_Result['sendResult'];

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_Results_Result = {
  deliveryId: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_Results_ResultDeliveryId;
  state: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_Results_ResultState;
  pending: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_Results_ResultPending;
  sendResult?: Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_Results_ResultSendResult;
};

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_Results = Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_Results_Result[];

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_DiscardedResult = Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_Results_Result | undefined;

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_DiagnosticCall = unknown[] | undefined;

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_DiagnosticInit = RequestInit;

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_DiagnosticBytes = Uint8Array;

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsAPermanent400HeadAndDeliversLaterRowsInFIFOOrder_Diagnostic = Record<string, unknown>;

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Delivery Outbox - Discards A Row Whose Configured Server Is Missing.
 *
 * @since 2.4.0
 */
export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsARowWhoseConfiguredServerIsMissing_Outbox = DeliveryOutbox & {};

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsARowWhoseConfiguredServerIsMissing_MockFetch = ReturnType<typeof vi['fn']>;

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsARowWhoseConfiguredServerIsMissing_Result = Worker_Pipeline_Deliver_Result & {};

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_DiscardsARowWhoseConfiguredServerIsMissing_Rows = Array<Record<string, SqlStorageValue>>;

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Delivery Outbox - Preserves Attempt State Across A New Durable Object Instance.
 *
 * @since 2.4.0
 */
export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PreservesAttemptStateAcrossANewDurableObjectInstance_FirstOutbox = DeliveryOutbox & {};

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PreservesAttemptStateAcrossANewDurableObjectInstance_MockFetch = ReturnType<typeof vi['fn']>;

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PreservesAttemptStateAcrossANewDurableObjectInstance_SecondOutbox = DeliveryOutbox & {};

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PreservesAttemptStateAcrossANewDurableObjectInstance_AttemptRows = Array<Record<string, SqlStorageValue>>;

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Delivery Outbox - Preserves Every Notification Through An Outage Across Several Posts.
 *
 * @since 2.4.0
 */
export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PreservesEveryNotificationThroughAnOutageAcrossSeveralPosts_Outbox = DeliveryOutbox & {};

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PreservesEveryNotificationThroughAnOutageAcrossSeveralPosts_MockFetch = ReturnType<typeof vi['fn']>;

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PreservesEveryNotificationThroughAnOutageAcrossSeveralPosts_ExpectedBodies = string[];

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PreservesEveryNotificationThroughAnOutageAcrossSeveralPosts_Rows = Array<Record<string, SqlStorageValue>>;

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Delivery Outbox - Purges An Aged Transient Row And Its Persisted Data After The Minimum Attempts.
 *
 * @since 2.4.0
 */
export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PurgesAnAgedTransientRowAndItsPersistedDataAfterTheMinimumAttempts_Outbox = DeliveryOutbox & {};

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PurgesAnAgedTransientRowAndItsPersistedDataAfterTheMinimumAttempts_MockFetch = ReturnType<typeof vi['fn']>;

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PurgesAnAgedTransientRowAndItsPersistedDataAfterTheMinimumAttempts_Attachment = ArrayBuffer;

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_PurgesAnAgedTransientRowAndItsPersistedDataAfterTheMinimumAttempts_Rows = Array<Record<string, SqlStorageValue>>;

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Delivery Outbox - Retries Transient 503 Failures Through Alarms Until Delivery Succeeds.
 *
 * @since 2.4.0
 */
export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_RetriesTransient503FailuresThroughAlarmsUntilDeliverySucceeds_Outbox = DeliveryOutbox & {};

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_RetriesTransient503FailuresThroughAlarmsUntilDeliverySucceeds_MockFetch = ReturnType<typeof vi['fn']>;

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_RetriesTransient503FailuresThroughAlarmsUntilDeliverySucceeds_FirstAlarm = number | undefined;

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_RetriesTransient503FailuresThroughAlarmsUntilDeliverySucceeds_SecondAlarm = number | undefined;

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Delivery Outbox - Upgrades And Handles Rows From The Legacy Notifications Schema.
 *
 * @since 2.4.0
 */
export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_UpgradesAndHandlesRowsFromTheLegacyNotificationsSchema_Payload = string;

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_UpgradesAndHandlesRowsFromTheLegacyNotificationsSchema_Outbox = DeliveryOutbox & {};

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_UpgradesAndHandlesRowsFromTheLegacyNotificationsSchema_MockFetch = ReturnType<typeof vi['fn']>;

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_UpgradesAndHandlesRowsFromTheLegacyNotificationsSchema_Columns = Array<Record<string, SqlStorageValue>>;

export type Tests_Worker_DurableObjects_DeliveryOutbox_DeliveryOutbox_UpgradesAndHandlesRowsFromTheLegacyNotificationsSchema_Rows = Array<Record<string, SqlStorageValue>>;

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Get First Row.
 *
 * @since 2.4.0
 */
export type Tests_Worker_DurableObjects_DeliveryOutbox_GetFirstRow_Rows = Array<Record<string, SqlStorageValue>>;

export type Tests_Worker_DurableObjects_DeliveryOutbox_GetFirstRow_Returns = Record<string, SqlStorageValue>;

export type Tests_Worker_DurableObjects_DeliveryOutbox_GetFirstRow_Row = Record<string, SqlStorageValue> | undefined;

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Runner.
 *
 * @since 2.4.0
 */
export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_AlarmTimes = number[];

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Alarm = number | null;

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_DatabaseBinding = null | number | bigint | string | Uint8Array;

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_DatabaseStatementColumns = () => unknown[];

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_DatabaseStatementAll = (...bindings: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_DatabaseBinding[]) => unknown[];

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_DatabaseStatementRun = (...bindings: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_DatabaseBinding[]) => unknown;

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_DatabaseStatement = {
  columns: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_DatabaseStatementColumns;
  all: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_DatabaseStatementAll;
  run: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_DatabaseStatementRun;
};

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_DatabaseClose = () => void;

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_DatabaseExec = (query: string) => void;

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_DatabasePrepare = (query: string) => Tests_Worker_DurableObjects_DeliveryOutbox_Runner_DatabaseStatement;

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Database = {
  close: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_DatabaseClose;
  exec: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_DatabaseExec;
  prepare: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_DatabasePrepare;
};

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Runner - Close.
 *
 * @since 2.4.0
 */
export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Close_Returns = void;

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Runner - Constructor.
 *
 * @since 2.4.0
 */
export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_DatabasePath = string;

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Runner - Consume Alarm.
 *
 * @since 2.4.0
 */
export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_ConsumeAlarm_Returns = void;

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Runner - Create State.
 *
 * @since 2.4.0
 */
export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_CreateState_Returns = DurableObjectState;

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_CreateState_Execute = (
  query: string,
  bindings?: SqlStorageValue[],
) => SqlStorageCursor<Record<string, SqlStorageValue>>;

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_CreateState_SqlExec = Tests_Worker_DurableObjects_DeliveryOutbox_Runner_CreateState_Execute & {};

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_CreateState_Query = string;

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_CreateState_BindingsCast = unknown;

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_CreateState_Bindings = SqlStorageValue[];

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_CreateState_Cast = unknown;

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Runner - Delete Alarm.
 *
 * @since 2.4.0
 */
export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_DeleteAlarm_Returns = Promise<void>;

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Runner - Execute.
 *
 * @since 2.4.0
 */
export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_Query = string;

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_Bindings = SqlStorageValue[];

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_Returns<Row extends Record<string, SqlStorageValue>> = SqlStorageCursor<Row>;

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_StatementBinding = null | number | bigint | string | Uint8Array;

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_StatementColumns = () => unknown[];

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_StatementAll = (...bindings: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_StatementBinding[]) => unknown[];

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_StatementRun = (...bindings: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_StatementBinding[]) => unknown;

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_Statement = {
  columns: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_StatementColumns;
  all: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_StatementAll;
  run: Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_StatementRun;
};

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_NormalizedBindings = Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_StatementBinding[];

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_Columns = unknown[];

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_Rows<Row extends Record<string, SqlStorageValue>> = Row[];

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_RowsCast = unknown;

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_Row<Row extends Record<string, SqlStorageValue>> = Row;

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Execute_CursorCast = unknown;

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Runner - Get Alarm.
 *
 * @since 2.4.0
 */
export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_GetAlarm_Returns = Promise<number | null>;

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Runner - Query.
 *
 * @since 2.4.0
 */
export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Query_Query = string;

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Query_Bindings = SqlStorageValue[];

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_Query_Returns = Array<Record<string, SqlStorageValue>>;

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Runner - Set Alarm.
 *
 * @since 2.4.0
 */
export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_SetAlarm_ScheduledTime = number;

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_SetAlarm_Returns = Promise<void>;

/**
 * Tests - Worker - Durable Objects - Delivery Outbox - Runner - Transaction Sync.
 *
 * @since 2.4.0
 */
export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_TransactionSync_Closure<Return> = () => Return;

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_TransactionSync_Returns<Return> = Return;

export type Tests_Worker_DurableObjects_DeliveryOutbox_Runner_TransactionSync_Result<Return> = Return;

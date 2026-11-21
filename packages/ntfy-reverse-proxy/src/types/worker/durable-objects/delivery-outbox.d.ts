import type { Lib_Schema_ServerConfig } from '../../lib/schema.d.ts';
import type {
  Worker_NtfyClient_Runner_ReadStoredMessage_Stored,
  Worker_NtfyClient_Runner_ReadStoredTitle_AttachmentHeaders,
} from '../ntfy-client.d.ts';
import type {
  Worker_Pipeline_Deliver_EnqueueOptions,
  Worker_Pipeline_Deliver_Result,
} from '../pipeline/deliver.d.ts';
import type {
  Worker_Pipeline_DrainFifo_Action,
  Worker_Pipeline_DrainFifo_DrainResult,
} from '../pipeline/drain-fifo.d.ts';
import type {
  Worker_Pipeline_Send_Result,
  Worker_Pipeline_Send_ServerResult,
} from '../pipeline/send.d.ts';

/**
 * Worker - Durable Objects - Delivery Outbox - Delivery Attempt Minimum.
 *
 * @since 2.4.0
 */
export type Worker_DurableObjects_DeliveryOutbox_DeliveryAttemptMinimum = number;

/**
 * Worker - Durable Objects - Delivery Outbox - Delivery Failure Max Age Milliseconds.
 *
 * @since 2.4.0
 */
export type Worker_DurableObjects_DeliveryOutbox_DeliveryFailureMaxAgeMilliseconds = number;

/**
 * Worker - Durable Objects - Delivery Outbox - Delivery Retry Base Milliseconds.
 *
 * @since 2.4.0
 */
export type Worker_DurableObjects_DeliveryOutbox_DeliveryRetryBaseMilliseconds = number;

/**
 * Worker - Durable Objects - Delivery Outbox - Delivery Retry Max Milliseconds.
 *
 * @since 2.4.0
 */
export type Worker_DurableObjects_DeliveryOutbox_DeliveryRetryMaxMilliseconds = number;

/**
 * Worker - Durable Objects - Delivery Outbox - Missing Server Error Name.
 *
 * @since 2.4.0
 */
export type Worker_DurableObjects_DeliveryOutbox_MissingServerErrorName = string;

/**
 * Worker - Durable Objects - Delivery Outbox - Attachment Chunk Bytes.
 *
 * @since 2.2.1
 */
export type Worker_DurableObjects_DeliveryOutbox_AttachmentChunkBytes = number;

/**
 * Worker - Durable Objects - Delivery Outbox - Configured Servers.
 *
 * @since 2.3.0
 */
export type Worker_DurableObjects_DeliveryOutbox_ConfiguredServers = Array<Lib_Schema_ServerConfig>;

/**
 * Worker - Durable Objects - Delivery Outbox - Delivery Succeeded.
 *
 * @since 2.2.1
 */
export type Worker_DurableObjects_DeliveryOutbox_DeliverySucceeded_Mode = 'send-once' | 'send-all';

export type Worker_DurableObjects_DeliveryOutbox_DeliverySucceeded_SendResult = Worker_Pipeline_Send_Result & {};

export type Worker_DurableObjects_DeliveryOutbox_DeliverySucceeded_Returns = boolean;

/**
 * Worker - Durable Objects - Delivery Outbox - Runner.
 *
 * @since 2.2.1
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_Env = Record<string, unknown>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_DrainPromise = Promise<Worker_Pipeline_DrainFifo_DrainResult<Worker_Pipeline_Send_Result>> | undefined;

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Alarm.
 *
 * @since 2.4.0
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_Alarm_Returns = Promise<void>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Alarm_ActiveDrain = Promise<Worker_Pipeline_DrainFifo_DrainResult<Worker_Pipeline_Send_Result>> | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Alarm_StartedDrain = Promise<Worker_Pipeline_DrainFifo_DrainResult<Worker_Pipeline_Send_Result>>;

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Attempt.
 *
 * @since 2.2.1
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_NotificationPosition = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_NotificationDeliveryId = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_NotificationPayload = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Notification = {
  position: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_NotificationPosition;
  deliveryId: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_NotificationDeliveryId;
  payload: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_NotificationPayload;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Returns = Promise<Worker_Pipeline_Send_Result>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadMessages = Worker_NtfyClient_Runner_ReadStoredMessage_Stored[];

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadServerNames = string[];

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadPrimaryServerName = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadTopic = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadMode = 'send-once' | 'send-all';

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadVisitorIp = string | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadFilename = string | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadAttachmentTitle = string | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadAttachmentHeaders = Worker_NtfyClient_Runner_ReadStoredTitle_AttachmentHeaders;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadHasAttachment = boolean;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Payload = {
  messages: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadMessages;
  serverNames: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadServerNames;
  primaryServerName: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadPrimaryServerName;
  topic: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadTopic;
  mode: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadMode;
  visitorIp?: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadVisitorIp;
  filename?: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadFilename;
  attachmentTitle?: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadAttachmentTitle;
  attachmentHeaders?: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadAttachmentHeaders;
  hasAttachment: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadHasAttachment;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Attachment = ArrayBuffer | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_CompletedStages = Record<string, string[]>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_ResolvedServers = Array<Lib_Schema_ServerConfig>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_ResolvedPrimaryServer = Lib_Schema_ServerConfig & {};

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Resolved = {
  servers: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_ResolvedServers;
  primaryServer: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_ResolvedPrimaryServer;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_AttachmentTitle = string | undefined;

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Checkpoint.
 *
 * @since 2.2.1
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_Checkpoint_DeliveryId = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Checkpoint_ServerName = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Checkpoint_Stage = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Checkpoint_Returns = void;

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Constructor.
 *
 * @since 2.4.0
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_Ctx = DurableObjectState;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_Env = Record<string, unknown>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_NotificationColumnsItemName = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_NotificationColumnsItem = {
  name: Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_NotificationColumnsItemName;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_NotificationColumns = Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_NotificationColumnsItem[];

export type Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_AttemptCountColumn = Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_NotificationColumnsItem | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_DiagnosticConfigColumn = Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_NotificationColumnsItem | undefined;

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Continue Drain.
 *
 * @since 2.4.0
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_ContinueDrain_PreviousDrain = Worker_Pipeline_DrainFifo_DrainResult<Worker_Pipeline_Send_Result>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ContinueDrain_Returns = Promise<Worker_Pipeline_DrainFifo_DrainResult<Worker_Pipeline_Send_Result>>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ContinueDrain_CurrentDrainResults = Map<string, Worker_Pipeline_Send_Result>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ContinueDrain_CurrentDrainDiscardedIds = Set<string>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ContinueDrain_CurrentDrain = {
  results: Worker_DurableObjects_DeliveryOutbox_Runner_ContinueDrain_CurrentDrainResults;
  discardedIds: Worker_DurableObjects_DeliveryOutbox_Runner_ContinueDrain_CurrentDrainDiscardedIds;
};

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Delete.
 *
 * @since 2.2.1
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_Delete_DeliveryId = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Delete_Returns = void;

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Drain.
 *
 * @since 2.2.1
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_Drain_Returns = Promise<Worker_Pipeline_DrainFifo_DrainResult<Worker_Pipeline_Send_Result>>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Drain_DrainResultResults = Map<string, Worker_Pipeline_Send_Result>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Drain_DrainResultDiscardedIds = Set<string>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Drain_DrainResult = {
  results: Worker_DurableObjects_DeliveryOutbox_Runner_Drain_DrainResultResults;
  discardedIds: Worker_DurableObjects_DeliveryOutbox_Runner_Drain_DrainResultDiscardedIds;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_Drain_PendingNotificationDeliveryId = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Drain_PendingNotification = {
  deliveryId: Worker_DurableObjects_DeliveryOutbox_Runner_Drain_PendingNotificationDeliveryId;
} | undefined;

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Enqueue.
 *
 * @since 2.2.1
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Options = Worker_Pipeline_Deliver_EnqueueOptions & {};

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Returns = Promise<Worker_Pipeline_Deliver_Result>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_DeliveryId = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_DiagnosticConfigServerNames = string[];

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_DiagnosticConfigPrimaryServerName = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_DiagnosticConfigMode = 'send-once' | 'send-all';

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_DiagnosticConfigContextName = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_DiagnosticConfigInterpreterName = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_DiagnosticConfigErrorTopic = string | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_DiagnosticConfig = {
  serverNames: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_DiagnosticConfigServerNames;
  primaryServerName: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_DiagnosticConfigPrimaryServerName;
  mode: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_DiagnosticConfigMode;
  contextName: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_DiagnosticConfigContextName;
  interpreterName: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_DiagnosticConfigInterpreterName;
  errorTopic?: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_DiagnosticConfigErrorTopic;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_DiagnosticConfigJson = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadMessages = Worker_Pipeline_Deliver_EnqueueOptions['messages'];

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadServerNames = string[];

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadPrimaryServerName = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadTopic = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadMode = 'send-once' | 'send-all';

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadVisitorIp = string | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadFilename = string | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadAttachmentTitle = string | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadHasAttachment = boolean;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Payload = {
  messages: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadMessages;
  serverNames: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadServerNames;
  primaryServerName: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadPrimaryServerName;
  topic: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadTopic;
  mode: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadMode;
  visitorIp?: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadVisitorIp;
  filename?: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadFilename;
  attachmentTitle?: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadAttachmentTitle;
  hasAttachment: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadHasAttachment;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadJson = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_AttachmentBytes = Uint8Array | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_ChunkIndex = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Offset = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Chunk = ArrayBuffer;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_StartedDrain = Promise<Worker_Pipeline_DrainFifo_DrainResult<Worker_Pipeline_Send_Result>>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_AttemptResultsResults = Map<string, Worker_Pipeline_Send_Result>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_AttemptResultsDiscardedIds = Set<string>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_AttemptResults = {
  results: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_AttemptResultsResults;
  discardedIds: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_AttemptResultsDiscardedIds;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PendingRowPending = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PendingRow = {
  pending: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PendingRowPending;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_QueuedRowQueued = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_QueuedRow = {
  queued: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_QueuedRowQueued;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_SendResult = Worker_Pipeline_Send_Result | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_State = 'delivered' | 'discarded' | 'queued';

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Handle Error.
 *
 * @since 2.2.1
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_NotificationPosition = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_NotificationDeliveryId = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_NotificationPayload = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_NotificationAttemptCount = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_NotificationDiagnosticConfig = string | null;

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_NotificationCreatedAt = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_Notification = {
  position: Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_NotificationPosition;
  deliveryId: Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_NotificationDeliveryId;
  payload: Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_NotificationPayload;
  attemptCount: Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_NotificationAttemptCount;
  diagnosticConfig: Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_NotificationDiagnosticConfig;
  createdAt: Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_NotificationCreatedAt;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_Err = unknown;

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_Returns = Promise<Worker_Pipeline_DrainFifo_Action>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_Classification = 'permanent' | 'transient';

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_Reason = string;

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Handle Failure.
 *
 * @since 2.4.0
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_NotificationPosition = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_NotificationDeliveryId = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_NotificationPayload = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_NotificationAttemptCount = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_NotificationDiagnosticConfig = string | null;

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_NotificationCreatedAt = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_Notification = {
  position: Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_NotificationPosition;
  deliveryId: Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_NotificationDeliveryId;
  payload: Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_NotificationPayload;
  attemptCount: Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_NotificationAttemptCount;
  diagnosticConfig: Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_NotificationDiagnosticConfig;
  createdAt: Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_NotificationCreatedAt;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_SendResult = Worker_Pipeline_Send_Result;

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_Returns = Promise<Worker_Pipeline_DrainFifo_Action>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_SelectedResult = Worker_Pipeline_Send_ServerResult | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_Classification = 'permanent' | 'transient';

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_Status = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_Transient = boolean;

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_Permanent = boolean;

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_MissingResultReason = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_HttpStatus = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_Reason = string;

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Peek.
 *
 * @since 2.2.1
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_Peek_ReturnsPosition = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Peek_ReturnsDeliveryId = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Peek_ReturnsPayload = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Peek_ReturnsAttemptCount = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Peek_ReturnsDiagnosticConfig = string | null;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Peek_ReturnsCreatedAt = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Peek_Returns = {
  position: Worker_DurableObjects_DeliveryOutbox_Runner_Peek_ReturnsPosition;
  deliveryId: Worker_DurableObjects_DeliveryOutbox_Runner_Peek_ReturnsDeliveryId;
  payload: Worker_DurableObjects_DeliveryOutbox_Runner_Peek_ReturnsPayload;
  attemptCount: Worker_DurableObjects_DeliveryOutbox_Runner_Peek_ReturnsAttemptCount;
  diagnosticConfig: Worker_DurableObjects_DeliveryOutbox_Runner_Peek_ReturnsDiagnosticConfig;
  createdAt: Worker_DurableObjects_DeliveryOutbox_Runner_Peek_ReturnsCreatedAt;
} | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Peek_RowsItemPosition = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Peek_RowsItemDeliveryId = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Peek_RowsItemPayload = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Peek_RowsItemAttemptCount = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Peek_RowsItemDiagnosticConfig = string | null;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Peek_RowsItemCreatedAt = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Peek_RowsItem = {
  position: Worker_DurableObjects_DeliveryOutbox_Runner_Peek_RowsItemPosition;
  deliveryId: Worker_DurableObjects_DeliveryOutbox_Runner_Peek_RowsItemDeliveryId;
  payload: Worker_DurableObjects_DeliveryOutbox_Runner_Peek_RowsItemPayload;
  attemptCount: Worker_DurableObjects_DeliveryOutbox_Runner_Peek_RowsItemAttemptCount;
  diagnosticConfig: Worker_DurableObjects_DeliveryOutbox_Runner_Peek_RowsItemDiagnosticConfig;
  createdAt: Worker_DurableObjects_DeliveryOutbox_Runner_Peek_RowsItemCreatedAt;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_Peek_Rows = Worker_DurableObjects_DeliveryOutbox_Runner_Peek_RowsItem[];

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Read Attachment.
 *
 * @since 2.2.1
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_DeliveryId = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_HasAttachment = boolean;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_Returns = ArrayBuffer | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_RowsItemContent = ArrayBuffer;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_RowsItem = {
  content: Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_RowsItemContent;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_Rows = Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_RowsItem[];

export type Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_TotalBytes = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_Bytes = Uint8Array;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_Offset = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_ChunkBytes = Uint8Array;

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Read Completed Stages.
 *
 * @since 2.2.1
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_ReadCompletedStages_DeliveryId = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ReadCompletedStages_Returns = Record<string, string[]>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ReadCompletedStages_RowsItemServerName = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ReadCompletedStages_RowsItemStage = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ReadCompletedStages_RowsItem = {
  server_name: Worker_DurableObjects_DeliveryOutbox_Runner_ReadCompletedStages_RowsItemServerName;
  stage: Worker_DurableObjects_DeliveryOutbox_Runner_ReadCompletedStages_RowsItemStage;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_ReadCompletedStages_Rows = Worker_DurableObjects_DeliveryOutbox_Runner_ReadCompletedStages_RowsItem[];

export type Worker_DurableObjects_DeliveryOutbox_Runner_ReadCompletedStages_CompletedStages = Record<string, string[]>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ReadCompletedStages_ServerStages = string[];

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Record Failure.
 *
 * @since 2.4.0
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_NotificationPosition = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_NotificationDeliveryId = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_NotificationPayload = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_NotificationAttemptCount = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_NotificationDiagnosticConfig = string | null;

export type Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_NotificationCreatedAt = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_Notification = {
  position: Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_NotificationPosition;
  deliveryId: Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_NotificationDeliveryId;
  payload: Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_NotificationPayload;
  attemptCount: Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_NotificationAttemptCount;
  diagnosticConfig: Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_NotificationDiagnosticConfig;
  createdAt: Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_NotificationCreatedAt;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_Classification = 'permanent' | 'transient';

export type Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_Reason = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_HttpStatus = number | null;

export type Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_Returns = Promise<Worker_Pipeline_DrainFifo_Action>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_CurrentTime = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_AttemptCount = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_AgeMilliseconds = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_Discarded = boolean;

export type Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_Debug = 'delivery_outbox_discarded' | 'delivery_outbox_retry';

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Remove.
 *
 * @since 2.2.1
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_Remove_NotificationPosition = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Remove_NotificationDeliveryId = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Remove_NotificationPayload = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Remove_Notification = {
  position: Worker_DurableObjects_DeliveryOutbox_Runner_Remove_NotificationPosition;
  deliveryId: Worker_DurableObjects_DeliveryOutbox_Runner_Remove_NotificationDeliveryId;
  payload: Worker_DurableObjects_DeliveryOutbox_Runner_Remove_NotificationPayload;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_Remove_Returns = void;

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Resolve Servers.
 *
 * @since 2.2.1
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_PayloadServerNames = string[];

export type Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_PayloadPrimaryServerName = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_Payload = {
  serverNames: Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_PayloadServerNames;
  primaryServerName: Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_PayloadPrimaryServerName;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_ReturnsServers = Array<Lib_Schema_ServerConfig>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_ReturnsPrimaryServer = Lib_Schema_ServerConfig & {};

export type Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_Returns = {
  servers: Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_ReturnsServers;
  primaryServer: Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_ReturnsPrimaryServer;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_ResolvedServers = Array<Lib_Schema_ServerConfig>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_Server = Lib_Schema_ServerConfig | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_ServerError = Error;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_PrimaryServer = Lib_Schema_ServerConfig | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_PrimaryServerError = Error;

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Schedule Retry.
 *
 * @since 2.4.0
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_ScheduleRetry_AttemptCount = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ScheduleRetry_Returns = Promise<void>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ScheduleRetry_ExistingAlarm = number | null;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ScheduleRetry_Exponent = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ScheduleRetry_Delay = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ScheduleRetry_ScheduledTime = number;

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Send Discard Diagnostic.
 *
 * @since 2.4.0
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_NotificationPosition = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_NotificationDeliveryId = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_NotificationPayload = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_NotificationAttemptCount = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_NotificationDiagnosticConfig = string | null;

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_NotificationCreatedAt = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_Notification = {
  position: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_NotificationPosition;
  deliveryId: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_NotificationDeliveryId;
  payload: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_NotificationPayload;
  attemptCount: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_NotificationAttemptCount;
  diagnosticConfig: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_NotificationDiagnosticConfig;
  createdAt: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_NotificationCreatedAt;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_Reason = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_HttpStatus = number | null;

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttemptCount = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AgeMilliseconds = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_Returns = Promise<void>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_DiagnosticConfigServerNames = string[];

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_DiagnosticConfigPrimaryServerName = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_DiagnosticConfigMode = 'send-once' | 'send-all';

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_DiagnosticConfigContextName = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_DiagnosticConfigInterpreterName = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_DiagnosticConfigErrorTopic = string | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_DiagnosticConfig = {
  serverNames: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_DiagnosticConfigServerNames;
  primaryServerName: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_DiagnosticConfigPrimaryServerName;
  mode: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_DiagnosticConfigMode;
  contextName: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_DiagnosticConfigContextName;
  interpreterName: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_DiagnosticConfigInterpreterName;
  errorTopic?: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_DiagnosticConfigErrorTopic;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_ResolvedServers = Array<Lib_Schema_ServerConfig & {}>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_Server = Lib_Schema_ServerConfig | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_PrimaryServer = Lib_Schema_ServerConfig | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttachmentDataTimestamp = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttachmentDataContextName = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttachmentDataContextInterpreter = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttachmentDataContextStage = 'delivery';

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttachmentDataContext = {
  name: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttachmentDataContextName;
  interpreter: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttachmentDataContextInterpreter;
  stage: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttachmentDataContextStage;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttachmentDataDeliveryId = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttachmentDataReason = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttachmentDataHttpStatus = number | null;

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttachmentDataAttemptCount = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttachmentDataAgeMs = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttachmentData = {
  timestamp: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttachmentDataTimestamp;
  context: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttachmentDataContext;
  delivery_id: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttachmentDataDeliveryId;
  reason: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttachmentDataReason;
  http_status: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttachmentDataHttpStatus;
  attempt_count: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttachmentDataAttemptCount;
  age_ms: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttachmentDataAgeMs;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttachmentJson = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_Attachment = ArrayBuffer;

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Succeeded.
 *
 * @since 2.2.1
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_NotificationPosition = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_NotificationDeliveryId = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_NotificationPayload = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_Notification = {
  position: Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_NotificationPosition;
  deliveryId: Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_NotificationDeliveryId;
  payload: Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_NotificationPayload;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_SendResult = Worker_Pipeline_Send_Result & {};

export type Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_Returns = boolean;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_PayloadMode = 'send-once' | 'send-all';

export type Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_Payload = {
  mode: Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_PayloadMode;
};

/**
 * Worker - Durable Objects - Delivery Outbox - Set Configured Servers.
 *
 * @since 2.3.0
 */
export type Worker_DurableObjects_DeliveryOutbox_SetConfiguredServers_Servers = Array<Lib_Schema_ServerConfig>;

export type Worker_DurableObjects_DeliveryOutbox_SetConfiguredServers_Returns = void;

import type { Lib_Schema_ServerConfig } from '../../lib/schema.d.ts';
import type {
  Worker_Pipeline_Deliver_EnqueueOptions,
  Worker_Pipeline_Deliver_Result,
} from '../pipeline/deliver.d.ts';
import type { Worker_Pipeline_Send_Result } from '../pipeline/send.d.ts';

/**
 * Worker - Durable Objects - Delivery Outbox - Attachment Chunk Bytes.
 *
 * @since UNRELEASED
 */
export type Worker_DurableObjects_DeliveryOutbox_AttachmentChunkBytes = number;

/**
 * Worker - Durable Objects - Delivery Outbox - Delivery Succeeded.
 *
 * @since UNRELEASED
 */
export type Worker_DurableObjects_DeliveryOutbox_DeliverySucceeded_Mode = 'send-once' | 'send-all';

export type Worker_DurableObjects_DeliveryOutbox_DeliverySucceeded_SendResult = Worker_Pipeline_Send_Result & {};

export type Worker_DurableObjects_DeliveryOutbox_DeliverySucceeded_Returns = boolean;

/**
 * Worker - Durable Objects - Delivery Outbox - Runner.
 *
 * @since UNRELEASED
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_EnvServers = string | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Env = {
  SERVERS?: Worker_DurableObjects_DeliveryOutbox_Runner_EnvServers;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_DrainPromise = Promise<Map<string, Worker_Pipeline_Send_Result>> | undefined;

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Attempt.
 *
 * @since UNRELEASED
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

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadMessages = Worker_Pipeline_Deliver_EnqueueOptions['messages'];

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadServerNames = string[];

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadPrimaryServerName = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadTopic = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadMode = 'send-once' | 'send-all';

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadVisitorIp = string | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadFilename = string | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadAttachmentHeaders = Record<string, string> | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadHasAttachment = boolean;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Payload = {
  messages: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadMessages;
  serverNames: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadServerNames;
  primaryServerName: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadPrimaryServerName;
  topic: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadTopic;
  mode: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadMode;
  visitorIp?: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadVisitorIp;
  filename?: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_PayloadFilename;
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

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Checkpoint.
 *
 * @since UNRELEASED
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_Checkpoint_DeliveryId = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Checkpoint_ServerName = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Checkpoint_Stage = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Checkpoint_Returns = void;

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Constructor.
 *
 * @since UNRELEASED
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_Ctx = DurableObjectState;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_EnvServers = string | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_Env = {
  SERVERS?: Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_EnvServers;
};

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Delete.
 *
 * @since UNRELEASED
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_Delete_DeliveryId = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Delete_Returns = void;

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Drain.
 *
 * @since UNRELEASED
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_Drain_Returns = Promise<Map<string, Worker_Pipeline_Send_Result>>;

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Enqueue.
 *
 * @since UNRELEASED
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Options = Worker_Pipeline_Deliver_EnqueueOptions & {};

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Returns = Promise<Worker_Pipeline_Deliver_Result>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_DeliveryId = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadMessages = Worker_Pipeline_Deliver_EnqueueOptions['messages'];

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadServerNames = string[];

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadPrimaryServerName = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadTopic = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadMode = 'send-once' | 'send-all';

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadVisitorIp = string | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadFilename = string | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadAttachmentHeaders = Record<string, string> | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadHasAttachment = boolean;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Payload = {
  messages: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadMessages;
  serverNames: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadServerNames;
  primaryServerName: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadPrimaryServerName;
  topic: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadTopic;
  mode: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadMode;
  visitorIp?: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadVisitorIp;
  filename?: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadFilename;
  attachmentHeaders?: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadAttachmentHeaders;
  hasAttachment: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadHasAttachment;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadJson = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_AttachmentBytes = Uint8Array | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_ChunkIndex = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Offset = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Chunk = ArrayBuffer;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_StartedDrain = Promise<Map<string, Worker_Pipeline_Send_Result>>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_AttemptResults = Map<string, Worker_Pipeline_Send_Result>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PendingRowPending = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PendingRow = {
  pending: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PendingRowPending;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_QueuedRowQueued = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_QueuedRow = {
  queued: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_QueuedRowQueued;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_SendResult = Worker_Pipeline_Send_Result | undefined;

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Handle Error.
 *
 * @since UNRELEASED
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_NotificationPosition = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_NotificationDeliveryId = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_NotificationPayload = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_Notification = {
  position: Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_NotificationPosition;
  deliveryId: Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_NotificationDeliveryId;
  payload: Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_NotificationPayload;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_Err = unknown;

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_Returns = void;

export type Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_ErrorMessage = string;

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Peek.
 *
 * @since UNRELEASED
 */
export type Worker_DurableObjects_DeliveryOutbox_Runner_Peek_ReturnsPosition = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Peek_ReturnsDeliveryId = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Peek_ReturnsPayload = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Peek_Returns = {
  position: Worker_DurableObjects_DeliveryOutbox_Runner_Peek_ReturnsPosition;
  deliveryId: Worker_DurableObjects_DeliveryOutbox_Runner_Peek_ReturnsDeliveryId;
  payload: Worker_DurableObjects_DeliveryOutbox_Runner_Peek_ReturnsPayload;
} | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Peek_RowsItemPosition = number;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Peek_RowsItemDeliveryId = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Peek_RowsItemPayload = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_Peek_RowsItem = {
  position: Worker_DurableObjects_DeliveryOutbox_Runner_Peek_RowsItemPosition;
  deliveryId: Worker_DurableObjects_DeliveryOutbox_Runner_Peek_RowsItemDeliveryId;
  payload: Worker_DurableObjects_DeliveryOutbox_Runner_Peek_RowsItemPayload;
};

export type Worker_DurableObjects_DeliveryOutbox_Runner_Peek_Rows = Worker_DurableObjects_DeliveryOutbox_Runner_Peek_RowsItem[];

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Read Attachment.
 *
 * @since UNRELEASED
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
 * @since UNRELEASED
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
 * Worker - Durable Objects - Delivery Outbox - Runner - Remove.
 *
 * @since UNRELEASED
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
 * @since UNRELEASED
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

export type Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_ServersJson = string;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_Servers = Array<Lib_Schema_ServerConfig>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_ResolvedServers = Array<Lib_Schema_ServerConfig>;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_Server = Lib_Schema_ServerConfig | undefined;

export type Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_PrimaryServer = Lib_Schema_ServerConfig | undefined;

/**
 * Worker - Durable Objects - Delivery Outbox - Runner - Succeeded.
 *
 * @since UNRELEASED
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

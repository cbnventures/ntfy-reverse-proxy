import { DurableObject } from 'cloudflare:workers';

import { Runner as NtfyClient } from '../ntfy-client.js';
import { drainFifo } from '../pipeline/drain-fifo.js';
import { send } from '../pipeline/send.js';

import type {
  Worker_DurableObjects_DeliveryOutbox_AttachmentChunkBytes,
  Worker_DurableObjects_DeliveryOutbox_ConfiguredServers,
  Worker_DurableObjects_DeliveryOutbox_DeliveryAttemptMinimum,
  Worker_DurableObjects_DeliveryOutbox_DeliveryFailureMaxAgeMilliseconds,
  Worker_DurableObjects_DeliveryOutbox_DeliveryRetryBaseMilliseconds,
  Worker_DurableObjects_DeliveryOutbox_DeliveryRetryMaxMilliseconds,
  Worker_DurableObjects_DeliveryOutbox_DeliverySucceeded_Mode,
  Worker_DurableObjects_DeliveryOutbox_DeliverySucceeded_Returns,
  Worker_DurableObjects_DeliveryOutbox_DeliverySucceeded_SendResult,
  Worker_DurableObjects_DeliveryOutbox_MissingServerErrorName,
  Worker_DurableObjects_DeliveryOutbox_Runner_Alarm_ActiveDrain,
  Worker_DurableObjects_DeliveryOutbox_Runner_Alarm_Returns,
  Worker_DurableObjects_DeliveryOutbox_Runner_Alarm_StartedDrain,
  Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Attachment,
  Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_AttachmentTitle,
  Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_CompletedStages,
  Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Notification,
  Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Payload,
  Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Resolved,
  Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Returns,
  Worker_DurableObjects_DeliveryOutbox_Runner_Checkpoint_DeliveryId,
  Worker_DurableObjects_DeliveryOutbox_Runner_Checkpoint_Returns,
  Worker_DurableObjects_DeliveryOutbox_Runner_Checkpoint_ServerName,
  Worker_DurableObjects_DeliveryOutbox_Runner_Checkpoint_Stage,
  Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_AttemptCountColumn,
  Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_Ctx,
  Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_DiagnosticConfigColumn,
  Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_Env,
  Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_NotificationColumns,
  Worker_DurableObjects_DeliveryOutbox_Runner_ContinueDrain_CurrentDrain,
  Worker_DurableObjects_DeliveryOutbox_Runner_ContinueDrain_PreviousDrain,
  Worker_DurableObjects_DeliveryOutbox_Runner_ContinueDrain_Returns,
  Worker_DurableObjects_DeliveryOutbox_Runner_Delete_DeliveryId,
  Worker_DurableObjects_DeliveryOutbox_Runner_Delete_Returns,
  Worker_DurableObjects_DeliveryOutbox_Runner_Drain_DrainResult,
  Worker_DurableObjects_DeliveryOutbox_Runner_Drain_PendingNotification,
  Worker_DurableObjects_DeliveryOutbox_Runner_Drain_Returns,
  Worker_DurableObjects_DeliveryOutbox_Runner_DrainPromise,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_AttachmentBytes,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_AttemptResults,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Chunk,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_ChunkIndex,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_DeliveryId,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_DiagnosticConfig,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_DiagnosticConfigJson,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Offset,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Options,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Payload,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadJson,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PendingRow,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_QueuedRow,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Returns,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_SendResult,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_StartedDrain,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_State,
  Worker_DurableObjects_DeliveryOutbox_Runner_Env,
  Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_Classification,
  Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_Err,
  Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_Notification,
  Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_Reason,
  Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_Returns,
  Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_Classification,
  Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_HttpStatus,
  Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_MissingResultReason,
  Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_Notification,
  Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_Permanent,
  Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_Reason,
  Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_Returns,
  Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_SelectedResult,
  Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_SendResult,
  Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_Status,
  Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_Transient,
  Worker_DurableObjects_DeliveryOutbox_Runner_Peek_Returns,
  Worker_DurableObjects_DeliveryOutbox_Runner_Peek_Rows,
  Worker_DurableObjects_DeliveryOutbox_Runner_Peek_RowsItem,
  Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_Bytes,
  Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_ChunkBytes,
  Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_DeliveryId,
  Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_HasAttachment,
  Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_Offset,
  Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_Returns,
  Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_Rows,
  Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_RowsItem,
  Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_TotalBytes,
  Worker_DurableObjects_DeliveryOutbox_Runner_ReadCompletedStages_CompletedStages,
  Worker_DurableObjects_DeliveryOutbox_Runner_ReadCompletedStages_DeliveryId,
  Worker_DurableObjects_DeliveryOutbox_Runner_ReadCompletedStages_Returns,
  Worker_DurableObjects_DeliveryOutbox_Runner_ReadCompletedStages_Rows,
  Worker_DurableObjects_DeliveryOutbox_Runner_ReadCompletedStages_RowsItem,
  Worker_DurableObjects_DeliveryOutbox_Runner_ReadCompletedStages_ServerStages,
  Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_AgeMilliseconds,
  Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_AttemptCount,
  Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_Classification,
  Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_CurrentTime,
  Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_Debug,
  Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_Discarded,
  Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_HttpStatus,
  Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_Notification,
  Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_Reason,
  Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_Returns,
  Worker_DurableObjects_DeliveryOutbox_Runner_Remove_Notification,
  Worker_DurableObjects_DeliveryOutbox_Runner_Remove_Returns,
  Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_Payload,
  Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_PrimaryServer,
  Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_PrimaryServerError,
  Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_ResolvedServers,
  Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_Returns,
  Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_Server,
  Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_ServerError,
  Worker_DurableObjects_DeliveryOutbox_Runner_ScheduleRetry_AttemptCount,
  Worker_DurableObjects_DeliveryOutbox_Runner_ScheduleRetry_Delay,
  Worker_DurableObjects_DeliveryOutbox_Runner_ScheduleRetry_ExistingAlarm,
  Worker_DurableObjects_DeliveryOutbox_Runner_ScheduleRetry_Exponent,
  Worker_DurableObjects_DeliveryOutbox_Runner_ScheduleRetry_Returns,
  Worker_DurableObjects_DeliveryOutbox_Runner_ScheduleRetry_ScheduledTime,
  Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AgeMilliseconds,
  Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_Attachment,
  Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttachmentData,
  Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttachmentJson,
  Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttemptCount,
  Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_DiagnosticConfig,
  Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_HttpStatus,
  Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_Notification,
  Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_PrimaryServer,
  Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_Reason,
  Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_ResolvedServers,
  Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_Returns,
  Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_Server,
  Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_Notification,
  Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_Payload,
  Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_Returns,
  Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_SendResult,
  Worker_DurableObjects_DeliveryOutbox_SetConfiguredServers_Returns,
  Worker_DurableObjects_DeliveryOutbox_SetConfiguredServers_Servers,
} from '../../types/worker/durable-objects/delivery-outbox.d.ts';

/**
 * Worker - Durable Objects - Delivery Outbox - Delivery Attempt Minimum.
 *
 * Requires several transient attempts before an old notification may expire.
 * Incoming posts therefore cannot discard a fresh notification by themselves.
 *
 * @since 2.4.0
 */
const deliveryAttemptMinimum: Worker_DurableObjects_DeliveryOutbox_DeliveryAttemptMinimum = 3;

/**
 * Worker - Durable Objects - Delivery Outbox - Delivery Failure Max Age Milliseconds.
 *
 * Bounds transient delivery retention at 24 hours from the row's creation.
 * The age gate works with rows already queued by earlier releases.
 *
 * @since 2.4.0
 */
const deliveryFailureMaxAgeMilliseconds: Worker_DurableObjects_DeliveryOutbox_DeliveryFailureMaxAgeMilliseconds = 24 * 60 * 60 * 1000;

/**
 * Worker - Durable Objects - Delivery Outbox - Delivery Retry Base Milliseconds.
 *
 * Starts alarm-driven transient retries after one minute.
 * Later failures increase this delay without creating extra alarms.
 *
 * @since 2.4.0
 */
const deliveryRetryBaseMilliseconds: Worker_DurableObjects_DeliveryOutbox_DeliveryRetryBaseMilliseconds = 60 * 1000;

/**
 * Worker - Durable Objects - Delivery Outbox - Delivery Retry Max Milliseconds.
 *
 * Caps alarm backoff at one hour so recovery is detected without request traffic.
 * The single Durable Object alarm remains the only scheduled retry per lane.
 *
 * @since 2.4.0
 */
const deliveryRetryMaxMilliseconds: Worker_DurableObjects_DeliveryOutbox_DeliveryRetryMaxMilliseconds = 60 * 60 * 1000;

/**
 * Worker - Durable Objects - Delivery Outbox - Missing Server Error Name.
 *
 * Marks configuration drift as permanent without depending on message text.
 * Error handling uses this name when a queued server was removed or renamed.
 *
 * @since 2.4.0
 */
const missingServerErrorName: Worker_DurableObjects_DeliveryOutbox_MissingServerErrorName = 'DeliveryOutboxMissingServerError';

/**
 * Worker - Durable Objects - Delivery Outbox - Attachment Chunk Bytes.
 *
 * Keeps every SQLite BLOB safely below Cloudflare's
 * per-value limit for Durable Object storage.
 *
 * @since 2.2.1
 */
const attachmentChunkBytes: Worker_DurableObjects_DeliveryOutbox_AttachmentChunkBytes = 1024 * 1024;

/**
 * Worker - Durable Objects - Delivery Outbox - Configured Servers.
 *
 * Servers from the config bundled into the Worker, handed over once by createWorker
 * when it validates the config at startup. Stored server names resolve against them.
 *
 * @since 2.3.0
 */
let configuredServers: Worker_DurableObjects_DeliveryOutbox_ConfiguredServers = [];

/**
 * Worker - Durable Objects - Delivery Outbox - Delivery Succeeded.
 *
 * Evaluates the success condition for send-once and
 * send-all delivery without mutating its result.
 *
 * @param {Worker_DurableObjects_DeliveryOutbox_DeliverySucceeded_Mode}       mode       - Mode.
 * @param {Worker_DurableObjects_DeliveryOutbox_DeliverySucceeded_SendResult} sendResult - Send result.
 *
 * @returns {Worker_DurableObjects_DeliveryOutbox_DeliverySucceeded_Returns}
 *
 * @since 2.2.1
 */
function deliverySucceeded(mode: Worker_DurableObjects_DeliveryOutbox_DeliverySucceeded_Mode, sendResult: Worker_DurableObjects_DeliveryOutbox_DeliverySucceeded_SendResult): Worker_DurableObjects_DeliveryOutbox_DeliverySucceeded_Returns {
  if (mode === 'send-all') {
    return sendResult['results'].length > 0 && sendResult['results'].every((result) => result['success'] === true);
  }

  return sendResult['results'].some((result) => result['success'] === true);
}

/**
 * Worker - Durable Objects - Delivery Outbox.
 *
 * Owns one SQLite-backed FIFO lane per configured context.
 * Transient heads retry through one backoff alarm even without new traffic.
 *
 * @since 2.4.0
 */
class Runner extends DurableObject<Worker_DurableObjects_DeliveryOutbox_Runner_Env> {
  /**
   * Active drain shared by requests that interleave in this object instance.
   *
   * Serializes attempts so each new notification gets one chance to
   * drain its context lane after any earlier attempt finishes.
   *
   * @private
   *
   * @since 2.2.1
   */
  #drainPromise: Worker_DurableObjects_DeliveryOutbox_Runner_DrainPromise;

  /**
   * Worker - Durable Objects - Delivery Outbox - Constructor.
   *
   * Initializes the SQLite tables and upgrades existing notification lanes.
   * Persisted retry and diagnostic metadata remain compatible with old rows.
   *
   * @since 2.4.0
   */
  public constructor(ctx: Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_Ctx, env: Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_Env) {
    super(ctx, env);

    this.#drainPromise = undefined;

    this['ctx']['storage']['sql'].exec([
      'CREATE TABLE IF NOT EXISTS notifications (',
      'position INTEGER PRIMARY KEY AUTOINCREMENT,',
      'delivery_id TEXT UNIQUE NOT NULL,',
      'payload TEXT NOT NULL,',
      'attempt_count INTEGER NOT NULL DEFAULT 0,',
      'diagnostic_config TEXT,',
      'created_at INTEGER NOT NULL',
      ')',
    ].join('\n'));

    const notificationColumns: Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_NotificationColumns = this['ctx']['storage']['sql'].exec<Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_NotificationColumns[number]>('PRAGMA table_info(notifications)').toArray();
    const attemptCountColumn: Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_AttemptCountColumn = notificationColumns.find((notificationColumn) => notificationColumn['name'] === 'attempt_count');
    const diagnosticConfigColumn: Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_DiagnosticConfigColumn = notificationColumns.find((notificationColumn) => notificationColumn['name'] === 'diagnostic_config');

    if (attemptCountColumn === undefined) {
      this['ctx']['storage']['sql'].exec('ALTER TABLE notifications ADD COLUMN attempt_count INTEGER NOT NULL DEFAULT 0');
    }

    if (diagnosticConfigColumn === undefined) {
      this['ctx']['storage']['sql'].exec('ALTER TABLE notifications ADD COLUMN diagnostic_config TEXT');
    }

    this['ctx']['storage']['sql'].exec([
      'CREATE TABLE IF NOT EXISTS attachment_chunks (',
      'delivery_id TEXT NOT NULL,',
      'chunk_index INTEGER NOT NULL,',
      'content BLOB NOT NULL,',
      'PRIMARY KEY (delivery_id, chunk_index)',
      ')',
    ].join('\n'));

    this['ctx']['storage']['sql'].exec([
      'CREATE TABLE IF NOT EXISTS delivery_progress (',
      'delivery_id TEXT NOT NULL,',
      'server_name TEXT NOT NULL,',
      'stage TEXT NOT NULL,',
      'PRIMARY KEY (delivery_id, server_name, stage)',
      ')',
    ].join('\n'));

    return;
  }

  /**
   * Worker - Durable Objects - Delivery Outbox - Alarm.
   *
   * Retries a transient lane head without waiting for another notification.
   * An active request drain already owns the lane and satisfies this alarm.
   *
   * @returns {Worker_DurableObjects_DeliveryOutbox_Runner_Alarm_Returns}
   *
   * @since 2.4.0
   */
  public override async alarm(): Worker_DurableObjects_DeliveryOutbox_Runner_Alarm_Returns {
    const activeDrain: Worker_DurableObjects_DeliveryOutbox_Runner_Alarm_ActiveDrain = this.#drainPromise;

    if (activeDrain !== undefined) {
      await activeDrain;

      return;
    }

    const startedDrain: Worker_DurableObjects_DeliveryOutbox_Runner_Alarm_StartedDrain = this.#drain();

    this.#drainPromise = startedDrain;

    try {
      await startedDrain;
    } finally {
      if (this.#drainPromise === startedDrain) {
        this.#drainPromise = undefined;
      }
    }

    return;
  }

  /**
   * Worker - Durable Objects - Delivery Outbox - Enqueue.
   *
   * Persists a notification and then joins its context's serialized FIFO drain.
   * Chained callers retain discard outcomes produced by an earlier active drain.
   *
   * @param {Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Options} options - Options.
   *
   * @returns {Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Returns}
   *
   * @since 2.2.1
   */
  public async enqueue(options: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Options): Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Returns {
    const deliveryId: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_DeliveryId = crypto.randomUUID();
    const diagnosticConfig: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_DiagnosticConfig = {
      serverNames: options['serverNames'],
      primaryServerName: options['primaryServerName'],
      mode: options['mode'],
      contextName: options['contextName'],
      interpreterName: options['interpreterName'],
      ...((options['errorTopic'] !== undefined) ? { errorTopic: options['errorTopic'] } : {}),
    };
    const diagnosticConfigJson: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_DiagnosticConfigJson = JSON.stringify(diagnosticConfig);
    const payload: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Payload = {
      messages: options['messages'],
      serverNames: options['serverNames'],
      primaryServerName: options['primaryServerName'],
      topic: options['topic'],
      mode: options['mode'],
      ...((options['visitorIp'] !== undefined) ? { visitorIp: options['visitorIp'] } : {}),
      ...((options['filename'] !== undefined) ? { filename: options['filename'] } : {}),
      ...((options['attachmentTitle'] !== undefined) ? { attachmentTitle: options['attachmentTitle'] } : {}),
      hasAttachment: options['attachment'] !== undefined,
    };
    const payloadJson: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadJson = JSON.stringify(payload);
    const attachmentBytes: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_AttachmentBytes = (options['attachment'] === undefined) ? undefined : new Uint8Array(options['attachment']);

    this['ctx']['storage'].transactionSync(() => {
      this['ctx']['storage']['sql'].exec(
        'INSERT INTO notifications (delivery_id, payload, diagnostic_config, created_at) VALUES (?, ?, ?, ?)',
        deliveryId,
        payloadJson,
        diagnosticConfigJson,
        Date.now(),
      );

      if (attachmentBytes !== undefined) {
        let chunkIndex: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_ChunkIndex = 0;

        for (let offset: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Offset = 0; offset < attachmentBytes.length; offset += attachmentChunkBytes) {
          const chunk: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Chunk = attachmentBytes.slice(offset, offset + attachmentChunkBytes).buffer;

          this['ctx']['storage']['sql'].exec(
            'INSERT INTO attachment_chunks (delivery_id, chunk_index, content) VALUES (?, ?, ?)',
            deliveryId,
            chunkIndex,
            chunk,
          );

          chunkIndex += 1;
        }
      }

      return;
    });

    const startedDrain: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_StartedDrain = (this.#drainPromise === undefined) ? this.#drain() : this.#drainPromise.then(this.#continueDrain.bind(this));

    this.#drainPromise = startedDrain;

    try {
      const attemptResults: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_AttemptResults = await startedDrain;
      const pendingRow: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PendingRow = this['ctx']['storage']['sql'].exec<Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PendingRow>('SELECT COUNT(*) AS pending FROM notifications').one();
      const queuedRow: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_QueuedRow = this['ctx']['storage']['sql'].exec<Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_QueuedRow>('SELECT COUNT(*) AS queued FROM notifications WHERE delivery_id = ?', deliveryId).one();
      const sendResult: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_SendResult = attemptResults['results'].get(deliveryId);
      let state: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_State = 'delivered';

      if (queuedRow['queued'] > 0) {
        state = 'queued';
      } else if (attemptResults['discardedIds'].has(deliveryId) === true) {
        state = 'discarded';
      }

      return {
        deliveryId,
        state,
        pending: pendingRow['pending'],
        ...((sendResult !== undefined) ? { sendResult } : {}),
      };
    } finally {
      if (this.#drainPromise === startedDrain) {
        this.#drainPromise = undefined;
      }
    }
  }

  /**
   * Worker - Durable Objects - Delivery Outbox - Runner - Continue Drain.
   *
   * Extends a serialized drain while preserving outcomes for rows it consumed.
   * Concurrent enqueue callers can therefore identify their own discarded row.
   *
   * @param {Worker_DurableObjects_DeliveryOutbox_Runner_ContinueDrain_PreviousDrain} previousDrain - Previous drain.
   *
   * @private
   *
   * @returns {Worker_DurableObjects_DeliveryOutbox_Runner_ContinueDrain_Returns}
   *
   * @since 2.4.0
   */
  async #continueDrain(previousDrain: Worker_DurableObjects_DeliveryOutbox_Runner_ContinueDrain_PreviousDrain): Worker_DurableObjects_DeliveryOutbox_Runner_ContinueDrain_Returns {
    const currentDrain: Worker_DurableObjects_DeliveryOutbox_Runner_ContinueDrain_CurrentDrain = await this.#drain();

    for (const resultEntry of currentDrain['results']) {
      previousDrain['results'].set(resultEntry[0], resultEntry[1]);
    }

    for (const discardedId of currentDrain['discardedIds']) {
      previousDrain['discardedIds'].add(discardedId);
    }

    return previousDrain;
  }

  /**
   * Worker - Durable Objects - Delivery Outbox - Runner - Read Attachment.
   *
   * Reassembles a stored attachment from SQLite-safe chunks
   * while preserving the original byte order.
   *
   * @private
   *
   * @returns {Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_Returns}
   *
   * @since 2.2.1
   */
  #readAttachment(deliveryId: Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_DeliveryId, hasAttachment: Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_HasAttachment): Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_Returns {
    if (hasAttachment === false) {
      return undefined;
    }

    const rows: Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_Rows = this['ctx']['storage']['sql'].exec<Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_RowsItem>(
      'SELECT content FROM attachment_chunks WHERE delivery_id = ? ORDER BY chunk_index ASC',
      deliveryId,
    ).toArray();
    const totalBytes: Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_TotalBytes = rows.reduce((total, row) => total + row['content'].byteLength, 0);
    const bytes: Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_Bytes = new Uint8Array(totalBytes);
    let offset: Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_Offset = 0;

    for (const row of rows) {
      const chunkBytes: Worker_DurableObjects_DeliveryOutbox_Runner_ReadAttachment_ChunkBytes = new Uint8Array(row['content']);

      bytes.set(chunkBytes, offset);
      offset += chunkBytes.length;
    }

    return bytes.buffer as ArrayBuffer;
  }

  /**
   * Worker - Durable Objects - Delivery Outbox - Runner - Read Completed Stages.
   *
   * Loads confirmed ntfy stages so a retry only sends
   * unfinished work for each configured server.
   *
   * @private
   *
   * @returns {Worker_DurableObjects_DeliveryOutbox_Runner_ReadCompletedStages_Returns}
   *
   * @since 2.2.1
   */
  #readCompletedStages(deliveryId: Worker_DurableObjects_DeliveryOutbox_Runner_ReadCompletedStages_DeliveryId): Worker_DurableObjects_DeliveryOutbox_Runner_ReadCompletedStages_Returns {
    const rows: Worker_DurableObjects_DeliveryOutbox_Runner_ReadCompletedStages_Rows = this['ctx']['storage']['sql'].exec<Worker_DurableObjects_DeliveryOutbox_Runner_ReadCompletedStages_RowsItem>(
      'SELECT server_name, stage FROM delivery_progress WHERE delivery_id = ? ORDER BY server_name ASC, stage ASC',
      deliveryId,
    ).toArray();
    const completedStages: Worker_DurableObjects_DeliveryOutbox_Runner_ReadCompletedStages_CompletedStages = {};

    for (const row of rows) {
      const serverStages: Worker_DurableObjects_DeliveryOutbox_Runner_ReadCompletedStages_ServerStages = completedStages[row['server_name']] ?? [];

      serverStages.push(row['stage']);

      Reflect.set(completedStages, row['server_name'], serverStages);
    }

    return completedStages;
  }

  /**
   * Worker - Durable Objects - Delivery Outbox - Runner - Resolve Servers.
   *
   * Resolves stored server names against the current Worker
   * configuration so tokens are never persisted in the outbox.
   *
   * @private
   *
   * @returns {Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_Returns}
   *
   * @since 2.2.1
   */
  #resolveServers(payload: Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_Payload): Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_Returns {
    const resolvedServers: Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_ResolvedServers = payload['serverNames'].map((serverName) => {
      const server: Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_Server = configuredServers.find((configuredServer) => configuredServer['name'] === serverName);

      if (server === undefined) {
        const serverError: Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_ServerError = new Error(`Configured ntfy server "${serverName}" is unavailable`);

        serverError.name = missingServerErrorName;

        throw serverError;
      }

      return server;
    });
    const primaryServer: Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_PrimaryServer = resolvedServers.find((server) => server['name'] === payload['primaryServerName']);

    if (primaryServer === undefined) {
      const primaryServerError: Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_PrimaryServerError = new Error(`Primary ntfy server "${payload['primaryServerName']}" is unavailable`);

      primaryServerError.name = missingServerErrorName;

      throw primaryServerError;
    }

    return {
      servers: resolvedServers,
      primaryServer,
    };
  }

  /**
   * Worker - Durable Objects - Delivery Outbox - Runner - Checkpoint.
   *
   * Records one confirmed ntfy stage before the drain advances
   * so later retries can skip work ntfy already accepted.
   *
   * @private
   *
   * @returns {Worker_DurableObjects_DeliveryOutbox_Runner_Checkpoint_Returns}
   *
   * @since 2.2.1
   */
  #checkpoint(deliveryId: Worker_DurableObjects_DeliveryOutbox_Runner_Checkpoint_DeliveryId, serverName: Worker_DurableObjects_DeliveryOutbox_Runner_Checkpoint_ServerName, stage: Worker_DurableObjects_DeliveryOutbox_Runner_Checkpoint_Stage): Worker_DurableObjects_DeliveryOutbox_Runner_Checkpoint_Returns {
    this['ctx']['storage']['sql'].exec(
      'INSERT OR IGNORE INTO delivery_progress (delivery_id, server_name, stage) VALUES (?, ?, ?)',
      deliveryId,
      serverName,
      stage,
    );

    return;
  }

  /**
   * Worker - Durable Objects - Delivery Outbox - Runner - Delete.
   *
   * Removes a finished or exhausted notification together with its
   * attachment chunks and durable checkpoints.
   *
   * @private
   *
   * @returns {Worker_DurableObjects_DeliveryOutbox_Runner_Delete_Returns}
   *
   * @since 2.4.0
   */
  #delete(deliveryId: Worker_DurableObjects_DeliveryOutbox_Runner_Delete_DeliveryId): Worker_DurableObjects_DeliveryOutbox_Runner_Delete_Returns {
    this['ctx']['storage'].transactionSync(() => {
      this['ctx']['storage']['sql'].exec('DELETE FROM delivery_progress WHERE delivery_id = ?', deliveryId);

      this['ctx']['storage']['sql'].exec('DELETE FROM attachment_chunks WHERE delivery_id = ?', deliveryId);

      this['ctx']['storage']['sql'].exec('DELETE FROM notifications WHERE delivery_id = ?', deliveryId);

      return;
    });

    return;
  }

  /**
   * Worker - Durable Objects - Delivery Outbox - Runner - Peek.
   *
   * Reads the oldest notification with persisted retry and diagnostic metadata.
   * Creation time lets transient failures expire only after the age boundary.
   *
   * @private
   *
   * @returns {Worker_DurableObjects_DeliveryOutbox_Runner_Peek_Returns}
   *
   * @since 2.4.0
   */
  #peek(): Worker_DurableObjects_DeliveryOutbox_Runner_Peek_Returns {
    const rows: Worker_DurableObjects_DeliveryOutbox_Runner_Peek_Rows = this['ctx']['storage']['sql'].exec<Worker_DurableObjects_DeliveryOutbox_Runner_Peek_RowsItem>(
      'SELECT position, delivery_id AS deliveryId, payload, attempt_count AS attemptCount, diagnostic_config AS diagnosticConfig, created_at AS createdAt FROM notifications ORDER BY position ASC LIMIT 1',
    ).toArray();

    return rows[0];
  }

  /**
   * Worker - Durable Objects - Delivery Outbox - Runner - Record Failure.
   *
   * Persists one classified failure and chooses its retry or discard action.
   * Transient rows expire only after both the age and attempt gates are met.
   *
   * @param {Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_Notification}   notification   - Notification.
   * @param {Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_Classification} classification - Classification.
   * @param {Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_Reason}         reason         - Reason.
   * @param {Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_HttpStatus}     httpStatus     - Http status.
   *
   * @private
   *
   * @returns {Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_Returns}
   *
   * @since 2.4.0
   */
  async #recordFailure(
    notification: Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_Notification,
    classification: Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_Classification,
    reason: Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_Reason,
    httpStatus: Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_HttpStatus,
  ): Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_Returns {
    const currentTime: Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_CurrentTime = Date.now();
    const attemptCount: Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_AttemptCount = notification['attemptCount'] + 1;
    const ageMilliseconds: Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_AgeMilliseconds = Math.max(0, currentTime - notification['createdAt']);

    this['ctx']['storage']['sql'].exec(
      'UPDATE notifications SET attempt_count = ? WHERE delivery_id = ?',
      attemptCount,
      notification['deliveryId'],
    );

    const discarded: Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_Discarded = classification === 'permanent' || (
      attemptCount >= deliveryAttemptMinimum
      && ageMilliseconds >= deliveryFailureMaxAgeMilliseconds
    );
    const debug: Worker_DurableObjects_DeliveryOutbox_Runner_RecordFailure_Debug = (discarded === true) ? 'delivery_outbox_discarded' : 'delivery_outbox_retry';

    console.info(JSON.stringify({
      debug,
      deliveryId: notification['deliveryId'],
      classification,
      reason,
      httpStatus,
      attemptCount,
      ageMilliseconds,
    }));

    if (discarded === true) {
      await this.#sendDiscardDiagnostic(notification, reason, httpStatus, attemptCount, ageMilliseconds);

      return 'discard';
    }

    await this.#scheduleRetry(attemptCount);

    return 'retry';
  }

  /**
   * Worker - Durable Objects - Delivery Outbox - Runner - Attempt.
   *
   * Attempts every unfinished stage for one persisted notification
   * using current server credentials from the Worker configuration.
   *
   * @private
   *
   * @returns {Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Returns}
   *
   * @since 2.2.1
   */
  async #attempt(notification: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Notification): Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Returns {
    const payload: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Payload = JSON.parse(notification['payload']) as Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Payload;
    const attachment: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Attachment = this.#readAttachment(notification['deliveryId'], payload['hasAttachment']);
    const completedStages: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_CompletedStages = this.#readCompletedStages(notification['deliveryId']);
    const resolved: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Resolved = this.#resolveServers(payload);
    const attachmentTitle: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_AttachmentTitle = NtfyClient.readStoredTitle(payload['attachmentTitle'], payload['attachmentHeaders']);

    return await send({
      messages: payload['messages'].map((storedMessage) => NtfyClient.readStoredMessage(storedMessage)),
      servers: resolved['servers'],
      primaryServer: resolved['primaryServer'],
      topic: payload['topic'],
      mode: payload['mode'],
      ...((payload['visitorIp'] !== undefined) ? { visitorIp: payload['visitorIp'] } : {}),
      ...((attachment !== undefined) ? { attachment } : {}),
      ...((payload['filename'] !== undefined) ? { filename: payload['filename'] } : {}),
      ...((attachmentTitle !== undefined) ? { attachmentTitle } : {}),
      deliveryId: notification['deliveryId'],
      completedStages,
      onStageSuccess: (serverName, stage) => {
        this.#checkpoint(notification['deliveryId'], serverName, stage);

        return;
      },
    });
  }

  /**
   * Worker - Durable Objects - Delivery Outbox - Runner - Succeeded.
   *
   * Evaluates whether one notification is complete for its
   * configured send-once or send-all delivery mode.
   *
   * @private
   *
   * @returns {Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_Returns}
   *
   * @since 2.2.1
   */
  #succeeded(notification: Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_Notification, sendResult: Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_SendResult): Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_Returns {
    const payload: Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_Payload = JSON.parse(notification['payload']) as Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_Payload;

    return deliverySucceeded(payload['mode'], sendResult);
  }

  /**
   * Worker - Durable Objects - Delivery Outbox - Runner - Remove.
   *
   * Removes a delivered or discarded notification from every outbox table.
   * The shared cleanup prevents attachments and checkpoints from being orphaned.
   *
   * @private
   *
   * @returns {Worker_DurableObjects_DeliveryOutbox_Runner_Remove_Returns}
   *
   * @since 2.4.0
   */
  #remove(notification: Worker_DurableObjects_DeliveryOutbox_Runner_Remove_Notification): Worker_DurableObjects_DeliveryOutbox_Runner_Remove_Returns {
    this.#delete(notification['deliveryId']);

    return;
  }

  /**
   * Worker - Durable Objects - Delivery Outbox - Runner - Handle Failure.
   *
   * Classifies unsuccessful server statuses before recording one failed attempt.
   * Any transient destination keeps the row retryable to avoid premature loss.
   *
   * @param {Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_Notification} notification - Notification.
   * @param {Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_SendResult}   sendResult   - Send result.
   *
   * @private
   *
   * @returns {Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_Returns}
   *
   * @since 2.4.0
   */
  async #handleFailure(notification: Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_Notification, sendResult: Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_SendResult): Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_Returns {
    let selectedResult: Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_SelectedResult = undefined;
    let classification: Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_Classification = 'permanent';

    for (const result of sendResult['results']) {
      if (result['success'] === true) {
        continue;
      }

      const status: Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_Status = result['status'];
      const transient: Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_Transient = status === 0
        || status === 408
        || status === 429
        || status >= 500;
      const permanent: Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_Permanent = status >= 400
        && status < 500
        && status !== 408
        && status !== 429;

      if (
        transient === true
        || permanent === false
      ) {
        selectedResult = result;
        classification = 'transient';

        break;
      }

      if (selectedResult === undefined) {
        selectedResult = result;
      }
    }

    if (selectedResult === undefined) {
      const missingResultReason: Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_MissingResultReason = 'No ntfy server result was returned';

      return await this.#recordFailure(notification, 'transient', missingResultReason, null);
    }

    const httpStatus: Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_HttpStatus = selectedResult['status'];
    const reason: Worker_DurableObjects_DeliveryOutbox_Runner_HandleFailure_Reason = selectedResult['error'] ?? `HTTP ${String(httpStatus)}`;

    return await this.#recordFailure(notification, classification, reason, httpStatus);
  }

  /**
   * Worker - Durable Objects - Delivery Outbox - Runner - Handle Error.
   *
   * Classifies thrown payload and configuration errors as permanent failures.
   * Other attempt errors remain transient and receive alarm-driven retries.
   *
   * @private
   *
   * @returns {Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_Returns}
   *
   * @since 2.4.0
   */
  async #handleError(notification: Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_Notification, err: Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_Err): Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_Returns {
    const classification: Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_Classification = (
      err instanceof SyntaxError
      || (
        err instanceof Error
        && err.name === missingServerErrorName
      )
    ) ? 'permanent' : 'transient';
    let reason: Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_Reason = 'Unknown delivery outbox error';

    if (err instanceof SyntaxError) {
      reason = 'Queued notification payload is invalid JSON';
    } else if (err instanceof Error) {
      reason = err.message;
    }

    return await this.#recordFailure(notification, classification, reason, null);
  }

  /**
   * Worker - Durable Objects - Delivery Outbox - Runner - Schedule Retry.
   *
   * Arms one exponential-backoff alarm for a transient lane head.
   * An existing alarm wins so new posts cannot create or postpone retries.
   *
   * @param {Worker_DurableObjects_DeliveryOutbox_Runner_ScheduleRetry_AttemptCount} attemptCount - Attempt count.
   *
   * @private
   *
   * @returns {Worker_DurableObjects_DeliveryOutbox_Runner_ScheduleRetry_Returns}
   *
   * @since 2.4.0
   */
  async #scheduleRetry(attemptCount: Worker_DurableObjects_DeliveryOutbox_Runner_ScheduleRetry_AttemptCount): Worker_DurableObjects_DeliveryOutbox_Runner_ScheduleRetry_Returns {
    const existingAlarm: Worker_DurableObjects_DeliveryOutbox_Runner_ScheduleRetry_ExistingAlarm = await this['ctx']['storage'].getAlarm();

    if (existingAlarm !== null) {
      return;
    }

    const exponent: Worker_DurableObjects_DeliveryOutbox_Runner_ScheduleRetry_Exponent = Math.max(0, attemptCount - 1);
    const delay: Worker_DurableObjects_DeliveryOutbox_Runner_ScheduleRetry_Delay = Math.min(
      deliveryRetryBaseMilliseconds * Math.pow(2, exponent),
      deliveryRetryMaxMilliseconds,
    );
    const scheduledTime: Worker_DurableObjects_DeliveryOutbox_Runner_ScheduleRetry_ScheduledTime = Date.now() + delay;

    await this['ctx']['storage'].setAlarm(scheduledTime);

    return;
  }

  /**
   * Worker - Durable Objects - Delivery Outbox - Runner - Send Discard Diagnostic.
   *
   * Sends one best-effort error-topic attachment outside the durable lane.
   * Diagnostic failure never blocks cleanup or creates another queued row.
   *
   * @param {Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_Notification}    notification    - Notification.
   * @param {Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_Reason}          reason          - Reason.
   * @param {Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_HttpStatus}      httpStatus      - Http status.
   * @param {Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttemptCount}    attemptCount    - Attempt count.
   * @param {Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AgeMilliseconds} ageMilliseconds - Age milliseconds.
   *
   * @private
   *
   * @returns {Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_Returns}
   *
   * @since 2.4.0
   */
  async #sendDiscardDiagnostic(
    notification: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_Notification,
    reason: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_Reason,
    httpStatus: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_HttpStatus,
    attemptCount: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttemptCount,
    ageMilliseconds: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AgeMilliseconds,
  ): Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_Returns {
    if (notification['diagnosticConfig'] === null) {
      return;
    }

    try {
      const diagnosticConfig: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_DiagnosticConfig = JSON.parse(notification['diagnosticConfig']) as Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_DiagnosticConfig;

      if (diagnosticConfig['errorTopic'] === undefined) {
        return;
      }

      const resolvedServers: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_ResolvedServers = [];

      for (const serverName of diagnosticConfig['serverNames']) {
        const server: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_Server = configuredServers.find((configuredServer) => configuredServer['name'] === serverName);

        if (server !== undefined) {
          resolvedServers.push(server);
        }
      }

      const primaryServer: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_PrimaryServer = resolvedServers.find((server) => server['name'] === diagnosticConfig['primaryServerName']) ?? resolvedServers[0];

      if (primaryServer === undefined) {
        return;
      }

      const attachmentData: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttachmentData = {
        timestamp: new Date().toISOString(),
        context: {
          name: diagnosticConfig['contextName'],
          interpreter: diagnosticConfig['interpreterName'],
          stage: 'delivery',
        },
        delivery_id: notification['deliveryId'],
        reason,
        http_status: httpStatus,
        attempt_count: attemptCount,
        age_ms: ageMilliseconds,
      };
      const attachmentJson: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_AttachmentJson = JSON.stringify(attachmentData, null, 2);
      const attachment: Worker_DurableObjects_DeliveryOutbox_Runner_SendDiscardDiagnostic_Attachment = new TextEncoder().encode(attachmentJson).buffer as ArrayBuffer;

      await send({
        messages: [],
        servers: resolvedServers,
        primaryServer,
        topic: diagnosticConfig['errorTopic'],
        mode: diagnosticConfig['mode'],
        attachment,
        filename: 'error-debug.json',
        attachmentTitle: 'Durable Delivery Discarded',
      });
    } catch {
      // Best-effort error notification; ignore failures.
    }

    return;
  }

  /**
   * Worker - Durable Objects - Delivery Outbox - Runner - Drain.
   *
   * Delivers oldest-first and clears a stale alarm after the lane becomes empty.
   * Transient policy schedules the next alarm before asking the drain to stop.
   *
   * @private
   *
   * @returns {Worker_DurableObjects_DeliveryOutbox_Runner_Drain_Returns}
   *
   * @since 2.4.0
   */
  async #drain(): Worker_DurableObjects_DeliveryOutbox_Runner_Drain_Returns {
    const drainResult: Worker_DurableObjects_DeliveryOutbox_Runner_Drain_DrainResult = await drainFifo({
      peek: this.#peek.bind(this),
      attempt: this.#attempt.bind(this),
      succeeded: this.#succeeded.bind(this),
      remove: this.#remove.bind(this),
      onFailure: this.#handleFailure.bind(this),
      onError: this.#handleError.bind(this),
    });

    const pendingNotification: Worker_DurableObjects_DeliveryOutbox_Runner_Drain_PendingNotification = this.#peek();

    if (pendingNotification === undefined) {
      await this['ctx']['storage'].deleteAlarm();
    }

    return drainResult;
  }
}

/**
 * Worker - Durable Objects - Delivery Outbox - Set Configured Servers.
 *
 * Keeps the servers from the validated bundled config so the outbox can resolve
 * stored server names without persisting their tokens.
 *
 * @param {Worker_DurableObjects_DeliveryOutbox_SetConfiguredServers_Servers} servers - Servers.
 *
 * @returns {Worker_DurableObjects_DeliveryOutbox_SetConfiguredServers_Returns}
 *
 * @since 2.3.0
 */
function setConfiguredServers(servers: Worker_DurableObjects_DeliveryOutbox_SetConfiguredServers_Servers): Worker_DurableObjects_DeliveryOutbox_SetConfiguredServers_Returns {
  configuredServers = servers;

  return;
}

export {
  Runner,
  setConfiguredServers,
};

import { DurableObject } from 'cloudflare:workers';

import { serverSchema } from '../../lib/schema.js';
import { drainFifo } from '../pipeline/drain-fifo.js';
import { send } from '../pipeline/send.js';

import type {
  Worker_DurableObjects_DeliveryOutbox_AttachmentChunkBytes,
  Worker_DurableObjects_DeliveryOutbox_DeliverySucceeded_Mode,
  Worker_DurableObjects_DeliveryOutbox_DeliverySucceeded_Returns,
  Worker_DurableObjects_DeliveryOutbox_DeliverySucceeded_SendResult,
  Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Attachment,
  Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_CompletedStages,
  Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Notification,
  Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Payload,
  Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Resolved,
  Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Returns,
  Worker_DurableObjects_DeliveryOutbox_Runner_Checkpoint_DeliveryId,
  Worker_DurableObjects_DeliveryOutbox_Runner_Checkpoint_Returns,
  Worker_DurableObjects_DeliveryOutbox_Runner_Checkpoint_ServerName,
  Worker_DurableObjects_DeliveryOutbox_Runner_Checkpoint_Stage,
  Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_Ctx,
  Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_Env,
  Worker_DurableObjects_DeliveryOutbox_Runner_Delete_DeliveryId,
  Worker_DurableObjects_DeliveryOutbox_Runner_Delete_Returns,
  Worker_DurableObjects_DeliveryOutbox_Runner_Drain_Returns,
  Worker_DurableObjects_DeliveryOutbox_Runner_DrainPromise,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_AttachmentBytes,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_AttemptResults,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Chunk,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_ChunkIndex,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_DeliveryId,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Offset,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Options,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Payload,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadJson,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PendingRow,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_QueuedRow,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Returns,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_SendResult,
  Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_StartedDrain,
  Worker_DurableObjects_DeliveryOutbox_Runner_Env,
  Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_Err,
  Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_ErrorMessage,
  Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_Notification,
  Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_Returns,
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
  Worker_DurableObjects_DeliveryOutbox_Runner_Remove_Notification,
  Worker_DurableObjects_DeliveryOutbox_Runner_Remove_Returns,
  Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_Payload,
  Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_PrimaryServer,
  Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_ResolvedServers,
  Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_Returns,
  Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_Server,
  Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_Servers,
  Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_ServersJson,
  Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_Notification,
  Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_Payload,
  Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_Returns,
  Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_SendResult,
} from '../../types/worker/durable-objects/delivery-outbox.d.ts';

/**
 * Worker - Durable Objects - Delivery Outbox - Attachment Chunk Bytes.
 *
 * Keeps every SQLite BLOB safely below Cloudflare's
 * per-value limit for Durable Object storage.
 *
 * @since UNRELEASED
 */
const attachmentChunkBytes: Worker_DurableObjects_DeliveryOutbox_AttachmentChunkBytes = 1024 * 1024;

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
 * @since UNRELEASED
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
 * Owns one SQLite-backed FIFO lane per configured context. A lane only
 * drains when a notification for that context arrives.
 *
 * @since UNRELEASED
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
   * @since UNRELEASED
   */
  #drainPromise: Worker_DurableObjects_DeliveryOutbox_Runner_DrainPromise;

  /**
   * Worker - Durable Objects - Delivery Outbox - Constructor.
   *
   * Initializes the three SQLite tables used for notifications,
   * attachment chunks, and confirmed delivery stages.
   *
   * @since UNRELEASED
   */
  public constructor(ctx: Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_Ctx, env: Worker_DurableObjects_DeliveryOutbox_Runner_Constructor_Env) {
    super(ctx, env);

    this.#drainPromise = undefined;

    this['ctx']['storage']['sql'].exec([
      'CREATE TABLE IF NOT EXISTS notifications (',
      'position INTEGER PRIMARY KEY AUTOINCREMENT,',
      'delivery_id TEXT UNIQUE NOT NULL,',
      'payload TEXT NOT NULL,',
      'created_at INTEGER NOT NULL',
      ')',
    ].join('\n'));

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
   * Worker - Durable Objects - Delivery Outbox - Enqueue.
   *
   * Persists a notification and then schedules one FIFO drain
   * after any attempt already running for this context.
   *
   * @param {Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Options} options - Options.
   *
   * @returns {Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Returns}
   *
   * @since UNRELEASED
   */
  public async enqueue(options: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Options): Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Returns {
    const deliveryId: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_DeliveryId = crypto.randomUUID();
    const payload: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_Payload = {
      messages: options['messages'],
      serverNames: options['serverNames'],
      primaryServerName: options['primaryServerName'],
      topic: options['topic'],
      mode: options['mode'],
      ...((options['visitorIp'] !== undefined) ? { visitorIp: options['visitorIp'] } : {}),
      ...((options['filename'] !== undefined) ? { filename: options['filename'] } : {}),
      ...((options['attachmentHeaders'] !== undefined) ? { attachmentHeaders: options['attachmentHeaders'] } : {}),
      hasAttachment: options['attachment'] !== undefined,
    };
    const payloadJson: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PayloadJson = JSON.stringify(payload);
    const attachmentBytes: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_AttachmentBytes = (options['attachment'] === undefined) ? undefined : new Uint8Array(options['attachment']);

    this['ctx']['storage'].transactionSync(() => {
      this['ctx']['storage']['sql'].exec(
        'INSERT INTO notifications (delivery_id, payload, created_at) VALUES (?, ?, ?)',
        deliveryId,
        payloadJson,
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

    const startedDrain: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_StartedDrain = (this.#drainPromise === undefined) ? this.#drain() : this.#drainPromise.then(() => this.#drain());

    this.#drainPromise = startedDrain;

    try {
      const attemptResults: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_AttemptResults = await startedDrain;
      const pendingRow: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PendingRow = this['ctx']['storage']['sql'].exec<Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_PendingRow>('SELECT COUNT(*) AS pending FROM notifications').one();
      const queuedRow: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_QueuedRow = this['ctx']['storage']['sql'].exec<Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_QueuedRow>('SELECT COUNT(*) AS queued FROM notifications WHERE delivery_id = ?', deliveryId).one();
      const sendResult: Worker_DurableObjects_DeliveryOutbox_Runner_Enqueue_SendResult = attemptResults.get(deliveryId);

      return {
        deliveryId,
        state: (queuedRow['queued'] > 0) ? 'queued' : 'delivered',
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
   * Worker - Durable Objects - Delivery Outbox - Runner - Read Attachment.
   *
   * Reassembles a stored attachment from SQLite-safe chunks
   * while preserving the original byte order.
   *
   * @private
   *
   * @since UNRELEASED
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
   * @since UNRELEASED
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
   * @since UNRELEASED
   */
  #resolveServers(payload: Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_Payload): Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_Returns {
    const serversJson: Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_ServersJson = this['env']['SERVERS'] ?? '[]';
    const servers: Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_Servers = serverSchema.array().parse(JSON.parse(serversJson));
    const resolvedServers: Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_ResolvedServers = payload['serverNames'].map((serverName) => {
      const server: Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_Server = servers.find((configuredServer) => configuredServer['name'] === serverName);

      if (server === undefined) {
        throw new Error(`Configured ntfy server "${serverName}" is unavailable`);
      }

      return server;
    });
    const primaryServer: Worker_DurableObjects_DeliveryOutbox_Runner_ResolveServers_PrimaryServer = resolvedServers.find((server) => server['name'] === payload['primaryServerName']);

    if (primaryServer === undefined) {
      throw new Error(`Primary ntfy server "${payload['primaryServerName']}" is unavailable`);
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
   * @since UNRELEASED
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
   * Removes a fully delivered notification together with
   * its attachment chunks and durable checkpoints.
   *
   * @private
   *
   * @since UNRELEASED
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
   * Reads the oldest persisted notification without removing it
   * so failure always leaves the head of the lane intact.
   *
   * @private
   *
   * @since UNRELEASED
   */
  #peek(): Worker_DurableObjects_DeliveryOutbox_Runner_Peek_Returns {
    const rows: Worker_DurableObjects_DeliveryOutbox_Runner_Peek_Rows = this['ctx']['storage']['sql'].exec<Worker_DurableObjects_DeliveryOutbox_Runner_Peek_RowsItem>(
      'SELECT position, delivery_id AS deliveryId, payload FROM notifications ORDER BY position ASC LIMIT 1',
    ).toArray();

    return rows[0];
  }

  /**
   * Worker - Durable Objects - Delivery Outbox - Runner - Attempt.
   *
   * Attempts every unfinished stage for one persisted notification
   * using current server credentials from the Worker configuration.
   *
   * @private
   *
   * @since UNRELEASED
   */
  async #attempt(notification: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Notification): Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Returns {
    const payload: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Payload = JSON.parse(notification['payload']) as Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Payload;
    const attachment: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Attachment = this.#readAttachment(notification['deliveryId'], payload['hasAttachment']);
    const completedStages: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_CompletedStages = this.#readCompletedStages(notification['deliveryId']);
    const resolved: Worker_DurableObjects_DeliveryOutbox_Runner_Attempt_Resolved = this.#resolveServers(payload);

    return await send({
      messages: payload['messages'],
      servers: resolved['servers'],
      primaryServer: resolved['primaryServer'],
      topic: payload['topic'],
      mode: payload['mode'],
      ...((payload['visitorIp'] !== undefined) ? { visitorIp: payload['visitorIp'] } : {}),
      ...((attachment !== undefined) ? { attachment } : {}),
      ...((payload['filename'] !== undefined) ? { filename: payload['filename'] } : {}),
      ...((payload['attachmentHeaders'] !== undefined) ? { attachmentHeaders: payload['attachmentHeaders'] } : {}),
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
   * @since UNRELEASED
   */
  #succeeded(notification: Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_Notification, sendResult: Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_SendResult): Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_Returns {
    const payload: Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_Payload = JSON.parse(notification['payload']) as Worker_DurableObjects_DeliveryOutbox_Runner_Succeeded_Payload;

    return deliverySucceeded(payload['mode'], sendResult);
  }

  /**
   * Worker - Durable Objects - Delivery Outbox - Runner - Remove.
   *
   * Removes a notification only after every required stage
   * succeeds according to the selected delivery mode.
   *
   * @private
   *
   * @since UNRELEASED
   */
  #remove(notification: Worker_DurableObjects_DeliveryOutbox_Runner_Remove_Notification): Worker_DurableObjects_DeliveryOutbox_Runner_Remove_Returns {
    this.#delete(notification['deliveryId']);

    return;
  }

  /**
   * Worker - Durable Objects - Delivery Outbox - Runner - Handle Error.
   *
   * Logs an unexpected attempt error while leaving the
   * notification queued for a future trigger.
   *
   * @private
   *
   * @since UNRELEASED
   */
  #handleError(notification: Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_Notification, err: Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_Err): Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_Returns {
    const errorMessage: Worker_DurableObjects_DeliveryOutbox_Runner_HandleError_ErrorMessage = (err instanceof Error) ? err.message : 'Unknown delivery outbox error';

    console.info(JSON.stringify({
      debug: 'delivery_outbox_error',
      deliveryId: notification['deliveryId'],
      error: errorMessage,
    }));

    return;
  }

  /**
   * Worker - Durable Objects - Delivery Outbox - Runner - Drain.
   *
   * Delivers oldest-first and stops immediately when the
   * head cannot finish, preserving strict FIFO order.
   *
   * @private
   *
   * @since UNRELEASED
   */
  #drain(): Worker_DurableObjects_DeliveryOutbox_Runner_Drain_Returns {
    return drainFifo({
      peek: this.#peek.bind(this),
      attempt: this.#attempt.bind(this),
      succeeded: this.#succeeded.bind(this),
      remove: this.#remove.bind(this),
      onError: this.#handleError.bind(this),
    });
  }
}

export {
  Runner,
};

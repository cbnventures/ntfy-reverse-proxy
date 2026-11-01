import { configSchema } from '../lib/schema.js';
import { Runner, setConfiguredServers } from './durable-objects/delivery-outbox.js';
import { handleEmail, handleRequest } from './handlers.js';

import type {
  Worker_Index_CreateWorker_Email_Chunks,
  Worker_Index_CreateWorker_Email_Decoder,
  Worker_Index_CreateWorker_Email_Done,
  Worker_Index_CreateWorker_Email_Env,
  Worker_Index_CreateWorker_Email_Kv,
  Worker_Index_CreateWorker_Email_Message,
  Worker_Index_CreateWorker_Email_Outbox,
  Worker_Index_CreateWorker_Email_RawEmail,
  Worker_Index_CreateWorker_Email_Reader,
  Worker_Index_CreateWorker_Email_ReadResult,
  Worker_Index_CreateWorker_Email_Returns,
  Worker_Index_CreateWorker_Fetch_Env,
  Worker_Index_CreateWorker_Fetch_Kv,
  Worker_Index_CreateWorker_Fetch_Outbox,
  Worker_Index_CreateWorker_Fetch_Request,
  Worker_Index_CreateWorker_Fetch_Returns,
  Worker_Index_CreateWorker_RawConfig,
  Worker_Index_CreateWorker_Result,
  Worker_Index_CreateWorker_Returns,
} from '../types/worker/index.d.ts';

/**
 * Worker - Create Worker.
 *
 * Builds the Worker handlers around the config bundled at deploy time. The config is
 * validated once when the Worker starts, and its servers go to the delivery outbox.
 *
 * @param {Worker_Index_CreateWorker_RawConfig} rawConfig - Raw config.
 *
 * @returns {Worker_Index_CreateWorker_Returns}
 *
 * @since 2.3.0
 */
function createWorker(rawConfig: Worker_Index_CreateWorker_RawConfig): Worker_Index_CreateWorker_Returns {
  const result: Worker_Index_CreateWorker_Result = configSchema.safeParse(rawConfig);

  // The delivery outbox resolves stored server names against the same validated config.
  if (result['success'] === true) {
    setConfiguredServers(result['data']['servers']);
  }

  return {
    async fetch(request: Worker_Index_CreateWorker_Fetch_Request, env: Worker_Index_CreateWorker_Fetch_Env): Worker_Index_CreateWorker_Fetch_Returns {
      if (result['success'] === false) {
        return new Response(JSON.stringify({
          status: 'error',
          message: 'Invalid configuration',
          errors: result['error']['issues'],
        }, null, 2), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const kv: Worker_Index_CreateWorker_Fetch_Kv = env['KV'] as Worker_Index_CreateWorker_Fetch_Kv;
      const outbox: Worker_Index_CreateWorker_Fetch_Outbox = env['DELIVERY_OUTBOX'] as Worker_Index_CreateWorker_Fetch_Outbox;

      return handleRequest(request, result['data'], kv, outbox);
    },
    async email(message: Worker_Index_CreateWorker_Email_Message, env: Worker_Index_CreateWorker_Email_Env): Worker_Index_CreateWorker_Email_Returns {
      if (result['success'] === false) {
        return;
      }

      const reader: Worker_Index_CreateWorker_Email_Reader = message['raw'].getReader();
      const chunks: Worker_Index_CreateWorker_Email_Chunks = [];
      let done: Worker_Index_CreateWorker_Email_Done = false;

      while (done === false) {
        const readResult: Worker_Index_CreateWorker_Email_ReadResult = await reader.read();

        if (readResult['done'] === true) {
          done = true;
        } else {
          chunks.push(readResult['value'] as Uint8Array);
        }
      }

      const decoder: Worker_Index_CreateWorker_Email_Decoder = new TextDecoder();
      const rawEmail: Worker_Index_CreateWorker_Email_RawEmail = chunks.map((chunk) => decoder.decode(chunk, { stream: true })).join('') + decoder.decode();
      const kv: Worker_Index_CreateWorker_Email_Kv = env['KV'] as Worker_Index_CreateWorker_Email_Kv;
      const outbox: Worker_Index_CreateWorker_Email_Outbox = env['DELIVERY_OUTBOX'] as Worker_Index_CreateWorker_Email_Outbox;

      await handleEmail(rawEmail, message['from'], result['data'], kv, outbox);

      return;
    },
  };
}

export {
  createWorker,
  Runner as DeliveryOutbox,
};

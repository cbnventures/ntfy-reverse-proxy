import { configSchema } from '../lib/schema.js';
import { handleEmail, handleRequest } from './handlers.js';

import type {
  Worker_Index_Email_Chunks,
  Worker_Index_Email_Contexts,
  Worker_Index_Email_Decoder,
  Worker_Index_Email_Done,
  Worker_Index_Email_Env,
  Worker_Index_Email_EnvString,
  Worker_Index_Email_Kv,
  Worker_Index_Email_Message,
  Worker_Index_Email_RawEmail,
  Worker_Index_Email_Reader,
  Worker_Index_Email_ReadResult,
  Worker_Index_Email_Result,
  Worker_Index_Email_Returns,
  Worker_Index_Email_Servers,
  Worker_Index_Email_Settings,
  Worker_Index_Fetch_Contexts,
  Worker_Index_Fetch_Env,
  Worker_Index_Fetch_EnvString,
  Worker_Index_Fetch_Kv,
  Worker_Index_Fetch_Request,
  Worker_Index_Fetch_Result,
  Worker_Index_Fetch_Returns,
  Worker_Index_Fetch_Servers,
  Worker_Index_Fetch_Settings,
  Worker_Index_ModuleExports,
} from '../types/worker/index.d.ts';

/**
 * Worker - Module Exports.
 *
 * Cloudflare Workers entry point exposing the fetch and email
 * handlers that validate config and dispatch to the pipeline.
 *
 * @since 2.1.0
 */
const moduleExports: Worker_Index_ModuleExports = {
  async fetch(request: Worker_Index_Fetch_Request, env: Worker_Index_Fetch_Env): Worker_Index_Fetch_Returns {
    let settings: Worker_Index_Fetch_Settings = undefined;
    let servers: Worker_Index_Fetch_Servers = undefined;
    let contexts: Worker_Index_Fetch_Contexts = undefined;

    try {
      settings = JSON.parse(env['SETTINGS'] as Worker_Index_Fetch_EnvString);
      servers = JSON.parse(env['SERVERS'] as Worker_Index_Fetch_EnvString);
      contexts = JSON.parse(env['CONTEXTS'] as Worker_Index_Fetch_EnvString);
    } catch {
      return new Response(JSON.stringify({
        status: 'error',
        message: 'Invalid configuration: environment variables contain malformed JSON',
      }, null, 2), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result: Worker_Index_Fetch_Result = configSchema.safeParse({
      settings,
      servers,
      contexts,
    });

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

    const kv: Worker_Index_Fetch_Kv = env['KV'] as Worker_Index_Fetch_Kv;

    return handleRequest(request, result['data'], kv);
  },
  async email(message: Worker_Index_Email_Message, env: Worker_Index_Email_Env): Worker_Index_Email_Returns {
    let settings: Worker_Index_Email_Settings = undefined;
    let servers: Worker_Index_Email_Servers = undefined;
    let contexts: Worker_Index_Email_Contexts = undefined;

    try {
      settings = JSON.parse(env['SETTINGS'] as Worker_Index_Email_EnvString);
      servers = JSON.parse(env['SERVERS'] as Worker_Index_Email_EnvString);
      contexts = JSON.parse(env['CONTEXTS'] as Worker_Index_Email_EnvString);
    } catch {
      return;
    }

    const result: Worker_Index_Email_Result = configSchema.safeParse({
      settings,
      servers,
      contexts,
    });

    if (result['success'] === false) {
      return;
    }

    const reader: Worker_Index_Email_Reader = message['raw'].getReader();
    const chunks: Worker_Index_Email_Chunks = [];
    let done: Worker_Index_Email_Done = false;

    while (done === false) {
      const readResult: Worker_Index_Email_ReadResult = await reader.read();

      if (readResult['done'] === true) {
        done = true;
      } else {
        chunks.push(readResult['value'] as Uint8Array);
      }
    }

    const decoder: Worker_Index_Email_Decoder = new TextDecoder();
    const rawEmail: Worker_Index_Email_RawEmail = chunks.map((chunk) => decoder.decode(chunk, { stream: true })).join('') + decoder.decode();
    const kv: Worker_Index_Email_Kv = env['KV'] as Worker_Index_Email_Kv;

    await handleEmail(rawEmail, message['from'], result['data'], kv);

    return;
  },
};

export default moduleExports;

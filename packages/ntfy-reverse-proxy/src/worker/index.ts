import { configSchema } from '../lib/schema.js';
import { handleEmail, handleRequest } from './handlers.js';

import type {
  WorkerEmailHandlerChunks,
  WorkerEmailHandlerContexts,
  WorkerEmailHandlerDecoder,
  WorkerEmailHandlerDone,
  WorkerEmailHandlerEnv,
  WorkerEmailHandlerEnvString,
  WorkerEmailHandlerKv,
  WorkerEmailHandlerMessage,
  WorkerEmailHandlerRawEmail,
  WorkerEmailHandlerReader,
  WorkerEmailHandlerReadResult,
  WorkerEmailHandlerResult,
  WorkerEmailHandlerReturns,
  WorkerEmailHandlerServers,
  WorkerEmailHandlerSettings,
  WorkerFetchContexts,
  WorkerFetchEnv,
  WorkerFetchEnvString,
  WorkerFetchKv,
  WorkerFetchResult,
  WorkerFetchReturns,
  WorkerFetchServers,
  WorkerFetchSettings,
  WorkerModuleExports,
} from '../types/worker/index.d.ts';

const moduleExports: WorkerModuleExports = {
  async fetch(request: Request, env: WorkerFetchEnv): WorkerFetchReturns {
    const settings: WorkerFetchSettings = JSON.parse(env['SETTINGS'] as WorkerFetchEnvString);
    const servers: WorkerFetchServers = JSON.parse(env['SERVERS'] as WorkerFetchEnvString);
    const contexts: WorkerFetchContexts = JSON.parse(env['CONTEXTS'] as WorkerFetchEnvString);

    const result: WorkerFetchResult = configSchema.safeParse({
      settings, servers, contexts,
    });

    if (result['success'] === false) {
      return new Response(JSON.stringify({
        status: 'error', message: 'Invalid configuration', errors: result['error']['issues'],
      }, null, 2), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const kv: WorkerFetchKv = env['KV'] as WorkerFetchKv;

    return handleRequest(request, result['data'], kv);
  },
  async email(message: WorkerEmailHandlerMessage, env: WorkerEmailHandlerEnv): WorkerEmailHandlerReturns {
    const settings: WorkerEmailHandlerSettings = JSON.parse(env['SETTINGS'] as WorkerEmailHandlerEnvString);
    const servers: WorkerEmailHandlerServers = JSON.parse(env['SERVERS'] as WorkerEmailHandlerEnvString);
    const contexts: WorkerEmailHandlerContexts = JSON.parse(env['CONTEXTS'] as WorkerEmailHandlerEnvString);

    const result: WorkerEmailHandlerResult = configSchema.safeParse({
      settings, servers, contexts,
    });

    if (result['success'] === false) {
      return;
    }

    const reader: WorkerEmailHandlerReader = message['raw'].getReader();
    const chunks: WorkerEmailHandlerChunks = [];
    let done: WorkerEmailHandlerDone = false;

    while (done === false) {
      const readResult: WorkerEmailHandlerReadResult = await reader.read();

      if (readResult['done'] === true) {
        done = true;
      } else {
        chunks.push(readResult['value'] as Uint8Array);
      }
    }

    const decoder: WorkerEmailHandlerDecoder = new TextDecoder();
    const rawEmail: WorkerEmailHandlerRawEmail = chunks.map((chunk) => decoder.decode(chunk, { stream: true })).join('') + decoder.decode();
    const kv: WorkerEmailHandlerKv = env['KV'] as WorkerEmailHandlerKv;

    await handleEmail(rawEmail, message['from'], result['data'], kv);

    return;
  },
};

export default moduleExports;

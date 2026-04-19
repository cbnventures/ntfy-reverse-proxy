import { z } from 'zod';

import type {
  WorkerInterpretersNtfyJsonInput,
  WorkerInterpretersNtfyJsonInterpreter,
  WorkerInterpretersNtfyJsonNtfyJsonInterpreterDecodedBody,
  WorkerInterpretersNtfyJsonNtfyJsonInterpreterDecoder,
  WorkerInterpretersNtfyJsonNtfyJsonInterpreterNotification,
  WorkerInterpretersNtfyJsonNtfyJsonInterpreterParsed,
  WorkerInterpretersNtfyJsonResult,
} from '../../types/worker/interpreters/ntfy-json.d.ts';

/**
 * Worker - Interpreters - Ntfy JSON - Ntfy JSON Tags Item.
 *
 * Defines the Zod validator for individual tag array entries
 * so the schema can reference it without nesting calls.
 *
 * @since 2.0.0
 */
const ntfyJsonTagsItem = z.string();

/**
 * Worker - Interpreters - Ntfy JSON - Ntfy JSON Schema.
 *
 * Defines the expected shape of incoming ntfy JSON payloads using Zod
 * so malformed requests are caught before delivery.
 *
 * @since 2.0.0
 */
const ntfyJsonSchema = z.object({
  title: z.string().optional(),
  body: z.string(),
  priority: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
  ]).optional(),
  tags: z.array(ntfyJsonTagsItem).optional(),
  icon: z.string().optional(),
  actions: z.string().optional(),
  attach: z.string().optional(),
  filename: z.string().optional(),
  markdown: z.boolean().optional(),
});

/**
 * Worker - Interpreters - Ntfy JSON - Ntfy JSON Interpreter.
 *
 * Parses incoming payloads against the ntfy JSON schema and returns
 * the validated notification object for downstream formatting.
 *
 * @since 2.0.0
 */
const ntfyJsonInterpreter: WorkerInterpretersNtfyJsonInterpreter = (input: WorkerInterpretersNtfyJsonInput): WorkerInterpretersNtfyJsonResult => {
  let parsed: WorkerInterpretersNtfyJsonNtfyJsonInterpreterParsed = undefined;

  if (typeof input === 'string') {
    try {
      parsed = JSON.parse(input);
    } catch {
      return null;
    }
  } else if (input instanceof ArrayBuffer) {
    const decoder: WorkerInterpretersNtfyJsonNtfyJsonInterpreterDecoder = new TextDecoder('utf-8');
    const decodedBody: WorkerInterpretersNtfyJsonNtfyJsonInterpreterDecodedBody = decoder.decode(input);

    try {
      parsed = JSON.parse(decodedBody);
    } catch {
      return null;
    }
  } else {
    parsed = input;
  }

  const notification: WorkerInterpretersNtfyJsonNtfyJsonInterpreterNotification = ntfyJsonSchema.parse(parsed);

  return {
    notification,
  };
};

export {
  ntfyJsonInterpreter,
};

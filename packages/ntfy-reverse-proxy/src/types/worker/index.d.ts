import type { z } from 'zod';

import type { Lib_Schema_ConfigSchema } from '../lib/schema.d.ts';
import type { Worker_Pipeline_Deliver_Namespace } from './pipeline/deliver.d.ts';

/**
 * Worker - Index - Create Worker.
 *
 * @since 2.3.0
 */
export type Worker_Index_CreateWorker_RawConfig = unknown;

export type Worker_Index_CreateWorker_Returns_FetchRequest = Request;

export type Worker_Index_CreateWorker_Returns_FetchEnv = Record<string, string | KVNamespace | Worker_Pipeline_Deliver_Namespace | undefined>;

export type Worker_Index_CreateWorker_Returns_FetchReturns = Promise<Response>;

export type Worker_Index_CreateWorker_Returns_Fetch = (request: Worker_Index_CreateWorker_Returns_FetchRequest, env: Worker_Index_CreateWorker_Returns_FetchEnv) => Worker_Index_CreateWorker_Returns_FetchReturns;

export type Worker_Index_CreateWorker_Returns_EmailMessage_From = string;

export type Worker_Index_CreateWorker_Returns_EmailMessage_To = string;

export type Worker_Index_CreateWorker_Returns_EmailMessage_Headers = Headers;

export type Worker_Index_CreateWorker_Returns_EmailMessage_Raw = ReadableStream;

export type Worker_Index_CreateWorker_Returns_EmailMessage = {
  from: Worker_Index_CreateWorker_Returns_EmailMessage_From;
  to: Worker_Index_CreateWorker_Returns_EmailMessage_To;
  headers: Worker_Index_CreateWorker_Returns_EmailMessage_Headers;
  raw: Worker_Index_CreateWorker_Returns_EmailMessage_Raw;
};

export type Worker_Index_CreateWorker_Returns_EmailEnv = Record<string, string | KVNamespace | Worker_Pipeline_Deliver_Namespace | undefined>;

export type Worker_Index_CreateWorker_Returns_EmailReturns = Promise<void>;

export type Worker_Index_CreateWorker_Returns_Email = (message: Worker_Index_CreateWorker_Returns_EmailMessage, env: Worker_Index_CreateWorker_Returns_EmailEnv) => Worker_Index_CreateWorker_Returns_EmailReturns;

export type Worker_Index_CreateWorker_Returns = {
  fetch: Worker_Index_CreateWorker_Returns_Fetch;
  email: Worker_Index_CreateWorker_Returns_Email;
};

export type Worker_Index_CreateWorker_Result = z.ZodSafeParseResult<Lib_Schema_ConfigSchema>;

/**
 * Worker - Index - Create Worker - Email.
 *
 * @since 2.3.0
 */
export type Worker_Index_CreateWorker_Email_Message_From = string;

export type Worker_Index_CreateWorker_Email_Message_To = string;

export type Worker_Index_CreateWorker_Email_Message_Headers = Headers;

export type Worker_Index_CreateWorker_Email_Message_Raw = ReadableStream;

export type Worker_Index_CreateWorker_Email_Message = {
  from: Worker_Index_CreateWorker_Email_Message_From;
  to: Worker_Index_CreateWorker_Email_Message_To;
  headers: Worker_Index_CreateWorker_Email_Message_Headers;
  raw: Worker_Index_CreateWorker_Email_Message_Raw;
};

export type Worker_Index_CreateWorker_Email_Env = Record<string, string | KVNamespace | Worker_Pipeline_Deliver_Namespace | undefined>;

export type Worker_Index_CreateWorker_Email_Returns = Promise<void>;

export type Worker_Index_CreateWorker_Email_Reader = ReadableStreamDefaultReader<Uint8Array>;

export type Worker_Index_CreateWorker_Email_Chunks = Uint8Array[];

export type Worker_Index_CreateWorker_Email_Done = boolean;

export type Worker_Index_CreateWorker_Email_ReadResult = ReadableStreamReadResult<Uint8Array>;

export type Worker_Index_CreateWorker_Email_Decoder = TextDecoder;

export type Worker_Index_CreateWorker_Email_RawEmail = string;

export type Worker_Index_CreateWorker_Email_Kv = KVNamespace | undefined;

export type Worker_Index_CreateWorker_Email_Outbox = Worker_Pipeline_Deliver_Namespace & {};

/**
 * Worker - Index - Create Worker - Fetch.
 *
 * @since 2.3.0
 */
export type Worker_Index_CreateWorker_Fetch_Request = Request;

export type Worker_Index_CreateWorker_Fetch_Env = Record<string, string | KVNamespace | Worker_Pipeline_Deliver_Namespace | undefined>;

export type Worker_Index_CreateWorker_Fetch_Returns = Promise<Response>;

export type Worker_Index_CreateWorker_Fetch_Kv = KVNamespace | undefined;

export type Worker_Index_CreateWorker_Fetch_Outbox = Worker_Pipeline_Deliver_Namespace & {};

import type { z } from 'zod';

import type { Lib_Schema_ConfigSchema } from '../lib/schema.d.ts';

/**
 * Worker - Index - Module Exports.
 *
 * @since 2.0.0
 */
export type Worker_Index_ModuleExports_FetchRequest = Request;

export type Worker_Index_ModuleExports_FetchEnv = Record<string, string | KVNamespace | undefined>;

export type Worker_Index_ModuleExports_FetchReturns = Promise<Response>;

export type Worker_Index_ModuleExports_Fetch = (request: Worker_Index_ModuleExports_FetchRequest, env: Worker_Index_ModuleExports_FetchEnv) => Worker_Index_ModuleExports_FetchReturns;

export type Worker_Index_ModuleExports_EmailMessage_From = string;

export type Worker_Index_ModuleExports_EmailMessage_To = string;

export type Worker_Index_ModuleExports_EmailMessage_Headers = Headers;

export type Worker_Index_ModuleExports_EmailMessage_Raw = ReadableStream;

export type Worker_Index_ModuleExports_EmailMessage = {
  from: Worker_Index_ModuleExports_EmailMessage_From;
  to: Worker_Index_ModuleExports_EmailMessage_To;
  headers: Worker_Index_ModuleExports_EmailMessage_Headers;
  raw: Worker_Index_ModuleExports_EmailMessage_Raw;
};

export type Worker_Index_ModuleExports_EmailEnv = Record<string, string | KVNamespace | undefined>;

export type Worker_Index_ModuleExports_EmailReturns = Promise<void>;

export type Worker_Index_ModuleExports_Email = (message: Worker_Index_ModuleExports_EmailMessage, env: Worker_Index_ModuleExports_EmailEnv) => Worker_Index_ModuleExports_EmailReturns;

export type Worker_Index_ModuleExports = {
  fetch: Worker_Index_ModuleExports_Fetch;
  email: Worker_Index_ModuleExports_Email;
};

/**
 * Worker - Index - Email.
 *
 * @since 2.0.0
 */
export type Worker_Index_Email_Message_From = string;

export type Worker_Index_Email_Message_To = string;

export type Worker_Index_Email_Message_Headers = Headers;

export type Worker_Index_Email_Message_Raw = ReadableStream;

export type Worker_Index_Email_Message = {
  from: Worker_Index_Email_Message_From;
  to: Worker_Index_Email_Message_To;
  headers: Worker_Index_Email_Message_Headers;
  raw: Worker_Index_Email_Message_Raw;
};

export type Worker_Index_Email_Env = Record<string, string | KVNamespace | undefined>;

export type Worker_Index_Email_Returns = Promise<void>;

export type Worker_Index_Email_Settings = unknown;

export type Worker_Index_Email_Servers = unknown;

export type Worker_Index_Email_Contexts = unknown;

export type Worker_Index_Email_EnvString = string;

export type Worker_Index_Email_Result = z.ZodSafeParseResult<Lib_Schema_ConfigSchema>;

export type Worker_Index_Email_Reader = ReadableStreamDefaultReader<Uint8Array>;

export type Worker_Index_Email_Chunks = Uint8Array[];

export type Worker_Index_Email_Done = boolean;

export type Worker_Index_Email_ReadResult = ReadableStreamReadResult<Uint8Array>;

export type Worker_Index_Email_Decoder = TextDecoder;

export type Worker_Index_Email_RawEmail = string;

export type Worker_Index_Email_Kv = KVNamespace | undefined;

/**
 * Worker - Index - Fetch.
 *
 * @since 2.0.0
 */
export type Worker_Index_Fetch_Request = Request;

export type Worker_Index_Fetch_Env = Record<string, string | KVNamespace | undefined>;

export type Worker_Index_Fetch_Returns = Promise<Response>;

export type Worker_Index_Fetch_Settings = unknown;

export type Worker_Index_Fetch_Servers = unknown;

export type Worker_Index_Fetch_Contexts = unknown;

export type Worker_Index_Fetch_EnvString = string;

export type Worker_Index_Fetch_Result = z.ZodSafeParseResult<Lib_Schema_ConfigSchema>;

export type Worker_Index_Fetch_Kv = KVNamespace | undefined;

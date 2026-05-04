import type { z } from 'zod';

import type {
  LibSchemaConfigSchema,
  LibSchemaEmailContextConfig,
  LibSchemaHttpContextConfig,
  LibSchemaServerConfig,
} from '../lib/schema.d.ts';
import type { WorkerPipelineAuthenticateResult } from './pipeline/authenticate.d.ts';
import type { WorkerPipelineEmailResult } from './pipeline/email.d.ts';
import type { WorkerPipelineFormatResult } from './pipeline/format.d.ts';
import type {
  WorkerPipelineInterpretInput,
  WorkerPipelineInterpretResult,
} from './pipeline/interpret.d.ts';
import type { WorkerPipelineParseResult } from './pipeline/parse.d.ts';
import type { WorkerPipelineReceiveResult } from './pipeline/receive.d.ts';
import type { WorkerPipelineRouteResult } from './pipeline/route.d.ts';
import type { WorkerPipelineSendResult } from './pipeline/send.d.ts';
import type { WorkerPipelineSplitMessagePart } from './pipeline/split.d.ts';

/**
 * Worker - Email Handler Variables.
 *
 * @since 2.0.0
 */
export type WorkerEmailHandlerMessage = {
  from: string;
  to: string;
  headers: Headers;
  raw: ReadableStream;
};

export type WorkerEmailHandlerEnv = Record<string, string | KVNamespace | undefined>;

export type WorkerEmailHandlerReturns = Promise<void>;

export type WorkerEmailHandlerEnvString = string;

export type WorkerEmailHandlerSettings = unknown;

export type WorkerEmailHandlerServers = unknown;

export type WorkerEmailHandlerContexts = unknown;

export type WorkerEmailHandlerResult = z.ZodSafeParseResult<LibSchemaConfigSchema>;

export type WorkerEmailHandlerReader = ReadableStreamDefaultReader<Uint8Array>;

export type WorkerEmailHandlerChunks = Uint8Array[];

export type WorkerEmailHandlerDone = boolean;

export type WorkerEmailHandlerReadResult = ReadableStreamReadResult<Uint8Array>;

export type WorkerEmailHandlerDecoder = TextDecoder;

export type WorkerEmailHandlerRawEmail = string;

export type WorkerEmailHandlerKv = KVNamespace | undefined;

/**
 * Worker - Fetch Handler Variables.
 *
 * @since 2.0.0
 */
export type WorkerFetchEnv = Record<string, string | KVNamespace | undefined>;

export type WorkerFetchReturns = Promise<Response>;

export type WorkerFetchEnvString = string;

export type WorkerFetchSettings = unknown;

export type WorkerFetchServers = unknown;

export type WorkerFetchContexts = unknown;

export type WorkerFetchResult = z.ZodSafeParseResult<LibSchemaConfigSchema>;

export type WorkerFetchKv = KVNamespace | undefined;

/**
 * Worker - Handle Email.
 *
 * @since 2.0.0
 */
export type WorkerHandleEmailRawEmail = string;

export type WorkerHandleEmailFrom = string;

export type WorkerHandleEmailConfig = LibSchemaConfigSchema;

export type WorkerHandleEmailKv = KVNamespace | undefined;

export type WorkerHandleEmailReturn = Promise<void>;

/**
 * Worker - Handle Email Variables.
 *
 * @since 2.0.0
 */
export type WorkerEmailParsed = WorkerPipelineEmailResult;

export type WorkerDebugRawEmailStr = string;

export type WorkerRecipientLocalPart = string;

export type WorkerEmailRouted = WorkerPipelineRouteResult;

export type WorkerEmailCtx = LibSchemaEmailContextConfig;

export type WorkerEmailResolvedServers = LibSchemaServerConfig[];

export type WorkerEmailPrimaryServer = LibSchemaServerConfig;

export type WorkerEmailAuthResult = WorkerPipelineAuthenticateResult;

export type WorkerEmailErrorFormatted = WorkerPipelineFormatResult;

export type WorkerEmailErrorMessages = WorkerPipelineSplitMessagePart[];

export type WorkerEmailErrorAttachmentData = Record<string, unknown>;

export type WorkerEmailErrorAttachmentJson = string;

export type WorkerEmailErrorAttachmentBuffer = ArrayBuffer;

export type WorkerEmailInput = Record<string, string>;

export type WorkerEmailInterpreted = WorkerPipelineInterpretResult | null | undefined;

export type WorkerEmailErrorMessage = string;

export type WorkerEmailErrorName = string;

export type WorkerEmailErrorStack = string | undefined;

export type WorkerEmailErrorIssuesRaw = unknown;

export type WorkerEmailErrorIssues = unknown[] | undefined;

export type WorkerEmailFormatted = WorkerPipelineFormatResult;

export type WorkerEmailMessages = WorkerPipelineSplitMessagePart[];

export type WorkerEmailSendResult = WorkerPipelineSendResult;

export type WorkerEmailDebugLogStr = string;

/**
 * Worker - Handle Request.
 *
 * @since 2.0.0
 */
export type WorkerHandleRequestRequest = Request;

export type WorkerHandleRequestConfig = LibSchemaConfigSchema;

export type WorkerHandleRequestKv = KVNamespace | undefined;

export type WorkerHandleRequestReturn = Promise<Response>;

/**
 * Worker - Handle Request Variables.
 *
 * @since 2.0.0
 */
export type WorkerReceived = WorkerPipelineReceiveResult;

export type WorkerSubdomain = string;

export type WorkerRouted = WorkerPipelineRouteResult;

export type WorkerCtx = LibSchemaHttpContextConfig;

export type WorkerResolvedServers = LibSchemaServerConfig[];

export type WorkerPrimaryServer = LibSchemaServerConfig;

export type WorkerAuthResult = WorkerPipelineAuthenticateResult;

export type WorkerErrorFormatted = WorkerPipelineFormatResult;

export type WorkerErrorMessages = WorkerPipelineSplitMessagePart[];

export type WorkerErrorAttachmentHeaderEntryName = string;

export type WorkerErrorAttachmentHeaderEntryValue = string;

export type WorkerErrorAttachmentHeaderEntry = [WorkerErrorAttachmentHeaderEntryName, WorkerErrorAttachmentHeaderEntryValue];

export type WorkerErrorAttachmentHeaderEntries = WorkerErrorAttachmentHeaderEntry[];

export type WorkerErrorAttachmentHeaders = Record<string, string>;

export type WorkerErrorAttachmentParsed = WorkerPipelineParseResult;

export type WorkerErrorAttachmentData = Record<string, unknown>;

export type WorkerErrorAttachmentJson = string;

export type WorkerErrorAttachmentBuffer = ArrayBuffer;

export type WorkerParsed = WorkerPipelineParseResult;

export type WorkerRawBodyJsonStr = string;

export type WorkerRawBodyText = string | undefined;

export type WorkerDebugRawRequestStr = string;

export type WorkerInput = WorkerPipelineInterpretInput;

export type WorkerInterpreted = WorkerPipelineInterpretResult | null | undefined;

export type WorkerErrorMessage = string;

export type WorkerErrorName = string;

export type WorkerErrorStack = string | undefined;

export type WorkerErrorIssuesRaw = unknown;

export type WorkerErrorIssues = unknown[] | undefined;

export type WorkerErrorNotification = {
  notification: {
    title: string;
    body: string;
  };
};

export type WorkerVisitorIpHeader = string | null;

export type WorkerFormatted = WorkerPipelineFormatResult;

export type WorkerMessages = WorkerPipelineSplitMessagePart[];

export type WorkerSendResult = WorkerPipelineSendResult;

export type WorkerResponse = Response;

export type WorkerCloned = Response;

export type WorkerResponseBody = string;

export type WorkerBody = Record<string, string>;

/**
 * Worker - Module Exports.
 *
 * @since 2.0.0
 */
export type WorkerModuleExports = {
  fetch: (request: Request, env: WorkerFetchEnv) => WorkerFetchReturns;
  email: (message: WorkerEmailHandlerMessage, env: WorkerEmailHandlerEnv) => WorkerEmailHandlerReturns;
};

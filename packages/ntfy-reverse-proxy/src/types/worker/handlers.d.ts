import type {
  Lib_Schema_ConfigSchema,
  Lib_Schema_ContextConfigErrorEvent,
  Lib_Schema_EmailContextConfig,
  Lib_Schema_HttpContextConfig,
  Lib_Schema_ServerConfig,
} from '../lib/schema.d.ts';
import type { Worker_Pipeline_Authenticate_Result } from './pipeline/authenticate.d.ts';
import type { Worker_Pipeline_Email_Result } from './pipeline/email.d.ts';
import type { Worker_Pipeline_Format_Result } from './pipeline/format.d.ts';
import type { Worker_Pipeline_Interpret_Result } from './pipeline/interpret.d.ts';
import type { Worker_Pipeline_Parse_Result } from './pipeline/parse.d.ts';
import type { Worker_Pipeline_Receive_Result } from './pipeline/receive.d.ts';
import type { Worker_Pipeline_Route_Result } from './pipeline/route.d.ts';
import type { Worker_Pipeline_Send_Result } from './pipeline/send.d.ts';
import type { Worker_Pipeline_Split_MessagePart } from './pipeline/split.d.ts';

/**
 * Worker - Handlers - Handle Email.
 *
 * @since 2.0.0
 */
export type Worker_Handlers_HandleEmail_RawEmail = string;

export type Worker_Handlers_HandleEmail_From = string;

export type Worker_Handlers_HandleEmail_Config = Lib_Schema_ConfigSchema;

export type Worker_Handlers_HandleEmail_Kv = KVNamespace | undefined;

export type Worker_Handlers_HandleEmail_Returns = Promise<void>;

export type Worker_Handlers_HandleEmail_Parsed = Worker_Pipeline_Email_Result & {};

export type Worker_Handlers_HandleEmail_DebugRawEmailStr = string;

export type Worker_Handlers_HandleEmail_RecipientLocalPart = string;

export type Worker_Handlers_HandleEmail_Routed = Worker_Pipeline_Route_Result & {};

export type Worker_Handlers_HandleEmail_Ctx = Lib_Schema_EmailContextConfig & {};

export type Worker_Handlers_HandleEmail_ResolvedServers = Array<Lib_Schema_ServerConfig>;

export type Worker_Handlers_HandleEmail_PrimaryServer = Lib_Schema_ServerConfig & {};

export type Worker_Handlers_HandleEmail_AuthResult = Worker_Pipeline_Authenticate_Result & {};

export type Worker_Handlers_HandleEmail_AuthErrorAttachmentData = Record<string, unknown>;

export type Worker_Handlers_HandleEmail_AuthErrorAttachmentJson = string;

export type Worker_Handlers_HandleEmail_AuthErrorAttachmentBuffer = ArrayBuffer;

export type Worker_Handlers_HandleEmail_EmailInput = Record<string, string>;

export type Worker_Handlers_HandleEmail_Interpreted = Worker_Pipeline_Interpret_Result | null | undefined;

export type Worker_Handlers_HandleEmail_ErrorName = string;

export type Worker_Handlers_HandleEmail_ErrorMessage = string;

export type Worker_Handlers_HandleEmail_ErrorStack = string | undefined;

export type Worker_Handlers_HandleEmail_ErrorIssues = unknown[] | undefined;

export type Worker_Handlers_HandleEmail_ErrorIssuesRaw = unknown;

export type Worker_Handlers_HandleEmail_InterpretErrorAttachmentData = Record<string, unknown>;

export type Worker_Handlers_HandleEmail_InterpretErrorAttachmentJson = string;

export type Worker_Handlers_HandleEmail_InterpretErrorAttachmentBuffer = ArrayBuffer;

export type Worker_Handlers_HandleEmail_Formatted = Worker_Pipeline_Format_Result & {};

export type Worker_Handlers_HandleEmail_Messages = Array<Worker_Pipeline_Split_MessagePart>;

export type Worker_Handlers_HandleEmail_SendResult = Worker_Pipeline_Send_Result & {};

export type Worker_Handlers_HandleEmail_DebugLogStr = string;

export type Worker_Handlers_HandleEmail_FatalErrorMessage = string;

export type Worker_Handlers_HandleEmail_FatalDebugStr = string;

/**
 * Worker - Handlers - Handle Request.
 *
 * @since 2.0.0
 */
export type Worker_Handlers_HandleRequest_Request = Request;

export type Worker_Handlers_HandleRequest_Config = Lib_Schema_ConfigSchema;

export type Worker_Handlers_HandleRequest_Kv = KVNamespace | undefined;

export type Worker_Handlers_HandleRequest_Returns = Promise<Response>;

export type Worker_Handlers_HandleRequest_Received = Worker_Pipeline_Receive_Result & {};

export type Worker_Handlers_HandleRequest_Subdomain = string;

export type Worker_Handlers_HandleRequest_Routed = Worker_Pipeline_Route_Result & {};

export type Worker_Handlers_HandleRequest_Ctx = Lib_Schema_HttpContextConfig & {};

export type Worker_Handlers_HandleRequest_ResolvedServers = Array<Lib_Schema_ServerConfig>;

export type Worker_Handlers_HandleRequest_PrimaryServer = Lib_Schema_ServerConfig & {};

export type Worker_Handlers_HandleRequest_AuthResult = Worker_Pipeline_Authenticate_Result & {};

export type Worker_Handlers_HandleRequest_AuthErrorAttachmentHeaderEntries = string[][];

export type Worker_Handlers_HandleRequest_AuthEntryName = string;

export type Worker_Handlers_HandleRequest_AuthEntryValue = string;

export type Worker_Handlers_HandleRequest_AuthErrorAttachmentHeaders = Record<string, string>;

export type Worker_Handlers_HandleRequest_AuthErrorAttachmentParsed = Worker_Pipeline_Parse_Result & {};

export type Worker_Handlers_HandleRequest_AuthErrorAttachmentData = Record<string, unknown>;

export type Worker_Handlers_HandleRequest_AuthErrorAttachmentJson = string;

export type Worker_Handlers_HandleRequest_AuthErrorAttachmentBuffer = ArrayBuffer;

export type Worker_Handlers_HandleRequest_Parsed = Worker_Pipeline_Parse_Result & {};

export type Worker_Handlers_HandleRequest_RawBodyJsonStr = string;

export type Worker_Handlers_HandleRequest_RawBodyText = string | undefined;

export type Worker_Handlers_HandleRequest_DebugRawRequestStr = string;

export type Worker_Handlers_HandleRequest_Input = string | object | ArrayBuffer;

export type Worker_Handlers_HandleRequest_Interpreted = Worker_Pipeline_Interpret_Result | null | undefined;

export type Worker_Handlers_HandleRequest_InterpretErrorName = string;

export type Worker_Handlers_HandleRequest_InterpretErrorMessage = string;

export type Worker_Handlers_HandleRequest_InterpretErrorStack = string | undefined;

export type Worker_Handlers_HandleRequest_InterpretErrorIssues = unknown[] | undefined;

export type Worker_Handlers_HandleRequest_InterpretErrorIssuesRaw = unknown;

export type Worker_Handlers_HandleRequest_InterpretErrorAttachmentHeaderEntries = string[][];

export type Worker_Handlers_HandleRequest_InterpretEntryName = string;

export type Worker_Handlers_HandleRequest_InterpretEntryValue = string;

export type Worker_Handlers_HandleRequest_InterpretErrorAttachmentHeaders = Record<string, string>;

export type Worker_Handlers_HandleRequest_InterpretErrorAttachmentData = Record<string, unknown>;

export type Worker_Handlers_HandleRequest_InterpretErrorAttachmentJson = string;

export type Worker_Handlers_HandleRequest_InterpretErrorAttachmentBuffer = ArrayBuffer;

export type Worker_Handlers_HandleRequest_VisitorIpHeader = string | null;

export type Worker_Handlers_HandleRequest_Formatted = Worker_Pipeline_Format_Result & {};

export type Worker_Handlers_HandleRequest_Messages = Array<Worker_Pipeline_Split_MessagePart>;

export type Worker_Handlers_HandleRequest_SendResult = Worker_Pipeline_Send_Result & {};

export type Worker_Handlers_HandleRequest_Response = Response;

export type Worker_Handlers_HandleRequest_Cloned = Response;

export type Worker_Handlers_HandleRequest_ResponseBody = string;

export type Worker_Handlers_HandleRequest_FatalErrorMessage = string;

export type Worker_Handlers_HandleRequest_Body = Record<string, string>;

/**
 * Worker - Handlers - Should Notify Error.
 *
 * @since 2.1.0
 */
export type Worker_Handlers_ShouldNotifyError_Ctx = Lib_Schema_HttpContextConfig | Lib_Schema_EmailContextConfig;

export type Worker_Handlers_ShouldNotifyError_Category = Lib_Schema_ContextConfigErrorEvent;

export type Worker_Handlers_ShouldNotifyError_Returns = boolean;

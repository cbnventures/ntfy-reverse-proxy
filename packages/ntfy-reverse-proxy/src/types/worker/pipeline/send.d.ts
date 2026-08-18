import type { Lib_Schema_ServerConfig } from '../../lib/schema.d.ts';
import type { Worker_Pipeline_Split_MessagePart } from './split.d.ts';

/**
 * Worker - Pipeline - Send.
 *
 * @since 2.0.0
 */
export type Worker_Pipeline_Send_ServerResultName = string;

export type Worker_Pipeline_Send_ServerResultSuccess = boolean;

export type Worker_Pipeline_Send_ServerResultStatus = number;

export type Worker_Pipeline_Send_ServerResultStages = string[];

export type Worker_Pipeline_Send_ServerResultError = string | undefined;

export type Worker_Pipeline_Send_ServerResult = {
  name: Worker_Pipeline_Send_ServerResultName;
  success: Worker_Pipeline_Send_ServerResultSuccess;
  status: Worker_Pipeline_Send_ServerResultStatus;
  stages: Worker_Pipeline_Send_ServerResultStages;
  error?: Worker_Pipeline_Send_ServerResultError;
};

export type Worker_Pipeline_Send_ResultResults = Worker_Pipeline_Send_ServerResult[];

export type Worker_Pipeline_Send_ResultFallbackUsed = boolean;

export type Worker_Pipeline_Send_ResultFallbackNote = string | undefined;

export type Worker_Pipeline_Send_Result = {
  results: Worker_Pipeline_Send_ResultResults;
  fallbackUsed: Worker_Pipeline_Send_ResultFallbackUsed;
  fallbackNote?: Worker_Pipeline_Send_ResultFallbackNote;
};

export type Worker_Pipeline_Send_ToServerReturns = Promise<Worker_Pipeline_Send_ServerResult>;

export type Worker_Pipeline_Send_OptionsMessages = Worker_Pipeline_Split_MessagePart[];

export type Worker_Pipeline_Send_OptionsServers = Lib_Schema_ServerConfig[];

export type Worker_Pipeline_Send_OptionsPrimaryServer = Lib_Schema_ServerConfig;

export type Worker_Pipeline_Send_OptionsTopic = string;

export type Worker_Pipeline_Send_OptionsMode = 'send-once' | 'send-all';

export type Worker_Pipeline_Send_OptionsVisitorIp = string | undefined;

export type Worker_Pipeline_Send_OptionsAttachment = ArrayBuffer | undefined;

export type Worker_Pipeline_Send_OptionsFilename = string | undefined;

export type Worker_Pipeline_Send_OptionsAttachmentHeaders = Record<string, string> | undefined;

export type Worker_Pipeline_Send_Options = {
  messages: Worker_Pipeline_Send_OptionsMessages;
  servers: Worker_Pipeline_Send_OptionsServers;
  primaryServer: Worker_Pipeline_Send_OptionsPrimaryServer;
  topic: Worker_Pipeline_Send_OptionsTopic;
  mode: Worker_Pipeline_Send_OptionsMode;
  visitorIp?: Worker_Pipeline_Send_OptionsVisitorIp;
  attachment?: Worker_Pipeline_Send_OptionsAttachment;
  filename?: Worker_Pipeline_Send_OptionsFilename;
  attachmentHeaders?: Worker_Pipeline_Send_OptionsAttachmentHeaders;
};

export type Worker_Pipeline_Send_Returns = Promise<Worker_Pipeline_Send_Result>;

export type Worker_Pipeline_Send_Messages = Worker_Pipeline_Send_OptionsMessages;

export type Worker_Pipeline_Send_Servers = Worker_Pipeline_Send_OptionsServers;

export type Worker_Pipeline_Send_PrimaryServer = Worker_Pipeline_Send_OptionsPrimaryServer;

export type Worker_Pipeline_Send_Topic = Worker_Pipeline_Send_OptionsTopic;

export type Worker_Pipeline_Send_Mode = Worker_Pipeline_Send_OptionsMode;

export type Worker_Pipeline_Send_VisitorIp = Worker_Pipeline_Send_OptionsVisitorIp;

export type Worker_Pipeline_Send_Attachment = Worker_Pipeline_Send_OptionsAttachment;

export type Worker_Pipeline_Send_Filename = Worker_Pipeline_Send_OptionsFilename;

export type Worker_Pipeline_Send_AttachmentHeaders = Worker_Pipeline_Send_OptionsAttachmentHeaders;

export type Worker_Pipeline_Send_Results = Worker_Pipeline_Send_ServerResult[];

export type Worker_Pipeline_Send_OrderedServers = Worker_Pipeline_Send_OptionsServers;

export type Worker_Pipeline_Send_FallbackResults = Worker_Pipeline_Send_ServerResult[];

export type Worker_Pipeline_Send_IsFallback = boolean;

export type Worker_Pipeline_Send_MessagesToSend = Worker_Pipeline_Send_OptionsMessages;

export type Worker_Pipeline_Send_FallbackDeliveryNote = string;

/**
 * Worker - Pipeline - Send - Send.
 *
 * @since 2.0.0
 */
export type Worker_Pipeline_Send_Send_FallbackNote = string;

export type Worker_Pipeline_Send_Send_CombinedBody = string;

export type Worker_Pipeline_Send_Send_Encoder = TextEncoder;

export type Worker_Pipeline_Send_Send_CombinedByteLength = number;

export type Worker_Pipeline_Send_Send_CurrentChunk = string;

export type Worker_Pipeline_Send_Send_CurrentBytes = number;

export type Worker_Pipeline_Send_Send_CharBytes = number;

export type Worker_Pipeline_Send_Send_OverflowChunk = string;

export type Worker_Pipeline_Send_Send_BaseTitle = string;

export type Worker_Pipeline_Send_Send_NewTotal = number;

export type Worker_Pipeline_Send_Send_RenumberedMessagesBody = string;

export type Worker_Pipeline_Send_Send_RenumberedMessagesHeaders = Record<string, string>;

export type Worker_Pipeline_Send_Send_RenumberedMessages = {
  body: Worker_Pipeline_Send_Send_RenumberedMessagesBody;
  headers: Worker_Pipeline_Send_Send_RenumberedMessagesHeaders;
}[];

/**
 * Worker - Pipeline - Send - Send To Server.
 *
 * @since 2.0.0
 */
export type Worker_Pipeline_Send_SendToServer_Server = Lib_Schema_ServerConfig;

export type Worker_Pipeline_Send_SendToServer_Messages = Worker_Pipeline_Split_MessagePart[];

export type Worker_Pipeline_Send_SendToServer_Topic = string;

export type Worker_Pipeline_Send_SendToServer_VisitorIp = string | undefined;

export type Worker_Pipeline_Send_SendToServer_Attachment = ArrayBuffer | undefined;

export type Worker_Pipeline_Send_SendToServer_Filename = string | undefined;

export type Worker_Pipeline_Send_SendToServer_AttachmentHeaders = Record<string, string> | undefined;

export type Worker_Pipeline_Send_SendToServer_Stage = string;

export type Worker_Pipeline_Send_SendToServer_Stages = Worker_Pipeline_Send_SendToServer_Stage[];

export type Worker_Pipeline_Send_SendToServer_Url = string;

export type Worker_Pipeline_Send_SendToServer_LastStatus = number;

export type Worker_Pipeline_Send_SendToServer_TotalParts = number;

export type Worker_Pipeline_Send_SendToServer_PartIndex = number;

export type Worker_Pipeline_Send_SendToServer_PartLabel = string;

export type Worker_Pipeline_Send_SendToServer_Headers = Record<string, string>;

export type Worker_Pipeline_Send_SendToServer_Response = Response;

export type Worker_Pipeline_Send_SendToServer_ErrorMessage = string;

export type Worker_Pipeline_Send_SendToServer_AttachmentRequestHeaders = Record<string, string>;

export type Worker_Pipeline_Send_SendToServer_AttachmentResponse = Response;

export type Worker_Pipeline_Send_SendToServer_AttachmentErrorMessage = string;

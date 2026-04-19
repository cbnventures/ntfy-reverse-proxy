import type { LibSchemaServerConfig } from '../../lib/schema.d.ts';
import type { WorkerPipelineSplitMessagePart } from './split.d.ts';

/**
 * Worker - Pipeline - Send.
 *
 * @since 2.0.0
 */
export type WorkerPipelineSendServerResultName = string;

export type WorkerPipelineSendServerResultSuccess = boolean;

export type WorkerPipelineSendServerResultStatus = number;

export type WorkerPipelineSendServerResultStages = string[];

export type WorkerPipelineSendServerResultError = string | undefined;

export type WorkerPipelineSendOptionsMessages = WorkerPipelineSplitMessagePart[];

export type WorkerPipelineSendOptionsServers = LibSchemaServerConfig[];

export type WorkerPipelineSendOptionsPrimaryServer = LibSchemaServerConfig;

export type WorkerPipelineSendOptionsTopic = string;

export type WorkerPipelineSendOptionsMode = 'send-once' | 'send-all';

export type WorkerPipelineSendOptionsVisitorIp = string | undefined;

export type WorkerPipelineSendOptionsAttachment = ArrayBuffer | undefined;

export type WorkerPipelineSendOptionsFilename = string | undefined;

export type WorkerPipelineSendOptionsAttachmentHeaders = Record<string, string> | undefined;

export type WorkerPipelineSendResultResults = WorkerPipelineSendServerResult[];

export type WorkerPipelineSendResultFallbackUsed = boolean;

export type WorkerPipelineSendResultFallbackNote = string | undefined;

export type WorkerPipelineSendResult = {
  results: WorkerPipelineSendResultResults;
  fallbackUsed: WorkerPipelineSendResultFallbackUsed;
  fallbackNote?: WorkerPipelineSendResultFallbackNote;
};

export type WorkerPipelineSendMessage = WorkerPipelineSplitMessagePart;

export type WorkerPipelineSendToServerServer = LibSchemaServerConfig;

export type WorkerPipelineSendToServerMessages = WorkerPipelineSplitMessagePart[];

export type WorkerPipelineSendToServerTopic = string;

export type WorkerPipelineSendToServerVisitorIp = string | undefined;

export type WorkerPipelineSendToServerAttachment = ArrayBuffer | undefined;

export type WorkerPipelineSendToServerFilename = string | undefined;

export type WorkerPipelineSendToServerAttachmentHeaders = Record<string, string> | undefined;

export type WorkerPipelineSendToServerReturns = Promise<WorkerPipelineSendServerResult>;

export type WorkerPipelineSendStages = WorkerPipelineSendStage[];

export type WorkerPipelineSendUrl = string;

export type WorkerPipelineSendLastStatus = number;

export type WorkerPipelineSendTotalParts = number;

export type WorkerPipelineSendPartIndex = number;

export type WorkerPipelineSendPartLabel = string;

export type WorkerPipelineSendHeaders = Record<string, string>;

export type WorkerPipelineSendResponse = Response;

export type WorkerPipelineSendStage = string;

export type WorkerPipelineSendErrorMessage = string;

export type WorkerPipelineSendOptions = {
  messages: WorkerPipelineSendOptionsMessages;
  servers: WorkerPipelineSendOptionsServers;
  primaryServer: WorkerPipelineSendOptionsPrimaryServer;
  topic: WorkerPipelineSendOptionsTopic;
  mode: WorkerPipelineSendOptionsMode;
  visitorIp?: WorkerPipelineSendOptionsVisitorIp;
  attachment?: WorkerPipelineSendOptionsAttachment;
  filename?: WorkerPipelineSendOptionsFilename;
  attachmentHeaders?: WorkerPipelineSendOptionsAttachmentHeaders;
};

export type WorkerPipelineSendReturns = Promise<WorkerPipelineSendResult>;

export type WorkerPipelineSendMessages = WorkerPipelineSendOptionsMessages;

export type WorkerPipelineSendServers = WorkerPipelineSendOptionsServers;

export type WorkerPipelineSendPrimaryServer = WorkerPipelineSendOptionsPrimaryServer;

export type WorkerPipelineSendTopic = WorkerPipelineSendOptionsTopic;

export type WorkerPipelineSendMode = WorkerPipelineSendOptionsMode;

export type WorkerPipelineSendVisitorIp = WorkerPipelineSendOptionsVisitorIp;

export type WorkerPipelineSendAttachment = WorkerPipelineSendOptionsAttachment;

export type WorkerPipelineSendFilename = WorkerPipelineSendOptionsFilename;

export type WorkerPipelineSendAttachmentHeaders = WorkerPipelineSendOptionsAttachmentHeaders;

export type WorkerPipelineSendSendAllPromises = Promise<WorkerPipelineSendServerResult>[];

export type WorkerPipelineSendSendAllResults = WorkerPipelineSendServerResult[];

export type WorkerPipelineSendOrderedServers = LibSchemaServerConfig[];

export type WorkerPipelineSendResultsList = WorkerPipelineSendServerResult[];

export type WorkerPipelineSendIsFallback = boolean;

export type WorkerPipelineSendMessagesToSend = WorkerPipelineSplitMessagePart[];

export type WorkerPipelineSendFallbackNote = string;

export type WorkerPipelineSendFirstMessage = WorkerPipelineSplitMessagePart;

export type WorkerPipelineSendModifiedMessages = WorkerPipelineSplitMessagePart[];

export type WorkerPipelineSendServerResult = {
  name: WorkerPipelineSendServerResultName;
  success: WorkerPipelineSendServerResultSuccess;
  status: WorkerPipelineSendServerResultStatus;
  stages: WorkerPipelineSendServerResultStages;
  error?: WorkerPipelineSendServerResultError;
};

import type {
  WorkerPipelineSendResult,
  WorkerPipelineSendResultFallbackNote,
  WorkerPipelineSendResultResults,
} from './send.d.ts';

/**
 * Worker - Pipeline - Respond.
 *
 * @since 2.0.0
 */
export type WorkerPipelineRespondOptionsShowResponseOutput = boolean;

export type WorkerPipelineRespondOptionsContextName = string | undefined;

export type WorkerPipelineRespondOptionsInterpreterName = string | undefined;

export type WorkerPipelineRespondOptionsMessageTitle = string | undefined;

export type WorkerPipelineRespondOptionsBodySize = number | undefined;

export type WorkerPipelineRespondOptionsParts = number | undefined;

export type WorkerPipelineRespondOptionsHasAttachment = boolean | undefined;

export type WorkerPipelineRespondOptions = {
  showResponseOutput: WorkerPipelineRespondOptionsShowResponseOutput;
  contextName?: WorkerPipelineRespondOptionsContextName;
  interpreterName?: WorkerPipelineRespondOptionsInterpreterName;
  messageTitle?: WorkerPipelineRespondOptionsMessageTitle;
  bodySize?: WorkerPipelineRespondOptionsBodySize;
  parts?: WorkerPipelineRespondOptionsParts;
  hasAttachment?: WorkerPipelineRespondOptionsHasAttachment;
};

export type WorkerPipelineRespondSendResult = WorkerPipelineSendResult;

export type WorkerPipelineRespondReturn = Response;

export type WorkerPipelineRespondResults = WorkerPipelineSendResultResults;

export type WorkerPipelineRespondFallbackNote = WorkerPipelineSendResultFallbackNote;

export type WorkerPipelineRespondShowResponseOutput = WorkerPipelineRespondOptionsShowResponseOutput;

export type WorkerPipelineRespondContextName = WorkerPipelineRespondOptionsContextName;

export type WorkerPipelineRespondInterpreterName = WorkerPipelineRespondOptionsInterpreterName;

export type WorkerPipelineRespondMessageTitle = WorkerPipelineRespondOptionsMessageTitle;

export type WorkerPipelineRespondBodySize = WorkerPipelineRespondOptionsBodySize;

export type WorkerPipelineRespondParts = WorkerPipelineRespondOptionsParts;

export type WorkerPipelineRespondHasAttachment = WorkerPipelineRespondOptionsHasAttachment;

export type WorkerPipelineRespondAnySuccess = boolean;

export type WorkerPipelineRespondAllSuccess = boolean;

export type WorkerPipelineRespondStatus = 'success' | 'partial' | 'failed';

export type WorkerPipelineRespondHttpStatus = number;

export type WorkerPipelineRespondBodyStatus = WorkerPipelineRespondStatus;

export type WorkerPipelineRespondBodyFallbackNote = string | undefined;

export type WorkerPipelineRespondBodyContext = string | undefined;

export type WorkerPipelineRespondBodyInterpreter = string | undefined;

export type WorkerPipelineRespondBody = {
  status: WorkerPipelineRespondBodyStatus;
  fallback_note?: WorkerPipelineRespondBodyFallbackNote;
  context?: WorkerPipelineRespondBodyContext;
  interpreter?: WorkerPipelineRespondBodyInterpreter;
  servers?: WorkerPipelineRespondBodyServers;
  message?: WorkerPipelineRespondBodyMessage;
};

export type WorkerPipelineRespondBodyServersItemName = string;

export type WorkerPipelineRespondBodyServersItemStatus = number;

export type WorkerPipelineRespondBodyServersItemSuccess = boolean;

export type WorkerPipelineRespondBodyServersItemStages = string[];

export type WorkerPipelineRespondBodyServersItem = {
  name: WorkerPipelineRespondBodyServersItemName;
  status: WorkerPipelineRespondBodyServersItemStatus;
  success: WorkerPipelineRespondBodyServersItemSuccess;
  stages: WorkerPipelineRespondBodyServersItemStages;
};

export type WorkerPipelineRespondBodyServers = WorkerPipelineRespondBodyServersItem[] | undefined;

export type WorkerPipelineRespondBodyMessageTitle = string | undefined;

export type WorkerPipelineRespondBodyMessageBodySize = number | undefined;

export type WorkerPipelineRespondBodyMessageParts = number | undefined;

export type WorkerPipelineRespondBodyMessageHasAttachment = boolean | undefined;

export type WorkerPipelineRespondBodyMessage = {
  title: WorkerPipelineRespondBodyMessageTitle;
  body_size: WorkerPipelineRespondBodyMessageBodySize;
  parts: WorkerPipelineRespondBodyMessageParts;
  has_attachment: WorkerPipelineRespondBodyMessageHasAttachment;
};

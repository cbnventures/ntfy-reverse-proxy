import type {
  Worker_Pipeline_Send_Result,
  Worker_Pipeline_Send_ResultFallbackNote,
  Worker_Pipeline_Send_ResultResults,
} from './send.d.ts';

/**
 * Worker - Pipeline - Respond.
 *
 * @since 2.0.0
 */
export type Worker_Pipeline_Respond_OptionsShowResponseOutput = boolean;

export type Worker_Pipeline_Respond_OptionsContextName = string | undefined;

export type Worker_Pipeline_Respond_OptionsInterpreterName = string | undefined;

export type Worker_Pipeline_Respond_OptionsMessageTitle = string | undefined;

export type Worker_Pipeline_Respond_OptionsBodySize = number | undefined;

export type Worker_Pipeline_Respond_OptionsParts = number | undefined;

export type Worker_Pipeline_Respond_OptionsHasAttachment = boolean | undefined;

export type Worker_Pipeline_Respond_Options = {
  showResponseOutput: Worker_Pipeline_Respond_OptionsShowResponseOutput;
  contextName?: Worker_Pipeline_Respond_OptionsContextName;
  interpreterName?: Worker_Pipeline_Respond_OptionsInterpreterName;
  messageTitle?: Worker_Pipeline_Respond_OptionsMessageTitle;
  bodySize?: Worker_Pipeline_Respond_OptionsBodySize;
  parts?: Worker_Pipeline_Respond_OptionsParts;
  hasAttachment?: Worker_Pipeline_Respond_OptionsHasAttachment;
};

export type Worker_Pipeline_Respond_SendResult = Worker_Pipeline_Send_Result;

export type Worker_Pipeline_Respond_Returns = Response;

export type Worker_Pipeline_Respond_Results = Worker_Pipeline_Send_ResultResults;

export type Worker_Pipeline_Respond_FallbackNote = Worker_Pipeline_Send_ResultFallbackNote;

export type Worker_Pipeline_Respond_ShowResponseOutput = Worker_Pipeline_Respond_OptionsShowResponseOutput;

export type Worker_Pipeline_Respond_ContextName = Worker_Pipeline_Respond_OptionsContextName;

export type Worker_Pipeline_Respond_InterpreterName = Worker_Pipeline_Respond_OptionsInterpreterName;

export type Worker_Pipeline_Respond_MessageTitle = Worker_Pipeline_Respond_OptionsMessageTitle;

export type Worker_Pipeline_Respond_BodySize = Worker_Pipeline_Respond_OptionsBodySize;

export type Worker_Pipeline_Respond_Parts = Worker_Pipeline_Respond_OptionsParts;

export type Worker_Pipeline_Respond_HasAttachment = Worker_Pipeline_Respond_OptionsHasAttachment;

export type Worker_Pipeline_Respond_AnySuccess = boolean;

export type Worker_Pipeline_Respond_AllSuccess = boolean;

export type Worker_Pipeline_Respond_Status = 'success' | 'partial' | 'failed';

export type Worker_Pipeline_Respond_HttpStatus = number;

export type Worker_Pipeline_Respond_BodyStatus = Worker_Pipeline_Respond_Status;

export type Worker_Pipeline_Respond_BodyFallbackNote = string | undefined;

export type Worker_Pipeline_Respond_BodyContext = string | undefined;

export type Worker_Pipeline_Respond_BodyInterpreter = string | undefined;

export type Worker_Pipeline_Respond_Body = {
  status: Worker_Pipeline_Respond_BodyStatus;
  fallback_note?: Worker_Pipeline_Respond_BodyFallbackNote;
  context?: Worker_Pipeline_Respond_BodyContext;
  interpreter?: Worker_Pipeline_Respond_BodyInterpreter;
  servers?: Worker_Pipeline_Respond_BodyServers;
  message?: Worker_Pipeline_Respond_BodyMessage;
};

export type Worker_Pipeline_Respond_BodyServersItemName = string;

export type Worker_Pipeline_Respond_BodyServersItemStatus = number;

export type Worker_Pipeline_Respond_BodyServersItemSuccess = boolean;

export type Worker_Pipeline_Respond_BodyServersItemStages = string[];

export type Worker_Pipeline_Respond_BodyServersItem = {
  name: Worker_Pipeline_Respond_BodyServersItemName;
  status: Worker_Pipeline_Respond_BodyServersItemStatus;
  success: Worker_Pipeline_Respond_BodyServersItemSuccess;
  stages: Worker_Pipeline_Respond_BodyServersItemStages;
};

export type Worker_Pipeline_Respond_BodyServers = Worker_Pipeline_Respond_BodyServersItem[] | undefined;

export type Worker_Pipeline_Respond_BodyMessageTitle = string | undefined;

export type Worker_Pipeline_Respond_BodyMessageBodySize = number | undefined;

export type Worker_Pipeline_Respond_BodyMessageParts = number | undefined;

export type Worker_Pipeline_Respond_BodyMessageHasAttachment = boolean | undefined;

export type Worker_Pipeline_Respond_BodyMessage = {
  title: Worker_Pipeline_Respond_BodyMessageTitle;
  body_size: Worker_Pipeline_Respond_BodyMessageBodySize;
  parts: Worker_Pipeline_Respond_BodyMessageParts;
  has_attachment: Worker_Pipeline_Respond_BodyMessageHasAttachment;
};

export type Worker_Pipeline_Respond_Respond_ResultsItemName = string;

export type Worker_Pipeline_Respond_Respond_ResultsItemSuccess = boolean;

export type Worker_Pipeline_Respond_Respond_ResultsItemStatus = number;

export type Worker_Pipeline_Respond_Respond_ResultsItemStages = string[];

export type Worker_Pipeline_Respond_Respond_ResultsItemError = string | undefined;

export type Worker_Pipeline_Respond_Respond_ResultsItem = {
  name: Worker_Pipeline_Respond_Respond_ResultsItemName;
  success: Worker_Pipeline_Respond_Respond_ResultsItemSuccess;
  status: Worker_Pipeline_Respond_Respond_ResultsItemStatus;
  stages: Worker_Pipeline_Respond_Respond_ResultsItemStages;
  error?: Worker_Pipeline_Respond_Respond_ResultsItemError;
};

export type Worker_Pipeline_Respond_Respond_Results = Worker_Pipeline_Respond_Respond_ResultsItem[];

export type Worker_Pipeline_Respond_Respond_FallbackNote = string | undefined;

export type Worker_Pipeline_Respond_Respond_PartialStatus = 'success' | 'partial' | 'failed';

export type Worker_Pipeline_Respond_Respond_ServersItemName = string;

export type Worker_Pipeline_Respond_Respond_ServersItemStatus = number;

export type Worker_Pipeline_Respond_Respond_ServersItemSuccess = boolean;

export type Worker_Pipeline_Respond_Respond_ServersItemStages = string[];

export type Worker_Pipeline_Respond_Respond_ServersItem = {
  name: Worker_Pipeline_Respond_Respond_ServersItemName;
  status: Worker_Pipeline_Respond_Respond_ServersItemStatus;
  success: Worker_Pipeline_Respond_Respond_ServersItemSuccess;
  stages: Worker_Pipeline_Respond_Respond_ServersItemStages;
};

export type Worker_Pipeline_Respond_Respond_Servers = Worker_Pipeline_Respond_Respond_ServersItem[];

export type Worker_Pipeline_Respond_Respond_MessageTitle = string | undefined;

export type Worker_Pipeline_Respond_Respond_MessageBodySize = number | undefined;

export type Worker_Pipeline_Respond_Respond_MessageParts = number | undefined;

export type Worker_Pipeline_Respond_Respond_MessageHasAttachment = boolean | undefined;

export type Worker_Pipeline_Respond_Respond_Message = {
  title: Worker_Pipeline_Respond_Respond_MessageTitle;
  body_size: Worker_Pipeline_Respond_Respond_MessageBodySize;
  parts: Worker_Pipeline_Respond_Respond_MessageParts;
  has_attachment: Worker_Pipeline_Respond_Respond_MessageHasAttachment;
};

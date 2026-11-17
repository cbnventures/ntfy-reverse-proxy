import type {
  Worker_Pipeline_Interpret_Input,
  Worker_Pipeline_Interpret_Priority,
  Worker_Pipeline_Interpret_Result,
} from '../pipeline/interpret.d.ts';

/**
 * Worker - Interpreters - Mailmask.
 *
 * @since 2.4.0
 */
export type Worker_Interpreters_Mailmask_Input = Worker_Pipeline_Interpret_Input;

export type Worker_Interpreters_Mailmask_Returns = Worker_Pipeline_Interpret_Result;

export type Worker_Interpreters_Mailmask_MailmaskInterpreter = (input: Worker_Interpreters_Mailmask_Input) => Worker_Interpreters_Mailmask_Returns;

/**
 * Worker - Interpreters - Mailmask - Format Mailmask Body.
 *
 * @since 2.4.0
 */
export type Worker_Interpreters_Mailmask_FormatMailmaskBody_Payload = unknown;

export type Worker_Interpreters_Mailmask_FormatMailmaskBody_Returns = string;

export type Worker_Interpreters_Mailmask_FormatMailmaskBody_ParsedVersion = 1;

export type Worker_Interpreters_Mailmask_FormatMailmaskBody_ParsedApp = 'mailmask';

export type Worker_Interpreters_Mailmask_FormatMailmaskBody_ParsedEvent = 'message-refused' | 'test';

export type Worker_Interpreters_Mailmask_FormatMailmaskBody_ParsedTitle = string;

export type Worker_Interpreters_Mailmask_FormatMailmaskBody_ParsedMessage = string;

export type Worker_Interpreters_Mailmask_FormatMailmaskBody_ParsedPriority = Worker_Pipeline_Interpret_Priority;

export type Worker_Interpreters_Mailmask_FormatMailmaskBody_ParsedTags = string[];

export type Worker_Interpreters_Mailmask_FormatMailmaskBody_ParsedOccurredAt = string;

export type Worker_Interpreters_Mailmask_FormatMailmaskBody_ParsedDetailsAlias = string;

export type Worker_Interpreters_Mailmask_FormatMailmaskBody_ParsedDetailsEnvelopeSender = string;

export type Worker_Interpreters_Mailmask_FormatMailmaskBody_ParsedDetailsRecipient = string;

export type Worker_Interpreters_Mailmask_FormatMailmaskBody_ParsedDetailsReason = string;

export type Worker_Interpreters_Mailmask_FormatMailmaskBody_ParsedDetails = {
  alias: Worker_Interpreters_Mailmask_FormatMailmaskBody_ParsedDetailsAlias;
  envelopeSender: Worker_Interpreters_Mailmask_FormatMailmaskBody_ParsedDetailsEnvelopeSender;
  recipient: Worker_Interpreters_Mailmask_FormatMailmaskBody_ParsedDetailsRecipient;
  reason: Worker_Interpreters_Mailmask_FormatMailmaskBody_ParsedDetailsReason;
};

export type Worker_Interpreters_Mailmask_FormatMailmaskBody_Parsed = {
  version: Worker_Interpreters_Mailmask_FormatMailmaskBody_ParsedVersion;
  app: Worker_Interpreters_Mailmask_FormatMailmaskBody_ParsedApp;
  event: Worker_Interpreters_Mailmask_FormatMailmaskBody_ParsedEvent;
  title: Worker_Interpreters_Mailmask_FormatMailmaskBody_ParsedTitle;
  message: Worker_Interpreters_Mailmask_FormatMailmaskBody_ParsedMessage;
  priority: Worker_Interpreters_Mailmask_FormatMailmaskBody_ParsedPriority;
  tags: Worker_Interpreters_Mailmask_FormatMailmaskBody_ParsedTags;
  occurredAt: Worker_Interpreters_Mailmask_FormatMailmaskBody_ParsedOccurredAt;
  details: Worker_Interpreters_Mailmask_FormatMailmaskBody_ParsedDetails;
};

export type Worker_Interpreters_Mailmask_FormatMailmaskBody_BodyLines = string[];

/**
 * Worker - Interpreters - Mailmask - Interpreter.
 *
 * @since 2.4.0
 */
export type Worker_Interpreters_Mailmask_MailmaskInterpreter_AppKey = string;

export type Worker_Interpreters_Mailmask_MailmaskInterpreter_AppName = string;

export type Worker_Interpreters_Mailmask_MailmaskInterpreter_AppFormatBody_Payload = unknown;

export type Worker_Interpreters_Mailmask_MailmaskInterpreter_AppFormatBody_Returns = string;

export type Worker_Interpreters_Mailmask_MailmaskInterpreter_AppFormatBody = (payload: Worker_Interpreters_Mailmask_MailmaskInterpreter_AppFormatBody_Payload) => Worker_Interpreters_Mailmask_MailmaskInterpreter_AppFormatBody_Returns;

export type Worker_Interpreters_Mailmask_MailmaskInterpreter_App = {
  key: Worker_Interpreters_Mailmask_MailmaskInterpreter_AppKey;
  name: Worker_Interpreters_Mailmask_MailmaskInterpreter_AppName;
  formatBody: Worker_Interpreters_Mailmask_MailmaskInterpreter_AppFormatBody;
};

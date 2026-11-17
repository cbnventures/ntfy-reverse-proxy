/**
 * Tests - Worker - Interpreters - Mailmask - Interpreter - Accepts A Future Reason Value Within Version 1.
 *
 * @since 2.4.0
 */
export type Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_AcceptsAFutureReasonValueWithinVersion1_Result_Notification_Body = string;

export type Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_AcceptsAFutureReasonValueWithinVersion1_Result_Notification = {
  body: Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_AcceptsAFutureReasonValueWithinVersion1_Result_Notification_Body;
};

export type Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_AcceptsAFutureReasonValueWithinVersion1_Result = {
  notification: Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_AcceptsAFutureReasonValueWithinVersion1_Result_Notification;
};

/**
 * Tests - Worker - Interpreters - Mailmask - Interpreter - Reads A Refusal Notification.
 *
 * @since 2.4.0
 */
export type Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsARefusalNotification_Result_Notification_Title = string | undefined;

export type Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsARefusalNotification_Result_Notification_Body = string;

export type Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsARefusalNotification_Result_Notification_Priority = 1 | 2 | 3 | 4 | 5 | undefined;

export type Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsARefusalNotification_Result_Notification_Tags = string[] | undefined;

export type Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsARefusalNotification_Result_Notification = {
  title?: Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsARefusalNotification_Result_Notification_Title;
  body: Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsARefusalNotification_Result_Notification_Body;
  priority?: Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsARefusalNotification_Result_Notification_Priority;
  tags?: Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsARefusalNotification_Result_Notification_Tags;
};

export type Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsARefusalNotification_Result = {
  notification: Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsARefusalNotification_Result_Notification;
};

/**
 * Tests - Worker - Interpreters - Mailmask - Interpreter - Reads A Test Event.
 *
 * @since 2.4.0
 */
export type Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsATestEvent_Result_Notification_Title = string | undefined;

export type Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsATestEvent_Result_Notification_Body = string;

export type Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsATestEvent_Result_Notification_Priority = 1 | 2 | 3 | 4 | 5 | undefined;

export type Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsATestEvent_Result_Notification_Tags = string[] | undefined;

export type Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsATestEvent_Result_Notification = {
  title?: Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsATestEvent_Result_Notification_Title;
  body: Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsATestEvent_Result_Notification_Body;
  priority?: Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsATestEvent_Result_Notification_Priority;
  tags?: Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsATestEvent_Result_Notification_Tags;
};

export type Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsATestEvent_Result = {
  notification: Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsATestEvent_Result_Notification;
};

/**
 * Tests - Worker - Interpreters - Mailmask - Interpreter - Reads Every Reason Value.
 *
 * @since 2.4.0
 */
export type Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsEveryReasonValue_Reason = 'disabled' | 'expired' | 'filtered' | 'misconfigured' | 'refused' | 'test';

export type Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsEveryReasonValue_Reasons = Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsEveryReasonValue_Reason[];

export type Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsEveryReasonValue_Event = 'message-refused' | 'test';

export type Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsEveryReasonValue_Result_Notification_Body = string;

export type Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsEveryReasonValue_Result_Notification = {
  body: Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsEveryReasonValue_Result_Notification_Body;
};

export type Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsEveryReasonValue_Result = {
  notification: Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_ReadsEveryReasonValue_Result_Notification;
};

/**
 * Tests - Worker - Interpreters - Mailmask - Interpreter - Rejects Malformed Bodies And Unknown Versions.
 *
 * @since 2.4.0
 */
export type Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_RejectsMalformedBodiesAndUnknownVersions_Malformed = Record<string, unknown>;

export type Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_RejectsMalformedBodiesAndUnknownVersions_FutureVersion = Record<string, unknown>;

export type Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_RejectsMalformedBodiesAndUnknownVersions_UnknownEvent = Record<string, unknown>;

export type Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_RejectsMalformedBodiesAndUnknownVersions_InvalidDetails = Record<string, unknown>;

/**
 * Tests - Worker - Interpreters - Mailmask - Interpreter - Rejects Payloads From Another App.
 *
 * @since 2.4.0
 */
export type Tests_Worker_Interpreters_Mailmask_MailmaskInterpreter_RejectsPayloadsFromAnotherApp_Alert = Record<string, unknown>;

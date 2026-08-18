/**
 * Tests - Worker - Interpreters - Ntfy JSON - Ntfy JSON Interpreter - Handles String Input By Parsing JSON.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_HandlesStringInputByParsingJSON_Result_Notification_Body = string;

export type Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_HandlesStringInputByParsingJSON_Result_Notification = {
  body: Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_HandlesStringInputByParsingJSON_Result_Notification_Body;
};

export type Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_HandlesStringInputByParsingJSON_Result = {
  notification: Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_HandlesStringInputByParsingJSON_Result_Notification;
} | null;

/**
 * Tests - Worker - Interpreters - Ntfy JSON - Ntfy JSON Interpreter - Ignores Unknown Fields.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_IgnoresUnknownFields_Result_Notification_Body = string;

export type Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_IgnoresUnknownFields_Result_Notification = {
  body: Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_IgnoresUnknownFields_Result_Notification_Body;
};

export type Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_IgnoresUnknownFields_Result = {
  notification: Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_IgnoresUnknownFields_Result_Notification;
} | null;

export type Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_IgnoresUnknownFields_RecordCast = Record<string, unknown>;

export type Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_IgnoresUnknownFields_UnknownField = unknown;

/**
 * Tests - Worker - Interpreters - Ntfy JSON - Ntfy JSON Interpreter - Maps JSON Fields To Notification Object.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_MapsJSONFieldsToNotificationObject_Result_Notification_Title = string | undefined;

export type Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_MapsJSONFieldsToNotificationObject_Result_Notification_Body = string;

export type Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_MapsJSONFieldsToNotificationObject_Result_Notification_Priority = 1 | 2 | 3 | 4 | 5 | undefined;

export type Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_MapsJSONFieldsToNotificationObject_Result_Notification_Tags = string[] | undefined;

export type Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_MapsJSONFieldsToNotificationObject_Result_Notification = {
  title?: Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_MapsJSONFieldsToNotificationObject_Result_Notification_Title;
  body: Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_MapsJSONFieldsToNotificationObject_Result_Notification_Body;
  priority?: Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_MapsJSONFieldsToNotificationObject_Result_Notification_Priority;
  tags?: Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_MapsJSONFieldsToNotificationObject_Result_Notification_Tags;
};

export type Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_MapsJSONFieldsToNotificationObject_Result = {
  notification: Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_MapsJSONFieldsToNotificationObject_Result_Notification;
} | null;

/**
 * Tests - Worker - Interpreters - Ntfy JSON - Ntfy JSON Interpreter - Maps Optional Ntfy Fields.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_MapsOptionalNtfyFields_Result_Notification_Icon = string | undefined;

export type Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_MapsOptionalNtfyFields_Result_Notification_Attach = string | undefined;

export type Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_MapsOptionalNtfyFields_Result_Notification_Filename = string | undefined;

export type Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_MapsOptionalNtfyFields_Result_Notification_Markdown = boolean | undefined;

export type Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_MapsOptionalNtfyFields_Result_Notification = {
  icon?: Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_MapsOptionalNtfyFields_Result_Notification_Icon;
  attach?: Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_MapsOptionalNtfyFields_Result_Notification_Attach;
  filename?: Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_MapsOptionalNtfyFields_Result_Notification_Filename;
  markdown?: Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_MapsOptionalNtfyFields_Result_Notification_Markdown;
};

export type Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_MapsOptionalNtfyFields_Result = {
  notification: Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_MapsOptionalNtfyFields_Result_Notification;
} | null;

/**
 * Tests - Worker - Interpreters - Ntfy JSON - Ntfy JSON Interpreter - Requires Body Field.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_RequiresBodyField_Input = Record<string, unknown>;

/**
 * Tests - Worker - Interpreters - Ntfy JSON - Ntfy JSON Interpreter - Returns Null On Non JSON String Input.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_ReturnsNullOnNonJSONStringInput_Result_Notification_Body = string;

export type Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_ReturnsNullOnNonJSONStringInput_Result_Notification = {
  body: Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_ReturnsNullOnNonJSONStringInput_Result_Notification_Body;
};

export type Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_ReturnsNullOnNonJSONStringInput_Result = {
  notification: Tests_Worker_Interpreters_NtfyJson_NtfyJsonInterpreter_ReturnsNullOnNonJSONStringInput_Result_Notification;
} | null;

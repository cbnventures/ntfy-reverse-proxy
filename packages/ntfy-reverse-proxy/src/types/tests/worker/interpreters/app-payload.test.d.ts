/**
 * Tests - Worker - Interpreters - App Payload - Interpret App Payload - Builds A Notification From An Alert.
 *
 * @since 2.3.0
 */
export type Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_BuildsANotificationFromAnAlert_Result_Notification_Title = string | undefined;

export type Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_BuildsANotificationFromAnAlert_Result_Notification_Body = string;

export type Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_BuildsANotificationFromAnAlert_Result_Notification_Priority = 1 | 2 | 3 | 4 | 5 | undefined;

export type Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_BuildsANotificationFromAnAlert_Result_Notification_Tags = string[] | undefined;

export type Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_BuildsANotificationFromAnAlert_Result_Notification = {
  title?: Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_BuildsANotificationFromAnAlert_Result_Notification_Title;
  body: Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_BuildsANotificationFromAnAlert_Result_Notification_Body;
  priority?: Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_BuildsANotificationFromAnAlert_Result_Notification_Priority;
  tags?: Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_BuildsANotificationFromAnAlert_Result_Notification_Tags;
};

export type Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_BuildsANotificationFromAnAlert_Result = {
  notification: Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_BuildsANotificationFromAnAlert_Result_Notification;
};

/**
 * Tests - Worker - Interpreters - App Payload - Interpret App Payload - Names The Right Interpreter For An Alert From Another App.
 *
 * @since 2.3.0
 */
export type Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_NamesTheRightInterpreterForAnAlertFromAnotherApp_Alert = Record<string, unknown>;

/**
 * Tests - Worker - Interpreters - App Payload - Interpret App Payload - Reads A JSON String And An Array Buffer.
 *
 * @since 2.3.0
 */
export type Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_ReadsAJSONStringAndAnArrayBuffer_Payload = string;

export type Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_ReadsAJSONStringAndAnArrayBuffer_Bytes = Uint8Array;

export type Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_ReadsAJSONStringAndAnArrayBuffer_Buffer = ArrayBuffer;

export type Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_ReadsAJSONStringAndAnArrayBuffer_FromString_Notification_Title = string | undefined;

export type Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_ReadsAJSONStringAndAnArrayBuffer_FromString_Notification = {
  title?: Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_ReadsAJSONStringAndAnArrayBuffer_FromString_Notification_Title;
};

export type Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_ReadsAJSONStringAndAnArrayBuffer_FromString = {
  notification: Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_ReadsAJSONStringAndAnArrayBuffer_FromString_Notification;
};

export type Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_ReadsAJSONStringAndAnArrayBuffer_FromBuffer_Notification_Title = string | undefined;

export type Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_ReadsAJSONStringAndAnArrayBuffer_FromBuffer_Notification = {
  title?: Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_ReadsAJSONStringAndAnArrayBuffer_FromBuffer_Notification_Title;
};

export type Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_ReadsAJSONStringAndAnArrayBuffer_FromBuffer = {
  notification: Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_ReadsAJSONStringAndAnArrayBuffer_FromBuffer_Notification;
};

/**
 * Tests - Worker - Interpreters - App Payload - Interpret App Payload - Rejects An Unknown App Without Suggesting It As An Interpreter.
 *
 * @since 2.3.0
 */
export type Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_RejectsAnUnknownAppWithoutSuggestingItAsAnInterpreter_Alert = Record<string, unknown>;

/**
 * Tests - Worker - Interpreters - App Payload - Interpret App Payload - Rejects A Payload Of The Wrong Shape.
 *
 * @since 2.3.0
 */
export type Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_RejectsAPayloadOfTheWrongShape_Shapeless = Record<string, unknown>;

export type Tests_Worker_Interpreters_AppPayload_InterpretAppPayload_RejectsAPayloadOfTheWrongShape_FutureVersion = Record<string, unknown>;

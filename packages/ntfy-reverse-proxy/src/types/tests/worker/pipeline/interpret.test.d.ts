/**
 * Tests - Worker - Pipeline - Interpret.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToNtfyJsonInterpreter_ResultNotificationBody = string;

export type Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToNtfyJsonInterpreter_ResultNotification = {
  title?: string | undefined;
  body: Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToNtfyJsonInterpreter_ResultNotificationBody;
  priority?: 1 | 2 | 3 | 4 | 5 | undefined;
  tags?: string[] | undefined;
  icon?: string | undefined;
  actions?: string | undefined;
  attach?: string | undefined;
  filename?: string | undefined;
  markdown?: boolean | undefined;
};

export type Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToNtfyJsonInterpreter_Result = {
  notification: Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToNtfyJsonInterpreter_ResultNotification;
  attachment?: ArrayBuffer | undefined;
} | null;

export type Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToPlainTextInterpreter_ResultNotificationBody = string;

export type Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToPlainTextInterpreter_ResultNotification = {
  title?: string | undefined;
  body: Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToPlainTextInterpreter_ResultNotificationBody;
  priority?: 1 | 2 | 3 | 4 | 5 | undefined;
  tags?: string[] | undefined;
  icon?: string | undefined;
  actions?: string | undefined;
  attach?: string | undefined;
  filename?: string | undefined;
  markdown?: boolean | undefined;
};

export type Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToPlainTextInterpreter_Result = {
  notification: Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToPlainTextInterpreter_ResultNotification;
  attachment?: ArrayBuffer | undefined;
} | null;

export type Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToStatuspageInterpreter_InputPageName = string;

export type Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToStatuspageInterpreter_InputPage = {
  name: Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToStatuspageInterpreter_InputPageName;
};

export type Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToStatuspageInterpreter_InputIncidentName = string;

export type Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToStatuspageInterpreter_InputIncidentStatus = string;

export type Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToStatuspageInterpreter_InputIncidentImpact = string;

export type Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToStatuspageInterpreter_InputIncidentIncidentUpdates = unknown[];

export type Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToStatuspageInterpreter_InputIncident = {
  name: Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToStatuspageInterpreter_InputIncidentName;
  status: Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToStatuspageInterpreter_InputIncidentStatus;
  impact: Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToStatuspageInterpreter_InputIncidentImpact;
  incident_updates: Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToStatuspageInterpreter_InputIncidentIncidentUpdates;
};

export type Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToStatuspageInterpreter_Input = {
  page: Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToStatuspageInterpreter_InputPage;
  incident: Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToStatuspageInterpreter_InputIncident;
};

export type Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToStatuspageInterpreter_ResultNotificationBody = string;

export type Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToStatuspageInterpreter_ResultNotification = {
  title?: string | undefined;
  body: Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToStatuspageInterpreter_ResultNotificationBody;
  priority?: 1 | 2 | 3 | 4 | 5 | undefined;
  tags?: string[] | undefined;
  icon?: string | undefined;
  actions?: string | undefined;
  attach?: string | undefined;
  filename?: string | undefined;
  markdown?: boolean | undefined;
};

export type Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToStatuspageInterpreter_Result = {
  notification: Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToStatuspageInterpreter_ResultNotification;
  attachment?: ArrayBuffer | undefined;
} | null;

export type Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToSynologyInterpreter_ResultNotificationBody = string;

export type Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToSynologyInterpreter_ResultNotification = {
  title?: string | undefined;
  body: Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToSynologyInterpreter_ResultNotificationBody;
  priority?: 1 | 2 | 3 | 4 | 5 | undefined;
  tags?: string[] | undefined;
  icon?: string | undefined;
  actions?: string | undefined;
  attach?: string | undefined;
  filename?: string | undefined;
  markdown?: boolean | undefined;
};

export type Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToSynologyInterpreter_Result = {
  notification: Tests_Worker_Pipeline_Interpret_Interpret_DispatchesToSynologyInterpreter_ResultNotification;
  attachment?: ArrayBuffer | undefined;
} | null;

export type Tests_Worker_Pipeline_Interpret_Interpret_InterpreterMapKeysMatchTheSchemaInterpreterEnums_MapKeys = string[];

export type Tests_Worker_Pipeline_Interpret_Interpret_InterpreterMapKeysMatchTheSchemaInterpreterEnums_HttpEnum = string[];

export type Tests_Worker_Pipeline_Interpret_Interpret_InterpreterMapKeysMatchTheSchemaInterpreterEnums_EmailEnum = string[];

export type Tests_Worker_Pipeline_Interpret_Interpret_ThrowsOnUnknownInterpreter_PromiseResultNotificationBody = string;

export type Tests_Worker_Pipeline_Interpret_Interpret_ThrowsOnUnknownInterpreter_PromiseResultNotification = {
  title?: string | undefined;
  body: Tests_Worker_Pipeline_Interpret_Interpret_ThrowsOnUnknownInterpreter_PromiseResultNotificationBody;
  priority?: 1 | 2 | 3 | 4 | 5 | undefined;
  tags?: string[] | undefined;
  icon?: string | undefined;
  actions?: string | undefined;
  attach?: string | undefined;
  filename?: string | undefined;
  markdown?: boolean | undefined;
};

export type Tests_Worker_Pipeline_Interpret_Interpret_ThrowsOnUnknownInterpreter_PromiseResult = {
  notification: Tests_Worker_Pipeline_Interpret_Interpret_ThrowsOnUnknownInterpreter_PromiseResultNotification;
  attachment?: ArrayBuffer | undefined;
} | null;

export type Tests_Worker_Pipeline_Interpret_Interpret_ThrowsOnUnknownInterpreter_Promise = Promise<Tests_Worker_Pipeline_Interpret_Interpret_ThrowsOnUnknownInterpreter_PromiseResult>;

export type Tests_Worker_Pipeline_Interpret_Interpret_ThrowsOnUnknownInterpreter_Expectation = Promise<void>;

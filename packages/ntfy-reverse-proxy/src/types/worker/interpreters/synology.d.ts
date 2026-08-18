import type {
  Worker_Pipeline_Interpret_Input,
  Worker_Pipeline_Interpret_NotificationObjectPriority,
  Worker_Pipeline_Interpret_Result,
} from '../pipeline/interpret.d.ts';

/**
 * Worker - Interpreters - Synology.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Synology_Input = Worker_Pipeline_Interpret_Input;

export type Worker_Interpreters_Synology_Result = Worker_Pipeline_Interpret_Result;

export type Worker_Interpreters_Synology_SynologyInterpreter = (input: Worker_Interpreters_Synology_Input) => Worker_Interpreters_Synology_Result;

/**
 * Worker - Interpreters - Synology - Map Severity To Priority.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Synology_MapSeverityToPriority_Severity = string;

export type Worker_Interpreters_Synology_MapSeverityToPriority_Returns = Worker_Pipeline_Interpret_NotificationObjectPriority;

/**
 * Worker - Interpreters - Synology - Synology Interpreter.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Synology_SynologyInterpreter_Body = string | undefined;

export type Worker_Interpreters_Synology_SynologyInterpreter_Decoder = TextDecoder;

export type Worker_Interpreters_Synology_SynologyInterpreter_Data = Record<string, unknown>;

export type Worker_Interpreters_Synology_SynologyInterpreter_RawMessage = unknown;

export type Worker_Interpreters_Synology_SynologyInterpreter_Message = string;

export type Worker_Interpreters_Synology_SynologyInterpreter_RawPrefix = unknown;

export type Worker_Interpreters_Synology_SynologyInterpreter_Hostname = string | undefined;

export type Worker_Interpreters_Synology_SynologyInterpreter_Timestamp = string | undefined;

export type Worker_Interpreters_Synology_SynologyInterpreter_PrefixParts = string[];

export type Worker_Interpreters_Synology_SynologyInterpreter_RawHostname = unknown;

export type Worker_Interpreters_Synology_SynologyInterpreter_RawDate = unknown;

export type Worker_Interpreters_Synology_SynologyInterpreter_RawTime = unknown;

export type Worker_Interpreters_Synology_SynologyInterpreter_Date = string | undefined;

export type Worker_Interpreters_Synology_SynologyInterpreter_Time = string | undefined;

export type Worker_Interpreters_Synology_SynologyInterpreter_Parts = string;

export type Worker_Interpreters_Synology_SynologyInterpreter_RawSeverity = unknown;

export type Worker_Interpreters_Synology_SynologyInterpreter_Severity = string;

export type Worker_Interpreters_Synology_SynologyInterpreter_RawEvent = unknown;

export type Worker_Interpreters_Synology_SynologyInterpreter_Event = string | undefined;

export type Worker_Interpreters_Synology_SynologyInterpreter_Title = string;

export type Worker_Interpreters_Synology_SynologyInterpreter_Priority = 1 | 2 | 3 | 4 | 5;

export type Worker_Interpreters_Synology_SynologyInterpreter_LowerMessage = string;

export type Worker_Interpreters_Synology_SynologyInterpreter_Tags = string[];

export type Worker_Interpreters_Synology_SynologyInterpreter_SanitizedEvent = string;

export type Worker_Interpreters_Synology_SynologyInterpreter_BodyLines = string[];

export type Worker_Interpreters_Synology_SynologyInterpreter_RawProxyConfigDefault = Record<string, unknown>;

export type Worker_Interpreters_Synology_SynologyInterpreter_ProxyConfig = Record<string, unknown>;

export type Worker_Interpreters_Synology_SynologyInterpreter_RawUrl = unknown;

export type Worker_Interpreters_Synology_SynologyInterpreter_DsmUrl = string | undefined;

/**
 * Worker - Interpreters - Synology - Validate URL.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Synology_ValidateUrl_RawUrl = string;

export type Worker_Interpreters_Synology_ValidateUrl_Returns = string | undefined;

export type Worker_Interpreters_Synology_ValidateUrl_Url = URL;

export type Worker_Interpreters_Synology_ValidateUrl_Protocol = string;

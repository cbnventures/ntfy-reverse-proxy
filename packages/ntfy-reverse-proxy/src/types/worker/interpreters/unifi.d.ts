import type {
  Worker_Pipeline_Interpret_Input,
  Worker_Pipeline_Interpret_NotificationObjectPriority,
  Worker_Pipeline_Interpret_Result,
} from '../pipeline/interpret.d.ts';

/**
 * Worker - Interpreters - Unifi.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Unifi_Input = Worker_Pipeline_Interpret_Input;

export type Worker_Interpreters_Unifi_Result = Worker_Pipeline_Interpret_Result;

export type Worker_Interpreters_Unifi_UnifiInterpreter = (input: Worker_Interpreters_Unifi_Input) => Worker_Interpreters_Unifi_Result;

/**
 * Worker - Interpreters - Unifi - Extract Device Tags.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Unifi_ExtractDeviceTags_Text = string;

export type Worker_Interpreters_Unifi_ExtractDeviceTags_Returns = string[];

export type Worker_Interpreters_Unifi_ExtractDeviceTags_Lower = string;

export type Worker_Interpreters_Unifi_ExtractDeviceTags_Tags = string[];

/**
 * Worker - Interpreters - Unifi - Map Event To Priority.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Unifi_MapEventToPriority_Text = string;

export type Worker_Interpreters_Unifi_MapEventToPriority_Returns = Worker_Pipeline_Interpret_NotificationObjectPriority;

export type Worker_Interpreters_Unifi_MapEventToPriority_Lower = string;

/**
 * Worker - Interpreters - Unifi - Map Priority To Emoji Tag.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Unifi_MapPriorityToEmojiTag_Priority = Worker_Pipeline_Interpret_NotificationObjectPriority;

export type Worker_Interpreters_Unifi_MapPriorityToEmojiTag_Returns = string;

/**
 * Worker - Interpreters - Unifi - Strip Subject Prefix.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Unifi_StripSubjectPrefix_Subject = string;

export type Worker_Interpreters_Unifi_StripSubjectPrefix_Returns = string;

export type Worker_Interpreters_Unifi_StripSubjectPrefix_Stripped = string;

/**
 * Worker - Interpreters - Unifi - Unifi Interpreter.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Unifi_UnifiInterpreter_StringPriority = 1 | 2 | 3 | 4 | 5;

export type Worker_Interpreters_Unifi_UnifiInterpreter_StringEmojiTag = string;

export type Worker_Interpreters_Unifi_UnifiInterpreter_Decoder = TextDecoder;

export type Worker_Interpreters_Unifi_UnifiInterpreter_BinaryBody = string;

export type Worker_Interpreters_Unifi_UnifiInterpreter_BinaryPriority = 1 | 2 | 3 | 4 | 5;

export type Worker_Interpreters_Unifi_UnifiInterpreter_BinaryEmojiTag = string;

export type Worker_Interpreters_Unifi_UnifiInterpreter_Data = Record<string, unknown>;

export type Worker_Interpreters_Unifi_UnifiInterpreter_RawSubject = unknown;

export type Worker_Interpreters_Unifi_UnifiInterpreter_Subject = string;

export type Worker_Interpreters_Unifi_UnifiInterpreter_RawTextBody = unknown;

export type Worker_Interpreters_Unifi_UnifiInterpreter_TextBody = string;

export type Worker_Interpreters_Unifi_UnifiInterpreter_EventType = string;

export type Worker_Interpreters_Unifi_UnifiInterpreter_CombinedText = string;

export type Worker_Interpreters_Unifi_UnifiInterpreter_Priority = 1 | 2 | 3 | 4 | 5;

export type Worker_Interpreters_Unifi_UnifiInterpreter_DeviceTags = string[];

export type Worker_Interpreters_Unifi_UnifiInterpreter_EmojiTag = string;

export type Worker_Interpreters_Unifi_UnifiInterpreter_Tags = string[];

export type Worker_Interpreters_Unifi_UnifiInterpreter_AlertMatch = RegExpMatchArray | null;

export type Worker_Interpreters_Unifi_UnifiInterpreter_DeviceNameMatch = RegExpMatchArray | null;

export type Worker_Interpreters_Unifi_UnifiInterpreter_TimeMatch = RegExpMatchArray | null;

export type Worker_Interpreters_Unifi_UnifiInterpreter_DeviceUrlMatch = RegExpMatchArray | null;

export type Worker_Interpreters_Unifi_UnifiInterpreter_Alert = string | undefined;

export type Worker_Interpreters_Unifi_UnifiInterpreter_DeviceName = string | undefined;

export type Worker_Interpreters_Unifi_UnifiInterpreter_Time = string | undefined;

export type Worker_Interpreters_Unifi_UnifiInterpreter_DeviceUrl = string | undefined;

export type Worker_Interpreters_Unifi_UnifiInterpreter_ValidatedDeviceUrl = string | undefined;

export type Worker_Interpreters_Unifi_UnifiInterpreter_BodyLines = string[];

export type Worker_Interpreters_Unifi_UnifiInterpreter_Details = string[];

export type Worker_Interpreters_Unifi_UnifiInterpreter_Body = string;

/**
 * Worker - Interpreters - Unifi - Validate Url.
 *
 * @since 2.1.0
 */
export type Worker_Interpreters_Unifi_ValidateUrl_RawUrl = string;

export type Worker_Interpreters_Unifi_ValidateUrl_Returns = string | undefined;

export type Worker_Interpreters_Unifi_ValidateUrl_Url = URL;

export type Worker_Interpreters_Unifi_ValidateUrl_Protocol = string;

import type {
  Worker_Pipeline_Interpret_Input,
  Worker_Pipeline_Interpret_NotificationObjectPriority,
  Worker_Pipeline_Interpret_Result,
} from '../pipeline/interpret.d.ts';

/**
 * Worker - Interpreters - Pfsense.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Pfsense_Input = Worker_Pipeline_Interpret_Input;

export type Worker_Interpreters_Pfsense_Result = Worker_Pipeline_Interpret_Result;

export type Worker_Interpreters_Pfsense_PfsenseInterpreter = (input: Worker_Interpreters_Pfsense_Input) => Worker_Interpreters_Pfsense_Result;

/**
 * Worker - Interpreters - Pfsense - Extract Content Tags.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Pfsense_ExtractContentTags_Text = string;

export type Worker_Interpreters_Pfsense_ExtractContentTags_Returns = string[];

export type Worker_Interpreters_Pfsense_ExtractContentTags_Lower = string;

export type Worker_Interpreters_Pfsense_ExtractContentTags_Tags = string[];

/**
 * Worker - Interpreters - Pfsense - Map Keywords To Priority.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Pfsense_MapKeywordsToPriority_Text = string;

export type Worker_Interpreters_Pfsense_MapKeywordsToPriority_Returns = Worker_Pipeline_Interpret_NotificationObjectPriority;

export type Worker_Interpreters_Pfsense_MapKeywordsToPriority_Lower = string;

/**
 * Worker - Interpreters - Pfsense - Map Priority To Emoji Tag.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Pfsense_MapPriorityToEmojiTag_Priority = Worker_Pipeline_Interpret_NotificationObjectPriority;

export type Worker_Interpreters_Pfsense_MapPriorityToEmojiTag_Returns = string;

/**
 * Worker - Interpreters - Pfsense - Parse Notifications.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Pfsense_ParseNotifications_TextBody = string;

export type Worker_Interpreters_Pfsense_ParseNotifications_Returns = string[];

export type Worker_Interpreters_Pfsense_ParseNotifications_Lines = string[];

export type Worker_Interpreters_Pfsense_ParseNotifications_Notifications = string[];

export type Worker_Interpreters_Pfsense_ParseNotifications_Trimmed = string;

/**
 * Worker - Interpreters - Pfsense - Pfsense Interpreter.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Pfsense_PfsenseInterpreter_StringPriority = 1 | 2 | 3 | 4 | 5;

export type Worker_Interpreters_Pfsense_PfsenseInterpreter_StringEmojiTag = string;

export type Worker_Interpreters_Pfsense_PfsenseInterpreter_Decoder = TextDecoder;

export type Worker_Interpreters_Pfsense_PfsenseInterpreter_BufferBody = string;

export type Worker_Interpreters_Pfsense_PfsenseInterpreter_BufferPriority = 1 | 2 | 3 | 4 | 5;

export type Worker_Interpreters_Pfsense_PfsenseInterpreter_BufferEmojiTag = string;

export type Worker_Interpreters_Pfsense_PfsenseInterpreter_Data = Record<string, unknown>;

export type Worker_Interpreters_Pfsense_PfsenseInterpreter_RawSubject = unknown;

export type Worker_Interpreters_Pfsense_PfsenseInterpreter_Subject = string;

export type Worker_Interpreters_Pfsense_PfsenseInterpreter_RawTextBody = unknown;

export type Worker_Interpreters_Pfsense_PfsenseInterpreter_TextBody = string;

export type Worker_Interpreters_Pfsense_PfsenseInterpreter_Hostname = string;

export type Worker_Interpreters_Pfsense_PfsenseInterpreter_Notifications = string[];

export type Worker_Interpreters_Pfsense_PfsenseInterpreter_Priority = 1 | 2 | 3 | 4 | 5;

export type Worker_Interpreters_Pfsense_PfsenseInterpreter_ContentTags = string[];

export type Worker_Interpreters_Pfsense_PfsenseInterpreter_EmojiTag = string;

export type Worker_Interpreters_Pfsense_PfsenseInterpreter_Tags = string[];

export type Worker_Interpreters_Pfsense_PfsenseInterpreter_Body = string;

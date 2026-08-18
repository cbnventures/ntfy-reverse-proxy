import type {
  Worker_Pipeline_Interpret_Input,
  Worker_Pipeline_Interpret_NotificationObjectPriority,
  Worker_Pipeline_Interpret_Result,
} from '../pipeline/interpret.d.ts';

/**
 * Worker - Interpreters - Seerr.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Seerr_Input = Worker_Pipeline_Interpret_Input;

export type Worker_Interpreters_Seerr_Result = Worker_Pipeline_Interpret_Result;

export type Worker_Interpreters_Seerr_SeerrInterpreter = (input: Worker_Interpreters_Seerr_Input) => Worker_Interpreters_Seerr_Result;

/**
 * Worker - Interpreters - Seerr - Map Notification Type To Priority.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Seerr_MapNotificationTypeToPriority_NotificationType = string;

export type Worker_Interpreters_Seerr_MapNotificationTypeToPriority_Returns = Worker_Pipeline_Interpret_NotificationObjectPriority;

/**
 * Worker - Interpreters - Seerr - Map Priority To Emoji Tag.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Seerr_MapPriorityToEmojiTag_Priority = Worker_Pipeline_Interpret_NotificationObjectPriority;

export type Worker_Interpreters_Seerr_MapPriorityToEmojiTag_Returns = string;

/**
 * Worker - Interpreters - Seerr - Seerr Interpreter.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Seerr_SeerrInterpreter_Parsed = unknown;

export type Worker_Interpreters_Seerr_SeerrInterpreter_Decoder = TextDecoder;

export type Worker_Interpreters_Seerr_SeerrInterpreter_DecodedBody = string;

export type Worker_Interpreters_Seerr_SeerrInterpreter_Data = Record<string, unknown>;

export type Worker_Interpreters_Seerr_SeerrInterpreter_NotificationType = string;

export type Worker_Interpreters_Seerr_SeerrInterpreter_Event = string;

export type Worker_Interpreters_Seerr_SeerrInterpreter_Subject = string;

export type Worker_Interpreters_Seerr_SeerrInterpreter_Message = string;

export type Worker_Interpreters_Seerr_SeerrInterpreter_Image = string | undefined;

export type Worker_Interpreters_Seerr_SeerrInterpreter_RawMediaDefault = Record<string, unknown>;

export type Worker_Interpreters_Seerr_SeerrInterpreter_Media = Record<string, unknown>;

export type Worker_Interpreters_Seerr_SeerrInterpreter_MediaType = string;

export type Worker_Interpreters_Seerr_SeerrInterpreter_TmdbId = string;

export type Worker_Interpreters_Seerr_SeerrInterpreter_MediaStatus = string;

export type Worker_Interpreters_Seerr_SeerrInterpreter_RawRequestDefault = Record<string, unknown>;

export type Worker_Interpreters_Seerr_SeerrInterpreter_Request = Record<string, unknown>;

export type Worker_Interpreters_Seerr_SeerrInterpreter_RequestedByUsername = string;

export type Worker_Interpreters_Seerr_SeerrInterpreter_RawIssueDefault = Record<string, unknown>;

export type Worker_Interpreters_Seerr_SeerrInterpreter_Issue = Record<string, unknown>;

export type Worker_Interpreters_Seerr_SeerrInterpreter_IssueType = string;

export type Worker_Interpreters_Seerr_SeerrInterpreter_ReportedByUsername = string;

export type Worker_Interpreters_Seerr_SeerrInterpreter_RawCommentDefault = Record<string, unknown>;

export type Worker_Interpreters_Seerr_SeerrInterpreter_Comment = Record<string, unknown>;

export type Worker_Interpreters_Seerr_SeerrInterpreter_CommentMessage = string;

export type Worker_Interpreters_Seerr_SeerrInterpreter_CommentedByUsername = string;

export type Worker_Interpreters_Seerr_SeerrInterpreter_Title = string;

export type Worker_Interpreters_Seerr_SeerrInterpreter_BodyLines = string[];

export type Worker_Interpreters_Seerr_SeerrInterpreter_Body = string;

export type Worker_Interpreters_Seerr_SeerrInterpreter_Priority = 1 | 2 | 3 | 4 | 5;

export type Worker_Interpreters_Seerr_SeerrInterpreter_EmojiTag = string;

export type Worker_Interpreters_Seerr_SeerrInterpreter_Tags = string[];

export type Worker_Interpreters_Seerr_SeerrInterpreter_TmdbUrl = string | undefined;

export type Worker_Interpreters_Seerr_SeerrInterpreter_RawProxyConfigDefault = Record<string, unknown>;

export type Worker_Interpreters_Seerr_SeerrInterpreter_ProxyConfig = Record<string, unknown>;

export type Worker_Interpreters_Seerr_SeerrInterpreter_RawSeerrUrl = unknown;

export type Worker_Interpreters_Seerr_SeerrInterpreter_SeerrUrl = string | undefined;

export type Worker_Interpreters_Seerr_SeerrInterpreter_Actions = string[];

/**
 * Worker - Interpreters - Seerr - Validate URL.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Seerr_ValidateUrl_RawUrl = string;

export type Worker_Interpreters_Seerr_ValidateUrl_Returns = string | undefined;

export type Worker_Interpreters_Seerr_ValidateUrl_Url = URL;

export type Worker_Interpreters_Seerr_ValidateUrl_Protocol = string;

import type {
  WorkerPipelineInterpretInput,
  WorkerPipelineInterpretNotificationObjectPriority,
  WorkerPipelineInterpretResult,
} from '../pipeline/interpret.d.ts';

/**
 * Worker - Interpreters - Seerr.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersSeerrInput = WorkerPipelineInterpretInput;

export type WorkerInterpretersSeerrResult = WorkerPipelineInterpretResult;

export type WorkerInterpretersSeerrInterpreter = (input: WorkerInterpretersSeerrInput) => WorkerInterpretersSeerrResult;

/**
 * Worker - Interpreters - Seerr - Interpreter.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersSeerrInterpreterParsed = unknown;

export type WorkerInterpretersSeerrInterpreterDecoder = TextDecoder;

export type WorkerInterpretersSeerrInterpreterDecodedBody = string;

export type WorkerInterpretersSeerrInterpreterData = Record<string, unknown>;

export type WorkerInterpretersSeerrInterpreterNotificationType = string;

export type WorkerInterpretersSeerrInterpreterEvent = string;

export type WorkerInterpretersSeerrInterpreterSubject = string;

export type WorkerInterpretersSeerrInterpreterMessage = string;

export type WorkerInterpretersSeerrInterpreterImage = string | undefined;

export type WorkerInterpretersSeerrInterpreterRawMediaDefault = Record<string, unknown>;

export type WorkerInterpretersSeerrInterpreterMedia = Record<string, unknown>;

export type WorkerInterpretersSeerrInterpreterMediaType = string;

export type WorkerInterpretersSeerrInterpreterTmdbId = string;

export type WorkerInterpretersSeerrInterpreterMediaStatus = string;

export type WorkerInterpretersSeerrInterpreterRawRequestDefault = Record<string, unknown>;

export type WorkerInterpretersSeerrInterpreterRequest = Record<string, unknown>;

export type WorkerInterpretersSeerrInterpreterRequestedByUsername = string;

export type WorkerInterpretersSeerrInterpreterRawIssueDefault = Record<string, unknown>;

export type WorkerInterpretersSeerrInterpreterIssue = Record<string, unknown>;

export type WorkerInterpretersSeerrInterpreterIssueType = string;

export type WorkerInterpretersSeerrInterpreterReportedByUsername = string;

export type WorkerInterpretersSeerrInterpreterRawCommentDefault = Record<string, unknown>;

export type WorkerInterpretersSeerrInterpreterComment = Record<string, unknown>;

export type WorkerInterpretersSeerrInterpreterCommentMessage = string;

export type WorkerInterpretersSeerrInterpreterCommentedByUsername = string;

export type WorkerInterpretersSeerrInterpreterTitle = string;

export type WorkerInterpretersSeerrInterpreterBodyLines = string[];

export type WorkerInterpretersSeerrInterpreterBody = string;

export type WorkerInterpretersSeerrInterpreterPriority = WorkerPipelineInterpretNotificationObjectPriority;

export type WorkerInterpretersSeerrInterpreterEmojiTag = string;

export type WorkerInterpretersSeerrInterpreterTags = string[];

export type WorkerInterpretersSeerrInterpreterTmdbUrl = string | undefined;

export type WorkerInterpretersSeerrInterpreterRawProxyConfigDefault = Record<string, unknown>;

export type WorkerInterpretersSeerrInterpreterProxyConfig = Record<string, unknown>;

export type WorkerInterpretersSeerrInterpreterRawSeerrUrl = unknown;

export type WorkerInterpretersSeerrInterpreterSeerrUrl = string | undefined;

export type WorkerInterpretersSeerrInterpreterActions = string[];

/**
 * Worker - Interpreters - Seerr - Map Notification Type To Priority.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersSeerrMapNotificationTypeToPriorityNotificationType = string;

export type WorkerInterpretersSeerrMapNotificationTypeToPriorityReturns = WorkerPipelineInterpretNotificationObjectPriority;

/**
 * Worker - Interpreters - Seerr - Map Priority To Emoji Tag.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersSeerrMapPriorityToEmojiTagPriority = WorkerPipelineInterpretNotificationObjectPriority;

export type WorkerInterpretersSeerrMapPriorityToEmojiTagReturns = string;

/**
 * Worker - Interpreters - Seerr - Validate URL.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersSeerrValidateUrlRawUrl = string;

export type WorkerInterpretersSeerrValidateUrlReturns = string | undefined;

export type WorkerInterpretersSeerrValidateUrlUrl = URL;

import type {
  WorkerPipelineInterpretInput,
  WorkerPipelineInterpretNotificationObjectPriority,
  WorkerPipelineInterpretResult,
} from '../pipeline/interpret.d.ts';

/**
 * Worker - Interpreters - Pfsense.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersPfsenseInput = WorkerPipelineInterpretInput;

export type WorkerInterpretersPfsenseResult = WorkerPipelineInterpretResult;

export type WorkerInterpretersPfsenseInterpreter = (input: WorkerInterpretersPfsenseInput) => WorkerInterpretersPfsenseResult;

/**
 * Worker - Interpreters - Pfsense - Extract Content Tags.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersPfsenseExtractContentTagsText = string;

export type WorkerInterpretersPfsenseExtractContentTagsReturns = string[];

export type WorkerInterpretersPfsenseExtractContentTagsLower = string;

export type WorkerInterpretersPfsenseExtractContentTagsTags = string[];

/**
 * Worker - Interpreters - Pfsense - Interpreter.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersPfsenseInterpreterPriority = WorkerPipelineInterpretNotificationObjectPriority;

export type WorkerInterpretersPfsenseInterpreterEmojiTag = string;

export type WorkerInterpretersPfsenseInterpreterDecoder = TextDecoder;

export type WorkerInterpretersPfsenseInterpreterBody = string;

export type WorkerInterpretersPfsenseInterpreterData = Record<string, unknown>;

export type WorkerInterpretersPfsenseInterpreterRawSubject = unknown;

export type WorkerInterpretersPfsenseInterpreterSubject = string;

export type WorkerInterpretersPfsenseInterpreterRawTextBody = unknown;

export type WorkerInterpretersPfsenseInterpreterTextBody = string;

export type WorkerInterpretersPfsenseInterpreterHostname = string;

export type WorkerInterpretersPfsenseInterpreterNotifications = string[];

export type WorkerInterpretersPfsenseInterpreterContentTags = string[];

export type WorkerInterpretersPfsenseInterpreterTags = string[];

/**
 * Worker - Interpreters - Pfsense - Map Keywords To Priority.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersPfsenseMapKeywordsToPriorityText = string;

export type WorkerInterpretersPfsenseMapKeywordsToPriorityReturns = WorkerPipelineInterpretNotificationObjectPriority;

export type WorkerInterpretersPfsenseMapKeywordsToPriorityLower = string;

/**
 * Worker - Interpreters - Pfsense - Map Priority To Emoji Tag.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersPfsenseMapPriorityToEmojiTagPriority = WorkerPipelineInterpretNotificationObjectPriority;

export type WorkerInterpretersPfsenseMapPriorityToEmojiTagReturns = string;

/**
 * Worker - Interpreters - Pfsense - Parse Notifications.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersPfsenseParseNotificationsTextBody = string;

export type WorkerInterpretersPfsenseParseNotificationsReturns = string[];

export type WorkerInterpretersPfsenseParseNotificationsLines = string[];

export type WorkerInterpretersPfsenseParseNotificationsNotifications = string[];

export type WorkerInterpretersPfsenseParseNotificationsPastSeparator = boolean;

export type WorkerInterpretersPfsenseParseNotificationsTrimmed = string;

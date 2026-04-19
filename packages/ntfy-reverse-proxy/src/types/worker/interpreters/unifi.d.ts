import type {
  WorkerPipelineInterpretInput,
  WorkerPipelineInterpretNotificationObjectPriority,
  WorkerPipelineInterpretResult,
} from '../pipeline/interpret.d.ts';

/**
 * Worker - Interpreters - Unifi.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersUnifiInput = WorkerPipelineInterpretInput;

export type WorkerInterpretersUnifiResult = WorkerPipelineInterpretResult;

export type WorkerInterpretersUnifiInterpreter = (input: WorkerInterpretersUnifiInput) => WorkerInterpretersUnifiResult;

/**
 * Worker - Interpreters - Unifi - Extract Device Tags.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersUnifiExtractDeviceTagsText = string;

export type WorkerInterpretersUnifiExtractDeviceTagsReturns = string[];

export type WorkerInterpretersUnifiExtractDeviceTagsLower = string;

export type WorkerInterpretersUnifiExtractDeviceTagsTags = string[];

/**
 * Worker - Interpreters - Unifi - Interpreter.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersUnifiInterpreterPriority = WorkerPipelineInterpretNotificationObjectPriority;

export type WorkerInterpretersUnifiInterpreterEmojiTag = string;

export type WorkerInterpretersUnifiInterpreterDecoder = TextDecoder;

export type WorkerInterpretersUnifiInterpreterBody = string;

export type WorkerInterpretersUnifiInterpreterData = Record<string, unknown>;

export type WorkerInterpretersUnifiInterpreterRawSubject = unknown;

export type WorkerInterpretersUnifiInterpreterSubject = string;

export type WorkerInterpretersUnifiInterpreterRawTextBody = unknown;

export type WorkerInterpretersUnifiInterpreterTextBody = string;

export type WorkerInterpretersUnifiInterpreterEventType = string;

export type WorkerInterpretersUnifiInterpreterCombinedText = string;

export type WorkerInterpretersUnifiInterpreterDeviceTags = string[];

export type WorkerInterpretersUnifiInterpreterTags = string[];

export type WorkerInterpretersUnifiInterpreterAlertMatch = RegExpMatchArray | null;

export type WorkerInterpretersUnifiInterpreterDeviceNameMatch = RegExpMatchArray | null;

export type WorkerInterpretersUnifiInterpreterTimeMatch = RegExpMatchArray | null;

export type WorkerInterpretersUnifiInterpreterDeviceUrlMatch = RegExpMatchArray | null;

export type WorkerInterpretersUnifiInterpreterAlert = string | undefined;

export type WorkerInterpretersUnifiInterpreterDeviceName = string | undefined;

export type WorkerInterpretersUnifiInterpreterTime = string | undefined;

export type WorkerInterpretersUnifiInterpreterDeviceUrl = string | undefined;

export type WorkerInterpretersUnifiInterpreterBodyLines = string[];

export type WorkerInterpretersUnifiInterpreterDetails = string[];

/**
 * Worker - Interpreters - Unifi - Map Event To Priority.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersUnifiMapEventToPriorityText = string;

export type WorkerInterpretersUnifiMapEventToPriorityReturns = WorkerPipelineInterpretNotificationObjectPriority;

export type WorkerInterpretersUnifiMapEventToPriorityLower = string;

/**
 * Worker - Interpreters - Unifi - Map Priority To Emoji Tag.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersUnifiMapPriorityToEmojiTagPriority = WorkerPipelineInterpretNotificationObjectPriority;

export type WorkerInterpretersUnifiMapPriorityToEmojiTagReturns = string;

/**
 * Worker - Interpreters - Unifi - Strip Subject Prefix.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersUnifiStripSubjectPrefixSubject = string;

export type WorkerInterpretersUnifiStripSubjectPrefixReturns = string;

export type WorkerInterpretersUnifiStripSubjectPrefixStripped = string;

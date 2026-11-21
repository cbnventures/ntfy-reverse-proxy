import type { Lib_Schema_ServerConfig } from '../lib/schema.d.ts';
import type { Shared_NtfyDelivery, Shared_NtfyMessage } from '../shared.d.ts';

/**
 * Worker - Ntfy Client - Runner - Build Message Headers.
 *
 * @since 2.5.0
 */
export type Worker_NtfyClient_Runner_BuildMessageHeaders_Message = Shared_NtfyMessage;

export type Worker_NtfyClient_Runner_BuildMessageHeaders_Returns = Record<string, string>;

export type Worker_NtfyClient_Runner_BuildMessageHeaders_Headers = Record<string, string>;

/**
 * Worker - Ntfy Client - Runner - Publish.
 *
 * @since 2.5.0
 */
export type Worker_NtfyClient_Runner_Publish_Server = Lib_Schema_ServerConfig;

export type Worker_NtfyClient_Runner_Publish_Topic = string;

export type Worker_NtfyClient_Runner_Publish_Message = Shared_NtfyMessage;

export type Worker_NtfyClient_Runner_Publish_OptionsSequenceId = string | undefined;

export type Worker_NtfyClient_Runner_Publish_OptionsForwardedFor = string | undefined;

export type Worker_NtfyClient_Runner_Publish_Options = {
  sequenceId?: Worker_NtfyClient_Runner_Publish_OptionsSequenceId;
  forwardedFor?: Worker_NtfyClient_Runner_Publish_OptionsForwardedFor;
};

export type Worker_NtfyClient_Runner_Publish_Returns = Promise<Shared_NtfyDelivery>;

export type Worker_NtfyClient_Runner_Publish_Headers = Record<string, string>;

export type Worker_NtfyClient_Runner_Publish_Response = Response;

/**
 * Worker - Ntfy Client - Runner - Read Stored Message.
 *
 * @since 2.5.0
 */
export type Worker_NtfyClient_Runner_ReadStoredMessage_LegacyBody = string;

export type Worker_NtfyClient_Runner_ReadStoredMessage_LegacyHeaders = Record<string, string | undefined>;

export type Worker_NtfyClient_Runner_ReadStoredMessage_Legacy = {
  body: Worker_NtfyClient_Runner_ReadStoredMessage_LegacyBody;
  headers: Worker_NtfyClient_Runner_ReadStoredMessage_LegacyHeaders;
};

export type Worker_NtfyClient_Runner_ReadStoredMessage_Stored = Shared_NtfyMessage | Worker_NtfyClient_Runner_ReadStoredMessage_Legacy;

export type Worker_NtfyClient_Runner_ReadStoredMessage_Returns = Shared_NtfyMessage;

export type Worker_NtfyClient_Runner_ReadStoredMessage_Headers = Worker_NtfyClient_Runner_ReadStoredMessage_LegacyHeaders;

export type Worker_NtfyClient_Runner_ReadStoredMessage_Priority = number | undefined;

/**
 * Worker - Ntfy Client - Runner - Read Stored Title.
 *
 * @since 2.5.0
 */
export type Worker_NtfyClient_Runner_ReadStoredTitle_AttachmentTitle = string | undefined;

export type Worker_NtfyClient_Runner_ReadStoredTitle_AttachmentHeaders = Record<string, string | undefined> | undefined;

export type Worker_NtfyClient_Runner_ReadStoredTitle_Returns = string | undefined;

/**
 * Worker - Ntfy Client - Runner - Upload.
 *
 * @since 2.5.0
 */
export type Worker_NtfyClient_Runner_Upload_Server = Lib_Schema_ServerConfig;

export type Worker_NtfyClient_Runner_Upload_Topic = string;

export type Worker_NtfyClient_Runner_Upload_Attachment = ArrayBuffer;

export type Worker_NtfyClient_Runner_Upload_OptionsTitle = string | undefined;

export type Worker_NtfyClient_Runner_Upload_OptionsFilename = string | undefined;

export type Worker_NtfyClient_Runner_Upload_OptionsSequenceId = string | undefined;

export type Worker_NtfyClient_Runner_Upload_OptionsForwardedFor = string | undefined;

export type Worker_NtfyClient_Runner_Upload_Options = {
  title?: Worker_NtfyClient_Runner_Upload_OptionsTitle;
  filename?: Worker_NtfyClient_Runner_Upload_OptionsFilename;
  sequenceId?: Worker_NtfyClient_Runner_Upload_OptionsSequenceId;
  forwardedFor?: Worker_NtfyClient_Runner_Upload_OptionsForwardedFor;
};

export type Worker_NtfyClient_Runner_Upload_Returns = Promise<Shared_NtfyDelivery>;

export type Worker_NtfyClient_Runner_Upload_Headers = Record<string, string>;

export type Worker_NtfyClient_Runner_Upload_Response = Response;

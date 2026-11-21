import type { MockInstance } from 'vitest';

import type { Shared_NtfyDelivery, Shared_NtfyMessage } from '../../shared.d.ts';

/**
 * Tests - Worker - Ntfy Client.
 *
 * @since 2.5.0
 */
export type Tests_Worker_NtfyClient_Server_Name = string;

export type Tests_Worker_NtfyClient_Server_Server = string;

export type Tests_Worker_NtfyClient_Server_Token = string;

export type Tests_Worker_NtfyClient_Server = {
  name: Tests_Worker_NtfyClient_Server_Name;
  server: Tests_Worker_NtfyClient_Server_Server;
  token: Tests_Worker_NtfyClient_Server_Token;
};

/**
 * Tests - Worker - Ntfy Client - Client - Maps Every Message Field To Its Header.
 *
 * @since 2.5.0
 */
export type Tests_Worker_NtfyClient_Client_MapsEveryMessageFieldToItsHeader_Headers = Record<string, string>;

/**
 * Tests - Worker - Ntfy Client - Client - Publishes With The Token Sequence And Forwarded Address.
 *
 * @since 2.5.0
 */
export type Tests_Worker_NtfyClient_Client_PublishesWithTheTokenSequenceAndForwardedAddress_FetchSpy = MockInstance<typeof fetch>;

export type Tests_Worker_NtfyClient_Client_PublishesWithTheTokenSequenceAndForwardedAddress_Delivery = Shared_NtfyDelivery & {};

/**
 * Tests - Worker - Ntfy Client - Client - Reads Messages Queued With Ntfy Headers.
 *
 * @since 2.5.0
 */
export type Tests_Worker_NtfyClient_Client_ReadsMessagesQueuedWithNtfyHeaders_Message = Shared_NtfyMessage & {};

/**
 * Tests - Worker - Ntfy Client - Client - Uploads Attachments With Their Title And File Name.
 *
 * @since 2.5.0
 */
export type Tests_Worker_NtfyClient_Client_UploadsAttachmentsWithTheirTitleAndFileName_FetchSpy = MockInstance<typeof fetch>;

export type Tests_Worker_NtfyClient_Client_UploadsAttachmentsWithTheirTitleAndFileName_Attachment = ArrayBuffer;

export type Tests_Worker_NtfyClient_Client_UploadsAttachmentsWithTheirTitleAndFileName_Delivery = Shared_NtfyDelivery & {};

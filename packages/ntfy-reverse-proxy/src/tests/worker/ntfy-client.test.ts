import {
  afterEach, describe, expect, it, vi,
} from 'vitest';

import { Runner as NtfyClient } from '../../worker/ntfy-client.js';

import type {
  Tests_Worker_NtfyClient_Client_MapsEveryMessageFieldToItsHeader_Headers,
  Tests_Worker_NtfyClient_Client_PublishesWithTheTokenSequenceAndForwardedAddress_Delivery,
  Tests_Worker_NtfyClient_Client_PublishesWithTheTokenSequenceAndForwardedAddress_FetchSpy,
  Tests_Worker_NtfyClient_Client_ReadsMessagesQueuedWithNtfyHeaders_Message,
  Tests_Worker_NtfyClient_Client_UploadsAttachmentsWithTheirTitleAndFileName_Attachment,
  Tests_Worker_NtfyClient_Client_UploadsAttachmentsWithTheirTitleAndFileName_Delivery,
  Tests_Worker_NtfyClient_Client_UploadsAttachmentsWithTheirTitleAndFileName_FetchSpy,
  Tests_Worker_NtfyClient_Server,
} from '../../types/tests/worker/ntfy-client.test.d.ts';

/**
 * Tests - Worker - Ntfy Client - Server.
 *
 * @since 2.5.0
 */
const server: Tests_Worker_NtfyClient_Server = {
  name: 'alpha',
  server: 'https://ntfy.example.com',
  token: 'tk_look_alike_token',
};

afterEach(() => {
  vi.restoreAllMocks();

  return;
});

/**
 * Tests - Worker - Ntfy Client - Client.
 *
 * @since 2.5.0
 */
describe('client', () => {
  it('maps every message field to its header', () => {
    const headers: Tests_Worker_NtfyClient_Client_MapsEveryMessageFieldToItsHeader_Headers = NtfyClient.buildMessageHeaders({
      body: 'Body',
      title: 'Title',
      priority: 4,
      tags: [
        'warning',
        'disk',
      ],
      markdown: false,
      icon: 'https://example.com/icon.png',
      actions: 'view, Open, https://example.com',
      attach: 'https://example.com/file.txt',
      filename: 'file.txt',
    });

    expect(headers).toEqual({
      'X-Title': 'Title',
      'X-Priority': '4',
      'X-Tags': 'warning,disk',
      'X-Markdown': 'false',
      'X-Icon': 'https://example.com/icon.png',
      'X-Actions': 'view, Open, https://example.com',
      'X-Attach': 'https://example.com/file.txt',
      'X-Filename': 'file.txt',
    });

    expect(NtfyClient.buildMessageHeaders({ body: 'Body' })).toEqual({});

    return;
  });

  it('publishes with the token sequence and forwarded address', async () => {
    const fetchSpy: Tests_Worker_NtfyClient_Client_PublishesWithTheTokenSequenceAndForwardedAddress_FetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('ok', { status: 200 }));

    const delivery: Tests_Worker_NtfyClient_Client_PublishesWithTheTokenSequenceAndForwardedAddress_Delivery = await NtfyClient.publish(server, 'alerts', {
      body: 'Body',
      title: 'Title',
    }, {
      sequenceId: 'delivery-1-message-1',
      forwardedFor: '203.0.113.10',
    });

    expect(delivery).toEqual({
      ok: true,
      status: 200,
    });

    expect(fetchSpy).toHaveBeenCalledWith('https://ntfy.example.com/alerts', {
      method: 'POST',
      headers: {
        'X-Title': 'Title',
        'Authorization': 'Bearer tk_look_alike_token',
        'X-Sequence-ID': 'delivery-1-message-1',
        'X-Forwarded-For': '203.0.113.10',
      },
      body: 'Body',
    });

    return;
  });

  it('uploads attachments with their title and file name', async () => {
    const fetchSpy: Tests_Worker_NtfyClient_Client_UploadsAttachmentsWithTheirTitleAndFileName_FetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('no', { status: 503 }));
    const attachment: Tests_Worker_NtfyClient_Client_UploadsAttachmentsWithTheirTitleAndFileName_Attachment = new TextEncoder().encode('data').buffer as ArrayBuffer;

    const delivery: Tests_Worker_NtfyClient_Client_UploadsAttachmentsWithTheirTitleAndFileName_Delivery = await NtfyClient.upload(server, 'alerts', attachment, {
      title: 'Authentication Error',
      filename: 'error-debug.json',
    });

    expect(delivery).toEqual({
      ok: false,
      status: 503,
    });

    expect(fetchSpy).toHaveBeenCalledWith('https://ntfy.example.com/alerts', {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer tk_look_alike_token',
        'X-Title': 'Authentication Error',
        'X-Filename': 'error-debug.json',
      },
      body: attachment,
    });

    return;
  });

  it('reads messages queued with ntfy headers', () => {
    const message: Tests_Worker_NtfyClient_Client_ReadsMessagesQueuedWithNtfyHeaders_Message = NtfyClient.readStoredMessage({
      body: 'Body',
      headers: {
        'X-Title': 'Title (1/2)',
        'X-Priority': '5',
        'X-Tags': 'warning,disk',
        'X-Markdown': 'true',
      },
    });

    expect(message).toEqual({
      body: 'Body',
      title: 'Title (1/2)',
      priority: 5,
      tags: [
        'warning',
        'disk',
      ],
      markdown: true,
    });

    expect(NtfyClient.readStoredMessage({
      body: 'Body',
      title: 'Title',
    })).toEqual({
      body: 'Body',
      title: 'Title',
    });

    expect(NtfyClient.readStoredTitle(undefined, { 'X-Title': 'Durable Delivery Discarded' })).toBe('Durable Delivery Discarded');

    expect(NtfyClient.readStoredTitle('Interpretation Error', undefined)).toBe('Interpretation Error');

    return;
  });

  return;
});

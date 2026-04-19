import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';

import { send } from '../../../worker/pipeline/send.js';

import type {
  TestsWorkerPipelineSendAttachment,
  TestsWorkerPipelineSendEveryResult,
  TestsWorkerPipelineSendMessages,
  TestsWorkerPipelineSendResult,
  TestsWorkerPipelineSendServers,
} from '../../../types/tests/worker/pipeline/send.test.d.ts';

/**
 * Tests - Worker - Pipeline - Send - Mock Fetch.
 *
 * @since 2.0.0
 */
const mockFetch = vi.fn();

vi.stubGlobal('fetch', mockFetch);

/**
 * Tests - Worker - Pipeline - Send - Servers.
 *
 * @since 2.0.0
 */
const servers: TestsWorkerPipelineSendServers = [
  {
    name: 'alpha', server: 'https://ntfy.alpha.example.com', token: 'tk_abc',
  },
  {
    name: 'beta', server: 'https://ntfy.beta.example.com', token: 'tk_def',
  },
];

/**
 * Tests - Worker - Pipeline - Send - Messages.
 *
 * @since 2.0.0
 */
const messages: TestsWorkerPipelineSendMessages = [{
  body: 'Test message', headers: { 'X-Title': 'Test' },
}];

/**
 * Tests - Worker - Pipeline - Send.
 *
 * @since 2.0.0
 */
describe('send', () => {
  beforeEach(() => {
    mockFetch.mockReset();

    return;
  });

  it('sends to primary server in send-once mode', async () => {
    mockFetch.mockResolvedValueOnce(new Response('ok', { status: 200 }));

    const result: TestsWorkerPipelineSendResult = await send({
      messages, servers, primaryServer: servers[0]!, topic: 'test-topic', mode: 'send-once', visitorIp: '1.2.3.4',
    });

    expect(result['results']).toHaveLength(1);

    expect(result['results'][0]!['success']).toBe(true);

    expect(result['results'][0]!['name']).toBe('alpha');

    return;
  });

  it('falls back to next server when primary fails in send-once', async () => {
    mockFetch
      .mockRejectedValueOnce(new Error('Connection refused'))
      .mockResolvedValueOnce(new Response('ok', { status: 200 }));

    const result: TestsWorkerPipelineSendResult = await send({
      messages, servers, primaryServer: servers[0]!, topic: 'test-topic', mode: 'send-once', visitorIp: '1.2.3.4',
    });

    expect(result['results']).toHaveLength(2);

    expect(result['results'][0]!['success']).toBe(false);

    expect(result['results'][1]!['success']).toBe(true);

    expect(result['results'][1]!['name']).toBe('beta');

    expect(result['fallbackUsed']).toBe(true);

    return;
  });

  it('sends to all servers in send-all mode', async () => {
    mockFetch
      .mockResolvedValueOnce(new Response('ok', { status: 200 }))
      .mockResolvedValueOnce(new Response('ok', { status: 200 }));

    const result: TestsWorkerPipelineSendResult = await send({
      messages, servers, primaryServer: servers[0]!, topic: 'test-topic', mode: 'send-all', visitorIp: '1.2.3.4',
    });

    expect(result['results']).toHaveLength(2);

    const everyResult: TestsWorkerPipelineSendEveryResult = result['results'].every((r) => r['success'] === true);

    expect(everyResult).toBe(true);

    return;
  });

  it('handles Stage 2 binary attachment', async () => {
    mockFetch
      .mockResolvedValueOnce(new Response('ok', { status: 200 }))
      .mockResolvedValueOnce(new Response('ok', { status: 200 }));

    const attachment: TestsWorkerPipelineSendAttachment = new TextEncoder().encode('binary data').buffer as ArrayBuffer;

    const result: TestsWorkerPipelineSendResult = await send({
      messages, servers: [servers[0]!], primaryServer: servers[0]!, topic: 'test-topic', mode: 'send-once', visitorIp: '1.2.3.4', attachment, filename: 'file.bin',
    });

    expect(mockFetch).toHaveBeenCalledTimes(2);

    expect(result['results'][0]!['stages']).toContain('stage-1: ok');

    expect(result['results'][0]!['stages']).toContain('stage-2: ok');

    return;
  });

  it('skips Stage 2 if Stage 1 fails on a server', async () => {
    mockFetch.mockRejectedValueOnce(new Error('fail'));

    const attachment: TestsWorkerPipelineSendAttachment = new TextEncoder().encode('binary data').buffer as ArrayBuffer;

    const result: TestsWorkerPipelineSendResult = await send({
      messages, servers: [servers[0]!], primaryServer: servers[0]!, topic: 'test-topic', mode: 'send-once', visitorIp: '1.2.3.4', attachment,
    });

    expect(result['results'][0]!['success']).toBe(false);

    expect(result['results'][0]!['stages']).not.toContain('stage-2: ok');

    return;
  });

  return;
});

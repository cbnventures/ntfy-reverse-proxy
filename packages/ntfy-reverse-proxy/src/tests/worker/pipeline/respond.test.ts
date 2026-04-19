import { describe, expect, it } from 'vitest';

import { respond } from '../../../worker/pipeline/respond.js';

import type {
  TestsWorkerPipelineRespondBody,
  TestsWorkerPipelineRespondResponse,
  TestsWorkerPipelineRespondSendResult,
} from '../../../types/tests/worker/pipeline/respond.test.d.ts';

/**
 * Tests - Worker - Pipeline - Respond.
 *
 * @since 2.0.0
 */
describe('respond', () => {
  it('returns success when all servers succeed', () => {
    const sendResult: TestsWorkerPipelineRespondSendResult = {
      results: [{
        name: 'alpha', success: true, status: 200, stages: ['stage-1: ok'],
      }],
      fallbackUsed: false,
    };

    const response: TestsWorkerPipelineRespondResponse = respond(sendResult, { showResponseOutput: false });

    expect(response['status']).toBe(200);

    return;
  });

  it('returns partial when some servers fail', async () => {
    const sendResult: TestsWorkerPipelineRespondSendResult = {
      results: [
        {
          name: 'alpha', success: false, status: 0, stages: ['stage-1: failed'],
        },
        {
          name: 'beta', success: true, status: 200, stages: ['stage-1: ok'],
        },
      ],
      fallbackUsed: true,
    };

    const response: TestsWorkerPipelineRespondResponse = respond(sendResult, { showResponseOutput: false });
    const body: TestsWorkerPipelineRespondBody = await response.json();

    expect(body['status']).toBe('partial');

    return;
  });

  it('returns failed when all servers fail', async () => {
    const sendResult: TestsWorkerPipelineRespondSendResult = {
      results: [{
        name: 'alpha', success: false, status: 0, stages: ['stage-1: failed'],
      }],
      fallbackUsed: false,
    };

    const response: TestsWorkerPipelineRespondResponse = respond(sendResult, { showResponseOutput: false });
    const body: TestsWorkerPipelineRespondBody = await response.json();

    expect(body['status']).toBe('failed');

    return;
  });

  it('includes debug info when show_response_output is true', async () => {
    const sendResult: TestsWorkerPipelineRespondSendResult = {
      results: [{
        name: 'alpha', success: true, status: 200, stages: ['stage-1: ok'],
      }],
      fallbackUsed: false,
    };

    const response: TestsWorkerPipelineRespondResponse = respond(sendResult, {
      showResponseOutput: true,
      contextName: 'test-context',
      interpreterName: 'plain-text',
      messageTitle: 'Test',
      bodySize: 100,
      parts: 1,
      hasAttachment: false,
    });
    const body: TestsWorkerPipelineRespondBody = await response.json();

    expect(body['context']).toBe('test-context');

    expect(body['interpreter']).toBe('plain-text');

    expect(body['servers']).toBeDefined();

    expect(body['message']).toBeDefined();

    return;
  });

  it('excludes debug info when show_response_output is false', async () => {
    const sendResult: TestsWorkerPipelineRespondSendResult = {
      results: [{
        name: 'alpha', success: true, status: 200, stages: ['stage-1: ok'],
      }],
      fallbackUsed: false,
    };

    const response: TestsWorkerPipelineRespondResponse = respond(sendResult, { showResponseOutput: false });
    const body: TestsWorkerPipelineRespondBody = await response.json();

    expect(body['servers']).toBeUndefined();

    expect(body['message']).toBeUndefined();

    return;
  });

  return;
});

import { describe, expect, it } from 'vitest';

import { respond } from '../../../worker/pipeline/respond.js';

import type {
  Tests_Worker_Pipeline_Respond_Respond_ExcludesDebugInfoWhenShowResponseOutputIsFalse_Body,
  Tests_Worker_Pipeline_Respond_Respond_ExcludesDebugInfoWhenShowResponseOutputIsFalse_Response,
  Tests_Worker_Pipeline_Respond_Respond_ExcludesDebugInfoWhenShowResponseOutputIsFalse_SendResult,
  Tests_Worker_Pipeline_Respond_Respond_IncludesDebugInfoWhenShowResponseOutputIsTrue_Body,
  Tests_Worker_Pipeline_Respond_Respond_IncludesDebugInfoWhenShowResponseOutputIsTrue_Response,
  Tests_Worker_Pipeline_Respond_Respond_IncludesDebugInfoWhenShowResponseOutputIsTrue_SendResult,
  Tests_Worker_Pipeline_Respond_Respond_ReturnsFailedWhenAllServersFail_Body,
  Tests_Worker_Pipeline_Respond_Respond_ReturnsFailedWhenAllServersFail_Response,
  Tests_Worker_Pipeline_Respond_Respond_ReturnsFailedWhenAllServersFail_SendResult,
  Tests_Worker_Pipeline_Respond_Respond_ReturnsFailedWhenResultsArrayIsEmpty_Body,
  Tests_Worker_Pipeline_Respond_Respond_ReturnsFailedWhenResultsArrayIsEmpty_Response,
  Tests_Worker_Pipeline_Respond_Respond_ReturnsFailedWhenResultsArrayIsEmpty_SendResult,
  Tests_Worker_Pipeline_Respond_Respond_ReturnsPartialWhenSomeServersFail_Body,
  Tests_Worker_Pipeline_Respond_Respond_ReturnsPartialWhenSomeServersFail_Response,
  Tests_Worker_Pipeline_Respond_Respond_ReturnsPartialWhenSomeServersFail_SendResult,
  Tests_Worker_Pipeline_Respond_Respond_ReturnsSuccessWhenAllServersSucceed_Response,
  Tests_Worker_Pipeline_Respond_Respond_ReturnsSuccessWhenAllServersSucceed_SendResult,
} from '../../../types/tests/worker/pipeline/respond.test.d.ts';

/**
 * Tests - Worker - Pipeline - Respond.
 *
 * @since 2.0.0
 */
describe('respond', () => {
  it('returns success when all servers succeed', () => {
    const sendResult: Tests_Worker_Pipeline_Respond_Respond_ReturnsSuccessWhenAllServersSucceed_SendResult = {
      results: [{
        name: 'alpha',
        success: true,
        status: 200,
        stages: ['stage-1: ok'],
      }],
      fallbackUsed: false,
    };

    const response: Tests_Worker_Pipeline_Respond_Respond_ReturnsSuccessWhenAllServersSucceed_Response = respond(sendResult, { showResponseOutput: false });

    expect(response['status']).toBe(200);

    return;
  });

  it('returns partial when some servers fail', async () => {
    const sendResult: Tests_Worker_Pipeline_Respond_Respond_ReturnsPartialWhenSomeServersFail_SendResult = {
      results: [
        {
          name: 'alpha',
          success: false,
          status: 0,
          stages: ['stage-1: failed'],
        },
        {
          name: 'beta',
          success: true,
          status: 200,
          stages: ['stage-1: ok'],
        },
      ],
      fallbackUsed: true,
    };

    const response: Tests_Worker_Pipeline_Respond_Respond_ReturnsPartialWhenSomeServersFail_Response = respond(sendResult, { showResponseOutput: false });
    const body: Tests_Worker_Pipeline_Respond_Respond_ReturnsPartialWhenSomeServersFail_Body = await response.json();

    expect(body['status']).toBe('partial');

    return;
  });

  it('returns failed when all servers fail', async () => {
    const sendResult: Tests_Worker_Pipeline_Respond_Respond_ReturnsFailedWhenAllServersFail_SendResult = {
      results: [{
        name: 'alpha',
        success: false,
        status: 0,
        stages: ['stage-1: failed'],
      }],
      fallbackUsed: false,
    };

    const response: Tests_Worker_Pipeline_Respond_Respond_ReturnsFailedWhenAllServersFail_Response = respond(sendResult, { showResponseOutput: false });
    const body: Tests_Worker_Pipeline_Respond_Respond_ReturnsFailedWhenAllServersFail_Body = await response.json();

    expect(body['status']).toBe('failed');

    return;
  });

  it('returns failed when results array is empty', async () => {
    const sendResult: Tests_Worker_Pipeline_Respond_Respond_ReturnsFailedWhenResultsArrayIsEmpty_SendResult = {
      results: [],
      fallbackUsed: false,
    };

    const response: Tests_Worker_Pipeline_Respond_Respond_ReturnsFailedWhenResultsArrayIsEmpty_Response = respond(sendResult, {
      showResponseOutput: true,
      contextName: 'test-context',
      interpreterName: 'plain-text',
      messageTitle: 'Test',
      bodySize: 100,
      parts: 1,
      hasAttachment: false,
    });
    const body: Tests_Worker_Pipeline_Respond_Respond_ReturnsFailedWhenResultsArrayIsEmpty_Body = await response.json();

    expect(response['status']).toBe(502);

    expect(body['status']).toBe('failed');

    return;
  });

  it('includes debug info when show_response_output is true', async () => {
    const sendResult: Tests_Worker_Pipeline_Respond_Respond_IncludesDebugInfoWhenShowResponseOutputIsTrue_SendResult = {
      results: [{
        name: 'alpha',
        success: true,
        status: 200,
        stages: ['stage-1: ok'],
      }],
      fallbackUsed: false,
    };

    const response: Tests_Worker_Pipeline_Respond_Respond_IncludesDebugInfoWhenShowResponseOutputIsTrue_Response = respond(sendResult, {
      showResponseOutput: true,
      contextName: 'test-context',
      interpreterName: 'plain-text',
      messageTitle: 'Test',
      bodySize: 100,
      parts: 1,
      hasAttachment: false,
    });
    const body: Tests_Worker_Pipeline_Respond_Respond_IncludesDebugInfoWhenShowResponseOutputIsTrue_Body = await response.json();

    expect(body['context']).toBe('test-context');

    expect(body['interpreter']).toBe('plain-text');

    expect(body['servers']).toBeDefined();

    expect(body['message']).toBeDefined();

    return;
  });

  it('excludes debug info when show_response_output is false', async () => {
    const sendResult: Tests_Worker_Pipeline_Respond_Respond_ExcludesDebugInfoWhenShowResponseOutputIsFalse_SendResult = {
      results: [{
        name: 'alpha',
        success: true,
        status: 200,
        stages: ['stage-1: ok'],
      }],
      fallbackUsed: false,
    };

    const response: Tests_Worker_Pipeline_Respond_Respond_ExcludesDebugInfoWhenShowResponseOutputIsFalse_Response = respond(sendResult, { showResponseOutput: false });
    const body: Tests_Worker_Pipeline_Respond_Respond_ExcludesDebugInfoWhenShowResponseOutputIsFalse_Body = await response.json();

    expect(body['servers']).toBeUndefined();

    expect(body['message']).toBeUndefined();

    return;
  });

  return;
});

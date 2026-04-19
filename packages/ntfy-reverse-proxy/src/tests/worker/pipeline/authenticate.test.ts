import { describe, expect, it } from 'vitest';

import { authenticate } from '../../../worker/pipeline/authenticate.js';

import type { TestsWorkerPipelineAuthenticateResult } from '../../../types/tests/worker/pipeline/authenticate.test.d.ts';

/**
 * Tests - Worker - Pipeline - Authenticate.
 *
 * @since 2.0.0
 */
describe('authenticate', () => {
  /**
   * Tests - Worker - Pipeline - Authenticate - HTTP Auth.
   *
   * @since 2.0.0
   */
  describe('HTTP auth', () => {
    it('passes when no token configured', () => {
      const result: TestsWorkerPipelineAuthenticateResult = authenticate({ type: 'http' }, {
        authorization: undefined, from: undefined,
      });

      expect(result['authenticated']).toBe(true);

      return;
    });

    it('passes with correct Bearer token', () => {
      const result: TestsWorkerPipelineAuthenticateResult = authenticate({
        type: 'http', token: 'my_secret',
      }, {
        authorization: 'Bearer my_secret', from: undefined,
      });

      expect(result['authenticated']).toBe(true);

      return;
    });

    it('passes with correct raw token', () => {
      const result: TestsWorkerPipelineAuthenticateResult = authenticate({
        type: 'http', token: 'my_secret',
      }, {
        authorization: 'my_secret', from: undefined,
      });

      expect(result['authenticated']).toBe(true);

      return;
    });

    it('fails with wrong token', () => {
      const result: TestsWorkerPipelineAuthenticateResult = authenticate({
        type: 'http', token: 'my_secret',
      }, {
        authorization: 'Bearer wrong', from: undefined,
      });

      expect(result['authenticated']).toBe(false);

      return;
    });

    it('fails with missing Authorization header', () => {
      const result: TestsWorkerPipelineAuthenticateResult = authenticate({
        type: 'http', token: 'my_secret',
      }, {
        authorization: undefined, from: undefined,
      });

      expect(result['authenticated']).toBe(false);

      return;
    });

    return;
  });

  /**
   * Tests - Worker - Pipeline - Authenticate - Email Auth.
   *
   * @since 2.0.0
   */
  describe('Email auth', () => {
    it('passes when no allowed_from configured', () => {
      const result: TestsWorkerPipelineAuthenticateResult = authenticate({ type: 'email' }, {
        authorization: undefined, from: 'anyone@anywhere.com',
      });

      expect(result['authenticated']).toBe(true);

      return;
    });

    it('passes with exact from match', () => {
      const result: TestsWorkerPipelineAuthenticateResult = authenticate({
        type: 'email', allowed_from: 'admin@pfsense.local',
      }, {
        authorization: undefined, from: 'admin@pfsense.local',
      });

      expect(result['authenticated']).toBe(true);

      return;
    });

    it('passes with domain wildcard match', () => {
      const result: TestsWorkerPipelineAuthenticateResult = authenticate({
        type: 'email', allowed_from: '*@pfsense.local',
      }, {
        authorization: undefined, from: 'alerts@pfsense.local',
      });

      expect(result['authenticated']).toBe(true);

      return;
    });

    it('fails with wrong sender', () => {
      const result: TestsWorkerPipelineAuthenticateResult = authenticate({
        type: 'email', allowed_from: 'admin@pfsense.local',
      }, {
        authorization: undefined, from: 'hacker@evil.com',
      });

      expect(result['authenticated']).toBe(false);

      return;
    });

    it('fails domain wildcard with wrong domain', () => {
      const result: TestsWorkerPipelineAuthenticateResult = authenticate({
        type: 'email', allowed_from: '*@pfsense.local',
      }, {
        authorization: undefined, from: 'admin@evil.com',
      });

      expect(result['authenticated']).toBe(false);

      return;
    });

    it('case-insensitive email comparison', () => {
      const result: TestsWorkerPipelineAuthenticateResult = authenticate({
        type: 'email', allowed_from: 'Admin@PfSense.Local',
      }, {
        authorization: undefined, from: 'admin@pfsense.local',
      });

      expect(result['authenticated']).toBe(true);

      return;
    });

    return;
  });

  return;
});

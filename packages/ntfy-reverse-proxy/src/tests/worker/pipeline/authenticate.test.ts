import { describe, expect, it } from 'vitest';

import { authenticate } from '../../../worker/pipeline/authenticate.js';

import type {
  Tests_Worker_Pipeline_Authenticate_Authenticate_EmailAuth_CaseInsensitiveEmailComparison_Result,
  Tests_Worker_Pipeline_Authenticate_Authenticate_EmailAuth_FailsDomainWildcardWithWrongDomain_Result,
  Tests_Worker_Pipeline_Authenticate_Authenticate_EmailAuth_FailsWithWrongSender_Result,
  Tests_Worker_Pipeline_Authenticate_Authenticate_EmailAuth_PassesWhenNoAllowedFromConfigured_Result,
  Tests_Worker_Pipeline_Authenticate_Authenticate_EmailAuth_PassesWithDomainWildcardMatch_Result,
  Tests_Worker_Pipeline_Authenticate_Authenticate_EmailAuth_PassesWithExactFromMatch_Result,
  Tests_Worker_Pipeline_Authenticate_Authenticate_HTTPAuth_FailsWithMissingAuthorizationHeader_Result,
  Tests_Worker_Pipeline_Authenticate_Authenticate_HTTPAuth_FailsWithWrongToken_Result,
  Tests_Worker_Pipeline_Authenticate_Authenticate_HTTPAuth_PassesWhenNoTokenConfigured_Result,
  Tests_Worker_Pipeline_Authenticate_Authenticate_HTTPAuth_PassesWithCorrectBearerToken_Result,
  Tests_Worker_Pipeline_Authenticate_Authenticate_HTTPAuth_PassesWithCorrectRawToken_Result,
} from '../../../types/tests/worker/pipeline/authenticate.test.d.ts';

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
      const result: Tests_Worker_Pipeline_Authenticate_Authenticate_HTTPAuth_PassesWhenNoTokenConfigured_Result = authenticate({ type: 'http' }, {
        authorization: undefined,
        from: undefined,
      });

      expect(result['authenticated']).toBe(true);

      return;
    });

    it('passes with correct Bearer token', () => {
      const result: Tests_Worker_Pipeline_Authenticate_Authenticate_HTTPAuth_PassesWithCorrectBearerToken_Result = authenticate({
        type: 'http',
        token: 'my_secret',
      }, {
        authorization: 'Bearer my_secret',
        from: undefined,
      });

      expect(result['authenticated']).toBe(true);

      return;
    });

    it('passes with correct raw token', () => {
      const result: Tests_Worker_Pipeline_Authenticate_Authenticate_HTTPAuth_PassesWithCorrectRawToken_Result = authenticate({
        type: 'http',
        token: 'my_secret',
      }, {
        authorization: 'my_secret',
        from: undefined,
      });

      expect(result['authenticated']).toBe(true);

      return;
    });

    it('fails with wrong token', () => {
      const result: Tests_Worker_Pipeline_Authenticate_Authenticate_HTTPAuth_FailsWithWrongToken_Result = authenticate({
        type: 'http',
        token: 'my_secret',
      }, {
        authorization: 'Bearer wrong',
        from: undefined,
      });

      expect(result['authenticated']).toBe(false);

      return;
    });

    it('fails with missing Authorization header', () => {
      const result: Tests_Worker_Pipeline_Authenticate_Authenticate_HTTPAuth_FailsWithMissingAuthorizationHeader_Result = authenticate({
        type: 'http',
        token: 'my_secret',
      }, {
        authorization: undefined,
        from: undefined,
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
      const result: Tests_Worker_Pipeline_Authenticate_Authenticate_EmailAuth_PassesWhenNoAllowedFromConfigured_Result = authenticate({ type: 'email' }, {
        authorization: undefined,
        from: 'anyone@anywhere.com',
      });

      expect(result['authenticated']).toBe(true);

      return;
    });

    it('passes with exact from match', () => {
      const result: Tests_Worker_Pipeline_Authenticate_Authenticate_EmailAuth_PassesWithExactFromMatch_Result = authenticate({
        type: 'email',
        allowed_from: 'admin@pfsense.local',
      }, {
        authorization: undefined,
        from: 'admin@pfsense.local',
      });

      expect(result['authenticated']).toBe(true);

      return;
    });

    it('passes with domain wildcard match', () => {
      const result: Tests_Worker_Pipeline_Authenticate_Authenticate_EmailAuth_PassesWithDomainWildcardMatch_Result = authenticate({
        type: 'email',
        allowed_from: '*@pfsense.local',
      }, {
        authorization: undefined,
        from: 'alerts@pfsense.local',
      });

      expect(result['authenticated']).toBe(true);

      return;
    });

    it('fails with wrong sender', () => {
      const result: Tests_Worker_Pipeline_Authenticate_Authenticate_EmailAuth_FailsWithWrongSender_Result = authenticate({
        type: 'email',
        allowed_from: 'admin@pfsense.local',
      }, {
        authorization: undefined,
        from: 'hacker@evil.com',
      });

      expect(result['authenticated']).toBe(false);

      return;
    });

    it('fails domain wildcard with wrong domain', () => {
      const result: Tests_Worker_Pipeline_Authenticate_Authenticate_EmailAuth_FailsDomainWildcardWithWrongDomain_Result = authenticate({
        type: 'email',
        allowed_from: '*@pfsense.local',
      }, {
        authorization: undefined,
        from: 'admin@evil.com',
      });

      expect(result['authenticated']).toBe(false);

      return;
    });

    it('case-insensitive email comparison', () => {
      const result: Tests_Worker_Pipeline_Authenticate_Authenticate_EmailAuth_CaseInsensitiveEmailComparison_Result = authenticate({
        type: 'email',
        allowed_from: 'Admin@PfSense.Local',
      }, {
        authorization: undefined,
        from: 'admin@pfsense.local',
      });

      expect(result['authenticated']).toBe(true);

      return;
    });

    return;
  });

  return;
});

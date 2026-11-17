import {
  afterEach, describe, expect, it, vi,
} from 'vitest';

import { issueSession, verifySession } from '../../../worker/pipeline/session.js';

import type {
  Tests_Worker_Pipeline_Session_CreateMockKv_Resolved,
  Tests_Worker_Pipeline_Session_CreateMockKv_Returns,
  Tests_Worker_Pipeline_Session_CreateMockKv_Store,
  Tests_Worker_Pipeline_Session_IssueSession_IssuesATokenWithTheDefaultLifetime_Issued,
  Tests_Worker_Pipeline_Session_IssueSession_IssuesATokenWithTheDefaultLifetime_Segments,
  Tests_Worker_Pipeline_Session_IssueSession_RefusesOnceTheHourlyLimitIsReached_First,
  Tests_Worker_Pipeline_Session_IssueSession_RefusesOnceTheHourlyLimitIsReached_Kv,
  Tests_Worker_Pipeline_Session_IssueSession_RefusesOnceTheHourlyLimitIsReached_Limited,
  Tests_Worker_Pipeline_Session_IssueSession_RefusesOnceTheHourlyLimitIsReached_Second,
  Tests_Worker_Pipeline_Session_IssueSession_RefusesOnceTheHourlyLimitIsReached_Third,
  Tests_Worker_Pipeline_Session_IssueSession_RefusesWithoutSessionStorage_Issued,
  Tests_Worker_Pipeline_Session_IssueToken_Issued,
  Tests_Worker_Pipeline_Session_IssueToken_Kv,
  Tests_Worker_Pipeline_Session_IssueToken_Returns,
  Tests_Worker_Pipeline_Session_KvCast,
  Tests_Worker_Pipeline_Session_Session,
  Tests_Worker_Pipeline_Session_VerifySession_AcceptsAFreshTokenOnce_First,
  Tests_Worker_Pipeline_Session_VerifySession_AcceptsAFreshTokenOnce_Issued,
  Tests_Worker_Pipeline_Session_VerifySession_AcceptsAFreshTokenOnce_Kv,
  Tests_Worker_Pipeline_Session_VerifySession_AcceptsAFreshTokenOnce_Second,
  Tests_Worker_Pipeline_Session_VerifySession_RejectsAMalformedToken_Kv,
  Tests_Worker_Pipeline_Session_VerifySession_RejectsAMalformedToken_Result,
  Tests_Worker_Pipeline_Session_VerifySession_RejectsAMissingAuthorizationHeader_Result,
  Tests_Worker_Pipeline_Session_VerifySession_RejectsAnExpiredToken_Issued,
  Tests_Worker_Pipeline_Session_VerifySession_RejectsAnExpiredToken_Kv,
  Tests_Worker_Pipeline_Session_VerifySession_RejectsAnExpiredToken_Result,
  Tests_Worker_Pipeline_Session_VerifySession_RejectsATokenForAnotherContext_Issued,
  Tests_Worker_Pipeline_Session_VerifySession_RejectsATokenForAnotherContext_Kv,
  Tests_Worker_Pipeline_Session_VerifySession_RejectsATokenForAnotherContext_Result,
  Tests_Worker_Pipeline_Session_VerifySession_RejectsATokenFromAnotherAddress_Issued,
  Tests_Worker_Pipeline_Session_VerifySession_RejectsATokenFromAnotherAddress_Kv,
  Tests_Worker_Pipeline_Session_VerifySession_RejectsATokenFromAnotherAddress_Result,
  Tests_Worker_Pipeline_Session_VerifySession_RejectsATokenSignedWithAnotherSecret_Issued,
  Tests_Worker_Pipeline_Session_VerifySession_RejectsATokenSignedWithAnotherSecret_Kv,
  Tests_Worker_Pipeline_Session_VerifySession_RejectsATokenSignedWithAnotherSecret_Result,
} from '../../../types/tests/worker/pipeline/session.test.d.ts';

/**
 * Tests - Worker - Pipeline - Session - Session.
 *
 * @since 2.4.0
 */
const session: Tests_Worker_Pipeline_Session_Session = {
  secret: 'test-secret-that-is-at-least-32-characters-long',
};

/**
 * Tests - Worker - Pipeline - Session - Create Mock Kv.
 *
 * @returns {Tests_Worker_Pipeline_Session_CreateMockKv_Returns}
 *
 * @since 2.4.0
 */
function createMockKv(): Tests_Worker_Pipeline_Session_CreateMockKv_Returns {
  const store: Tests_Worker_Pipeline_Session_CreateMockKv_Store = new Map();

  return {
    get: vi.fn((key) => {
      const resolved: Tests_Worker_Pipeline_Session_CreateMockKv_Resolved = store.get(key) ?? null;

      return Promise.resolve(resolved);
    }),
    put: vi.fn((key, value) => {
      store.set(key, value);

      return Promise.resolve();
    }),
  } as Tests_Worker_Pipeline_Session_KvCast as KVNamespace;
}

/**
 * Tests - Worker - Pipeline - Session - Issue Token.
 *
 * @param {Tests_Worker_Pipeline_Session_IssueToken_Kv} kv - Kv.
 *
 * @returns {Tests_Worker_Pipeline_Session_IssueToken_Returns}
 *
 * @since 2.4.0
 */
async function issueToken(kv: Tests_Worker_Pipeline_Session_IssueToken_Kv): Tests_Worker_Pipeline_Session_IssueToken_Returns {
  const issued: Tests_Worker_Pipeline_Session_IssueToken_Issued = await issueSession({
    contextId: 'abc123',
    session,
    clientIp: '203.0.113.10',
    kv,
  });

  if (issued['issued'] === false) {
    throw new Error(issued['reason']);
  }

  return issued['token'];
}

/**
 * Tests - Worker - Pipeline - Session.
 *
 * @since 2.4.0
 */
afterEach(() => {
  vi.useRealTimers();

  return;
});

/**
 * Tests - Worker - Pipeline - Session - Issue Session.
 *
 * @since 2.4.0
 */
describe('issueSession', () => {
  it('issues a token with the default lifetime', async () => {
    const issued: Tests_Worker_Pipeline_Session_IssueSession_IssuesATokenWithTheDefaultLifetime_Issued = await issueSession({
      contextId: 'abc123',
      session,
      clientIp: '203.0.113.10',
      kv: createMockKv(),
    });

    expect(issued['issued']).toBe(true);

    if (issued['issued'] === true) {
      const segments: Tests_Worker_Pipeline_Session_IssueSession_IssuesATokenWithTheDefaultLifetime_Segments = issued['token'].split('.');

      expect(segments).toHaveLength(3);

      expect(issued['expiresIn']).toBe(300);
    }

    return;
  });

  it('refuses once the hourly limit is reached', async () => {
    const kv: Tests_Worker_Pipeline_Session_IssueSession_RefusesOnceTheHourlyLimitIsReached_Kv = createMockKv();
    const limited: Tests_Worker_Pipeline_Session_IssueSession_RefusesOnceTheHourlyLimitIsReached_Limited = {
      ...session,
      max_per_hour: 2,
    };

    const first: Tests_Worker_Pipeline_Session_IssueSession_RefusesOnceTheHourlyLimitIsReached_First = await issueSession({
      contextId: 'abc123',
      session: limited,
      clientIp: '203.0.113.10',
      kv,
    });
    const second: Tests_Worker_Pipeline_Session_IssueSession_RefusesOnceTheHourlyLimitIsReached_Second = await issueSession({
      contextId: 'abc123',
      session: limited,
      clientIp: '203.0.113.10',
      kv,
    });
    const third: Tests_Worker_Pipeline_Session_IssueSession_RefusesOnceTheHourlyLimitIsReached_Third = await issueSession({
      contextId: 'abc123',
      session: limited,
      clientIp: '203.0.113.10',
      kv,
    });

    expect(first['issued']).toBe(true);

    expect(second['issued']).toBe(true);

    expect(third).toEqual({
      issued: false,
      status: 429,
      reason: 'Too many session requests',
    });

    return;
  });

  it('refuses without session storage', async () => {
    const issued: Tests_Worker_Pipeline_Session_IssueSession_RefusesWithoutSessionStorage_Issued = await issueSession({
      contextId: 'abc123',
      session,
      clientIp: '203.0.113.10',
      kv: undefined,
    });

    expect(issued).toEqual({
      issued: false,
      status: 503,
      reason: 'Session storage is unavailable',
    });

    return;
  });

  return;
});

/**
 * Tests - Worker - Pipeline - Session - Verify Session.
 *
 * @since 2.4.0
 */
describe('verifySession', () => {
  it('accepts a fresh token once', async () => {
    const kv: Tests_Worker_Pipeline_Session_VerifySession_AcceptsAFreshTokenOnce_Kv = createMockKv();
    const issued: Tests_Worker_Pipeline_Session_VerifySession_AcceptsAFreshTokenOnce_Issued = await issueToken(kv);

    const first: Tests_Worker_Pipeline_Session_VerifySession_AcceptsAFreshTokenOnce_First = await verifySession({
      contextId: 'abc123',
      session,
      authorization: `Bearer ${issued}`,
      clientIp: '203.0.113.10',
      kv,
    });
    const second: Tests_Worker_Pipeline_Session_VerifySession_AcceptsAFreshTokenOnce_Second = await verifySession({
      contextId: 'abc123',
      session,
      authorization: `Bearer ${issued}`,
      clientIp: '203.0.113.10',
      kv,
    });

    expect(first).toEqual({ authenticated: true });

    expect(second).toEqual({
      authenticated: false,
      reason: 'Session token was already used',
    });

    return;
  });

  it('rejects a token from another address', async () => {
    const kv: Tests_Worker_Pipeline_Session_VerifySession_RejectsATokenFromAnotherAddress_Kv = createMockKv();
    const issued: Tests_Worker_Pipeline_Session_VerifySession_RejectsATokenFromAnotherAddress_Issued = await issueToken(kv);

    const result: Tests_Worker_Pipeline_Session_VerifySession_RejectsATokenFromAnotherAddress_Result = await verifySession({
      contextId: 'abc123',
      session,
      authorization: `Bearer ${issued}`,
      clientIp: '198.51.100.20',
      kv,
    });

    expect(result).toEqual({
      authenticated: false,
      reason: 'Session token was issued to another address',
    });

    return;
  });

  it('rejects an expired token', async () => {
    vi.useFakeTimers();

    vi.setSystemTime(new Date('2026-11-15T12:00:00Z'));

    const kv: Tests_Worker_Pipeline_Session_VerifySession_RejectsAnExpiredToken_Kv = createMockKv();
    const issued: Tests_Worker_Pipeline_Session_VerifySession_RejectsAnExpiredToken_Issued = await issueToken(kv);

    vi.setSystemTime(new Date('2026-11-15T12:05:00Z'));

    const result: Tests_Worker_Pipeline_Session_VerifySession_RejectsAnExpiredToken_Result = await verifySession({
      contextId: 'abc123',
      session,
      authorization: `Bearer ${issued}`,
      clientIp: '203.0.113.10',
      kv,
    });

    expect(result).toEqual({
      authenticated: false,
      reason: 'Expired session token',
    });

    return;
  });

  it('rejects a token signed with another secret', async () => {
    const kv: Tests_Worker_Pipeline_Session_VerifySession_RejectsATokenSignedWithAnotherSecret_Kv = createMockKv();
    const issued: Tests_Worker_Pipeline_Session_VerifySession_RejectsATokenSignedWithAnotherSecret_Issued = await issueToken(kv);

    const result: Tests_Worker_Pipeline_Session_VerifySession_RejectsATokenSignedWithAnotherSecret_Result = await verifySession({
      contextId: 'abc123',
      session: { secret: 'another-secret-that-is-at-least-32-characters' },
      authorization: `Bearer ${issued}`,
      clientIp: '203.0.113.10',
      kv,
    });

    expect(result).toEqual({
      authenticated: false,
      reason: 'Invalid session token',
    });

    return;
  });

  it('rejects a token for another context', async () => {
    const kv: Tests_Worker_Pipeline_Session_VerifySession_RejectsATokenForAnotherContext_Kv = createMockKv();
    const issued: Tests_Worker_Pipeline_Session_VerifySession_RejectsATokenForAnotherContext_Issued = await issueToken(kv);

    const result: Tests_Worker_Pipeline_Session_VerifySession_RejectsATokenForAnotherContext_Result = await verifySession({
      contextId: 'xyz789',
      session,
      authorization: `Bearer ${issued}`,
      clientIp: '203.0.113.10',
      kv,
    });

    expect(result).toEqual({
      authenticated: false,
      reason: 'Invalid session token',
    });

    return;
  });

  it('rejects a missing Authorization header', async () => {
    const result: Tests_Worker_Pipeline_Session_VerifySession_RejectsAMissingAuthorizationHeader_Result = await verifySession({
      contextId: 'abc123',
      session,
      authorization: undefined,
      clientIp: '203.0.113.10',
      kv: createMockKv(),
    });

    expect(result).toEqual({
      authenticated: false,
      reason: 'Missing Authorization header',
    });

    return;
  });

  it('rejects a malformed token', async () => {
    const kv: Tests_Worker_Pipeline_Session_VerifySession_RejectsAMalformedToken_Kv = createMockKv();

    const result: Tests_Worker_Pipeline_Session_VerifySession_RejectsAMalformedToken_Result = await verifySession({
      contextId: 'abc123',
      session,
      authorization: 'Bearer not-a-jwt',
      clientIp: '203.0.113.10',
      kv,
    });

    expect(result).toEqual({
      authenticated: false,
      reason: 'Invalid session token',
    });

    return;
  });

  return;
});

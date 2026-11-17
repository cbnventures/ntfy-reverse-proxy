import type { Lib_Schema_SessionConfig } from '../../../lib/schema.d.ts';
import type {
  Worker_Pipeline_Session_IssueSession_ReturnsResult,
  Worker_Pipeline_Session_VerifySession_ReturnsResult,
} from '../../../worker/pipeline/session.d.ts';

/**
 * Tests - Worker - Pipeline - Session.
 *
 * @since 2.4.0
 */
export type Tests_Worker_Pipeline_Session_Session = Lib_Schema_SessionConfig & {};

export type Tests_Worker_Pipeline_Session_KvCast = unknown;

/**
 * Tests - Worker - Pipeline - Session - Create Mock Kv.
 *
 * @since 2.4.0
 */
export type Tests_Worker_Pipeline_Session_CreateMockKv_Returns = KVNamespace;

export type Tests_Worker_Pipeline_Session_CreateMockKv_Store = Map<string, string>;

export type Tests_Worker_Pipeline_Session_CreateMockKv_Resolved = string | null;

/**
 * Tests - Worker - Pipeline - Session - Issue Session - Issues A Token With The Default Lifetime.
 *
 * @since 2.4.0
 */
export type Tests_Worker_Pipeline_Session_IssueSession_IssuesATokenWithTheDefaultLifetime_Issued = Worker_Pipeline_Session_IssueSession_ReturnsResult & {};

export type Tests_Worker_Pipeline_Session_IssueSession_IssuesATokenWithTheDefaultLifetime_Segments = string[];

/**
 * Tests - Worker - Pipeline - Session - Issue Session - Refuses Once The Hourly Limit Is Reached.
 *
 * @since 2.4.0
 */
export type Tests_Worker_Pipeline_Session_IssueSession_RefusesOnceTheHourlyLimitIsReached_Kv = KVNamespace;

export type Tests_Worker_Pipeline_Session_IssueSession_RefusesOnceTheHourlyLimitIsReached_Limited = Lib_Schema_SessionConfig & {};

export type Tests_Worker_Pipeline_Session_IssueSession_RefusesOnceTheHourlyLimitIsReached_First = Worker_Pipeline_Session_IssueSession_ReturnsResult & {};

export type Tests_Worker_Pipeline_Session_IssueSession_RefusesOnceTheHourlyLimitIsReached_Second = Worker_Pipeline_Session_IssueSession_ReturnsResult & {};

export type Tests_Worker_Pipeline_Session_IssueSession_RefusesOnceTheHourlyLimitIsReached_Third = Worker_Pipeline_Session_IssueSession_ReturnsResult & {};

/**
 * Tests - Worker - Pipeline - Session - Issue Session - Refuses Without Session Storage.
 *
 * @since 2.4.0
 */
export type Tests_Worker_Pipeline_Session_IssueSession_RefusesWithoutSessionStorage_Issued = Worker_Pipeline_Session_IssueSession_ReturnsResult & {};

/**
 * Tests - Worker - Pipeline - Session - Issue Token.
 *
 * @since 2.4.0
 */
export type Tests_Worker_Pipeline_Session_IssueToken_Kv = KVNamespace;

export type Tests_Worker_Pipeline_Session_IssueToken_Returns = Promise<string>;

export type Tests_Worker_Pipeline_Session_IssueToken_Issued = Worker_Pipeline_Session_IssueSession_ReturnsResult & {};

/**
 * Tests - Worker - Pipeline - Session - Verify Session - Accepts A Fresh Token Once.
 *
 * @since 2.4.0
 */
export type Tests_Worker_Pipeline_Session_VerifySession_AcceptsAFreshTokenOnce_Kv = KVNamespace;

export type Tests_Worker_Pipeline_Session_VerifySession_AcceptsAFreshTokenOnce_Issued = string;

export type Tests_Worker_Pipeline_Session_VerifySession_AcceptsAFreshTokenOnce_First = Worker_Pipeline_Session_VerifySession_ReturnsResult & {};

export type Tests_Worker_Pipeline_Session_VerifySession_AcceptsAFreshTokenOnce_Second = Worker_Pipeline_Session_VerifySession_ReturnsResult & {};

/**
 * Tests - Worker - Pipeline - Session - Verify Session - Rejects A Malformed Token.
 *
 * @since 2.4.0
 */
export type Tests_Worker_Pipeline_Session_VerifySession_RejectsAMalformedToken_Kv = KVNamespace;

export type Tests_Worker_Pipeline_Session_VerifySession_RejectsAMalformedToken_Result = Worker_Pipeline_Session_VerifySession_ReturnsResult & {};

/**
 * Tests - Worker - Pipeline - Session - Verify Session - Rejects A Missing Authorization Header.
 *
 * @since 2.4.0
 */
export type Tests_Worker_Pipeline_Session_VerifySession_RejectsAMissingAuthorizationHeader_Result = Worker_Pipeline_Session_VerifySession_ReturnsResult & {};

/**
 * Tests - Worker - Pipeline - Session - Verify Session - Rejects An Expired Token.
 *
 * @since 2.4.0
 */
export type Tests_Worker_Pipeline_Session_VerifySession_RejectsAnExpiredToken_Kv = KVNamespace;

export type Tests_Worker_Pipeline_Session_VerifySession_RejectsAnExpiredToken_Issued = string;

export type Tests_Worker_Pipeline_Session_VerifySession_RejectsAnExpiredToken_Result = Worker_Pipeline_Session_VerifySession_ReturnsResult & {};

/**
 * Tests - Worker - Pipeline - Session - Verify Session - Rejects A Token For Another Context.
 *
 * @since 2.4.0
 */
export type Tests_Worker_Pipeline_Session_VerifySession_RejectsATokenForAnotherContext_Kv = KVNamespace;

export type Tests_Worker_Pipeline_Session_VerifySession_RejectsATokenForAnotherContext_Issued = string;

export type Tests_Worker_Pipeline_Session_VerifySession_RejectsATokenForAnotherContext_Result = Worker_Pipeline_Session_VerifySession_ReturnsResult & {};

/**
 * Tests - Worker - Pipeline - Session - Verify Session - Rejects A Token From Another Address.
 *
 * @since 2.4.0
 */
export type Tests_Worker_Pipeline_Session_VerifySession_RejectsATokenFromAnotherAddress_Kv = KVNamespace;

export type Tests_Worker_Pipeline_Session_VerifySession_RejectsATokenFromAnotherAddress_Issued = string;

export type Tests_Worker_Pipeline_Session_VerifySession_RejectsATokenFromAnotherAddress_Result = Worker_Pipeline_Session_VerifySession_ReturnsResult & {};

/**
 * Tests - Worker - Pipeline - Session - Verify Session - Rejects A Token Signed With Another Secret.
 *
 * @since 2.4.0
 */
export type Tests_Worker_Pipeline_Session_VerifySession_RejectsATokenSignedWithAnotherSecret_Kv = KVNamespace;

export type Tests_Worker_Pipeline_Session_VerifySession_RejectsATokenSignedWithAnotherSecret_Issued = string;

export type Tests_Worker_Pipeline_Session_VerifySession_RejectsATokenSignedWithAnotherSecret_Result = Worker_Pipeline_Session_VerifySession_ReturnsResult & {};

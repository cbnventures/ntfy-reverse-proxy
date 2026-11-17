import type { z } from 'zod';

import type { Lib_Schema_SessionConfig } from '../../lib/schema.d.ts';

/**
 * Worker - Pipeline - Session - Decode Base64 URL.
 *
 * @since 2.4.0
 */
export type Worker_Pipeline_Session_DecodeBase64Url_Value = string;

export type Worker_Pipeline_Session_DecodeBase64Url_Returns = Uint8Array<ArrayBuffer> | null;

export type Worker_Pipeline_Session_DecodeBase64Url_Standard = string;

export type Worker_Pipeline_Session_DecodeBase64Url_Padded = string;

export type Worker_Pipeline_Session_DecodeBase64Url_Binary = string;

/**
 * Worker - Pipeline - Session - Encode Base64 URL.
 *
 * @since 2.4.0
 */
export type Worker_Pipeline_Session_EncodeBase64Url_Bytes = Uint8Array;

export type Worker_Pipeline_Session_EncodeBase64Url_Returns = string;

export type Worker_Pipeline_Session_EncodeBase64Url_Binary = string;

/**
 * Worker - Pipeline - Session - Import Key.
 *
 * @since 2.4.0
 */
export type Worker_Pipeline_Session_ImportKey_Secret = string;

export type Worker_Pipeline_Session_ImportKey_Returns = Promise<CryptoKey>;

/**
 * Worker - Pipeline - Session - Issue Session.
 *
 * @since 2.4.0
 */
export type Worker_Pipeline_Session_IssueSession_OptionsContextId = string;

export type Worker_Pipeline_Session_IssueSession_OptionsSession = Lib_Schema_SessionConfig;

export type Worker_Pipeline_Session_IssueSession_OptionsClientIp = string;

export type Worker_Pipeline_Session_IssueSession_OptionsKv = KVNamespace | undefined;

export type Worker_Pipeline_Session_IssueSession_Options = {
  contextId: Worker_Pipeline_Session_IssueSession_OptionsContextId;
  session: Worker_Pipeline_Session_IssueSession_OptionsSession;
  clientIp: Worker_Pipeline_Session_IssueSession_OptionsClientIp;
  kv: Worker_Pipeline_Session_IssueSession_OptionsKv;
};

export type Worker_Pipeline_Session_IssueSession_ReturnsSuccessIssued = true;

export type Worker_Pipeline_Session_IssueSession_ReturnsSuccessToken = string;

export type Worker_Pipeline_Session_IssueSession_ReturnsSuccessExpiresIn = number;

export type Worker_Pipeline_Session_IssueSession_ReturnsSuccess = {
  issued: Worker_Pipeline_Session_IssueSession_ReturnsSuccessIssued;
  token: Worker_Pipeline_Session_IssueSession_ReturnsSuccessToken;
  expiresIn: Worker_Pipeline_Session_IssueSession_ReturnsSuccessExpiresIn;
};

export type Worker_Pipeline_Session_IssueSession_ReturnsFailureIssued = false;

export type Worker_Pipeline_Session_IssueSession_ReturnsFailureStatus = 429 | 503;

export type Worker_Pipeline_Session_IssueSession_ReturnsFailureReason = string;

export type Worker_Pipeline_Session_IssueSession_ReturnsFailure = {
  issued: Worker_Pipeline_Session_IssueSession_ReturnsFailureIssued;
  status: Worker_Pipeline_Session_IssueSession_ReturnsFailureStatus;
  reason: Worker_Pipeline_Session_IssueSession_ReturnsFailureReason;
};

export type Worker_Pipeline_Session_IssueSession_ReturnsResult = Worker_Pipeline_Session_IssueSession_ReturnsSuccess | Worker_Pipeline_Session_IssueSession_ReturnsFailure;

export type Worker_Pipeline_Session_IssueSession_Returns = Promise<Worker_Pipeline_Session_IssueSession_ReturnsResult>;

export type Worker_Pipeline_Session_IssueSession_TtlSeconds = number;

export type Worker_Pipeline_Session_IssueSession_MaxPerHour = number;

export type Worker_Pipeline_Session_IssueSession_IssuedAt = number;

export type Worker_Pipeline_Session_IssueSession_HourBucket = number;

export type Worker_Pipeline_Session_IssueSession_RateKey = string;

export type Worker_Pipeline_Session_IssueSession_RawCount = string | null;

export type Worker_Pipeline_Session_IssueSession_Count = number;

export type Worker_Pipeline_Session_IssueSession_ExpiresAt = number;

export type Worker_Pipeline_Session_IssueSession_PayloadAud = string;

export type Worker_Pipeline_Session_IssueSession_PayloadIp = string;

export type Worker_Pipeline_Session_IssueSession_PayloadJti = string;

export type Worker_Pipeline_Session_IssueSession_PayloadIat = number;

export type Worker_Pipeline_Session_IssueSession_PayloadExp = number;

export type Worker_Pipeline_Session_IssueSession_Payload = {
  aud: Worker_Pipeline_Session_IssueSession_PayloadAud;
  ip: Worker_Pipeline_Session_IssueSession_PayloadIp;
  jti: Worker_Pipeline_Session_IssueSession_PayloadJti;
  iat: Worker_Pipeline_Session_IssueSession_PayloadIat;
  exp: Worker_Pipeline_Session_IssueSession_PayloadExp;
};

export type Worker_Pipeline_Session_IssueSession_EncodedHeader = string;

export type Worker_Pipeline_Session_IssueSession_EncodedPayload = string;

export type Worker_Pipeline_Session_IssueSession_SigningInput = string;

export type Worker_Pipeline_Session_IssueSession_Key = CryptoKey;

export type Worker_Pipeline_Session_IssueSession_Signature = ArrayBuffer;

/**
 * Worker - Pipeline - Session - Verify Session.
 *
 * @since 2.4.0
 */
export type Worker_Pipeline_Session_VerifySession_OptionsContextId = string;

export type Worker_Pipeline_Session_VerifySession_OptionsSession = Lib_Schema_SessionConfig;

export type Worker_Pipeline_Session_VerifySession_OptionsAuthorization = string | undefined;

export type Worker_Pipeline_Session_VerifySession_OptionsClientIp = string;

export type Worker_Pipeline_Session_VerifySession_OptionsKv = KVNamespace | undefined;

export type Worker_Pipeline_Session_VerifySession_Options = {
  contextId: Worker_Pipeline_Session_VerifySession_OptionsContextId;
  session: Worker_Pipeline_Session_VerifySession_OptionsSession;
  authorization: Worker_Pipeline_Session_VerifySession_OptionsAuthorization;
  clientIp: Worker_Pipeline_Session_VerifySession_OptionsClientIp;
  kv: Worker_Pipeline_Session_VerifySession_OptionsKv;
};

export type Worker_Pipeline_Session_VerifySession_ReturnsSuccessAuthenticated = true;

export type Worker_Pipeline_Session_VerifySession_ReturnsSuccess = {
  authenticated: Worker_Pipeline_Session_VerifySession_ReturnsSuccessAuthenticated;
};

export type Worker_Pipeline_Session_VerifySession_ReturnsFailureAuthenticated = false;

export type Worker_Pipeline_Session_VerifySession_ReturnsFailureReason = string;

export type Worker_Pipeline_Session_VerifySession_ReturnsFailure = {
  authenticated: Worker_Pipeline_Session_VerifySession_ReturnsFailureAuthenticated;
  reason: Worker_Pipeline_Session_VerifySession_ReturnsFailureReason;
};

export type Worker_Pipeline_Session_VerifySession_ReturnsResult = Worker_Pipeline_Session_VerifySession_ReturnsSuccess | Worker_Pipeline_Session_VerifySession_ReturnsFailure;

export type Worker_Pipeline_Session_VerifySession_Returns = Promise<Worker_Pipeline_Session_VerifySession_ReturnsResult>;

export type Worker_Pipeline_Session_VerifySession_Authorization = string | undefined;

export type Worker_Pipeline_Session_VerifySession_Token = string;

export type Worker_Pipeline_Session_VerifySession_Parts = string[];

export type Worker_Pipeline_Session_VerifySession_EncodedHeader = string | undefined;

export type Worker_Pipeline_Session_VerifySession_EncodedPayload = string | undefined;

export type Worker_Pipeline_Session_VerifySession_EncodedSignature = string | undefined;

export type Worker_Pipeline_Session_VerifySession_DecodedHeader = Uint8Array<ArrayBuffer> | null;

export type Worker_Pipeline_Session_VerifySession_DecodedPayload = Uint8Array<ArrayBuffer> | null;

export type Worker_Pipeline_Session_VerifySession_DecodedSignature = Uint8Array<ArrayBuffer> | null;

export type Worker_Pipeline_Session_VerifySession_HeaderJson = unknown;

export type Worker_Pipeline_Session_VerifySession_PayloadJson = unknown;

export type Worker_Pipeline_Session_VerifySession_SigningInput = string;

export type Worker_Pipeline_Session_VerifySession_Key = CryptoKey;

export type Worker_Pipeline_Session_VerifySession_IsValidSignature = boolean;

export type Worker_Pipeline_Session_VerifySession_PayloadResult = z.ZodSafeParseResult<Worker_Pipeline_Session_VerifySession_Payload>;

export type Worker_Pipeline_Session_VerifySession_PayloadAud = string;

export type Worker_Pipeline_Session_VerifySession_PayloadIp = string;

export type Worker_Pipeline_Session_VerifySession_PayloadJti = string;

export type Worker_Pipeline_Session_VerifySession_PayloadIat = number;

export type Worker_Pipeline_Session_VerifySession_PayloadExp = number;

export type Worker_Pipeline_Session_VerifySession_Payload = {
  aud: Worker_Pipeline_Session_VerifySession_PayloadAud;
  ip: Worker_Pipeline_Session_VerifySession_PayloadIp;
  jti: Worker_Pipeline_Session_VerifySession_PayloadJti;
  iat: Worker_Pipeline_Session_VerifySession_PayloadIat;
  exp: Worker_Pipeline_Session_VerifySession_PayloadExp;
};

export type Worker_Pipeline_Session_VerifySession_Now = number;

export type Worker_Pipeline_Session_VerifySession_UsedKey = string;

export type Worker_Pipeline_Session_VerifySession_WasUsed = string | null;

export type Worker_Pipeline_Session_VerifySession_UsedTtl = number;

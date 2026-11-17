import { z } from 'zod';

import { LIB_REGEX_TRAILING_BASE64_PADDING } from '../../lib/regex.js';

import type {
  Worker_Pipeline_Session_DecodeBase64Url_Binary,
  Worker_Pipeline_Session_DecodeBase64Url_Padded,
  Worker_Pipeline_Session_DecodeBase64Url_Returns,
  Worker_Pipeline_Session_DecodeBase64Url_Standard,
  Worker_Pipeline_Session_DecodeBase64Url_Value,
  Worker_Pipeline_Session_EncodeBase64Url_Binary,
  Worker_Pipeline_Session_EncodeBase64Url_Bytes,
  Worker_Pipeline_Session_EncodeBase64Url_Returns,
  Worker_Pipeline_Session_ImportKey_Returns,
  Worker_Pipeline_Session_ImportKey_Secret,
  Worker_Pipeline_Session_IssueSession_Count,
  Worker_Pipeline_Session_IssueSession_EncodedHeader,
  Worker_Pipeline_Session_IssueSession_EncodedPayload,
  Worker_Pipeline_Session_IssueSession_ExpiresAt,
  Worker_Pipeline_Session_IssueSession_HourBucket,
  Worker_Pipeline_Session_IssueSession_IssuedAt,
  Worker_Pipeline_Session_IssueSession_Key,
  Worker_Pipeline_Session_IssueSession_MaxPerHour,
  Worker_Pipeline_Session_IssueSession_Options,
  Worker_Pipeline_Session_IssueSession_Payload,
  Worker_Pipeline_Session_IssueSession_RateKey,
  Worker_Pipeline_Session_IssueSession_RawCount,
  Worker_Pipeline_Session_IssueSession_Returns,
  Worker_Pipeline_Session_IssueSession_Signature,
  Worker_Pipeline_Session_IssueSession_SigningInput,
  Worker_Pipeline_Session_IssueSession_TtlSeconds,
  Worker_Pipeline_Session_VerifySession_Authorization,
  Worker_Pipeline_Session_VerifySession_DecodedHeader,
  Worker_Pipeline_Session_VerifySession_DecodedPayload,
  Worker_Pipeline_Session_VerifySession_DecodedSignature,
  Worker_Pipeline_Session_VerifySession_EncodedHeader,
  Worker_Pipeline_Session_VerifySession_EncodedPayload,
  Worker_Pipeline_Session_VerifySession_EncodedSignature,
  Worker_Pipeline_Session_VerifySession_HeaderJson,
  Worker_Pipeline_Session_VerifySession_IsValidSignature,
  Worker_Pipeline_Session_VerifySession_Key,
  Worker_Pipeline_Session_VerifySession_Now,
  Worker_Pipeline_Session_VerifySession_Options,
  Worker_Pipeline_Session_VerifySession_Parts,
  Worker_Pipeline_Session_VerifySession_Payload,
  Worker_Pipeline_Session_VerifySession_PayloadJson,
  Worker_Pipeline_Session_VerifySession_PayloadResult,
  Worker_Pipeline_Session_VerifySession_Returns,
  Worker_Pipeline_Session_VerifySession_SigningInput,
  Worker_Pipeline_Session_VerifySession_Token,
  Worker_Pipeline_Session_VerifySession_UsedKey,
  Worker_Pipeline_Session_VerifySession_UsedTtl,
  Worker_Pipeline_Session_VerifySession_WasUsed,
} from '../../types/worker/pipeline/session.d.ts';

/**
 * Worker - Pipeline - Session - Default Ttl Seconds.
 *
 * How long a session token stays valid when the context does not set
 * its own lifetime.
 *
 * @since 2.4.0
 */
const SESSION_DEFAULT_TTL_SECONDS = 300;

/**
 * Worker - Pipeline - Session - Default Max Per Hour.
 *
 * How many session tokens one address can get per hour when the
 * context does not set its own limit.
 *
 * @since 2.4.0
 */
const SESSION_DEFAULT_MAX_PER_HOUR = 10;

/**
 * Worker - Pipeline - Session - Path.
 *
 * Request path that hands out session tokens on contexts with
 * sessions turned on.
 *
 * @since 2.4.0
 */
const SESSION_PATH = '/session';

/**
 * Worker - Pipeline - Session - Header Schema.
 *
 * Accepts only the HS256 JWT header this worker signs, so tokens using
 * any other algorithm are rejected before the signature is checked.
 *
 * @since 2.4.0
 */
const sessionHeaderSchema = z.object({
  alg: z.literal('HS256'),
  typ: z.literal('JWT'),
});

/**
 * Worker - Pipeline - Session - Payload Schema.
 *
 * Describes the claims a session token carries: the context it belongs
 * to, the address it was issued to, a unique id, and its lifetime.
 *
 * @since 2.4.0
 */
const sessionPayloadSchema = z.object({
  aud: z.string(),
  ip: z.string(),
  jti: z.string(),
  iat: z.number().int(),
  exp: z.number().int(),
});

/**
 * Worker - Pipeline - Session - Encode Base64 URL.
 *
 * Converts raw bytes into the unpadded URL-safe Base64 text that JWT
 * segments use.
 *
 * @param {Worker_Pipeline_Session_EncodeBase64Url_Bytes} bytes - Bytes.
 *
 * @returns {Worker_Pipeline_Session_EncodeBase64Url_Returns}
 *
 * @since 2.4.0
 */
function encodeBase64Url(bytes: Worker_Pipeline_Session_EncodeBase64Url_Bytes): Worker_Pipeline_Session_EncodeBase64Url_Returns {
  const binary: Worker_Pipeline_Session_EncodeBase64Url_Binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');

  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(LIB_REGEX_TRAILING_BASE64_PADDING, '');
}

/**
 * Worker - Pipeline - Session - Decode Base64 URL.
 *
 * Turns a URL-safe Base64 JWT segment back into bytes, returning null
 * when the text is not valid Base64.
 *
 * @param {Worker_Pipeline_Session_DecodeBase64Url_Value} value - Value.
 *
 * @returns {Worker_Pipeline_Session_DecodeBase64Url_Returns}
 *
 * @since 2.4.0
 */
function decodeBase64Url(value: Worker_Pipeline_Session_DecodeBase64Url_Value): Worker_Pipeline_Session_DecodeBase64Url_Returns {
  const standard: Worker_Pipeline_Session_DecodeBase64Url_Standard = value.replaceAll('-', '+').replaceAll('_', '/');
  const padded: Worker_Pipeline_Session_DecodeBase64Url_Padded = standard.padEnd(Math.ceil(standard.length / 4) * 4, '=');

  try {
    const binary: Worker_Pipeline_Session_DecodeBase64Url_Binary = atob(padded);

    return Uint8Array.from(binary, (character) => character.charCodeAt(0));
  } catch {
    return null;
  }
}

/**
 * Worker - Pipeline - Session - Import Key.
 *
 * Loads the context's session secret as an HMAC SHA-256 key that can
 * both sign new tokens and verify returning ones.
 *
 * @param {Worker_Pipeline_Session_ImportKey_Secret} secret - Secret.
 *
 * @returns {Worker_Pipeline_Session_ImportKey_Returns}
 *
 * @since 2.4.0
 */
async function importKey(secret: Worker_Pipeline_Session_ImportKey_Secret): Worker_Pipeline_Session_ImportKey_Returns {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    {
      name: 'HMAC',
      hash: 'SHA-256',
    },
    false,
    [
      'sign',
      'verify',
    ],
  );
}

/**
 * Worker - Pipeline - Session - Issue Session.
 *
 * Counts the caller's requests for the current hour and, when they are
 * under the limit, signs a short-lived token bound to the caller's address.
 *
 * @param {Worker_Pipeline_Session_IssueSession_Options} options - Options.
 *
 * @returns {Worker_Pipeline_Session_IssueSession_Returns}
 *
 * @since 2.4.0
 */
async function issueSession(options: Worker_Pipeline_Session_IssueSession_Options): Worker_Pipeline_Session_IssueSession_Returns {
  if (options['kv'] === undefined) {
    return {
      issued: false,
      status: 503,
      reason: 'Session storage is unavailable',
    };
  }

  const ttlSeconds: Worker_Pipeline_Session_IssueSession_TtlSeconds = options['session']['ttl_seconds'] ?? SESSION_DEFAULT_TTL_SECONDS;
  const maxPerHour: Worker_Pipeline_Session_IssueSession_MaxPerHour = options['session']['max_per_hour'] ?? SESSION_DEFAULT_MAX_PER_HOUR;
  const issuedAt: Worker_Pipeline_Session_IssueSession_IssuedAt = Math.floor(Date.now() / 1000);
  const hourBucket: Worker_Pipeline_Session_IssueSession_HourBucket = Math.floor(issuedAt / 3600);
  const rateKey: Worker_Pipeline_Session_IssueSession_RateKey = `session:rate:${options['contextId']}:${options['clientIp']}:${hourBucket}`;
  const rawCount: Worker_Pipeline_Session_IssueSession_RawCount = await options['kv'].get(rateKey);
  const count: Worker_Pipeline_Session_IssueSession_Count = (rawCount !== null) ? Number(rawCount) : 0;

  if (count >= maxPerHour) {
    return {
      issued: false,
      status: 429,
      reason: 'Too many session requests',
    };
  }

  // Keep the counter a minute past the hour so a late write cannot reset it early.
  await options['kv'].put(rateKey, String(count + 1), { expirationTtl: 3660 });

  const expiresAt: Worker_Pipeline_Session_IssueSession_ExpiresAt = issuedAt + ttlSeconds;
  const payload: Worker_Pipeline_Session_IssueSession_Payload = {
    aud: options['contextId'],
    ip: options['clientIp'],
    jti: crypto.randomUUID(),
    iat: issuedAt,
    exp: expiresAt,
  };
  const encodedHeader: Worker_Pipeline_Session_IssueSession_EncodedHeader = encodeBase64Url(new TextEncoder().encode(JSON.stringify({
    alg: 'HS256',
    typ: 'JWT',
  })));
  const encodedPayload: Worker_Pipeline_Session_IssueSession_EncodedPayload = encodeBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const signingInput: Worker_Pipeline_Session_IssueSession_SigningInput = `${encodedHeader}.${encodedPayload}`;
  const key: Worker_Pipeline_Session_IssueSession_Key = await importKey(options['session']['secret']);
  const signature: Worker_Pipeline_Session_IssueSession_Signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signingInput));

  return {
    issued: true,
    token: `${signingInput}.${encodeBase64Url(new Uint8Array(signature))}`,
    expiresIn: ttlSeconds,
  };
}

/**
 * Worker - Pipeline - Session - Verify Session.
 *
 * Checks that a returning token was signed for this context, has not
 * expired, comes from the address it was issued to, and was never used.
 *
 * @param {Worker_Pipeline_Session_VerifySession_Options} options - Options.
 *
 * @returns {Worker_Pipeline_Session_VerifySession_Returns}
 *
 * @since 2.4.0
 */
async function verifySession(options: Worker_Pipeline_Session_VerifySession_Options): Worker_Pipeline_Session_VerifySession_Returns {
  const authorization: Worker_Pipeline_Session_VerifySession_Authorization = options['authorization'];

  if (authorization === undefined) {
    return {
      authenticated: false,
      reason: 'Missing Authorization header',
    };
  }

  if (options['kv'] === undefined) {
    return {
      authenticated: false,
      reason: 'Session storage is unavailable',
    };
  }

  const token: Worker_Pipeline_Session_VerifySession_Token = (authorization.startsWith('Bearer ') === true) ? authorization.slice(7) : authorization;
  const parts: Worker_Pipeline_Session_VerifySession_Parts = token.split('.');
  const encodedHeader: Worker_Pipeline_Session_VerifySession_EncodedHeader = parts[0];
  const encodedPayload: Worker_Pipeline_Session_VerifySession_EncodedPayload = parts[1];
  const encodedSignature: Worker_Pipeline_Session_VerifySession_EncodedSignature = parts[2];

  if (
    parts.length !== 3
    || encodedHeader === undefined
    || encodedPayload === undefined
    || encodedSignature === undefined
  ) {
    return {
      authenticated: false,
      reason: 'Invalid session token',
    };
  }

  const decodedHeader: Worker_Pipeline_Session_VerifySession_DecodedHeader = decodeBase64Url(encodedHeader);
  const decodedPayload: Worker_Pipeline_Session_VerifySession_DecodedPayload = decodeBase64Url(encodedPayload);
  const decodedSignature: Worker_Pipeline_Session_VerifySession_DecodedSignature = decodeBase64Url(encodedSignature);

  if (
    decodedHeader === null
    || decodedPayload === null
    || decodedSignature === null
  ) {
    return {
      authenticated: false,
      reason: 'Invalid session token',
    };
  }

  let headerJson: Worker_Pipeline_Session_VerifySession_HeaderJson = undefined;
  let payloadJson: Worker_Pipeline_Session_VerifySession_PayloadJson = undefined;

  try {
    headerJson = JSON.parse(new TextDecoder().decode(decodedHeader));
    payloadJson = JSON.parse(new TextDecoder().decode(decodedPayload));
  } catch {
    return {
      authenticated: false,
      reason: 'Invalid session token',
    };
  }

  if (sessionHeaderSchema.safeParse(headerJson)['success'] === false) {
    return {
      authenticated: false,
      reason: 'Invalid session token',
    };
  }

  // HMAC verification in Web Crypto runs in constant time, so a forged signature reveals nothing.
  const signingInput: Worker_Pipeline_Session_VerifySession_SigningInput = `${encodedHeader}.${encodedPayload}`;
  const key: Worker_Pipeline_Session_VerifySession_Key = await importKey(options['session']['secret']);
  const isValidSignature: Worker_Pipeline_Session_VerifySession_IsValidSignature = await crypto.subtle.verify('HMAC', key, decodedSignature, new TextEncoder().encode(signingInput));

  if (isValidSignature === false) {
    return {
      authenticated: false,
      reason: 'Invalid session token',
    };
  }

  const payloadResult: Worker_Pipeline_Session_VerifySession_PayloadResult = sessionPayloadSchema.safeParse(payloadJson);

  if (payloadResult['success'] === false) {
    return {
      authenticated: false,
      reason: 'Invalid session token',
    };
  }

  const payload: Worker_Pipeline_Session_VerifySession_Payload = payloadResult['data'];
  const now: Worker_Pipeline_Session_VerifySession_Now = Math.floor(Date.now() / 1000);

  if (payload['aud'] !== options['contextId']) {
    return {
      authenticated: false,
      reason: 'Invalid session token',
    };
  }

  if (payload['exp'] <= now) {
    return {
      authenticated: false,
      reason: 'Expired session token',
    };
  }

  if (payload['ip'] !== options['clientIp']) {
    return {
      authenticated: false,
      reason: 'Session token was issued to another address',
    };
  }

  const usedKey: Worker_Pipeline_Session_VerifySession_UsedKey = `session:used:${payload['jti']}`;
  const wasUsed: Worker_Pipeline_Session_VerifySession_WasUsed = await options['kv'].get(usedKey);

  if (wasUsed !== null) {
    return {
      authenticated: false,
      reason: 'Session token was already used',
    };
  }

  // KV keys must live at least 60 seconds, so short-lived tokens still get a minute of memory.
  const usedTtl: Worker_Pipeline_Session_VerifySession_UsedTtl = Math.max(60, payload['exp'] - now + 60);

  await options['kv'].put(usedKey, '1', { expirationTtl: usedTtl });

  return { authenticated: true };
}

export {
  issueSession,
  SESSION_PATH,
  verifySession,
};

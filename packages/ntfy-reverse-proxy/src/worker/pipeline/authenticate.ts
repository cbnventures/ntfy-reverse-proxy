import type {
  Worker_Pipeline_Authenticate_AllowedDomain,
  Worker_Pipeline_Authenticate_AllowedFrom,
  Worker_Pipeline_Authenticate_AtIndex,
  Worker_Pipeline_Authenticate_AuthConfig,
  Worker_Pipeline_Authenticate_Authenticate_Returns,
  Worker_Pipeline_Authenticate_Authorization,
  Worker_Pipeline_Authenticate_Credentials,
  Worker_Pipeline_Authenticate_From,
  Worker_Pipeline_Authenticate_FromDomain,
  Worker_Pipeline_Authenticate_IsBearerMatch,
  Worker_Pipeline_Authenticate_IsRawMatch,
  Worker_Pipeline_Authenticate_NormalizedAllowedFrom,
  Worker_Pipeline_Authenticate_NormalizedFrom,
  Worker_Pipeline_Authenticate_TimingSafeEqual_A,
  Worker_Pipeline_Authenticate_TimingSafeEqual_B,
  Worker_Pipeline_Authenticate_TimingSafeEqual_BytesA,
  Worker_Pipeline_Authenticate_TimingSafeEqual_BytesB,
  Worker_Pipeline_Authenticate_TimingSafeEqual_LengthMatch,
  Worker_Pipeline_Authenticate_TimingSafeEqual_MaxLength,
  Worker_Pipeline_Authenticate_TimingSafeEqual_Mismatches,
  Worker_Pipeline_Authenticate_TimingSafeEqual_PaddedA,
  Worker_Pipeline_Authenticate_TimingSafeEqual_PaddedB,
  Worker_Pipeline_Authenticate_TimingSafeEqual_Reducer_Reducer,
  Worker_Pipeline_Authenticate_TimingSafeEqual_Returns,
  Worker_Pipeline_Authenticate_Token,
} from '../../types/worker/pipeline/authenticate.d.ts';

/**
 * Worker - Pipeline - Authenticate - Timing Safe Equal.
 *
 * Compares two strings in constant time to prevent timing side-channel
 * attacks on token validation. Uses reduce (which never short-circuits)
 * to accumulate mismatches across all bytes.
 *
 * @param {Worker_Pipeline_Authenticate_TimingSafeEqual_A} a - A.
 * @param {Worker_Pipeline_Authenticate_TimingSafeEqual_B} b - B.
 *
 * @returns {Worker_Pipeline_Authenticate_TimingSafeEqual_Returns}
 *
 * @since 2.1.0
 */
function timingSafeEqual(a: Worker_Pipeline_Authenticate_TimingSafeEqual_A, b: Worker_Pipeline_Authenticate_TimingSafeEqual_B): Worker_Pipeline_Authenticate_TimingSafeEqual_Returns {
  const bytesA: Worker_Pipeline_Authenticate_TimingSafeEqual_BytesA = new TextEncoder().encode(a);
  const bytesB: Worker_Pipeline_Authenticate_TimingSafeEqual_BytesB = new TextEncoder().encode(b);
  const maxLength: Worker_Pipeline_Authenticate_TimingSafeEqual_MaxLength = Math.max(bytesA.byteLength, bytesB.byteLength);
  const paddedA: Worker_Pipeline_Authenticate_TimingSafeEqual_PaddedA = new Uint8Array(maxLength);

  paddedA.set(bytesA);

  const paddedB: Worker_Pipeline_Authenticate_TimingSafeEqual_PaddedB = new Uint8Array(maxLength);

  paddedB.set(bytesB);

  const lengthMatch: Worker_Pipeline_Authenticate_TimingSafeEqual_LengthMatch = bytesA.byteLength === bytesB.byteLength;

  /**
   * Worker - Pipeline - Authenticate - Timing Safe Equal - Reducer.
   *
   * Accumulates byte mismatches between the two encoded strings
   * without short-circuiting, ensuring constant-time comparison.
   *
   * @since 2.1.0
   */
  const reducer: Worker_Pipeline_Authenticate_TimingSafeEqual_Reducer_Reducer = (acc, byte, i) => acc + ((byte === paddedB[i]) ? 0 : 1);
  const mismatches: Worker_Pipeline_Authenticate_TimingSafeEqual_Mismatches = Array.from(paddedA).reduce(reducer, 0);

  return lengthMatch === true && mismatches === 0;
}

/**
 * Worker - Pipeline - Authenticate.
 *
 * Validates incoming requests against the configured auth method,
 * checking HTTP bearer tokens or email sender addresses.
 *
 * @since 2.0.0
 */
function authenticate(authConfig: Worker_Pipeline_Authenticate_AuthConfig, credentials: Worker_Pipeline_Authenticate_Credentials): Worker_Pipeline_Authenticate_Authenticate_Returns {
  if (authConfig['type'] === 'http') {
    const token: Worker_Pipeline_Authenticate_Token = authConfig['token'];

    if (token === undefined) {
      return { authenticated: true };
    }

    const authorization: Worker_Pipeline_Authenticate_Authorization = credentials['authorization'];

    if (authorization === undefined) {
      return {
        authenticated: false,
        reason: 'Missing Authorization header',
      };
    }

    const isBearerMatch: Worker_Pipeline_Authenticate_IsBearerMatch = timingSafeEqual(authorization, `Bearer ${token}`);
    const isRawMatch: Worker_Pipeline_Authenticate_IsRawMatch = timingSafeEqual(authorization, token);

    if (isBearerMatch === true || isRawMatch === true) {
      return { authenticated: true };
    }

    return {
      authenticated: false,
      reason: 'Invalid token',
    };
  }

  const allowedFrom: Worker_Pipeline_Authenticate_AllowedFrom = authConfig['allowed_from'];

  if (allowedFrom === undefined) {
    return { authenticated: true };
  }

  const from: Worker_Pipeline_Authenticate_From = credentials['from'];

  if (from === undefined) {
    return {
      authenticated: false,
      reason: 'Missing sender address',
    };
  }

  const normalizedAllowedFrom: Worker_Pipeline_Authenticate_NormalizedAllowedFrom = allowedFrom.toLowerCase();
  const normalizedFrom: Worker_Pipeline_Authenticate_NormalizedFrom = from.toLowerCase();

  if (normalizedAllowedFrom.startsWith('*@') === true) {
    const allowedDomain: Worker_Pipeline_Authenticate_AllowedDomain = normalizedAllowedFrom.slice(1);
    const atIndex: Worker_Pipeline_Authenticate_AtIndex = normalizedFrom.indexOf('@');
    const fromDomain: Worker_Pipeline_Authenticate_FromDomain = normalizedFrom.slice(atIndex);

    if (fromDomain === allowedDomain) {
      return { authenticated: true };
    }

    return {
      authenticated: false,
      reason: 'Sender domain not allowed',
    };
  }

  if (normalizedFrom === normalizedAllowedFrom) {
    return { authenticated: true };
  }

  return {
    authenticated: false,
    reason: 'Sender not allowed',
  };
}

export {
  authenticate,
};

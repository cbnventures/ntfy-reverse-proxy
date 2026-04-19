import type {
  WorkerPipelineAuthenticateAllowedDomain,
  WorkerPipelineAuthenticateAllowedFrom,
  WorkerPipelineAuthenticateAtIndex,
  WorkerPipelineAuthenticateAuthConfig,
  WorkerPipelineAuthenticateAuthorization,
  WorkerPipelineAuthenticateCredentials,
  WorkerPipelineAuthenticateFrom,
  WorkerPipelineAuthenticateFromDomain,
  WorkerPipelineAuthenticateIsBearerMatch,
  WorkerPipelineAuthenticateIsRawMatch,
  WorkerPipelineAuthenticateNormalizedAllowedFrom,
  WorkerPipelineAuthenticateNormalizedFrom,
  WorkerPipelineAuthenticateResult,
  WorkerPipelineAuthenticateToken,
} from '../../types/worker/pipeline/authenticate.d.ts';

/**
 * Worker - Pipeline - Authenticate.
 *
 * Validates incoming requests against the configured auth method,
 * checking HTTP bearer tokens or email sender addresses.
 *
 * @since 2.0.0
 */
function authenticate(authConfig: WorkerPipelineAuthenticateAuthConfig, credentials: WorkerPipelineAuthenticateCredentials): WorkerPipelineAuthenticateResult {
  if (authConfig['type'] === 'http') {
    const token: WorkerPipelineAuthenticateToken = authConfig['token'];

    if (token === undefined) {
      return { authenticated: true };
    }

    const authorization: WorkerPipelineAuthenticateAuthorization = credentials['authorization'];

    if (authorization === undefined) {
      return {
        authenticated: false, reason: 'Missing Authorization header',
      };
    }

    const isBearerMatch: WorkerPipelineAuthenticateIsBearerMatch = authorization === `Bearer ${token}`;
    const isRawMatch: WorkerPipelineAuthenticateIsRawMatch = authorization === token;

    if (isBearerMatch === true || isRawMatch === true) {
      return { authenticated: true };
    }

    return {
      authenticated: false, reason: 'Invalid token',
    };
  }

  const allowedFrom: WorkerPipelineAuthenticateAllowedFrom = authConfig['allowed_from'];

  if (allowedFrom === undefined) {
    return { authenticated: true };
  }

  const from: WorkerPipelineAuthenticateFrom = credentials['from'];

  if (from === undefined) {
    return {
      authenticated: false, reason: 'Missing sender address',
    };
  }

  const normalizedAllowedFrom: WorkerPipelineAuthenticateNormalizedAllowedFrom = allowedFrom.toLowerCase();
  const normalizedFrom: WorkerPipelineAuthenticateNormalizedFrom = from.toLowerCase();

  if (normalizedAllowedFrom.startsWith('*@') === true) {
    const allowedDomain: WorkerPipelineAuthenticateAllowedDomain = normalizedAllowedFrom.slice(1);
    const atIndex: WorkerPipelineAuthenticateAtIndex = normalizedFrom.indexOf('@');
    const fromDomain: WorkerPipelineAuthenticateFromDomain = normalizedFrom.slice(atIndex);

    if (fromDomain === allowedDomain) {
      return { authenticated: true };
    }

    return {
      authenticated: false, reason: 'Sender domain not allowed',
    };
  }

  if (normalizedFrom === normalizedAllowedFrom) {
    return { authenticated: true };
  }

  return {
    authenticated: false, reason: 'Sender not allowed',
  };
}

export {
  authenticate,
};

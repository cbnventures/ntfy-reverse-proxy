/**
 * Worker - Pipeline - Authenticate.
 *
 * @since 2.0.0
 */
export type WorkerPipelineAuthenticateAuthConfigToken = string;

export type WorkerPipelineAuthenticateAuthConfigAllowedFrom = string;

export type WorkerPipelineAuthenticateAuthConfigTypeHttp = 'http';

export type WorkerPipelineAuthenticateAuthConfigTypeEmail = 'email';

export type WorkerPipelineAuthenticateAuthConfig = {
  type: WorkerPipelineAuthenticateAuthConfigTypeHttp;
  token?: WorkerPipelineAuthenticateAuthConfigToken;
} | {
  type: WorkerPipelineAuthenticateAuthConfigTypeEmail;
  allowed_from?: WorkerPipelineAuthenticateAuthConfigAllowedFrom;
};

export type WorkerPipelineAuthenticateCredentialsAuthorization = string | undefined;

export type WorkerPipelineAuthenticateCredentialsFrom = string | undefined;

export type WorkerPipelineAuthenticateCredentials = {
  authorization: WorkerPipelineAuthenticateCredentialsAuthorization;
  from: WorkerPipelineAuthenticateCredentialsFrom;
};

export type WorkerPipelineAuthenticateResultSuccessAuthenticated = true;

export type WorkerPipelineAuthenticateResultSuccess = {
  authenticated: WorkerPipelineAuthenticateResultSuccessAuthenticated;
};

export type WorkerPipelineAuthenticateResultFailureAuthenticated = false;

export type WorkerPipelineAuthenticateResultFailureReason = string;

export type WorkerPipelineAuthenticateResultFailure = {
  authenticated: WorkerPipelineAuthenticateResultFailureAuthenticated;
  reason: WorkerPipelineAuthenticateResultFailureReason;
};

export type WorkerPipelineAuthenticateResult = WorkerPipelineAuthenticateResultSuccess | WorkerPipelineAuthenticateResultFailure;

export type WorkerPipelineAuthenticateToken = string | undefined;

export type WorkerPipelineAuthenticateAuthorization = string | undefined;

export type WorkerPipelineAuthenticateIsBearerMatch = boolean;

export type WorkerPipelineAuthenticateIsRawMatch = boolean;

export type WorkerPipelineAuthenticateAllowedFrom = string | undefined;

export type WorkerPipelineAuthenticateFrom = string | undefined;

export type WorkerPipelineAuthenticateNormalizedAllowedFrom = string;

export type WorkerPipelineAuthenticateNormalizedFrom = string;

export type WorkerPipelineAuthenticateAllowedDomain = string;

export type WorkerPipelineAuthenticateAtIndex = number;

export type WorkerPipelineAuthenticateFromDomain = string;

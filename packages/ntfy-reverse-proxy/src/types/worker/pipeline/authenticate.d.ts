/**
 * Worker - Pipeline - Authenticate.
 *
 * @since 2.0.0
 */
export type Worker_Pipeline_Authenticate_AuthConfigToken = string;

export type Worker_Pipeline_Authenticate_AuthConfigAllowedFrom = string;

export type Worker_Pipeline_Authenticate_AuthConfigTypeHttp = 'http';

export type Worker_Pipeline_Authenticate_AuthConfigTypeEmail = 'email';

export type Worker_Pipeline_Authenticate_AuthConfig = {
  type: Worker_Pipeline_Authenticate_AuthConfigTypeHttp;
  token?: Worker_Pipeline_Authenticate_AuthConfigToken;
} | {
  type: Worker_Pipeline_Authenticate_AuthConfigTypeEmail;
  allowed_from?: Worker_Pipeline_Authenticate_AuthConfigAllowedFrom;
};

export type Worker_Pipeline_Authenticate_CredentialsAuthorization = string | undefined;

export type Worker_Pipeline_Authenticate_CredentialsFrom = string | undefined;

export type Worker_Pipeline_Authenticate_Credentials = {
  authorization: Worker_Pipeline_Authenticate_CredentialsAuthorization;
  from: Worker_Pipeline_Authenticate_CredentialsFrom;
};

export type Worker_Pipeline_Authenticate_ResultSuccessAuthenticated = true;

export type Worker_Pipeline_Authenticate_ResultSuccess = {
  authenticated: Worker_Pipeline_Authenticate_ResultSuccessAuthenticated;
};

export type Worker_Pipeline_Authenticate_ResultFailureAuthenticated = false;

export type Worker_Pipeline_Authenticate_ResultFailureReason = string;

export type Worker_Pipeline_Authenticate_ResultFailure = {
  authenticated: Worker_Pipeline_Authenticate_ResultFailureAuthenticated;
  reason: Worker_Pipeline_Authenticate_ResultFailureReason;
};

export type Worker_Pipeline_Authenticate_Result = Worker_Pipeline_Authenticate_ResultSuccess | Worker_Pipeline_Authenticate_ResultFailure;

export type Worker_Pipeline_Authenticate_Token = string | undefined;

export type Worker_Pipeline_Authenticate_Authorization = string | undefined;

export type Worker_Pipeline_Authenticate_IsBearerMatch = boolean;

export type Worker_Pipeline_Authenticate_IsRawMatch = boolean;

export type Worker_Pipeline_Authenticate_AllowedFrom = string | undefined;

export type Worker_Pipeline_Authenticate_From = string | undefined;

export type Worker_Pipeline_Authenticate_NormalizedAllowedFrom = string;

export type Worker_Pipeline_Authenticate_NormalizedFrom = string;

export type Worker_Pipeline_Authenticate_AllowedDomain = string;

export type Worker_Pipeline_Authenticate_AtIndex = number;

export type Worker_Pipeline_Authenticate_FromDomain = string;

/**
 * Worker - Pipeline - Authenticate - Authenticate.
 *
 * @since 2.0.0
 */
export type Worker_Pipeline_Authenticate_Authenticate_ReturnsSuccessAuthenticated = true;

export type Worker_Pipeline_Authenticate_Authenticate_ReturnsSuccess = {
  authenticated: Worker_Pipeline_Authenticate_Authenticate_ReturnsSuccessAuthenticated;
};

export type Worker_Pipeline_Authenticate_Authenticate_ReturnsFailureAuthenticated = false;

export type Worker_Pipeline_Authenticate_Authenticate_ReturnsFailureReason = string;

export type Worker_Pipeline_Authenticate_Authenticate_ReturnsFailure = {
  authenticated: Worker_Pipeline_Authenticate_Authenticate_ReturnsFailureAuthenticated;
  reason: Worker_Pipeline_Authenticate_Authenticate_ReturnsFailureReason;
};

export type Worker_Pipeline_Authenticate_Authenticate_Returns = Worker_Pipeline_Authenticate_Authenticate_ReturnsSuccess | Worker_Pipeline_Authenticate_Authenticate_ReturnsFailure;

/**
 * Worker - Pipeline - Authenticate - Timing Safe Equal.
 *
 * @since 2.1.0
 */
export type Worker_Pipeline_Authenticate_TimingSafeEqual_A = string;

export type Worker_Pipeline_Authenticate_TimingSafeEqual_B = string;

export type Worker_Pipeline_Authenticate_TimingSafeEqual_Returns = boolean;

export type Worker_Pipeline_Authenticate_TimingSafeEqual_BytesA = Uint8Array;

export type Worker_Pipeline_Authenticate_TimingSafeEqual_BytesB = Uint8Array;

export type Worker_Pipeline_Authenticate_TimingSafeEqual_MaxLength = number;

export type Worker_Pipeline_Authenticate_TimingSafeEqual_PaddedA = Uint8Array;

export type Worker_Pipeline_Authenticate_TimingSafeEqual_PaddedB = Uint8Array;

export type Worker_Pipeline_Authenticate_TimingSafeEqual_LengthMatch = boolean;

/**
 * Worker - Pipeline - Authenticate - Timing Safe Equal - Reducer.
 *
 * @since 2.1.0
 */
export type Worker_Pipeline_Authenticate_TimingSafeEqual_Reducer_Reducer = (acc: Worker_Pipeline_Authenticate_TimingSafeEqual_Reducer_Acc, byte: Worker_Pipeline_Authenticate_TimingSafeEqual_Reducer_Byte, i: Worker_Pipeline_Authenticate_TimingSafeEqual_Reducer_Index) => number;

export type Worker_Pipeline_Authenticate_TimingSafeEqual_Reducer_Acc = number;

export type Worker_Pipeline_Authenticate_TimingSafeEqual_Reducer_Byte = number;

export type Worker_Pipeline_Authenticate_TimingSafeEqual_Reducer_Index = number;

export type Worker_Pipeline_Authenticate_TimingSafeEqual_Mismatches = number;

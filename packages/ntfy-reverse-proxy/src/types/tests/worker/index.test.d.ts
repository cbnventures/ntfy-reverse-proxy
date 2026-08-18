import type { vi } from 'vitest';

import type { Lib_Schema_ConfigSchema } from '../../lib/schema.d.ts';

/**
 * Tests - Worker - Index.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Index_MockConfig = Lib_Schema_ConfigSchema & {};

export type Tests_Worker_Index_MockConfigWithToken = Lib_Schema_ConfigSchema & {};

export type Tests_Worker_Index_MockConfigWithErrorTopic = Lib_Schema_ConfigSchema & {};

export type Tests_Worker_Index_MockEmailConfig = Lib_Schema_ConfigSchema & {};

export type Tests_Worker_Index_MockEmailConfigWithAllowedFrom = Lib_Schema_ConfigSchema & {};

export type Tests_Worker_Index_MockEmailConfigWithErrorTopicAndErrorEvents = Lib_Schema_ConfigSchema & {};

export type Tests_Worker_Index_MockConfigWithErrorTopicAndErrorEvents = Lib_Schema_ConfigSchema & {};

/**
 * Tests - Worker - Index - Handle Email - Accepts Email From Authorized Sender.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Index_HandleEmail_AcceptsEmailFromAuthorizedSender_MockFetch = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Index_HandleEmail_AcceptsEmailFromAuthorizedSender_RawEmail = string;

/**
 * Tests - Worker - Index - Handle Email - Allows Email When No Allowed From Is Configured.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Index_HandleEmail_AllowsEmailWhenNoAllowedFromIsConfigured_MockFetch = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Index_HandleEmail_AllowsEmailWhenNoAllowedFromIsConfigured_RawEmail = string;

/**
 * Tests - Worker - Index - Handle Email - Processes A Valid Email Through The Pipeline.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Index_HandleEmail_ProcessesAValidEmailThroughThePipeline_MockFetch = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Index_HandleEmail_ProcessesAValidEmailThroughThePipeline_RawEmail = string;

/**
 * Tests - Worker - Index - Handle Email - Rejects Email From Unauthorized Sender.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Index_HandleEmail_RejectsEmailFromUnauthorizedSender_MockFetch = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Index_HandleEmail_RejectsEmailFromUnauthorizedSender_RawEmail = string;

/**
 * Tests - Worker - Index - Handle Email - Silently Ignores Emails With No Matching Context.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Index_HandleEmail_SilentlyIgnoresEmailsWithNoMatchingContext_MockFetch = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Index_HandleEmail_SilentlyIgnoresEmailsWithNoMatchingContext_RawEmail = string;

/**
 * Tests - Worker - Index - Handle Email - Suppresses Auth Error Notification When Email Error Events Excludes Authentication.
 *
 * @since 2.1.0
 */
export type Tests_Worker_Index_HandleEmail_SuppressesAuthErrorNotificationWhenEmailErrorEventsExcludesAuthentication_MockFetch = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Index_HandleEmail_SuppressesAuthErrorNotificationWhenEmailErrorEventsExcludesAuthentication_RawEmail = string;

/**
 * Tests - Worker - Index - Handle Request - Passes Through When No Token Configured.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Index_HandleRequest_PassesThroughWhenNoTokenConfigured_Request = Request;

export type Tests_Worker_Index_HandleRequest_PassesThroughWhenNoTokenConfigured_Response = Response;

/**
 * Tests - Worker - Index - Handle Request - Processes A Valid POST Request Through The Pipeline.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Index_HandleRequest_ProcessesAValidPOSTRequestThroughThePipeline_Request = Request;

export type Tests_Worker_Index_HandleRequest_ProcessesAValidPOSTRequestThroughThePipeline_Response = Response;

export type Tests_Worker_Index_HandleRequest_ProcessesAValidPOSTRequestThroughThePipeline_Body = Record<string, unknown>;

/**
 * Tests - Worker - Index - Handle Request - Returns 403 With No Authorization Header When Token Required.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Index_HandleRequest_Returns403WithNoAuthorizationHeaderWhenTokenRequired_Request = Request;

export type Tests_Worker_Index_HandleRequest_Returns403WithNoAuthorizationHeaderWhenTokenRequired_Response = Response;

/**
 * Tests - Worker - Index - Handle Request - Returns 403 With Wrong Token.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Index_HandleRequest_Returns403WithWrongToken_Request = Request;

export type Tests_Worker_Index_HandleRequest_Returns403WithWrongToken_Response = Response;

export type Tests_Worker_Index_HandleRequest_Returns403WithWrongToken_Body = Record<string, unknown>;

/**
 * Tests - Worker - Index - Handle Request - Returns 404 For Unmatched Subdomain.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Index_HandleRequest_Returns404ForUnmatchedSubdomain_Request = Request;

export type Tests_Worker_Index_HandleRequest_Returns404ForUnmatchedSubdomain_Response = Response;

/**
 * Tests - Worker - Index - Handle Request - Returns 405 For Unsupported Methods.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Index_HandleRequest_Returns405ForUnsupportedMethods_Request = Request;

export type Tests_Worker_Index_HandleRequest_Returns405ForUnsupportedMethods_Response = Response;

/**
 * Tests - Worker - Index - Handle Request - Sends Error Notification When Auth Fails And Error Topic Configured.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Index_HandleRequest_SendsErrorNotificationWhenAuthFailsAndErrorTopicConfigured_MockFetch = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Index_HandleRequest_SendsErrorNotificationWhenAuthFailsAndErrorTopicConfigured_Request = Request;

export type Tests_Worker_Index_HandleRequest_SendsErrorNotificationWhenAuthFailsAndErrorTopicConfigured_Response = Response;

/**
 * Tests - Worker - Index - Handle Request - Serves Landing Page For GET Requests.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Index_HandleRequest_ServesLandingPageForGETRequests_Request = Request;

export type Tests_Worker_Index_HandleRequest_ServesLandingPageForGETRequests_Response = Response;

export type Tests_Worker_Index_HandleRequest_ServesLandingPageForGETRequests_ContentType = string | null;

/**
 * Tests - Worker - Index - Handle Request - Succeeds With Correct Token In Authorization Header.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Index_HandleRequest_SucceedsWithCorrectTokenInAuthorizationHeader_Request = Request;

export type Tests_Worker_Index_HandleRequest_SucceedsWithCorrectTokenInAuthorizationHeader_Response = Response;

export type Tests_Worker_Index_HandleRequest_SucceedsWithCorrectTokenInAuthorizationHeader_Body = Record<string, unknown>;

/**
 * Tests - Worker - Index - Handle Request - Suppresses Auth Error Notification When Error Events Excludes Authentication.
 *
 * @since 2.1.0
 */
export type Tests_Worker_Index_HandleRequest_SuppressesAuthErrorNotificationWhenErrorEventsExcludesAuthentication_MockFetch = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Index_HandleRequest_SuppressesAuthErrorNotificationWhenErrorEventsExcludesAuthentication_Request = Request;

export type Tests_Worker_Index_HandleRequest_SuppressesAuthErrorNotificationWhenErrorEventsExcludesAuthentication_Response = Response;

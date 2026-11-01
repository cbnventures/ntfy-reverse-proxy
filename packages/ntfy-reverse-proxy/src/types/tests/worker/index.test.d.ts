import type { vi } from 'vitest';

import type { Lib_Schema_ConfigSchema } from '../../lib/schema.d.ts';
import type { Worker_Index_CreateWorker_Returns, Worker_Index_CreateWorker_Returns_EmailMessage } from '../../worker/index.d.ts';
import type { Worker_Pipeline_Deliver_Namespace, Worker_Pipeline_Deliver_StubEnqueue } from '../../worker/pipeline/deliver.d.ts';
import type { Worker_Pipeline_Send_Result } from '../../worker/pipeline/send.d.ts';

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

export type Tests_Worker_Index_Outbox = Worker_Pipeline_Deliver_Namespace & {};

export type Tests_Worker_Index_SendResult = Worker_Pipeline_Send_Result & {};

export type Tests_Worker_Index_Env = Record<string, string | KVNamespace | Worker_Pipeline_Deliver_Namespace | undefined>;

/**
 * Tests - Worker - Index - cloudflare:workers.
 *
 * @since 2.3.0
 */
export type Tests_Worker_Index_CloudflareWorkers_DurableObject = ReturnType<typeof vi['fn']>;

/**
 * Tests - Worker - Index - Create Worker - Ignores An Email When The Config Is Invalid.
 *
 * @since 2.3.0
 */
export type Tests_Worker_Index_CreateWorker_IgnoresAnEmailWhenTheConfigIsInvalid_MockFetch = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Index_CreateWorker_IgnoresAnEmailWhenTheConfigIsInvalid_Worker = Worker_Index_CreateWorker_Returns & {};

export type Tests_Worker_Index_CreateWorker_IgnoresAnEmailWhenTheConfigIsInvalid_RawEmail = string;

export type Tests_Worker_Index_CreateWorker_IgnoresAnEmailWhenTheConfigIsInvalid_Message = Worker_Index_CreateWorker_Returns_EmailMessage & {};

/**
 * Tests - Worker - Index - Create Worker - Processes An Email With A Valid Config.
 *
 * @since 2.3.0
 */
export type Tests_Worker_Index_CreateWorker_ProcessesAnEmailWithAValidConfig_MockFetch = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Index_CreateWorker_ProcessesAnEmailWithAValidConfig_Worker = Worker_Index_CreateWorker_Returns & {};

export type Tests_Worker_Index_CreateWorker_ProcessesAnEmailWithAValidConfig_RawEmail = string;

export type Tests_Worker_Index_CreateWorker_ProcessesAnEmailWithAValidConfig_Message = Worker_Index_CreateWorker_Returns_EmailMessage & {};

/**
 * Tests - Worker - Index - Create Worker - Processes A Request With A Valid Config.
 *
 * @since 2.3.0
 */
export type Tests_Worker_Index_CreateWorker_ProcessesARequestWithAValidConfig_MockFetch = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Index_CreateWorker_ProcessesARequestWithAValidConfig_Worker = Worker_Index_CreateWorker_Returns & {};

export type Tests_Worker_Index_CreateWorker_ProcessesARequestWithAValidConfig_Request = Request;

export type Tests_Worker_Index_CreateWorker_ProcessesARequestWithAValidConfig_Response = Response;

export type Tests_Worker_Index_CreateWorker_ProcessesARequestWithAValidConfig_Body = Record<string, unknown>;

/**
 * Tests - Worker - Index - Create Worker - Returns 500 For A Request When The Config Is Invalid.
 *
 * @since 2.3.0
 */
export type Tests_Worker_Index_CreateWorker_Returns500ForARequestWhenTheConfigIsInvalid_MockFetch = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Index_CreateWorker_Returns500ForARequestWhenTheConfigIsInvalid_Worker = Worker_Index_CreateWorker_Returns & {};

export type Tests_Worker_Index_CreateWorker_Returns500ForARequestWhenTheConfigIsInvalid_Request = Request;

export type Tests_Worker_Index_CreateWorker_Returns500ForARequestWhenTheConfigIsInvalid_Response = Response;

export type Tests_Worker_Index_CreateWorker_Returns500ForARequestWhenTheConfigIsInvalid_Body = Record<string, unknown>;

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
 * Tests - Worker - Index - Handle Request - Ignores The Context Header Outside Localhost.
 *
 * @since 2.3.0
 */
export type Tests_Worker_Index_HandleRequest_IgnoresTheContextHeaderOutsideLocalhost_Request = Request;

export type Tests_Worker_Index_HandleRequest_IgnoresTheContextHeaderOutsideLocalhost_Response = Response;

/**
 * Tests - Worker - Index - Handle Request - Passes Through When No Token Configured.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Index_HandleRequest_PassesThroughWhenNoTokenConfigured_Request = Request;

export type Tests_Worker_Index_HandleRequest_PassesThroughWhenNoTokenConfigured_Response = Response;

/**
 * Tests - Worker - Index - Handle Request - Preserves Binary Request Bodies As Attachments.
 *
 * @since 2.3.0
 */
export type Tests_Worker_Index_HandleRequest_PreservesBinaryRequestBodiesAsAttachments_MockFetch = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Index_HandleRequest_PreservesBinaryRequestBodiesAsAttachments_Bytes = Uint8Array<ArrayBuffer>;

export type Tests_Worker_Index_HandleRequest_PreservesBinaryRequestBodiesAsAttachments_Request = Request;

export type Tests_Worker_Index_HandleRequest_PreservesBinaryRequestBodiesAsAttachments_Response = Response;

/**
 * Tests - Worker - Index - Handle Request - Processes A Valid POST Request Through The Pipeline.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Index_HandleRequest_ProcessesAValidPOSTRequestThroughThePipeline_Request = Request;

export type Tests_Worker_Index_HandleRequest_ProcessesAValidPOSTRequestThroughThePipeline_Response = Response;

export type Tests_Worker_Index_HandleRequest_ProcessesAValidPOSTRequestThroughThePipeline_Body = Record<string, unknown>;

/**
 * Tests - Worker - Index - Handle Request - Processes Later Notifications After An Error Topic Attachment Fails.
 *
 * @since 2.3.0
 */
export type Tests_Worker_Index_HandleRequest_ProcessesLaterNotificationsAfterAnErrorTopicAttachmentFails_MockFetch = ReturnType<typeof vi['fn']>;

export type Tests_Worker_Index_HandleRequest_ProcessesLaterNotificationsAfterAnErrorTopicAttachmentFails_Enqueue = Worker_Pipeline_Deliver_StubEnqueue & {};

export type Tests_Worker_Index_HandleRequest_ProcessesLaterNotificationsAfterAnErrorTopicAttachmentFails_IsolatedOutbox = Worker_Pipeline_Deliver_Namespace & {};

export type Tests_Worker_Index_HandleRequest_ProcessesLaterNotificationsAfterAnErrorTopicAttachmentFails_FailedRequest = Request;

export type Tests_Worker_Index_HandleRequest_ProcessesLaterNotificationsAfterAnErrorTopicAttachmentFails_FailedResponse = Response;

export type Tests_Worker_Index_HandleRequest_ProcessesLaterNotificationsAfterAnErrorTopicAttachmentFails_ValidRequest = Request;

export type Tests_Worker_Index_HandleRequest_ProcessesLaterNotificationsAfterAnErrorTopicAttachmentFails_ValidResponse = Response;

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
 * Tests - Worker - Index - Handle Request - Routes A Localhost Request By Its Context Header.
 *
 * @since 2.3.0
 */
export type Tests_Worker_Index_HandleRequest_RoutesALocalhostRequestByItsContextHeader_Request = Request;

export type Tests_Worker_Index_HandleRequest_RoutesALocalhostRequestByItsContextHeader_Response = Response;

export type Tests_Worker_Index_HandleRequest_RoutesALocalhostRequestByItsContextHeader_Body = Record<string, unknown>;

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

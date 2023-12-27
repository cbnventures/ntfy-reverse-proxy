/**
 * Fetch request header.
 *
 * @since 1.0.0
 */
export type FetchRequestHeaderRequest = Request;

export type FetchRequestHeaderName = string;

export type FetchRequestHeaderReturns = string | null;

/**
 * Fetch request text.
 *
 * @since 1.0.0
 */
export type FetchRequestTextRequest = Request;

export type FetchRequestTextReturns = Promise<string | null>;

/**
 * Initialize.
 *
 * @since 1.0.0
 */
export type InitializeRequest = Request;

export type InitializeEnv = unknown;

export type InitializeReturns = Promise<Response>;

/**
 * Is input valid.
 *
 * @since 1.0.0
 */
export type IsInputValidMode = 'allow' | 'disabled' | 'disallow';

export type IsInputValidList = Array<string>;

export type IsInputValidInput = string | null;

export type IsInputValidReturns = boolean;

/**
 * Pretty print.
 *
 * @since 1.0.0
 */
export type PrettyPrintData = object | object[];

export type PrettyPrintReturns = string | null;

/**
 * Send ntfy requests.
 *
 * @since 1.0.0
 */
export type SendNtfyRequestsRequestContent = string;

export type SendNtfyRequestsRequestHeaders = Headers;

export type SendNtfyRequestsRequestMethod = string;

export type SendNtfyRequestsRequestCfProperties = CfProperties<unknown> | undefined;

export type SendNtfyRequestsRequestHostname = string;

export type SendNtfyRequestsRequestShowVisitorInfo = boolean;

export type SendNtfyRequestsRequestMode = 'send-all' | 'send-once';

export type SendNtfyRequestsRequestServerSubdomain = string;

export type SendNtfyRequestsRequestServerTopic = string;

export type SendNtfyRequestsRequestServerServer = string;

export type SendNtfyRequestsRequestServerToken = string;

export type SendNtfyRequestsRequestServer = {
  subdomain: SendNtfyRequestsRequestServerSubdomain;
  topic: SendNtfyRequestsRequestServerTopic;
  server: SendNtfyRequestsRequestServerServer;
  token: SendNtfyRequestsRequestServerToken;
};

export type SendNtfyRequestsRequestServers = SendNtfyRequestsRequestServer[];

export type SendNtfyRequestsRequest = {
  content: SendNtfyRequestsRequestContent;
  headers: SendNtfyRequestsRequestHeaders;
  method: SendNtfyRequestsRequestMethod;
  cfProperties: SendNtfyRequestsRequestCfProperties;
  hostname: SendNtfyRequestsRequestHostname;
  showVisitorInfo: SendNtfyRequestsRequestShowVisitorInfo;
  mode: SendNtfyRequestsRequestMode;
  servers: SendNtfyRequestsRequestServers;
};

export type SendNtfyRequestsReturns = Promise<SendNtfyRequestsResponses>;

export type SendNtfyRequestsResponseSuccess = boolean;

export type SendNtfyRequestsResponseResponse = object;

export type SendNtfyRequestsResponse = {
  success: SendNtfyRequestsResponseSuccess;
  response: SendNtfyRequestsResponseResponse;
};

export type SendNtfyRequestsResponses = SendNtfyRequestsResponse[];

export type SendNtfyRequestsLastResponseSuccess = boolean | null;

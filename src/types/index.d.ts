/**
 * Create ntfy headers.
 *
 * @since 1.0.0
 */
export type CreateNtfyHeadersFetchStage = 1 | 2;

export type CreateNtfyHeadersContentType = 'binary' | 'text';

export type CreateNtfyHeadersHeaders = Headers;

export type CreateNtfyHeadersShowVisitorInfo = boolean;

export type CreateNtfyHeadersReturns = {
  [key: string]: string;
};

/**
 * Fetch request body.
 *
 * @since 1.0.0
 */
export type FetchRequestBodyRequest = Request;

export type FetchRequestBodyReturnsBinaryType = 'binary';

export type FetchRequestBodyReturnsBinaryData = Uint8Array;

export type FetchRequestBodyReturnsBinary = {
  type: FetchRequestBodyReturnsBinaryType;
  data: FetchRequestBodyReturnsBinaryData;
};

export type FetchRequestBodyReturnsTextType = 'text';

export type FetchRequestBodyReturnsTextData = string;

export type FetchRequestBodyReturnsText = {
  type: FetchRequestBodyReturnsTextType;
  data: FetchRequestBodyReturnsTextData;
};

export type FetchRequestBodyReturnsUnknownType = 'unknown';

export type FetchRequestBodyReturnsUnknownData = undefined;

export type FetchRequestBodyReturnsUnknown = {
  type: FetchRequestBodyReturnsUnknownType;
  data: FetchRequestBodyReturnsUnknownData;
};

export type FetchRequestBodyReturns = Promise<FetchRequestBodyReturnsBinary | FetchRequestBodyReturnsText | FetchRequestBodyReturnsUnknown>;

/**
 * Fetch request header.
 *
 * @since 1.0.0
 */
export type FetchRequestHeaderRequest = Request;

export type FetchRequestHeaderName = string;

export type FetchRequestHeaderReturns = string | null;

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
export type SendNtfyRequestsRequestBodyType = 'binary' | 'text';

export type SendNtfyRequestsRequestBodyData = Uint8Array | string | null;

export type SendNtfyRequestsRequestBody = {
  type: SendNtfyRequestsRequestBodyType;
  data: SendNtfyRequestsRequestBodyData;
};

export type SendNtfyRequestsRequestHeaders = Headers;

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
  body: SendNtfyRequestsRequestBody;
  headers: SendNtfyRequestsRequestHeaders;
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

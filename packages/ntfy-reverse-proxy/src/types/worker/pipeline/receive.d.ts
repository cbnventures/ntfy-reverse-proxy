/**
 * Worker - Pipeline - Receive.
 *
 * @since 2.0.0
 */
export type Worker_Pipeline_Receive_ResultMethod = string;

export type Worker_Pipeline_Receive_ResultHostname = string;

export type Worker_Pipeline_Receive_ResultUrl = string;

export type Worker_Pipeline_Receive_ResultHeaders = Headers;

export type Worker_Pipeline_Receive_ResultRawBody = ArrayBuffer;

export type Worker_Pipeline_Receive_ResultIsGet = boolean;

export type Worker_Pipeline_Receive_ResultRedirect = string;

export type Worker_Pipeline_Receive_ResultError = string;

export type Worker_Pipeline_Receive_ResultCfProperties = IncomingRequestCfProperties;

export type Worker_Pipeline_Receive_Result = {
  method: Worker_Pipeline_Receive_ResultMethod;
  hostname: Worker_Pipeline_Receive_ResultHostname;
  url: Worker_Pipeline_Receive_ResultUrl;
  headers: Worker_Pipeline_Receive_ResultHeaders;
  rawBody: Worker_Pipeline_Receive_ResultRawBody;
  isGet: Worker_Pipeline_Receive_ResultIsGet;
  redirect?: Worker_Pipeline_Receive_ResultRedirect;
  error?: Worker_Pipeline_Receive_ResultError;
  cfProperties?: Worker_Pipeline_Receive_ResultCfProperties;
};

export type Worker_Pipeline_Receive_Request = Request;

export type Worker_Pipeline_Receive_BaseDomain = string;

export type Worker_Pipeline_Receive_Returns = Promise<Worker_Pipeline_Receive_Result>;

export type Worker_Pipeline_Receive_Method = string;

export type Worker_Pipeline_Receive_Hostname = string;

export type Worker_Pipeline_Receive_Protocol = string;

export type Worker_Pipeline_Receive_Url = string;

export type Worker_Pipeline_Receive_Headers = Headers;

export type Worker_Pipeline_Receive_IncludesBaseDomain = boolean;

export type Worker_Pipeline_Receive_Redirect = string;

export type Worker_Pipeline_Receive_RawBody = ArrayBuffer;

export type Worker_Pipeline_Receive_IsGet = boolean;

export type Worker_Pipeline_Receive_CfRequestUnknown = unknown;

export type Worker_Pipeline_Receive_CfRequestRecord = Record<string, unknown>;

export type Worker_Pipeline_Receive_CfProperties = IncomingRequestCfProperties | undefined;

export type Worker_Pipeline_Receive_Receive_ParsedUrl = URL;

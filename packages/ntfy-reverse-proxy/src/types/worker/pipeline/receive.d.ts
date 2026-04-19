/**
 * Worker - Pipeline - Receive.
 *
 * @since 2.0.0
 */
export type WorkerPipelineReceiveResultMethod = string;

export type WorkerPipelineReceiveResultHostname = string;

export type WorkerPipelineReceiveResultUrl = string;

export type WorkerPipelineReceiveResultHeaders = Headers;

export type WorkerPipelineReceiveResultRawBody = ArrayBuffer;

export type WorkerPipelineReceiveResultIsGet = boolean;

export type WorkerPipelineReceiveResultRedirect = string;

export type WorkerPipelineReceiveResultError = string;

export type WorkerPipelineReceiveResultCfProperties = IncomingRequestCfProperties;

export type WorkerPipelineReceiveResult = {
  method: WorkerPipelineReceiveResultMethod;
  hostname: WorkerPipelineReceiveResultHostname;
  url: WorkerPipelineReceiveResultUrl;
  headers: WorkerPipelineReceiveResultHeaders;
  rawBody: WorkerPipelineReceiveResultRawBody;
  isGet: WorkerPipelineReceiveResultIsGet;
  redirect?: WorkerPipelineReceiveResultRedirect;
  error?: WorkerPipelineReceiveResultError;
  cfProperties?: WorkerPipelineReceiveResultCfProperties;
};

export type WorkerPipelineReceiveRequest = Request;

export type WorkerPipelineReceiveBaseDomain = string;

export type WorkerPipelineReceiveReturns = Promise<WorkerPipelineReceiveResult>;

export type WorkerPipelineReceiveMethod = string;

export type WorkerPipelineReceiveHostname = string;

export type WorkerPipelineReceiveProtocol = string;

export type WorkerPipelineReceiveUrl = string;

export type WorkerPipelineReceiveHeaders = Headers;

export type WorkerPipelineReceiveIncludesBaseDomain = boolean;

export type WorkerPipelineReceiveRedirect = string;

export type WorkerPipelineReceiveRawBody = ArrayBuffer;

export type WorkerPipelineReceiveIsGet = boolean;

export type WorkerPipelineReceiveCfRequestUnknown = unknown;

export type WorkerPipelineReceiveCfRequestRecord = Record<string, unknown>;

export type WorkerPipelineReceiveCfProperties = IncomingRequestCfProperties | undefined;

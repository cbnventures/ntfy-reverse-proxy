import type {
  WorkerPipelineReceiveBaseDomain,
  WorkerPipelineReceiveCfProperties,
  WorkerPipelineReceiveCfRequestRecord,
  WorkerPipelineReceiveCfRequestUnknown,
  WorkerPipelineReceiveHeaders,
  WorkerPipelineReceiveHostname,
  WorkerPipelineReceiveIncludesBaseDomain,
  WorkerPipelineReceiveIsGet,
  WorkerPipelineReceiveMethod,
  WorkerPipelineReceiveProtocol,
  WorkerPipelineReceiveRawBody,
  WorkerPipelineReceiveRedirect,
  WorkerPipelineReceiveRequest,
  WorkerPipelineReceiveReturns,
  WorkerPipelineReceiveUrl,
} from '../../types/worker/pipeline/receive.d.ts';

/**
 * Worker - Pipeline - Receive.
 *
 * Extracts method, hostname, headers, and body from the incoming
 * request and handles HTTP-to-HTTPS redirects when appropriate.
 *
 * @since 2.0.0
 */
async function receive(request: WorkerPipelineReceiveRequest, baseDomain: WorkerPipelineReceiveBaseDomain): WorkerPipelineReceiveReturns {
  const method: WorkerPipelineReceiveMethod = request.method;
  const parsedUrl: URL = new URL(request.url);
  const hostname: WorkerPipelineReceiveHostname = parsedUrl.hostname;
  const protocol: WorkerPipelineReceiveProtocol = parsedUrl.protocol;
  const url: WorkerPipelineReceiveUrl = request.url;
  const headers: WorkerPipelineReceiveHeaders = request.headers;

  // Redirect HTTP to HTTPS in production (not localhost).
  const includesBaseDomain: WorkerPipelineReceiveIncludesBaseDomain = hostname.includes(baseDomain);

  if (
    protocol === 'http:'
    && hostname !== 'localhost'
    && includesBaseDomain === true
  ) {
    const redirect: WorkerPipelineReceiveRedirect = request.url.replace('http://', 'https://');

    return {
      method,
      hostname,
      url,
      headers,
      rawBody: new ArrayBuffer(0),
      isGet: method === 'GET',
      redirect,
    };
  }

  // Reject unsupported HTTP methods.
  if (
    method !== 'GET'
    && method !== 'POST'
    && method !== 'PUT'
  ) {
    return {
      method,
      hostname,
      url,
      headers,
      rawBody: new ArrayBuffer(0),
      isGet: false,
      error: `Method not allowed: ${method}`,
    };
  }

  // Read raw body for POST/PUT; empty ArrayBuffer for GET.
  const rawBody: WorkerPipelineReceiveRawBody = (method === 'POST' || method === 'PUT') ? await request.arrayBuffer() : new ArrayBuffer(0);
  const isGet: WorkerPipelineReceiveIsGet = method === 'GET';
  const cfRequestUnknown: WorkerPipelineReceiveCfRequestUnknown = request;
  const cfRequestRecord: WorkerPipelineReceiveCfRequestRecord = cfRequestUnknown as WorkerPipelineReceiveCfRequestRecord;
  const cfProperties: WorkerPipelineReceiveCfProperties = cfRequestRecord['cf'] as WorkerPipelineReceiveCfProperties;

  return {
    method,
    hostname,
    url,
    headers,
    rawBody,
    isGet,
    ...(cfProperties !== undefined ? { cfProperties } : {}),
  };
}

export {
  receive,
};

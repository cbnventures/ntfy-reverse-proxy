import type {
  Worker_Pipeline_Receive_BaseDomain,
  Worker_Pipeline_Receive_CfProperties,
  Worker_Pipeline_Receive_CfRequestRecord,
  Worker_Pipeline_Receive_CfRequestUnknown,
  Worker_Pipeline_Receive_Headers,
  Worker_Pipeline_Receive_Hostname,
  Worker_Pipeline_Receive_IncludesBaseDomain,
  Worker_Pipeline_Receive_IsGet,
  Worker_Pipeline_Receive_Method,
  Worker_Pipeline_Receive_Protocol,
  Worker_Pipeline_Receive_RawBody,
  Worker_Pipeline_Receive_Receive_ParsedUrl,
  Worker_Pipeline_Receive_Redirect,
  Worker_Pipeline_Receive_Request,
  Worker_Pipeline_Receive_Returns,
  Worker_Pipeline_Receive_Url,
} from '../../types/worker/pipeline/receive.d.ts';

/**
 * Worker - Pipeline - Receive.
 *
 * Extracts method, hostname, headers, and body from the incoming
 * request and handles HTTP-to-HTTPS redirects when appropriate.
 *
 * @since 2.0.0
 */
async function receive(request: Worker_Pipeline_Receive_Request, baseDomain: Worker_Pipeline_Receive_BaseDomain): Worker_Pipeline_Receive_Returns {
  const method: Worker_Pipeline_Receive_Method = request['method'];
  const parsedUrl: Worker_Pipeline_Receive_Receive_ParsedUrl = new URL(request['url']);
  const hostname: Worker_Pipeline_Receive_Hostname = parsedUrl.hostname;
  const protocol: Worker_Pipeline_Receive_Protocol = parsedUrl.protocol;
  const url: Worker_Pipeline_Receive_Url = request['url'];
  const headers: Worker_Pipeline_Receive_Headers = request['headers'];

  // Redirect HTTP to HTTPS in production (not localhost).
  const includesBaseDomain: Worker_Pipeline_Receive_IncludesBaseDomain = hostname.includes(baseDomain);

  if (
    protocol === 'http:'
    && hostname !== 'localhost'
    && includesBaseDomain === true
  ) {
    const redirect: Worker_Pipeline_Receive_Redirect = request['url'].replace('http://', 'https://');

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
  const rawBody: Worker_Pipeline_Receive_RawBody = (method === 'POST' || method === 'PUT') ? await request.arrayBuffer() : new ArrayBuffer(0);
  const isGet: Worker_Pipeline_Receive_IsGet = method === 'GET';
  const cfRequestUnknown: Worker_Pipeline_Receive_CfRequestUnknown = request;
  const cfRequestRecord: Worker_Pipeline_Receive_CfRequestRecord = cfRequestUnknown as Worker_Pipeline_Receive_CfRequestRecord;
  const cfProperties: Worker_Pipeline_Receive_CfProperties = cfRequestRecord['cf'] as Worker_Pipeline_Receive_CfProperties;

  return {
    method,
    hostname,
    url,
    headers,
    rawBody,
    isGet,
    ...((cfProperties !== undefined) ? { cfProperties } : {}),
  };
}

export {
  receive,
};

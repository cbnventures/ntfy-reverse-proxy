import type {
  WorkerPipelineParseBaseContentType,
  WorkerPipelineParseBytes,
  WorkerPipelineParseContentType,
  WorkerPipelineParseContentTypePart,
  WorkerPipelineParseDecoder,
  WorkerPipelineParseIsBinaryContentType,
  WorkerPipelineParseIsJsonContentType,
  WorkerPipelineParseJson,
  WorkerPipelineParseLooksLikeJson,
  WorkerPipelineParseResult,
  WorkerPipelineParseText,
} from '../../types/worker/pipeline/parse.d.ts';

/**
 * Worker - Pipeline - Parse.
 *
 * Classifies and converts the raw request body into a typed
 * result of text, JSON, or binary based on content analysis.
 *
 * @since 2.0.0
 */
function parse(rawBody: ArrayBuffer, headers: Headers): WorkerPipelineParseResult {
  // Return unknown for empty body.
  if (rawBody.byteLength === 0) {
    return { type: 'unknown' };
  }

  const contentType: WorkerPipelineParseContentType = headers.get('content-type') ?? '';
  const contentTypePart: WorkerPipelineParseContentTypePart = contentType.split(';')[0];
  const baseContentType: WorkerPipelineParseBaseContentType = (contentTypePart !== undefined) ? contentTypePart.trim() : '';

  // Check content-type for binary types.
  const isBinaryContentType: WorkerPipelineParseIsBinaryContentType = (
    baseContentType === 'application/octet-stream'
    || baseContentType.startsWith('image/')
    || baseContentType.startsWith('audio/')
    || baseContentType.startsWith('video/')
  );

  if (isBinaryContentType === true) {
    return {
      type: 'binary', binary: rawBody,
    };
  }

  // Check for null bytes in the buffer (binary detection).
  const bytes: WorkerPipelineParseBytes = new Uint8Array(rawBody);

  for (let i = 0; i < bytes.length; i += 1) {
    if (bytes[i] === 0) {
      return {
        type: 'binary', binary: rawBody,
      };
    }
  }

  // Try UTF-8 decode; if fails, treat as binary.
  let text: WorkerPipelineParseText = undefined;

  try {
    const decoder: WorkerPipelineParseDecoder = new TextDecoder('utf-8', {
      fatal: true, ignoreBOM: false,
    });

    text = decoder.decode(rawBody);
  } catch {
    return {
      type: 'binary', binary: rawBody,
    };
  }

  // Check for null bytes in decoded text (additional binary guard).
  if (text.includes('\u0000') === true) {
    return {
      type: 'binary', binary: rawBody,
    };
  }

  // Try JSON parse if content-type is application/json or text starts with { or [.
  const isJsonContentType: WorkerPipelineParseIsJsonContentType = baseContentType === 'application/json';
  const looksLikeJson: WorkerPipelineParseLooksLikeJson = text.trimStart().startsWith('{') === true || text.trimStart().startsWith('[') === true;

  if (isJsonContentType === true || looksLikeJson === true) {
    try {
      const json: WorkerPipelineParseJson = JSON.parse(text);

      return {
        type: 'json', json,
      };
    } catch {
      // Fall through to text.
    }
  }

  // Fall back to text.
  return {
    type: 'text', text,
  };
}

export {
  parse,
};

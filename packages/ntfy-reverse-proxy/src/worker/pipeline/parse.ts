import type {
  Worker_Pipeline_Parse_BaseContentType,
  Worker_Pipeline_Parse_Bytes,
  Worker_Pipeline_Parse_ContentType,
  Worker_Pipeline_Parse_ContentTypePart,
  Worker_Pipeline_Parse_Decoder,
  Worker_Pipeline_Parse_IsBinaryContentType,
  Worker_Pipeline_Parse_IsJsonContentType,
  Worker_Pipeline_Parse_Json,
  Worker_Pipeline_Parse_LooksLikeJson,
  Worker_Pipeline_Parse_Parse_Headers,
  Worker_Pipeline_Parse_Parse_RawBody,
  Worker_Pipeline_Parse_Returns,
  Worker_Pipeline_Parse_Text,
} from '../../types/worker/pipeline/parse.d.ts';

/**
 * Worker - Pipeline - Parse.
 *
 * Classifies and converts the raw request body into a typed
 * result of text, JSON, or binary based on content analysis.
 *
 * @since 2.0.0
 */
function parse(rawBody: Worker_Pipeline_Parse_Parse_RawBody, headers: Worker_Pipeline_Parse_Parse_Headers): Worker_Pipeline_Parse_Returns {
  // Return unknown for empty body.
  if (rawBody.byteLength === 0) {
    return { type: 'unknown' };
  }

  const contentType: Worker_Pipeline_Parse_ContentType = headers.get('content-type') ?? '';
  const contentTypePart: Worker_Pipeline_Parse_ContentTypePart = contentType.split(';')[0];
  const baseContentType: Worker_Pipeline_Parse_BaseContentType = (contentTypePart !== undefined) ? contentTypePart.trim() : '';

  // Check content-type for binary types.
  const isBinaryContentType: Worker_Pipeline_Parse_IsBinaryContentType = (
    baseContentType === 'application/octet-stream'
    || baseContentType.startsWith('image/')
    || baseContentType.startsWith('audio/')
    || baseContentType.startsWith('video/')
  );

  if (isBinaryContentType === true) {
    return {
      type: 'binary',
      binary: rawBody,
    };
  }

  // Check for null bytes in the buffer (binary detection).
  const bytes: Worker_Pipeline_Parse_Bytes = new Uint8Array(rawBody);

  for (let i = 0; i < bytes.length; i += 1) {
    if (bytes[i] === 0) {
      return {
        type: 'binary',
        binary: rawBody,
      };
    }
  }

  // Try UTF-8 decode; if fails, treat as binary.
  let text: Worker_Pipeline_Parse_Text = undefined;

  try {
    const decoder: Worker_Pipeline_Parse_Decoder = new TextDecoder('utf-8', {
      fatal: true,
      ignoreBOM: false,
    });

    text = decoder.decode(rawBody);
  } catch {
    return {
      type: 'binary',
      binary: rawBody,
    };
  }

  // Check for null bytes in decoded text (additional binary guard).
  if (text.includes('\u0000') === true) {
    return {
      type: 'binary',
      binary: rawBody,
    };
  }

  // Try JSON parse if content-type is application/json or text starts with { or [.
  const isJsonContentType: Worker_Pipeline_Parse_IsJsonContentType = baseContentType === 'application/json';
  const looksLikeJson: Worker_Pipeline_Parse_LooksLikeJson = text.trimStart().startsWith('{') === true || text.trimStart().startsWith('[') === true;

  if (isJsonContentType === true || looksLikeJson === true) {
    try {
      const json: Worker_Pipeline_Parse_Json = JSON.parse(text);

      return {
        type: 'json',
        json,
      };
    } catch {
      // Fall through to text.
    }
  }

  // Fall back to text.
  return {
    type: 'text',
    text,
  };
}

export {
  parse,
};

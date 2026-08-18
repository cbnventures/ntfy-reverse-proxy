import type {
  Worker_Pipeline_Split_Returns,
  Worker_Pipeline_Split_Split_BaseTitle,
  Worker_Pipeline_Split_Split_Body,
  Worker_Pipeline_Split_Split_CharBytes,
  Worker_Pipeline_Split_Split_Chunks,
  Worker_Pipeline_Split_Split_CurrentBytes,
  Worker_Pipeline_Split_Split_CurrentChunk,
  Worker_Pipeline_Split_Split_Encoder,
  Worker_Pipeline_Split_Split_Headers,
  Worker_Pipeline_Split_Split_PartHeaders,
  Worker_Pipeline_Split_Split_Total,
} from '../../types/worker/pipeline/split.d.ts';

/**
 * Worker - Pipeline - Split - Max Bytes.
 *
 * Maximum UTF-8 byte length allowed per notification part before
 * the body must be split into multiple ntfy requests.
 *
 * @since 2.1.0
 */
const MAX_BYTES = 4000;

/**
 * Worker - Pipeline - Split.
 *
 * Breaks a notification body into multiple parts when the
 * UTF-8 byte length exceeds the ntfy server size limit.
 *
 * @since 2.0.0
 */
function split(body: Worker_Pipeline_Split_Split_Body, headers: Worker_Pipeline_Split_Split_Headers): Worker_Pipeline_Split_Returns {
  const encoder: Worker_Pipeline_Split_Split_Encoder = new TextEncoder();

  if (encoder.encode(body).length <= MAX_BYTES) {
    return [{
      body,
      headers,
    }];
  }

  const chunks: Worker_Pipeline_Split_Split_Chunks = [];
  let currentChunk: Worker_Pipeline_Split_Split_CurrentChunk = '';
  let currentBytes: Worker_Pipeline_Split_Split_CurrentBytes = 0;

  for (const char of body) {
    const charBytes: Worker_Pipeline_Split_Split_CharBytes = encoder.encode(char).length;

    if (currentBytes + charBytes > MAX_BYTES) {
      chunks.push(currentChunk);
      currentChunk = char;
      currentBytes = charBytes;
    } else {
      currentChunk += char;
      currentBytes += charBytes;
    }
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }

  const total: Worker_Pipeline_Split_Split_Total = chunks.length;
  const baseTitle: Worker_Pipeline_Split_Split_BaseTitle = headers['X-Title'] ?? 'Message';

  return chunks.map((chunkBody, index) => {
    const partHeaders: Worker_Pipeline_Split_Split_PartHeaders = {
      ...headers,
      'X-Title': `${baseTitle} (${index + 1}/${total})`,
    };

    return {
      body: chunkBody,
      headers: partHeaders,
    };
  });
}

export {
  split,
};

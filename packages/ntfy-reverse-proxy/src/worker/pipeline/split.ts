import type {
  Worker_Pipeline_Split_Returns,
  Worker_Pipeline_Split_Split_BaseTitle,
  Worker_Pipeline_Split_Split_Body,
  Worker_Pipeline_Split_Split_CharBytes,
  Worker_Pipeline_Split_Split_Chunks,
  Worker_Pipeline_Split_Split_CurrentBytes,
  Worker_Pipeline_Split_Split_CurrentChunk,
  Worker_Pipeline_Split_Split_Encoder,
  Worker_Pipeline_Split_Split_Message,
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
 * Worker - Pipeline - Split - Split.
 *
 * Breaks a message body into multiple parts when the UTF-8 byte
 * length exceeds the ntfy server size limit, numbering each title.
 *
 * @returns {Worker_Pipeline_Split_Returns}
 *
 * @since 2.0.0
 */
function split(message: Worker_Pipeline_Split_Split_Message): Worker_Pipeline_Split_Returns {
  const body: Worker_Pipeline_Split_Split_Body = message['body'];
  const encoder: Worker_Pipeline_Split_Split_Encoder = new TextEncoder();

  if (encoder.encode(body).length <= MAX_BYTES) {
    return [message];
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
  const baseTitle: Worker_Pipeline_Split_Split_BaseTitle = message['title'] ?? 'Message';

  return chunks.map((chunkBody, index) => ({
    ...message,
    body: chunkBody,
    title: `${baseTitle} (${index + 1}/${total})`,
  }));
}

export {
  split,
};

import type {
  WorkerPipelineSplitBaseTitle,
  WorkerPipelineSplitBody,
  WorkerPipelineSplitCharBytes,
  WorkerPipelineSplitChunks,
  WorkerPipelineSplitCurrentBytes,
  WorkerPipelineSplitCurrentChunk,
  WorkerPipelineSplitEncoder,
  WorkerPipelineSplitMessagePartHeaders,
  WorkerPipelineSplitReturns,
  WorkerPipelineSplitTotal,
} from '../../types/worker/pipeline/split.d.ts';

const MAX_BYTES = 4000;

/**
 * Worker - Pipeline - Split.
 *
 * Breaks a notification body into multiple parts when the
 * UTF-8 byte length exceeds the ntfy server size limit.
 *
 * @since 2.0.0
 */
function split(body: WorkerPipelineSplitBody, headers: WorkerPipelineSplitMessagePartHeaders): WorkerPipelineSplitReturns {
  const encoder: WorkerPipelineSplitEncoder = new TextEncoder();

  if (encoder.encode(body).length <= MAX_BYTES) {
    return [{
      body, headers,
    }];
  }

  const chunks: WorkerPipelineSplitChunks = [];
  let currentChunk: WorkerPipelineSplitCurrentChunk = '';
  let currentBytes: WorkerPipelineSplitCurrentBytes = 0;

  for (const char of body) {
    const charBytes: WorkerPipelineSplitCharBytes = encoder.encode(char).length;

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

  const total: WorkerPipelineSplitTotal = chunks.length;
  const baseTitle: WorkerPipelineSplitBaseTitle = headers['X-Title'] ?? 'Message';

  return chunks.map((chunkBody, index) => {
    const partHeaders: WorkerPipelineSplitMessagePartHeaders = {
      ...headers,
      'X-Title': `${baseTitle} (${index + 1}/${total})`,
    };

    return {
      body: chunkBody, headers: partHeaders,
    };
  });
}

export {
  split,
};

/**
 * Worker - Pipeline - Parse.
 *
 * @since 2.0.0
 */
export type WorkerPipelineParseResultType = 'text' | 'json' | 'binary' | 'unknown';

export type WorkerPipelineParseResultText = string;

export type WorkerPipelineParseResultJson = Record<string, unknown>;

export type WorkerPipelineParseResultBinary = ArrayBuffer;

export type WorkerPipelineParseResult = {
  type: WorkerPipelineParseResultType;
  text?: WorkerPipelineParseResultText;
  json?: WorkerPipelineParseResultJson;
  binary?: WorkerPipelineParseResultBinary;
};

export type WorkerPipelineParseContentType = string;

export type WorkerPipelineParseContentTypePart = string | undefined;

export type WorkerPipelineParseBaseContentType = string;

export type WorkerPipelineParseIsBinaryContentType = boolean;

export type WorkerPipelineParseBytes = Uint8Array;

export type WorkerPipelineParseText = string | undefined;

export type WorkerPipelineParseDecoder = TextDecoder;

export type WorkerPipelineParseIsJsonContentType = boolean;

export type WorkerPipelineParseLooksLikeJson = boolean;

export type WorkerPipelineParseJson = Record<string, unknown>;

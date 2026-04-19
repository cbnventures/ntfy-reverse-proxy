/**
 * Worker - Pipeline - Split.
 *
 * @since 2.0.0
 */
export type WorkerPipelineSplitMessagePartBody = string;

export type WorkerPipelineSplitMessagePartHeaders = Record<string, string>;

export type WorkerPipelineSplitMessagePart = {
  body: WorkerPipelineSplitMessagePartBody;
  headers: WorkerPipelineSplitMessagePartHeaders;
};

export type WorkerPipelineSplitBody = string;

export type WorkerPipelineSplitHeaders = WorkerPipelineSplitMessagePartHeaders;

export type WorkerPipelineSplitReturns = WorkerPipelineSplitMessagePart[];

export type WorkerPipelineSplitEncoder = TextEncoder;

export type WorkerPipelineSplitChunks = string[];

export type WorkerPipelineSplitCurrentChunk = string;

export type WorkerPipelineSplitCurrentBytes = number;

export type WorkerPipelineSplitCharBytes = number;

export type WorkerPipelineSplitTotal = number;

export type WorkerPipelineSplitBaseTitle = string;

export type WorkerPipelineSplitPartHeaders = WorkerPipelineSplitMessagePartHeaders;

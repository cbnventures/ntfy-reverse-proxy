/**
 * Worker - Pipeline - Format.
 *
 * @since 2.0.0
 */
export type WorkerPipelineFormatOptionsShowVisitorInfo = boolean;

export type WorkerPipelineFormatOptionsVisitorIp = string;

export type WorkerPipelineFormatOptionsCfProperties = Record<string, unknown>;

export type WorkerPipelineFormatOptions = {
  showVisitorInfo: WorkerPipelineFormatOptionsShowVisitorInfo;
  visitorIp?: WorkerPipelineFormatOptionsVisitorIp;
  cfProperties?: WorkerPipelineFormatOptionsCfProperties;
};

export type WorkerPipelineFormatResultBody = string;

export type WorkerPipelineFormatResultHeaders = Record<string, string>;

export type WorkerPipelineFormatResult = {
  body: WorkerPipelineFormatResultBody;
  headers: WorkerPipelineFormatResultHeaders;
};

export type WorkerPipelineFormatBody = string;

export type WorkerPipelineFormatCf = WorkerPipelineFormatOptionsCfProperties;

export type WorkerPipelineFormatIp = string;

export type WorkerPipelineFormatSeparator = string;

export type WorkerPipelineFormatIsMarkdown = boolean;

export type WorkerPipelineFormatBoldFn = (text: string) => string;

export type WorkerPipelineFormatLines = string[];

export type WorkerPipelineFormatHeaders = Record<string, string>;

export type WorkerPipelineFormatPriorityString = string;

export type WorkerPipelineFormatTagsString = string;

export type WorkerPipelineFormatMarkdownString = string;

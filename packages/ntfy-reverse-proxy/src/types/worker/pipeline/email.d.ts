/**
 * Worker - Pipeline - Email - Extract Email Address.
 *
 * @since 2.0.0
 */
export type WorkerPipelineEmailHeaderValue = string;

export type WorkerPipelineEmailExtractEmailAddressMatch = RegExpMatchArray | null;

/**
 * Worker - Pipeline - Email - Extract From Multipart.
 *
 * @since 2.0.0
 */
export type WorkerPipelineEmailBodySection = string;

export type WorkerPipelineEmailHeaderSection = string;

export type WorkerPipelineEmailExtractFromMultipartResultText = string;

export type WorkerPipelineEmailExtractFromMultipartResultHtml = string;

export type WorkerPipelineEmailExtractFromMultipartResult = {
  text: WorkerPipelineEmailExtractFromMultipartResultText;
  html: WorkerPipelineEmailExtractFromMultipartResultHtml;
};

export type WorkerPipelineEmailBoundaryMatch = RegExpMatchArray | null;

export type WorkerPipelineEmailBoundary = string | undefined;

export type WorkerPipelineEmailExtractFromMultipartText = string;

export type WorkerPipelineEmailExtractFromMultipartHtml = string;

export type WorkerPipelineEmailParts = string[];

export type WorkerPipelineEmailPart = string;

export type WorkerPipelineEmailExtractFromMultipartSeparator = string;

export type WorkerPipelineEmailPartHeaderSeparatorIndex = number;

export type WorkerPipelineEmailPartContentType = string;

export type WorkerPipelineEmailPartBody = string;

/**
 * Worker - Pipeline - Email - Parse Email.
 *
 * @since 2.0.0
 */
export type WorkerPipelineEmailRawEmail = string;

export type WorkerPipelineEmailResultFrom = string;

export type WorkerPipelineEmailResultTo = string;

export type WorkerPipelineEmailResultSubject = string;

export type WorkerPipelineEmailResultTextBody = string;

export type WorkerPipelineEmailResult = {
  from: WorkerPipelineEmailResultFrom;
  to: WorkerPipelineEmailResultTo;
  subject: WorkerPipelineEmailResultSubject;
  textBody: WorkerPipelineEmailResultTextBody;
};

export type WorkerPipelineEmailParseEmailReturns = Promise<WorkerPipelineEmailResult>;

export type WorkerPipelineEmailParseEmailSeparator = string;

export type WorkerPipelineEmailHeaderSeparatorIndex = number;

export type WorkerPipelineEmailHeaderLines = string[];

export type WorkerPipelineEmailHeaders = Map<string, string>;

export type WorkerPipelineEmailHeaderKey = string;

export type WorkerPipelineEmailContentType = string;

export type WorkerPipelineEmailTextBody = string;

export type WorkerPipelineEmailParseEmailNestedPartHeaders = string;

export type WorkerPipelineEmailParseEmailNestedResultText = string;

export type WorkerPipelineEmailParseEmailNestedResultHtml = string;

export type WorkerPipelineEmailParseEmailNestedResult = {
  text: WorkerPipelineEmailParseEmailNestedResultText;
  html: WorkerPipelineEmailParseEmailNestedResultHtml;
};

export type WorkerPipelineEmailParseEmailEmbeddedBoundaryArg = string;

export type WorkerPipelineEmailParseEmailEmbeddedResultText = string;

export type WorkerPipelineEmailParseEmailEmbeddedResultHtml = string;

export type WorkerPipelineEmailParseEmailEmbeddedResult = {
  text: WorkerPipelineEmailParseEmailEmbeddedResultText;
  html: WorkerPipelineEmailParseEmailEmbeddedResultHtml;
};

export type WorkerPipelineEmailParseEmailEmbeddedHtmlStripped = string;

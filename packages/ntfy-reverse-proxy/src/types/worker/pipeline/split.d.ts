/**
 * Worker - Pipeline - Split.
 *
 * @since 2.0.0
 */
export type Worker_Pipeline_Split_MessagePartBody = string;

export type Worker_Pipeline_Split_MessagePartHeaders = Record<string, string>;

export type Worker_Pipeline_Split_MessagePart = {
  body: Worker_Pipeline_Split_MessagePartBody;
  headers: Worker_Pipeline_Split_MessagePartHeaders;
};

export type Worker_Pipeline_Split_Returns = Worker_Pipeline_Split_MessagePart[];

/**
 * Worker - Pipeline - Split - Split.
 *
 * @since 2.0.0
 */
export type Worker_Pipeline_Split_Split_Body = string;

export type Worker_Pipeline_Split_Split_Headers = Record<string, string>;

export type Worker_Pipeline_Split_Split_Encoder = TextEncoder;

export type Worker_Pipeline_Split_Split_Chunks = string[];

export type Worker_Pipeline_Split_Split_CurrentChunk = string;

export type Worker_Pipeline_Split_Split_CurrentBytes = number;

export type Worker_Pipeline_Split_Split_CharBytes = number;

export type Worker_Pipeline_Split_Split_Total = number;

export type Worker_Pipeline_Split_Split_BaseTitle = string;

export type Worker_Pipeline_Split_Split_PartHeaders = Record<string, string>;

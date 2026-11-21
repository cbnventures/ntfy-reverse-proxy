import type { Shared_NtfyMessage } from '../../shared.d.ts';

/**
 * Worker - Pipeline - Split.
 *
 * @since 2.0.0
 */
export type Worker_Pipeline_Split_MessagePart = Shared_NtfyMessage;

export type Worker_Pipeline_Split_Returns = Worker_Pipeline_Split_MessagePart[];

/**
 * Worker - Pipeline - Split - Split.
 *
 * @since 2.0.0
 */
export type Worker_Pipeline_Split_Split_Message = Shared_NtfyMessage;

export type Worker_Pipeline_Split_Split_Body = string;

export type Worker_Pipeline_Split_Split_Encoder = TextEncoder;

export type Worker_Pipeline_Split_Split_Chunks = string[];

export type Worker_Pipeline_Split_Split_CurrentChunk = string;

export type Worker_Pipeline_Split_Split_CurrentBytes = number;

export type Worker_Pipeline_Split_Split_CharBytes = number;

export type Worker_Pipeline_Split_Split_Total = number;

export type Worker_Pipeline_Split_Split_BaseTitle = string;

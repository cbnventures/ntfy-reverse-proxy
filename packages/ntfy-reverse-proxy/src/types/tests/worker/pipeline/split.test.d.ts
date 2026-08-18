import type { Worker_Pipeline_Split_MessagePart } from '../../../worker/pipeline/split.d.ts';

/**
 * Tests - Worker - Pipeline - Split - Split - Adds Part Numbers To Title.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Pipeline_Split_Split_AddsPartNumbersToTitle_LongBody = string;

export type Tests_Worker_Pipeline_Split_Split_AddsPartNumbersToTitle_Result = readonly Worker_Pipeline_Split_MessagePart[];

/**
 * Tests - Worker - Pipeline - Split - Split - Creates Title If None Exists When Splitting.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Pipeline_Split_Split_CreatesTitleIfNoneExistsWhenSplitting_LongBody = string;

export type Tests_Worker_Pipeline_Split_Split_CreatesTitleIfNoneExistsWhenSplitting_Result = readonly Worker_Pipeline_Split_MessagePart[];

/**
 * Tests - Worker - Pipeline - Split - Split - Does Not Split On Multi Byte Character Boundaries.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Pipeline_Split_Split_DoesNotSplitOnMultiByteCharacterBoundaries_Body = string;

export type Tests_Worker_Pipeline_Split_Split_DoesNotSplitOnMultiByteCharacterBoundaries_Result = readonly Worker_Pipeline_Split_MessagePart[];

/**
 * Tests - Worker - Pipeline - Split - Split - Preserves All Headers On Each Part.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Pipeline_Split_Split_PreservesAllHeadersOnEachPart_LongBody = string;

export type Tests_Worker_Pipeline_Split_Split_PreservesAllHeadersOnEachPart_Headers = Record<string, string>;

export type Tests_Worker_Pipeline_Split_Split_PreservesAllHeadersOnEachPart_Result = readonly Worker_Pipeline_Split_MessagePart[];

/**
 * Tests - Worker - Pipeline - Split - Split - Returns Single Message When Under Limit.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Pipeline_Split_Split_ReturnsSingleMessageWhenUnderLimit_Result = readonly Worker_Pipeline_Split_MessagePart[];

/**
 * Tests - Worker - Pipeline - Split - Split - Splits Message Exceeding 4000 Bytes.
 *
 * @since 2.0.0
 */
export type Tests_Worker_Pipeline_Split_Split_SplitsMessageExceeding4000Bytes_LongBody = string;

export type Tests_Worker_Pipeline_Split_Split_SplitsMessageExceeding4000Bytes_Result = readonly Worker_Pipeline_Split_MessagePart[];

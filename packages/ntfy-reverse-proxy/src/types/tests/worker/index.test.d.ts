import type { LibSchemaConfigSchema } from '../../lib/schema.d.ts';

/**
 * Tests - Worker - Index.
 *
 * @since 2.0.0
 */
export type TestsWorkerIndexConfig = LibSchemaConfigSchema;

export type TestsWorkerIndexRequest = Request;

export type TestsWorkerIndexResponse = Response;

export type TestsWorkerIndexResponseBody = Record<string, unknown>;

export type TestsWorkerIndexContentType = string | null;

export type TestsWorkerIndexMockFetch = ReturnType<typeof import('vitest')['vi']['fn']>;

export type TestsWorkerIndexRawEmail = string;

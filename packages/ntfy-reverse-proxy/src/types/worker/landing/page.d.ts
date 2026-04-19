import type {
  LibSchemaConfigSchema,
  LibSchemaConfigSchemaContexts,
  LibSchemaConfigSchemaServers,
  LibSchemaConfigSchemaSettings,
} from '../../lib/schema.d.ts';

/**
 * Worker - Landing - Page.
 *
 * @since 2.0.0
 */
export type WorkerLandingPageConfig = LibSchemaConfigSchema;

export type WorkerLandingPageResponse = Response;

export type WorkerLandingPageSettings = LibSchemaConfigSchemaSettings;

export type WorkerLandingPageServers = LibSchemaConfigSchemaServers;

export type WorkerLandingPageContexts = LibSchemaConfigSchemaContexts;

export type WorkerLandingPageDebugSection = string;

export type WorkerLandingPageMaskedServers = Record<string, string>[];

export type WorkerLandingPageMaskedContexts = Record<string, unknown>[];

export type WorkerLandingPageBase = Record<string, unknown>;

export type WorkerLandingPageMaskedConfig = Record<string, unknown>;

export type WorkerLandingPageMaskedJson = string;

export type WorkerLandingPageHtml = string;

/**
 * Worker - Landing - Page - Escape HTML.
 *
 * @since 2.0.0
 */
export type WorkerLandingPageEscapeHtmlStr = string;

export type WorkerLandingPageEscapeHtmlReturns = string;

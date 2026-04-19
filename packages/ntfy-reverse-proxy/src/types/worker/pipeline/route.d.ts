import type {
  LibSchemaContextConfig,
  LibSchemaServerConfig,
} from '../../lib/schema.d.ts';

/**
 * Worker - Pipeline - Route.
 *
 * @since 2.0.0
 */
export type WorkerPipelineRouteType = 'http' | 'email';

export type WorkerPipelineRouteIdentifier = string;

export type WorkerPipelineRouteResultContext = LibSchemaContextConfig | undefined;

export type WorkerPipelineRouteResultResolvedServers = LibSchemaServerConfig[] | undefined;

export type WorkerPipelineRouteResultPrimaryServer = LibSchemaServerConfig | undefined;

export type WorkerPipelineRouteResultError = string | undefined;

export type WorkerPipelineRouteResult = {
  context: WorkerPipelineRouteResultContext;
  resolvedServers: WorkerPipelineRouteResultResolvedServers;
  primaryServer: WorkerPipelineRouteResultPrimaryServer;
  error: WorkerPipelineRouteResultError;
};

export type WorkerPipelineRouteContext = LibSchemaContextConfig | undefined;

export type WorkerPipelineRouteResolvedServers = LibSchemaServerConfig[];

export type WorkerPipelineRoutePrimaryServer = LibSchemaServerConfig | undefined;

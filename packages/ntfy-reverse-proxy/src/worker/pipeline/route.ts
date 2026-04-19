import type { LibSchemaConfigSchema, LibSchemaServerConfig } from '../../types/lib/schema.d.ts';
import type {
  WorkerPipelineRouteContext,
  WorkerPipelineRouteIdentifier,
  WorkerPipelineRoutePrimaryServer,
  WorkerPipelineRouteResolvedServers,
  WorkerPipelineRouteResult,
  WorkerPipelineRouteType,
} from '../../types/worker/pipeline/route.d.ts';

/**
 * Worker - Pipeline - Route.
 *
 * Matches the incoming request to a configured context by type
 * and identifier, then resolves the associated server list.
 *
 * @since 2.0.0
 */
function route(routeType: WorkerPipelineRouteType, identifier: WorkerPipelineRouteIdentifier, config: LibSchemaConfigSchema): WorkerPipelineRouteResult {
  const context: WorkerPipelineRouteContext = config['contexts'].find((ctx) => ctx['type'] === routeType && ctx['id'] === identifier);

  if (context === undefined) {
    return {
      context: undefined,
      resolvedServers: undefined,
      primaryServer: undefined,
      error: `No context found for ${routeType} identifier: ${identifier}`,
    };
  }

  const resolvedServers: WorkerPipelineRouteResolvedServers = context['servers']
    .map((serverName) => config['servers'].find((server) => server['name'] === serverName))
    .filter((server): server is LibSchemaServerConfig => server !== undefined);

  const primaryServer: WorkerPipelineRoutePrimaryServer = config['servers'].find(
    (server) => server['name'] === context['primary_server'],
  );

  return {
    context,
    resolvedServers,
    primaryServer,
    error: undefined,
  };
}

export {
  route,
};

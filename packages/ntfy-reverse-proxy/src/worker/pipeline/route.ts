import type { Lib_Schema_ServerConfig } from '../../types/lib/schema.d.ts';
import type {
  Worker_Pipeline_Route_Config,
  Worker_Pipeline_Route_Context,
  Worker_Pipeline_Route_Identifier,
  Worker_Pipeline_Route_PrimaryServer,
  Worker_Pipeline_Route_Returns,
  Worker_Pipeline_Route_Route_ResolvedServers,
  Worker_Pipeline_Route_RouteType,
} from '../../types/worker/pipeline/route.d.ts';

/**
 * Worker - Pipeline - Route.
 *
 * Matches the incoming request to a configured context by type
 * and identifier, then resolves the associated server list.
 *
 * @since 2.0.0
 */
function route(routeType: Worker_Pipeline_Route_RouteType, identifier: Worker_Pipeline_Route_Identifier, config: Worker_Pipeline_Route_Config): Worker_Pipeline_Route_Returns {
  const context: Worker_Pipeline_Route_Context = config['contexts'].find((ctx) => ctx['type'] === routeType && ctx['id'] === identifier);

  if (context === undefined) {
    return {
      context: undefined,
      resolvedServers: undefined,
      primaryServer: undefined,
      error: `No context found for ${routeType} identifier: ${identifier}`,
    };
  }

  const resolvedServers: Worker_Pipeline_Route_Route_ResolvedServers = context['servers']
    .map((serverName) => config['servers'].find((server) => server['name'] === serverName))
    .filter((server): server is Lib_Schema_ServerConfig => server !== undefined);

  const primaryServer: Worker_Pipeline_Route_PrimaryServer = config['servers'].find(
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

import type {
  Lib_Schema_ConfigSchema,
  Lib_Schema_ContextConfig,
  Lib_Schema_ServerConfig,
} from '../../lib/schema.d.ts';

/**
 * Worker - Pipeline - Route.
 *
 * @since 2.0.0
 */
export type Worker_Pipeline_Route_RouteType = 'http' | 'email';

export type Worker_Pipeline_Route_Identifier = string;

export type Worker_Pipeline_Route_Config = Lib_Schema_ConfigSchema;

export type Worker_Pipeline_Route_ResultContext = Lib_Schema_ContextConfig | undefined;

export type Worker_Pipeline_Route_ResultResolvedServers = Lib_Schema_ServerConfig[] | undefined;

export type Worker_Pipeline_Route_ResultPrimaryServer = Lib_Schema_ServerConfig | undefined;

export type Worker_Pipeline_Route_ResultError = string | undefined;

export type Worker_Pipeline_Route_Result = {
  context: Worker_Pipeline_Route_ResultContext;
  resolvedServers: Worker_Pipeline_Route_ResultResolvedServers;
  primaryServer: Worker_Pipeline_Route_ResultPrimaryServer;
  error: Worker_Pipeline_Route_ResultError;
};

export type Worker_Pipeline_Route_Returns = Worker_Pipeline_Route_Result;

export type Worker_Pipeline_Route_Context = Lib_Schema_ContextConfig | undefined;

export type Worker_Pipeline_Route_PrimaryServer = Lib_Schema_ServerConfig | undefined;

export type Worker_Pipeline_Route_Route_ResolvedServersItemName = string;

export type Worker_Pipeline_Route_Route_ResolvedServersItemServer = string;

export type Worker_Pipeline_Route_Route_ResolvedServersItemToken = string;

export type Worker_Pipeline_Route_Route_ResolvedServersItem = {
  name: Worker_Pipeline_Route_Route_ResolvedServersItemName;
  server: Worker_Pipeline_Route_Route_ResolvedServersItemServer;
  token: Worker_Pipeline_Route_Route_ResolvedServersItemToken;
};

export type Worker_Pipeline_Route_Route_ResolvedServers = Worker_Pipeline_Route_Route_ResolvedServersItem[];

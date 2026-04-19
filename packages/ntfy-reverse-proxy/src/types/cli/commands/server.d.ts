import type { LibSchemaConfigSchema, LibSchemaContextConfig, LibSchemaServerConfig } from '../../lib/schema.d.ts';

/**
 * CLI - Commands - Server - Add Server.
 *
 * @since 2.0.0
 */
export type CliCommandsServerAddServerConfigPath = string;

export type CliCommandsServerAddServerServer = LibSchemaServerConfig;

export type CliCommandsServerAddServerReturn = void;

export type CliCommandsServerAddServerConfig = LibSchemaConfigSchema;

export type CliCommandsServerAddServerDuplicate = boolean;

/**
 * CLI - Commands - Server - Edit Server.
 *
 * @since 2.0.0
 */
export type CliCommandsServerEditServerConfigPath = string;

export type CliCommandsServerEditServerName = string;

export type CliCommandsServerEditServerUpdates = Partial<LibSchemaServerConfig>;

export type CliCommandsServerEditServerReturn = void;

export type CliCommandsServerEditServerConfig = LibSchemaConfigSchema;

export type CliCommandsServerEditServerIndex = number;

export type CliCommandsServerEditServerMerged = LibSchemaServerConfig;

/**
 * CLI - Commands - Server - List Servers.
 *
 * @since 2.0.0
 */
export type CliCommandsServerListServersConfigPath = string;

export type CliCommandsServerListServersReturn = LibSchemaServerConfig[];

export type CliCommandsServerListServersConfig = LibSchemaConfigSchema;

/**
 * CLI - Commands - Server - Remove Server.
 *
 * @since 2.0.0
 */
export type CliCommandsServerRemoveServerConfigPath = string;

export type CliCommandsServerRemoveServerName = string;

export type CliCommandsServerRemoveServerReturn = void;

export type CliCommandsServerRemoveServerConfig = LibSchemaConfigSchema;

export type CliCommandsServerRemoveServerReferencedContexts = LibSchemaContextConfig[];

export type CliCommandsServerRemoveServerContextNames = string;

export type CliCommandsServerRemoveServerFiltered = LibSchemaServerConfig[];

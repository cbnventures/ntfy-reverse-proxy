import type { Lib_Schema_ConfigSchema, Lib_Schema_ServerConfig } from '../../lib/schema.d.ts';

/**
 * CLI - Commands - Server - Add Server.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Server_AddServer_ConfigPath = string;

export type Cli_Commands_Server_AddServer_Server = Lib_Schema_ServerConfig;

export type Cli_Commands_Server_AddServer_Returns = void;

export type Cli_Commands_Server_AddServer_Config = { [Key in keyof Lib_Schema_ConfigSchema]: Lib_Schema_ConfigSchema[Key] };

export type Cli_Commands_Server_AddServer_Duplicate = boolean;

/**
 * CLI - Commands - Server - Edit Server.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Server_EditServer_ConfigPath = string;

export type Cli_Commands_Server_EditServer_Name = string;

export type Cli_Commands_Server_EditServer_Updates = Partial<Lib_Schema_ServerConfig>;

export type Cli_Commands_Server_EditServer_Returns = void;

export type Cli_Commands_Server_EditServer_Config = { [Key in keyof Lib_Schema_ConfigSchema]: Lib_Schema_ConfigSchema[Key] };

export type Cli_Commands_Server_EditServer_Index = number;

export type Cli_Commands_Server_EditServer_Merged = { [Key in keyof Lib_Schema_ServerConfig]: Lib_Schema_ServerConfig[Key] };

/**
 * CLI - Commands - Server - List Servers.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Server_ListServers_ConfigPath = string;

export type Cli_Commands_Server_ListServers_Returns = Lib_Schema_ServerConfig[];

export type Cli_Commands_Server_ListServers_Config = Lib_Schema_ConfigSchema;

/**
 * CLI - Commands - Server - Remove Server.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Server_RemoveServer_ConfigPath = string;

export type Cli_Commands_Server_RemoveServer_Name = string;

export type Cli_Commands_Server_RemoveServer_Returns = void;

export type Cli_Commands_Server_RemoveServer_Config = { [Key in keyof Lib_Schema_ConfigSchema]: Lib_Schema_ConfigSchema[Key] };

export type Cli_Commands_Server_RemoveServer_ReferencedContexts = Lib_Schema_ConfigSchema['contexts'];

export type Cli_Commands_Server_RemoveServer_ContextNames = string;

export type Cli_Commands_Server_RemoveServer_Filtered = Lib_Schema_ConfigSchema['servers'];

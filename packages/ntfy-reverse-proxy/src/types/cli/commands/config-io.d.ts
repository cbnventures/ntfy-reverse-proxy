import type { Lib_Schema_ConfigSchema } from '../../lib/schema.d.ts';

/**
 * CLI - Commands - Config IO.
 *
 * @since 2.0.0
 */
export type Cli_Commands_ConfigIo_LoadConfig_ConfigPath = string;

export type Cli_Commands_ConfigIo_LoadConfig_Returns = unknown;

export type Cli_Commands_ConfigIo_LoadConfig_ConfigRaw = string;

export type Cli_Commands_ConfigIo_LoadConfig_Parsed = unknown;

/**
 * CLI - Commands - Config IO.
 *
 * @since 2.0.0
 */
export type Cli_Commands_ConfigIo_NormalizeConfig_Config = Lib_Schema_ConfigSchema;

export type Cli_Commands_ConfigIo_NormalizeConfig_Returns = Lib_Schema_ConfigSchema;

export type Cli_Commands_ConfigIo_NormalizeConfig_SortedServers = Lib_Schema_ConfigSchema['servers'];

export type Cli_Commands_ConfigIo_NormalizeConfig_SortedContexts = Lib_Schema_ConfigSchema['contexts'];

/**
 * CLI - Commands - Config IO.
 *
 * @since 2.0.0
 */
export type Cli_Commands_ConfigIo_SaveConfig_ConfigPath = string;

export type Cli_Commands_ConfigIo_SaveConfig_Config = Lib_Schema_ConfigSchema;

export type Cli_Commands_ConfigIo_SaveConfig_Returns = void;

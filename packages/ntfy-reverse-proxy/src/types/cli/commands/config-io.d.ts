import type { LibSchemaConfigSchema } from '../../lib/schema.d.ts';

/**
 * CLI - Commands - Config IO.
 *
 * @since 2.0.0
 */
export type CliCommandsConfigIoLoadConfigConfigPath = string;

export type CliCommandsConfigIoLoadConfigReturn = unknown;

export type CliCommandsConfigIoLoadConfigConfigRaw = string;

export type CliCommandsConfigIoLoadConfigParsed = unknown;

/**
 * CLI - Commands - Config IO.
 *
 * @since 2.0.0
 */
export type CliCommandsConfigIoNormalizeConfigConfig = LibSchemaConfigSchema;

export type CliCommandsConfigIoNormalizeConfigReturn = LibSchemaConfigSchema;

export type CliCommandsConfigIoNormalizeConfigSortedServers = LibSchemaConfigSchema['servers'];

export type CliCommandsConfigIoNormalizeConfigSortedContexts = LibSchemaConfigSchema['contexts'];

/**
 * CLI - Commands - Config IO.
 *
 * @since 2.0.0
 */
export type CliCommandsConfigIoSaveConfigConfigPath = string;

export type CliCommandsConfigIoSaveConfigConfig = LibSchemaConfigSchema;

export type CliCommandsConfigIoSaveConfigReturns = void;

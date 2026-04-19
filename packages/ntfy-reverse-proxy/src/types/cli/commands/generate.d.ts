import type {
  LibSchemaConfigSchema,
  LibSchemaContextConfig,
  LibSchemaEmailContextConfig,
  LibSchemaHttpContextConfig,
} from '../../lib/schema.d.ts';

/**
 * CLI - Commands - Generate - Generate Wrangler Toml.
 *
 * @since 2.0.0
 */
export type CliCommandsGenerateGenerateWranglerTomlProjectRoot = string;

export type CliCommandsGenerateGenerateWranglerTomlDefaultPath = string;

export type CliCommandsGenerateGenerateWranglerTomlConfigPath = string;

export type CliCommandsGenerateGenerateWranglerTomlOutputPath = string | undefined;

export type CliCommandsGenerateGenerateWranglerTomlAccountId = string;

export type CliCommandsGenerateGenerateWranglerTomlKvNamespaceId = string;

export type CliCommandsGenerateGenerateWranglerTomlReturn = void;

export type CliCommandsGenerateGenerateWranglerTomlConfig = LibSchemaConfigSchema;

export type CliCommandsGenerateGenerateWranglerTomlSettings = LibSchemaConfigSchema['settings'];

export type CliCommandsGenerateGenerateWranglerTomlServers = LibSchemaConfigSchema['servers'];

export type CliCommandsGenerateGenerateWranglerTomlContexts = LibSchemaContextConfig[];

export type CliCommandsGenerateGenerateWranglerTomlCompatibilityDate = string;

export type CliCommandsGenerateGenerateWranglerTomlHttpContexts = LibSchemaHttpContextConfig[];

export type CliCommandsGenerateGenerateWranglerTomlEmailContexts = LibSchemaEmailContextConfig[];

export type CliCommandsGenerateGenerateWranglerTomlRouteLines = string[];

export type CliCommandsGenerateGenerateWranglerTomlLines = string[];

export type CliCommandsGenerateGenerateWranglerTomlSettingsJson = string;

export type CliCommandsGenerateGenerateWranglerTomlServersJson = string;

export type CliCommandsGenerateGenerateWranglerTomlContextsJson = string;

export type CliCommandsGenerateGenerateWranglerTomlOutputDir = string;

import type {
  Lib_Schema_ConfigSchemaContexts,
  Lib_Schema_ConfigSchemaServers,
  Lib_Schema_ConfigSchemaSettings,
  Lib_Schema_EmailContextConfig,
  Lib_Schema_HttpContextConfig,
} from '../../lib/schema.d.ts';

/**
 * CLI - Commands - Generate.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Generate_ProjectRoot = string;

export type Cli_Commands_Generate_DefaultWranglerTomlPath = string;

/**
 * CLI - Commands - Generate - Generate Wrangler Toml.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Generate_GenerateWranglerToml_ConfigPath = string;

export type Cli_Commands_Generate_GenerateWranglerToml_OutputPath = string | undefined;

export type Cli_Commands_Generate_GenerateWranglerToml_AccountId = string;

export type Cli_Commands_Generate_GenerateWranglerToml_KvNamespaceId = string;

export type Cli_Commands_Generate_GenerateWranglerToml_Returns = void;

export type Cli_Commands_Generate_GenerateWranglerToml_Config_Settings = Lib_Schema_ConfigSchemaSettings;

export type Cli_Commands_Generate_GenerateWranglerToml_Config_Servers = Lib_Schema_ConfigSchemaServers;

export type Cli_Commands_Generate_GenerateWranglerToml_Config_Contexts = Lib_Schema_ConfigSchemaContexts;

export type Cli_Commands_Generate_GenerateWranglerToml_Config = {
  settings: Cli_Commands_Generate_GenerateWranglerToml_Config_Settings;
  servers: Cli_Commands_Generate_GenerateWranglerToml_Config_Servers;
  contexts: Cli_Commands_Generate_GenerateWranglerToml_Config_Contexts;
};

export type Cli_Commands_Generate_GenerateWranglerToml_Settings = Cli_Commands_Generate_GenerateWranglerToml_Config['settings'];

export type Cli_Commands_Generate_GenerateWranglerToml_Servers = Cli_Commands_Generate_GenerateWranglerToml_Config['servers'];

export type Cli_Commands_Generate_GenerateWranglerToml_Contexts = Cli_Commands_Generate_GenerateWranglerToml_Config['contexts'];

export type Cli_Commands_Generate_GenerateWranglerToml_CompatibilityDate = string;

export type Cli_Commands_Generate_GenerateWranglerToml_HttpContexts = Array<Lib_Schema_HttpContextConfig>;

export type Cli_Commands_Generate_GenerateWranglerToml_EmailContexts = Array<Lib_Schema_EmailContextConfig>;

export type Cli_Commands_Generate_GenerateWranglerToml_RouteLines = string[];

export type Cli_Commands_Generate_GenerateWranglerToml_Lines = string[];

export type Cli_Commands_Generate_GenerateWranglerToml_SettingsJson = string;

export type Cli_Commands_Generate_GenerateWranglerToml_ServersJson = string;

export type Cli_Commands_Generate_GenerateWranglerToml_ContextsJson = string;

export type Cli_Commands_Generate_GenerateWranglerToml_OutputDir = string;

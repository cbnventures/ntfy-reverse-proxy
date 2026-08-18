/**
 * Tests - CLI - Commands - Server.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Server_TestConfigPathFragment = string;

export type Tests_Cli_Commands_Server_TestConfigTmpDir = string;

export type Tests_Cli_Commands_Server_TestConfigPath = string;

export type Tests_Cli_Commands_Server_BaseConfigSettingsWorkerName = string;

export type Tests_Cli_Commands_Server_BaseConfigSettingsBaseDomain = string;

export type Tests_Cli_Commands_Server_BaseConfigSettingsShowResponseOutput = boolean;

export type Tests_Cli_Commands_Server_BaseConfigSettings = {
  worker_name: Tests_Cli_Commands_Server_BaseConfigSettingsWorkerName;
  base_domain: Tests_Cli_Commands_Server_BaseConfigSettingsBaseDomain;
  show_response_output: Tests_Cli_Commands_Server_BaseConfigSettingsShowResponseOutput;
};

export type Tests_Cli_Commands_Server_BaseConfigServers = never[];

export type Tests_Cli_Commands_Server_BaseConfigContexts = never[];

export type Tests_Cli_Commands_Server_BaseConfig = {
  settings: Tests_Cli_Commands_Server_BaseConfigSettings;
  servers: Tests_Cli_Commands_Server_BaseConfigServers;
  contexts: Tests_Cli_Commands_Server_BaseConfigContexts;
};

/**
 * Tests - CLI - Commands - Server - Server Commands.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Server_ServerCommands_ConfigJson = string;

/**
 * Tests - CLI - Commands - Server - Server Commands - Adds A Server To Config.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Server_ServerCommands_AddsAServerToConfig_ConfigJson = string;

export type Tests_Cli_Commands_Server_ServerCommands_AddsAServerToConfig_ConfigServerName = string;

export type Tests_Cli_Commands_Server_ServerCommands_AddsAServerToConfig_ConfigServer = {
  name: Tests_Cli_Commands_Server_ServerCommands_AddsAServerToConfig_ConfigServerName;
};

export type Tests_Cli_Commands_Server_ServerCommands_AddsAServerToConfig_ConfigServers = Tests_Cli_Commands_Server_ServerCommands_AddsAServerToConfig_ConfigServer[];

export type Tests_Cli_Commands_Server_ServerCommands_AddsAServerToConfig_Config = {
  servers: Tests_Cli_Commands_Server_ServerCommands_AddsAServerToConfig_ConfigServers;
};

/**
 * Tests - CLI - Commands - Server - Server Commands - Lists Servers.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Server_ServerCommands_ListsServers_Servers = unknown[];

/**
 * Tests - CLI - Commands - Server - Server Commands - Rejects Duplicate Server Names.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Server_ServerCommands_RejectsDuplicateServerNames_DuplicateName = string;

export type Tests_Cli_Commands_Server_ServerCommands_RejectsDuplicateServerNames_DuplicateServer = string;

export type Tests_Cli_Commands_Server_ServerCommands_RejectsDuplicateServerNames_DuplicateToken = string;

export type Tests_Cli_Commands_Server_ServerCommands_RejectsDuplicateServerNames_Duplicate = {
  name: Tests_Cli_Commands_Server_ServerCommands_RejectsDuplicateServerNames_DuplicateName;
  server: Tests_Cli_Commands_Server_ServerCommands_RejectsDuplicateServerNames_DuplicateServer;
  token: Tests_Cli_Commands_Server_ServerCommands_RejectsDuplicateServerNames_DuplicateToken;
};

/**
 * Tests - CLI - Commands - Server - Server Commands - Removes A Server.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Server_ServerCommands_RemovesAServer_ConfigJson = string;

export type Tests_Cli_Commands_Server_ServerCommands_RemovesAServer_ConfigServers = unknown[];

export type Tests_Cli_Commands_Server_ServerCommands_RemovesAServer_Config = {
  servers: Tests_Cli_Commands_Server_ServerCommands_RemovesAServer_ConfigServers;
};

/**
 * Tests - CLI - Commands - Server - Server Commands - Warns When Removing A Server Referenced By Contexts.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Server_ServerCommands_WarnsWhenRemovingAServerReferencedByContexts_ConfigJson = string;

export type Tests_Cli_Commands_Server_ServerCommands_WarnsWhenRemovingAServerReferencedByContexts_ConfigContexts = unknown[];

export type Tests_Cli_Commands_Server_ServerCommands_WarnsWhenRemovingAServerReferencedByContexts_Config = {
  contexts: Tests_Cli_Commands_Server_ServerCommands_WarnsWhenRemovingAServerReferencedByContexts_ConfigContexts;
};

export type Tests_Cli_Commands_Server_ServerCommands_WarnsWhenRemovingAServerReferencedByContexts_UpdatedConfigJson = string;

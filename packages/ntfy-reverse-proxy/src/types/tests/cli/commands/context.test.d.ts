/**
 * Tests - CLI - Commands - Context.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Context_TestConfigPathFragment = string;

export type Tests_Cli_Commands_Context_TestConfigTmpDir = string;

export type Tests_Cli_Commands_Context_TestConfigPath = string;

export type Tests_Cli_Commands_Context_BaseConfigSettingsWorkerName = string;

export type Tests_Cli_Commands_Context_BaseConfigSettingsBaseDomain = string;

export type Tests_Cli_Commands_Context_BaseConfigSettingsShowResponseOutput = boolean;

export type Tests_Cli_Commands_Context_BaseConfigSettings = {
  worker_name: Tests_Cli_Commands_Context_BaseConfigSettingsWorkerName;
  base_domain: Tests_Cli_Commands_Context_BaseConfigSettingsBaseDomain;
  show_response_output: Tests_Cli_Commands_Context_BaseConfigSettingsShowResponseOutput;
};

export type Tests_Cli_Commands_Context_BaseConfigServerName = string;

export type Tests_Cli_Commands_Context_BaseConfigServerUrl = string;

export type Tests_Cli_Commands_Context_BaseConfigServerToken = string;

export type Tests_Cli_Commands_Context_BaseConfigServer = {
  name: Tests_Cli_Commands_Context_BaseConfigServerName;
  server: Tests_Cli_Commands_Context_BaseConfigServerUrl;
  token: Tests_Cli_Commands_Context_BaseConfigServerToken;
};

export type Tests_Cli_Commands_Context_BaseConfigServers = Tests_Cli_Commands_Context_BaseConfigServer[];

export type Tests_Cli_Commands_Context_BaseConfigContexts = never[];

export type Tests_Cli_Commands_Context_BaseConfig = {
  settings: Tests_Cli_Commands_Context_BaseConfigSettings;
  servers: Tests_Cli_Commands_Context_BaseConfigServers;
  contexts: Tests_Cli_Commands_Context_BaseConfigContexts;
};

/**
 * Tests - CLI - Commands - Context.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Context_ContextCommands_ConfigJson = string;

/**
 * Tests - CLI - Commands - Context.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Context_ContextCommands_AddsAContext_ConfigJson = string;

export type Tests_Cli_Commands_Context_ContextCommands_AddsAContext_Config_Contexts = unknown[];

export type Tests_Cli_Commands_Context_ContextCommands_AddsAContext_Config = {
  contexts: Tests_Cli_Commands_Context_ContextCommands_AddsAContext_Config_Contexts;
};

/**
 * Tests - CLI - Commands - Context.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Context_ContextCommands_AutoRegeneratesDuplicateIds_ConfigJson = string;

export type Tests_Cli_Commands_Context_ContextCommands_AutoRegeneratesDuplicateIds_Config_Contexts_Item_Id = string;

export type Tests_Cli_Commands_Context_ContextCommands_AutoRegeneratesDuplicateIds_Config_Contexts_Item = {
  id: Tests_Cli_Commands_Context_ContextCommands_AutoRegeneratesDuplicateIds_Config_Contexts_Item_Id;
};

export type Tests_Cli_Commands_Context_ContextCommands_AutoRegeneratesDuplicateIds_Config_Contexts = Tests_Cli_Commands_Context_ContextCommands_AutoRegeneratesDuplicateIds_Config_Contexts_Item[];

export type Tests_Cli_Commands_Context_ContextCommands_AutoRegeneratesDuplicateIds_Config = {
  contexts: Tests_Cli_Commands_Context_ContextCommands_AutoRegeneratesDuplicateIds_Config_Contexts;
};

/**
 * Tests - CLI - Commands - Context.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Context_ContextCommands_GeneratesRandomIdStrings_Id1 = string;

export type Tests_Cli_Commands_Context_ContextCommands_GeneratesRandomIdStrings_Id2 = string;

/**
 * Tests - CLI - Commands - Context.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Context_ContextCommands_ListsContexts_Contexts = unknown[];

/**
 * Tests - CLI - Commands - Context.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Context_ContextCommands_RejectsContextReferencingNonExistentServer_Config_Contexts = unknown[];

export type Tests_Cli_Commands_Context_ContextCommands_RejectsContextReferencingNonExistentServer_Config = {
  contexts: Tests_Cli_Commands_Context_ContextCommands_RejectsContextReferencingNonExistentServer_Config_Contexts;
};

/**
 * Tests - CLI - Commands - Context.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Context_ContextCommands_RejectsDuplicateContextNames_Config_Contexts = unknown[];

export type Tests_Cli_Commands_Context_ContextCommands_RejectsDuplicateContextNames_Config = {
  contexts: Tests_Cli_Commands_Context_ContextCommands_RejectsDuplicateContextNames_Config_Contexts;
};

/**
 * Tests - CLI - Commands - Context.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Context_ContextCommands_RemovesAContext_Contexts = unknown[];

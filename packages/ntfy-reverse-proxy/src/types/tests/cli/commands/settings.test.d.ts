/**
 * Tests - CLI - Commands - Settings.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Settings_TestConfigPathFragment = string;

export type Tests_Cli_Commands_Settings_TestConfigTmpDir = string;

export type Tests_Cli_Commands_Settings_TestConfigPath = string;

export type Tests_Cli_Commands_Settings_BaseConfigSettingsWorkerName = string;

export type Tests_Cli_Commands_Settings_BaseConfigSettingsBaseDomain = string;

export type Tests_Cli_Commands_Settings_BaseConfigSettingsShowResponseOutput = boolean;

export type Tests_Cli_Commands_Settings_BaseConfigSettings = {
  worker_name: Tests_Cli_Commands_Settings_BaseConfigSettingsWorkerName;
  base_domain: Tests_Cli_Commands_Settings_BaseConfigSettingsBaseDomain;
  show_response_output: Tests_Cli_Commands_Settings_BaseConfigSettingsShowResponseOutput;
};

export type Tests_Cli_Commands_Settings_BaseConfigServers = never[];

export type Tests_Cli_Commands_Settings_BaseConfigContexts = never[];

export type Tests_Cli_Commands_Settings_BaseConfig = {
  settings: Tests_Cli_Commands_Settings_BaseConfigSettings;
  servers: Tests_Cli_Commands_Settings_BaseConfigServers;
  contexts: Tests_Cli_Commands_Settings_BaseConfigContexts;
};

/**
 * Tests - CLI - Commands - Settings - Settings Commands.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Settings_SettingsCommands_ConfigJson = string;

/**
 * Tests - CLI - Commands - Settings - Settings Commands - Reads Current Settings.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Settings_SettingsCommands_ReadsCurrentSettings_SettingsBaseDomain = string;

export type Tests_Cli_Commands_Settings_SettingsCommands_ReadsCurrentSettings_Settings = {
  base_domain: Tests_Cli_Commands_Settings_SettingsCommands_ReadsCurrentSettings_SettingsBaseDomain;
};

/**
 * Tests - CLI - Commands - Settings - Settings Commands - Toggles Show Response Output.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Settings_SettingsCommands_TogglesShowResponseOutput_ConfigJson = string;

export type Tests_Cli_Commands_Settings_SettingsCommands_TogglesShowResponseOutput_ConfigSettingsShowResponseOutput = boolean;

export type Tests_Cli_Commands_Settings_SettingsCommands_TogglesShowResponseOutput_ConfigSettings = {
  show_response_output: Tests_Cli_Commands_Settings_SettingsCommands_TogglesShowResponseOutput_ConfigSettingsShowResponseOutput;
};

export type Tests_Cli_Commands_Settings_SettingsCommands_TogglesShowResponseOutput_Config = {
  settings: Tests_Cli_Commands_Settings_SettingsCommands_TogglesShowResponseOutput_ConfigSettings;
};

/**
 * Tests - CLI - Commands - Settings - Settings Commands - Updates Base Domain.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Settings_SettingsCommands_UpdatesBaseDomain_ConfigJson = string;

export type Tests_Cli_Commands_Settings_SettingsCommands_UpdatesBaseDomain_ConfigSettingsBaseDomain = string;

export type Tests_Cli_Commands_Settings_SettingsCommands_UpdatesBaseDomain_ConfigSettings = {
  base_domain: Tests_Cli_Commands_Settings_SettingsCommands_UpdatesBaseDomain_ConfigSettingsBaseDomain;
};

export type Tests_Cli_Commands_Settings_SettingsCommands_UpdatesBaseDomain_Config = {
  settings: Tests_Cli_Commands_Settings_SettingsCommands_UpdatesBaseDomain_ConfigSettings;
};

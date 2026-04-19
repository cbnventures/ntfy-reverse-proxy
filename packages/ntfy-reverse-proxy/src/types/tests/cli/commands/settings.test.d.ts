/**
 * Tests - CLI - Commands - Settings.
 *
 * @since 2.0.0
 */
export type TestsCliCommandsSettingsTestConfigPath = string;

export type TestsCliCommandsSettingsBaseConfig = {
  settings: TestsCliCommandsSettingsBaseConfigSettings;
  servers: TestsCliCommandsSettingsBaseConfigServers;
  contexts: TestsCliCommandsSettingsBaseConfigContexts;
};

export type TestsCliCommandsSettingsBaseConfigSettings = {
  worker_name: TestsCliCommandsSettingsBaseConfigSettingsWorkerName;
  base_domain: TestsCliCommandsSettingsBaseConfigSettingsBaseDomain;
  show_response_output: TestsCliCommandsSettingsBaseConfigSettingsShowResponseOutput;
};

export type TestsCliCommandsSettingsBaseConfigSettingsWorkerName = string;

export type TestsCliCommandsSettingsBaseConfigSettingsBaseDomain = string;

export type TestsCliCommandsSettingsBaseConfigSettingsShowResponseOutput = boolean;

export type TestsCliCommandsSettingsBaseConfigServers = never[];

export type TestsCliCommandsSettingsBaseConfigContexts = never[];

export type TestsCliCommandsSettingsSettings = {
  worker_name: string;
  base_domain: string;
  show_response_output: boolean;
};

export type TestsCliCommandsSettingsGetSettingsResult = TestsCliCommandsSettingsSettings;

export type TestsCliCommandsSettingsParsedConfig = {
  settings: TestsCliCommandsSettingsSettings;
};

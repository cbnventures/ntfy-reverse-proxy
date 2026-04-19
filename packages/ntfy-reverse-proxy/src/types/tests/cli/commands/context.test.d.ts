/**
 * Tests - CLI - Commands - Context.
 *
 * @since 2.0.0
 */
export type TestsCliCommandsContextTestConfigPath = string;

export type TestsCliCommandsContextBaseConfig = {
  settings: TestsCliCommandsContextBaseConfigSettings;
  servers: TestsCliCommandsContextBaseConfigServers;
  contexts: TestsCliCommandsContextBaseConfigContexts;
};

export type TestsCliCommandsContextBaseConfigSettings = {
  worker_name: TestsCliCommandsContextBaseConfigSettingsWorkerName;
  base_domain: TestsCliCommandsContextBaseConfigSettingsBaseDomain;
  show_response_output: TestsCliCommandsContextBaseConfigSettingsShowResponseOutput;
};

export type TestsCliCommandsContextBaseConfigSettingsWorkerName = string;

export type TestsCliCommandsContextBaseConfigSettingsBaseDomain = string;

export type TestsCliCommandsContextBaseConfigSettingsShowResponseOutput = boolean;

export type TestsCliCommandsContextBaseConfigServers = TestsCliCommandsContextBaseConfigServer[];

export type TestsCliCommandsContextBaseConfigServer = {
  name: TestsCliCommandsContextBaseConfigServerName;
  server: TestsCliCommandsContextBaseConfigServerUrl;
  token: TestsCliCommandsContextBaseConfigServerToken;
};

export type TestsCliCommandsContextBaseConfigServerName = string;

export type TestsCliCommandsContextBaseConfigServerUrl = string;

export type TestsCliCommandsContextBaseConfigServerToken = string;

export type TestsCliCommandsContextBaseConfigContexts = never[];

export type TestsCliCommandsContextConfigJson = string;

export type TestsCliCommandsContextParsedConfig = {
  contexts: TestsCliCommandsContextParsedConfigContexts;
};

export type TestsCliCommandsContextParsedConfigContexts = TestsCliCommandsContextParsedConfigContext[];

export type TestsCliCommandsContextParsedConfigContext = {
  id: string;
  name: string;
};

export type TestsCliCommandsContextContextList = unknown[];

export type TestsCliCommandsContextGeneratedId = string;

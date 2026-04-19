/**
 * Tests - CLI - Commands - Server.
 *
 * @since 2.0.0
 */
export type TestsCliCommandsServerTestConfigPath = string;

export type TestsCliCommandsServerBaseConfig = {
  settings: TestsCliCommandsServerBaseConfigSettings;
  servers: TestsCliCommandsServerBaseConfigServers;
  contexts: TestsCliCommandsServerBaseConfigContexts;
};

export type TestsCliCommandsServerBaseConfigSettings = {
  worker_name: TestsCliCommandsServerBaseConfigSettingsWorkerName;
  base_domain: TestsCliCommandsServerBaseConfigSettingsBaseDomain;
  show_response_output: TestsCliCommandsServerBaseConfigSettingsShowResponseOutput;
};

export type TestsCliCommandsServerBaseConfigSettingsWorkerName = string;

export type TestsCliCommandsServerBaseConfigSettingsBaseDomain = string;

export type TestsCliCommandsServerBaseConfigSettingsShowResponseOutput = boolean;

export type TestsCliCommandsServerBaseConfigServers = never[];

export type TestsCliCommandsServerBaseConfigContexts = never[];

export type TestsCliCommandsServerParsedConfig = {
  servers: TestsCliCommandsServerParsedConfigServers;
  contexts: TestsCliCommandsServerParsedConfigContexts;
};

export type TestsCliCommandsServerParsedConfigServers = TestsCliCommandsServerParsedConfigServer[];

export type TestsCliCommandsServerParsedConfigServer = {
  name: string;
};

export type TestsCliCommandsServerParsedConfigContexts = TestsCliCommandsServerParsedConfigContextsList;

export type TestsCliCommandsServerParsedConfigContextsList = unknown[];

export type TestsCliCommandsServerServerList = unknown[];

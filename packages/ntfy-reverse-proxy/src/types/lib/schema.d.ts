/**
 * Lib - Schema.
 *
 * @since 2.0.0
 */
export type Lib_Schema_ContextConfigName = string;

export type Lib_Schema_ContextConfigType = 'http' | 'email';

export type Lib_Schema_ContextConfigId = string;

export type Lib_Schema_ContextConfigInterpreter = 'plain-text' | 'ntfy-json' | 'seerr' | 'synology' | 'statuspage' | 'pfsense' | 'unifi';

export type Lib_Schema_ContextConfigTopic = string;

export type Lib_Schema_ContextConfigErrorTopic = string | undefined;

export type Lib_Schema_ContextConfigErrorEvent = 'authentication' | 'interpretation';

export type Lib_Schema_ContextConfigMode = 'send-once' | 'send-all';

export type Lib_Schema_ContextConfigShowVisitorInfo = boolean;

export type Lib_Schema_ContextConfigPrimaryServer = string;

export type Lib_Schema_ContextConfigServers = string[];

export type Lib_Schema_EmailContextConfigName = string;

export type Lib_Schema_EmailContextConfigType = 'email';

export type Lib_Schema_EmailContextConfigId = string;

export type Lib_Schema_EmailContextConfigInterpreter = Lib_Schema_ContextConfigInterpreter;

export type Lib_Schema_EmailContextConfigTopic = string;

export type Lib_Schema_EmailContextConfigErrorTopic = string | undefined;

export type Lib_Schema_EmailContextConfigErrorEvents = Lib_Schema_ContextConfigErrorEvent[] | undefined;

export type Lib_Schema_EmailContextConfigMode = 'send-once' | 'send-all';

export type Lib_Schema_EmailContextConfigShowVisitorInfo = boolean;

export type Lib_Schema_EmailContextConfigPrimaryServer = string;

export type Lib_Schema_EmailContextConfigServers = string[];

export type Lib_Schema_EmailContextConfigAllowedFrom = string | undefined;

export type Lib_Schema_EmailContextConfig = {
  name: Lib_Schema_EmailContextConfigName;
  type: Lib_Schema_EmailContextConfigType;
  id: Lib_Schema_EmailContextConfigId;
  interpreter: Lib_Schema_EmailContextConfigInterpreter;
  topic: Lib_Schema_EmailContextConfigTopic;
  error_topic?: Lib_Schema_EmailContextConfigErrorTopic | undefined;
  error_events?: Lib_Schema_EmailContextConfigErrorEvents | undefined;
  mode: Lib_Schema_EmailContextConfigMode;
  show_visitor_info: Lib_Schema_EmailContextConfigShowVisitorInfo;
  primary_server: Lib_Schema_EmailContextConfigPrimaryServer;
  servers: Lib_Schema_EmailContextConfigServers;
  allowed_from?: Lib_Schema_EmailContextConfigAllowedFrom | undefined;
};

export type Lib_Schema_HttpContextConfigName = string;

export type Lib_Schema_HttpContextConfigType = 'http';

export type Lib_Schema_HttpContextConfigId = string;

export type Lib_Schema_HttpContextConfigInterpreter = Lib_Schema_ContextConfigInterpreter;

export type Lib_Schema_HttpContextConfigTopic = string;

export type Lib_Schema_HttpContextConfigErrorTopic = string | undefined;

export type Lib_Schema_HttpContextConfigErrorEvents = Lib_Schema_ContextConfigErrorEvent[] | undefined;

export type Lib_Schema_HttpContextConfigMode = 'send-once' | 'send-all';

export type Lib_Schema_HttpContextConfigShowVisitorInfo = boolean;

export type Lib_Schema_HttpContextConfigPrimaryServer = string;

export type Lib_Schema_HttpContextConfigServers = string[];

export type Lib_Schema_HttpContextConfigToken = string | undefined;

export type Lib_Schema_HttpContextConfig = {
  name: Lib_Schema_HttpContextConfigName;
  type: Lib_Schema_HttpContextConfigType;
  id: Lib_Schema_HttpContextConfigId;
  interpreter: Lib_Schema_HttpContextConfigInterpreter;
  topic: Lib_Schema_HttpContextConfigTopic;
  error_topic?: Lib_Schema_HttpContextConfigErrorTopic | undefined;
  error_events?: Lib_Schema_HttpContextConfigErrorEvents | undefined;
  mode: Lib_Schema_HttpContextConfigMode;
  show_visitor_info: Lib_Schema_HttpContextConfigShowVisitorInfo;
  primary_server: Lib_Schema_HttpContextConfigPrimaryServer;
  servers: Lib_Schema_HttpContextConfigServers;
  token?: Lib_Schema_HttpContextConfigToken | undefined;
};

export type Lib_Schema_ContextConfig = Lib_Schema_HttpContextConfig | Lib_Schema_EmailContextConfig;

export type Lib_Schema_ServerConfigName = string;

export type Lib_Schema_ServerConfigServer = string;

export type Lib_Schema_ServerConfigToken = string;

export type Lib_Schema_ServerConfig = {
  name: Lib_Schema_ServerConfigName;
  server: Lib_Schema_ServerConfigServer;
  token: Lib_Schema_ServerConfigToken;
};

export type Lib_Schema_SettingsConfigWorkerName = string;

export type Lib_Schema_SettingsConfigBaseDomain = string;

export type Lib_Schema_SettingsConfigShowResponseOutput = boolean;

export type Lib_Schema_SettingsConfig = {
  worker_name: Lib_Schema_SettingsConfigWorkerName;
  base_domain: Lib_Schema_SettingsConfigBaseDomain;
  show_response_output: Lib_Schema_SettingsConfigShowResponseOutput;
};

export type Lib_Schema_ConfigSchemaSettings = Lib_Schema_SettingsConfig;

export type Lib_Schema_ConfigSchemaServers = Lib_Schema_ServerConfig[];

export type Lib_Schema_ConfigSchemaContexts = Lib_Schema_ContextConfig[];

export type Lib_Schema_ConfigSchema = {
  settings: Lib_Schema_ConfigSchemaSettings;
  servers: Lib_Schema_ConfigSchemaServers;
  contexts: Lib_Schema_ConfigSchemaContexts;
};

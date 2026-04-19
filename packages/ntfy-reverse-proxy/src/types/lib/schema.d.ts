/**
 * Lib - Schema.
 *
 * @since 2.0.0
 */
export type LibSchemaConfigSchemaSettings = LibSchemaSettingsConfig;

export type LibSchemaConfigSchemaServers = LibSchemaServerConfig[];

export type LibSchemaConfigSchemaContexts = LibSchemaContextConfig[];

export type LibSchemaConfigSchema = {
  settings: LibSchemaConfigSchemaSettings;
  servers: LibSchemaConfigSchemaServers;
  contexts: LibSchemaConfigSchemaContexts;
};

export type LibSchemaContextConfigName = string;

export type LibSchemaContextConfigType = 'http' | 'email';

export type LibSchemaContextConfigId = string;

export type LibSchemaContextConfigInterpreter = 'plain-text' | 'ntfy-json' | 'seerr' | 'synology' | 'statuspage' | 'pfsense' | 'unifi';

export type LibSchemaContextConfigTopic = string;

export type LibSchemaContextConfigErrorTopic = string | undefined;

export type LibSchemaContextConfigMode = 'send-once' | 'send-all';

export type LibSchemaContextConfigShowVisitorInfo = boolean;

export type LibSchemaContextConfigPrimaryServer = string;

export type LibSchemaContextConfigServers = string[];

export type LibSchemaEmailContextConfigName = string;

export type LibSchemaEmailContextConfigType = 'email';

export type LibSchemaEmailContextConfigId = string;

export type LibSchemaEmailContextConfigInterpreter = LibSchemaContextConfigInterpreter;

export type LibSchemaEmailContextConfigTopic = string;

export type LibSchemaEmailContextConfigErrorTopic = string | undefined;

export type LibSchemaEmailContextConfigMode = 'send-once' | 'send-all';

export type LibSchemaEmailContextConfigShowVisitorInfo = boolean;

export type LibSchemaEmailContextConfigPrimaryServer = string;

export type LibSchemaEmailContextConfigServers = string[];

export type LibSchemaEmailContextConfigAllowedFrom = string | undefined;

export type LibSchemaEmailContextConfig = {
  name: LibSchemaEmailContextConfigName;
  type: LibSchemaEmailContextConfigType;
  id: LibSchemaEmailContextConfigId;
  interpreter: LibSchemaEmailContextConfigInterpreter;
  topic: LibSchemaEmailContextConfigTopic;
  error_topic?: LibSchemaEmailContextConfigErrorTopic | undefined;
  mode: LibSchemaEmailContextConfigMode;
  show_visitor_info: LibSchemaEmailContextConfigShowVisitorInfo;
  primary_server: LibSchemaEmailContextConfigPrimaryServer;
  servers: LibSchemaEmailContextConfigServers;
  allowed_from?: LibSchemaEmailContextConfigAllowedFrom | undefined;
};

export type LibSchemaHttpContextConfigName = string;

export type LibSchemaHttpContextConfigType = 'http';

export type LibSchemaHttpContextConfigId = string;

export type LibSchemaHttpContextConfigInterpreter = LibSchemaContextConfigInterpreter;

export type LibSchemaHttpContextConfigTopic = string;

export type LibSchemaHttpContextConfigErrorTopic = string | undefined;

export type LibSchemaHttpContextConfigMode = 'send-once' | 'send-all';

export type LibSchemaHttpContextConfigShowVisitorInfo = boolean;

export type LibSchemaHttpContextConfigPrimaryServer = string;

export type LibSchemaHttpContextConfigServers = string[];

export type LibSchemaHttpContextConfigToken = string | undefined;

export type LibSchemaHttpContextConfig = {
  name: LibSchemaHttpContextConfigName;
  type: LibSchemaHttpContextConfigType;
  id: LibSchemaHttpContextConfigId;
  interpreter: LibSchemaHttpContextConfigInterpreter;
  topic: LibSchemaHttpContextConfigTopic;
  error_topic?: LibSchemaHttpContextConfigErrorTopic | undefined;
  mode: LibSchemaHttpContextConfigMode;
  show_visitor_info: LibSchemaHttpContextConfigShowVisitorInfo;
  primary_server: LibSchemaHttpContextConfigPrimaryServer;
  servers: LibSchemaHttpContextConfigServers;
  token?: LibSchemaHttpContextConfigToken | undefined;
};

export type LibSchemaContextConfig = LibSchemaHttpContextConfig | LibSchemaEmailContextConfig;

export type LibSchemaServerConfigName = string;

export type LibSchemaServerConfigServer = string;

export type LibSchemaServerConfigToken = string;

export type LibSchemaServerConfig = {
  name: LibSchemaServerConfigName;
  server: LibSchemaServerConfigServer;
  token: LibSchemaServerConfigToken;
};

export type LibSchemaSettingsConfigWorkerName = string;

export type LibSchemaSettingsConfigBaseDomain = string;

export type LibSchemaSettingsConfigShowResponseOutput = boolean;

export type LibSchemaSettingsConfig = {
  worker_name: LibSchemaSettingsConfigWorkerName;
  base_domain: LibSchemaSettingsConfigBaseDomain;
  show_response_output: LibSchemaSettingsConfigShowResponseOutput;
};

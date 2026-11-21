/**
 * Lib - Schema.
 *
 * @since 2.0.0
 */
export type Lib_Schema_ContextConfigName = string;

export type Lib_Schema_ContextConfigType = 'http' | 'email';

export type Lib_Schema_ContextConfigId = string;

export type Lib_Schema_ContextConfigInterpreter = 'plain-text' | 'ntfy-json' | 'seerr' | 'synology' | 'statuspage' | 'pfsense' | 'unifi' | 'transmission-vpn' | 'pfsense-actions' | 'discord-stonker-bot' | 'outpost' | 'mailmask';

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
  error_topic?: Lib_Schema_EmailContextConfigErrorTopic;
  error_events?: Lib_Schema_EmailContextConfigErrorEvents;
  mode: Lib_Schema_EmailContextConfigMode;
  show_visitor_info: Lib_Schema_EmailContextConfigShowVisitorInfo;
  primary_server: Lib_Schema_EmailContextConfigPrimaryServer;
  servers: Lib_Schema_EmailContextConfigServers;
  allowed_from?: Lib_Schema_EmailContextConfigAllowedFrom;
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

export type Lib_Schema_HttpContextConfigSession = Lib_Schema_SessionConfig | undefined;

export type Lib_Schema_HttpContextConfig = {
  name: Lib_Schema_HttpContextConfigName;
  type: Lib_Schema_HttpContextConfigType;
  id: Lib_Schema_HttpContextConfigId;
  interpreter: Lib_Schema_HttpContextConfigInterpreter;
  topic: Lib_Schema_HttpContextConfigTopic;
  error_topic?: Lib_Schema_HttpContextConfigErrorTopic;
  error_events?: Lib_Schema_HttpContextConfigErrorEvents;
  mode: Lib_Schema_HttpContextConfigMode;
  show_visitor_info: Lib_Schema_HttpContextConfigShowVisitorInfo;
  primary_server: Lib_Schema_HttpContextConfigPrimaryServer;
  servers: Lib_Schema_HttpContextConfigServers;
  token?: Lib_Schema_HttpContextConfigToken;
  session?: Lib_Schema_HttpContextConfigSession;
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

export type Lib_Schema_SessionConfigSecret = string;

export type Lib_Schema_SessionConfigTtlSeconds = number | undefined;

export type Lib_Schema_SessionConfigMaxPerHour = number | undefined;

export type Lib_Schema_SessionConfig = {
  secret: Lib_Schema_SessionConfigSecret;
  ttl_seconds?: Lib_Schema_SessionConfigTtlSeconds;
  max_per_hour?: Lib_Schema_SessionConfigMaxPerHour;
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

export type Lib_Schema_CloudflareEnvelopeErrorCode = number;

export type Lib_Schema_CloudflareEnvelopeErrorMessage = string;

export type Lib_Schema_CloudflareEnvelopeError = {
  code: Lib_Schema_CloudflareEnvelopeErrorCode;
  message: Lib_Schema_CloudflareEnvelopeErrorMessage;
};

export type Lib_Schema_CloudflareEnvelopeSuccess = boolean;

export type Lib_Schema_CloudflareEnvelopeErrors = Lib_Schema_CloudflareEnvelopeError[] | null | undefined;

export type Lib_Schema_CloudflareEnvelopeResult = unknown;

export type Lib_Schema_CloudflareEnvelopeResultInfoCursor = string | undefined;

export type Lib_Schema_CloudflareEnvelopeResultInfo = {
  cursor?: Lib_Schema_CloudflareEnvelopeResultInfoCursor;
};

export type Lib_Schema_CloudflareEnvelopeResultInfoOrNull = Lib_Schema_CloudflareEnvelopeResultInfo | null | undefined;

export type Lib_Schema_CloudflareEnvelope = {
  success: Lib_Schema_CloudflareEnvelopeSuccess;
  errors?: Lib_Schema_CloudflareEnvelopeErrors;
  result: Lib_Schema_CloudflareEnvelopeResult;
  result_info?: Lib_Schema_CloudflareEnvelopeResultInfoOrNull;
};

export type Lib_Schema_CloudflareZoneId = string;

export type Lib_Schema_CloudflareZoneName = string;

export type Lib_Schema_CloudflareZoneAccountId = string;

export type Lib_Schema_CloudflareZoneAccount = {
  id: Lib_Schema_CloudflareZoneAccountId;
};

export type Lib_Schema_CloudflareZone = {
  id: Lib_Schema_CloudflareZoneId;
  name: Lib_Schema_CloudflareZoneName;
  account: Lib_Schema_CloudflareZoneAccount;
};

export type Lib_Schema_CloudflareZones = Lib_Schema_CloudflareZone[];

export type Lib_Schema_CloudflareKvNamespaceListItemId = string;

export type Lib_Schema_CloudflareKvNamespaceListItemTitle = string;

export type Lib_Schema_CloudflareKvNamespaceListItem = {
  id: Lib_Schema_CloudflareKvNamespaceListItemId;
  title: Lib_Schema_CloudflareKvNamespaceListItemTitle;
};

export type Lib_Schema_CloudflareKvNamespaceId = string;

export type Lib_Schema_CloudflareKvNamespaces = Lib_Schema_CloudflareKvNamespaceListItem[];

export type Lib_Schema_CloudflareKvNamespace = {
  id: Lib_Schema_CloudflareKvNamespaceId;
};

export type Lib_Schema_CloudflareEmailRoutingRuleTag = string;

export type Lib_Schema_CloudflareEmailRoutingRuleMatcherType = string;

export type Lib_Schema_CloudflareEmailRoutingRuleMatcherField = string | undefined;

export type Lib_Schema_CloudflareEmailRoutingRuleMatcherValue = string | undefined;

export type Lib_Schema_CloudflareEmailRoutingRuleMatcher = {
  type: Lib_Schema_CloudflareEmailRoutingRuleMatcherType;
  field?: Lib_Schema_CloudflareEmailRoutingRuleMatcherField;
  value?: Lib_Schema_CloudflareEmailRoutingRuleMatcherValue;
};

export type Lib_Schema_CloudflareEmailRoutingRuleMatchers = Lib_Schema_CloudflareEmailRoutingRuleMatcher[];

export type Lib_Schema_CloudflareEmailRoutingRuleActionType = string;

export type Lib_Schema_CloudflareEmailRoutingRuleActionValue = string[] | undefined;

export type Lib_Schema_CloudflareEmailRoutingRuleAction = {
  type: Lib_Schema_CloudflareEmailRoutingRuleActionType;
  value?: Lib_Schema_CloudflareEmailRoutingRuleActionValue;
};

export type Lib_Schema_CloudflareEmailRoutingRuleActions = Lib_Schema_CloudflareEmailRoutingRuleAction[];

export type Lib_Schema_CloudflareEmailRoutingRule = {
  tag: Lib_Schema_CloudflareEmailRoutingRuleTag;
  matchers: Lib_Schema_CloudflareEmailRoutingRuleMatchers;
  actions: Lib_Schema_CloudflareEmailRoutingRuleActions;
};

export type Lib_Schema_CloudflareEmailRoutingRules = Lib_Schema_CloudflareEmailRoutingRule[];

export type Lib_Schema_CloudflareWorkerDomainHostname = string;

export type Lib_Schema_CloudflareWorkerDomainService = string;

export type Lib_Schema_CloudflareWorkerDomain = {
  hostname: Lib_Schema_CloudflareWorkerDomainHostname;
  service: Lib_Schema_CloudflareWorkerDomainService;
};

export type Lib_Schema_CloudflareWorkerDomains = Lib_Schema_CloudflareWorkerDomain[];

export type Lib_Schema_DnsOverHttpsAnswerStatus = number;

export type Lib_Schema_DnsOverHttpsAnswerRecordType = number;

export type Lib_Schema_DnsOverHttpsAnswerRecordData = string;

export type Lib_Schema_DnsOverHttpsAnswerRecord = {
  type: Lib_Schema_DnsOverHttpsAnswerRecordType;
  data: Lib_Schema_DnsOverHttpsAnswerRecordData;
};

export type Lib_Schema_DnsOverHttpsAnswerRecords = Lib_Schema_DnsOverHttpsAnswerRecord[] | undefined;

export type Lib_Schema_DnsOverHttpsAnswer = {
  Status: Lib_Schema_DnsOverHttpsAnswerStatus;
  Answer?: Lib_Schema_DnsOverHttpsAnswerRecords;
};

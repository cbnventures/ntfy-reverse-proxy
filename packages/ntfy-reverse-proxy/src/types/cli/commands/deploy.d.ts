import type { SpawnSyncReturns } from 'node:child_process';

import type {
  Lib_Schema_ContextConfig,
  Lib_Schema_ServerConfig,
  Lib_Schema_SettingsConfigBaseDomain,
  Lib_Schema_SettingsConfigShowResponseOutput,
  Lib_Schema_SettingsConfigWorkerName,
} from '../../lib/schema.d.ts';

/**
 * CLI - Commands - Deploy - Create Email Routing Rule.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_CreateEmailRoutingRule_Token = string;

export type Cli_Commands_Deploy_CreateEmailRoutingRule_ZoneId = string;

export type Cli_Commands_Deploy_CreateEmailRoutingRule_Email = string;

export type Cli_Commands_Deploy_CreateEmailRoutingRule_ContextId = string;

export type Cli_Commands_Deploy_CreateEmailRoutingRule_WorkerName = string;

export type Cli_Commands_Deploy_CreateEmailRoutingRule_Returns = Promise<void>;

export type Cli_Commands_Deploy_CreateEmailRoutingRule_Response = Response;

export type Cli_Commands_Deploy_CreateEmailRoutingRule_CreateDataSuccess = boolean;

export type Cli_Commands_Deploy_CreateEmailRoutingRule_CreateDataErrorCode = number;

export type Cli_Commands_Deploy_CreateEmailRoutingRule_CreateDataErrorMessage = string;

export type Cli_Commands_Deploy_CreateEmailRoutingRule_CreateDataError = {
  code: Cli_Commands_Deploy_CreateEmailRoutingRule_CreateDataErrorCode;
  message: Cli_Commands_Deploy_CreateEmailRoutingRule_CreateDataErrorMessage;
};

export type Cli_Commands_Deploy_CreateEmailRoutingRule_CreateDataErrorsList = Cli_Commands_Deploy_CreateEmailRoutingRule_CreateDataError[] | undefined;

export type Cli_Commands_Deploy_CreateEmailRoutingRule_CreateData = {
  success: Cli_Commands_Deploy_CreateEmailRoutingRule_CreateDataSuccess;
  errors: Cli_Commands_Deploy_CreateEmailRoutingRule_CreateDataErrorsList;
};

export type Cli_Commands_Deploy_CreateEmailRoutingRule_CreateErrors = Cli_Commands_Deploy_CreateEmailRoutingRule_CreateDataErrorsList;

export type Cli_Commands_Deploy_CreateEmailRoutingRule_ErrorDetails = string;

/**
 * CLI - Commands - Deploy - Delete Email Routing Rule.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_DeleteEmailRoutingRule_Token = string;

export type Cli_Commands_Deploy_DeleteEmailRoutingRule_ZoneId = string;

export type Cli_Commands_Deploy_DeleteEmailRoutingRule_RuleId = string;

export type Cli_Commands_Deploy_DeleteEmailRoutingRule_Returns = Promise<void>;

export type Cli_Commands_Deploy_DeleteEmailRoutingRule_Response = Response;

export type Cli_Commands_Deploy_DeleteEmailRoutingRule_DeleteDataSuccess = boolean;

export type Cli_Commands_Deploy_DeleteEmailRoutingRule_DeleteDataErrorCode = number;

export type Cli_Commands_Deploy_DeleteEmailRoutingRule_DeleteDataErrorMessage = string;

export type Cli_Commands_Deploy_DeleteEmailRoutingRule_DeleteDataError = {
  code: Cli_Commands_Deploy_DeleteEmailRoutingRule_DeleteDataErrorCode;
  message: Cli_Commands_Deploy_DeleteEmailRoutingRule_DeleteDataErrorMessage;
};

export type Cli_Commands_Deploy_DeleteEmailRoutingRule_DeleteDataErrorsList = Cli_Commands_Deploy_DeleteEmailRoutingRule_DeleteDataError[] | undefined;

export type Cli_Commands_Deploy_DeleteEmailRoutingRule_DeleteData = {
  success: Cli_Commands_Deploy_DeleteEmailRoutingRule_DeleteDataSuccess;
  errors: Cli_Commands_Deploy_DeleteEmailRoutingRule_DeleteDataErrorsList;
};

export type Cli_Commands_Deploy_DeleteEmailRoutingRule_DeleteErrors = Cli_Commands_Deploy_DeleteEmailRoutingRule_DeleteDataErrorsList;

export type Cli_Commands_Deploy_DeleteEmailRoutingRule_ErrorDetails = string;

/**
 * CLI - Commands - Deploy - Deploy.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_Deploy_ConfigPath = string;

export type Cli_Commands_Deploy_Deploy_Interactive = boolean;

export type Cli_Commands_Deploy_Deploy_Returns = Promise<void>;

export type Cli_Commands_Deploy_Deploy_Token = string;

export type Cli_Commands_Deploy_Deploy_ResultValid = boolean;

export type Cli_Commands_Deploy_Deploy_ResultErrors = string[];

export type Cli_Commands_Deploy_Deploy_Result = {
  valid: Cli_Commands_Deploy_Deploy_ResultValid;
  errors: Cli_Commands_Deploy_Deploy_ResultErrors;
};

export type Cli_Commands_Deploy_Deploy_Servers = Array<Lib_Schema_ServerConfig>;

export type Cli_Commands_Deploy_Deploy_Settings_WorkerName = Lib_Schema_SettingsConfigWorkerName;

export type Cli_Commands_Deploy_Deploy_Settings_BaseDomain = Lib_Schema_SettingsConfigBaseDomain;

export type Cli_Commands_Deploy_Deploy_Settings_ShowResponseOutput = Lib_Schema_SettingsConfigShowResponseOutput;

export type Cli_Commands_Deploy_Deploy_Settings = {
  worker_name: Cli_Commands_Deploy_Deploy_Settings_WorkerName;
  base_domain: Cli_Commands_Deploy_Deploy_Settings_BaseDomain;
  show_response_output: Cli_Commands_Deploy_Deploy_Settings_ShowResponseOutput;
};

export type Cli_Commands_Deploy_Deploy_WorkerName = string;

export type Cli_Commands_Deploy_Deploy_Contexts = Array<Lib_Schema_ContextConfig>;

export type Cli_Commands_Deploy_Deploy_HasEmailContexts = boolean;

export type Cli_Commands_Deploy_Deploy_AccountId = string;

export type Cli_Commands_Deploy_Deploy_KvNamespaceId = string;

export type Cli_Commands_Deploy_Deploy_ProjectRoot = string;

export type Cli_Commands_Deploy_Deploy_WranglerTomlPath = string;

/**
 * CLI - Commands - Deploy - Deploy Worker.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_DeployWorker_Returns = void;

export type Cli_Commands_Deploy_DeployWorker_ProjectRoot = string;

export type Cli_Commands_Deploy_DeployWorker_WranglerTomlPath = string;

export type Cli_Commands_Deploy_DeployWorker_DeployResult = SpawnSyncReturns<string>;

/**
 * CLI - Commands - Deploy - Ensure Kv Namespace.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_EnsureKvNamespace_Returns = Promise<string>;

export type Cli_Commands_Deploy_EnsureKvNamespace_Token = string;

export type Cli_Commands_Deploy_EnsureKvNamespace_AccountId = string;

export type Cli_Commands_Deploy_EnsureKvNamespace_WorkerName = string;

export type Cli_Commands_Deploy_EnsureKvNamespace_AllNamespacesId = string;

export type Cli_Commands_Deploy_EnsureKvNamespace_AllNamespacesTitle = string;

export type Cli_Commands_Deploy_EnsureKvNamespace_AllNamespaces = {
  id: Cli_Commands_Deploy_EnsureKvNamespace_AllNamespacesId;
  title: Cli_Commands_Deploy_EnsureKvNamespace_AllNamespacesTitle;
}[];

export type Cli_Commands_Deploy_EnsureKvNamespace_Page = number;

export type Cli_Commands_Deploy_EnsureKvNamespace_Cursor = string | undefined;

export type Cli_Commands_Deploy_EnsureKvNamespace_HasMore = boolean;

export type Cli_Commands_Deploy_EnsureKvNamespace_PaginationUrl = string;

export type Cli_Commands_Deploy_EnsureKvNamespace_ListResponse = Response;

export type Cli_Commands_Deploy_EnsureKvNamespace_ListDataSuccess = boolean;

export type Cli_Commands_Deploy_EnsureKvNamespace_ListDataResultId = string;

export type Cli_Commands_Deploy_EnsureKvNamespace_ListDataResultTitle = string;

export type Cli_Commands_Deploy_EnsureKvNamespace_ListDataResult = {
  id: Cli_Commands_Deploy_EnsureKvNamespace_ListDataResultId;
  title: Cli_Commands_Deploy_EnsureKvNamespace_ListDataResultTitle;
};

export type Cli_Commands_Deploy_EnsureKvNamespace_ListDataErrorCode = number;

export type Cli_Commands_Deploy_EnsureKvNamespace_ListDataErrorMessage = string;

export type Cli_Commands_Deploy_EnsureKvNamespace_ListDataError = {
  code: Cli_Commands_Deploy_EnsureKvNamespace_ListDataErrorCode;
  message: Cli_Commands_Deploy_EnsureKvNamespace_ListDataErrorMessage;
};

export type Cli_Commands_Deploy_EnsureKvNamespace_ListDataResults = Cli_Commands_Deploy_EnsureKvNamespace_ListDataResult[];

export type Cli_Commands_Deploy_EnsureKvNamespace_ListDataErrorsList = Cli_Commands_Deploy_EnsureKvNamespace_ListDataError[] | undefined;

export type Cli_Commands_Deploy_EnsureKvNamespace_ListDataResultInfoCursor = string | undefined;

export type Cli_Commands_Deploy_EnsureKvNamespace_ListDataResultInfo = {
  cursor: Cli_Commands_Deploy_EnsureKvNamespace_ListDataResultInfoCursor;
} | undefined;

export type Cli_Commands_Deploy_EnsureKvNamespace_ListData = {
  success: Cli_Commands_Deploy_EnsureKvNamespace_ListDataSuccess;
  result: Cli_Commands_Deploy_EnsureKvNamespace_ListDataResults;
  errors: Cli_Commands_Deploy_EnsureKvNamespace_ListDataErrorsList;
  result_info: Cli_Commands_Deploy_EnsureKvNamespace_ListDataResultInfo;
};

export type Cli_Commands_Deploy_EnsureKvNamespace_ListErrors = Cli_Commands_Deploy_EnsureKvNamespace_ListDataErrorsList;

export type Cli_Commands_Deploy_EnsureKvNamespace_ListErrorDetails = string;

export type Cli_Commands_Deploy_EnsureKvNamespace_ResultInfoCursor = string | undefined;

export type Cli_Commands_Deploy_EnsureKvNamespace_KvTitle = string;

export type Cli_Commands_Deploy_EnsureKvNamespace_Existing = Cli_Commands_Deploy_EnsureKvNamespace_ListDataResult | undefined;

export type Cli_Commands_Deploy_EnsureKvNamespace_CreateResponse = Response;

export type Cli_Commands_Deploy_EnsureKvNamespace_CreateDataSuccess = boolean;

export type Cli_Commands_Deploy_EnsureKvNamespace_CreateDataResultId = string;

export type Cli_Commands_Deploy_EnsureKvNamespace_CreateDataResult = {
  id: Cli_Commands_Deploy_EnsureKvNamespace_CreateDataResultId;
};

export type Cli_Commands_Deploy_EnsureKvNamespace_CreateDataErrorsList = Cli_Commands_Deploy_EnsureKvNamespace_ListDataError[] | undefined;

export type Cli_Commands_Deploy_EnsureKvNamespace_CreateData = {
  success: Cli_Commands_Deploy_EnsureKvNamespace_CreateDataSuccess;
  result: Cli_Commands_Deploy_EnsureKvNamespace_CreateDataResult;
  errors: Cli_Commands_Deploy_EnsureKvNamespace_CreateDataErrorsList;
};

export type Cli_Commands_Deploy_EnsureKvNamespace_CreateErrors = Cli_Commands_Deploy_EnsureKvNamespace_CreateDataErrorsList;

export type Cli_Commands_Deploy_EnsureKvNamespace_CreateErrorDetails = string;

/**
 * CLI - Commands - Deploy - Get Zone Info.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_GetZoneInfo_Token = string;

export type Cli_Commands_Deploy_GetZoneInfo_BaseDomain = string;

export type Cli_Commands_Deploy_GetZoneInfo_ResultZoneId = string;

export type Cli_Commands_Deploy_GetZoneInfo_ResultAccountId = string;

export type Cli_Commands_Deploy_GetZoneInfo_ResultZoneName = string;

export type Cli_Commands_Deploy_GetZoneInfo_Result = {
  zoneId: Cli_Commands_Deploy_GetZoneInfo_ResultZoneId;
  accountId: Cli_Commands_Deploy_GetZoneInfo_ResultAccountId;
  zoneName: Cli_Commands_Deploy_GetZoneInfo_ResultZoneName;
};

export type Cli_Commands_Deploy_GetZoneInfo_Returns = Promise<Cli_Commands_Deploy_GetZoneInfo_Result>;

export type Cli_Commands_Deploy_GetZoneInfo_Parts = string[];

export type Cli_Commands_Deploy_GetZoneInfo_Candidate = string;

export type Cli_Commands_Deploy_GetZoneInfo_Candidates = Cli_Commands_Deploy_GetZoneInfo_Candidate[];

export type Cli_Commands_Deploy_GetZoneInfo_Response = Response;

export type Cli_Commands_Deploy_GetZoneInfo_DataSuccess = boolean;

export type Cli_Commands_Deploy_GetZoneInfo_DataResultId = string;

export type Cli_Commands_Deploy_GetZoneInfo_DataResultName = string;

export type Cli_Commands_Deploy_GetZoneInfo_DataResultAccountId = string;

export type Cli_Commands_Deploy_GetZoneInfo_DataResultAccount = {
  id: Cli_Commands_Deploy_GetZoneInfo_DataResultAccountId;
};

export type Cli_Commands_Deploy_GetZoneInfo_DataResult = {
  id: Cli_Commands_Deploy_GetZoneInfo_DataResultId;
  name: Cli_Commands_Deploy_GetZoneInfo_DataResultName;
  account: Cli_Commands_Deploy_GetZoneInfo_DataResultAccount;
};

export type Cli_Commands_Deploy_GetZoneInfo_DataResults = Cli_Commands_Deploy_GetZoneInfo_DataResult[];

export type Cli_Commands_Deploy_GetZoneInfo_Data = {
  success: Cli_Commands_Deploy_GetZoneInfo_DataSuccess;
  result: Cli_Commands_Deploy_GetZoneInfo_DataResults;
};

export type Cli_Commands_Deploy_GetZoneInfo_HasResults = boolean;

export type Cli_Commands_Deploy_GetZoneInfo_FirstResult = Cli_Commands_Deploy_GetZoneInfo_DataResult | undefined;

/**
 * CLI - Commands - Deploy - List Email Routing Rules.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_ListEmailRoutingRules_Token = string;

export type Cli_Commands_Deploy_ListEmailRoutingRules_ZoneId = string;

export type Cli_Commands_Deploy_ListEmailRoutingRules_Returns = Promise<Cli_Commands_Deploy_ListEmailRoutingRules_Rule[]>;

export type Cli_Commands_Deploy_ListEmailRoutingRules_RuleMatcherType = string;

export type Cli_Commands_Deploy_ListEmailRoutingRules_RuleMatcherField = string;

export type Cli_Commands_Deploy_ListEmailRoutingRules_RuleMatcherValue = string;

export type Cli_Commands_Deploy_ListEmailRoutingRules_RuleMatcher = {
  type: Cli_Commands_Deploy_ListEmailRoutingRules_RuleMatcherType;
  field: Cli_Commands_Deploy_ListEmailRoutingRules_RuleMatcherField;
  value: Cli_Commands_Deploy_ListEmailRoutingRules_RuleMatcherValue;
};

export type Cli_Commands_Deploy_ListEmailRoutingRules_RuleMatchers = Cli_Commands_Deploy_ListEmailRoutingRules_RuleMatcher[];

export type Cli_Commands_Deploy_ListEmailRoutingRules_RuleActionType = string;

export type Cli_Commands_Deploy_ListEmailRoutingRules_RuleActionValue = string[];

export type Cli_Commands_Deploy_ListEmailRoutingRules_RuleAction = {
  type: Cli_Commands_Deploy_ListEmailRoutingRules_RuleActionType;
  value: Cli_Commands_Deploy_ListEmailRoutingRules_RuleActionValue;
};

export type Cli_Commands_Deploy_ListEmailRoutingRules_RuleActions = Cli_Commands_Deploy_ListEmailRoutingRules_RuleAction[];

export type Cli_Commands_Deploy_ListEmailRoutingRules_RuleTag = string;

export type Cli_Commands_Deploy_ListEmailRoutingRules_RuleName = string;

export type Cli_Commands_Deploy_ListEmailRoutingRules_RuleEnabled = boolean;

export type Cli_Commands_Deploy_ListEmailRoutingRules_Rule = {
  tag: Cli_Commands_Deploy_ListEmailRoutingRules_RuleTag;
  name: Cli_Commands_Deploy_ListEmailRoutingRules_RuleName;
  enabled: Cli_Commands_Deploy_ListEmailRoutingRules_RuleEnabled;
  matchers: Cli_Commands_Deploy_ListEmailRoutingRules_RuleMatchers;
  actions: Cli_Commands_Deploy_ListEmailRoutingRules_RuleActions;
};

export type Cli_Commands_Deploy_ListEmailRoutingRules_Response = Response;

export type Cli_Commands_Deploy_ListEmailRoutingRules_DataSuccess = boolean;

export type Cli_Commands_Deploy_ListEmailRoutingRules_DataErrorCode = number;

export type Cli_Commands_Deploy_ListEmailRoutingRules_DataErrorMessage = string;

export type Cli_Commands_Deploy_ListEmailRoutingRules_DataError = {
  code: Cli_Commands_Deploy_ListEmailRoutingRules_DataErrorCode;
  message: Cli_Commands_Deploy_ListEmailRoutingRules_DataErrorMessage;
};

export type Cli_Commands_Deploy_ListEmailRoutingRules_DataResult = Cli_Commands_Deploy_ListEmailRoutingRules_Rule[];

export type Cli_Commands_Deploy_ListEmailRoutingRules_DataErrorsList = Cli_Commands_Deploy_ListEmailRoutingRules_DataError[] | undefined;

export type Cli_Commands_Deploy_ListEmailRoutingRules_Data = {
  success: Cli_Commands_Deploy_ListEmailRoutingRules_DataSuccess;
  result: Cli_Commands_Deploy_ListEmailRoutingRules_DataResult;
  errors: Cli_Commands_Deploy_ListEmailRoutingRules_DataErrorsList;
};

export type Cli_Commands_Deploy_ListEmailRoutingRules_DataErrors = Cli_Commands_Deploy_ListEmailRoutingRules_DataErrorsList;

export type Cli_Commands_Deploy_ListEmailRoutingRules_ErrorDetails = string;

/**
 * CLI - Commands - Deploy - Load Env Token.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_LoadEnvToken_Returns = string | undefined;

export type Cli_Commands_Deploy_LoadEnvToken_EnvValue = string | undefined;

export type Cli_Commands_Deploy_LoadEnvToken_Content = string;

export type Cli_Commands_Deploy_LoadEnvToken_Match = RegExpMatchArray | null;

export type Cli_Commands_Deploy_LoadEnvToken_Value = string;

/**
 * CLI - Commands - Deploy - Print Context Summary.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_PrintContextSummary_ConfigPath = string;

export type Cli_Commands_Deploy_PrintContextSummary_Returns = void;

export type Cli_Commands_Deploy_PrintContextSummary_Contexts = Array<Lib_Schema_ContextConfig>;

export type Cli_Commands_Deploy_PrintContextSummary_Settings_WorkerName = Lib_Schema_SettingsConfigWorkerName;

export type Cli_Commands_Deploy_PrintContextSummary_Settings_BaseDomain = Lib_Schema_SettingsConfigBaseDomain;

export type Cli_Commands_Deploy_PrintContextSummary_Settings_ShowResponseOutput = Lib_Schema_SettingsConfigShowResponseOutput;

export type Cli_Commands_Deploy_PrintContextSummary_Settings = {
  worker_name: Cli_Commands_Deploy_PrintContextSummary_Settings_WorkerName;
  base_domain: Cli_Commands_Deploy_PrintContextSummary_Settings_BaseDomain;
  show_response_output: Cli_Commands_Deploy_PrintContextSummary_Settings_ShowResponseOutput;
};

/**
 * CLI - Commands - Deploy - Prompt For Api Token.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_PromptForApiToken_Returns = Promise<string>;

export type Cli_Commands_Deploy_PromptForApiToken_PromptResultApiToken = string | undefined;

export type Cli_Commands_Deploy_PromptForApiToken_PromptResult = {
  apiToken: Cli_Commands_Deploy_PromptForApiToken_PromptResultApiToken;
};

export type Cli_Commands_Deploy_PromptForApiToken_Token = string;

/**
 * CLI - Commands - Deploy - Resolve Api Token.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_ResolveApiToken_Interactive = boolean;

export type Cli_Commands_Deploy_ResolveApiToken_Returns = Promise<string>;

export type Cli_Commands_Deploy_ResolveApiToken_EnvToken = string | undefined;

/**
 * CLI - Commands - Deploy - Run Lint.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_RunLint_Returns = void;

export type Cli_Commands_Deploy_RunLint_PackageRoot = string;

export type Cli_Commands_Deploy_RunLint_LintResult = SpawnSyncReturns<string>;

/**
 * CLI - Commands - Deploy - Save Env Token.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_SaveEnvToken_Token = string;

export type Cli_Commands_Deploy_SaveEnvToken_Returns = void;

export type Cli_Commands_Deploy_SaveEnvToken_Content = string;

export type Cli_Commands_Deploy_SaveEnvToken_Regex = RegExp;

/**
 * CLI - Commands - Deploy - Setup Email Routing.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_SetupEmailRouting_ConfigPath = string;

export type Cli_Commands_Deploy_SetupEmailRouting_Token = string;

export type Cli_Commands_Deploy_SetupEmailRouting_Returns = Promise<void>;

export type Cli_Commands_Deploy_SetupEmailRouting_Contexts = Array<Lib_Schema_ContextConfig>;

export type Cli_Commands_Deploy_SetupEmailRouting_EmailContexts = Array<Lib_Schema_ContextConfig>;

export type Cli_Commands_Deploy_SetupEmailRouting_Settings_WorkerName = Lib_Schema_SettingsConfigWorkerName;

export type Cli_Commands_Deploy_SetupEmailRouting_Settings_BaseDomain = Lib_Schema_SettingsConfigBaseDomain;

export type Cli_Commands_Deploy_SetupEmailRouting_Settings_ShowResponseOutput = Lib_Schema_SettingsConfigShowResponseOutput;

export type Cli_Commands_Deploy_SetupEmailRouting_Settings = {
  worker_name: Cli_Commands_Deploy_SetupEmailRouting_Settings_WorkerName;
  base_domain: Cli_Commands_Deploy_SetupEmailRouting_Settings_BaseDomain;
  show_response_output: Cli_Commands_Deploy_SetupEmailRouting_Settings_ShowResponseOutput;
};

export type Cli_Commands_Deploy_SetupEmailRouting_WorkerName = string;

export type Cli_Commands_Deploy_SetupEmailRouting_ZoneInfoZoneId = string;

export type Cli_Commands_Deploy_SetupEmailRouting_ZoneInfoAccountId = string;

export type Cli_Commands_Deploy_SetupEmailRouting_ZoneInfoZoneName = string;

export type Cli_Commands_Deploy_SetupEmailRouting_ZoneInfo = {
  zoneId: Cli_Commands_Deploy_SetupEmailRouting_ZoneInfoZoneId;
  accountId: Cli_Commands_Deploy_SetupEmailRouting_ZoneInfoAccountId;
  zoneName: Cli_Commands_Deploy_SetupEmailRouting_ZoneInfoZoneName;
};

export type Cli_Commands_Deploy_SetupEmailRouting_ZoneId = string;

export type Cli_Commands_Deploy_SetupEmailRouting_RuleMatcherType = string;

export type Cli_Commands_Deploy_SetupEmailRouting_RuleMatcherField = string;

export type Cli_Commands_Deploy_SetupEmailRouting_RuleMatcherValue = string;

export type Cli_Commands_Deploy_SetupEmailRouting_RuleMatcher = {
  type: Cli_Commands_Deploy_SetupEmailRouting_RuleMatcherType;
  field: Cli_Commands_Deploy_SetupEmailRouting_RuleMatcherField;
  value: Cli_Commands_Deploy_SetupEmailRouting_RuleMatcherValue;
};

export type Cli_Commands_Deploy_SetupEmailRouting_RuleMatchers = Cli_Commands_Deploy_SetupEmailRouting_RuleMatcher[];

export type Cli_Commands_Deploy_SetupEmailRouting_RuleActionType = string;

export type Cli_Commands_Deploy_SetupEmailRouting_RuleActionValue = string[];

export type Cli_Commands_Deploy_SetupEmailRouting_RuleAction = {
  type: Cli_Commands_Deploy_SetupEmailRouting_RuleActionType;
  value: Cli_Commands_Deploy_SetupEmailRouting_RuleActionValue;
};

export type Cli_Commands_Deploy_SetupEmailRouting_RuleActions = Cli_Commands_Deploy_SetupEmailRouting_RuleAction[];

export type Cli_Commands_Deploy_SetupEmailRouting_RuleTag = string;

export type Cli_Commands_Deploy_SetupEmailRouting_RuleName = string;

export type Cli_Commands_Deploy_SetupEmailRouting_RuleEnabled = boolean;

export type Cli_Commands_Deploy_SetupEmailRouting_Rule = {
  tag: Cli_Commands_Deploy_SetupEmailRouting_RuleTag;
  name: Cli_Commands_Deploy_SetupEmailRouting_RuleName;
  enabled: Cli_Commands_Deploy_SetupEmailRouting_RuleEnabled;
  matchers: Cli_Commands_Deploy_SetupEmailRouting_RuleMatchers;
  actions: Cli_Commands_Deploy_SetupEmailRouting_RuleActions;
};

export type Cli_Commands_Deploy_SetupEmailRouting_ExistingRules = Cli_Commands_Deploy_SetupEmailRouting_Rule[];

export type Cli_Commands_Deploy_SetupEmailRouting_WorkerRules = Cli_Commands_Deploy_SetupEmailRouting_Rule[];

export type Cli_Commands_Deploy_SetupEmailRouting_DesiredEmails = Set<string>;

export type Cli_Commands_Deploy_SetupEmailRouting_Created = number;

export type Cli_Commands_Deploy_SetupEmailRouting_Kept = number;

export type Cli_Commands_Deploy_SetupEmailRouting_Removed = number;

export type Cli_Commands_Deploy_SetupEmailRouting_Email = string;

export type Cli_Commands_Deploy_SetupEmailRouting_RuleExists = boolean;

export type Cli_Commands_Deploy_SetupEmailRouting_RuleEmail = Cli_Commands_Deploy_SetupEmailRouting_RuleMatcher | undefined;

/**
 * CLI - Commands - Deploy - Verify Api Token.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_VerifyApiToken_Token = string;

export type Cli_Commands_Deploy_VerifyApiToken_Returns = Promise<boolean>;

export type Cli_Commands_Deploy_VerifyApiToken_Response = Response;

export type Cli_Commands_Deploy_VerifyApiToken_DataSuccess = boolean;

export type Cli_Commands_Deploy_VerifyApiToken_Data = {
  success: Cli_Commands_Deploy_VerifyApiToken_DataSuccess;
};

/**
 * CLI - Commands - Deploy - Verify Permissions.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_VerifyPermissions_Token = string;

export type Cli_Commands_Deploy_VerifyPermissions_BaseDomain = string;

export type Cli_Commands_Deploy_VerifyPermissions_HasEmailContexts = boolean;

export type Cli_Commands_Deploy_VerifyPermissions_Interactive = boolean;

export type Cli_Commands_Deploy_VerifyPermissions_Returns = Promise<string>;

export type Cli_Commands_Deploy_VerifyPermissions_ZoneInfoZoneId = string;

export type Cli_Commands_Deploy_VerifyPermissions_ZoneInfoAccountId = string;

export type Cli_Commands_Deploy_VerifyPermissions_ZoneInfoZoneName = string;

export type Cli_Commands_Deploy_VerifyPermissions_ZoneInfo = {
  zoneId: Cli_Commands_Deploy_VerifyPermissions_ZoneInfoZoneId;
  accountId: Cli_Commands_Deploy_VerifyPermissions_ZoneInfoAccountId;
  zoneName: Cli_Commands_Deploy_VerifyPermissions_ZoneInfoZoneName;
};

export type Cli_Commands_Deploy_VerifyPermissions_ZoneId = string;

export type Cli_Commands_Deploy_VerifyPermissions_AccountId = string;

export type Cli_Commands_Deploy_VerifyPermissions_HasWorkersScripts = boolean;

export type Cli_Commands_Deploy_VerifyPermissions_WorkersScriptsResponse = Response;

export type Cli_Commands_Deploy_VerifyPermissions_WorkersScriptsDataSuccess = boolean;

export type Cli_Commands_Deploy_VerifyPermissions_WorkersScriptsData = {
  success: Cli_Commands_Deploy_VerifyPermissions_WorkersScriptsDataSuccess;
};

export type Cli_Commands_Deploy_VerifyPermissions_HasWorkersRoutes = boolean;

export type Cli_Commands_Deploy_VerifyPermissions_WorkersRoutesResponse = Response;

export type Cli_Commands_Deploy_VerifyPermissions_WorkersRoutesDataSuccess = boolean;

export type Cli_Commands_Deploy_VerifyPermissions_WorkersRoutesData = {
  success: Cli_Commands_Deploy_VerifyPermissions_WorkersRoutesDataSuccess;
};

export type Cli_Commands_Deploy_VerifyPermissions_HasKvStorage = boolean;

export type Cli_Commands_Deploy_VerifyPermissions_KvStorageResponse = Response;

export type Cli_Commands_Deploy_VerifyPermissions_KvStorageDataSuccess = boolean;

export type Cli_Commands_Deploy_VerifyPermissions_KvStorageData = {
  success: Cli_Commands_Deploy_VerifyPermissions_KvStorageDataSuccess;
};

export type Cli_Commands_Deploy_VerifyPermissions_HasEmailRouting = boolean;

export type Cli_Commands_Deploy_VerifyPermissions_Missing = string[];

export type Cli_Commands_Deploy_VerifyPermissions_MissingMessage = string;

export type Cli_Commands_Deploy_VerifyPermissions_PromptResultReady = boolean | undefined;

export type Cli_Commands_Deploy_VerifyPermissions_PromptResult = {
  ready: Cli_Commands_Deploy_VerifyPermissions_PromptResultReady;
};

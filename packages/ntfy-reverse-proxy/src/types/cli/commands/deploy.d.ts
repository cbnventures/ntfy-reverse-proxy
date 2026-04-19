import type { SpawnSyncReturns } from 'child_process';

import type {
  LibSchemaContextConfig,
  LibSchemaServerConfig,
  LibSchemaSettingsConfig,
} from '../../lib/schema.d.ts';
import type { CliCommandsValidateValidateConfigResult } from './validate.d.ts';

/**
 * CLI - Commands - Deploy - Create Email Routing Rule.
 *
 * @since 2.0.0
 */
export type CliCommandsDeployCreateEmailRoutingRuleToken = string;

export type CliCommandsDeployCreateEmailRoutingRuleZoneId = string;

export type CliCommandsDeployCreateEmailRoutingRuleEmail = string;

export type CliCommandsDeployCreateEmailRoutingRuleContextId = string;

export type CliCommandsDeployCreateEmailRoutingRuleWorkerName = string;

export type CliCommandsDeployCreateEmailRoutingRuleReturn = Promise<void>;

export type CliCommandsDeployCreateEmailRoutingRuleResponse = Response;

export type CliCommandsDeployCreateEmailRoutingRuleCreateDataSuccess = boolean;

export type CliCommandsDeployCreateEmailRoutingRuleCreateDataErrorCode = number;

export type CliCommandsDeployCreateEmailRoutingRuleCreateDataErrorMessage = string;

export type CliCommandsDeployCreateEmailRoutingRuleCreateDataError = {
  code: CliCommandsDeployCreateEmailRoutingRuleCreateDataErrorCode;
  message: CliCommandsDeployCreateEmailRoutingRuleCreateDataErrorMessage;
};

export type CliCommandsDeployCreateEmailRoutingRuleCreateDataErrorsList = CliCommandsDeployCreateEmailRoutingRuleCreateDataError[] | undefined;

export type CliCommandsDeployCreateEmailRoutingRuleCreateData = {
  success: CliCommandsDeployCreateEmailRoutingRuleCreateDataSuccess;
  errors: CliCommandsDeployCreateEmailRoutingRuleCreateDataErrorsList;
};

export type CliCommandsDeployCreateEmailRoutingRuleCreateDataErrors = CliCommandsDeployCreateEmailRoutingRuleCreateDataErrorsList;

export type CliCommandsDeployCreateEmailRoutingRuleErrorDetails = string;

/**
 * CLI - Commands - Deploy - Delete Email Routing Rule.
 *
 * @since 2.0.0
 */
export type CliCommandsDeployDeleteEmailRoutingRuleToken = string;

export type CliCommandsDeployDeleteEmailRoutingRuleZoneId = string;

export type CliCommandsDeployDeleteEmailRoutingRuleRuleId = string;

export type CliCommandsDeployDeleteEmailRoutingRuleReturn = Promise<void>;

export type CliCommandsDeployDeleteEmailRoutingRuleResponse = Response;

export type CliCommandsDeployDeleteEmailRoutingRuleDeleteDataSuccess = boolean;

export type CliCommandsDeployDeleteEmailRoutingRuleDeleteDataErrorCode = number;

export type CliCommandsDeployDeleteEmailRoutingRuleDeleteDataErrorMessage = string;

export type CliCommandsDeployDeleteEmailRoutingRuleDeleteDataError = {
  code: CliCommandsDeployDeleteEmailRoutingRuleDeleteDataErrorCode;
  message: CliCommandsDeployDeleteEmailRoutingRuleDeleteDataErrorMessage;
};

export type CliCommandsDeployDeleteEmailRoutingRuleDeleteDataErrorsList = CliCommandsDeployDeleteEmailRoutingRuleDeleteDataError[] | undefined;

export type CliCommandsDeployDeleteEmailRoutingRuleDeleteData = {
  success: CliCommandsDeployDeleteEmailRoutingRuleDeleteDataSuccess;
  errors: CliCommandsDeployDeleteEmailRoutingRuleDeleteDataErrorsList;
};

export type CliCommandsDeployDeleteEmailRoutingRuleDeleteDataErrors = CliCommandsDeployDeleteEmailRoutingRuleDeleteDataErrorsList;

export type CliCommandsDeployDeleteEmailRoutingRuleErrorDetails = string;

/**
 * CLI - Commands - Deploy - Deploy.
 *
 * @since 2.0.0
 */
export type CliCommandsDeployDeployConfigPath = string;

export type CliCommandsDeployDeployInteractive = boolean;

export type CliCommandsDeployDeployReturn = Promise<void>;

export type CliCommandsDeployDeployToken = string;

export type CliCommandsDeployDeployResult = CliCommandsValidateValidateConfigResult;

export type CliCommandsDeployDeployServers = LibSchemaServerConfig[];

export type CliCommandsDeployDeploySettings = LibSchemaSettingsConfig;

export type CliCommandsDeployDeployWorkerName = string;

export type CliCommandsDeployDeployContexts = LibSchemaContextConfig[];

export type CliCommandsDeployDeployHasEmailContexts = boolean;

export type CliCommandsDeployDeployAccountId = string;

export type CliCommandsDeployDeployKvNamespaceId = string;

export type CliCommandsDeployDeployProjectRoot = string;

export type CliCommandsDeployDeployWranglerTomlPath = string;

/**
 * CLI - Commands - Deploy - Deploy Worker.
 *
 * @since 2.0.0
 */
export type CliCommandsDeployDeployWorkerReturn = void;

export type CliCommandsDeployDeployWorkerProjectRoot = string;

export type CliCommandsDeployDeployWorkerWranglerTomlPath = string;

export type CliCommandsDeployDeployWorkerDeployResult = SpawnSyncReturns<string>;

/**
 * CLI - Commands - Deploy - Ensure Kv Namespace.
 *
 * @since 2.0.0
 */
export type CliCommandsDeployEnsureKvNamespaceToken = string;

export type CliCommandsDeployEnsureKvNamespaceAccountId = string;

export type CliCommandsDeployEnsureKvNamespaceWorkerName = string;

export type CliCommandsDeployEnsureKvNamespaceReturn = Promise<string>;

export type CliCommandsDeployEnsureKvNamespaceListResponse = Response;

export type CliCommandsDeployEnsureKvNamespaceListDataSuccess = boolean;

export type CliCommandsDeployEnsureKvNamespaceListDataResultId = string;

export type CliCommandsDeployEnsureKvNamespaceListDataResultTitle = string;

export type CliCommandsDeployEnsureKvNamespaceListDataResult = {
  id: CliCommandsDeployEnsureKvNamespaceListDataResultId;
  title: CliCommandsDeployEnsureKvNamespaceListDataResultTitle;
};

export type CliCommandsDeployEnsureKvNamespaceListDataErrorCode = number;

export type CliCommandsDeployEnsureKvNamespaceListDataErrorMessage = string;

export type CliCommandsDeployEnsureKvNamespaceListDataError = {
  code: CliCommandsDeployEnsureKvNamespaceListDataErrorCode;
  message: CliCommandsDeployEnsureKvNamespaceListDataErrorMessage;
};

export type CliCommandsDeployEnsureKvNamespaceListDataResults = CliCommandsDeployEnsureKvNamespaceListDataResult[];

export type CliCommandsDeployEnsureKvNamespaceListDataErrorsList = CliCommandsDeployEnsureKvNamespaceListDataError[] | undefined;

export type CliCommandsDeployEnsureKvNamespaceListData = {
  success: CliCommandsDeployEnsureKvNamespaceListDataSuccess;
  result: CliCommandsDeployEnsureKvNamespaceListDataResults;
  errors: CliCommandsDeployEnsureKvNamespaceListDataErrorsList;
};

export type CliCommandsDeployEnsureKvNamespaceListDataErrors = CliCommandsDeployEnsureKvNamespaceListDataErrorsList;

export type CliCommandsDeployEnsureKvNamespaceListErrorDetails = string;

export type CliCommandsDeployEnsureKvNamespaceKvTitle = string;

export type CliCommandsDeployEnsureKvNamespaceExisting = CliCommandsDeployEnsureKvNamespaceListDataResult | undefined;

export type CliCommandsDeployEnsureKvNamespaceCreateResponse = Response;

export type CliCommandsDeployEnsureKvNamespaceCreateDataSuccess = boolean;

export type CliCommandsDeployEnsureKvNamespaceCreateDataResultId = string;

export type CliCommandsDeployEnsureKvNamespaceCreateDataResult = {
  id: CliCommandsDeployEnsureKvNamespaceCreateDataResultId;
};

export type CliCommandsDeployEnsureKvNamespaceCreateDataErrorsList = CliCommandsDeployEnsureKvNamespaceListDataError[] | undefined;

export type CliCommandsDeployEnsureKvNamespaceCreateData = {
  success: CliCommandsDeployEnsureKvNamespaceCreateDataSuccess;
  result: CliCommandsDeployEnsureKvNamespaceCreateDataResult;
  errors: CliCommandsDeployEnsureKvNamespaceCreateDataErrorsList;
};

export type CliCommandsDeployEnsureKvNamespaceCreateDataErrors = CliCommandsDeployEnsureKvNamespaceCreateDataErrorsList;

export type CliCommandsDeployEnsureKvNamespaceCreateErrorDetails = string;

/**
 * CLI - Commands - Deploy - Get Zone Info.
 *
 * @since 2.0.0
 */
export type CliCommandsDeployGetZoneInfoToken = string;

export type CliCommandsDeployGetZoneInfoBaseDomain = string;

export type CliCommandsDeployGetZoneInfoResultZoneId = string;

export type CliCommandsDeployGetZoneInfoResultAccountId = string;

export type CliCommandsDeployGetZoneInfoResultZoneName = string;

export type CliCommandsDeployGetZoneInfoResult = {
  zoneId: CliCommandsDeployGetZoneInfoResultZoneId;
  accountId: CliCommandsDeployGetZoneInfoResultAccountId;
  zoneName: CliCommandsDeployGetZoneInfoResultZoneName;
};

export type CliCommandsDeployGetZoneInfoReturn = Promise<CliCommandsDeployGetZoneInfoResult>;

export type CliCommandsDeployGetZoneInfoParts = string[];

export type CliCommandsDeployGetZoneInfoCandidate = string;

export type CliCommandsDeployGetZoneInfoCandidates = CliCommandsDeployGetZoneInfoCandidate[];

export type CliCommandsDeployGetZoneInfoResponse = Response;

export type CliCommandsDeployGetZoneInfoDataSuccess = boolean;

export type CliCommandsDeployGetZoneInfoDataResultId = string;

export type CliCommandsDeployGetZoneInfoDataResultName = string;

export type CliCommandsDeployGetZoneInfoDataResultAccountId = string;

export type CliCommandsDeployGetZoneInfoDataResultAccount = {
  id: CliCommandsDeployGetZoneInfoDataResultAccountId;
};

export type CliCommandsDeployGetZoneInfoDataResult = {
  id: CliCommandsDeployGetZoneInfoDataResultId;
  name: CliCommandsDeployGetZoneInfoDataResultName;
  account: CliCommandsDeployGetZoneInfoDataResultAccount;
};

export type CliCommandsDeployGetZoneInfoDataResults = CliCommandsDeployGetZoneInfoDataResult[];

export type CliCommandsDeployGetZoneInfoData = {
  success: CliCommandsDeployGetZoneInfoDataSuccess;
  result: CliCommandsDeployGetZoneInfoDataResults;
};

export type CliCommandsDeployGetZoneInfoHasResults = boolean;

export type CliCommandsDeployGetZoneInfoFirstResult = CliCommandsDeployGetZoneInfoDataResult | undefined;

/**
 * CLI - Commands - Deploy - List Email Routing Rules.
 *
 * @since 2.0.0
 */
export type CliCommandsDeployListEmailRoutingRulesToken = string;

export type CliCommandsDeployListEmailRoutingRulesZoneId = string;

export type CliCommandsDeployListEmailRoutingRulesReturn = Promise<CliCommandsDeployListEmailRoutingRulesRule[]>;

export type CliCommandsDeployListEmailRoutingRulesRuleMatcherType = string;

export type CliCommandsDeployListEmailRoutingRulesRuleMatcherField = string;

export type CliCommandsDeployListEmailRoutingRulesRuleMatcherValue = string;

export type CliCommandsDeployListEmailRoutingRulesRuleMatcher = {
  type: CliCommandsDeployListEmailRoutingRulesRuleMatcherType;
  field: CliCommandsDeployListEmailRoutingRulesRuleMatcherField;
  value: CliCommandsDeployListEmailRoutingRulesRuleMatcherValue;
};

export type CliCommandsDeployListEmailRoutingRulesRuleMatchers = CliCommandsDeployListEmailRoutingRulesRuleMatcher[];

export type CliCommandsDeployListEmailRoutingRulesRuleActionType = string;

export type CliCommandsDeployListEmailRoutingRulesRuleActionValue = string[];

export type CliCommandsDeployListEmailRoutingRulesRuleAction = {
  type: CliCommandsDeployListEmailRoutingRulesRuleActionType;
  value: CliCommandsDeployListEmailRoutingRulesRuleActionValue;
};

export type CliCommandsDeployListEmailRoutingRulesRuleActions = CliCommandsDeployListEmailRoutingRulesRuleAction[];

export type CliCommandsDeployListEmailRoutingRulesRuleTag = string;

export type CliCommandsDeployListEmailRoutingRulesRuleName = string;

export type CliCommandsDeployListEmailRoutingRulesRuleEnabled = boolean;

export type CliCommandsDeployListEmailRoutingRulesRule = {
  tag: CliCommandsDeployListEmailRoutingRulesRuleTag;
  name: CliCommandsDeployListEmailRoutingRulesRuleName;
  enabled: CliCommandsDeployListEmailRoutingRulesRuleEnabled;
  matchers: CliCommandsDeployListEmailRoutingRulesRuleMatchers;
  actions: CliCommandsDeployListEmailRoutingRulesRuleActions;
};

export type CliCommandsDeployListEmailRoutingRulesResponse = Response;

export type CliCommandsDeployListEmailRoutingRulesDataSuccess = boolean;

export type CliCommandsDeployListEmailRoutingRulesDataErrorCode = number;

export type CliCommandsDeployListEmailRoutingRulesDataErrorMessage = string;

export type CliCommandsDeployListEmailRoutingRulesDataError = {
  code: CliCommandsDeployListEmailRoutingRulesDataErrorCode;
  message: CliCommandsDeployListEmailRoutingRulesDataErrorMessage;
};

export type CliCommandsDeployListEmailRoutingRulesDataResult = CliCommandsDeployListEmailRoutingRulesRule[];

export type CliCommandsDeployListEmailRoutingRulesDataErrorsList = CliCommandsDeployListEmailRoutingRulesDataError[] | undefined;

export type CliCommandsDeployListEmailRoutingRulesData = {
  success: CliCommandsDeployListEmailRoutingRulesDataSuccess;
  result: CliCommandsDeployListEmailRoutingRulesDataResult;
  errors: CliCommandsDeployListEmailRoutingRulesDataErrorsList;
};

export type CliCommandsDeployListEmailRoutingRulesDataErrors = CliCommandsDeployListEmailRoutingRulesDataErrorsList;

export type CliCommandsDeployListEmailRoutingRulesErrorDetails = string;

/**
 * CLI - Commands - Deploy - Load Env Token.
 *
 * @since 2.0.0
 */
export type CliCommandsDeployLoadEnvTokenReturn = string | undefined;

export type CliCommandsDeployLoadEnvTokenEnvValue = string | undefined;

export type CliCommandsDeployLoadEnvTokenContent = string;

export type CliCommandsDeployLoadEnvTokenMatch = RegExpMatchArray | null;

export type CliCommandsDeployLoadEnvTokenValue = string;

/**
 * CLI - Commands - Deploy - Print Context Summary.
 *
 * @since 2.0.0
 */
export type CliCommandsDeployPrintContextSummaryConfigPath = string;

export type CliCommandsDeployPrintContextSummaryReturn = void;

export type CliCommandsDeployPrintContextSummaryContexts = LibSchemaContextConfig[];

export type CliCommandsDeployPrintContextSummarySettings = LibSchemaSettingsConfig;

/**
 * CLI - Commands - Deploy - Print Email Routing Manual Instructions.
 *
 * @since 2.0.0
 */
export type CliCommandsDeployPrintEmailRoutingManualInstructionsEmailContextsId = string;

export type CliCommandsDeployPrintEmailRoutingManualInstructionsEmailContextsName = string;

export type CliCommandsDeployPrintEmailRoutingManualInstructionsEmailContexts = Array<{
  id: CliCommandsDeployPrintEmailRoutingManualInstructionsEmailContextsId;
  name: CliCommandsDeployPrintEmailRoutingManualInstructionsEmailContextsName;
}>;

export type CliCommandsDeployPrintEmailRoutingManualInstructionsBaseDomain = string;

export type CliCommandsDeployPrintEmailRoutingManualInstructionsAccountId = string | undefined;

export type CliCommandsDeployPrintEmailRoutingManualInstructionsReturn = void;

/**
 * CLI - Commands - Deploy - Prompt For Api Token.
 *
 * @since 2.0.0
 */
export type CliCommandsDeployPromptForApiTokenReturn = Promise<string>;

export type CliCommandsDeployPromptForApiTokenPromptResultApiToken = string | undefined;

export type CliCommandsDeployPromptForApiTokenPromptResult = {
  apiToken: CliCommandsDeployPromptForApiTokenPromptResultApiToken;
};

export type CliCommandsDeployPromptForApiTokenValidateValue = string;

export type CliCommandsDeployPromptForApiTokenToken = string;

/**
 * CLI - Commands - Deploy - Resolve Api Token.
 *
 * @since 2.0.0
 */
export type CliCommandsDeployResolveApiTokenInteractive = boolean;

export type CliCommandsDeployResolveApiTokenReturn = Promise<string>;

export type CliCommandsDeployResolveApiTokenEnvToken = string | undefined;

/**
 * CLI - Commands - Deploy - Run Lint.
 *
 * @since 2.0.0
 */
export type CliCommandsDeployRunLintReturn = void;

export type CliCommandsDeployRunLintLintResult = SpawnSyncReturns<string>;

/**
 * CLI - Commands - Deploy - Save Env Token.
 *
 * @since 2.0.0
 */
export type CliCommandsDeploySaveEnvTokenToken = string;

export type CliCommandsDeploySaveEnvTokenReturn = void;

export type CliCommandsDeploySaveEnvTokenContent = string;

export type CliCommandsDeploySaveEnvTokenRegex = RegExp;

/**
 * CLI - Commands - Deploy - Setup Email Routing.
 *
 * @since 2.0.0
 */
export type CliCommandsDeploySetupEmailRoutingConfigPath = string;

export type CliCommandsDeploySetupEmailRoutingToken = string;

export type CliCommandsDeploySetupEmailRoutingReturn = Promise<void>;

export type CliCommandsDeploySetupEmailRoutingContexts = LibSchemaContextConfig[];

export type CliCommandsDeploySetupEmailRoutingEmailContexts = LibSchemaContextConfig[];

export type CliCommandsDeploySetupEmailRoutingSettings = LibSchemaSettingsConfig;

export type CliCommandsDeploySetupEmailRoutingWorkerName = string;

export type CliCommandsDeploySetupEmailRoutingZoneInfoZoneId = string;

export type CliCommandsDeploySetupEmailRoutingZoneInfoAccountId = string;

export type CliCommandsDeploySetupEmailRoutingZoneInfoZoneName = string;

export type CliCommandsDeploySetupEmailRoutingZoneInfo = {
  zoneId: CliCommandsDeploySetupEmailRoutingZoneInfoZoneId;
  accountId: CliCommandsDeploySetupEmailRoutingZoneInfoAccountId;
  zoneName: CliCommandsDeploySetupEmailRoutingZoneInfoZoneName;
};

export type CliCommandsDeploySetupEmailRoutingZoneId = string;

export type CliCommandsDeploySetupEmailRoutingRuleMatcherType = string;

export type CliCommandsDeploySetupEmailRoutingRuleMatcherField = string;

export type CliCommandsDeploySetupEmailRoutingRuleMatcherValue = string;

export type CliCommandsDeploySetupEmailRoutingRuleMatcher = {
  type: CliCommandsDeploySetupEmailRoutingRuleMatcherType;
  field: CliCommandsDeploySetupEmailRoutingRuleMatcherField;
  value: CliCommandsDeploySetupEmailRoutingRuleMatcherValue;
};

export type CliCommandsDeploySetupEmailRoutingRuleMatchers = CliCommandsDeploySetupEmailRoutingRuleMatcher[];

export type CliCommandsDeploySetupEmailRoutingRuleActionType = string;

export type CliCommandsDeploySetupEmailRoutingRuleActionValue = string[];

export type CliCommandsDeploySetupEmailRoutingRuleAction = {
  type: CliCommandsDeploySetupEmailRoutingRuleActionType;
  value: CliCommandsDeploySetupEmailRoutingRuleActionValue;
};

export type CliCommandsDeploySetupEmailRoutingRuleActions = CliCommandsDeploySetupEmailRoutingRuleAction[];

export type CliCommandsDeploySetupEmailRoutingRuleTag = string;

export type CliCommandsDeploySetupEmailRoutingRuleName = string;

export type CliCommandsDeploySetupEmailRoutingRuleEnabled = boolean;

export type CliCommandsDeploySetupEmailRoutingRule = {
  tag: CliCommandsDeploySetupEmailRoutingRuleTag;
  name: CliCommandsDeploySetupEmailRoutingRuleName;
  enabled: CliCommandsDeploySetupEmailRoutingRuleEnabled;
  matchers: CliCommandsDeploySetupEmailRoutingRuleMatchers;
  actions: CliCommandsDeploySetupEmailRoutingRuleActions;
};

export type CliCommandsDeploySetupEmailRoutingExistingRules = CliCommandsDeploySetupEmailRoutingRule[];

export type CliCommandsDeploySetupEmailRoutingWorkerRules = CliCommandsDeploySetupEmailRoutingRule[];

export type CliCommandsDeploySetupEmailRoutingDesiredEmails = Set<string>;

export type CliCommandsDeploySetupEmailRoutingCreated = number;

export type CliCommandsDeploySetupEmailRoutingKept = number;

export type CliCommandsDeploySetupEmailRoutingRemoved = number;

export type CliCommandsDeploySetupEmailRoutingEmail = string;

export type CliCommandsDeploySetupEmailRoutingRuleExists = boolean;

export type CliCommandsDeploySetupEmailRoutingRuleEmail = CliCommandsDeploySetupEmailRoutingRuleMatcher | undefined;

/**
 * CLI - Commands - Deploy - Verify Api Token.
 *
 * @since 2.0.0
 */
export type CliCommandsDeployVerifyApiTokenToken = string;

export type CliCommandsDeployVerifyApiTokenReturn = Promise<boolean>;

export type CliCommandsDeployVerifyApiTokenResponse = Response;

export type CliCommandsDeployVerifyApiTokenDataSuccess = boolean;

export type CliCommandsDeployVerifyApiTokenData = {
  success: CliCommandsDeployVerifyApiTokenDataSuccess;
};

/**
 * CLI - Commands - Deploy - Verify Permissions.
 *
 * @since 2.0.0
 */
export type CliCommandsDeployVerifyPermissionsToken = string;

export type CliCommandsDeployVerifyPermissionsBaseDomain = string;

export type CliCommandsDeployVerifyPermissionsHasEmailContexts = boolean;

export type CliCommandsDeployVerifyPermissionsInteractive = boolean;

export type CliCommandsDeployVerifyPermissionsReturn = Promise<string>;

export type CliCommandsDeployVerifyPermissionsZoneInfoZoneId = string;

export type CliCommandsDeployVerifyPermissionsZoneInfoAccountId = string;

export type CliCommandsDeployVerifyPermissionsZoneInfoZoneName = string;

export type CliCommandsDeployVerifyPermissionsZoneInfo = {
  zoneId: CliCommandsDeployVerifyPermissionsZoneInfoZoneId;
  accountId: CliCommandsDeployVerifyPermissionsZoneInfoAccountId;
  zoneName: CliCommandsDeployVerifyPermissionsZoneInfoZoneName;
};

export type CliCommandsDeployVerifyPermissionsZoneId = string;

export type CliCommandsDeployVerifyPermissionsAccountId = string;

export type CliCommandsDeployVerifyPermissionsHasWorkersScripts = boolean;

export type CliCommandsDeployVerifyPermissionsWorkersScriptsResponse = Response;

export type CliCommandsDeployVerifyPermissionsWorkersScriptsDataSuccess = boolean;

export type CliCommandsDeployVerifyPermissionsWorkersScriptsData = {
  success: CliCommandsDeployVerifyPermissionsWorkersScriptsDataSuccess;
};

export type CliCommandsDeployVerifyPermissionsHasWorkersRoutes = boolean;

export type CliCommandsDeployVerifyPermissionsWorkersRoutesResponse = Response;

export type CliCommandsDeployVerifyPermissionsWorkersRoutesDataSuccess = boolean;

export type CliCommandsDeployVerifyPermissionsWorkersRoutesData = {
  success: CliCommandsDeployVerifyPermissionsWorkersRoutesDataSuccess;
};

export type CliCommandsDeployVerifyPermissionsHasKvStorage = boolean;

export type CliCommandsDeployVerifyPermissionsKvStorageResponse = Response;

export type CliCommandsDeployVerifyPermissionsKvStorageDataSuccess = boolean;

export type CliCommandsDeployVerifyPermissionsKvStorageData = {
  success: CliCommandsDeployVerifyPermissionsKvStorageDataSuccess;
};

export type CliCommandsDeployVerifyPermissionsHasEmailRouting = boolean;

export type CliCommandsDeployVerifyPermissionsMissing = string[];

export type CliCommandsDeployVerifyPermissionsMissingMessage = string;

export type CliCommandsDeployVerifyPermissionsPromptResultReady = boolean | undefined;

export type CliCommandsDeployVerifyPermissionsPromptResult = {
  ready: CliCommandsDeployVerifyPermissionsPromptResultReady;
};

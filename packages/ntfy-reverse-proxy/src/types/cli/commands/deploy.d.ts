import type { SpawnSyncReturns } from 'node:child_process';

import type {
  Lib_Schema_ContextConfig,
  Lib_Schema_ServerConfig,
  Lib_Schema_SettingsConfigBaseDomain,
  Lib_Schema_SettingsConfigShowResponseOutput,
  Lib_Schema_SettingsConfigWorkerName,
} from '../../lib/schema.d.ts';
import type {
  Shared_CloudflareEmailRoutingRule,
  Shared_CloudflareKvNamespace,
  Shared_CloudflareWorkerDomain,
  Shared_CloudflareZone,
} from '../../shared.d.ts';

/**
 * CLI - Commands - Deploy - Check Readiness.
 *
 * @since 2.5.0
 */
export type Cli_Commands_Deploy_CheckReadiness_Token = string;

export type Cli_Commands_Deploy_CheckReadiness_ZoneInfo = Shared_CloudflareZone;

export type Cli_Commands_Deploy_CheckReadiness_Settings_WorkerName = Lib_Schema_SettingsConfigWorkerName;

export type Cli_Commands_Deploy_CheckReadiness_Settings_BaseDomain = Lib_Schema_SettingsConfigBaseDomain;

export type Cli_Commands_Deploy_CheckReadiness_Settings_ShowResponseOutput = Lib_Schema_SettingsConfigShowResponseOutput;

export type Cli_Commands_Deploy_CheckReadiness_Settings = {
  worker_name: Cli_Commands_Deploy_CheckReadiness_Settings_WorkerName;
  base_domain: Cli_Commands_Deploy_CheckReadiness_Settings_BaseDomain;
  show_response_output: Cli_Commands_Deploy_CheckReadiness_Settings_ShowResponseOutput;
};

export type Cli_Commands_Deploy_CheckReadiness_Contexts = Array<Lib_Schema_ContextConfig>;

export type Cli_Commands_Deploy_CheckReadiness_Returns = Promise<void>;

export type Cli_Commands_Deploy_CheckReadiness_Hostname = string;

export type Cli_Commands_Deploy_CheckReadiness_Hostnames = Cli_Commands_Deploy_CheckReadiness_Hostname[];

export type Cli_Commands_Deploy_CheckReadiness_HasEmailContexts = boolean;

export type Cli_Commands_Deploy_CheckReadiness_Domains = Shared_CloudflareWorkerDomain[];

export type Cli_Commands_Deploy_CheckReadiness_AttachedHostnames = Cli_Commands_Deploy_CheckReadiness_Hostname[];

export type Cli_Commands_Deploy_CheckReadiness_UnattachedHostnames = Cli_Commands_Deploy_CheckReadiness_Hostname[];

export type Cli_Commands_Deploy_CheckReadiness_PendingRecord = string;

export type Cli_Commands_Deploy_CheckReadiness_PendingRecords = Cli_Commands_Deploy_CheckReadiness_PendingRecord[];

export type Cli_Commands_Deploy_CheckReadiness_ErrorMessage = string;

export type Cli_Commands_Deploy_CheckReadiness_MxHost = string;

export type Cli_Commands_Deploy_CheckReadiness_MxHosts = Cli_Commands_Deploy_CheckReadiness_MxHost[];

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

export type Cli_Commands_Deploy_Deploy_ZoneInfo = Shared_CloudflareZone;

export type Cli_Commands_Deploy_Deploy_AccountId = string;

export type Cli_Commands_Deploy_Deploy_KvNamespaceId = string;

export type Cli_Commands_Deploy_Deploy_WranglerTomlPath = string;

/**
 * CLI - Commands - Deploy - Deploy Worker.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_DeployWorker_WranglerTomlPath = string;

export type Cli_Commands_Deploy_DeployWorker_Returns = void;

export type Cli_Commands_Deploy_DeployWorker_WranglerCliPath = string;

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

export type Cli_Commands_Deploy_EnsureKvNamespace_AllNamespaces = Shared_CloudflareKvNamespace[];

export type Cli_Commands_Deploy_EnsureKvNamespace_KvTitle = string;

export type Cli_Commands_Deploy_EnsureKvNamespace_Existing = Shared_CloudflareKvNamespace | undefined;

/**
 * CLI - Commands - Deploy - Get Zone Info.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_GetZoneInfo_Token = string;

export type Cli_Commands_Deploy_GetZoneInfo_BaseDomain = string;

export type Cli_Commands_Deploy_GetZoneInfo_Returns = Promise<Shared_CloudflareZone>;

export type Cli_Commands_Deploy_GetZoneInfo_Parts = string[];

export type Cli_Commands_Deploy_GetZoneInfo_Candidate = string;

export type Cli_Commands_Deploy_GetZoneInfo_Candidates = Cli_Commands_Deploy_GetZoneInfo_Candidate[];

export type Cli_Commands_Deploy_GetZoneInfo_Zone = Shared_CloudflareZone | undefined;

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

export type Cli_Commands_Deploy_PrintContextSummary_SecretPathSuffix = string;

export type Cli_Commands_Deploy_PrintContextSummary_AllowedFromText = string;

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

export type Cli_Commands_Deploy_SetupEmailRouting_ZoneInfo = Shared_CloudflareZone;

export type Cli_Commands_Deploy_SetupEmailRouting_ZoneId = string;

export type Cli_Commands_Deploy_SetupEmailRouting_ExistingRules = Shared_CloudflareEmailRoutingRule[];

export type Cli_Commands_Deploy_SetupEmailRouting_WorkerRules = Shared_CloudflareEmailRoutingRule[];

export type Cli_Commands_Deploy_SetupEmailRouting_DesiredEmails = Set<string>;

export type Cli_Commands_Deploy_SetupEmailRouting_Created = number;

export type Cli_Commands_Deploy_SetupEmailRouting_Kept = number;

export type Cli_Commands_Deploy_SetupEmailRouting_Removed = number;

export type Cli_Commands_Deploy_SetupEmailRouting_Email = string;

export type Cli_Commands_Deploy_SetupEmailRouting_RuleExists = boolean;

export type Cli_Commands_Deploy_SetupEmailRouting_RuleEmail = string | undefined;

/**
 * CLI - Commands - Deploy - Verify Permissions.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Deploy_VerifyPermissions_Token = string;

export type Cli_Commands_Deploy_VerifyPermissions_BaseDomain = string;

export type Cli_Commands_Deploy_VerifyPermissions_HasEmailContexts = boolean;

export type Cli_Commands_Deploy_VerifyPermissions_Interactive = boolean;

export type Cli_Commands_Deploy_VerifyPermissions_Returns = Promise<Shared_CloudflareZone>;

export type Cli_Commands_Deploy_VerifyPermissions_ZoneInfo = Shared_CloudflareZone;

export type Cli_Commands_Deploy_VerifyPermissions_Missing = string[];

export type Cli_Commands_Deploy_VerifyPermissions_MissingMessage = string;

export type Cli_Commands_Deploy_VerifyPermissions_PromptResultReady = boolean | undefined;

export type Cli_Commands_Deploy_VerifyPermissions_PromptResult = {
  ready: Cli_Commands_Deploy_VerifyPermissions_PromptResultReady;
};

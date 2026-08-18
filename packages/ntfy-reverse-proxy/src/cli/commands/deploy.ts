import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Bootstrap, Logger } from '@cbnventures/nova/toolkit';
import chalk from 'chalk';
import prompts from 'prompts';

import { APP_NAME } from '../../lib/item.js';
import { LIB_REGEX_SURROUNDING_QUOTES } from '../../lib/regex.js';
import { listContexts } from './context.js';
import { generateWranglerToml } from './generate.js';
import { listServers } from './server.js';
import { getSettings } from './settings.js';
import { validateConfig } from './validate.js';

import type {
  Cli_Commands_Deploy_CreateEmailRoutingRule_ContextId,
  Cli_Commands_Deploy_CreateEmailRoutingRule_CreateData,
  Cli_Commands_Deploy_CreateEmailRoutingRule_CreateErrors,
  Cli_Commands_Deploy_CreateEmailRoutingRule_Email,
  Cli_Commands_Deploy_CreateEmailRoutingRule_ErrorDetails,
  Cli_Commands_Deploy_CreateEmailRoutingRule_Response,
  Cli_Commands_Deploy_CreateEmailRoutingRule_Returns,
  Cli_Commands_Deploy_CreateEmailRoutingRule_Token,
  Cli_Commands_Deploy_CreateEmailRoutingRule_WorkerName,
  Cli_Commands_Deploy_CreateEmailRoutingRule_ZoneId,
  Cli_Commands_Deploy_DeleteEmailRoutingRule_DeleteData,
  Cli_Commands_Deploy_DeleteEmailRoutingRule_DeleteErrors,
  Cli_Commands_Deploy_DeleteEmailRoutingRule_ErrorDetails,
  Cli_Commands_Deploy_DeleteEmailRoutingRule_Response,
  Cli_Commands_Deploy_DeleteEmailRoutingRule_Returns,
  Cli_Commands_Deploy_DeleteEmailRoutingRule_RuleId,
  Cli_Commands_Deploy_DeleteEmailRoutingRule_Token,
  Cli_Commands_Deploy_DeleteEmailRoutingRule_ZoneId,
  Cli_Commands_Deploy_Deploy_AccountId,
  Cli_Commands_Deploy_Deploy_ConfigPath,
  Cli_Commands_Deploy_Deploy_Contexts,
  Cli_Commands_Deploy_Deploy_HasEmailContexts,
  Cli_Commands_Deploy_Deploy_Interactive,
  Cli_Commands_Deploy_Deploy_KvNamespaceId,
  Cli_Commands_Deploy_Deploy_ProjectRoot,
  Cli_Commands_Deploy_Deploy_Result,
  Cli_Commands_Deploy_Deploy_Returns,
  Cli_Commands_Deploy_Deploy_Servers,
  Cli_Commands_Deploy_Deploy_Settings,
  Cli_Commands_Deploy_Deploy_Token,
  Cli_Commands_Deploy_Deploy_WorkerName,
  Cli_Commands_Deploy_Deploy_WranglerTomlPath,
  Cli_Commands_Deploy_DeployWorker_DeployResult,
  Cli_Commands_Deploy_DeployWorker_ProjectRoot,
  Cli_Commands_Deploy_DeployWorker_Returns,
  Cli_Commands_Deploy_DeployWorker_WranglerTomlPath,
  Cli_Commands_Deploy_EnsureKvNamespace_AccountId,
  Cli_Commands_Deploy_EnsureKvNamespace_AllNamespaces,
  Cli_Commands_Deploy_EnsureKvNamespace_CreateData,
  Cli_Commands_Deploy_EnsureKvNamespace_CreateErrorDetails,
  Cli_Commands_Deploy_EnsureKvNamespace_CreateErrors,
  Cli_Commands_Deploy_EnsureKvNamespace_CreateResponse,
  Cli_Commands_Deploy_EnsureKvNamespace_Cursor,
  Cli_Commands_Deploy_EnsureKvNamespace_Existing,
  Cli_Commands_Deploy_EnsureKvNamespace_HasMore,
  Cli_Commands_Deploy_EnsureKvNamespace_KvTitle,
  Cli_Commands_Deploy_EnsureKvNamespace_ListData,
  Cli_Commands_Deploy_EnsureKvNamespace_ListErrorDetails,
  Cli_Commands_Deploy_EnsureKvNamespace_ListErrors,
  Cli_Commands_Deploy_EnsureKvNamespace_ListResponse,
  Cli_Commands_Deploy_EnsureKvNamespace_Page,
  Cli_Commands_Deploy_EnsureKvNamespace_PaginationUrl,
  Cli_Commands_Deploy_EnsureKvNamespace_ResultInfoCursor,
  Cli_Commands_Deploy_EnsureKvNamespace_Returns,
  Cli_Commands_Deploy_EnsureKvNamespace_Token,
  Cli_Commands_Deploy_EnsureKvNamespace_WorkerName,
  Cli_Commands_Deploy_GetZoneInfo_BaseDomain,
  Cli_Commands_Deploy_GetZoneInfo_Candidates,
  Cli_Commands_Deploy_GetZoneInfo_Data,
  Cli_Commands_Deploy_GetZoneInfo_FirstResult,
  Cli_Commands_Deploy_GetZoneInfo_HasResults,
  Cli_Commands_Deploy_GetZoneInfo_Parts,
  Cli_Commands_Deploy_GetZoneInfo_Response,
  Cli_Commands_Deploy_GetZoneInfo_Returns,
  Cli_Commands_Deploy_GetZoneInfo_Token,
  Cli_Commands_Deploy_ListEmailRoutingRules_Data,
  Cli_Commands_Deploy_ListEmailRoutingRules_DataErrors,
  Cli_Commands_Deploy_ListEmailRoutingRules_ErrorDetails,
  Cli_Commands_Deploy_ListEmailRoutingRules_Response,
  Cli_Commands_Deploy_ListEmailRoutingRules_Returns,
  Cli_Commands_Deploy_ListEmailRoutingRules_Token,
  Cli_Commands_Deploy_ListEmailRoutingRules_ZoneId,
  Cli_Commands_Deploy_LoadEnvToken_Content,
  Cli_Commands_Deploy_LoadEnvToken_EnvValue,
  Cli_Commands_Deploy_LoadEnvToken_Match,
  Cli_Commands_Deploy_LoadEnvToken_Returns,
  Cli_Commands_Deploy_LoadEnvToken_Value,
  Cli_Commands_Deploy_PrintContextSummary_ConfigPath,
  Cli_Commands_Deploy_PrintContextSummary_Contexts,
  Cli_Commands_Deploy_PrintContextSummary_Returns,
  Cli_Commands_Deploy_PrintContextSummary_Settings,
  Cli_Commands_Deploy_PromptForApiToken_PromptResult,
  Cli_Commands_Deploy_PromptForApiToken_Returns,
  Cli_Commands_Deploy_PromptForApiToken_Token,
  Cli_Commands_Deploy_ResolveApiToken_EnvToken,
  Cli_Commands_Deploy_ResolveApiToken_Interactive,
  Cli_Commands_Deploy_ResolveApiToken_Returns,
  Cli_Commands_Deploy_RunLint_LintResult,
  Cli_Commands_Deploy_RunLint_PackageRoot,
  Cli_Commands_Deploy_RunLint_Returns,
  Cli_Commands_Deploy_SaveEnvToken_Content,
  Cli_Commands_Deploy_SaveEnvToken_Regex,
  Cli_Commands_Deploy_SaveEnvToken_Returns,
  Cli_Commands_Deploy_SaveEnvToken_Token,
  Cli_Commands_Deploy_SetupEmailRouting_ConfigPath,
  Cli_Commands_Deploy_SetupEmailRouting_Contexts,
  Cli_Commands_Deploy_SetupEmailRouting_Created,
  Cli_Commands_Deploy_SetupEmailRouting_DesiredEmails,
  Cli_Commands_Deploy_SetupEmailRouting_Email,
  Cli_Commands_Deploy_SetupEmailRouting_EmailContexts,
  Cli_Commands_Deploy_SetupEmailRouting_ExistingRules,
  Cli_Commands_Deploy_SetupEmailRouting_Kept,
  Cli_Commands_Deploy_SetupEmailRouting_Removed,
  Cli_Commands_Deploy_SetupEmailRouting_Returns,
  Cli_Commands_Deploy_SetupEmailRouting_RuleEmail,
  Cli_Commands_Deploy_SetupEmailRouting_RuleExists,
  Cli_Commands_Deploy_SetupEmailRouting_Settings,
  Cli_Commands_Deploy_SetupEmailRouting_Token,
  Cli_Commands_Deploy_SetupEmailRouting_WorkerName,
  Cli_Commands_Deploy_SetupEmailRouting_WorkerRules,
  Cli_Commands_Deploy_SetupEmailRouting_ZoneId,
  Cli_Commands_Deploy_SetupEmailRouting_ZoneInfo,
  Cli_Commands_Deploy_VerifyApiToken_Data,
  Cli_Commands_Deploy_VerifyApiToken_Response,
  Cli_Commands_Deploy_VerifyApiToken_Returns,
  Cli_Commands_Deploy_VerifyApiToken_Token,
  Cli_Commands_Deploy_VerifyPermissions_AccountId,
  Cli_Commands_Deploy_VerifyPermissions_BaseDomain,
  Cli_Commands_Deploy_VerifyPermissions_HasEmailContexts,
  Cli_Commands_Deploy_VerifyPermissions_HasEmailRouting,
  Cli_Commands_Deploy_VerifyPermissions_HasKvStorage,
  Cli_Commands_Deploy_VerifyPermissions_HasWorkersRoutes,
  Cli_Commands_Deploy_VerifyPermissions_HasWorkersScripts,
  Cli_Commands_Deploy_VerifyPermissions_Interactive,
  Cli_Commands_Deploy_VerifyPermissions_KvStorageData,
  Cli_Commands_Deploy_VerifyPermissions_KvStorageResponse,
  Cli_Commands_Deploy_VerifyPermissions_Missing,
  Cli_Commands_Deploy_VerifyPermissions_MissingMessage,
  Cli_Commands_Deploy_VerifyPermissions_PromptResult,
  Cli_Commands_Deploy_VerifyPermissions_Returns,
  Cli_Commands_Deploy_VerifyPermissions_Token,
  Cli_Commands_Deploy_VerifyPermissions_WorkersRoutesData,
  Cli_Commands_Deploy_VerifyPermissions_WorkersRoutesResponse,
  Cli_Commands_Deploy_VerifyPermissions_WorkersScriptsData,
  Cli_Commands_Deploy_VerifyPermissions_WorkersScriptsResponse,
  Cli_Commands_Deploy_VerifyPermissions_ZoneId,
  Cli_Commands_Deploy_VerifyPermissions_ZoneInfo,
} from '../../types/cli/commands/deploy.d.ts';

/**
 * CLI - Commands - Deploy - Cloudflare API Base.
 *
 * Base URL for the Cloudflare v4 REST API used by every
 * authenticated request made during the deployment pipeline.
 *
 * @since 2.1.0
 */
const CLOUDFLARE_API_BASE = 'https://api.cloudflare.com/client/v4';

/**
 * CLI - Commands - Deploy - Config Dir.
 *
 * Absolute path to the per-user configuration directory that
 * stores the persisted Cloudflare API token and related files.
 *
 * @since 2.1.0
 */
const configDir = Bootstrap.getConfigDir(APP_NAME);

/**
 * CLI - Commands - Deploy - Env File Path.
 *
 * Absolute path to the dotenv file inside the configuration
 * directory where the Cloudflare API token is written.
 *
 * @since 2.1.0
 */
const envFilePath = resolve(configDir, '.env');

/**
 * CLI - Commands - Deploy - Env Token Key.
 *
 * Environment variable name under which the Cloudflare API
 * token is stored and later read back during deployment.
 *
 * @since 2.1.0
 */
const ENV_TOKEN_KEY = 'CLOUDFLARE_API_TOKEN';

/**
 * CLI - Commands - Deploy.
 *
 * Orchestrates the full deployment pipeline from authentication
 * through worker deployment and optional email routing setup.
 *
 * @since 2.0.0
 */
async function deploy(configPath: Cli_Commands_Deploy_Deploy_ConfigPath, interactive: Cli_Commands_Deploy_Deploy_Interactive = false): Cli_Commands_Deploy_Deploy_Returns {
  // Step 1: Resolve API token.
  Logger.info('Checking authentication...');

  const token: Cli_Commands_Deploy_Deploy_Token = await resolveApiToken(interactive);

  Reflect.set(process.env, ENV_TOKEN_KEY, token);

  Logger.info('Authenticated.');

  // Step 2: Validate config.
  Logger.info('Validating config...');

  const result: Cli_Commands_Deploy_Deploy_Result = validateConfig(configPath);

  if (result['valid'] === false) {
    Logger.error('Config is invalid:');

    for (const error of result['errors']) {
      Logger.error(`  - ${error}`);
    }

    return;
  }

  Logger.info('Config is valid.');

  // Warn if no servers are configured (notifications won't be delivered).
  const servers: Cli_Commands_Deploy_Deploy_Servers = listServers(configPath);

  if (servers.length === 0) {
    Logger.warn('No ntfy servers are configured. Notifications will not be sent until at least one server is added.');
  }

  // Step 3: Lint (fail fast before any Cloudflare API calls or writes).
  Logger.info('Running lint...');

  runLint();

  Logger.info('Lint passed.');

  // Step 4: Verify permissions.
  const settings: Cli_Commands_Deploy_Deploy_Settings = getSettings(configPath);

  const workerName: Cli_Commands_Deploy_Deploy_WorkerName = settings['worker_name'];

  const contexts: Cli_Commands_Deploy_Deploy_Contexts = listContexts(configPath);

  const hasEmailContexts: Cli_Commands_Deploy_Deploy_HasEmailContexts = contexts.some((context) => context['type'] === 'email');

  Logger.info('Verifying API token permissions...');

  const accountId: Cli_Commands_Deploy_Deploy_AccountId = await verifyPermissions(token, settings['base_domain'], hasEmailContexts, interactive);

  Logger.info('Permissions verified.');

  // Step 4.5: Ensure KV namespace exists.
  Logger.info('Ensuring KV namespace...');

  const kvNamespaceId: Cli_Commands_Deploy_Deploy_KvNamespaceId = await ensureKvNamespace(token, accountId, workerName);

  Logger.info('KV namespace ready.');

  // Step 5: Generate wrangler.toml.
  Logger.info('Generating wrangler.toml...');

  const projectRoot: Cli_Commands_Deploy_Deploy_ProjectRoot = Bootstrap.getProjectRoot() ?? process.cwd();
  const wranglerTomlPath: Cli_Commands_Deploy_Deploy_WranglerTomlPath = resolve(projectRoot, 'wrangler.toml');

  generateWranglerToml(configPath, wranglerTomlPath, accountId, kvNamespaceId);

  Logger.info('wrangler.toml generated.');

  // Step 6: Deploy worker.
  Logger.info('Deploying worker...');

  deployWorker();

  Logger.info('Worker deployed.');

  // Step 7: Setup email routing.
  if (hasEmailContexts === true) {
    await setupEmailRouting(configPath, token);
  } else {
    Logger.info('No email contexts found. Skipping email routing setup.');
  }

  // Step 8: Print context summary.
  printContextSummary(configPath);

  // Step 9: Done.
  Logger.info('Deploy complete.');

  return;
}

/**
 * CLI - Commands - Deploy - Resolve API Token.
 *
 * Checks for a saved token in the env file and falls back
 * to an interactive prompt when no valid token is available.
 *
 * @since 2.0.0
 */
async function resolveApiToken(interactive: Cli_Commands_Deploy_ResolveApiToken_Interactive): Cli_Commands_Deploy_ResolveApiToken_Returns {
  // Check .env first.
  const envToken: Cli_Commands_Deploy_ResolveApiToken_EnvToken = loadEnvToken();

  if (envToken !== undefined) {
    if (await verifyApiToken(envToken) === true) {
      return envToken;
    }

    if (interactive === false) {
      throw new Error('API token in .env is invalid or expired. Update the CLOUDFLARE_API_TOKEN value in your .env file.');
    }

    Logger.warn('Saved API token in .env is invalid or expired.');
  } else {
    if (interactive === false) {
      throw new Error('No API token found. Create a .env file with CLOUDFLARE_API_TOKEN=<your-token> or run "npm run manage" for guided setup.');
    }

    Logger.warn('No API token found. Let\'s set one up.');
  }

  // Prompt for a new token.
  return promptForApiToken();
}

/**
 * CLI - Commands - Deploy - Verify API Token.
 *
 * Calls the Cloudflare token verify endpoint to confirm
 * the token is valid and has not expired.
 *
 * @since 2.0.0
 */
async function verifyApiToken(token: Cli_Commands_Deploy_VerifyApiToken_Token): Cli_Commands_Deploy_VerifyApiToken_Returns {
  try {
    const response: Cli_Commands_Deploy_VerifyApiToken_Response = await fetch(`${CLOUDFLARE_API_BASE}/user/tokens/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data: Cli_Commands_Deploy_VerifyApiToken_Data = await response.json<Cli_Commands_Deploy_VerifyApiToken_Data>();

    return data['success'];
  } catch {
    return false;
  }
}

/**
 * CLI - Commands - Deploy - Verify Permissions.
 *
 * Probes the Cloudflare API for each required permission scope
 * and prompts the user to fix missing ones before continuing.
 *
 * @since 2.0.0
 */
async function verifyPermissions(token: Cli_Commands_Deploy_VerifyPermissions_Token, baseDomain: Cli_Commands_Deploy_VerifyPermissions_BaseDomain, hasEmailContexts: Cli_Commands_Deploy_VerifyPermissions_HasEmailContexts, interactive: Cli_Commands_Deploy_VerifyPermissions_Interactive): Cli_Commands_Deploy_VerifyPermissions_Returns {
  const zoneInfo: Cli_Commands_Deploy_VerifyPermissions_ZoneInfo = await getZoneInfo(token, baseDomain);
  const zoneId: Cli_Commands_Deploy_VerifyPermissions_ZoneId = zoneInfo['zoneId'];
  const accountId: Cli_Commands_Deploy_VerifyPermissions_AccountId = zoneInfo['accountId'];

  // Check Workers Scripts (Account level).
  let hasWorkersScripts: Cli_Commands_Deploy_VerifyPermissions_HasWorkersScripts = false;

  try {
    const workersScriptsResponse: Cli_Commands_Deploy_VerifyPermissions_WorkersScriptsResponse = await fetch(`${CLOUDFLARE_API_BASE}/accounts/${accountId}/workers/scripts`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const workersScriptsData: Cli_Commands_Deploy_VerifyPermissions_WorkersScriptsData = await workersScriptsResponse.json<Cli_Commands_Deploy_VerifyPermissions_WorkersScriptsData>();

    hasWorkersScripts = workersScriptsData['success'];
  } catch {
    hasWorkersScripts = false;
  }

  // Check Workers Routes (Zone level).
  let hasWorkersRoutes: Cli_Commands_Deploy_VerifyPermissions_HasWorkersRoutes = false;

  try {
    const workersRoutesResponse: Cli_Commands_Deploy_VerifyPermissions_WorkersRoutesResponse = await fetch(`${CLOUDFLARE_API_BASE}/zones/${zoneId}/workers/routes`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const workersRoutesData: Cli_Commands_Deploy_VerifyPermissions_WorkersRoutesData = await workersRoutesResponse.json<Cli_Commands_Deploy_VerifyPermissions_WorkersRoutesData>();

    hasWorkersRoutes = workersRoutesData['success'];
  } catch {
    hasWorkersRoutes = false;
  }

  // Check Workers KV Storage (Account level).
  let hasKvStorage: Cli_Commands_Deploy_VerifyPermissions_HasKvStorage = false;

  try {
    const kvStorageResponse: Cli_Commands_Deploy_VerifyPermissions_KvStorageResponse = await fetch(`${CLOUDFLARE_API_BASE}/accounts/${accountId}/storage/kv/namespaces?per_page=1`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const kvStorageData: Cli_Commands_Deploy_VerifyPermissions_KvStorageData = await kvStorageResponse.json<Cli_Commands_Deploy_VerifyPermissions_KvStorageData>();

    hasKvStorage = kvStorageData['success'];
  } catch {
    hasKvStorage = false;
  }

  // Check Email Routing Rules (Zone level).
  let hasEmailRouting: Cli_Commands_Deploy_VerifyPermissions_HasEmailRouting = false;

  if (hasEmailContexts === true) {
    try {
      await listEmailRoutingRules(token, zoneId);

      hasEmailRouting = true;
    } catch {
      hasEmailRouting = false;
    }
  } else {
    hasEmailRouting = true;
  }

  const missing: Cli_Commands_Deploy_VerifyPermissions_Missing = [];

  if (hasWorkersScripts === false) {
    missing.push('Account > Workers Scripts > Edit');
  }

  if (hasKvStorage === false) {
    missing.push('Account > Workers KV Storage > Edit');
  }

  if (hasWorkersRoutes === false) {
    missing.push('Zone > Workers Routes > Edit');
  }

  if (hasEmailRouting === false) {
    missing.push('Zone > Email Routing Rules > Edit');
  }

  if (missing.length === 0) {
    return accountId;
  }

  if (interactive === false) {
    const missingMessage: Cli_Commands_Deploy_VerifyPermissions_MissingMessage = [
      'API token is missing permissions:',
      ...missing.map((p) => `  - ${p}`),
      '',
      'Update your token at https://dash.cloudflare.com/profile/api-tokens',
    ].join('\n');

    throw new Error(missingMessage);
  }

  Logger.warn('API token is missing the following permissions:');

  Logger.warn('');

  for (const permission of missing) {
    Logger.warn(`  - ${permission}`);
  }

  Logger.warn('');

  Logger.info('  1. Go to https://dash.cloudflare.com/profile/api-tokens');
  Logger.info('  2. Find your token -> ... -> Edit');
  Logger.info('  3. Add the missing permissions listed above');
  Logger.info('  4. Click "Continue to summary" then "Update Token"');
  Logger.info('');

  const promptResult: Cli_Commands_Deploy_VerifyPermissions_PromptResult = await prompts({
    type: 'confirm',
    name: 'ready',
    message: 'Done? Press enter to retry.',
    initial: true,
  });

  if (promptResult['ready'] !== true) {
    throw new Error('Deploy cancelled. Please update your API token permissions and try again.');
  }

  // Retry permission check.
  return verifyPermissions(token, baseDomain, hasEmailContexts, interactive);
}

/**
 * CLI - Commands - Deploy - Prompt For API Token.
 *
 * Walks the user through creating a Cloudflare API token
 * and saves the validated result to the local env file.
 *
 * @since 2.0.0
 */
async function promptForApiToken(): Cli_Commands_Deploy_PromptForApiToken_Returns {
  Logger.info('');
  Logger.info('You need a Cloudflare API token to deploy and manage email routing.');
  Logger.info('');
  Logger.info('  1. Go to https://dash.cloudflare.com/profile/api-tokens');
  Logger.info('  2. Click "Create Token"');
  Logger.info('  3. Under "Custom token", click "Get started"');
  Logger.info('  4. Name the token (e.g. "Reverse Proxy for ntfy")');
  Logger.info('  5. Under Permissions, add the following (use "+ Add more" for each):');
  Logger.info('     - Account | Workers Scripts | Edit');
  Logger.info('     - Account | Workers KV Storage | Edit');
  Logger.info('     - Zone | Workers Routes | Edit');
  Logger.info('     - Zone | Email Routing Rules | Edit');
  Logger.info('  6. Under Account Resources, select your account');
  Logger.info('  7. Under Zone Resources, select Specific zone -> your base domain');
  Logger.info('  8. Click "Continue to summary" then "Create Token"');
  Logger.info('  9. Copy the generated token');
  Logger.info('');

  const promptResult: Cli_Commands_Deploy_PromptForApiToken_PromptResult = await prompts({
    type: 'password',
    name: 'apiToken',
    message: 'Paste your API token:',
    validate: (value) => value.trim().length > 0 || 'Token is required',
  });

  if (promptResult['apiToken'] === undefined) {
    throw new Error('API token is required to deploy.');
  }

  const token: Cli_Commands_Deploy_PromptForApiToken_Token = promptResult['apiToken'].trim();

  if (await verifyApiToken(token) === false) {
    throw new Error('API token is invalid. Please check the token and try again.');
  }

  saveEnvToken(token);

  Logger.info('API token saved to .env file.');

  return token;
}

/**
 * CLI - Commands - Deploy - Run Lint.
 *
 * Spawns the ESLint process against the source directory
 * and aborts the deployment if any lint errors are found.
 *
 * @since 2.0.0
 */
function runLint(): Cli_Commands_Deploy_RunLint_Returns {
  let packageRoot: Cli_Commands_Deploy_RunLint_PackageRoot = dirname(fileURLToPath(import.meta.url));

  while (packageRoot !== dirname(packageRoot)) {
    if (existsSync(resolve(packageRoot, 'package.json')) === true) {
      break;
    }

    packageRoot = dirname(packageRoot);
  }

  const lintResult: Cli_Commands_Deploy_RunLint_LintResult = spawnSync('npx', [
    'eslint',
    './src',
  ], {
    encoding: 'utf-8',
    stdio: 'inherit',
    cwd: packageRoot,
  });

  if (lintResult['status'] !== 0) {
    throw new Error('Lint failed.');
  }

  return;
}

/**
 * CLI - Commands - Deploy - Worker.
 *
 * Spawns the Wrangler deploy process with the generated
 * configuration file and aborts on non-zero exit codes.
 *
 * @since 2.0.0
 */
function deployWorker(): Cli_Commands_Deploy_DeployWorker_Returns {
  const projectRoot: Cli_Commands_Deploy_DeployWorker_ProjectRoot = Bootstrap.getProjectRoot() ?? process.cwd();
  const wranglerTomlPath: Cli_Commands_Deploy_DeployWorker_WranglerTomlPath = resolve(projectRoot, 'wrangler.toml');

  const deployResult: Cli_Commands_Deploy_DeployWorker_DeployResult = spawnSync('npx', [
    'wrangler',
    'deploy',
    '--config',
    wranglerTomlPath,
  ], {
    encoding: 'utf-8',
    stdio: 'inherit',
  });

  if (deployResult['status'] !== 0) {
    throw new Error('Worker deployment failed.');
  }

  return;
}

/**
 * CLI - Commands - Deploy - Ensure Kv Namespace.
 *
 * Lists existing KV namespaces and creates the required
 * namespace if it does not already exist on the account.
 *
 * @param token      - Token.
 * @param accountId  - Account id.
 * @param workerName - Worker name.
 *
 * @returns {Cli_Commands_Deploy_EnsureKvNamespace_Returns}
 *
 * @since 2.0.0
 */
async function ensureKvNamespace(token: Cli_Commands_Deploy_EnsureKvNamespace_Token, accountId: Cli_Commands_Deploy_EnsureKvNamespace_AccountId, workerName: Cli_Commands_Deploy_EnsureKvNamespace_WorkerName): Cli_Commands_Deploy_EnsureKvNamespace_Returns {
  const allNamespaces: Cli_Commands_Deploy_EnsureKvNamespace_AllNamespaces = [];
  let page: Cli_Commands_Deploy_EnsureKvNamespace_Page = 1;
  let cursor: Cli_Commands_Deploy_EnsureKvNamespace_Cursor = undefined;
  let hasMore: Cli_Commands_Deploy_EnsureKvNamespace_HasMore = true;

  while (hasMore === true) {
    const paginationUrl: Cli_Commands_Deploy_EnsureKvNamespace_PaginationUrl = (cursor !== undefined) ? `${CLOUDFLARE_API_BASE}/accounts/${accountId}/storage/kv/namespaces?per_page=100&cursor=${cursor}` : `${CLOUDFLARE_API_BASE}/accounts/${accountId}/storage/kv/namespaces?per_page=100`;

    const listResponse: Cli_Commands_Deploy_EnsureKvNamespace_ListResponse = await fetch(paginationUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (listResponse['ok'] === false) {
      throw new Error(`Failed to list KV namespaces: HTTP ${String(listResponse['status'])}`);
    }

    const listData: Cli_Commands_Deploy_EnsureKvNamespace_ListData = await listResponse.json<Cli_Commands_Deploy_EnsureKvNamespace_ListData>();

    if (listData['success'] === false) {
      const listErrors: Cli_Commands_Deploy_EnsureKvNamespace_ListErrors = listData['errors'];
      let listErrorDetails: Cli_Commands_Deploy_EnsureKvNamespace_ListErrorDetails = 'Unknown error';

      if (listErrors !== undefined) {
        listErrorDetails = listErrors.map((e) => `${String(e['code'])}: ${e['message']}`).join(', ');
      }

      throw new Error(`Failed to list KV namespaces: ${listErrorDetails}`);
    }

    allNamespaces.push(...listData['result']);

    const resultInfoCursor: Cli_Commands_Deploy_EnsureKvNamespace_ResultInfoCursor = (listData['result_info'] !== undefined && listData['result_info'] !== null) ? listData['result_info']['cursor'] : undefined;

    hasMore = listData['result'].length >= 100
      && page < 100
      && resultInfoCursor !== undefined
      && resultInfoCursor !== '';
    cursor = resultInfoCursor;
    page += 1;
  }

  const kvTitle: Cli_Commands_Deploy_EnsureKvNamespace_KvTitle = `${workerName}-kv`;

  const existing: Cli_Commands_Deploy_EnsureKvNamespace_Existing = allNamespaces.find((ns) => ns['title'] === kvTitle);

  if (existing !== undefined) {
    return existing['id'];
  }

  const createResponse: Cli_Commands_Deploy_EnsureKvNamespace_CreateResponse = await fetch(`${CLOUDFLARE_API_BASE}/accounts/${accountId}/storage/kv/namespaces`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: kvTitle }),
  });

  if (createResponse['ok'] === false) {
    throw new Error(`Failed to create KV namespace: HTTP ${String(createResponse['status'])}`);
  }

  const createData: Cli_Commands_Deploy_EnsureKvNamespace_CreateData = await createResponse.json<Cli_Commands_Deploy_EnsureKvNamespace_CreateData>();

  if (createData['success'] === false) {
    const createErrors: Cli_Commands_Deploy_EnsureKvNamespace_CreateErrors = createData['errors'];
    let createErrorDetails: Cli_Commands_Deploy_EnsureKvNamespace_CreateErrorDetails = 'Unknown error';

    if (createErrors !== undefined) {
      createErrorDetails = createErrors.map((e) => `${String(e['code'])}: ${e['message']}`).join(', ');
    }

    throw new Error(`Failed to create KV namespace "${kvTitle}": ${createErrorDetails}`);
  }

  return createData['result']['id'];
}

/**
 * CLI - Commands - Deploy - Get Zone Info.
 *
 * Walks progressively shorter domain segments to find the
 * matching Cloudflare zone and returns its ID and account ID.
 *
 * @since 2.0.0
 */
async function getZoneInfo(token: Cli_Commands_Deploy_GetZoneInfo_Token, baseDomain: Cli_Commands_Deploy_GetZoneInfo_BaseDomain): Cli_Commands_Deploy_GetZoneInfo_Returns {
  /*
   * Try progressively shorter domain segments to find the zone.
   * e.g., "ntfy.example.co.uk" -> try "ntfy.example.co.uk", then "example.co.uk", then "co.uk".
   */
  const parts: Cli_Commands_Deploy_GetZoneInfo_Parts = baseDomain.split('.');
  const candidates: Cli_Commands_Deploy_GetZoneInfo_Candidates = parts.slice(0, parts.length - 1).map((_unused, i) => parts.slice(i).join('.'));

  for (const candidate of candidates) {
    const response: Cli_Commands_Deploy_GetZoneInfo_Response = await fetch(`${CLOUDFLARE_API_BASE}/zones?name=${candidate}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response['ok'] === false) {
      continue;
    }

    const data: Cli_Commands_Deploy_GetZoneInfo_Data = await response.json<Cli_Commands_Deploy_GetZoneInfo_Data>();

    const hasResults: Cli_Commands_Deploy_GetZoneInfo_HasResults = data['success'] === true
      && data['result'].length > 0;

    let firstResult: Cli_Commands_Deploy_GetZoneInfo_FirstResult = undefined;

    if (hasResults === true) {
      firstResult = data['result'][0];
    }

    if (firstResult !== undefined) {
      return {
        zoneId: firstResult['id'],
        accountId: firstResult['account']['id'],
        zoneName: firstResult['name'],
      };
    }
  }

  throw new Error(`Failed to find Cloudflare zone for "${baseDomain}". Is the domain added to your Cloudflare account?`);
}

/**
 * CLI - Commands - Deploy - List Email Routing Rules.
 *
 * Fetches all email routing rules for the given zone so
 * the caller can compare desired state against existing rules.
 *
 * @since 2.0.0
 */
async function listEmailRoutingRules(token: Cli_Commands_Deploy_ListEmailRoutingRules_Token, zoneId: Cli_Commands_Deploy_ListEmailRoutingRules_ZoneId): Cli_Commands_Deploy_ListEmailRoutingRules_Returns {
  const response: Cli_Commands_Deploy_ListEmailRoutingRules_Response = await fetch(`${CLOUDFLARE_API_BASE}/zones/${zoneId}/email/routing/rules`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response['ok'] === false) {
    throw new Error(`Failed to list email routing rules: HTTP ${String(response['status'])}`);
  }

  const data: Cli_Commands_Deploy_ListEmailRoutingRules_Data = await response.json<Cli_Commands_Deploy_ListEmailRoutingRules_Data>();

  if (data['success'] === false) {
    const dataErrors: Cli_Commands_Deploy_ListEmailRoutingRules_DataErrors = data['errors'];
    let errorDetails: Cli_Commands_Deploy_ListEmailRoutingRules_ErrorDetails = 'Unknown error';

    if (dataErrors !== undefined) {
      errorDetails = dataErrors.map((e) => `${String(e['code'])}: ${e['message']}`).join(', ');
    }

    throw new Error(`Failed to list email routing rules: ${errorDetails}`);
  }

  return data['result'];
}

/**
 * CLI - Commands - Deploy - Create Email Routing Rule.
 *
 * Creates a new email routing rule that directs incoming
 * messages for the given address to the worker for processing.
 *
 * @since 2.0.0
 */
async function createEmailRoutingRule(token: Cli_Commands_Deploy_CreateEmailRoutingRule_Token, zoneId: Cli_Commands_Deploy_CreateEmailRoutingRule_ZoneId, email: Cli_Commands_Deploy_CreateEmailRoutingRule_Email, contextId: Cli_Commands_Deploy_CreateEmailRoutingRule_ContextId, workerName: Cli_Commands_Deploy_CreateEmailRoutingRule_WorkerName): Cli_Commands_Deploy_CreateEmailRoutingRule_Returns {
  const response: Cli_Commands_Deploy_CreateEmailRoutingRule_Response = await fetch(`${CLOUDFLARE_API_BASE}/zones/${zoneId}/email/routing/rules`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      matchers: [{
        type: 'literal',
        field: 'to',
        value: email,
      }],
      actions: [{
        type: 'worker',
        value: [workerName],
      }],
      name: `${workerName}: ${contextId}`,
      enabled: true,
    }),
  });

  if (response['ok'] === false) {
    throw new Error(`Failed to create email routing rule for "${email}": HTTP ${String(response['status'])}`);
  }

  const createData: Cli_Commands_Deploy_CreateEmailRoutingRule_CreateData = await response.json<Cli_Commands_Deploy_CreateEmailRoutingRule_CreateData>();

  if (createData['success'] === false) {
    const createErrors: Cli_Commands_Deploy_CreateEmailRoutingRule_CreateErrors = createData['errors'];
    let errorDetails: Cli_Commands_Deploy_CreateEmailRoutingRule_ErrorDetails = 'Unknown error';

    if (createErrors !== undefined) {
      errorDetails = createErrors.map((e) => `${String(e['code'])}: ${e['message']}`).join(', ');
    }

    throw new Error(`Failed to create email routing rule for "${email}": ${errorDetails}`);
  }

  return;
}

/**
 * CLI - Commands - Deploy - Delete Email Routing Rule.
 *
 * Removes a stale email routing rule that no longer matches
 * any configured context in the current deployment.
 *
 * @since 2.0.0
 */
async function deleteEmailRoutingRule(token: Cli_Commands_Deploy_DeleteEmailRoutingRule_Token, zoneId: Cli_Commands_Deploy_DeleteEmailRoutingRule_ZoneId, ruleId: Cli_Commands_Deploy_DeleteEmailRoutingRule_RuleId): Cli_Commands_Deploy_DeleteEmailRoutingRule_Returns {
  const response: Cli_Commands_Deploy_DeleteEmailRoutingRule_Response = await fetch(`${CLOUDFLARE_API_BASE}/zones/${zoneId}/email/routing/rules/${ruleId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response['ok'] === false) {
    throw new Error(`Failed to delete email routing rule "${ruleId}": HTTP ${String(response['status'])}`);
  }

  const deleteData: Cli_Commands_Deploy_DeleteEmailRoutingRule_DeleteData = await response.json<Cli_Commands_Deploy_DeleteEmailRoutingRule_DeleteData>();

  if (deleteData['success'] === false) {
    const deleteErrors: Cli_Commands_Deploy_DeleteEmailRoutingRule_DeleteErrors = deleteData['errors'];
    let errorDetails: Cli_Commands_Deploy_DeleteEmailRoutingRule_ErrorDetails = 'Unknown error';

    if (deleteErrors !== undefined) {
      errorDetails = deleteErrors.map((e) => `${String(e['code'])}: ${e['message']}`).join(', ');
    }

    throw new Error(`Failed to delete email routing rule "${ruleId}": ${errorDetails}`);
  }

  return;
}

/**
 * CLI - Commands - Deploy - Load Env Token.
 *
 * Reads the local env file and extracts the Cloudflare API
 * token value, stripping surrounding quotes if present.
 *
 * @since 2.0.0
 */
function loadEnvToken(): Cli_Commands_Deploy_LoadEnvToken_Returns {
  const envValue: Cli_Commands_Deploy_LoadEnvToken_EnvValue = process.env[ENV_TOKEN_KEY];

  if (envValue !== undefined && envValue !== '') {
    return envValue;
  }

  if (existsSync(envFilePath) === false) {
    return undefined;
  }

  const content: Cli_Commands_Deploy_LoadEnvToken_Content = readFileSync(envFilePath, 'utf-8');

  const match: Cli_Commands_Deploy_LoadEnvToken_Match = content.match(new RegExp(`^${ENV_TOKEN_KEY}=(.+)$`, 'm'));

  if (match === null || match[1] === undefined) {
    return undefined;
  }

  const value: Cli_Commands_Deploy_LoadEnvToken_Value = match[1].trim().replace(new RegExp(LIB_REGEX_SURROUNDING_QUOTES.source, 'g'), '');

  return (value !== '') ? value : undefined;
}

/**
 * CLI - Commands - Deploy - Save Env Token.
 *
 * Writes or updates the Cloudflare API token in the local
 * env file so subsequent deploys can reuse it automatically.
 *
 * @since 2.0.0
 */
function saveEnvToken(token: Cli_Commands_Deploy_SaveEnvToken_Token): Cli_Commands_Deploy_SaveEnvToken_Returns {
  if (existsSync(envFilePath) === true) {
    let content: Cli_Commands_Deploy_SaveEnvToken_Content = readFileSync(envFilePath, 'utf-8');

    const regex: Cli_Commands_Deploy_SaveEnvToken_Regex = new RegExp(`^${ENV_TOKEN_KEY}=.*$`, 'm');

    if (regex.test(content) === true) {
      content = content.replace(regex, `${ENV_TOKEN_KEY}=${token}`);
    } else {
      content = [
        content.trimEnd(),
        `${ENV_TOKEN_KEY}=${token}`,
        '',
      ].join('\n');
    }

    writeFileSync(envFilePath, content, { mode: parseInt('600', 8) });
  } else {
    writeFileSync(envFilePath, `${ENV_TOKEN_KEY}=${token}\n`, { mode: parseInt('600', 8) });
  }

  return;
}

/**
 * CLI - Commands - Deploy - Setup Email Routing.
 *
 * Synchronizes email routing rules with the configured contexts
 * by creating missing rules and removing stale ones.
 *
 * @since 2.0.0
 */
async function setupEmailRouting(configPath: Cli_Commands_Deploy_SetupEmailRouting_ConfigPath, token: Cli_Commands_Deploy_SetupEmailRouting_Token): Cli_Commands_Deploy_SetupEmailRouting_Returns {
  const contexts: Cli_Commands_Deploy_SetupEmailRouting_Contexts = listContexts(configPath);

  const emailContexts: Cli_Commands_Deploy_SetupEmailRouting_EmailContexts = contexts.filter((context) => context['type'] === 'email');

  if (emailContexts.length === 0) {
    return;
  }

  Logger.info('Setting up email routing...');

  const settings: Cli_Commands_Deploy_SetupEmailRouting_Settings = getSettings(configPath);

  const workerName: Cli_Commands_Deploy_SetupEmailRouting_WorkerName = settings['worker_name'];

  const zoneInfo: Cli_Commands_Deploy_SetupEmailRouting_ZoneInfo = await getZoneInfo(token, settings['base_domain']);

  const zoneId: Cli_Commands_Deploy_SetupEmailRouting_ZoneId = zoneInfo['zoneId'];

  const existingRules: Cli_Commands_Deploy_SetupEmailRouting_ExistingRules = await listEmailRoutingRules(token, zoneId);

  const workerRules: Cli_Commands_Deploy_SetupEmailRouting_WorkerRules = existingRules.filter((rule) => {
    return rule['actions'].some((action) => action['type'] === 'worker' && action['value'].includes(workerName));
  });

  const desiredEmails: Cli_Commands_Deploy_SetupEmailRouting_DesiredEmails = new Set(emailContexts.map((context) => `${context['id']}@${settings['base_domain']}`));

  let created: Cli_Commands_Deploy_SetupEmailRouting_Created = 0;
  let kept: Cli_Commands_Deploy_SetupEmailRouting_Kept = 0;
  let removed: Cli_Commands_Deploy_SetupEmailRouting_Removed = 0;

  // Create missing rules.
  for (const context of emailContexts) {
    const email: Cli_Commands_Deploy_SetupEmailRouting_Email = `${context['id']}@${settings['base_domain']}`;

    const ruleExists: Cli_Commands_Deploy_SetupEmailRouting_RuleExists = workerRules.some((rule) => {
      return rule['matchers'].some((matcher) => {
        return matcher['type'] === 'literal'
          && matcher['field'] === 'to'
          && matcher['value'] === email;
      });
    });

    if (ruleExists === true) {
      kept += 1;
    } else {
      await createEmailRoutingRule(token, zoneId, email, context['id'], workerName);

      created += 1;
    }
  }

  // Remove stale rules.
  for (const rule of workerRules) {
    const ruleEmail: Cli_Commands_Deploy_SetupEmailRouting_RuleEmail = rule['matchers'].find((matcher) => matcher['type'] === 'literal' && matcher['field'] === 'to');

    if (ruleEmail !== undefined && desiredEmails.has(ruleEmail['value']) === false) {
      await deleteEmailRoutingRule(token, zoneId, rule['tag']);

      removed += 1;
    }
  }

  Logger.info(`Email routing: ${String(created)} created, ${String(kept)} kept, ${String(removed)} removed.`);

  return;
}

/**
 * CLI - Commands - Deploy - Print Context Summary.
 *
 * Logs a formatted overview of all configured contexts
 * with their URLs or email addresses for quick reference.
 *
 * @since 2.0.0
 */
function printContextSummary(configPath: Cli_Commands_Deploy_PrintContextSummary_ConfigPath): Cli_Commands_Deploy_PrintContextSummary_Returns {
  const contexts: Cli_Commands_Deploy_PrintContextSummary_Contexts = listContexts(configPath);

  const settings: Cli_Commands_Deploy_PrintContextSummary_Settings = getSettings(configPath);

  if (contexts.length === 0) {
    return;
  }

  process.stdout.write('\n');
  process.stdout.write(`${chalk.bold('Context reference:')}\n`);
  process.stdout.write('\n');

  for (const context of contexts) {
    process.stdout.write(`  ${chalk.cyan(context['name'])}\n`);

    if (context['type'] === 'http') {
      process.stdout.write(`    URL:   ${chalk.green(`https://${context['id']}.${settings['base_domain']}`)}\n`);

      if (context['token'] !== undefined) {
        process.stdout.write(`    Token: ${chalk.gray(context['token'])}\n`);
      }
    } else {
      process.stdout.write(`    Email: ${chalk.green(`${context['id']}@${settings['base_domain']}`)}\n`);

      if (context['allowed_from'] !== undefined) {
        process.stdout.write(`    Allow: ${chalk.gray(context['allowed_from'])}\n`);
      }
    }

    process.stdout.write('\n');
  }

  return;
}

export {
  deploy,
};

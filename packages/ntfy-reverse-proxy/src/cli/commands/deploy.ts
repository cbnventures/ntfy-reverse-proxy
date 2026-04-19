import { spawnSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

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
  CliCommandsDeployCreateEmailRoutingRuleContextId,
  CliCommandsDeployCreateEmailRoutingRuleCreateData,
  CliCommandsDeployCreateEmailRoutingRuleCreateDataErrors,
  CliCommandsDeployCreateEmailRoutingRuleEmail,
  CliCommandsDeployCreateEmailRoutingRuleErrorDetails,
  CliCommandsDeployCreateEmailRoutingRuleResponse,
  CliCommandsDeployCreateEmailRoutingRuleReturn,
  CliCommandsDeployCreateEmailRoutingRuleToken,
  CliCommandsDeployCreateEmailRoutingRuleWorkerName,
  CliCommandsDeployCreateEmailRoutingRuleZoneId,
  CliCommandsDeployDeleteEmailRoutingRuleDeleteData,
  CliCommandsDeployDeleteEmailRoutingRuleDeleteDataErrors,
  CliCommandsDeployDeleteEmailRoutingRuleErrorDetails,
  CliCommandsDeployDeleteEmailRoutingRuleResponse,
  CliCommandsDeployDeleteEmailRoutingRuleReturn,
  CliCommandsDeployDeleteEmailRoutingRuleRuleId,
  CliCommandsDeployDeleteEmailRoutingRuleToken,
  CliCommandsDeployDeleteEmailRoutingRuleZoneId,
  CliCommandsDeployDeployAccountId,
  CliCommandsDeployDeployConfigPath,
  CliCommandsDeployDeployContexts,
  CliCommandsDeployDeployHasEmailContexts,
  CliCommandsDeployDeployInteractive,
  CliCommandsDeployDeployKvNamespaceId,
  CliCommandsDeployDeployProjectRoot,
  CliCommandsDeployDeployResult,
  CliCommandsDeployDeployReturn,
  CliCommandsDeployDeployServers,
  CliCommandsDeployDeploySettings,
  CliCommandsDeployDeployToken,
  CliCommandsDeployDeployWorkerDeployResult,
  CliCommandsDeployDeployWorkerName,
  CliCommandsDeployDeployWorkerProjectRoot,
  CliCommandsDeployDeployWorkerReturn,
  CliCommandsDeployDeployWorkerWranglerTomlPath,
  CliCommandsDeployDeployWranglerTomlPath,
  CliCommandsDeployEnsureKvNamespaceAccountId,
  CliCommandsDeployEnsureKvNamespaceCreateData,
  CliCommandsDeployEnsureKvNamespaceCreateDataErrors,
  CliCommandsDeployEnsureKvNamespaceCreateErrorDetails,
  CliCommandsDeployEnsureKvNamespaceCreateResponse,
  CliCommandsDeployEnsureKvNamespaceExisting,
  CliCommandsDeployEnsureKvNamespaceKvTitle,
  CliCommandsDeployEnsureKvNamespaceListData,
  CliCommandsDeployEnsureKvNamespaceListDataErrors,
  CliCommandsDeployEnsureKvNamespaceListErrorDetails,
  CliCommandsDeployEnsureKvNamespaceListResponse,
  CliCommandsDeployEnsureKvNamespaceReturn,
  CliCommandsDeployEnsureKvNamespaceToken,
  CliCommandsDeployEnsureKvNamespaceWorkerName,
  CliCommandsDeployGetZoneInfoBaseDomain,
  CliCommandsDeployGetZoneInfoCandidates,
  CliCommandsDeployGetZoneInfoData,
  CliCommandsDeployGetZoneInfoFirstResult,
  CliCommandsDeployGetZoneInfoHasResults,
  CliCommandsDeployGetZoneInfoParts,
  CliCommandsDeployGetZoneInfoResponse,
  CliCommandsDeployGetZoneInfoReturn,
  CliCommandsDeployGetZoneInfoToken,
  CliCommandsDeployListEmailRoutingRulesData,
  CliCommandsDeployListEmailRoutingRulesDataErrors,
  CliCommandsDeployListEmailRoutingRulesErrorDetails,
  CliCommandsDeployListEmailRoutingRulesResponse,
  CliCommandsDeployListEmailRoutingRulesReturn,
  CliCommandsDeployListEmailRoutingRulesToken,
  CliCommandsDeployListEmailRoutingRulesZoneId,
  CliCommandsDeployLoadEnvTokenContent,
  CliCommandsDeployLoadEnvTokenEnvValue,
  CliCommandsDeployLoadEnvTokenMatch,
  CliCommandsDeployLoadEnvTokenReturn,
  CliCommandsDeployLoadEnvTokenValue,
  CliCommandsDeployPrintContextSummaryConfigPath,
  CliCommandsDeployPrintContextSummaryContexts,
  CliCommandsDeployPrintContextSummaryReturn,
  CliCommandsDeployPrintContextSummarySettings,
  CliCommandsDeployPromptForApiTokenPromptResult,
  CliCommandsDeployPromptForApiTokenReturn,
  CliCommandsDeployPromptForApiTokenToken,
  CliCommandsDeployPromptForApiTokenValidateValue,
  CliCommandsDeployResolveApiTokenEnvToken,
  CliCommandsDeployResolveApiTokenInteractive,
  CliCommandsDeployResolveApiTokenReturn,
  CliCommandsDeployRunLintLintResult,
  CliCommandsDeployRunLintReturn,
  CliCommandsDeploySaveEnvTokenContent,
  CliCommandsDeploySaveEnvTokenRegex,
  CliCommandsDeploySaveEnvTokenReturn,
  CliCommandsDeploySaveEnvTokenToken,
  CliCommandsDeploySetupEmailRoutingConfigPath,
  CliCommandsDeploySetupEmailRoutingContexts,
  CliCommandsDeploySetupEmailRoutingCreated,
  CliCommandsDeploySetupEmailRoutingDesiredEmails,
  CliCommandsDeploySetupEmailRoutingEmail,
  CliCommandsDeploySetupEmailRoutingEmailContexts,
  CliCommandsDeploySetupEmailRoutingExistingRules,
  CliCommandsDeploySetupEmailRoutingKept,
  CliCommandsDeploySetupEmailRoutingRemoved,
  CliCommandsDeploySetupEmailRoutingReturn,
  CliCommandsDeploySetupEmailRoutingRuleEmail,
  CliCommandsDeploySetupEmailRoutingRuleExists,
  CliCommandsDeploySetupEmailRoutingSettings,
  CliCommandsDeploySetupEmailRoutingToken,
  CliCommandsDeploySetupEmailRoutingWorkerName,
  CliCommandsDeploySetupEmailRoutingWorkerRules,
  CliCommandsDeploySetupEmailRoutingZoneId,
  CliCommandsDeploySetupEmailRoutingZoneInfo,
  CliCommandsDeployVerifyApiTokenData,
  CliCommandsDeployVerifyApiTokenResponse,
  CliCommandsDeployVerifyApiTokenReturn,
  CliCommandsDeployVerifyApiTokenToken,
  CliCommandsDeployVerifyPermissionsAccountId,
  CliCommandsDeployVerifyPermissionsBaseDomain,
  CliCommandsDeployVerifyPermissionsHasEmailContexts,
  CliCommandsDeployVerifyPermissionsHasEmailRouting,
  CliCommandsDeployVerifyPermissionsHasKvStorage,
  CliCommandsDeployVerifyPermissionsHasWorkersRoutes,
  CliCommandsDeployVerifyPermissionsHasWorkersScripts,
  CliCommandsDeployVerifyPermissionsInteractive,
  CliCommandsDeployVerifyPermissionsKvStorageData,
  CliCommandsDeployVerifyPermissionsKvStorageResponse,
  CliCommandsDeployVerifyPermissionsMissing,
  CliCommandsDeployVerifyPermissionsMissingMessage,
  CliCommandsDeployVerifyPermissionsPromptResult,
  CliCommandsDeployVerifyPermissionsReturn,
  CliCommandsDeployVerifyPermissionsToken,
  CliCommandsDeployVerifyPermissionsWorkersRoutesData,
  CliCommandsDeployVerifyPermissionsWorkersRoutesResponse,
  CliCommandsDeployVerifyPermissionsWorkersScriptsData,
  CliCommandsDeployVerifyPermissionsWorkersScriptsResponse,
  CliCommandsDeployVerifyPermissionsZoneId,
  CliCommandsDeployVerifyPermissionsZoneInfo,
} from '../../types/cli/commands/deploy.d.ts';

const CLOUDFLARE_API_BASE = 'https://api.cloudflare.com/client/v4';
const configDir = Bootstrap.getConfigDir(APP_NAME);
const envFilePath = resolve(configDir, '.env');
const ENV_TOKEN_KEY = 'CLOUDFLARE_API_TOKEN';

/**
 * CLI - Commands - Deploy.
 *
 * Orchestrates the full deployment pipeline from authentication
 * through worker deployment and optional email routing setup.
 *
 * @since 2.0.0
 */
async function deploy(configPath: CliCommandsDeployDeployConfigPath, interactive: CliCommandsDeployDeployInteractive = false): CliCommandsDeployDeployReturn {
  // Step 1: Resolve API token.
  Logger.info('Checking authentication...');

  const token: CliCommandsDeployDeployToken = await resolveApiToken(interactive);

  Reflect.set(process.env, ENV_TOKEN_KEY, token);

  Logger.info('Authenticated.');

  // Step 2: Validate config.
  Logger.info('Validating config...');

  const result: CliCommandsDeployDeployResult = validateConfig(configPath);

  if (result['valid'] === false) {
    Logger.error('Config is invalid:');

    for (const error of result['errors']) {
      Logger.error(`  - ${error}`);
    }

    return;
  }

  Logger.info('Config is valid.');

  // Warn if no servers are configured (notifications won't be delivered).
  const servers: CliCommandsDeployDeployServers = listServers(configPath);

  if (servers.length === 0) {
    Logger.warn('No ntfy servers are configured. Notifications will not be sent until at least one server is added.');
  }

  // Step 3: Verify permissions.
  const settings: CliCommandsDeployDeploySettings = getSettings(configPath);

  const workerName: CliCommandsDeployDeployWorkerName = settings['worker_name'];

  const contexts: CliCommandsDeployDeployContexts = listContexts(configPath);

  const hasEmailContexts: CliCommandsDeployDeployHasEmailContexts = contexts.some((context) => context['type'] === 'email');

  Logger.info('Verifying API token permissions...');

  const accountId: CliCommandsDeployDeployAccountId = await verifyPermissions(token, settings['base_domain'], hasEmailContexts, interactive);

  Logger.info('Permissions verified.');

  // Step 3.5: Ensure KV namespace exists.
  Logger.info('Ensuring KV namespace...');

  const kvNamespaceId: CliCommandsDeployDeployKvNamespaceId = await ensureKvNamespace(token, accountId, workerName);

  Logger.info('KV namespace ready.');

  // Step 4: Generate wrangler.toml.
  Logger.info('Generating wrangler.toml...');

  const projectRoot: CliCommandsDeployDeployProjectRoot = Bootstrap.getProjectRoot() ?? process.cwd();
  const wranglerTomlPath: CliCommandsDeployDeployWranglerTomlPath = resolve(projectRoot, 'wrangler.toml');

  generateWranglerToml(configPath, wranglerTomlPath, accountId, kvNamespaceId);

  Logger.info('wrangler.toml generated.');

  // Step 5: Lint.
  Logger.info('Running lint...');

  runLint();

  Logger.info('Lint passed.');

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
async function resolveApiToken(interactive: CliCommandsDeployResolveApiTokenInteractive): CliCommandsDeployResolveApiTokenReturn {
  // Check .env first.
  const envToken: CliCommandsDeployResolveApiTokenEnvToken = loadEnvToken();

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
async function verifyApiToken(token: CliCommandsDeployVerifyApiTokenToken): CliCommandsDeployVerifyApiTokenReturn {
  try {
    const response: CliCommandsDeployVerifyApiTokenResponse = await fetch(`${CLOUDFLARE_API_BASE}/user/tokens/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data: CliCommandsDeployVerifyApiTokenData = await response.json<CliCommandsDeployVerifyApiTokenData>();

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
async function verifyPermissions(token: CliCommandsDeployVerifyPermissionsToken, baseDomain: CliCommandsDeployVerifyPermissionsBaseDomain, hasEmailContexts: CliCommandsDeployVerifyPermissionsHasEmailContexts, interactive: CliCommandsDeployVerifyPermissionsInteractive): CliCommandsDeployVerifyPermissionsReturn {
  const zoneInfo: CliCommandsDeployVerifyPermissionsZoneInfo = await getZoneInfo(token, baseDomain);
  const zoneId: CliCommandsDeployVerifyPermissionsZoneId = zoneInfo['zoneId'];
  const accountId: CliCommandsDeployVerifyPermissionsAccountId = zoneInfo['accountId'];

  // Check Workers Scripts (Account level).
  let hasWorkersScripts: CliCommandsDeployVerifyPermissionsHasWorkersScripts = false;

  try {
    const response: CliCommandsDeployVerifyPermissionsWorkersScriptsResponse = await fetch(`${CLOUDFLARE_API_BASE}/accounts/${accountId}/workers/scripts`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data: CliCommandsDeployVerifyPermissionsWorkersScriptsData = await response.json<CliCommandsDeployVerifyPermissionsWorkersScriptsData>();

    hasWorkersScripts = data['success'];
  } catch {
    hasWorkersScripts = false;
  }

  // Check Workers Routes (Zone level).
  let hasWorkersRoutes: CliCommandsDeployVerifyPermissionsHasWorkersRoutes = false;

  try {
    const response: CliCommandsDeployVerifyPermissionsWorkersRoutesResponse = await fetch(`${CLOUDFLARE_API_BASE}/zones/${zoneId}/workers/routes`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data: CliCommandsDeployVerifyPermissionsWorkersRoutesData = await response.json<CliCommandsDeployVerifyPermissionsWorkersRoutesData>();

    hasWorkersRoutes = data['success'];
  } catch {
    hasWorkersRoutes = false;
  }

  // Check Workers KV Storage (Account level).
  let hasKvStorage: CliCommandsDeployVerifyPermissionsHasKvStorage = false;

  try {
    const response: CliCommandsDeployVerifyPermissionsKvStorageResponse = await fetch(`${CLOUDFLARE_API_BASE}/accounts/${accountId}/storage/kv/namespaces?per_page=1`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data: CliCommandsDeployVerifyPermissionsKvStorageData = await response.json<CliCommandsDeployVerifyPermissionsKvStorageData>();

    hasKvStorage = data['success'];
  } catch {
    hasKvStorage = false;
  }

  // Check Email Routing Rules (Zone level).
  let hasEmailRouting: CliCommandsDeployVerifyPermissionsHasEmailRouting = false;

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

  const missing: CliCommandsDeployVerifyPermissionsMissing = [];

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
    const missingMessage: CliCommandsDeployVerifyPermissionsMissingMessage = [
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
  Logger.info('  2. Find your token → ... → Edit');
  Logger.info('  3. Add the missing permissions listed above');
  Logger.info('  4. Click "Continue to summary" then "Update Token"');
  Logger.info('');

  const promptResult: CliCommandsDeployVerifyPermissionsPromptResult = await prompts({
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
async function promptForApiToken(): CliCommandsDeployPromptForApiTokenReturn {
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
  Logger.info('  7. Under Zone Resources, select Specific zone → your base domain');
  Logger.info('  8. Click "Continue to summary" then "Create Token"');
  Logger.info('  9. Copy the generated token');
  Logger.info('');

  const promptResult: CliCommandsDeployPromptForApiTokenPromptResult = await prompts({
    type: 'password',
    name: 'apiToken',
    message: 'Paste your API token:',
    validate: (value: CliCommandsDeployPromptForApiTokenValidateValue) => value.trim().length > 0 || 'Token is required',
  });

  if (promptResult['apiToken'] === undefined) {
    throw new Error('API token is required to deploy.');
  }

  const token: CliCommandsDeployPromptForApiTokenToken = promptResult['apiToken'].trim();

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
function runLint(): CliCommandsDeployRunLintReturn {
  const lintResult: CliCommandsDeployRunLintLintResult = spawnSync('npx', [
    'eslint',
    './src',
  ], {
    encoding: 'utf-8',
    stdio: 'inherit',
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
function deployWorker(): CliCommandsDeployDeployWorkerReturn {
  const projectRoot: CliCommandsDeployDeployWorkerProjectRoot = Bootstrap.getProjectRoot() ?? process.cwd();
  const wranglerTomlPath: CliCommandsDeployDeployWorkerWranglerTomlPath = resolve(projectRoot, 'wrangler.toml');

  const deployResult: CliCommandsDeployDeployWorkerDeployResult = spawnSync('npx', [
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
 * @returns The KV namespace ID.
 *
 * @since 2.0.0
 */
async function ensureKvNamespace(token: CliCommandsDeployEnsureKvNamespaceToken, accountId: CliCommandsDeployEnsureKvNamespaceAccountId, workerName: CliCommandsDeployEnsureKvNamespaceWorkerName): CliCommandsDeployEnsureKvNamespaceReturn {
  const listResponse: CliCommandsDeployEnsureKvNamespaceListResponse = await fetch(`${CLOUDFLARE_API_BASE}/accounts/${accountId}/storage/kv/namespaces?per_page=100`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const listData: CliCommandsDeployEnsureKvNamespaceListData = await listResponse.json<CliCommandsDeployEnsureKvNamespaceListData>();

  if (listData['success'] === false) {
    const listErrors: CliCommandsDeployEnsureKvNamespaceListDataErrors = listData['errors'];
    let listErrorDetails: CliCommandsDeployEnsureKvNamespaceListErrorDetails = 'Unknown error';

    if (listErrors !== undefined) {
      listErrorDetails = listErrors.map((e) => `${String(e['code'])}: ${e['message']}`).join(', ');
    }

    throw new Error(`Failed to list KV namespaces: ${listErrorDetails}`);
  }

  const kvTitle: CliCommandsDeployEnsureKvNamespaceKvTitle = `${workerName}-kv`;

  const existing: CliCommandsDeployEnsureKvNamespaceExisting = listData['result'].find((ns) => ns['title'] === kvTitle);

  if (existing !== undefined) {
    return existing['id'];
  }

  const createResponse: CliCommandsDeployEnsureKvNamespaceCreateResponse = await fetch(`${CLOUDFLARE_API_BASE}/accounts/${accountId}/storage/kv/namespaces`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: kvTitle }),
  });

  const createData: CliCommandsDeployEnsureKvNamespaceCreateData = await createResponse.json<CliCommandsDeployEnsureKvNamespaceCreateData>();

  if (createData['success'] === false) {
    const createErrors: CliCommandsDeployEnsureKvNamespaceCreateDataErrors = createData['errors'];
    let createErrorDetails: CliCommandsDeployEnsureKvNamespaceCreateErrorDetails = 'Unknown error';

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
async function getZoneInfo(token: CliCommandsDeployGetZoneInfoToken, baseDomain: CliCommandsDeployGetZoneInfoBaseDomain): CliCommandsDeployGetZoneInfoReturn {
  /*
   * Try progressively shorter domain segments to find the zone.
   * e.g., "ntfy.example.co.uk" → try "ntfy.example.co.uk", then "example.co.uk", then "co.uk".
   */
  const parts: CliCommandsDeployGetZoneInfoParts = baseDomain.split('.');
  const candidates: CliCommandsDeployGetZoneInfoCandidates = parts.slice(0, parts.length - 1).map((_unused, i) => parts.slice(i).join('.'));

  for (const candidate of candidates) {
    const response: CliCommandsDeployGetZoneInfoResponse = await fetch(`${CLOUDFLARE_API_BASE}/zones?name=${candidate}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data: CliCommandsDeployGetZoneInfoData = await response.json<CliCommandsDeployGetZoneInfoData>();

    const hasResults: CliCommandsDeployGetZoneInfoHasResults = data['success'] === true
      && data['result'].length > 0;

    let firstResult: CliCommandsDeployGetZoneInfoFirstResult = undefined;

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
async function listEmailRoutingRules(token: CliCommandsDeployListEmailRoutingRulesToken, zoneId: CliCommandsDeployListEmailRoutingRulesZoneId): CliCommandsDeployListEmailRoutingRulesReturn {
  const response: CliCommandsDeployListEmailRoutingRulesResponse = await fetch(`${CLOUDFLARE_API_BASE}/zones/${zoneId}/email/routing/rules`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data: CliCommandsDeployListEmailRoutingRulesData = await response.json<CliCommandsDeployListEmailRoutingRulesData>();

  if (data['success'] === false) {
    const dataErrors: CliCommandsDeployListEmailRoutingRulesDataErrors = data['errors'];
    let errorDetails: CliCommandsDeployListEmailRoutingRulesErrorDetails = 'Unknown error';

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
async function createEmailRoutingRule(token: CliCommandsDeployCreateEmailRoutingRuleToken, zoneId: CliCommandsDeployCreateEmailRoutingRuleZoneId, email: CliCommandsDeployCreateEmailRoutingRuleEmail, contextId: CliCommandsDeployCreateEmailRoutingRuleContextId, workerName: CliCommandsDeployCreateEmailRoutingRuleWorkerName): CliCommandsDeployCreateEmailRoutingRuleReturn {
  const response: CliCommandsDeployCreateEmailRoutingRuleResponse = await fetch(`${CLOUDFLARE_API_BASE}/zones/${zoneId}/email/routing/rules`, {
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

  const createData: CliCommandsDeployCreateEmailRoutingRuleCreateData = await response.json<CliCommandsDeployCreateEmailRoutingRuleCreateData>();

  if (createData['success'] === false) {
    const createErrors: CliCommandsDeployCreateEmailRoutingRuleCreateDataErrors = createData['errors'];
    let errorDetails: CliCommandsDeployCreateEmailRoutingRuleErrorDetails = 'Unknown error';

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
async function deleteEmailRoutingRule(token: CliCommandsDeployDeleteEmailRoutingRuleToken, zoneId: CliCommandsDeployDeleteEmailRoutingRuleZoneId, ruleId: CliCommandsDeployDeleteEmailRoutingRuleRuleId): CliCommandsDeployDeleteEmailRoutingRuleReturn {
  const response: CliCommandsDeployDeleteEmailRoutingRuleResponse = await fetch(`${CLOUDFLARE_API_BASE}/zones/${zoneId}/email/routing/rules/${ruleId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  const deleteData: CliCommandsDeployDeleteEmailRoutingRuleDeleteData = await response.json<CliCommandsDeployDeleteEmailRoutingRuleDeleteData>();

  if (deleteData['success'] === false) {
    const deleteErrors: CliCommandsDeployDeleteEmailRoutingRuleDeleteDataErrors = deleteData['errors'];
    let errorDetails: CliCommandsDeployDeleteEmailRoutingRuleErrorDetails = 'Unknown error';

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
function loadEnvToken(): CliCommandsDeployLoadEnvTokenReturn {
  const envValue: CliCommandsDeployLoadEnvTokenEnvValue = process.env[ENV_TOKEN_KEY];

  if (envValue !== undefined && envValue !== '') {
    return envValue;
  }

  if (existsSync(envFilePath) === false) {
    return undefined;
  }

  const content: CliCommandsDeployLoadEnvTokenContent = readFileSync(envFilePath, 'utf-8');

  const match: CliCommandsDeployLoadEnvTokenMatch = content.match(new RegExp(`^${ENV_TOKEN_KEY}=(.+)$`, 'm'));

  if (match === null || match[1] === undefined) {
    return undefined;
  }

  const value: CliCommandsDeployLoadEnvTokenValue = match[1].trim().replace(new RegExp(LIB_REGEX_SURROUNDING_QUOTES.source, 'g'), '');

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
function saveEnvToken(token: CliCommandsDeploySaveEnvTokenToken): CliCommandsDeploySaveEnvTokenReturn {
  if (existsSync(envFilePath) === true) {
    let content: CliCommandsDeploySaveEnvTokenContent = readFileSync(envFilePath, 'utf-8');

    const regex: CliCommandsDeploySaveEnvTokenRegex = new RegExp(`^${ENV_TOKEN_KEY}=.*$`, 'm');

    if (regex.test(content) === true) {
      content = content.replace(regex, `${ENV_TOKEN_KEY}=${token}`);
    } else {
      content = [
        content.trimEnd(),
        `${ENV_TOKEN_KEY}=${token}`,
        '',
      ].join('\n');
    }

    writeFileSync(envFilePath, content);
  } else {
    writeFileSync(envFilePath, `${ENV_TOKEN_KEY}=${token}\n`);
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
async function setupEmailRouting(configPath: CliCommandsDeploySetupEmailRoutingConfigPath, token: CliCommandsDeploySetupEmailRoutingToken): CliCommandsDeploySetupEmailRoutingReturn {
  const contexts: CliCommandsDeploySetupEmailRoutingContexts = listContexts(configPath);

  const emailContexts: CliCommandsDeploySetupEmailRoutingEmailContexts = contexts.filter((context) => context['type'] === 'email');

  if (emailContexts.length === 0) {
    return;
  }

  Logger.info('Setting up email routing...');

  const settings: CliCommandsDeploySetupEmailRoutingSettings = getSettings(configPath);

  const workerName: CliCommandsDeploySetupEmailRoutingWorkerName = settings['worker_name'];

  const zoneInfo: CliCommandsDeploySetupEmailRoutingZoneInfo = await getZoneInfo(token, settings['base_domain']);

  const zoneId: CliCommandsDeploySetupEmailRoutingZoneId = zoneInfo['zoneId'];

  const existingRules: CliCommandsDeploySetupEmailRoutingExistingRules = await listEmailRoutingRules(token, zoneId);

  const workerRules: CliCommandsDeploySetupEmailRoutingWorkerRules = existingRules.filter((rule) => {
    return rule['actions'].some((action) => action['type'] === 'worker' && action['value'].includes(workerName));
  });

  const desiredEmails: CliCommandsDeploySetupEmailRoutingDesiredEmails = new Set(emailContexts.map((context) => `${context['id']}@${settings['base_domain']}`));

  let created: CliCommandsDeploySetupEmailRoutingCreated = 0;
  let kept: CliCommandsDeploySetupEmailRoutingKept = 0;
  let removed: CliCommandsDeploySetupEmailRoutingRemoved = 0;

  // Create missing rules.
  for (const context of emailContexts) {
    const email: CliCommandsDeploySetupEmailRoutingEmail = `${context['id']}@${settings['base_domain']}`;

    const ruleExists: CliCommandsDeploySetupEmailRoutingRuleExists = workerRules.some((rule) => {
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
    const ruleEmail: CliCommandsDeploySetupEmailRoutingRuleEmail = rule['matchers'].find((matcher) => matcher['type'] === 'literal' && matcher['field'] === 'to');

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
function printContextSummary(configPath: CliCommandsDeployPrintContextSummaryConfigPath): CliCommandsDeployPrintContextSummaryReturn {
  const contexts: CliCommandsDeployPrintContextSummaryContexts = listContexts(configPath);

  const settings: CliCommandsDeployPrintContextSummarySettings = getSettings(configPath);

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

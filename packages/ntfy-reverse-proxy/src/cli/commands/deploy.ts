import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { Bootstrap, Logger } from '@cbnventures/nova/toolkit';
import chalk from 'chalk';
import prompts from 'prompts';

import { Runner as CloudflareClient } from '../../lib/cloudflare.js';
import { APP_NAME } from '../../lib/item.js';
import { getWranglerCliPath } from '../../lib/package-runtime.js';
import { Runner as PublicDnsAdapter } from '../../lib/public-dns.js';
import { LIB_REGEX_SURROUNDING_QUOTES } from '../../lib/regex.js';
import { formatAllowedFrom, listContexts } from './context.js';
import { generateWranglerToml, getWranglerTomlPath } from './generate.js';
import { listServers } from './server.js';
import { getSettings } from './settings.js';
import { validateConfig } from './validate.js';

import type {
  Cli_Commands_Deploy_CheckReadiness_AttachedHostnames,
  Cli_Commands_Deploy_CheckReadiness_Contexts,
  Cli_Commands_Deploy_CheckReadiness_Domains,
  Cli_Commands_Deploy_CheckReadiness_ErrorMessage,
  Cli_Commands_Deploy_CheckReadiness_HasEmailContexts,
  Cli_Commands_Deploy_CheckReadiness_Hostnames,
  Cli_Commands_Deploy_CheckReadiness_MxHosts,
  Cli_Commands_Deploy_CheckReadiness_PendingRecords,
  Cli_Commands_Deploy_CheckReadiness_Returns,
  Cli_Commands_Deploy_CheckReadiness_Settings,
  Cli_Commands_Deploy_CheckReadiness_Token,
  Cli_Commands_Deploy_CheckReadiness_UnattachedHostnames,
  Cli_Commands_Deploy_CheckReadiness_ZoneInfo,
  Cli_Commands_Deploy_Deploy_AccountId,
  Cli_Commands_Deploy_Deploy_ConfigPath,
  Cli_Commands_Deploy_Deploy_Contexts,
  Cli_Commands_Deploy_Deploy_HasEmailContexts,
  Cli_Commands_Deploy_Deploy_Interactive,
  Cli_Commands_Deploy_Deploy_KvNamespaceId,
  Cli_Commands_Deploy_Deploy_Result,
  Cli_Commands_Deploy_Deploy_Returns,
  Cli_Commands_Deploy_Deploy_Servers,
  Cli_Commands_Deploy_Deploy_Settings,
  Cli_Commands_Deploy_Deploy_Token,
  Cli_Commands_Deploy_Deploy_WorkerName,
  Cli_Commands_Deploy_Deploy_WranglerTomlPath,
  Cli_Commands_Deploy_Deploy_ZoneInfo,
  Cli_Commands_Deploy_DeployWorker_DeployResult,
  Cli_Commands_Deploy_DeployWorker_Returns,
  Cli_Commands_Deploy_DeployWorker_WranglerCliPath,
  Cli_Commands_Deploy_DeployWorker_WranglerTomlPath,
  Cli_Commands_Deploy_EnsureKvNamespace_AccountId,
  Cli_Commands_Deploy_EnsureKvNamespace_AllNamespaces,
  Cli_Commands_Deploy_EnsureKvNamespace_Existing,
  Cli_Commands_Deploy_EnsureKvNamespace_KvTitle,
  Cli_Commands_Deploy_EnsureKvNamespace_Returns,
  Cli_Commands_Deploy_EnsureKvNamespace_Token,
  Cli_Commands_Deploy_EnsureKvNamespace_WorkerName,
  Cli_Commands_Deploy_GetZoneInfo_BaseDomain,
  Cli_Commands_Deploy_GetZoneInfo_Candidates,
  Cli_Commands_Deploy_GetZoneInfo_Parts,
  Cli_Commands_Deploy_GetZoneInfo_Returns,
  Cli_Commands_Deploy_GetZoneInfo_Token,
  Cli_Commands_Deploy_GetZoneInfo_Zone,
  Cli_Commands_Deploy_LoadEnvToken_Content,
  Cli_Commands_Deploy_LoadEnvToken_EnvValue,
  Cli_Commands_Deploy_LoadEnvToken_Match,
  Cli_Commands_Deploy_LoadEnvToken_Returns,
  Cli_Commands_Deploy_LoadEnvToken_Value,
  Cli_Commands_Deploy_PrintContextSummary_AllowedFromText,
  Cli_Commands_Deploy_PrintContextSummary_ConfigPath,
  Cli_Commands_Deploy_PrintContextSummary_Contexts,
  Cli_Commands_Deploy_PrintContextSummary_Returns,
  Cli_Commands_Deploy_PrintContextSummary_SecretPathSuffix,
  Cli_Commands_Deploy_PrintContextSummary_Settings,
  Cli_Commands_Deploy_PromptForApiToken_PromptResult,
  Cli_Commands_Deploy_PromptForApiToken_Returns,
  Cli_Commands_Deploy_PromptForApiToken_Token,
  Cli_Commands_Deploy_ResolveApiToken_EnvToken,
  Cli_Commands_Deploy_ResolveApiToken_Interactive,
  Cli_Commands_Deploy_ResolveApiToken_Returns,
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
  Cli_Commands_Deploy_VerifyPermissions_BaseDomain,
  Cli_Commands_Deploy_VerifyPermissions_HasEmailContexts,
  Cli_Commands_Deploy_VerifyPermissions_Interactive,
  Cli_Commands_Deploy_VerifyPermissions_Missing,
  Cli_Commands_Deploy_VerifyPermissions_MissingMessage,
  Cli_Commands_Deploy_VerifyPermissions_PromptResult,
  Cli_Commands_Deploy_VerifyPermissions_Returns,
  Cli_Commands_Deploy_VerifyPermissions_Token,
  Cli_Commands_Deploy_VerifyPermissions_ZoneInfo,
} from '../../types/cli/commands/deploy.d.ts';

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
 * CLI - Commands - Deploy - Deploy.
 *
 * Orchestrates the full deployment pipeline from authentication
 * through worker deployment and optional email routing setup.
 *
 * @returns {Cli_Commands_Deploy_Deploy_Returns}
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

    process.exitCode = 1;

    return;
  }

  Logger.info('Config is valid.');

  // Warn if no servers are configured (notifications won't be delivered).
  const servers: Cli_Commands_Deploy_Deploy_Servers = listServers(configPath);

  if (servers.length === 0) {
    Logger.warn('No ntfy servers are configured. Notifications will not be sent until at least one server is added.');
  }

  // Step 3: Verify permissions.
  const settings: Cli_Commands_Deploy_Deploy_Settings = getSettings(configPath);

  const workerName: Cli_Commands_Deploy_Deploy_WorkerName = settings['worker_name'];

  const contexts: Cli_Commands_Deploy_Deploy_Contexts = listContexts(configPath);

  const hasEmailContexts: Cli_Commands_Deploy_Deploy_HasEmailContexts = contexts.some((context) => context['type'] === 'email');

  Logger.info('Verifying API token permissions...');

  const zoneInfo: Cli_Commands_Deploy_Deploy_ZoneInfo = await verifyPermissions(token, settings['base_domain'], hasEmailContexts, interactive);
  const accountId: Cli_Commands_Deploy_Deploy_AccountId = zoneInfo['accountId'];

  Logger.info('Permissions verified.');

  // Step 4: Ensure KV namespace exists.
  Logger.info('Ensuring KV namespace...');

  const kvNamespaceId: Cli_Commands_Deploy_Deploy_KvNamespaceId = await ensureKvNamespace(token, accountId, workerName);

  Logger.info('KV namespace ready.');

  // Step 5: Generate wrangler.toml.
  Logger.info('Generating wrangler.toml...');

  const wranglerTomlPath: Cli_Commands_Deploy_Deploy_WranglerTomlPath = getWranglerTomlPath(configPath);

  generateWranglerToml(configPath, wranglerTomlPath, accountId, kvNamespaceId);

  Logger.info(`Generated "wrangler.toml" at "${wranglerTomlPath}".`);

  // Step 6: Deploy worker.
  Logger.info('Deploying worker...');

  deployWorker(wranglerTomlPath);

  Logger.info('Worker deployed.');

  // Step 7: Setup email routing.
  if (hasEmailContexts === true) {
    await setupEmailRouting(configPath, token);
  } else {
    Logger.info('No email contexts found. Skipping email routing setup.');
  }

  // Step 8: Confirm the custom domains and email routing are ready.
  await checkReadiness(token, zoneInfo, settings, contexts);

  // Step 9: Print context summary.
  printContextSummary(configPath);

  // Step 10: Done.
  Logger.info('Deploy complete.');

  return;
}

/**
 * CLI - Commands - Deploy - Resolve API Token.
 *
 * Checks for a saved token in the env file and falls back
 * to an interactive prompt when no valid token is available.
 *
 * @returns {Cli_Commands_Deploy_ResolveApiToken_Returns}
 *
 * @since 2.0.0
 */
async function resolveApiToken(interactive: Cli_Commands_Deploy_ResolveApiToken_Interactive): Cli_Commands_Deploy_ResolveApiToken_Returns {
  // Check .env first.
  const envToken: Cli_Commands_Deploy_ResolveApiToken_EnvToken = loadEnvToken();

  if (envToken !== undefined) {
    if (await CloudflareClient.verifyToken(envToken) === true) {
      return envToken;
    }

    if (interactive === false) {
      throw new Error('API token in .env is invalid or expired. Update the CLOUDFLARE_API_TOKEN value in your .env file.');
    }

    Logger.warn('Saved API token in .env is invalid or expired.');
  } else {
    if (interactive === false) {
      throw new Error('No API token found. Create a .env file with CLOUDFLARE_API_TOKEN=<your-token> or run the CLI without a command for guided setup.');
    }

    Logger.warn('No API token found. Let\'s set one up.');
  }

  // Prompt for a new token.
  return promptForApiToken();
}

/**
 * CLI - Commands - Deploy - Verify Permissions.
 *
 * Probes the Cloudflare API for each required permission scope
 * and prompts the user to fix missing ones before continuing.
 *
 * @returns {Cli_Commands_Deploy_VerifyPermissions_Returns}
 *
 * @since 2.0.0
 */
async function verifyPermissions(token: Cli_Commands_Deploy_VerifyPermissions_Token, baseDomain: Cli_Commands_Deploy_VerifyPermissions_BaseDomain, hasEmailContexts: Cli_Commands_Deploy_VerifyPermissions_HasEmailContexts, interactive: Cli_Commands_Deploy_VerifyPermissions_Interactive): Cli_Commands_Deploy_VerifyPermissions_Returns {
  const zoneInfo: Cli_Commands_Deploy_VerifyPermissions_ZoneInfo = await getZoneInfo(token, baseDomain);
  const missing: Cli_Commands_Deploy_VerifyPermissions_Missing = await CloudflareClient.findMissingPermissions(token, zoneInfo['zoneId'], zoneInfo['accountId'], hasEmailContexts);

  if (missing.length === 0) {
    return zoneInfo;
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
 * @returns {Cli_Commands_Deploy_PromptForApiToken_Returns}
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

  if (await CloudflareClient.verifyToken(token) === false) {
    throw new Error('API token is invalid. Please check the token and try again.');
  }

  saveEnvToken(token);

  Logger.info('API token saved to .env file.');

  return token;
}

/**
 * CLI - Commands - Deploy - Worker.
 *
 * Spawns the Wrangler deploy process with the generated
 * configuration file and aborts on non-zero exit codes.
 *
 * @param {Cli_Commands_Deploy_DeployWorker_WranglerTomlPath} wranglerTomlPath - Wrangler toml path.
 *
 * @returns {Cli_Commands_Deploy_DeployWorker_Returns}
 *
 * @since 2.0.0
 */
function deployWorker(wranglerTomlPath: Cli_Commands_Deploy_DeployWorker_WranglerTomlPath): Cli_Commands_Deploy_DeployWorker_Returns {
  const wranglerCliPath: Cli_Commands_Deploy_DeployWorker_WranglerCliPath = getWranglerCliPath();
  const deployResult: Cli_Commands_Deploy_DeployWorker_DeployResult = spawnSync(process.execPath, [
    wranglerCliPath,
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
  const allNamespaces: Cli_Commands_Deploy_EnsureKvNamespace_AllNamespaces = await CloudflareClient.listKvNamespaces(token, accountId);
  const kvTitle: Cli_Commands_Deploy_EnsureKvNamespace_KvTitle = `${workerName}-kv`;

  const existing: Cli_Commands_Deploy_EnsureKvNamespace_Existing = allNamespaces.find((ns) => ns['title'] === kvTitle);

  if (existing !== undefined) {
    return existing['id'];
  }

  return CloudflareClient.createKvNamespace(token, accountId, kvTitle);
}

/**
 * CLI - Commands - Deploy - Get Zone Info.
 *
 * Walks progressively shorter domain segments to find the
 * matching Cloudflare zone and returns its ID and account ID.
 *
 * @returns {Cli_Commands_Deploy_GetZoneInfo_Returns}
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
    const zone: Cli_Commands_Deploy_GetZoneInfo_Zone = await CloudflareClient.findZone(token, candidate);

    if (zone !== undefined) {
      return zone;
    }
  }

  throw new Error(`Failed to find Cloudflare zone for "${baseDomain}". Is the domain added to your Cloudflare account?`);
}

/**
 * CLI - Commands - Deploy - Load Env Token.
 *
 * Reads the local env file and extracts the Cloudflare API
 * token value, stripping surrounding quotes if present.
 *
 * @returns {Cli_Commands_Deploy_LoadEnvToken_Returns}
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
 * @returns {Cli_Commands_Deploy_SaveEnvToken_Returns}
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
 * @returns {Cli_Commands_Deploy_SetupEmailRouting_Returns}
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

  const existingRules: Cli_Commands_Deploy_SetupEmailRouting_ExistingRules = await CloudflareClient.listEmailRoutingRules(token, zoneId);

  const workerRules: Cli_Commands_Deploy_SetupEmailRouting_WorkerRules = existingRules.filter((rule) => rule['workerNames'].includes(workerName));

  const desiredEmails: Cli_Commands_Deploy_SetupEmailRouting_DesiredEmails = new Set(emailContexts.map((context) => `${context['id']}@${settings['base_domain']}`));

  let created: Cli_Commands_Deploy_SetupEmailRouting_Created = 0;
  let kept: Cli_Commands_Deploy_SetupEmailRouting_Kept = 0;
  let removed: Cli_Commands_Deploy_SetupEmailRouting_Removed = 0;

  // Create missing rules.
  for (const context of emailContexts) {
    const email: Cli_Commands_Deploy_SetupEmailRouting_Email = `${context['id']}@${settings['base_domain']}`;

    const ruleExists: Cli_Commands_Deploy_SetupEmailRouting_RuleExists = workerRules.some((rule) => rule['toAddresses'].includes(email));

    if (ruleExists === true) {
      kept += 1;
    } else {
      await CloudflareClient.createEmailRoutingRule(token, zoneId, email, `${workerName}: ${context['id']}`, workerName);

      created += 1;
    }
  }

  // Remove stale rules.
  for (const rule of workerRules) {
    const ruleEmail: Cli_Commands_Deploy_SetupEmailRouting_RuleEmail = rule['toAddresses'][0];

    if (ruleEmail !== undefined && desiredEmails.has(ruleEmail) === false) {
      await CloudflareClient.deleteEmailRoutingRule(token, zoneId, rule['id']);

      removed += 1;
    }
  }

  Logger.info(`Email routing: ${String(created)} created, ${String(kept)} kept, ${String(removed)} removed.`);

  return;
}

/**
 * CLI - Commands - Deploy - Check Readiness.
 *
 * Confirms each HTTP context's custom domain is attached to the Worker and
 * resolves on public DNS, and that email contexts' domain uses Email Routing.
 *
 * @param {Cli_Commands_Deploy_CheckReadiness_Token}    token    - Token.
 * @param {Cli_Commands_Deploy_CheckReadiness_ZoneInfo} zoneInfo - Zone info.
 * @param {Cli_Commands_Deploy_CheckReadiness_Settings} settings - Settings.
 * @param {Cli_Commands_Deploy_CheckReadiness_Contexts} contexts - Contexts.
 *
 * @returns {Cli_Commands_Deploy_CheckReadiness_Returns}
 *
 * @since 2.5.0
 */
async function checkReadiness(token: Cli_Commands_Deploy_CheckReadiness_Token, zoneInfo: Cli_Commands_Deploy_CheckReadiness_ZoneInfo, settings: Cli_Commands_Deploy_CheckReadiness_Settings, contexts: Cli_Commands_Deploy_CheckReadiness_Contexts): Cli_Commands_Deploy_CheckReadiness_Returns {
  const hostnames: Cli_Commands_Deploy_CheckReadiness_Hostnames = contexts.filter((context) => context['type'] === 'http').map((context) => `${context['id']}.${settings['base_domain']}`);
  const hasEmailContexts: Cli_Commands_Deploy_CheckReadiness_HasEmailContexts = contexts.some((context) => context['type'] === 'email');

  if (hostnames.length > 0) {
    Logger.info('Checking custom domains...');

    try {
      const domains: Cli_Commands_Deploy_CheckReadiness_Domains = await CloudflareClient.listWorkerDomains(token, zoneInfo['accountId'], zoneInfo['zoneId']);
      const attachedHostnames: Cli_Commands_Deploy_CheckReadiness_AttachedHostnames = hostnames.filter((hostname) => domains.some((domain) => domain['hostname'] === hostname && domain['workerName'] === settings['worker_name']));
      const unattachedHostnames: Cli_Commands_Deploy_CheckReadiness_UnattachedHostnames = hostnames.filter((hostname) => attachedHostnames.includes(hostname) === false);

      for (const unattachedHostname of unattachedHostnames) {
        Logger.warn(`"${unattachedHostname}" is not attached to the "${settings['worker_name']}" Worker. Check Workers & Pages > ${settings['worker_name']} > Settings > Domains & Routes in the Cloudflare dashboard.`);
      }

      const pendingRecords: Cli_Commands_Deploy_CheckReadiness_PendingRecords = await PublicDnsAdapter.findPendingRecords(attachedHostnames.map((attachedHostname) => ({
        type: 'A',
        name: attachedHostname,
        content: undefined,
      })));

      if (pendingRecords.length > 0) {
        Logger.warn(`These custom domains don't resolve on public DNS yet: ${pendingRecords.join(', ')}. Their contexts start receiving once they do; deploy again later to check.`);
      } else if (unattachedHostnames.length === 0) {
        Logger.info('Custom domains are attached to the Worker and resolve publicly.');
      }
    } catch (error) {
      const errorMessage: Cli_Commands_Deploy_CheckReadiness_ErrorMessage = (error instanceof Error) ? error['message'] : String(error);

      Logger.warn(`Could not read the Worker's custom domains from Cloudflare, so whether they are ready is unknown. (${errorMessage})`);
    }
  }

  if (hasEmailContexts === true) {
    Logger.info('Checking email routing...');

    const mxHosts: Cli_Commands_Deploy_CheckReadiness_MxHosts = await PublicDnsAdapter.lookup(settings['base_domain'], 'MX');

    if (mxHosts.some((mxHost) => CloudflareClient.isEmailRoutingMxHost(mxHost.split(' ').at(-1) ?? '') === true) === true) {
      Logger.info(`"${settings['base_domain']}" receives mail through Cloudflare Email Routing.`);
    } else {
      Logger.warn(`"${settings['base_domain']}" has no MX records pointing at Cloudflare Email Routing on public DNS, so email contexts won't receive mail. Turn on Email Routing for it in the Cloudflare dashboard.`);
    }
  }

  return;
}

/**
 * CLI - Commands - Deploy - Print Context Summary.
 *
 * Logs a formatted overview of all configured contexts
 * with their URLs or email addresses for quick reference.
 *
 * @returns {Cli_Commands_Deploy_PrintContextSummary_Returns}
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
      const secretPathSuffix: Cli_Commands_Deploy_PrintContextSummary_SecretPathSuffix = (context['secret_path'] !== undefined) ? `/${context['secret_path']}` : '';

      process.stdout.write(`    URL:   ${chalk.green(`https://${context['id']}.${settings['base_domain']}${secretPathSuffix}`)}\n`);

      if (context['token'] !== undefined) {
        process.stdout.write(`    Token: ${chalk.gray(context['token'])}\n`);
      }
    } else {
      process.stdout.write(`    Email: ${chalk.green(`${context['id']}@${settings['base_domain']}`)}\n`);

      if (context['allowed_from'] !== undefined) {
        const allowedFromText: Cli_Commands_Deploy_PrintContextSummary_AllowedFromText = formatAllowedFrom(context['allowed_from']);

        process.stdout.write(`    Allow: ${chalk.gray(allowedFromText)}\n`);
      }
    }

    process.stdout.write('\n');
  }

  return;
}

export {
  checkReadiness,
  deploy,
};

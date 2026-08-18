import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

import { Bootstrap } from '@cbnventures/nova/toolkit';

import { configSchema } from '../../lib/schema.js';
import { loadConfig } from './config-io.js';

import type {
  Cli_Commands_Generate_DefaultWranglerTomlPath,
  Cli_Commands_Generate_GenerateWranglerToml_AccountId,
  Cli_Commands_Generate_GenerateWranglerToml_CompatibilityDate,
  Cli_Commands_Generate_GenerateWranglerToml_Config,
  Cli_Commands_Generate_GenerateWranglerToml_ConfigPath,
  Cli_Commands_Generate_GenerateWranglerToml_Contexts,
  Cli_Commands_Generate_GenerateWranglerToml_ContextsJson,
  Cli_Commands_Generate_GenerateWranglerToml_EmailContexts,
  Cli_Commands_Generate_GenerateWranglerToml_HttpContexts,
  Cli_Commands_Generate_GenerateWranglerToml_KvNamespaceId,
  Cli_Commands_Generate_GenerateWranglerToml_Lines,
  Cli_Commands_Generate_GenerateWranglerToml_OutputDir,
  Cli_Commands_Generate_GenerateWranglerToml_OutputPath,
  Cli_Commands_Generate_GenerateWranglerToml_Returns,
  Cli_Commands_Generate_GenerateWranglerToml_RouteLines,
  Cli_Commands_Generate_GenerateWranglerToml_Servers,
  Cli_Commands_Generate_GenerateWranglerToml_ServersJson,
  Cli_Commands_Generate_GenerateWranglerToml_Settings,
  Cli_Commands_Generate_GenerateWranglerToml_SettingsJson,
  Cli_Commands_Generate_ProjectRoot,
} from '../../types/cli/commands/generate.d.ts';

/**
 * CLI - Commands - Generate - Project Root.
 *
 * Absolute path to the resolved project root, falling back to
 * the current working directory when no root can be detected.
 *
 * @since 2.1.0
 */
const projectRoot: Cli_Commands_Generate_ProjectRoot = Bootstrap.getProjectRoot() ?? process.cwd();

/**
 * CLI - Commands - Generate - Default Wrangler Toml Path.
 *
 * Absolute path to the wrangler.toml written at the project
 * root when no explicit output path is passed to the command.
 *
 * @since 2.1.0
 */
const defaultWranglerTomlPath: Cli_Commands_Generate_DefaultWranglerTomlPath = resolve(projectRoot, 'wrangler.toml');

/**
 * CLI - Commands - Generate - Wrangler Toml.
 *
 * Builds a wrangler.toml from the current config by mapping servers,
 * contexts, and settings into Cloudflare Workers configuration format.
 *
 * @since 2.0.0
 */
function generateWranglerToml(configPath: Cli_Commands_Generate_GenerateWranglerToml_ConfigPath, outputPath: Cli_Commands_Generate_GenerateWranglerToml_OutputPath = defaultWranglerTomlPath, accountId?: Cli_Commands_Generate_GenerateWranglerToml_AccountId, kvNamespaceId?: Cli_Commands_Generate_GenerateWranglerToml_KvNamespaceId): Cli_Commands_Generate_GenerateWranglerToml_Returns {
  const config: Cli_Commands_Generate_GenerateWranglerToml_Config = configSchema.parse(loadConfig(configPath));
  const settings: Cli_Commands_Generate_GenerateWranglerToml_Settings = config['settings'];
  const servers: Cli_Commands_Generate_GenerateWranglerToml_Servers = config['servers'];
  const contexts: Cli_Commands_Generate_GenerateWranglerToml_Contexts = config['contexts'];
  const compatibilityDate: Cli_Commands_Generate_GenerateWranglerToml_CompatibilityDate = new Date().toISOString().slice(0, 10);

  const httpContexts: Cli_Commands_Generate_GenerateWranglerToml_HttpContexts = contexts.filter((context) => context['type'] === 'http');
  const emailContexts: Cli_Commands_Generate_GenerateWranglerToml_EmailContexts = contexts.filter((context) => context['type'] === 'email');

  const routeLines: Cli_Commands_Generate_GenerateWranglerToml_RouteLines = httpContexts.map((context) => {
    return `  { pattern = "${context['id']}.${settings['base_domain']}", custom_domain = true },`;
  });

  const lines: Cli_Commands_Generate_GenerateWranglerToml_Lines = [
    `name = "${settings['worker_name']}"`,
    'main = "packages/ntfy-reverse-proxy/build/src/worker/index.js"',
    `compatibility_date = "${compatibilityDate}"`,
    ...((accountId !== undefined) ? [`account_id = "${accountId}"`] : []),
    '',
    '################',
    '#### Routes ####',
    '################',
    'routes = [',
    ...routeLines,
    ']',
  ];

  if (emailContexts['length'] > 0) {
    lines.push('');
    lines.push('#######################');
    lines.push('#### Email Routing ####');
    lines.push('#######################');
    lines.push('# Configure these email addresses in Cloudflare Email Routing:');

    for (const context of emailContexts) {
      lines.push(`# - ${context['id']}@${settings['base_domain']} -> Worker`);
    }
  }

  lines.push('');
  lines.push('##############');
  lines.push('#### Vars ####');
  lines.push('##############');
  lines.push('[vars]');

  const settingsJson: Cli_Commands_Generate_GenerateWranglerToml_SettingsJson = JSON.stringify(settings);

  lines.push(`SETTINGS = ${JSON.stringify(settingsJson)}`);

  const serversJson: Cli_Commands_Generate_GenerateWranglerToml_ServersJson = JSON.stringify(servers);

  lines.push(`SERVERS = ${JSON.stringify(serversJson)}`);

  const contextsJson: Cli_Commands_Generate_GenerateWranglerToml_ContextsJson = JSON.stringify(contexts);

  lines.push(`CONTEXTS = ${JSON.stringify(contextsJson)}`);

  if (kvNamespaceId !== undefined) {
    lines.push('');
    lines.push('########################');
    lines.push('#### KV Namespaces ####');
    lines.push('########################');
    lines.push('[[kv_namespaces]]');
    lines.push('binding = "KV"');
    lines.push(`id = "${kvNamespaceId}"`);
  }

  const outputDir: Cli_Commands_Generate_GenerateWranglerToml_OutputDir = dirname(outputPath);

  mkdirSync(outputDir, { recursive: true });

  writeFileSync(outputPath, `${lines.join('\n')}\n`);

  return;
}

export {
  generateWranglerToml,
};

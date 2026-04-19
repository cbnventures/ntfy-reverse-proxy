import { mkdirSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';

import { Bootstrap } from '@cbnventures/nova/toolkit';

import { configSchema } from '../../lib/schema.js';
import { loadConfig } from './config-io.js';

import type {
  CliCommandsGenerateGenerateWranglerTomlAccountId,
  CliCommandsGenerateGenerateWranglerTomlCompatibilityDate,
  CliCommandsGenerateGenerateWranglerTomlConfig,
  CliCommandsGenerateGenerateWranglerTomlConfigPath,
  CliCommandsGenerateGenerateWranglerTomlContexts,
  CliCommandsGenerateGenerateWranglerTomlContextsJson,
  CliCommandsGenerateGenerateWranglerTomlDefaultPath,
  CliCommandsGenerateGenerateWranglerTomlEmailContexts,
  CliCommandsGenerateGenerateWranglerTomlHttpContexts,
  CliCommandsGenerateGenerateWranglerTomlKvNamespaceId,
  CliCommandsGenerateGenerateWranglerTomlLines,
  CliCommandsGenerateGenerateWranglerTomlOutputDir,
  CliCommandsGenerateGenerateWranglerTomlOutputPath,
  CliCommandsGenerateGenerateWranglerTomlProjectRoot,
  CliCommandsGenerateGenerateWranglerTomlReturn,
  CliCommandsGenerateGenerateWranglerTomlRouteLines,
  CliCommandsGenerateGenerateWranglerTomlServers,
  CliCommandsGenerateGenerateWranglerTomlServersJson,
  CliCommandsGenerateGenerateWranglerTomlSettings,
  CliCommandsGenerateGenerateWranglerTomlSettingsJson,
} from '../../types/cli/commands/generate.d.ts';

const projectRoot: CliCommandsGenerateGenerateWranglerTomlProjectRoot = Bootstrap.getProjectRoot() ?? process.cwd();
const defaultWranglerTomlPath: CliCommandsGenerateGenerateWranglerTomlDefaultPath = resolve(projectRoot, 'wrangler.toml');

/**
 * CLI - Commands - Generate - Wrangler Toml.
 *
 * Builds a wrangler.toml from the current config by mapping servers,
 * contexts, and settings into Cloudflare Workers configuration format.
 *
 * @since 2.0.0
 */
function generateWranglerToml(configPath: CliCommandsGenerateGenerateWranglerTomlConfigPath, outputPath: CliCommandsGenerateGenerateWranglerTomlOutputPath = defaultWranglerTomlPath, accountId?: CliCommandsGenerateGenerateWranglerTomlAccountId, kvNamespaceId?: CliCommandsGenerateGenerateWranglerTomlKvNamespaceId): CliCommandsGenerateGenerateWranglerTomlReturn {
  const config: CliCommandsGenerateGenerateWranglerTomlConfig = configSchema.parse(loadConfig(configPath));
  const settings: CliCommandsGenerateGenerateWranglerTomlSettings = config['settings'];
  const servers: CliCommandsGenerateGenerateWranglerTomlServers = config['servers'];
  const contexts: CliCommandsGenerateGenerateWranglerTomlContexts = config['contexts'];
  const compatibilityDate: CliCommandsGenerateGenerateWranglerTomlCompatibilityDate = new Date().toISOString().slice(0, 10);

  const httpContexts: CliCommandsGenerateGenerateWranglerTomlHttpContexts = contexts.filter((context) => context['type'] === 'http');
  const emailContexts: CliCommandsGenerateGenerateWranglerTomlEmailContexts = contexts.filter((context) => context['type'] === 'email');

  const routeLines: CliCommandsGenerateGenerateWranglerTomlRouteLines = httpContexts.map((context) => {
    return `  { pattern = "${context['id']}.${settings['base_domain']}", custom_domain = true },`;
  });

  const lines: CliCommandsGenerateGenerateWranglerTomlLines = [
    `name = "${settings['worker_name']}"`,
    'main = "packages/ntfy-reverse-proxy/build/src/worker/index.js"',
    `compatibility_date = "${compatibilityDate}"`,
    ...(accountId !== undefined ? [`account_id = "${accountId}"`] : []),
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

  const settingsJson: CliCommandsGenerateGenerateWranglerTomlSettingsJson = JSON.stringify(settings);

  lines.push(`SETTINGS = ${JSON.stringify(settingsJson)}`);

  const serversJson: CliCommandsGenerateGenerateWranglerTomlServersJson = JSON.stringify(servers);

  lines.push(`SERVERS = ${JSON.stringify(serversJson)}`);

  const contextsJson: CliCommandsGenerateGenerateWranglerTomlContextsJson = JSON.stringify(contexts);

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

  const outputDir: CliCommandsGenerateGenerateWranglerTomlOutputDir = dirname(outputPath);

  mkdirSync(outputDir, { recursive: true });

  writeFileSync(outputPath, `${lines.join('\n')}\n`);

  return;
}

export {
  generateWranglerToml,
};

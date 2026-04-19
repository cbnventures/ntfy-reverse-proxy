import { spawn } from 'child_process';
import { createInterface } from 'readline';
import {
  existsSync, mkdirSync, readFileSync, writeFileSync,
} from 'fs';
import { homedir, platform } from 'os';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const APP_NAME = 'ntfy-reverse-proxy';

/**
 * Scripts - Dev Worker - Get Xdg Config Dir.
 *
 * @since 2.0.0
 */
function getXdgConfigDir() {
  if (platform() === 'win32') {
    return join(process.env['APPDATA'] ?? join(homedir(), 'AppData', 'Roaming'), APP_NAME);
  }

  return join(process.env['XDG_CONFIG_HOME'] ?? join(homedir(), '.config'), APP_NAME);
}

/**
 * Scripts - Dev Worker - Prompt Choice.
 *
 * @since 2.0.0
 */
function promptChoice(localPath, xdgPath) {
  return new Promise((promiseResolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.info('');
    console.info('Found wrangler.toml in two locations:');
    console.info(`  1. Local: ${localPath}`);
    console.info(`  2. XDG:   ${xdgPath}`);
    console.info('');

    rl.question('Which one? (1 or 2): ', (answer) => {
      rl.close();

      const trimmed = answer.trim();

      if (trimmed === '1') {
        console.info(`Using local wrangler.toml: ${localPath}`);

        promiseResolve(localPath);

        return;
      }

      if (trimmed === '2') {
        console.info(`Using XDG wrangler.toml: ${xdgPath}`);

        promiseResolve(xdgPath);

        return;
      }

      console.error('Invalid choice. Exiting.');
      process.exit(1);
    });
  });
}

/**
 * Scripts - Dev Worker - Resolve Config Json.
 *
 * Searches for config.json in the local directory, project
 * root, and XDG config directory. Returns the first match.
 *
 * @since 2.0.0
 */
function resolveConfigJson() {
  const localPath = join(PROJECT_ROOT, 'config.json');
  const xdgPath = join(getXdgConfigDir(), 'config.json');

  if (existsSync(localPath) === true) {
    return localPath;
  }

  if (existsSync(xdgPath) === true) {
    return xdgPath;
  }

  return undefined;
}

/**
 * Scripts - Dev Worker - Generate Wrangler Toml.
 *
 * Reads config.json and writes a wrangler.toml file
 * with routes and vars derived from the configuration.
 *
 * @since 2.0.0
 */
function generateWranglerToml(configJsonPath, outputPath) {
  const config = JSON.parse(readFileSync(configJsonPath, 'utf-8'));
  const settings = config['settings'];
  const servers = config['servers'];
  const contexts = config['contexts'];
  const compatibilityDate = new Date().toISOString().slice(0, 10);

  const httpContexts = contexts.filter((context) => context['type'] === 'http');
  const emailContexts = contexts.filter((context) => context['type'] === 'email');

  const routeLines = httpContexts.map((context) => {
    return `  { pattern = "${context['id']}.${settings['base_domain']}", custom_domain = true },`;
  });

  const lines = [
    `name = "${settings['worker_name']}"`,
    'main = "packages/ntfy-reverse-proxy/src/worker/index.ts"',
    `compatibility_date = "${compatibilityDate}"`,
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
  lines.push(`SETTINGS = ${JSON.stringify(JSON.stringify(settings))}`);
  lines.push(`SERVERS = ${JSON.stringify(JSON.stringify(servers))}`);
  lines.push(`CONTEXTS = ${JSON.stringify(JSON.stringify(contexts))}`);

  const outputDir = dirname(outputPath);

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, `${lines.join('\n')}\n`);
}

/**
 * Scripts - Dev Worker - Resolve Wrangler Config.
 *
 * Checks for local and XDG wrangler.toml locations.
 * Prompts the developer to choose when both exist.
 *
 * @since 2.0.0
 */
async function resolveWranglerConfig() {
  const localPath = join(PROJECT_ROOT, 'wrangler.toml');
  const xdgPath = join(getXdgConfigDir(), 'wrangler.toml');

  const localExists = existsSync(localPath);
  const xdgExists = existsSync(xdgPath);

  if (localExists === true && xdgExists === true) {
    return promptChoice(localPath, xdgPath);
  }

  if (localExists === true) {
    console.info(`Using local wrangler.toml: ${localPath}`);

    return localPath;
  }

  if (xdgExists === true) {
    console.info(`Using XDG wrangler.toml: ${xdgPath}`);

    return xdgPath;
  }

  const configJsonPath = resolveConfigJson();

  if (configJsonPath === undefined) {
    console.error('No wrangler.toml or config.json found. Copy config.sample.json to config.json and configure it.');
    process.exit(1);
  }

  console.info(`No wrangler.toml found. Generating from ${configJsonPath}...`);

  generateWranglerToml(configJsonPath, localPath);

  console.info(`Generated wrangler.toml: ${localPath}`);

  return localPath;
}

// Main.
const configPath = await resolveWranglerConfig();

const wrangler = spawn('npx', [
  'wrangler',
  'dev',
  '--config',
  configPath,
  '--local-upstream',
  'localhost',
], {
  stdio: 'inherit',
});

wrangler.on('close', (code) => {
  process.exit(code ?? 1);
});

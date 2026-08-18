import { spawn } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';

/**
 * Dev Worker - Toolkit.
 *
 * Holds the toolkit namespace once the guarded dynamic import resolves so
 * the batteries below can be read from a single typed source.
 *
 * @since 2.0.0
 */
let toolkit = /** @type {typeof import('@cbnventures/nova/toolkit') | undefined} */ (undefined);

try {
  toolkit = await import('@cbnventures/nova/toolkit');
} catch {
  process.stderr.write('dev-worker.mjs: requires @cbnventures/nova to be built. Run "npm run build" first.\n');

  process.exit(1);
}

/**
 * Dev Worker - Bootstrap.
 *
 * Holds the toolkit Bootstrap helper once the guarded dynamic import
 * resolves, giving path helpers such as the XDG config directory.
 *
 * @since 2.0.0
 */
const bootstrap = toolkit['Bootstrap'];

/**
 * Dev Worker - Logger.
 *
 * Holds the toolkit Logger once the guarded dynamic import resolves so
 * status and error output share the project logging format.
 *
 * @since 2.0.0
 */
const logger = toolkit['Logger'];

/**
 * Dev Worker - Project Root.
 *
 * Absolute path to the repository root, resolved one level up from this
 * script directory, used to locate config and wrangler files.
 *
 * @since 2.0.0
 */
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Dev Worker - App Name.
 *
 * Application slug passed to the toolkit config-directory helper so XDG
 * lookups resolve under this project's namespace.
 *
 * @since 2.0.0
 */
const APP_NAME = 'ntfy-reverse-proxy';

/**
 * Dev Worker - Prompt Choice.
 *
 * Prints both wrangler.toml locations and asks the developer which one
 * to use, resolving to the chosen path or exiting on an invalid answer.
 *
 * @param {string} localPath - Local path.
 * @param {string} xdgPath   - Xdg path.
 *
 * @returns {Promise<string>}
 *
 * @since 2.0.0
 */
function promptChoice(localPath, xdgPath) {
  return /** @type {Promise<string>} */ (new Promise((promiseResolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    process.stdout.write('\n');
    process.stdout.write('Found wrangler.toml in two locations:\n');
    process.stdout.write(`  1. Local: ${localPath}\n`);
    process.stdout.write(`  2. XDG:   ${xdgPath}\n`);
    process.stdout.write('\n');

    rl.question('Which one? (1 or 2): ', (answer) => {
      rl.close();

      const trimmed = answer.trim();

      if (trimmed === '1') {
        logger.info(`Using local wrangler.toml: ${localPath}`);

        promiseResolve(localPath);

        return;
      }

      if (trimmed === '2') {
        logger.info(`Using XDG wrangler.toml: ${xdgPath}`);

        promiseResolve(xdgPath);

        return;
      }

      logger.error('Invalid choice. Exiting.');

      return process.exit(1);
    });

    return;
  }));
}

/**
 * Dev Worker - Resolve Config JSON.
 *
 * Searches for config.json in the local directory, project
 * root, and XDG config directory. Returns the first match.
 *
 * @since 2.0.0
 */
function resolveConfigJson() {
  const localPath = join(projectRoot, 'config.json');
  const xdgPath = join(bootstrap.getConfigDir(APP_NAME), 'config.json');

  if (existsSync(localPath) === true) {
    return localPath;
  }

  if (existsSync(xdgPath) === true) {
    return xdgPath;
  }

  return undefined;
}

/**
 * Dev Worker - Generate Wrangler Toml.
 *
 * Reads config.json and writes a wrangler.toml file
 * with routes and vars derived from the configuration.
 *
 * @param {string} configJsonPath - Config json path.
 * @param {string} outputPath     - Output path.
 *
 * @returns {void}
 *
 * @since 2.0.0
 */
function generateWranglerToml(configJsonPath, outputPath) {
  const config = JSON.parse(readFileSync(configJsonPath, 'utf-8'));
  const settings = config['settings'];
  const servers = config['servers'];
  const contexts = /** @type {{ id: string, type: string }[]} */ (config['contexts']);
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

  return;
}

/**
 * Dev Worker - Resolve Wrangler Config.
 *
 * Checks for local and XDG wrangler.toml locations.
 * Prompts the developer to choose when both exist.
 *
 * @since 2.0.0
 */
async function resolveWranglerConfig() {
  const localPath = join(projectRoot, 'wrangler.toml');
  const xdgPath = join(bootstrap.getConfigDir(APP_NAME), 'wrangler.toml');

  const localExists = existsSync(localPath);
  const xdgExists = existsSync(xdgPath);

  if (localExists === true && xdgExists === true) {
    return promptChoice(localPath, xdgPath);
  }

  if (localExists === true) {
    logger.info(`Using local wrangler.toml: ${localPath}`);

    return localPath;
  }

  if (xdgExists === true) {
    logger.info(`Using XDG wrangler.toml: ${xdgPath}`);

    return xdgPath;
  }

  const configJsonPath = resolveConfigJson();

  if (configJsonPath === undefined) {
    logger.error('No wrangler.toml or config.json found. Copy config.sample.json to config.json and configure it.');

    process.exit(1);
  }

  logger.info(`No wrangler.toml found. Generating from ${configJsonPath}...`);

  generateWranglerToml(configJsonPath, localPath);

  logger.info(`Generated wrangler.toml: ${localPath}`);

  return localPath;
}

/**
 * Dev Worker - Config Path.
 *
 * Resolved wrangler.toml path chosen or generated for this run, passed
 * to wrangler dev as the active configuration file.
 *
 * @since 2.0.0
 */
const configPath = await resolveWranglerConfig();

/**
 * Dev Worker - Wrangler.
 *
 * Child process running wrangler dev in local mode; its exit code is
 * propagated to the parent shell when the process closes.
 *
 * @since 2.0.0
 */
const wrangler = spawn('npx', [
  'wrangler',
  'dev',
  '--config',
  configPath,
  '--local-upstream',
  'localhost',
  '--inspector-port=0',
], {
  stdio: 'inherit',
});

wrangler.on('close', (code) => {
  return process.exit(code ?? 1);
});

#!/usr/bin/env node
import { copyFileSync, existsSync } from 'fs';
import { join } from 'path';

import { Bootstrap, Logger } from '@cbnventures/nova/toolkit';
import { Command } from 'commander';

import { APP_NAME } from '../lib/item.js';
import { removeContext } from './commands/context.js';
import { deploy } from './commands/deploy.js';
import { generateWranglerToml } from './commands/generate.js';
import { removeServer } from './commands/server.js';
import { validateConfig } from './commands/validate.js';
import { interactiveMenu } from './menu/interactive.js';

import type {
  CliIndexConfigDir,
  CliIndexConfigPath,
  CliIndexEnvDir,
  CliIndexGetConfigFilePathReturn,
  CliIndexMainCatchError,
  CliIndexMainConfigDirs,
  CliIndexMainConfigPath,
  CliIndexMainContextCommand,
  CliIndexMainContextRemoveName,
  CliIndexMainReturn,
  CliIndexMainServerCommand,
  CliIndexMainServerRemoveName,
  CliIndexMainValidateError,
  CliIndexMainValidateResult,
  CliIndexProgram,
  CliIndexSamplePath,
} from '../types/cli/index.d.ts';

const envDir: CliIndexEnvDir = Bootstrap.resolveFileDir(APP_NAME, '.env', [
  'cwd',
  'project-root',
  'config-dir',
]);

if (envDir !== undefined) {
  Bootstrap.loadEnv(envDir);
}

/**
 * CLI - Get Config File Path.
 *
 * Resolves the configuration file path and copies the sample
 * config into place when no config file exists yet.
 *
 * @since 2.0.0
 */
function getConfigFilePath(): CliIndexGetConfigFilePathReturn {
  const configDir: CliIndexConfigDir = Bootstrap.resolveFileDir(APP_NAME, 'config.json', [
    'cwd',
    'project-root',
    'config-dir',
  ]);

  if (configDir !== undefined) {
    return join(configDir, 'config.json');
  }

  const defaultDir: CliIndexConfigPath = Bootstrap.getConfigDir(APP_NAME);
  const configPath: CliIndexConfigPath = join(defaultDir, 'config.json');
  const samplePath: CliIndexSamplePath = join(defaultDir, 'config.sample.json');

  if (existsSync(configPath) === false && existsSync(samplePath) === true) {
    copyFileSync(samplePath, configPath);
  }

  return configPath;
}

/**
 * CLI - Program.
 *
 * Creates the top-level Commander program instance used to
 * register all subcommands and parse CLI arguments.
 *
 * @since 2.0.0
 */
const program: CliIndexProgram = new Command();

program.name('ntfy-reverse-proxy').alias('nrp').description('CLI management tool').version('2.0.0');

/**
 * CLI - Main.
 *
 * Bootstraps the CLI by resolving config, registering all
 * subcommands, and dispatching to the interactive menu or parser.
 *
 * @since 2.0.0
 */
async function main(): CliIndexMainReturn {
  if (process.argv['length'] <= 2) {
    const configDirs: CliIndexMainConfigDirs = Bootstrap.resolveFileDirs(APP_NAME, 'config.json', [
      'cwd',
      'project-root',
      'config-dir',
    ]);

    await interactiveMenu(configDirs);

    return;
  }

  const configPath: CliIndexMainConfigPath = getConfigFilePath();

  const serverCommand: CliIndexMainServerCommand = new Command('server').description('Manage servers');

  serverCommand
    .command('remove <name>')
    .description('Remove a server by name')
    .action((name: CliIndexMainServerRemoveName) => {
      removeServer(configPath, name);

      Logger.info(`Server "${name}" removed.`);

      return;
    });

  const contextCommand: CliIndexMainContextCommand = new Command('context').description('Manage contexts');

  contextCommand
    .command('remove <name>')
    .description('Remove a context by name')
    .action((name: CliIndexMainContextRemoveName) => {
      removeContext(configPath, name);

      Logger.info(`Context "${name}" removed.`);

      return;
    });

  program.addCommand(serverCommand);
  program.addCommand(contextCommand);

  program
    .command('validate')
    .description('Validate config')
    .action(() => {
      const result: CliIndexMainValidateResult = validateConfig(configPath);

      if (result['valid'] === true) {
        Logger.info('Config is valid.');
      } else {
        Logger.error('Config is invalid:');

        for (const error of result['errors']) {
          const message: CliIndexMainValidateError = error;

          Logger.error(`  - ${message}`);
        }
      }

      return;
    });

  program
    .command('generate')
    .description('Generate wrangler.toml')
    .action(() => {
      generateWranglerToml(configPath);

      Logger.info('wrangler.toml generated successfully.');

      return;
    });

  program
    .command('deploy')
    .description('Deploy to Cloudflare Workers')
    .action(async () => {
      try {
        await deploy(configPath);
      } catch (error) {
        Logger.error(error instanceof Error ? error['message'] : String(error));

        process.exitCode = 1;
      }

      return;
    });

  program.parse(process.argv);

  return;
}

main().catch((error: CliIndexMainCatchError) => {
  Logger.error(error instanceof Error ? error['message'] : String(error));

  process.exitCode = 1;

  return;
});

export {
  program,
};

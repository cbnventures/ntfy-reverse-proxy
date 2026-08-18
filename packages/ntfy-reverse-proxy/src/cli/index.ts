#!/usr/bin/env node
import { copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

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
  Cli_Index_ConfigDir,
  Cli_Index_ConfigPath,
  Cli_Index_EnvDir,
  Cli_Index_GetConfigFilePath_DefaultDir,
  Cli_Index_GetConfigFilePath_Returns,
  Cli_Index_Main_ConfigDirs,
  Cli_Index_Main_ConfigPath,
  Cli_Index_Main_ContextCommand,
  Cli_Index_Main_Message,
  Cli_Index_Main_Result,
  Cli_Index_Main_Returns,
  Cli_Index_Main_ServerCommand,
  Cli_Index_Program,
  Cli_Index_SamplePath,
} from '../types/cli/index.d.ts';

/**
 * CLI - Env Dir.
 *
 * Directory that contains the dotenv file, resolved by searching
 * the working directory, project root, and config directory.
 *
 * @since 2.1.0
 */
const envDir: Cli_Index_EnvDir = Bootstrap.resolveFileDir(APP_NAME, '.env', [
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
function getConfigFilePath(): Cli_Index_GetConfigFilePath_Returns {
  const configDir: Cli_Index_ConfigDir = Bootstrap.resolveFileDir(APP_NAME, 'config.json', [
    'cwd',
    'project-root',
    'config-dir',
  ]);

  if (configDir !== undefined) {
    return join(configDir, 'config.json');
  }

  const defaultDir: Cli_Index_GetConfigFilePath_DefaultDir = Bootstrap.getConfigDir(APP_NAME);
  const configPath: Cli_Index_ConfigPath = join(defaultDir, 'config.json');
  const samplePath: Cli_Index_SamplePath = join(defaultDir, 'config.sample.json');

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
const program: Cli_Index_Program = new Command();

program.name('ntfy-reverse-proxy').alias('nrp').description('CLI management tool').version('2.0.0');

/**
 * CLI - Main.
 *
 * Bootstraps the CLI by resolving config, registering all
 * subcommands, and dispatching to the interactive menu or parser.
 *
 * @since 2.0.0
 */
async function main(): Cli_Index_Main_Returns {
  if (process.argv['length'] <= 2) {
    const configDirs: Cli_Index_Main_ConfigDirs = Bootstrap.resolveFileDirs(APP_NAME, 'config.json', [
      'cwd',
      'project-root',
      'config-dir',
    ]);

    await interactiveMenu(configDirs);

    return;
  }

  const configPath: Cli_Index_Main_ConfigPath = getConfigFilePath();

  const serverCommand: Cli_Index_Main_ServerCommand = new Command('server').description('Manage servers');

  serverCommand
    .command('remove <name>')
    .description('Remove a server by name')
    .action((name) => {
      removeServer(configPath, name);

      Logger.info(`Server "${name}" removed.`);

      return;
    });

  const contextCommand: Cli_Index_Main_ContextCommand = new Command('context').description('Manage contexts');

  contextCommand
    .command('remove <name>')
    .description('Remove a context by name')
    .action((name) => {
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
      const result: Cli_Index_Main_Result = validateConfig(configPath);

      if (result['valid'] === true) {
        Logger.info('Config is valid.');
      } else {
        Logger.error('Config is invalid:');

        for (const error of result['errors']) {
          const message: Cli_Index_Main_Message = error;

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
        Logger.error((error instanceof Error) ? error['message'] : String(error));

        process.exitCode = 1;
      }

      return;
    });

  program.parse(process.argv);

  return;
}

main().catch((error) => {
  Logger.error((error instanceof Error) ? error['message'] : String(error));

  process.exitCode = 1;

  return;
});

export {
  program,
};

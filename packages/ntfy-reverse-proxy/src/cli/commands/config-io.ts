import { readFileSync, writeFileSync } from 'node:fs';

import type {
  Cli_Commands_ConfigIo_LoadConfig_ConfigPath,
  Cli_Commands_ConfigIo_LoadConfig_Returns,
  Cli_Commands_ConfigIo_NormalizeConfig_Config,
  Cli_Commands_ConfigIo_NormalizeConfig_Returns,
  Cli_Commands_ConfigIo_NormalizeConfig_SortedContexts,
  Cli_Commands_ConfigIo_NormalizeConfig_SortedServers,
  Cli_Commands_ConfigIo_SaveConfig_Config,
  Cli_Commands_ConfigIo_SaveConfig_ConfigPath,
  Cli_Commands_ConfigIo_SaveConfig_Returns,
} from '../../types/cli/commands/config-io.d.ts';

/**
 * CLI - Commands - Config IO - Load Config.
 *
 * Reads and parses the JSON configuration file from disk. Returns unknown
 * because the parsed JSON has not been schema-validated; callers must run
 * configSchema.parse() or configSchema.safeParse() before operating on the result.
 *
 * @since 2.0.0
 */
function loadConfig(configPath: Cli_Commands_ConfigIo_LoadConfig_ConfigPath): Cli_Commands_ConfigIo_LoadConfig_Returns {
  return JSON.parse(readFileSync(configPath, 'utf-8'));
}

/**
 * CLI - Commands - Config IO - Normalize Config.
 *
 * Reorders top-level keys to match the interactive menu order
 * and sorts servers and contexts alphabetically by name.
 *
 * @since 2.0.0
 */
function normalizeConfig(config: Cli_Commands_ConfigIo_NormalizeConfig_Config): Cli_Commands_ConfigIo_NormalizeConfig_Returns {
  const sortedServers: Cli_Commands_ConfigIo_NormalizeConfig_SortedServers = [...config['servers']].sort(
    (a, b) => a['name'].localeCompare(b['name']),
  );

  const sortedContexts: Cli_Commands_ConfigIo_NormalizeConfig_SortedContexts = [...config['contexts']].sort(
    (a, b) => a['name'].localeCompare(b['name']),
  );

  return {
    servers: sortedServers,
    contexts: sortedContexts,
    settings: config['settings'],
  };
}

/**
 * CLI - Commands - Config IO - Save Config.
 *
 * Normalizes key ordering and serializes the configuration
 * object to JSON, then writes it to disk.
 *
 * @since 2.0.0
 */
function saveConfig(configPath: Cli_Commands_ConfigIo_SaveConfig_ConfigPath, config: Cli_Commands_ConfigIo_SaveConfig_Config): Cli_Commands_ConfigIo_SaveConfig_Returns {
  writeFileSync(configPath, `${JSON.stringify(normalizeConfig(config), null, 2)}\n`);

  return;
}

export {
  loadConfig,
  saveConfig,
};

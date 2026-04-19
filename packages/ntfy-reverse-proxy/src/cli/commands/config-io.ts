import { readFileSync, writeFileSync } from 'fs';

import type {
  CliCommandsConfigIoLoadConfigConfigPath,
  CliCommandsConfigIoLoadConfigReturn,
  CliCommandsConfigIoNormalizeConfigConfig,
  CliCommandsConfigIoNormalizeConfigReturn,
  CliCommandsConfigIoNormalizeConfigSortedContexts,
  CliCommandsConfigIoNormalizeConfigSortedServers,
  CliCommandsConfigIoSaveConfigConfig,
  CliCommandsConfigIoSaveConfigConfigPath,
  CliCommandsConfigIoSaveConfigReturns,
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
function loadConfig(configPath: CliCommandsConfigIoLoadConfigConfigPath): CliCommandsConfigIoLoadConfigReturn {
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
function normalizeConfig(config: CliCommandsConfigIoNormalizeConfigConfig): CliCommandsConfigIoNormalizeConfigReturn {
  const sortedServers: CliCommandsConfigIoNormalizeConfigSortedServers = [...config['servers']].sort(
    (a, b) => a['name'].localeCompare(b['name']),
  );

  const sortedContexts: CliCommandsConfigIoNormalizeConfigSortedContexts = [...config['contexts']].sort(
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
function saveConfig(configPath: CliCommandsConfigIoSaveConfigConfigPath, config: CliCommandsConfigIoSaveConfigConfig): CliCommandsConfigIoSaveConfigReturns {
  writeFileSync(configPath, `${JSON.stringify(normalizeConfig(config), null, 2)}\n`);

  return;
}

export {
  loadConfig,
  saveConfig,
};

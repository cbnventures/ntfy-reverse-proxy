import { configSchema } from '../../lib/schema.js';
import { loadConfig, saveConfig } from './config-io.js';

import type {
  Cli_Commands_Settings_GetSettings_ConfigPath,
  Cli_Commands_Settings_GetSettings_Returns,
  Cli_Commands_Settings_UpdateSettings_Config,
  Cli_Commands_Settings_UpdateSettings_ConfigPath,
  Cli_Commands_Settings_UpdateSettings_Returns,
  Cli_Commands_Settings_UpdateSettings_Updates,
} from '../../types/cli/commands/settings.d.ts';

/**
 * CLI - Commands - Settings - Get Settings.
 *
 * Loads the configuration file and returns the settings object
 * so callers can inspect or display current values.
 *
 * @since 2.0.0
 */
function getSettings(configPath: Cli_Commands_Settings_GetSettings_ConfigPath): Cli_Commands_Settings_GetSettings_Returns {
  return configSchema.parse(loadConfig(configPath))['settings'];
}

/**
 * CLI - Commands - Settings - Update Settings.
 *
 * Merges partial setting updates into the current settings
 * and persists the result to the configuration file.
 *
 * @since 2.0.0
 */
function updateSettings(configPath: Cli_Commands_Settings_UpdateSettings_ConfigPath, updates: Cli_Commands_Settings_UpdateSettings_Updates): Cli_Commands_Settings_UpdateSettings_Returns {
  const config: Cli_Commands_Settings_UpdateSettings_Config = configSchema.parse(loadConfig(configPath));

  Reflect.set(config, 'settings', {
    ...config['settings'],
    ...updates,
  });

  saveConfig(configPath, config);

  return;
}

export {
  getSettings,
  updateSettings,
};

import { configSchema } from '../../lib/schema.js';
import { loadConfig, saveConfig } from './config-io.js';

import type {
  CliCommandsSettingsGetSettingsConfigPath,
  CliCommandsSettingsGetSettingsReturn,
  CliCommandsSettingsUpdateSettingsConfig,
  CliCommandsSettingsUpdateSettingsConfigPath,
  CliCommandsSettingsUpdateSettingsReturn,
  CliCommandsSettingsUpdateSettingsUpdates,
} from '../../types/cli/commands/settings.d.ts';

/**
 * CLI - Commands - Settings - Get Settings.
 *
 * Loads the configuration file and returns the settings object
 * so callers can inspect or display current values.
 *
 * @since 2.0.0
 */
function getSettings(configPath: CliCommandsSettingsGetSettingsConfigPath): CliCommandsSettingsGetSettingsReturn {
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
function updateSettings(configPath: CliCommandsSettingsUpdateSettingsConfigPath, updates: CliCommandsSettingsUpdateSettingsUpdates): CliCommandsSettingsUpdateSettingsReturn {
  const config: CliCommandsSettingsUpdateSettingsConfig = configSchema.parse(loadConfig(configPath));

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

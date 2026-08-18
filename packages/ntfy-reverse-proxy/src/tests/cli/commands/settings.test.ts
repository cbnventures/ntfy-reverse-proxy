import { randomUUID } from 'node:crypto';
import {
  existsSync, readFileSync, unlinkSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest';

import { getSettings, updateSettings } from '../../../cli/commands/settings.js';

import type {
  Tests_Cli_Commands_Settings_BaseConfig,
  Tests_Cli_Commands_Settings_SettingsCommands_ConfigJson,
  Tests_Cli_Commands_Settings_SettingsCommands_ReadsCurrentSettings_Settings,
  Tests_Cli_Commands_Settings_SettingsCommands_TogglesShowResponseOutput_Config,
  Tests_Cli_Commands_Settings_SettingsCommands_TogglesShowResponseOutput_ConfigJson,
  Tests_Cli_Commands_Settings_SettingsCommands_UpdatesBaseDomain_Config,
  Tests_Cli_Commands_Settings_SettingsCommands_UpdatesBaseDomain_ConfigJson,
  Tests_Cli_Commands_Settings_TestConfigPath,
  Tests_Cli_Commands_Settings_TestConfigPathFragment,
  Tests_Cli_Commands_Settings_TestConfigTmpDir,
} from '../../../types/tests/cli/commands/settings.test.d.ts';

const testConfigPathFragment: Tests_Cli_Commands_Settings_TestConfigPathFragment = `ntfy-test-settings-${randomUUID()}.json`;

const testConfigTmpDir: Tests_Cli_Commands_Settings_TestConfigTmpDir = tmpdir();

const testConfigPath: Tests_Cli_Commands_Settings_TestConfigPath = join(testConfigTmpDir, testConfigPathFragment);

const baseConfig: Tests_Cli_Commands_Settings_BaseConfig = {
  settings: {
    worker_name: 'test-worker',
    base_domain: 'ntfy.example.com',
    show_response_output: false,
  },
  servers: [],
  contexts: [],
};

/**
 * Tests - CLI - Commands - Settings - Settings Commands.
 *
 * @since 2.0.0
 */
describe('settings commands', () => {
  beforeEach(() => {
    const configJson: Tests_Cli_Commands_Settings_SettingsCommands_ConfigJson = JSON.stringify(baseConfig, null, 2);

    writeFileSync(testConfigPath, configJson);

    return;
  });

  afterEach(() => {
    if (existsSync(testConfigPath) === true) {
      unlinkSync(testConfigPath);
    }

    return;
  });

  it('reads current settings', () => {
    const settings: Tests_Cli_Commands_Settings_SettingsCommands_ReadsCurrentSettings_Settings = getSettings(testConfigPath);

    expect(settings['base_domain']).toBe('ntfy.example.com');

    return;
  });

  it('updates base_domain', () => {
    updateSettings(testConfigPath, { base_domain: 'ntfy.new.com' });

    const configJson: Tests_Cli_Commands_Settings_SettingsCommands_UpdatesBaseDomain_ConfigJson = readFileSync(testConfigPath, 'utf-8');

    const config: Tests_Cli_Commands_Settings_SettingsCommands_UpdatesBaseDomain_Config = JSON.parse(configJson);

    expect(config['settings']['base_domain']).toBe('ntfy.new.com');

    return;
  });

  it('toggles show_response_output', () => {
    updateSettings(testConfigPath, { show_response_output: true });

    const configJson: Tests_Cli_Commands_Settings_SettingsCommands_TogglesShowResponseOutput_ConfigJson = readFileSync(testConfigPath, 'utf-8');

    const config: Tests_Cli_Commands_Settings_SettingsCommands_TogglesShowResponseOutput_Config = JSON.parse(configJson);

    expect(config['settings']['show_response_output']).toBe(true);

    return;
  });

  return;
});

import { randomUUID } from 'crypto';
import {
  existsSync, readFileSync, unlinkSync, writeFileSync,
} from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest';

import { getSettings, updateSettings } from '../../../cli/commands/settings.js';

import type {
  TestsCliCommandsSettingsBaseConfig,
  TestsCliCommandsSettingsGetSettingsResult,
  TestsCliCommandsSettingsParsedConfig,
  TestsCliCommandsSettingsTestConfigPath,
} from '../../../types/tests/cli/commands/settings.test.d.ts';

const testConfigPathFragment: TestsCliCommandsSettingsTestConfigPath = `ntfy-test-settings-${randomUUID()}.json`;

const testConfigTmpDir: TestsCliCommandsSettingsTestConfigPath = tmpdir();

const testConfigPath: TestsCliCommandsSettingsTestConfigPath = join(testConfigTmpDir, testConfigPathFragment);

const baseConfig: TestsCliCommandsSettingsBaseConfig = {
  settings: {
    worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: false,
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
    const configJson: TestsCliCommandsSettingsTestConfigPath = JSON.stringify(baseConfig, null, 2);

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
    const settings: TestsCliCommandsSettingsGetSettingsResult = getSettings(testConfigPath);

    expect(settings['base_domain']).toBe('ntfy.example.com');

    return;
  });

  it('updates base_domain', () => {
    updateSettings(testConfigPath, { base_domain: 'ntfy.new.com' });

    const configJson: TestsCliCommandsSettingsTestConfigPath = readFileSync(testConfigPath, 'utf-8');

    const config: TestsCliCommandsSettingsParsedConfig = JSON.parse(configJson);

    expect(config['settings']['base_domain']).toBe('ntfy.new.com');

    return;
  });

  it('toggles show_response_output', () => {
    updateSettings(testConfigPath, { show_response_output: true });

    const configJson: TestsCliCommandsSettingsTestConfigPath = readFileSync(testConfigPath, 'utf-8');

    const config: TestsCliCommandsSettingsParsedConfig = JSON.parse(configJson);

    expect(config['settings']['show_response_output']).toBe(true);

    return;
  });

  return;
});

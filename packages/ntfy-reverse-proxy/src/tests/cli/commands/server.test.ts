import { randomUUID } from 'node:crypto';
import {
  existsSync, readFileSync, unlinkSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest';

import { addServer, listServers, removeServer } from '../../../cli/commands/server.js';
import { LIB_REGEX_REFERENCED } from '../../../lib/regex.js';

import type {
  Tests_Cli_Commands_Server_BaseConfig,
  Tests_Cli_Commands_Server_ServerCommands_AddsAServerToConfig_Config,
  Tests_Cli_Commands_Server_ServerCommands_AddsAServerToConfig_ConfigJson,
  Tests_Cli_Commands_Server_ServerCommands_ConfigJson,
  Tests_Cli_Commands_Server_ServerCommands_ListsServers_Servers,
  Tests_Cli_Commands_Server_ServerCommands_RejectsDuplicateServerNames_Duplicate,
  Tests_Cli_Commands_Server_ServerCommands_RemovesAServer_Config,
  Tests_Cli_Commands_Server_ServerCommands_RemovesAServer_ConfigJson,
  Tests_Cli_Commands_Server_ServerCommands_WarnsWhenRemovingAServerReferencedByContexts_Config,
  Tests_Cli_Commands_Server_ServerCommands_WarnsWhenRemovingAServerReferencedByContexts_ConfigJson,
  Tests_Cli_Commands_Server_ServerCommands_WarnsWhenRemovingAServerReferencedByContexts_UpdatedConfigJson,
  Tests_Cli_Commands_Server_TestConfigPath,
  Tests_Cli_Commands_Server_TestConfigPathFragment,
  Tests_Cli_Commands_Server_TestConfigTmpDir,
} from '../../../types/tests/cli/commands/server.test.d.ts';

const testConfigPathFragment: Tests_Cli_Commands_Server_TestConfigPathFragment = `ntfy-test-${randomUUID()}.json`;

const testConfigTmpDir: Tests_Cli_Commands_Server_TestConfigTmpDir = tmpdir();

const testConfigPath: Tests_Cli_Commands_Server_TestConfigPath = join(testConfigTmpDir, testConfigPathFragment);

const baseConfig: Tests_Cli_Commands_Server_BaseConfig = {
  settings: {
    worker_name: 'test-worker',
    base_domain: 'ntfy.example.com',
    show_response_output: false,
  },
  servers: [],
  contexts: [],
};

/**
 * Tests - CLI - Commands - Server - Server Commands.
 *
 * @since 2.0.0
 */
describe('server commands', () => {
  beforeEach(() => {
    const configJson: Tests_Cli_Commands_Server_ServerCommands_ConfigJson = JSON.stringify(baseConfig, null, 2);

    writeFileSync(testConfigPath, configJson);

    return;
  });

  afterEach(() => {
    if (existsSync(testConfigPath) === true) {
      unlinkSync(testConfigPath);
    }

    return;
  });

  it('adds a server to config', () => {
    addServer(testConfigPath, {
      name: 'alpha',
      server: 'https://ntfy.example.com',
      token: 'tk_abc',
    });

    const configJson: Tests_Cli_Commands_Server_ServerCommands_AddsAServerToConfig_ConfigJson = readFileSync(testConfigPath, 'utf-8');

    const config: Tests_Cli_Commands_Server_ServerCommands_AddsAServerToConfig_Config = JSON.parse(configJson);

    expect(config['servers']).toHaveLength(1);

    expect(config['servers'][0]!['name']).toBe('alpha');

    return;
  });

  it('rejects duplicate server names', () => {
    addServer(testConfigPath, {
      name: 'alpha',
      server: 'https://ntfy.example.com',
      token: 'tk_abc',
    });

    const duplicate: Tests_Cli_Commands_Server_ServerCommands_RejectsDuplicateServerNames_Duplicate = {
      name: 'alpha',
      server: 'https://other.com',
      token: 'tk_def',
    };

    expect(() => addServer(testConfigPath, duplicate)).toThrow();

    return;
  });

  it('lists servers', () => {
    addServer(testConfigPath, {
      name: 'alpha',
      server: 'https://ntfy.example.com',
      token: 'tk_abc',
    });

    const servers: Tests_Cli_Commands_Server_ServerCommands_ListsServers_Servers = listServers(testConfigPath);

    expect(servers).toHaveLength(1);

    return;
  });

  it('removes a server', () => {
    addServer(testConfigPath, {
      name: 'alpha',
      server: 'https://ntfy.example.com',
      token: 'tk_abc',
    });

    removeServer(testConfigPath, 'alpha');

    const configJson: Tests_Cli_Commands_Server_ServerCommands_RemovesAServer_ConfigJson = readFileSync(testConfigPath, 'utf-8');

    const config: Tests_Cli_Commands_Server_ServerCommands_RemovesAServer_Config = JSON.parse(configJson);

    expect(config['servers']).toHaveLength(0);

    return;
  });

  it('warns when removing a server referenced by contexts', () => {
    addServer(testConfigPath, {
      name: 'alpha',
      server: 'https://ntfy.example.com',
      token: 'tk_abc',
    });

    const configJson: Tests_Cli_Commands_Server_ServerCommands_WarnsWhenRemovingAServerReferencedByContexts_ConfigJson = readFileSync(testConfigPath, 'utf-8');

    const config: Tests_Cli_Commands_Server_ServerCommands_WarnsWhenRemovingAServerReferencedByContexts_Config = JSON.parse(configJson);

    config['contexts'].push({
      id: 'abc',
      name: 'test',
      type: 'http',
      interpreter: 'plain-text',
      topic: 'test',
      mode: 'send-once',
      show_visitor_info: false,
      primary_server: 'alpha',
      servers: ['alpha'],
    });

    const updatedConfigJson: Tests_Cli_Commands_Server_ServerCommands_WarnsWhenRemovingAServerReferencedByContexts_UpdatedConfigJson = JSON.stringify(config, null, 2);

    writeFileSync(testConfigPath, updatedConfigJson);

    expect(() => removeServer(testConfigPath, 'alpha')).toThrow(LIB_REGEX_REFERENCED);

    return;
  });

  return;
});

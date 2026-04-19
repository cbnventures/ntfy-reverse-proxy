import { randomUUID } from 'crypto';
import {
  existsSync, readFileSync, unlinkSync, writeFileSync,
} from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest';

import { addServer, listServers, removeServer } from '../../../cli/commands/server.js';
import { LIB_REGEX_REFERENCED } from '../../../lib/regex.js';

import type {
  TestsCliCommandsServerBaseConfig,
  TestsCliCommandsServerParsedConfig,
  TestsCliCommandsServerServerList,
  TestsCliCommandsServerTestConfigPath,
} from '../../../types/tests/cli/commands/server.test.d.ts';

const testConfigPathFragment: TestsCliCommandsServerTestConfigPath = `ntfy-test-${randomUUID()}.json`;

const testConfigTmpDir: TestsCliCommandsServerTestConfigPath = tmpdir();

const testConfigPath: TestsCliCommandsServerTestConfigPath = join(testConfigTmpDir, testConfigPathFragment);

const baseConfig: TestsCliCommandsServerBaseConfig = {
  settings: {
    worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: false,
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
    const configJson: TestsCliCommandsServerTestConfigPath = JSON.stringify(baseConfig, null, 2);

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
      name: 'alpha', server: 'https://ntfy.example.com', token: 'tk_abc',
    });

    const configJson: TestsCliCommandsServerTestConfigPath = readFileSync(testConfigPath, 'utf-8');

    const config: TestsCliCommandsServerParsedConfig = JSON.parse(configJson);

    expect(config['servers']).toHaveLength(1);

    expect(config['servers'][0]!['name']).toBe('alpha');

    return;
  });

  it('rejects duplicate server names', () => {
    addServer(testConfigPath, {
      name: 'alpha', server: 'https://ntfy.example.com', token: 'tk_abc',
    });

    expect(() => addServer(testConfigPath, {
      name: 'alpha', server: 'https://other.com', token: 'tk_def',
    })).toThrow();

    return;
  });

  it('lists servers', () => {
    addServer(testConfigPath, {
      name: 'alpha', server: 'https://ntfy.example.com', token: 'tk_abc',
    });

    const servers: TestsCliCommandsServerServerList = listServers(testConfigPath);

    expect(servers).toHaveLength(1);

    return;
  });

  it('removes a server', () => {
    addServer(testConfigPath, {
      name: 'alpha', server: 'https://ntfy.example.com', token: 'tk_abc',
    });

    removeServer(testConfigPath, 'alpha');

    const configJson: TestsCliCommandsServerTestConfigPath = readFileSync(testConfigPath, 'utf-8');

    const config: TestsCliCommandsServerParsedConfig = JSON.parse(configJson);

    expect(config['servers']).toHaveLength(0);

    return;
  });

  it('warns when removing a server referenced by contexts', () => {
    addServer(testConfigPath, {
      name: 'alpha', server: 'https://ntfy.example.com', token: 'tk_abc',
    });

    const configJson: TestsCliCommandsServerTestConfigPath = readFileSync(testConfigPath, 'utf-8');

    const config: TestsCliCommandsServerParsedConfig = JSON.parse(configJson);

    config['contexts'].push({
      id: 'abc', name: 'test', type: 'http', interpreter: 'plain-text', topic: 'test',
      mode: 'send-once', show_visitor_info: false, primary_server: 'alpha', servers: ['alpha'],
    });

    const updatedConfigJson: TestsCliCommandsServerTestConfigPath = JSON.stringify(config, null, 2);

    writeFileSync(testConfigPath, updatedConfigJson);

    expect(() => removeServer(testConfigPath, 'alpha')).toThrow(LIB_REGEX_REFERENCED);

    return;
  });

  return;
});

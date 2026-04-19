import { randomUUID } from 'crypto';
import {
  existsSync, readFileSync, unlinkSync, writeFileSync,
} from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest';

import {
  addContext, generateId, listContexts, removeContext,
} from '../../../cli/commands/context.js';

import type {
  TestsCliCommandsContextBaseConfig,
  TestsCliCommandsContextConfigJson,
  TestsCliCommandsContextContextList,
  TestsCliCommandsContextGeneratedId,
  TestsCliCommandsContextParsedConfig,
  TestsCliCommandsContextTestConfigPath,
} from '../../../types/tests/cli/commands/context.test.d.ts';

const testConfigPathFragment: TestsCliCommandsContextTestConfigPath = `ntfy-test-ctx-${randomUUID()}.json`;

const testConfigTmpDir: TestsCliCommandsContextTestConfigPath = tmpdir();

const testConfigPath: TestsCliCommandsContextTestConfigPath = join(testConfigTmpDir, testConfigPathFragment);

const baseConfig: TestsCliCommandsContextBaseConfig = {
  settings: {
    worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: false,
  },
  servers: [{
    name: 'alpha', server: 'https://ntfy.example.com', token: 'tk_abc',
  }],
  contexts: [],
};

/**
 * Tests - CLI - Commands - Context - Context Commands.
 *
 * @since 2.0.0
 */
describe('context commands', () => {
  beforeEach(() => {
    const configJson: TestsCliCommandsContextConfigJson = JSON.stringify(baseConfig, null, 2);

    writeFileSync(testConfigPath, configJson);

    return;
  });

  afterEach(() => {
    if (existsSync(testConfigPath) === true) {
      unlinkSync(testConfigPath);
    }

    return;
  });

  it('adds a context', () => {
    addContext(testConfigPath, {
      id: 'abc123', name: 'test', type: 'http', interpreter: 'plain-text', topic: 'test',
      mode: 'send-once', show_visitor_info: false, primary_server: 'alpha', servers: ['alpha'], token: undefined,
    });

    const configJson: TestsCliCommandsContextConfigJson = readFileSync(testConfigPath, 'utf-8');

    const config: TestsCliCommandsContextParsedConfig = JSON.parse(configJson);

    expect(config['contexts']).toHaveLength(1);

    return;
  });

  it('rejects duplicate context names', () => {
    addContext(testConfigPath, {
      id: 'abc', name: 'test', type: 'http', interpreter: 'plain-text', topic: 'test',
      mode: 'send-once', show_visitor_info: false, primary_server: 'alpha', servers: ['alpha'], token: undefined,
    });

    expect(() => addContext(testConfigPath, {
      id: 'def', name: 'test', type: 'http', interpreter: 'plain-text', topic: 'test2',
      mode: 'send-once', show_visitor_info: false, primary_server: 'alpha', servers: ['alpha'], token: undefined,
    })).toThrow();

    return;
  });

  it('auto-regenerates duplicate ids', () => {
    addContext(testConfigPath, {
      id: 'abc', name: 'test1', type: 'http', interpreter: 'plain-text', topic: 'test',
      mode: 'send-once', show_visitor_info: false, primary_server: 'alpha', servers: ['alpha'], token: undefined,
    });

    addContext(testConfigPath, {
      id: 'abc', name: 'test2', type: 'http', interpreter: 'plain-text', topic: 'test2',
      mode: 'send-once', show_visitor_info: false, primary_server: 'alpha', servers: ['alpha'], token: undefined,
    });

    const configJson: TestsCliCommandsContextConfigJson = readFileSync(testConfigPath, 'utf-8');

    const config: TestsCliCommandsContextParsedConfig = JSON.parse(configJson);

    expect(config['contexts']).toHaveLength(2);

    expect(config['contexts'][1]!['id']).not.toBe('abc');

    return;
  });

  it('rejects context referencing non-existent server', () => {
    expect(() => addContext(testConfigPath, {
      id: 'abc', name: 'test', type: 'http', interpreter: 'plain-text', topic: 'test',
      mode: 'send-once', show_visitor_info: false, primary_server: 'nonexistent', servers: ['nonexistent'], token: undefined,
    })).toThrow();

    return;
  });

  it('lists contexts', () => {
    addContext(testConfigPath, {
      id: 'abc', name: 'test', type: 'http', interpreter: 'plain-text', topic: 'test',
      mode: 'send-once', show_visitor_info: false, primary_server: 'alpha', servers: ['alpha'], token: undefined,
    });

    const contexts: TestsCliCommandsContextContextList = listContexts(testConfigPath);

    expect(contexts).toHaveLength(1);

    return;
  });

  it('removes a context', () => {
    addContext(testConfigPath, {
      id: 'abc', name: 'test', type: 'http', interpreter: 'plain-text', topic: 'test',
      mode: 'send-once', show_visitor_info: false, primary_server: 'alpha', servers: ['alpha'], token: undefined,
    });

    removeContext(testConfigPath, 'test');

    const contexts: TestsCliCommandsContextContextList = listContexts(testConfigPath);

    expect(contexts).toHaveLength(0);

    return;
  });

  it('generates random id strings', () => {
    const id1: TestsCliCommandsContextGeneratedId = generateId();

    const id2: TestsCliCommandsContextGeneratedId = generateId();

    expect(id1['length']).toBe(20);

    expect(id2['length']).toBe(20);

    expect(id1).not.toBe(id2);

    return;
  });

  return;
});

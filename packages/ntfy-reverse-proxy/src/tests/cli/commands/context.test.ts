import { randomUUID } from 'node:crypto';
import {
  existsSync, readFileSync, unlinkSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest';

import {
  addContext, generateId, listContexts, removeContext,
} from '../../../cli/commands/context.js';

import type {
  Tests_Cli_Commands_Context_BaseConfig,
  Tests_Cli_Commands_Context_ContextCommands_AddsAContext_Config,
  Tests_Cli_Commands_Context_ContextCommands_AddsAContext_ConfigJson,
  Tests_Cli_Commands_Context_ContextCommands_AutoRegeneratesDuplicateIds_Config,
  Tests_Cli_Commands_Context_ContextCommands_AutoRegeneratesDuplicateIds_ConfigJson,
  Tests_Cli_Commands_Context_ContextCommands_ConfigJson,
  Tests_Cli_Commands_Context_ContextCommands_GeneratesRandomIdStrings_Id1,
  Tests_Cli_Commands_Context_ContextCommands_GeneratesRandomIdStrings_Id2,
  Tests_Cli_Commands_Context_ContextCommands_ListsContexts_Contexts,
  Tests_Cli_Commands_Context_ContextCommands_RejectsContextReferencingNonExistentServer_Config,
  Tests_Cli_Commands_Context_ContextCommands_RejectsDuplicateContextNames_Config,
  Tests_Cli_Commands_Context_ContextCommands_RemovesAContext_Contexts,
  Tests_Cli_Commands_Context_TestConfigPath,
  Tests_Cli_Commands_Context_TestConfigPathFragment,
  Tests_Cli_Commands_Context_TestConfigTmpDir,
} from '../../../types/tests/cli/commands/context.test.d.ts';

const testConfigPathFragment: Tests_Cli_Commands_Context_TestConfigPathFragment = `ntfy-test-ctx-${randomUUID()}.json`;

const testConfigTmpDir: Tests_Cli_Commands_Context_TestConfigTmpDir = tmpdir();

const testConfigPath: Tests_Cli_Commands_Context_TestConfigPath = join(testConfigTmpDir, testConfigPathFragment);

const baseConfig: Tests_Cli_Commands_Context_BaseConfig = {
  settings: {
    worker_name: 'test-worker',
    base_domain: 'ntfy.example.com',
    show_response_output: false,
  },
  servers: [{
    name: 'alpha',
    server: 'https://ntfy.example.com',
    token: 'tk_abc',
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
    const configJson: Tests_Cli_Commands_Context_ContextCommands_ConfigJson = JSON.stringify(baseConfig, null, 2);

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
      id: 'abc123',
      name: 'test',
      type: 'http',
      interpreter: 'plain-text',
      topic: 'test',
      mode: 'send-once',
      show_visitor_info: false,
      primary_server: 'alpha',
      servers: ['alpha'],
      token: undefined,
    });

    const configJson: Tests_Cli_Commands_Context_ContextCommands_AddsAContext_ConfigJson = readFileSync(testConfigPath, 'utf-8');

    const config: Tests_Cli_Commands_Context_ContextCommands_AddsAContext_Config = JSON.parse(configJson);

    expect(config['contexts']).toHaveLength(1);

    return;
  });

  it('rejects duplicate context names', () => {
    addContext(testConfigPath, {
      id: 'abc',
      name: 'test',
      type: 'http',
      interpreter: 'plain-text',
      topic: 'test',
      mode: 'send-once',
      show_visitor_info: false,
      primary_server: 'alpha',
      servers: ['alpha'],
      token: undefined,
    });

    expect(() => addContext(testConfigPath, {
      id: 'def',
      name: 'test',
      type: 'http',
      interpreter: 'plain-text',
      topic: 'test2',
      mode: 'send-once',
      show_visitor_info: false,
      primary_server: 'alpha',
      servers: ['alpha'],
      token: undefined,
    })).toThrow();

    const config: Tests_Cli_Commands_Context_ContextCommands_RejectsDuplicateContextNames_Config = JSON.parse(readFileSync(testConfigPath, 'utf-8'));

    expect(config['contexts']).toHaveLength(1);

    return;
  });

  it('auto-regenerates duplicate ids', () => {
    addContext(testConfigPath, {
      id: 'abc',
      name: 'test1',
      type: 'http',
      interpreter: 'plain-text',
      topic: 'test',
      mode: 'send-once',
      show_visitor_info: false,
      primary_server: 'alpha',
      servers: ['alpha'],
      token: undefined,
    });

    addContext(testConfigPath, {
      id: 'abc',
      name: 'test2',
      type: 'http',
      interpreter: 'plain-text',
      topic: 'test2',
      mode: 'send-once',
      show_visitor_info: false,
      primary_server: 'alpha',
      servers: ['alpha'],
      token: undefined,
    });

    const configJson: Tests_Cli_Commands_Context_ContextCommands_AutoRegeneratesDuplicateIds_ConfigJson = readFileSync(testConfigPath, 'utf-8');

    const config: Tests_Cli_Commands_Context_ContextCommands_AutoRegeneratesDuplicateIds_Config = JSON.parse(configJson);

    expect(config['contexts']).toHaveLength(2);

    expect(config['contexts'][1]!['id']).not.toBe('abc');

    return;
  });

  it('rejects context referencing non-existent server', () => {
    expect(() => addContext(testConfigPath, {
      id: 'abc',
      name: 'test',
      type: 'http',
      interpreter: 'plain-text',
      topic: 'test',
      mode: 'send-once',
      show_visitor_info: false,
      primary_server: 'nonexistent',
      servers: ['nonexistent'],
      token: undefined,
    })).toThrow();

    const config: Tests_Cli_Commands_Context_ContextCommands_RejectsContextReferencingNonExistentServer_Config = JSON.parse(readFileSync(testConfigPath, 'utf-8'));

    expect(config['contexts']).toHaveLength(0);

    return;
  });

  it('lists contexts', () => {
    addContext(testConfigPath, {
      id: 'abc',
      name: 'test',
      type: 'http',
      interpreter: 'plain-text',
      topic: 'test',
      mode: 'send-once',
      show_visitor_info: false,
      primary_server: 'alpha',
      servers: ['alpha'],
      token: undefined,
    });

    const contexts: Tests_Cli_Commands_Context_ContextCommands_ListsContexts_Contexts = listContexts(testConfigPath);

    expect(contexts).toHaveLength(1);

    return;
  });

  it('removes a context', () => {
    addContext(testConfigPath, {
      id: 'abc',
      name: 'test',
      type: 'http',
      interpreter: 'plain-text',
      topic: 'test',
      mode: 'send-once',
      show_visitor_info: false,
      primary_server: 'alpha',
      servers: ['alpha'],
      token: undefined,
    });

    removeContext(testConfigPath, 'test');

    const contexts: Tests_Cli_Commands_Context_ContextCommands_RemovesAContext_Contexts = listContexts(testConfigPath);

    expect(contexts).toHaveLength(0);

    return;
  });

  it('generates random id strings', () => {
    const id1: Tests_Cli_Commands_Context_ContextCommands_GeneratesRandomIdStrings_Id1 = generateId();

    const id2: Tests_Cli_Commands_Context_ContextCommands_GeneratesRandomIdStrings_Id2 = generateId();

    expect(id1['length']).toBe(20);

    expect(id2['length']).toBe(20);

    expect(id1).not.toBe(id2);

    return;
  });

  return;
});

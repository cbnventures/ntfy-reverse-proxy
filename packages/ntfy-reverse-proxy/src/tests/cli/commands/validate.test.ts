import { randomUUID } from 'node:crypto';
import { existsSync, unlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterEach, describe, expect, it,
} from 'vitest';

import { validateConfig } from '../../../cli/commands/validate.js';

import type {
  Tests_Cli_Commands_Validate_TestConfigPath,
  Tests_Cli_Commands_Validate_TestConfigPathFragment,
  Tests_Cli_Commands_Validate_TestConfigTmpDir,
  Tests_Cli_Commands_Validate_ValidateCommand_DetectsDuplicateIds_ConfigJson,
  Tests_Cli_Commands_Validate_ValidateCommand_DetectsDuplicateIds_HasMatch,
  Tests_Cli_Commands_Validate_ValidateCommand_DetectsDuplicateIds_Result,
  Tests_Cli_Commands_Validate_ValidateCommand_DetectsOrphanedServerReferences_ConfigJson,
  Tests_Cli_Commands_Validate_ValidateCommand_DetectsOrphanedServerReferences_HasMatch,
  Tests_Cli_Commands_Validate_ValidateCommand_DetectsOrphanedServerReferences_Result,
  Tests_Cli_Commands_Validate_ValidateCommand_DetectsPrimaryServerNotInContextServersList_ConfigJson,
  Tests_Cli_Commands_Validate_ValidateCommand_DetectsPrimaryServerNotInContextServersList_HasMatch,
  Tests_Cli_Commands_Validate_ValidateCommand_DetectsPrimaryServerNotInContextServersList_Result,
  Tests_Cli_Commands_Validate_ValidateCommand_PassesValidConfig_ConfigJson,
  Tests_Cli_Commands_Validate_ValidateCommand_PassesValidConfig_Result,
} from '../../../types/tests/cli/commands/validate.test.d.ts';

const testConfigPathFragment: Tests_Cli_Commands_Validate_TestConfigPathFragment = `ntfy-test-validate-${randomUUID()}.json`;

const testConfigTmpDir: Tests_Cli_Commands_Validate_TestConfigTmpDir = tmpdir();

const testConfigPath: Tests_Cli_Commands_Validate_TestConfigPath = join(testConfigTmpDir, testConfigPathFragment);

/**
 * Tests - CLI - Commands - Validate - Validate Command.
 *
 * @since 2.0.0
 */
describe('validate command', () => {
  afterEach(() => {
    if (existsSync(testConfigPath) === true) {
      unlinkSync(testConfigPath);
    }

    return;
  });

  it('passes valid config', () => {
    const configJson: Tests_Cli_Commands_Validate_ValidateCommand_PassesValidConfig_ConfigJson = JSON.stringify({
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
      contexts: [{
        id: 'abc',
        name: 'test',
        type: 'http',
        interpreter: 'plain-text',
        topic: 'test',
        mode: 'send-once',
        show_visitor_info: false,
        primary_server: 'alpha',
        servers: ['alpha'],
      }],
    });

    writeFileSync(testConfigPath, configJson);

    const result: Tests_Cli_Commands_Validate_ValidateCommand_PassesValidConfig_Result = validateConfig(testConfigPath);

    expect(result['valid']).toBe(true);

    expect(result['errors']).toHaveLength(0);

    return;
  });

  it('detects orphaned server references', () => {
    const configJson: Tests_Cli_Commands_Validate_ValidateCommand_DetectsOrphanedServerReferences_ConfigJson = JSON.stringify({
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
      contexts: [{
        id: 'abc',
        name: 'test',
        type: 'http',
        interpreter: 'plain-text',
        topic: 'test',
        mode: 'send-once',
        show_visitor_info: false,
        primary_server: 'missing',
        servers: [
          'alpha',
          'missing',
        ],
      }],
    });

    writeFileSync(testConfigPath, configJson);

    const result: Tests_Cli_Commands_Validate_ValidateCommand_DetectsOrphanedServerReferences_Result = validateConfig(testConfigPath);

    expect(result['valid']).toBe(false);

    const hasMatch: Tests_Cli_Commands_Validate_ValidateCommand_DetectsOrphanedServerReferences_HasMatch = result['errors'].some((e) => e.includes('missing'));

    expect(hasMatch).toBe(true);

    return;
  });

  it('detects duplicate ids', () => {
    const configJson: Tests_Cli_Commands_Validate_ValidateCommand_DetectsDuplicateIds_ConfigJson = JSON.stringify({
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
      contexts: [
        {
          id: 'abc',
          name: 'test1',
          type: 'http',
          interpreter: 'plain-text',
          topic: 't1',
          mode: 'send-once',
          show_visitor_info: false,
          primary_server: 'alpha',
          servers: ['alpha'],
        },
        {
          id: 'abc',
          name: 'test2',
          type: 'http',
          interpreter: 'plain-text',
          topic: 't2',
          mode: 'send-once',
          show_visitor_info: false,
          primary_server: 'alpha',
          servers: ['alpha'],
        },
      ],
    });

    writeFileSync(testConfigPath, configJson);

    const result: Tests_Cli_Commands_Validate_ValidateCommand_DetectsDuplicateIds_Result = validateConfig(testConfigPath);

    expect(result['valid']).toBe(false);

    const hasMatch: Tests_Cli_Commands_Validate_ValidateCommand_DetectsDuplicateIds_HasMatch = result['errors'].some((e) => e.includes('Duplicate') || e.includes('duplicate'));

    expect(hasMatch).toBe(true);

    return;
  });

  it('detects primary_server not in context servers list', () => {
    const configJson: Tests_Cli_Commands_Validate_ValidateCommand_DetectsPrimaryServerNotInContextServersList_ConfigJson = JSON.stringify({
      settings: {
        worker_name: 'test-worker',
        base_domain: 'ntfy.example.com',
        show_response_output: false,
      },
      servers: [
        {
          name: 'alpha',
          server: 'https://ntfy.example.com',
          token: 'tk_abc',
        },
        {
          name: 'beta',
          server: 'https://ntfy2.example.com',
          token: 'tk_def',
        },
      ],
      contexts: [{
        id: 'abc',
        name: 'test',
        type: 'http',
        interpreter: 'plain-text',
        topic: 'test',
        mode: 'send-once',
        show_visitor_info: false,
        primary_server: 'alpha',
        servers: ['beta'],
      }],
    });

    writeFileSync(testConfigPath, configJson);

    const result: Tests_Cli_Commands_Validate_ValidateCommand_DetectsPrimaryServerNotInContextServersList_Result = validateConfig(testConfigPath);

    expect(result['valid']).toBe(false);

    const hasMatch: Tests_Cli_Commands_Validate_ValidateCommand_DetectsPrimaryServerNotInContextServersList_HasMatch = result['errors'].some((e) => e.includes('not included in the context\'s servers list'));

    expect(hasMatch).toBe(true);

    return;
  });

  return;
});

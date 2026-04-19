import { randomUUID } from 'crypto';
import { existsSync, unlinkSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

import {
  afterEach, describe, expect, it,
} from 'vitest';

import { validateConfig } from '../../../cli/commands/validate.js';

import type {
  TestsCliCommandsValidateConfigJson,
  TestsCliCommandsValidateHasMatch,
  TestsCliCommandsValidateResult,
  TestsCliCommandsValidateTestConfigPath,
} from '../../../types/tests/cli/commands/validate.test.d.ts';

const testConfigPathFragment: TestsCliCommandsValidateTestConfigPath = `ntfy-test-validate-${randomUUID()}.json`;

const testConfigTmpDir: TestsCliCommandsValidateTestConfigPath = tmpdir();

const testConfigPath: TestsCliCommandsValidateTestConfigPath = join(testConfigTmpDir, testConfigPathFragment);

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
    const configJson: TestsCliCommandsValidateConfigJson = JSON.stringify({
      settings: {
        worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: false,
      },
      servers: [{
        name: 'alpha', server: 'https://ntfy.example.com', token: 'tk_abc',
      }],
      contexts: [{
        id: 'abc', name: 'test', type: 'http', interpreter: 'plain-text', topic: 'test',
        mode: 'send-once', show_visitor_info: false, primary_server: 'alpha', servers: ['alpha'],
      }],
    });

    writeFileSync(testConfigPath, configJson);

    const result: TestsCliCommandsValidateResult = validateConfig(testConfigPath);

    expect(result['valid']).toBe(true);

    expect(result['errors']).toHaveLength(0);

    return;
  });

  it('detects orphaned server references', () => {
    const configJson: TestsCliCommandsValidateConfigJson = JSON.stringify({
      settings: {
        worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: false,
      },
      servers: [{
        name: 'alpha', server: 'https://ntfy.example.com', token: 'tk_abc',
      }],
      contexts: [{
        id: 'abc', name: 'test', type: 'http', interpreter: 'plain-text', topic: 'test',
        mode: 'send-once', show_visitor_info: false, primary_server: 'missing', servers: [
          'alpha',
          'missing',
        ],
      }],
    });

    writeFileSync(testConfigPath, configJson);

    const result: TestsCliCommandsValidateResult = validateConfig(testConfigPath);

    expect(result['valid']).toBe(false);

    const hasMatch: TestsCliCommandsValidateHasMatch = result['errors'].some((e) => e.includes('missing'));

    expect(hasMatch).toBe(true);

    return;
  });

  it('detects duplicate ids', () => {
    const configJson: TestsCliCommandsValidateConfigJson = JSON.stringify({
      settings: {
        worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: false,
      },
      servers: [{
        name: 'alpha', server: 'https://ntfy.example.com', token: 'tk_abc',
      }],
      contexts: [
        {
          id: 'abc', name: 'test1', type: 'http', interpreter: 'plain-text', topic: 't1', mode: 'send-once', show_visitor_info: false, primary_server: 'alpha', servers: ['alpha'],
        },
        {
          id: 'abc', name: 'test2', type: 'http', interpreter: 'plain-text', topic: 't2', mode: 'send-once', show_visitor_info: false, primary_server: 'alpha', servers: ['alpha'],
        },
      ],
    });

    writeFileSync(testConfigPath, configJson);

    const result: TestsCliCommandsValidateResult = validateConfig(testConfigPath);

    expect(result['valid']).toBe(false);

    const hasMatch: TestsCliCommandsValidateHasMatch = result['errors'].some((e) => e.includes('Duplicate') || e.includes('duplicate'));

    expect(hasMatch).toBe(true);

    return;
  });

  return;
});

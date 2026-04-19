import { randomUUID } from 'crypto';
import {
  existsSync, readFileSync, unlinkSync, writeFileSync,
} from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest';

import { generateWranglerToml } from '../../../cli/commands/generate.js';

import type {
  TestsCliCommandsGenerateConfigJson,
  TestsCliCommandsGenerateTestConfigPath,
  TestsCliCommandsGenerateTestOutputPath,
  TestsCliCommandsGenerateTomlContent,
} from '../../../types/tests/cli/commands/generate.test.d.ts';

const testConfigPathFragment: TestsCliCommandsGenerateTestConfigPath = `ntfy-test-gen-config-${randomUUID()}.json`;

const testConfigTmpDir: TestsCliCommandsGenerateTestConfigPath = tmpdir();

const testConfigPath: TestsCliCommandsGenerateTestConfigPath = join(testConfigTmpDir, testConfigPathFragment);

const testOutputPathFragment: TestsCliCommandsGenerateTestOutputPath = `ntfy-test-gen-wrangler-${randomUUID()}.toml`;

const testOutputPath: TestsCliCommandsGenerateTestOutputPath = join(testConfigTmpDir, testOutputPathFragment);

/**
 * Tests - CLI - Commands - Generate - Generate Command.
 *
 * @since 2.0.0
 */
describe('generate command', () => {
  beforeEach(() => {
    const configJson: TestsCliCommandsGenerateConfigJson = JSON.stringify({
      settings: {
        worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: false,
      },
      servers: [{
        name: 'alpha', server: 'https://ntfy.example.com', token: 'tk_abc',
      }],
      contexts: [
        {
          id: 'abc123', name: 'test', type: 'http', interpreter: 'plain-text', topic: 'test',
          mode: 'send-once', show_visitor_info: false, primary_server: 'alpha', servers: ['alpha'],
        },
        {
          id: 'pfsense', name: 'email-test', type: 'email', interpreter: 'pfsense', topic: 'email-alerts',
          mode: 'send-once', show_visitor_info: false, primary_server: 'alpha', servers: ['alpha'],
        },
      ],
    });

    writeFileSync(testConfigPath, configJson);

    return;
  });

  afterEach(() => {
    if (existsSync(testConfigPath) === true) {
      unlinkSync(testConfigPath);
    }

    if (existsSync(testOutputPath) === true) {
      unlinkSync(testOutputPath);
    }

    return;
  });

  it('generates valid wrangler.toml', () => {
    generateWranglerToml(testConfigPath, testOutputPath);

    const toml: TestsCliCommandsGenerateTomlContent = readFileSync(testOutputPath, 'utf-8');

    expect(toml).toContain('name = "test-worker"');

    expect(toml).toContain('main = "packages/ntfy-reverse-proxy/build/src/worker/index.js"');

    expect(toml).toContain('compatibility_date');

    return;
  });

  it('generates routes from HTTP context ids and base_domain', () => {
    generateWranglerToml(testConfigPath, testOutputPath);

    const toml: TestsCliCommandsGenerateTomlContent = readFileSync(testOutputPath, 'utf-8');

    expect(toml).toContain('abc123.ntfy.example.com');

    expect(toml).toContain('custom_domain = true');

    return;
  });

  it('embeds config as vars', () => {
    generateWranglerToml(testConfigPath, testOutputPath);

    const toml: TestsCliCommandsGenerateTomlContent = readFileSync(testOutputPath, 'utf-8');

    expect(toml).toContain('[vars]');

    return;
  });

  it('generates email routing comments for email contexts', () => {
    generateWranglerToml(testConfigPath, testOutputPath);

    const toml: TestsCliCommandsGenerateTomlContent = readFileSync(testOutputPath, 'utf-8');

    expect(toml).toContain('Email Routing');

    expect(toml).toContain('pfsense@ntfy.example.com');

    return;
  });

  it('omits email routing section when no email contexts exist', () => {
    const configJson: TestsCliCommandsGenerateConfigJson = JSON.stringify({
      settings: {
        worker_name: 'test-worker', base_domain: 'ntfy.example.com', show_response_output: false,
      },
      servers: [{
        name: 'alpha', server: 'https://ntfy.example.com', token: 'tk_abc',
      }],
      contexts: [{
        id: 'xyz789', name: 'http-only', type: 'http', interpreter: 'plain-text', topic: 'test',
        mode: 'send-once', show_visitor_info: false, primary_server: 'alpha', servers: ['alpha'],
      }],
    });

    writeFileSync(testConfigPath, configJson);

    generateWranglerToml(testConfigPath, testOutputPath);

    const toml: TestsCliCommandsGenerateTomlContent = readFileSync(testOutputPath, 'utf-8');

    expect(toml).not.toContain('Email Routing');

    return;
  });

  return;
});

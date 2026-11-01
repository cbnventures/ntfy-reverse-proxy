import { randomUUID } from 'node:crypto';
import {
  copyFileSync, existsSync, mkdirSync, readFileSync, realpathSync, rmSync, symlinkSync, unlinkSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import {
  join, relative, resolve, sep,
} from 'node:path';

import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest';

import { loadConfig } from '../../../cli/commands/config-io.js';
import { generateWranglerToml, getWranglerTomlPath } from '../../../cli/commands/generate.js';
import { getWorkerEntryPath } from '../../../lib/package-runtime.js';
import { configSchema } from '../../../lib/schema.js';

import type {
  Tests_Cli_Commands_Generate_GenerateCommand_BindsTheSQLiteDeliveryOutboxDurableObject_Toml,
  Tests_Cli_Commands_Generate_GenerateCommand_ConfigJson,
  Tests_Cli_Commands_Generate_GenerateCommand_GeneratesEmailRoutingCommentsForEmailContexts_Toml,
  Tests_Cli_Commands_Generate_GenerateCommand_GeneratesRoutesFromHTTPContextIdsAndBaseDomain_Toml,
  Tests_Cli_Commands_Generate_GenerateCommand_GeneratesValidWranglerToml_Toml,
  Tests_Cli_Commands_Generate_GenerateCommand_OmitsEmailRoutingSectionWhenNoEmailContextsExist_ConfigJson,
  Tests_Cli_Commands_Generate_GenerateCommand_OmitsEmailRoutingSectionWhenNoEmailContextsExist_Toml,
  Tests_Cli_Commands_Generate_GenerateCommand_PointsMainAtTheBundledWorkerEntry_Toml,
  Tests_Cli_Commands_Generate_GenerateCommand_ResolvesTheWorkerImportFromASymlinkedConfigFolder_BundleDir,
  Tests_Cli_Commands_Generate_GenerateCommand_ResolvesTheWorkerImportFromASymlinkedConfigFolder_EntryLines,
  Tests_Cli_Commands_Generate_GenerateCommand_ResolvesTheWorkerImportFromASymlinkedConfigFolder_ImportPath,
  Tests_Cli_Commands_Generate_GenerateCommand_ResolvesTheWorkerImportFromASymlinkedConfigFolder_LinkedDir,
  Tests_Cli_Commands_Generate_GenerateCommand_ResolvesTheWorkerImportFromASymlinkedConfigFolder_RealDir,
  Tests_Cli_Commands_Generate_GenerateCommand_WritesNextToTheConfigFileByDefault_ConfigPath,
  Tests_Cli_Commands_Generate_GenerateCommand_WritesTheConfigAndAnEntryThatImportsTheWorker_BundledConfig,
  Tests_Cli_Commands_Generate_GenerateCommand_WritesTheConfigAndAnEntryThatImportsTheWorker_BundleDir,
  Tests_Cli_Commands_Generate_GenerateCommand_WritesTheConfigAndAnEntryThatImportsTheWorker_Entry,
  Tests_Cli_Commands_Generate_GenerateCommand_WritesTheConfigAndAnEntryThatImportsTheWorker_ExpectedConfig,
  Tests_Cli_Commands_Generate_GenerateCommand_WritesTheConfigAndAnEntryThatImportsTheWorker_ExpectedImport,
  Tests_Cli_Commands_Generate_GenerateCommand_WritesTheConfigAndAnEntryThatImportsTheWorker_WorkerEntryPath,
  Tests_Cli_Commands_Generate_TestConfigPath,
  Tests_Cli_Commands_Generate_TestConfigPathFragment,
  Tests_Cli_Commands_Generate_TestConfigTmpDir,
  Tests_Cli_Commands_Generate_TestOutputDir,
  Tests_Cli_Commands_Generate_TestOutputPath,
} from '../../../types/tests/cli/commands/generate.test.d.ts';

const testConfigPathFragment: Tests_Cli_Commands_Generate_TestConfigPathFragment = `ntfy-test-gen-config-${randomUUID()}.json`;

const testConfigTmpDir: Tests_Cli_Commands_Generate_TestConfigTmpDir = tmpdir();

const testConfigPath: Tests_Cli_Commands_Generate_TestConfigPath = join(testConfigTmpDir, testConfigPathFragment);

const testOutputDir: Tests_Cli_Commands_Generate_TestOutputDir = join(testConfigTmpDir, `ntfy-test-gen-wrangler-${randomUUID()}`);

const testOutputPath: Tests_Cli_Commands_Generate_TestOutputPath = join(testOutputDir, 'wrangler.toml');

/**
 * Tests - CLI - Commands - Generate - Generate Command.
 *
 * @since 2.0.0
 */
describe('generate command', () => {
  beforeEach(() => {
    const configJson: Tests_Cli_Commands_Generate_GenerateCommand_ConfigJson = JSON.stringify({
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
          id: 'abc123',
          name: 'test',
          type: 'http',
          interpreter: 'plain-text',
          topic: 'test',
          mode: 'send-once',
          show_visitor_info: false,
          primary_server: 'alpha',
          servers: ['alpha'],
        },
        {
          id: 'pfsense',
          name: 'email-test',
          type: 'email',
          interpreter: 'pfsense',
          topic: 'email-alerts',
          mode: 'send-once',
          show_visitor_info: false,
          primary_server: 'alpha',
          servers: ['alpha'],
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

    rmSync(testOutputDir, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('generates valid wrangler.toml', () => {
    generateWranglerToml(testConfigPath, testOutputPath);

    const toml: Tests_Cli_Commands_Generate_GenerateCommand_GeneratesValidWranglerToml_Toml = readFileSync(testOutputPath, 'utf-8');

    expect(toml).toContain('name = "test-worker"');

    expect(toml).toContain('compatibility_date');

    return;
  });

  it('points main at the bundled Worker entry', () => {
    generateWranglerToml(testConfigPath, testOutputPath);

    const toml: Tests_Cli_Commands_Generate_GenerateCommand_PointsMainAtTheBundledWorkerEntry_Toml = readFileSync(testOutputPath, 'utf-8');

    expect(toml).toContain('main = ".wrangler/ntfy-reverse-proxy/worker.js"');

    expect(toml).not.toContain('[vars]');

    return;
  });

  it('writes the config and an entry that imports the Worker', () => {
    generateWranglerToml(testConfigPath, testOutputPath);

    const bundleDir: Tests_Cli_Commands_Generate_GenerateCommand_WritesTheConfigAndAnEntryThatImportsTheWorker_BundleDir = join(testOutputDir, '.wrangler', 'ntfy-reverse-proxy');
    const bundledConfig: Tests_Cli_Commands_Generate_GenerateCommand_WritesTheConfigAndAnEntryThatImportsTheWorker_BundledConfig = JSON.parse(readFileSync(join(bundleDir, 'config.json'), 'utf-8'));
    const expectedConfig: Tests_Cli_Commands_Generate_GenerateCommand_WritesTheConfigAndAnEntryThatImportsTheWorker_ExpectedConfig = configSchema.parse(loadConfig(testConfigPath));
    const entry: Tests_Cli_Commands_Generate_GenerateCommand_WritesTheConfigAndAnEntryThatImportsTheWorker_Entry = readFileSync(join(bundleDir, 'worker.js'), 'utf-8');
    const workerEntryPath: Tests_Cli_Commands_Generate_GenerateCommand_WritesTheConfigAndAnEntryThatImportsTheWorker_WorkerEntryPath = realpathSync(getWorkerEntryPath());
    const expectedImport: Tests_Cli_Commands_Generate_GenerateCommand_WritesTheConfigAndAnEntryThatImportsTheWorker_ExpectedImport = relative(realpathSync(bundleDir), workerEntryPath).split(sep).join('/');

    expect(bundledConfig).toEqual(expectedConfig);

    expect(entry).toContain(`import { createWorker } from "${expectedImport}";`);

    expect(entry).toContain('import config from "./config.json";');

    expect(entry).toContain('export default createWorker(config);');

    expect(entry).toContain(`export { DeliveryOutbox } from "${expectedImport}";`);

    expect(existsSync(workerEntryPath)).toBe(true);

    return;
  });

  it('writes next to the config file by default', () => {
    const configPath: Tests_Cli_Commands_Generate_GenerateCommand_WritesNextToTheConfigFileByDefault_ConfigPath = join(testOutputDir, 'config.json');

    mkdirSync(testOutputDir, { recursive: true });

    copyFileSync(testConfigPath, configPath);

    generateWranglerToml(configPath);

    expect(getWranglerTomlPath(configPath)).toBe(testOutputPath);

    expect(existsSync(testOutputPath)).toBe(true);

    expect(existsSync(join(testOutputDir, '.wrangler', 'ntfy-reverse-proxy', 'worker.js'))).toBe(true);

    return;
  });

  it('resolves the worker import from a symlinked config folder', () => {
    const realDir: Tests_Cli_Commands_Generate_GenerateCommand_ResolvesTheWorkerImportFromASymlinkedConfigFolder_RealDir = join(testOutputDir, 'real', 'nested');
    const linkedDir: Tests_Cli_Commands_Generate_GenerateCommand_ResolvesTheWorkerImportFromASymlinkedConfigFolder_LinkedDir = join(testOutputDir, 'linked');

    mkdirSync(realDir, { recursive: true });

    symlinkSync(realDir, linkedDir, 'junction');

    copyFileSync(testConfigPath, join(linkedDir, 'config.json'));

    generateWranglerToml(join(linkedDir, 'config.json'));

    const bundleDir: Tests_Cli_Commands_Generate_GenerateCommand_ResolvesTheWorkerImportFromASymlinkedConfigFolder_BundleDir = realpathSync(join(linkedDir, '.wrangler', 'ntfy-reverse-proxy'));
    const entryLines: Tests_Cli_Commands_Generate_GenerateCommand_ResolvesTheWorkerImportFromASymlinkedConfigFolder_EntryLines = readFileSync(join(bundleDir, 'worker.js'), 'utf-8').split('\n');
    const importPath: Tests_Cli_Commands_Generate_GenerateCommand_ResolvesTheWorkerImportFromASymlinkedConfigFolder_ImportPath = (entryLines[1] ?? '').split('"')[1] ?? '';

    expect(existsSync(resolve(bundleDir, importPath))).toBe(true);

    return;
  });

  it('generates routes from HTTP context ids and base_domain', () => {
    generateWranglerToml(testConfigPath, testOutputPath);

    const toml: Tests_Cli_Commands_Generate_GenerateCommand_GeneratesRoutesFromHTTPContextIdsAndBaseDomain_Toml = readFileSync(testOutputPath, 'utf-8');

    expect(toml).toContain('abc123.ntfy.example.com');

    expect(toml).toContain('custom_domain = true');

    return;
  });

  it('binds the SQLite delivery outbox Durable Object', () => {
    generateWranglerToml(testConfigPath, testOutputPath);

    const toml: Tests_Cli_Commands_Generate_GenerateCommand_BindsTheSQLiteDeliveryOutboxDurableObject_Toml = readFileSync(testOutputPath, 'utf-8');

    expect(toml).toContain('[[durable_objects.bindings]]');

    expect(toml).toContain('name = "DELIVERY_OUTBOX"');

    expect(toml).toContain('new_sqlite_classes = ["DeliveryOutbox"]');

    return;
  });

  it('generates email routing comments for email contexts', () => {
    generateWranglerToml(testConfigPath, testOutputPath);

    const toml: Tests_Cli_Commands_Generate_GenerateCommand_GeneratesEmailRoutingCommentsForEmailContexts_Toml = readFileSync(testOutputPath, 'utf-8');

    expect(toml).toContain('Email Routing');

    expect(toml).toContain('pfsense@ntfy.example.com');

    return;
  });

  it('omits email routing section when no email contexts exist', () => {
    const configJson: Tests_Cli_Commands_Generate_GenerateCommand_OmitsEmailRoutingSectionWhenNoEmailContextsExist_ConfigJson = JSON.stringify({
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
        id: 'xyz789',
        name: 'http-only',
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

    generateWranglerToml(testConfigPath, testOutputPath);

    const toml: Tests_Cli_Commands_Generate_GenerateCommand_OmitsEmailRoutingSectionWhenNoEmailContextsExist_Toml = readFileSync(testOutputPath, 'utf-8');

    expect(toml).not.toContain('Email Routing');

    return;
  });

  return;
});

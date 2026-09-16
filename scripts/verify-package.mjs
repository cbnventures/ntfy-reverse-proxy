import { spawnSync } from 'node:child_process';
import {
  existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';

import { getNpmPackFilePaths } from './lib/npm-pack-report.mjs';

/**
 * Verify Package - Run.
 *
 * Confirms the npm file boundary and exercises the compiled CLI from a
 * clean consumer directory before a package can finish building.
 *
 * @returns {void}
 *
 * @since UNRELEASED
 */
function run() {
  const packageDirectory = process.cwd();
  const packageJsonPath = join(packageDirectory, 'package.json');
  const packageJsonRaw = readFileSync(packageJsonPath, 'utf-8');
  const packageJson = JSON.parse(packageJsonRaw);
  const packageName = packageJson['name'];
  const packageVersion = packageJson['version'];
  const packageBins = packageJson['bin'];

  if (typeof packageName !== 'string' || packageName.length === 0) {
    throw new Error('The package name is missing or invalid.');
  }

  if (typeof packageVersion !== 'string' || packageVersion.length === 0) {
    throw new Error('The package version is missing or invalid.');
  }

  if (typeof packageBins !== 'object' || packageBins === null) {
    throw new Error('The package bin map is missing or invalid.');
  }

  const commandLineRelativePath = Object.values(packageBins)[0];

  if (typeof commandLineRelativePath !== 'string' || commandLineRelativePath.length === 0) {
    throw new Error('The package bin map does not contain a command-line entry point.');
  }

  const temporaryDirectory = mkdtempSync(join(tmpdir(), `${packageName}-package-verification-`));
  const npmCacheDirectory = join(temporaryDirectory, 'npm-cache');
  const configHomeDirectory = join(temporaryDirectory, 'config-home');
  const consumerDirectory = join(temporaryDirectory, 'consumer');
  const commandLinePath = resolve(packageDirectory, commandLineRelativePath);
  const workerRelativePath = 'build/src/worker/index.js';
  const configSampleRelativePath = 'build/config.sample.json';
  const npmCommand = (process.platform === 'win32') ? 'npm.cmd' : 'npm';

  mkdirSync(npmCacheDirectory, { recursive: true });
  mkdirSync(configHomeDirectory, { recursive: true });
  mkdirSync(consumerDirectory, { recursive: true });

  try {
    const packResult = spawnSync(npmCommand, [
      'pack',
      '--dry-run',
      '--json',
      '--ignore-scripts',
      '--cache',
      npmCacheDirectory,
    ], {
      cwd: packageDirectory,
      encoding: 'utf-8',
    });

    if (packResult['status'] !== 0) {
      const packErrorLines = [
        'npm package inspection failed:',
        packResult['stderr'],
      ];

      throw new Error(packErrorLines.join('\n'));
    }

    const packReports = JSON.parse(packResult['stdout']);
    const packedFilePaths = getNpmPackFilePaths(packReports, packageName);
    const expectedFilePaths = [
      commandLineRelativePath,
      workerRelativePath,
      configSampleRelativePath,
    ];

    for (const expectedFilePath of expectedFilePaths) {
      if (packedFilePaths.includes(expectedFilePath) === false) {
        throw new Error(`The npm package is missing "${expectedFilePath}".`);
      }
    }

    const commandEnvironment = {
      ...process.env,
      APPDATA: configHomeDirectory,
      NO_COLOR: '1',
      XDG_CONFIG_HOME: configHomeDirectory,
    };

    const validationResult = spawnSync(process.execPath, [
      commandLinePath,
      'validate',
    ], {
      cwd: consumerDirectory,
      encoding: 'utf-8',
      env: commandEnvironment,
    });
    const validationOutput = [
      validationResult['stdout'],
      validationResult['stderr'],
    ].join('\n');

    if (validationResult['status'] !== 0 || validationOutput.includes('Config is valid.') === false) {
      const validationErrorLines = [
        'First-run config validation failed:',
        validationOutput,
      ];

      throw new Error(validationErrorLines.join('\n'));
    }

    const generatedConfigPath = join(configHomeDirectory, packageName, 'config.json');

    if (existsSync(generatedConfigPath) === false) {
      throw new Error('The CLI did not create "config.json" from the packaged sample.');
    }

    const versionResult = spawnSync(process.execPath, [
      commandLinePath,
      '--version',
    ], {
      cwd: consumerDirectory,
      encoding: 'utf-8',
      env: commandEnvironment,
    });

    if (versionResult['status'] !== 0 || versionResult['stdout'].trim() !== packageVersion) {
      throw new Error(`The CLI version does not match package.json. Expected "${packageVersion}" but received "${versionResult['stdout'].trim()}".`);
    }

    const generationResult = spawnSync(process.execPath, [
      commandLinePath,
      'generate',
    ], {
      cwd: consumerDirectory,
      encoding: 'utf-8',
      env: commandEnvironment,
    });

    if (generationResult['status'] !== 0) {
      const generationErrorLines = [
        'Wrangler config generation failed:',
        generationResult['stderr'],
      ];

      throw new Error(generationErrorLines.join('\n'));
    }

    const wranglerConfigPath = join(consumerDirectory, 'wrangler.toml');
    const wranglerConfigRaw = readFileSync(wranglerConfigPath, 'utf-8');
    const mainLine = wranglerConfigRaw.split('\n').find((line) => line.startsWith('main = '));

    if (mainLine === undefined) {
      throw new Error('The generated "wrangler.toml" file is missing its main entry.');
    }

    const workerConfigPath = JSON.parse(mainLine.slice('main = '.length));

    if (typeof workerConfigPath !== 'string' || workerConfigPath.length === 0) {
      throw new Error('The generated Worker entry path is invalid.');
    }

    const generatedWorkerPath = resolve(dirname(wranglerConfigPath), workerConfigPath);

    if (existsSync(generatedWorkerPath) === false) {
      throw new Error(`The generated Worker entry does not exist at "${generatedWorkerPath}".`);
    }
  } finally {
    rmSync(temporaryDirectory, { recursive: true });
  }

  process.stdout.write(`verify-package: ${packageName}@${packageVersion} is ready for npm packaging.\n`);

  return;
}

run();

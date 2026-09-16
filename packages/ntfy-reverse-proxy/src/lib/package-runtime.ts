import { existsSync, readFileSync } from 'node:fs';
import {
  dirname, extname, join, resolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';

import type {
  Lib_PackageRuntime_GetConfigSamplePath_BuiltSamplePath,
  Lib_PackageRuntime_GetConfigSamplePath_PackageRoot,
  Lib_PackageRuntime_GetConfigSamplePath_RepositorySamplePath,
  Lib_PackageRuntime_GetConfigSamplePath_Returns,
  Lib_PackageRuntime_GetPackageRoot_CurrentDirectory,
  Lib_PackageRuntime_GetPackageRoot_CurrentFilePath,
  Lib_PackageRuntime_GetPackageRoot_PackageJsonPath,
  Lib_PackageRuntime_GetPackageRoot_ParentDirectory,
  Lib_PackageRuntime_GetPackageRoot_Returns,
  Lib_PackageRuntime_GetPackageVersion_PackageJson,
  Lib_PackageRuntime_GetPackageVersion_PackageJsonPath,
  Lib_PackageRuntime_GetPackageVersion_PackageJsonRaw,
  Lib_PackageRuntime_GetPackageVersion_PackageRoot,
  Lib_PackageRuntime_GetPackageVersion_Returns,
  Lib_PackageRuntime_GetPackageVersion_Version,
  Lib_PackageRuntime_GetWorkerEntryPath_CurrentDirectory,
  Lib_PackageRuntime_GetWorkerEntryPath_CurrentFilePath,
  Lib_PackageRuntime_GetWorkerEntryPath_Extension,
  Lib_PackageRuntime_GetWorkerEntryPath_Returns,
  Lib_PackageRuntime_GetWorkerEntryPath_WorkerEntryPath,
  Lib_PackageRuntime_GetWorkerEntryPath_WorkerFileName,
} from '../types/lib/package-runtime.d.ts';

/**
 * Lib - Package Runtime - Get Config Sample Path.
 *
 * Finds the built config template in an installed package and falls back
 * to the repository template when the CLI runs directly from source.
 *
 * @returns {Lib_PackageRuntime_GetConfigSamplePath_Returns}
 *
 * @since 2.1.4
 */
function getConfigSamplePath(): Lib_PackageRuntime_GetConfigSamplePath_Returns {
  const packageRoot: Lib_PackageRuntime_GetConfigSamplePath_PackageRoot = getPackageRoot();
  const builtSamplePath: Lib_PackageRuntime_GetConfigSamplePath_BuiltSamplePath = join(packageRoot, 'build', 'config.sample.json');

  if (existsSync(builtSamplePath) === true) {
    return builtSamplePath;
  }

  const repositorySamplePath: Lib_PackageRuntime_GetConfigSamplePath_RepositorySamplePath = resolve(packageRoot, '..', '..', 'config.sample.json');

  if (existsSync(repositorySamplePath) === true) {
    return repositorySamplePath;
  }

  throw new Error('The packaged "config.sample.json" file could not be found. Reinstall ntfy Reverse Proxy and try again.');
}

/**
 * Lib - Package Runtime - Get Package Root.
 *
 * Walks upward from this module to find the nearest package manifest,
 * which works from both TypeScript source and compiled npm output.
 *
 * @returns {Lib_PackageRuntime_GetPackageRoot_Returns}
 *
 * @since 2.1.4
 */
function getPackageRoot(): Lib_PackageRuntime_GetPackageRoot_Returns {
  const currentFilePath: Lib_PackageRuntime_GetPackageRoot_CurrentFilePath = fileURLToPath(import.meta.url);
  let currentDirectory: Lib_PackageRuntime_GetPackageRoot_CurrentDirectory = dirname(currentFilePath);

  while (true) {
    const packageJsonPath: Lib_PackageRuntime_GetPackageRoot_PackageJsonPath = join(currentDirectory, 'package.json');

    if (existsSync(packageJsonPath) === true) {
      return currentDirectory;
    }

    const parentDirectory: Lib_PackageRuntime_GetPackageRoot_ParentDirectory = dirname(currentDirectory);

    if (parentDirectory === currentDirectory) {
      break;
    }

    currentDirectory = parentDirectory;
  }

  throw new Error('The ntfy Reverse Proxy package root could not be found. Reinstall the package and try again.');
}

/**
 * Lib - Package Runtime - Get Package Version.
 *
 * Reads the installed package manifest so every CLI version display stays
 * synchronized with the version npm actually installed.
 *
 * @returns {Lib_PackageRuntime_GetPackageVersion_Returns}
 *
 * @since 2.1.4
 */
function getPackageVersion(): Lib_PackageRuntime_GetPackageVersion_Returns {
  const packageRoot: Lib_PackageRuntime_GetPackageVersion_PackageRoot = getPackageRoot();
  const packageJsonPath: Lib_PackageRuntime_GetPackageVersion_PackageJsonPath = join(packageRoot, 'package.json');
  const packageJsonRaw: Lib_PackageRuntime_GetPackageVersion_PackageJsonRaw = readFileSync(packageJsonPath, 'utf-8');
  const packageJson: Lib_PackageRuntime_GetPackageVersion_PackageJson = JSON.parse(packageJsonRaw);
  const version: Lib_PackageRuntime_GetPackageVersion_Version = packageJson['version'];

  if (typeof version !== 'string' || version.length === 0) {
    throw new Error('The ntfy Reverse Proxy package version is missing or invalid. Reinstall the package and try again.');
  }

  return version;
}

/**
 * Lib - Package Runtime - Get Worker Entry Path.
 *
 * Resolves the Worker beside this module so generated Wrangler configs
 * work in the monorepo, global installs, and temporary npx installs.
 *
 * @returns {Lib_PackageRuntime_GetWorkerEntryPath_Returns}
 *
 * @since 2.1.4
 */
function getWorkerEntryPath(): Lib_PackageRuntime_GetWorkerEntryPath_Returns {
  const currentFilePath: Lib_PackageRuntime_GetWorkerEntryPath_CurrentFilePath = fileURLToPath(import.meta.url);
  const currentDirectory: Lib_PackageRuntime_GetWorkerEntryPath_CurrentDirectory = dirname(currentFilePath);
  const extension: Lib_PackageRuntime_GetWorkerEntryPath_Extension = extname(currentFilePath);
  const workerFileName: Lib_PackageRuntime_GetWorkerEntryPath_WorkerFileName = `index${extension}`;
  const workerEntryPath: Lib_PackageRuntime_GetWorkerEntryPath_WorkerEntryPath = resolve(currentDirectory, '..', 'worker', workerFileName);

  if (existsSync(workerEntryPath) === false) {
    throw new Error('The packaged ntfy Reverse Proxy Worker entry point could not be found. Reinstall the package and try again.');
  }

  return workerEntryPath;
}

export {
  getConfigSamplePath,
  getPackageRoot,
  getPackageVersion,
  getWorkerEntryPath,
};

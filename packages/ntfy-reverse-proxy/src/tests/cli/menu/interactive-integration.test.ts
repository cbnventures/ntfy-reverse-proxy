import {
  existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { spawn } from 'node-pty';
import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest';

import type {
  Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_OsTmpDir,
  Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtConfigDirSelection_CliPath,
  Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtConfigDirSelection_ExitCode,
  Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtConfigDirSelection_SubDir,
  Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtConfigDirSelection_Term,
  Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtMainMenu_CliPath,
  Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtMainMenu_ExitCode,
  Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtMainMenu_Term,
  Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyWhenSelectingExit_CliPath,
  Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyWhenSelectingExit_ExitCode,
  Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyWhenSelectingExit_Term,
  Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_TempDir,
  Tests_Cli_Menu_InteractiveIntegration_ResolveTsxCli_CurrentDir,
  Tests_Cli_Menu_InteractiveIntegration_ResolveTsxCli_Dir,
  Tests_Cli_Menu_InteractiveIntegration_ResolveTsxCli_Returns,
  Tests_Cli_Menu_InteractiveIntegration_ResolveTsxCli_TsxCli,
  Tests_Cli_Menu_InteractiveIntegration_TsxBin,
  Tests_Cli_Menu_InteractiveIntegration_WaitFor_Buffer,
  Tests_Cli_Menu_InteractiveIntegration_WaitFor_Disposable,
  Tests_Cli_Menu_InteractiveIntegration_WaitFor_Pattern,
  Tests_Cli_Menu_InteractiveIntegration_WaitFor_Returns,
  Tests_Cli_Menu_InteractiveIntegration_WaitFor_Term,
  Tests_Cli_Menu_InteractiveIntegration_WaitFor_TimeoutMs,
  Tests_Cli_Menu_InteractiveIntegration_WaitFor_Timer,
  Tests_Cli_Menu_InteractiveIntegration_WaitForExit_Disposable,
  Tests_Cli_Menu_InteractiveIntegration_WaitForExit_Returns,
  Tests_Cli_Menu_InteractiveIntegration_WaitForExit_Term,
  Tests_Cli_Menu_InteractiveIntegration_WaitForExit_TimeoutMs,
  Tests_Cli_Menu_InteractiveIntegration_WaitForExit_Timer,
} from '../../../types/tests/cli/menu/interactive-integration.test.d.ts';

function resolveTsxCli(): Tests_Cli_Menu_InteractiveIntegration_ResolveTsxCli_Returns {
  const currentDir: Tests_Cli_Menu_InteractiveIntegration_ResolveTsxCli_CurrentDir = dirname(fileURLToPath(import.meta.url));

  let dir: Tests_Cli_Menu_InteractiveIntegration_ResolveTsxCli_Dir = currentDir;

  while (dir !== dirname(dir)) {
    const tsxCli: Tests_Cli_Menu_InteractiveIntegration_ResolveTsxCli_TsxCli = join(dir, 'node_modules', 'tsx', 'dist', 'cli.mjs');

    if (existsSync(tsxCli) === true) {
      return tsxCli;
    }

    dir = dirname(dir);
  }

  throw new Error('tsx not found in any ancestor node_modules');
}

const tsxBin: Tests_Cli_Menu_InteractiveIntegration_TsxBin = resolveTsxCli();

function waitFor(
  term: Tests_Cli_Menu_InteractiveIntegration_WaitFor_Term,
  pattern: Tests_Cli_Menu_InteractiveIntegration_WaitFor_Pattern,
  timeoutMs: Tests_Cli_Menu_InteractiveIntegration_WaitFor_TimeoutMs,
): Tests_Cli_Menu_InteractiveIntegration_WaitFor_Returns {
  return new Promise((resolvePromise, rejectPromise) => {
    let buffer: Tests_Cli_Menu_InteractiveIntegration_WaitFor_Buffer = '';

    let timer: Tests_Cli_Menu_InteractiveIntegration_WaitFor_Timer = undefined;

    const disposable: Tests_Cli_Menu_InteractiveIntegration_WaitFor_Disposable = term.onData((data) => {
      buffer += data;

      if (buffer.includes(pattern) === true) {
        clearTimeout(timer);

        disposable.dispose();

        resolvePromise(buffer);
      }

      return;
    });

    timer = setTimeout(() => {
      disposable.dispose();

      rejectPromise(new Error(`Timeout waiting for "${pattern}" after ${timeoutMs}ms`));

      return;
    }, timeoutMs);

    return;
  });
}

function waitForExit(
  term: Tests_Cli_Menu_InteractiveIntegration_WaitForExit_Term,
  timeoutMs: Tests_Cli_Menu_InteractiveIntegration_WaitForExit_TimeoutMs,
): Tests_Cli_Menu_InteractiveIntegration_WaitForExit_Returns {
  return new Promise((resolvePromise, rejectPromise) => {
    let timer: Tests_Cli_Menu_InteractiveIntegration_WaitForExit_Timer = undefined;

    const disposable: Tests_Cli_Menu_InteractiveIntegration_WaitForExit_Disposable = term.onExit(({ exitCode }) => {
      clearTimeout(timer);

      disposable.dispose();

      resolvePromise(exitCode);

      return;
    });

    timer = setTimeout(() => {
      disposable.dispose();

      term.kill();

      rejectPromise(new Error(`Timeout waiting for exit after ${timeoutMs}ms`));

      return;
    }, timeoutMs);

    return;
  });
}

describe('interactiveMenu (integration)', () => {
  let tempDir: Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_TempDir = undefined;

  beforeEach(() => {
    const osTmpDir: Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_OsTmpDir = tmpdir();

    tempDir = mkdtempSync(join(osTmpDir, 'nrp-integration-'));

    writeFileSync(join(tempDir, 'config.json'), '{}');

    return;
  });

  afterEach(() => {
    rmSync(tempDir!, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('should exit cleanly on Ctrl+C at main menu', async () => {
    const cliPath: Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtMainMenu_CliPath = resolve('src/cli/index.ts');
    const term: Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtMainMenu_Term = spawn(process.execPath, [
      tsxBin,
      cliPath,
    ], {
      cols: 80,
      rows: 24,
      cwd: tempDir!,
      env: {
        ...process.env,
        NO_COLOR: '1',
        FORCE_COLOR: '0',
        XDG_CONFIG_HOME: join(tempDir!, '.xdg-config'),
      },
    });

    await waitFor(term, 'What would you like to do', 15000);

    term.write('\x03');

    const exitCode: Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtMainMenu_ExitCode = await waitForExit(term, 5000);

    expect(exitCode).toBe(0);

    return;
  });

  it('should exit cleanly when selecting Exit', async () => {
    const cliPath: Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyWhenSelectingExit_CliPath = resolve('src/cli/index.ts');
    const term: Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyWhenSelectingExit_Term = spawn(process.execPath, [
      tsxBin,
      cliPath,
    ], {
      cols: 80,
      rows: 24,
      cwd: tempDir!,
      env: {
        ...process.env,
        NO_COLOR: '1',
        FORCE_COLOR: '0',
        XDG_CONFIG_HOME: join(tempDir!, '.xdg-config'),
      },
    });

    await waitFor(term, 'What would you like to do', 15000);

    term.write('\x1b[B\x1b[B\x1b[B\x1b[B\r');

    const exitCode: Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyWhenSelectingExit_ExitCode = await waitForExit(term, 5000);

    expect(exitCode).toBe(0);

    return;
  });

  it('should exit cleanly on Ctrl+C at config dir selection', async () => {
    const subDir: Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtConfigDirSelection_SubDir = join(tempDir!, 'sub');

    mkdirSync(subDir);

    writeFileSync(join(subDir, 'config.json'), '{}');

    writeFileSync(join(tempDir!, 'package.json'), JSON.stringify({
      name: 'test',
      version: '0.0.0',
      type: 'module',
    }));

    const cliPath: Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtConfigDirSelection_CliPath = resolve('src/cli/index.ts');
    const term: Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtConfigDirSelection_Term = spawn(process.execPath, [
      tsxBin,
      cliPath,
    ], {
      cols: 80,
      rows: 24,
      cwd: subDir,
      env: {
        ...process.env,
        NO_COLOR: '1',
        FORCE_COLOR: '0',
        XDG_CONFIG_HOME: join(tempDir!, '.xdg-config'),
      },
    });

    await waitFor(term, 'Multiple config files found', 15000);

    term.write('\x03');

    const exitCode: Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtConfigDirSelection_ExitCode = await waitForExit(term, 5000);

    expect(exitCode).toBe(0);

    return;
  });

  return;
});

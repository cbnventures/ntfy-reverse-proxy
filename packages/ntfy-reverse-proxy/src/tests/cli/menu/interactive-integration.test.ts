import {
  mkdirSync, mkdtempSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

import { spawn } from 'node-pty';
import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest';

import type {
  Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_OsTmpDir,
  Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtConfigDirSelection_CliPath,
  Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtConfigDirSelection_ExitCode,
  Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtConfigDirSelection_ExitPromise,
  Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtConfigDirSelection_SubDir,
  Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtConfigDirSelection_Term,
  Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtMainMenu_CliPath,
  Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtMainMenu_ExitCode,
  Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtMainMenu_ExitPromise,
  Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtMainMenu_Term,
  Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyWhenSelectingExit_CliPath,
  Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyWhenSelectingExit_ExitCode,
  Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyWhenSelectingExit_ExitPromise,
  Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyWhenSelectingExit_Term,
  Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_TempDir,
  Tests_Cli_Menu_InteractiveIntegration_TsxLoader,
  Tests_Cli_Menu_InteractiveIntegration_WaitFor_Buffer,
  Tests_Cli_Menu_InteractiveIntegration_WaitFor_DataDisposable,
  Tests_Cli_Menu_InteractiveIntegration_WaitFor_ExitDisposable,
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

const tsxLoader: Tests_Cli_Menu_InteractiveIntegration_TsxLoader = import.meta.resolve('tsx');

function waitFor(
  term: Tests_Cli_Menu_InteractiveIntegration_WaitFor_Term,
  pattern: Tests_Cli_Menu_InteractiveIntegration_WaitFor_Pattern,
  timeoutMs: Tests_Cli_Menu_InteractiveIntegration_WaitFor_TimeoutMs,
): Tests_Cli_Menu_InteractiveIntegration_WaitFor_Returns {
  return new Promise((resolvePromise, rejectPromise) => {
    let buffer: Tests_Cli_Menu_InteractiveIntegration_WaitFor_Buffer = '';

    let timer: Tests_Cli_Menu_InteractiveIntegration_WaitFor_Timer = undefined;

    let exitDisposable: Tests_Cli_Menu_InteractiveIntegration_WaitFor_ExitDisposable = undefined;

    const dataDisposable: Tests_Cli_Menu_InteractiveIntegration_WaitFor_DataDisposable = term.onData((data) => {
      buffer += data;

      if (buffer.includes(pattern) === true) {
        clearTimeout(timer);

        dataDisposable.dispose();

        if (exitDisposable !== undefined) {
          exitDisposable.dispose();
        }

        resolvePromise(buffer);
      }

      return;
    });

    exitDisposable = term.onExit((event) => {
      clearTimeout(timer);

      dataDisposable.dispose();

      if (exitDisposable !== undefined) {
        exitDisposable.dispose();
      }

      rejectPromise(new Error(`Terminal exited with code ${event.exitCode} before "${pattern}". Output: ${buffer}`));

      return;
    });

    timer = setTimeout(() => {
      dataDisposable.dispose();

      if (exitDisposable !== undefined) {
        exitDisposable.dispose();
      }

      term.kill();

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

    const disposable: Tests_Cli_Menu_InteractiveIntegration_WaitForExit_Disposable = term.onExit((event) => {
      clearTimeout(timer);

      disposable.dispose();

      resolvePromise(event.exitCode);

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
      '--import',
      tsxLoader,
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

    const exitPromise: Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtMainMenu_ExitPromise = waitForExit(term, 5000);

    term.write('\x03');

    const exitCode: Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtMainMenu_ExitCode = await exitPromise;

    expect(exitCode).toBe(0);

    return;
  });

  it('should exit cleanly when selecting Exit', async () => {
    const cliPath: Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyWhenSelectingExit_CliPath = resolve('src/cli/index.ts');
    const term: Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyWhenSelectingExit_Term = spawn(process.execPath, [
      '--import',
      tsxLoader,
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

    const exitPromise: Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyWhenSelectingExit_ExitPromise = waitForExit(term, 5000);

    term.write('\x1b[B\x1b[B\x1b[B\x1b[B\r');

    const exitCode: Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyWhenSelectingExit_ExitCode = await exitPromise;

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
      '--import',
      tsxLoader,
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

    const exitPromise: Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtConfigDirSelection_ExitPromise = waitForExit(term, 5000);

    term.write('\x03');

    const exitCode: Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtConfigDirSelection_ExitCode = await exitPromise;

    expect(exitCode).toBe(0);

    return;
  });

  return;
});

import type { IDisposable, IPty } from 'node-pty';

/**
 * Tests - CLI - Menu - Interactive Integration - tsxLoader.
 *
 * @since 2.1.4
 */
export type Tests_Cli_Menu_InteractiveIntegration_TsxLoader = string;

/**
 * Tests - CLI - Menu - Interactive Integration - interactiveMenu (integration).
 *
 * @since 2.1.1
 */
export type Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_TempDir = string | undefined;

export type Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_OsTmpDir = string;

/**
 * Tests - CLI - Menu - Interactive Integration - interactiveMenu (integration) - should exit cleanly on Ctrl+C at config dir selection.
 *
 * @since 2.1.1
 */
export type Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtConfigDirSelection_SubDir = string;

export type Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtConfigDirSelection_CliPath = string;

export type Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtConfigDirSelection_Term = IPty;

export type Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtConfigDirSelection_ExitPromise = Promise<number>;

export type Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtConfigDirSelection_ExitCode = number;

/**
 * Tests - CLI - Menu - Interactive Integration - interactiveMenu (integration) - should exit cleanly on Ctrl+C at main menu.
 *
 * @since 2.1.1
 */
export type Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtMainMenu_CliPath = string;

export type Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtMainMenu_Term = IPty;

export type Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtMainMenu_ExitPromise = Promise<number>;

export type Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyOnCtrlCAtMainMenu_ExitCode = number;

/**
 * Tests - CLI - Menu - Interactive Integration - interactiveMenu (integration) - should exit cleanly when selecting Exit.
 *
 * @since 2.1.1
 */
export type Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyWhenSelectingExit_CliPath = string;

export type Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyWhenSelectingExit_Term = IPty;

export type Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyWhenSelectingExit_ExitPromise = Promise<number>;

export type Tests_Cli_Menu_InteractiveIntegration_InteractiveMenuIntegration_ShouldExitCleanlyWhenSelectingExit_ExitCode = number;

/**
 * Tests - CLI - Menu - Interactive Integration - waitFor.
 *
 * @since 2.1.1
 */
export type Tests_Cli_Menu_InteractiveIntegration_WaitFor_Term = IPty;

export type Tests_Cli_Menu_InteractiveIntegration_WaitFor_Pattern = string;

export type Tests_Cli_Menu_InteractiveIntegration_WaitFor_TimeoutMs = number;

export type Tests_Cli_Menu_InteractiveIntegration_WaitFor_Returns = Promise<string>;

export type Tests_Cli_Menu_InteractiveIntegration_WaitFor_Buffer = string;

export type Tests_Cli_Menu_InteractiveIntegration_WaitFor_Timer = ReturnType<typeof setTimeout> | undefined;

export type Tests_Cli_Menu_InteractiveIntegration_WaitFor_ExitDisposable = IDisposable | undefined;

export type Tests_Cli_Menu_InteractiveIntegration_WaitFor_DataDisposable = IDisposable;

/**
 * Tests - CLI - Menu - Interactive Integration - waitForExit.
 *
 * @since 2.1.1
 */
export type Tests_Cli_Menu_InteractiveIntegration_WaitForExit_Term = IPty;

export type Tests_Cli_Menu_InteractiveIntegration_WaitForExit_TimeoutMs = number;

export type Tests_Cli_Menu_InteractiveIntegration_WaitForExit_Returns = Promise<number>;

export type Tests_Cli_Menu_InteractiveIntegration_WaitForExit_Timer = ReturnType<typeof setTimeout> | undefined;

export type Tests_Cli_Menu_InteractiveIntegration_WaitForExit_Disposable = IDisposable;

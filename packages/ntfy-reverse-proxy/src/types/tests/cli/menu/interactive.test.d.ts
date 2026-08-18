import prompts from 'prompts';

import type { vi } from 'vitest';

/**
 * Tests - CLI - Menu - Interactive - @cbnventures/nova/toolkit.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_CbnventuresNovaToolkit_Bootstrap_GetConfigDir = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_CbnventuresNovaToolkit_Bootstrap = {
  getConfigDir: Tests_Cli_Menu_Interactive_CbnventuresNovaToolkit_Bootstrap_GetConfigDir;
};

export type Tests_Cli_Menu_Interactive_CbnventuresNovaToolkit_CliHeader_Render = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_CbnventuresNovaToolkit_CliHeader = {
  render: Tests_Cli_Menu_Interactive_CbnventuresNovaToolkit_CliHeader_Render;
};

export type Tests_Cli_Menu_Interactive_CbnventuresNovaToolkit_Logger_Info = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_CbnventuresNovaToolkit_Logger_Warn = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_CbnventuresNovaToolkit_Logger_Error = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_CbnventuresNovaToolkit_Logger = {
  info: Tests_Cli_Menu_Interactive_CbnventuresNovaToolkit_Logger_Info;
  warn: Tests_Cli_Menu_Interactive_CbnventuresNovaToolkit_Logger_Warn;
  error: Tests_Cli_Menu_Interactive_CbnventuresNovaToolkit_Logger_Error;
};

/**
 * Tests - CLI - Menu - Interactive - Chalk.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_Chalk_ChalkDefault = Record<string, (input: string) => string>;

/**
 * Tests - CLI - Menu - Interactive - Chalk Identity.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_ChalkIdentity_S = string;

export type Tests_Cli_Menu_Interactive_ChalkIdentity_Returns = string;

/**
 * Tests - CLI - Menu - Interactive - ../../../cli/commands/context.js.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_CliCommandsContextJs_AddContext = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_CliCommandsContextJs_EditContext = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_CliCommandsContextJs_GenerateId = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_CliCommandsContextJs_GenerateToken = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_CliCommandsContextJs_ListContexts = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_CliCommandsContextJs_RemoveContext = ReturnType<typeof vi['fn']>;

/**
 * Tests - CLI - Menu - Interactive - ../../../cli/commands/deploy.js.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_CliCommandsDeployJs_Deploy = ReturnType<typeof vi['fn']>;

/**
 * Tests - CLI - Menu - Interactive - ../../../cli/commands/server.js.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_CliCommandsServerJs_AddServer = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_CliCommandsServerJs_EditServer = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_CliCommandsServerJs_ListServers = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_CliCommandsServerJs_RemoveServer = ReturnType<typeof vi['fn']>;

/**
 * Tests - CLI - Menu - Interactive - ../../../cli/commands/settings.js.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_CliCommandsSettingsJs_GetSettings = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_CliCommandsSettingsJs_UpdateSettings = ReturnType<typeof vi['fn']>;

/**
 * Tests - CLI - Menu - Interactive - Interactive Menu.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_InteractiveMenu_TempDir1 = string | undefined;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_TempDir2 = string | undefined;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_OsTmpDir = string;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_TempDir1Path = string;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_TempDir2Path = string;

/**
 * Tests - CLI - Menu - Interactive - Interactive Menu - Context Action Menu Includes Go Back As Last Choice.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_InteractiveMenu_ContextActionMenuIncludesGoBackAsLastChoice_Prompts_Default = typeof prompts;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ContextActionMenuIncludesGoBackAsLastChoice_Prompts = {
  default: Tests_Cli_Menu_Interactive_InteractiveMenu_ContextActionMenuIncludesGoBackAsLastChoice_Prompts_Default;
};

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ContextActionMenuIncludesGoBackAsLastChoice_PromptsDefaultUnknown = unknown;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ContextActionMenuIncludesGoBackAsLastChoice_MockPrompts = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ContextActionMenuIncludesGoBackAsLastChoice_Call = Record<string, unknown>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ContextActionMenuIncludesGoBackAsLastChoice_Choices = Record<string, unknown>[];

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ContextActionMenuIncludesGoBackAsLastChoice_LastChoice = Record<string, unknown>;

/**
 * Tests - CLI - Menu - Interactive - Interactive Menu - Context Edit Select Includes Go Back As Last Choice.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_InteractiveMenu_ContextEditSelectIncludesGoBackAsLastChoice_Prompts_Default = typeof prompts;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ContextEditSelectIncludesGoBackAsLastChoice_Prompts = {
  default: Tests_Cli_Menu_Interactive_InteractiveMenu_ContextEditSelectIncludesGoBackAsLastChoice_Prompts_Default;
};

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ContextEditSelectIncludesGoBackAsLastChoice_PromptsDefaultUnknown = unknown;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ContextEditSelectIncludesGoBackAsLastChoice_MockPrompts = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ContextEditSelectIncludesGoBackAsLastChoice_Call = Record<string, unknown>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ContextEditSelectIncludesGoBackAsLastChoice_Choices = Record<string, unknown>[];

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ContextEditSelectIncludesGoBackAsLastChoice_LastChoice = Record<string, unknown>;

/**
 * Tests - CLI - Menu - Interactive - Interactive Menu - Ctrl C At Context Edit Interpreter Aborts Without Writing.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditInterpreterAbortsWithoutWriting_Prompts_Default = typeof prompts;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditInterpreterAbortsWithoutWriting_Prompts = {
  default: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditInterpreterAbortsWithoutWriting_Prompts_Default;
};

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditInterpreterAbortsWithoutWriting_PromptsDefaultUnknown = unknown;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditInterpreterAbortsWithoutWriting_MockPrompts = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditInterpreterAbortsWithoutWriting_ContextModuleUnknown = unknown;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditInterpreterAbortsWithoutWriting_ContextModule = Record<string, unknown>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditInterpreterAbortsWithoutWriting_EditContext = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditInterpreterAbortsWithoutWriting_Call = Record<string, unknown>;

/**
 * Tests - CLI - Menu - Interactive - Interactive Menu - Ctrl C At Context Edit Mode Aborts After Answering 4 Prior Prompts.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditModeAbortsAfterAnswering4PriorPrompts_Prompts_Default = typeof prompts;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditModeAbortsAfterAnswering4PriorPrompts_Prompts = {
  default: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditModeAbortsAfterAnswering4PriorPrompts_Prompts_Default;
};

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditModeAbortsAfterAnswering4PriorPrompts_PromptsDefaultUnknown = unknown;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditModeAbortsAfterAnswering4PriorPrompts_MockPrompts = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditModeAbortsAfterAnswering4PriorPrompts_ContextModuleUnknown = unknown;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditModeAbortsAfterAnswering4PriorPrompts_ContextModule = Record<string, unknown>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditModeAbortsAfterAnswering4PriorPrompts_EditContext = ReturnType<typeof vi['fn']>;

/**
 * Tests - CLI - Menu - Interactive - Interactive Menu - Ctrl C At Server Edit Select Returns To Server Menu.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtServerEditSelectReturnsToServerMenu_Prompts_Default = typeof prompts;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtServerEditSelectReturnsToServerMenu_Prompts = {
  default: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtServerEditSelectReturnsToServerMenu_Prompts_Default;
};

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtServerEditSelectReturnsToServerMenu_PromptsDefaultUnknown = unknown;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtServerEditSelectReturnsToServerMenu_MockPrompts = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtServerEditSelectReturnsToServerMenu_Call = Record<string, unknown>;

/**
 * Tests - CLI - Menu - Interactive - Interactive Menu - Exits On Ctrl C At Config Dir Selection.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsOnCtrlCAtConfigDirSelection_Prompts_Default = typeof prompts;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsOnCtrlCAtConfigDirSelection_Prompts = {
  default: Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsOnCtrlCAtConfigDirSelection_Prompts_Default;
};

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsOnCtrlCAtConfigDirSelection_PromptsDefaultUnknown = unknown;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsOnCtrlCAtConfigDirSelection_MockPrompts = ReturnType<typeof vi['fn']>;

/**
 * Tests - CLI - Menu - Interactive - Interactive Menu - Exports The Interactive Menu Function.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_InteractiveMenu_ExportsTheInteractiveMenuFunction_ExportedType = string;

/**
 * Tests - CLI - Menu - Interactive - Interactive Menu - Selects Config From Multiple Directories.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_InteractiveMenu_SelectsConfigFromMultipleDirectories_Prompts_Default = typeof prompts;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_SelectsConfigFromMultipleDirectories_Prompts = {
  default: Tests_Cli_Menu_Interactive_InteractiveMenu_SelectsConfigFromMultipleDirectories_Prompts_Default;
};

export type Tests_Cli_Menu_Interactive_InteractiveMenu_SelectsConfigFromMultipleDirectories_PromptsDefaultUnknown = unknown;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_SelectsConfigFromMultipleDirectories_MockPrompts = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_SelectsConfigFromMultipleDirectories_Call = Record<string, unknown>;

/**
 * Tests - CLI - Menu - Interactive - Interactive Menu - Server Action Menu Includes Go Back As Last Choice.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_InteractiveMenu_ServerActionMenuIncludesGoBackAsLastChoice_Prompts_Default = typeof prompts;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ServerActionMenuIncludesGoBackAsLastChoice_Prompts = {
  default: Tests_Cli_Menu_Interactive_InteractiveMenu_ServerActionMenuIncludesGoBackAsLastChoice_Prompts_Default;
};

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ServerActionMenuIncludesGoBackAsLastChoice_PromptsDefaultUnknown = unknown;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ServerActionMenuIncludesGoBackAsLastChoice_MockPrompts = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ServerActionMenuIncludesGoBackAsLastChoice_Call = Record<string, unknown>;

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ServerActionMenuIncludesGoBackAsLastChoice_Choices = Record<string, unknown>[];

export type Tests_Cli_Menu_Interactive_InteractiveMenu_ServerActionMenuIncludesGoBackAsLastChoice_LastChoice = Record<string, unknown>;

/**
 * Tests - CLI - Menu - Interactive - Prompts.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Menu_Interactive_Prompts_PromptsDefault = ReturnType<typeof vi['fn']>;

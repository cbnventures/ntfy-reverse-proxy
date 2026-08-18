import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';

import { interactiveMenu } from '../../../cli/menu/interactive.js';

import type {
  Tests_Cli_Menu_Interactive_CbnventuresNovaToolkit_Bootstrap,
  Tests_Cli_Menu_Interactive_CbnventuresNovaToolkit_CliHeader,
  Tests_Cli_Menu_Interactive_CbnventuresNovaToolkit_Logger,
  Tests_Cli_Menu_Interactive_Chalk_ChalkDefault,
  Tests_Cli_Menu_Interactive_ChalkIdentity_Returns,
  Tests_Cli_Menu_Interactive_ChalkIdentity_S,
  Tests_Cli_Menu_Interactive_CliCommandsContextJs_AddContext,
  Tests_Cli_Menu_Interactive_CliCommandsContextJs_EditContext,
  Tests_Cli_Menu_Interactive_CliCommandsContextJs_GenerateId,
  Tests_Cli_Menu_Interactive_CliCommandsContextJs_GenerateToken,
  Tests_Cli_Menu_Interactive_CliCommandsContextJs_ListContexts,
  Tests_Cli_Menu_Interactive_CliCommandsContextJs_RemoveContext,
  Tests_Cli_Menu_Interactive_CliCommandsDeployJs_Deploy,
  Tests_Cli_Menu_Interactive_CliCommandsServerJs_AddServer,
  Tests_Cli_Menu_Interactive_CliCommandsServerJs_EditServer,
  Tests_Cli_Menu_Interactive_CliCommandsServerJs_ListServers,
  Tests_Cli_Menu_Interactive_CliCommandsServerJs_RemoveServer,
  Tests_Cli_Menu_Interactive_CliCommandsSettingsJs_GetSettings,
  Tests_Cli_Menu_Interactive_CliCommandsSettingsJs_UpdateSettings,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ContextActionMenuIncludesGoBackAsLastChoice_Call,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ContextActionMenuIncludesGoBackAsLastChoice_Choices,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ContextActionMenuIncludesGoBackAsLastChoice_LastChoice,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ContextActionMenuIncludesGoBackAsLastChoice_MockPrompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ContextActionMenuIncludesGoBackAsLastChoice_Prompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ContextActionMenuIncludesGoBackAsLastChoice_PromptsDefaultUnknown,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ContextEditSelectIncludesGoBackAsLastChoice_Call,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ContextEditSelectIncludesGoBackAsLastChoice_Choices,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ContextEditSelectIncludesGoBackAsLastChoice_LastChoice,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ContextEditSelectIncludesGoBackAsLastChoice_MockPrompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ContextEditSelectIncludesGoBackAsLastChoice_Prompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ContextEditSelectIncludesGoBackAsLastChoice_PromptsDefaultUnknown,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditInterpreterAbortsWithoutWriting_Call,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditInterpreterAbortsWithoutWriting_ContextModule,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditInterpreterAbortsWithoutWriting_ContextModuleUnknown,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditInterpreterAbortsWithoutWriting_EditContext,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditInterpreterAbortsWithoutWriting_MockPrompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditInterpreterAbortsWithoutWriting_Prompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditInterpreterAbortsWithoutWriting_PromptsDefaultUnknown,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditModeAbortsAfterAnswering4PriorPrompts_ContextModule,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditModeAbortsAfterAnswering4PriorPrompts_ContextModuleUnknown,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditModeAbortsAfterAnswering4PriorPrompts_EditContext,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditModeAbortsAfterAnswering4PriorPrompts_MockPrompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditModeAbortsAfterAnswering4PriorPrompts_Prompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditModeAbortsAfterAnswering4PriorPrompts_PromptsDefaultUnknown,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtServerEditSelectReturnsToServerMenu_Call,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtServerEditSelectReturnsToServerMenu_MockPrompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtServerEditSelectReturnsToServerMenu_Prompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtServerEditSelectReturnsToServerMenu_PromptsDefaultUnknown,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsOnCtrlCAtConfigDirSelection_MockPrompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsOnCtrlCAtConfigDirSelection_Prompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsOnCtrlCAtConfigDirSelection_PromptsDefaultUnknown,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ExportsTheInteractiveMenuFunction_ExportedType,
  Tests_Cli_Menu_Interactive_InteractiveMenu_OsTmpDir,
  Tests_Cli_Menu_Interactive_InteractiveMenu_SelectsConfigFromMultipleDirectories_Call,
  Tests_Cli_Menu_Interactive_InteractiveMenu_SelectsConfigFromMultipleDirectories_MockPrompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_SelectsConfigFromMultipleDirectories_Prompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_SelectsConfigFromMultipleDirectories_PromptsDefaultUnknown,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ServerActionMenuIncludesGoBackAsLastChoice_Call,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ServerActionMenuIncludesGoBackAsLastChoice_Choices,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ServerActionMenuIncludesGoBackAsLastChoice_LastChoice,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ServerActionMenuIncludesGoBackAsLastChoice_MockPrompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ServerActionMenuIncludesGoBackAsLastChoice_Prompts,
  Tests_Cli_Menu_Interactive_InteractiveMenu_ServerActionMenuIncludesGoBackAsLastChoice_PromptsDefaultUnknown,
  Tests_Cli_Menu_Interactive_InteractiveMenu_TempDir1,
  Tests_Cli_Menu_Interactive_InteractiveMenu_TempDir1Path,
  Tests_Cli_Menu_Interactive_InteractiveMenu_TempDir2,
  Tests_Cli_Menu_Interactive_InteractiveMenu_TempDir2Path,
  Tests_Cli_Menu_Interactive_Prompts_PromptsDefault,
} from '../../../types/tests/cli/menu/interactive.test.d.ts';

function chalkIdentity(s: Tests_Cli_Menu_Interactive_ChalkIdentity_S): Tests_Cli_Menu_Interactive_ChalkIdentity_Returns {
  return s;
}

vi.mock('prompts', () => {
  const promptsDefault: Tests_Cli_Menu_Interactive_Prompts_PromptsDefault = vi.fn();

  return {
    default: promptsDefault,
  };
});

vi.mock('chalk', () => {
  const chalkDefault: Tests_Cli_Menu_Interactive_Chalk_ChalkDefault = {
    cyan: chalkIdentity,
    dim: chalkIdentity,
    magentaBright: chalkIdentity,
    yellow: chalkIdentity,
  };

  return {
    default: chalkDefault,
  };
});

vi.mock('@cbnventures/nova/toolkit', () => {
  const bootstrap: Tests_Cli_Menu_Interactive_CbnventuresNovaToolkit_Bootstrap = {
    getConfigDir: vi.fn(),
  };

  const cliHeader: Tests_Cli_Menu_Interactive_CbnventuresNovaToolkit_CliHeader = {
    render: vi.fn().mockReturnValue(''),
  };

  const logger: Tests_Cli_Menu_Interactive_CbnventuresNovaToolkit_Logger = {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  };

  return {
    Bootstrap: bootstrap,
    CLIHeader: cliHeader,
    Logger: logger,
  };
});

vi.mock('../../../cli/commands/context.js', () => {
  const addContext: Tests_Cli_Menu_Interactive_CliCommandsContextJs_AddContext = vi.fn();
  const editContext: Tests_Cli_Menu_Interactive_CliCommandsContextJs_EditContext = vi.fn();
  const generateId: Tests_Cli_Menu_Interactive_CliCommandsContextJs_GenerateId = vi.fn().mockReturnValue('test-id');
  const generateToken: Tests_Cli_Menu_Interactive_CliCommandsContextJs_GenerateToken = vi.fn().mockReturnValue('tk_test');
  const listContexts: Tests_Cli_Menu_Interactive_CliCommandsContextJs_ListContexts = vi.fn().mockReturnValue([{
    name: 'Test Context',
    type: 'http',
    id: 'ctx-1',
    interpreter: 'plain-text',
    topic: 'test-topic',
    error_topic: undefined,
    error_events: undefined,
    mode: 'send-once',
    show_visitor_info: false,
    primary_server: 'Server A',
    servers: ['Server A'],
    token: 'tk_ctx',
  }]);
  const removeContext: Tests_Cli_Menu_Interactive_CliCommandsContextJs_RemoveContext = vi.fn();

  return {
    addContext,
    editContext,
    generateId,
    generateToken,
    listContexts,
    removeContext,
  };
});

vi.mock('../../../cli/commands/server.js', () => {
  const addServer: Tests_Cli_Menu_Interactive_CliCommandsServerJs_AddServer = vi.fn();
  const editServer: Tests_Cli_Menu_Interactive_CliCommandsServerJs_EditServer = vi.fn();
  const listServers: Tests_Cli_Menu_Interactive_CliCommandsServerJs_ListServers = vi.fn().mockReturnValue([{
    name: 'Server A',
    server: 'https://ntfy.example.com',
    token: 'tk_srv',
  }]);
  const removeServer: Tests_Cli_Menu_Interactive_CliCommandsServerJs_RemoveServer = vi.fn();

  return {
    addServer,
    editServer,
    listServers,
    removeServer,
  };
});

vi.mock('../../../cli/commands/settings.js', () => {
  const getSettings: Tests_Cli_Menu_Interactive_CliCommandsSettingsJs_GetSettings = vi.fn().mockReturnValue({
    worker_name: 'test-worker',
    base_domain: 'test.example.com',
    show_response_output: false,
  });
  const updateSettings: Tests_Cli_Menu_Interactive_CliCommandsSettingsJs_UpdateSettings = vi.fn();

  return {
    getSettings,
    updateSettings,
  };
});

vi.mock('../../../cli/commands/deploy.js', () => {
  const deploy: Tests_Cli_Menu_Interactive_CliCommandsDeployJs_Deploy = vi.fn();

  return {
    deploy,
  };
});

/**
 * Tests - CLI - Menu - Interactive - Menu.
 *
 * @since 2.0.0
 */
describe('interactiveMenu', () => {
  let tempDir1: Tests_Cli_Menu_Interactive_InteractiveMenu_TempDir1 = undefined;
  let tempDir2: Tests_Cli_Menu_Interactive_InteractiveMenu_TempDir2 = undefined;

  beforeEach(() => {
    vi.clearAllMocks();

    const osTmpDir: Tests_Cli_Menu_Interactive_InteractiveMenu_OsTmpDir = tmpdir();
    const tempDir1Path: Tests_Cli_Menu_Interactive_InteractiveMenu_TempDir1Path = join(osTmpDir, 'nrp-test-');
    const tempDir2Path: Tests_Cli_Menu_Interactive_InteractiveMenu_TempDir2Path = join(osTmpDir, 'nrp-test-');

    tempDir1 = mkdtempSync(tempDir1Path);
    tempDir2 = mkdtempSync(tempDir2Path);

    return;
  });

  afterEach(() => {
    if (tempDir1 !== undefined && existsSync(tempDir1) === true) {
      rmSync(tempDir1, { recursive: true });
    }

    if (tempDir2 !== undefined && existsSync(tempDir2) === true) {
      rmSync(tempDir2, { recursive: true });
    }

    return;
  });

  it('exports the interactiveMenu function', () => {
    const exportedType: Tests_Cli_Menu_Interactive_InteractiveMenu_ExportsTheInteractiveMenuFunction_ExportedType = typeof interactiveMenu;

    expect(exportedType).toBe('function');

    return;
  });

  it('selects config from multiple directories', async () => {
    const prompts: Tests_Cli_Menu_Interactive_InteractiveMenu_SelectsConfigFromMultipleDirectories_Prompts = await import('prompts');
    const promptsDefaultUnknown: Tests_Cli_Menu_Interactive_InteractiveMenu_SelectsConfigFromMultipleDirectories_PromptsDefaultUnknown = prompts['default'];
    const mockPrompts: Tests_Cli_Menu_Interactive_InteractiveMenu_SelectsConfigFromMultipleDirectories_MockPrompts = promptsDefaultUnknown as Tests_Cli_Menu_Interactive_InteractiveMenu_SelectsConfigFromMultipleDirectories_MockPrompts;

    mockPrompts
      .mockResolvedValueOnce({ dir: tempDir1 })
      .mockResolvedValueOnce({ action: 'exit' });

    await interactiveMenu([
      tempDir1!,
      tempDir2!,
    ]);

    expect(prompts['default']).toHaveBeenCalledTimes(2);

    const call: Tests_Cli_Menu_Interactive_InteractiveMenu_SelectsConfigFromMultipleDirectories_Call = mockPrompts.mock.calls[0]![0] as Tests_Cli_Menu_Interactive_InteractiveMenu_SelectsConfigFromMultipleDirectories_Call;

    expect(call['message']).toContain('Multiple config');

    expect(call['choices']).toHaveLength(2);

    return;
  });

  it('exits on Ctrl+C at config dir selection', async () => {
    const prompts: Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsOnCtrlCAtConfigDirSelection_Prompts = await import('prompts');
    const promptsDefaultUnknown: Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsOnCtrlCAtConfigDirSelection_PromptsDefaultUnknown = prompts['default'];
    const mockPrompts: Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsOnCtrlCAtConfigDirSelection_MockPrompts = promptsDefaultUnknown as Tests_Cli_Menu_Interactive_InteractiveMenu_ExitsOnCtrlCAtConfigDirSelection_MockPrompts;

    mockPrompts.mockResolvedValueOnce({ dir: undefined });

    await interactiveMenu([
      tempDir1!,
      tempDir2!,
    ]);

    expect(prompts['default']).toHaveBeenCalledTimes(1);

    return;
  });

  it('server action menu includes Go back as last choice', async () => {
    const prompts: Tests_Cli_Menu_Interactive_InteractiveMenu_ServerActionMenuIncludesGoBackAsLastChoice_Prompts = await import('prompts');
    const promptsDefaultUnknown: Tests_Cli_Menu_Interactive_InteractiveMenu_ServerActionMenuIncludesGoBackAsLastChoice_PromptsDefaultUnknown = prompts['default'];
    const mockPrompts: Tests_Cli_Menu_Interactive_InteractiveMenu_ServerActionMenuIncludesGoBackAsLastChoice_MockPrompts = promptsDefaultUnknown as Tests_Cli_Menu_Interactive_InteractiveMenu_ServerActionMenuIncludesGoBackAsLastChoice_MockPrompts;

    mockPrompts
      .mockResolvedValueOnce({ action: 'servers' })
      .mockResolvedValueOnce({ action: 'back' })
      .mockResolvedValueOnce({ action: 'exit' });

    await interactiveMenu([tempDir1!]);

    const call: Tests_Cli_Menu_Interactive_InteractiveMenu_ServerActionMenuIncludesGoBackAsLastChoice_Call = mockPrompts.mock.calls[1]![0] as Tests_Cli_Menu_Interactive_InteractiveMenu_ServerActionMenuIncludesGoBackAsLastChoice_Call;
    const choices: Tests_Cli_Menu_Interactive_InteractiveMenu_ServerActionMenuIncludesGoBackAsLastChoice_Choices = call['choices'] as Tests_Cli_Menu_Interactive_InteractiveMenu_ServerActionMenuIncludesGoBackAsLastChoice_Choices;
    const lastChoice: Tests_Cli_Menu_Interactive_InteractiveMenu_ServerActionMenuIncludesGoBackAsLastChoice_LastChoice = choices[choices['length'] - 1] as Tests_Cli_Menu_Interactive_InteractiveMenu_ServerActionMenuIncludesGoBackAsLastChoice_LastChoice;

    expect(lastChoice['title']).toBe('Go back');

    expect(lastChoice['value']).toBe('back');

    return;
  });

  it('context action menu includes Go back as last choice', async () => {
    const prompts: Tests_Cli_Menu_Interactive_InteractiveMenu_ContextActionMenuIncludesGoBackAsLastChoice_Prompts = await import('prompts');
    const promptsDefaultUnknown: Tests_Cli_Menu_Interactive_InteractiveMenu_ContextActionMenuIncludesGoBackAsLastChoice_PromptsDefaultUnknown = prompts['default'];
    const mockPrompts: Tests_Cli_Menu_Interactive_InteractiveMenu_ContextActionMenuIncludesGoBackAsLastChoice_MockPrompts = promptsDefaultUnknown as Tests_Cli_Menu_Interactive_InteractiveMenu_ContextActionMenuIncludesGoBackAsLastChoice_MockPrompts;

    mockPrompts
      .mockResolvedValueOnce({ action: 'contexts' })
      .mockResolvedValueOnce({ action: 'back' })
      .mockResolvedValueOnce({ action: 'exit' });

    await interactiveMenu([tempDir1!]);

    const call: Tests_Cli_Menu_Interactive_InteractiveMenu_ContextActionMenuIncludesGoBackAsLastChoice_Call = mockPrompts.mock.calls[1]![0] as Tests_Cli_Menu_Interactive_InteractiveMenu_ContextActionMenuIncludesGoBackAsLastChoice_Call;
    const choices: Tests_Cli_Menu_Interactive_InteractiveMenu_ContextActionMenuIncludesGoBackAsLastChoice_Choices = call['choices'] as Tests_Cli_Menu_Interactive_InteractiveMenu_ContextActionMenuIncludesGoBackAsLastChoice_Choices;
    const lastChoice: Tests_Cli_Menu_Interactive_InteractiveMenu_ContextActionMenuIncludesGoBackAsLastChoice_LastChoice = choices[choices['length'] - 1] as Tests_Cli_Menu_Interactive_InteractiveMenu_ContextActionMenuIncludesGoBackAsLastChoice_LastChoice;

    expect(lastChoice['title']).toBe('Go back');

    expect(lastChoice['value']).toBe('back');

    return;
  });

  it('context edit select includes Go back as last choice', async () => {
    const prompts: Tests_Cli_Menu_Interactive_InteractiveMenu_ContextEditSelectIncludesGoBackAsLastChoice_Prompts = await import('prompts');
    const promptsDefaultUnknown: Tests_Cli_Menu_Interactive_InteractiveMenu_ContextEditSelectIncludesGoBackAsLastChoice_PromptsDefaultUnknown = prompts['default'];
    const mockPrompts: Tests_Cli_Menu_Interactive_InteractiveMenu_ContextEditSelectIncludesGoBackAsLastChoice_MockPrompts = promptsDefaultUnknown as Tests_Cli_Menu_Interactive_InteractiveMenu_ContextEditSelectIncludesGoBackAsLastChoice_MockPrompts;

    mockPrompts
      .mockResolvedValueOnce({ action: 'contexts' })
      .mockResolvedValueOnce({ action: 'edit' })
      .mockResolvedValueOnce({ name: 'back' })
      .mockResolvedValueOnce({ action: 'back' })
      .mockResolvedValueOnce({ action: 'exit' });

    await interactiveMenu([tempDir1!]);

    const call: Tests_Cli_Menu_Interactive_InteractiveMenu_ContextEditSelectIncludesGoBackAsLastChoice_Call = mockPrompts.mock.calls[2]![0] as Tests_Cli_Menu_Interactive_InteractiveMenu_ContextEditSelectIncludesGoBackAsLastChoice_Call;
    const choices: Tests_Cli_Menu_Interactive_InteractiveMenu_ContextEditSelectIncludesGoBackAsLastChoice_Choices = call['choices'] as Tests_Cli_Menu_Interactive_InteractiveMenu_ContextEditSelectIncludesGoBackAsLastChoice_Choices;
    const lastChoice: Tests_Cli_Menu_Interactive_InteractiveMenu_ContextEditSelectIncludesGoBackAsLastChoice_LastChoice = choices[choices['length'] - 1] as Tests_Cli_Menu_Interactive_InteractiveMenu_ContextEditSelectIncludesGoBackAsLastChoice_LastChoice;

    expect(lastChoice['title']).toBe('Go back');

    expect(lastChoice['value']).toBe('back');

    return;
  });

  it('Ctrl+C at context edit interpreter aborts without writing', async () => {
    const prompts: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditInterpreterAbortsWithoutWriting_Prompts = await import('prompts');
    const promptsDefaultUnknown: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditInterpreterAbortsWithoutWriting_PromptsDefaultUnknown = prompts['default'];
    const mockPrompts: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditInterpreterAbortsWithoutWriting_MockPrompts = promptsDefaultUnknown as Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditInterpreterAbortsWithoutWriting_MockPrompts;

    mockPrompts
      .mockResolvedValueOnce({ action: 'contexts' })
      .mockResolvedValueOnce({ action: 'edit' })
      .mockResolvedValueOnce({ name: 'Test Context' })
      .mockResolvedValueOnce({ keepId: true })
      .mockResolvedValueOnce({ interpreter: undefined })
      .mockResolvedValueOnce({ action: 'back' })
      .mockResolvedValueOnce({ action: 'exit' });

    await interactiveMenu([tempDir1!]);

    const contextModuleUnknown: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditInterpreterAbortsWithoutWriting_ContextModuleUnknown = await import('../../../cli/commands/context.js');
    const contextModule: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditInterpreterAbortsWithoutWriting_ContextModule = contextModuleUnknown as Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditInterpreterAbortsWithoutWriting_ContextModule;
    const editContext: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditInterpreterAbortsWithoutWriting_EditContext = contextModule['editContext'] as Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditInterpreterAbortsWithoutWriting_EditContext;

    expect(editContext).not.toHaveBeenCalled();

    const call: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditInterpreterAbortsWithoutWriting_Call = mockPrompts.mock.calls[5]![0] as Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditInterpreterAbortsWithoutWriting_Call;

    expect(call['message']).toContain('Manage Contexts');

    return;
  });

  it('Ctrl+C at context edit mode aborts after answering 4 prior prompts', async () => {
    const prompts: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditModeAbortsAfterAnswering4PriorPrompts_Prompts = await import('prompts');
    const promptsDefaultUnknown: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditModeAbortsAfterAnswering4PriorPrompts_PromptsDefaultUnknown = prompts['default'];
    const mockPrompts: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditModeAbortsAfterAnswering4PriorPrompts_MockPrompts = promptsDefaultUnknown as Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditModeAbortsAfterAnswering4PriorPrompts_MockPrompts;

    mockPrompts
      .mockResolvedValueOnce({ action: 'contexts' })
      .mockResolvedValueOnce({ action: 'edit' })
      .mockResolvedValueOnce({ name: 'Test Context' })
      .mockResolvedValueOnce({ keepId: true })
      .mockResolvedValueOnce({ interpreter: 'plain-text' })
      .mockResolvedValueOnce({ topic: 'test-topic' })
      .mockResolvedValueOnce({ error_topic: '' })
      .mockResolvedValueOnce({ error_events: [] })
      .mockResolvedValueOnce({ mode: undefined })
      .mockResolvedValueOnce({ action: 'back' })
      .mockResolvedValueOnce({ action: 'exit' });

    await interactiveMenu([tempDir1!]);

    const contextModuleUnknown: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditModeAbortsAfterAnswering4PriorPrompts_ContextModuleUnknown = await import('../../../cli/commands/context.js');
    const contextModule: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditModeAbortsAfterAnswering4PriorPrompts_ContextModule = contextModuleUnknown as Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditModeAbortsAfterAnswering4PriorPrompts_ContextModule;
    const editContext: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditModeAbortsAfterAnswering4PriorPrompts_EditContext = contextModule['editContext'] as Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtContextEditModeAbortsAfterAnswering4PriorPrompts_EditContext;

    expect(editContext).not.toHaveBeenCalled();

    return;
  });

  it('Ctrl+C at server edit select returns to server menu', async () => {
    const prompts: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtServerEditSelectReturnsToServerMenu_Prompts = await import('prompts');
    const promptsDefaultUnknown: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtServerEditSelectReturnsToServerMenu_PromptsDefaultUnknown = prompts['default'];
    const mockPrompts: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtServerEditSelectReturnsToServerMenu_MockPrompts = promptsDefaultUnknown as Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtServerEditSelectReturnsToServerMenu_MockPrompts;

    mockPrompts
      .mockResolvedValueOnce({ action: 'servers' })
      .mockResolvedValueOnce({ action: 'edit' })
      .mockResolvedValueOnce({ name: undefined })
      .mockResolvedValueOnce({ action: 'back' })
      .mockResolvedValueOnce({ action: 'exit' });

    await interactiveMenu([tempDir1!]);

    const call: Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtServerEditSelectReturnsToServerMenu_Call = mockPrompts.mock.calls[3]![0] as Tests_Cli_Menu_Interactive_InteractiveMenu_CtrlCAtServerEditSelectReturnsToServerMenu_Call;

    expect(call['message']).toContain('Manage Servers');

    return;
  });

  return;
});

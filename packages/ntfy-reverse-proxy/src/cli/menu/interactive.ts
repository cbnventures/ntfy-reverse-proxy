import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Bootstrap, CLIHeader, Logger } from '@cbnventures/nova/toolkit';
import chalk from 'chalk';
import prompts from 'prompts';

import { LIB_REGEX_NON_ALPHANUMERIC_ID } from '../../lib/regex.js';
import {
  addContext, generateId, generateToken, listContexts, removeContext,
} from '../commands/context.js';
import { deploy } from '../commands/deploy.js';
import { addServer, listServers, removeServer } from '../commands/server.js';
import { getSettings, updateSettings } from '../commands/settings.js';

import type {
  Cli_Menu_Interactive_AddContextFlow_AllowedFromResponse,
  Cli_Menu_Interactive_AddContextFlow_AllowedFromTrimmed,
  Cli_Menu_Interactive_AddContextFlow_AutoId,
  Cli_Menu_Interactive_AddContextFlow_AutoToken,
  Cli_Menu_Interactive_AddContextFlow_ConfigPath,
  Cli_Menu_Interactive_AddContextFlow_ContextType,
  Cli_Menu_Interactive_AddContextFlow_EmailInterpreters,
  Cli_Menu_Interactive_AddContextFlow_ErrorEvents,
  Cli_Menu_Interactive_AddContextFlow_ErrorEventsResponse,
  Cli_Menu_Interactive_AddContextFlow_ErrorTopic,
  Cli_Menu_Interactive_AddContextFlow_ErrorTopicResponse,
  Cli_Menu_Interactive_AddContextFlow_ErrorTopicString,
  Cli_Menu_Interactive_AddContextFlow_ErrorTopicTrimmed,
  Cli_Menu_Interactive_AddContextFlow_HttpInterpreters,
  Cli_Menu_Interactive_AddContextFlow_IdMessage,
  Cli_Menu_Interactive_AddContextFlow_IdResponse,
  Cli_Menu_Interactive_AddContextFlow_IdTrimmed,
  Cli_Menu_Interactive_AddContextFlow_Interpreter,
  Cli_Menu_Interactive_AddContextFlow_InterpreterChoices,
  Cli_Menu_Interactive_AddContextFlow_InterpreterResponse,
  Cli_Menu_Interactive_AddContextFlow_Mode,
  Cli_Menu_Interactive_AddContextFlow_ModeResponse,
  Cli_Menu_Interactive_AddContextFlow_Name,
  Cli_Menu_Interactive_AddContextFlow_NameResponse,
  Cli_Menu_Interactive_AddContextFlow_PrimaryServer,
  Cli_Menu_Interactive_AddContextFlow_PrimaryServerResponse,
  Cli_Menu_Interactive_AddContextFlow_RawAllowedFrom,
  Cli_Menu_Interactive_AddContextFlow_RawId,
  Cli_Menu_Interactive_AddContextFlow_RawIdString,
  Cli_Menu_Interactive_AddContextFlow_RawToken,
  Cli_Menu_Interactive_AddContextFlow_ResolvedAllowedFrom,
  Cli_Menu_Interactive_AddContextFlow_ResolvedErrorTopic,
  Cli_Menu_Interactive_AddContextFlow_ResolvedId,
  Cli_Menu_Interactive_AddContextFlow_ResolvedToken,
  Cli_Menu_Interactive_AddContextFlow_Returns,
  Cli_Menu_Interactive_AddContextFlow_SelectedServers,
  Cli_Menu_Interactive_AddContextFlow_SelectedServersResponse,
  Cli_Menu_Interactive_AddContextFlow_Servers,
  Cli_Menu_Interactive_AddContextFlow_ShowVisitorInfo,
  Cli_Menu_Interactive_AddContextFlow_ShowVisitorInfoResponse,
  Cli_Menu_Interactive_AddContextFlow_TokenResponse,
  Cli_Menu_Interactive_AddContextFlow_TokenTrimmed,
  Cli_Menu_Interactive_AddContextFlow_Topic,
  Cli_Menu_Interactive_AddContextFlow_TopicResponse,
  Cli_Menu_Interactive_AddContextFlow_TopicString,
  Cli_Menu_Interactive_AddContextFlow_TypedErrorEvents,
  Cli_Menu_Interactive_AddContextFlow_TypedInterpreter,
  Cli_Menu_Interactive_AddContextFlow_TypedMode,
  Cli_Menu_Interactive_AddContextFlow_TypeResponse,
  Cli_Menu_Interactive_ContextMenu_Action,
  Cli_Menu_Interactive_ContextMenu_AddNewToken,
  Cli_Menu_Interactive_ContextMenu_AddToken,
  Cli_Menu_Interactive_ContextMenu_AddTokenResponse,
  Cli_Menu_Interactive_ContextMenu_AllowedFrom,
  Cli_Menu_Interactive_ContextMenu_AllowedFromResponse,
  Cli_Menu_Interactive_ContextMenu_AllowedFromTrimmed,
  Cli_Menu_Interactive_ContextMenu_ConfigPath,
  Cli_Menu_Interactive_ContextMenu_Confirmed,
  Cli_Menu_Interactive_ContextMenu_ConfirmResponse,
  Cli_Menu_Interactive_ContextMenu_Contexts,
  Cli_Menu_Interactive_ContextMenu_Current,
  Cli_Menu_Interactive_ContextMenu_CurrentAllowedFrom,
  Cli_Menu_Interactive_ContextMenu_CurrentErrorEvents,
  Cli_Menu_Interactive_ContextMenu_CurrentErrorTopic,
  Cli_Menu_Interactive_ContextMenu_EditErrorMessage,
  Cli_Menu_Interactive_ContextMenu_EditImport,
  Cli_Menu_Interactive_ContextMenu_EditServers,
  Cli_Menu_Interactive_ContextMenu_EmailChoices,
  Cli_Menu_Interactive_ContextMenu_EmailValues,
  Cli_Menu_Interactive_ContextMenu_ErrorEvents,
  Cli_Menu_Interactive_ContextMenu_ErrorEventsResponse,
  Cli_Menu_Interactive_ContextMenu_ErrorMessage,
  Cli_Menu_Interactive_ContextMenu_ErrorTopic,
  Cli_Menu_Interactive_ContextMenu_ErrorTopicResponse,
  Cli_Menu_Interactive_ContextMenu_ErrorTopicTrimmed,
  Cli_Menu_Interactive_ContextMenu_ErrorTopicValue,
  Cli_Menu_Interactive_ContextMenu_Exists,
  Cli_Menu_Interactive_ContextMenu_HttpChoices,
  Cli_Menu_Interactive_ContextMenu_HttpValues,
  Cli_Menu_Interactive_ContextMenu_Id,
  Cli_Menu_Interactive_ContextMenu_InMenu,
  Cli_Menu_Interactive_ContextMenu_Interpreter,
  Cli_Menu_Interactive_ContextMenu_InterpreterIdx,
  Cli_Menu_Interactive_ContextMenu_InterpreterInitial,
  Cli_Menu_Interactive_ContextMenu_InterpreterResponse,
  Cli_Menu_Interactive_ContextMenu_KeepId,
  Cli_Menu_Interactive_ContextMenu_KeepIdResponse,
  Cli_Menu_Interactive_ContextMenu_KeepToken,
  Cli_Menu_Interactive_ContextMenu_KeepTokenResponse,
  Cli_Menu_Interactive_ContextMenu_KnownChoices,
  Cli_Menu_Interactive_ContextMenu_KnownValues,
  Cli_Menu_Interactive_ContextMenu_Mode,
  Cli_Menu_Interactive_ContextMenu_ModeInitial,
  Cli_Menu_Interactive_ContextMenu_ModeResponse,
  Cli_Menu_Interactive_ContextMenu_Name,
  Cli_Menu_Interactive_ContextMenu_NewToken,
  Cli_Menu_Interactive_ContextMenu_PrimaryServer,
  Cli_Menu_Interactive_ContextMenu_PrimaryServerIdx,
  Cli_Menu_Interactive_ContextMenu_PrimaryServerInitial,
  Cli_Menu_Interactive_ContextMenu_PrimaryServerResponse,
  Cli_Menu_Interactive_ContextMenu_RemoveContexts,
  Cli_Menu_Interactive_ContextMenu_RemoveErrorMessage,
  Cli_Menu_Interactive_ContextMenu_RemoveName,
  Cli_Menu_Interactive_ContextMenu_RemoveSelectResponse,
  Cli_Menu_Interactive_ContextMenu_ResolvedAllowedFrom,
  Cli_Menu_Interactive_ContextMenu_ResolvedErrorTopic,
  Cli_Menu_Interactive_ContextMenu_Response,
  Cli_Menu_Interactive_ContextMenu_Returns,
  Cli_Menu_Interactive_ContextMenu_SelectedServers,
  Cli_Menu_Interactive_ContextMenu_SelectedServersResponse,
  Cli_Menu_Interactive_ContextMenu_SelectResponse,
  Cli_Menu_Interactive_ContextMenu_ServerChoices,
  Cli_Menu_Interactive_ContextMenu_Servers,
  Cli_Menu_Interactive_ContextMenu_ShowVisitorInfo,
  Cli_Menu_Interactive_ContextMenu_ShowVisitorInfoResponse,
  Cli_Menu_Interactive_ContextMenu_Topic,
  Cli_Menu_Interactive_ContextMenu_TopicResponse,
  Cli_Menu_Interactive_ContextMenu_Updates,
  Cli_Menu_Interactive_InteractiveMenu_Action,
  Cli_Menu_Interactive_InteractiveMenu_ConfigDirResponse,
  Cli_Menu_Interactive_InteractiveMenu_ConfigDirs,
  Cli_Menu_Interactive_InteractiveMenu_ConfigPath,
  Cli_Menu_Interactive_InteractiveMenu_CurrentFilePath,
  Cli_Menu_Interactive_InteractiveMenu_DefaultConfigDir,
  Cli_Menu_Interactive_InteractiveMenu_Dir,
  Cli_Menu_Interactive_InteractiveMenu_ErrorMessage,
  Cli_Menu_Interactive_InteractiveMenu_Header,
  Cli_Menu_Interactive_InteractiveMenu_PackageJsonParsed,
  Cli_Menu_Interactive_InteractiveMenu_PackageJsonPath,
  Cli_Menu_Interactive_InteractiveMenu_PackageJsonRaw,
  Cli_Menu_Interactive_InteractiveMenu_Parent,
  Cli_Menu_Interactive_InteractiveMenu_Response,
  Cli_Menu_Interactive_InteractiveMenu_Returns,
  Cli_Menu_Interactive_InteractiveMenu_Running,
  Cli_Menu_Interactive_InteractiveMenu_Version,
  Cli_Menu_Interactive_ServerMenu_Action,
  Cli_Menu_Interactive_ServerMenu_Answers,
  Cli_Menu_Interactive_ServerMenu_AnswersName,
  Cli_Menu_Interactive_ServerMenu_AnswersServer,
  Cli_Menu_Interactive_ServerMenu_AnswersToken,
  Cli_Menu_Interactive_ServerMenu_ConfigPath,
  Cli_Menu_Interactive_ServerMenu_Confirmed,
  Cli_Menu_Interactive_ServerMenu_ConfirmResponse,
  Cli_Menu_Interactive_ServerMenu_Current,
  Cli_Menu_Interactive_ServerMenu_CurrentServer,
  Cli_Menu_Interactive_ServerMenu_EditErrorMessage,
  Cli_Menu_Interactive_ServerMenu_EditImport,
  Cli_Menu_Interactive_ServerMenu_EditUpdates,
  Cli_Menu_Interactive_ServerMenu_EditUrlInstance,
  Cli_Menu_Interactive_ServerMenu_ErrorMessage,
  Cli_Menu_Interactive_ServerMenu_InMenu,
  Cli_Menu_Interactive_ServerMenu_Name,
  Cli_Menu_Interactive_ServerMenu_RemoveErrorMessage,
  Cli_Menu_Interactive_ServerMenu_RemoveName,
  Cli_Menu_Interactive_ServerMenu_RemoveSelectResponse,
  Cli_Menu_Interactive_ServerMenu_RemoveServers,
  Cli_Menu_Interactive_ServerMenu_Response,
  Cli_Menu_Interactive_ServerMenu_Returns,
  Cli_Menu_Interactive_ServerMenu_SelectResponse,
  Cli_Menu_Interactive_ServerMenu_Servers,
  Cli_Menu_Interactive_ServerMenu_ServerUrl,
  Cli_Menu_Interactive_ServerMenu_ServerUrlTrimmed,
  Cli_Menu_Interactive_ServerMenu_StartsWithTk,
  Cli_Menu_Interactive_ServerMenu_TokenTrimmed,
  Cli_Menu_Interactive_ServerMenu_TokenValue,
  Cli_Menu_Interactive_ServerMenu_TrimmedEmpty,
  Cli_Menu_Interactive_ServerMenu_Updates,
  Cli_Menu_Interactive_ServerMenu_UpdatesServerString,
  Cli_Menu_Interactive_ServerMenu_UpdatesTokenString,
  Cli_Menu_Interactive_ServerMenu_UrlInstance,
  Cli_Menu_Interactive_SettingsFlow_BaseDomain,
  Cli_Menu_Interactive_SettingsFlow_BaseDomainResponse,
  Cli_Menu_Interactive_SettingsFlow_ConfigPath,
  Cli_Menu_Interactive_SettingsFlow_CurrentSettings,
  Cli_Menu_Interactive_SettingsFlow_ErrorMessage,
  Cli_Menu_Interactive_SettingsFlow_Returns,
  Cli_Menu_Interactive_SettingsFlow_ShowResponseOutput,
  Cli_Menu_Interactive_SettingsFlow_ShowResponseOutputResponse,
  Cli_Menu_Interactive_SettingsFlow_UpdateErrorMessage,
  Cli_Menu_Interactive_SettingsFlow_WorkerName,
  Cli_Menu_Interactive_SettingsFlow_WorkerNameResponse,
} from '../../types/cli/menu/interactive.d.ts';

/**
 * CLI - Menu - Interactive - Menu.
 *
 * Orchestrates the top-level interactive CLI menu loop.
 * Dispatches user selections to the appropriate sub-menus.
 *
 * @since 2.0.0
 */
async function interactiveMenu(configDirs: Cli_Menu_Interactive_InteractiveMenu_ConfigDirs): Cli_Menu_Interactive_InteractiveMenu_Returns {
  const currentFilePath: Cli_Menu_Interactive_InteractiveMenu_CurrentFilePath = fileURLToPath(import.meta.url);

  let dir: Cli_Menu_Interactive_InteractiveMenu_Dir = dirname(currentFilePath);
  let version: Cli_Menu_Interactive_InteractiveMenu_Version = '0.0.0';

  while (dir !== dirname(dir)) {
    const packageJsonPath: Cli_Menu_Interactive_InteractiveMenu_PackageJsonPath = join(dir, 'package.json');

    if (existsSync(packageJsonPath) === true) {
      const packageJsonRaw: Cli_Menu_Interactive_InteractiveMenu_PackageJsonRaw = readFileSync(packageJsonPath, 'utf-8');
      const packageJsonParsed: Cli_Menu_Interactive_InteractiveMenu_PackageJsonParsed = JSON.parse(packageJsonRaw);

      version = packageJsonParsed['version'] as Cli_Menu_Interactive_InteractiveMenu_Version;

      break;
    }

    const parent: Cli_Menu_Interactive_InteractiveMenu_Parent = dirname(dir);

    dir = parent;
  }

  const header: Cli_Menu_Interactive_InteractiveMenu_Header = CLIHeader.render([
    chalk.magentaBright(`Reverse Proxy for ntfy v${version}`),
    chalk.dim('A CBN Ventures Creation'),
  ], {
    style: 'round',
    width: 50,
    marginBottom: 1,
  });

  process.stdout.write(`${header}\n`);

  let configPath: Cli_Menu_Interactive_InteractiveMenu_ConfigPath = undefined;

  if (configDirs['length'] > 1) {
    const configDirResponse: Cli_Menu_Interactive_InteractiveMenu_ConfigDirResponse = await prompts({
      type: 'select',
      name: 'dir',
      message: chalk.cyan('Multiple config files found. Which one?'),
      choices: configDirs.map((configDir) => ({
        title: join(configDir, 'config.json'),
        value: configDir,
      })),
    });

    if (configDirResponse['dir'] === undefined) {
      return;
    }

    configPath = join(configDirResponse['dir'], 'config.json');
  } else if (configDirs['length'] === 1) {
    configPath = join(configDirs[0]!, 'config.json');
  } else {
    const defaultConfigDir: Cli_Menu_Interactive_InteractiveMenu_DefaultConfigDir = Bootstrap.getConfigDir('ntfy-reverse-proxy');

    configPath = join(defaultConfigDir, 'config.json');
  }

  let running: Cli_Menu_Interactive_InteractiveMenu_Running = true;

  while (running === true) {
    const response: Cli_Menu_Interactive_InteractiveMenu_Response = await prompts({
      type: 'select',
      name: 'action',
      message: chalk.cyan('What would you like to do?'),
      choices: [
        {
          title: 'Manage Servers',
          value: 'servers',
        },
        {
          title: 'Manage Contexts',
          value: 'contexts',
        },
        {
          title: 'Settings',
          value: 'settings',
        },
        {
          title: 'Deploy',
          value: 'deploy',
        },
        {
          title: 'Exit',
          value: 'exit',
        },
      ],
    });

    const action: Cli_Menu_Interactive_InteractiveMenu_Action = response['action'];

    if (action === undefined || action === 'exit') {
      running = false;

      break;
    }

    if (action === 'servers') {
      await serverMenu(configPath);
    } else if (action === 'contexts') {
      await contextMenu(configPath);
    } else if (action === 'settings') {
      await settingsFlow(configPath);
    } else if (action === 'deploy') {
      try {
        await deploy(configPath, true);
      } catch (error) {
        const errorMessage: Cli_Menu_Interactive_InteractiveMenu_ErrorMessage = (error instanceof Error) ? error['message'] : String(error);

        Logger.error(`Error: ${errorMessage}`);
      }
    }
  }

  return;
}

/**
 * CLI - Menu - Interactive - Server Menu.
 *
 * Presents the server management sub-menu in a loop.
 * Handles adding, editing, and removing server entries.
 *
 * @since 2.0.0
 */
async function serverMenu(configPath: Cli_Menu_Interactive_ServerMenu_ConfigPath): Cli_Menu_Interactive_ServerMenu_Returns {
  let inMenu: Cli_Menu_Interactive_ServerMenu_InMenu = true;

  while (inMenu === true) {
    const response: Cli_Menu_Interactive_ServerMenu_Response = await prompts({
      type: 'select',
      name: 'action',
      message: chalk.cyan('Manage Servers'),
      choices: [
        {
          title: 'Add',
          value: 'add',
        },
        {
          title: 'Edit',
          value: 'edit',
        },
        {
          title: 'Remove',
          value: 'remove',
        },
        {
          title: 'Back',
          value: 'back',
        },
      ],
    });

    const action: Cli_Menu_Interactive_ServerMenu_Action = response['action'];

    if (action === undefined || action === 'back') {
      inMenu = false;

      break;
    }

    if (action === 'add') {
      const answers: Cli_Menu_Interactive_ServerMenu_Answers = await prompts([
        {
          type: 'text',
          name: 'name',
          message: 'Server name:',
          validate: (value) => value.trim()['length'] > 0 || 'Name is required',
        },
        {
          type: 'text',
          name: 'server',
          message: 'Server URL:',
          validate: (value) => {
            if (value.startsWith('https://') === false) {
              return 'URL must start with https://';
            }

            try {
              const urlInstance: Cli_Menu_Interactive_ServerMenu_UrlInstance = new URL(value);

              void urlInstance;

              return true;
            } catch {
              return 'Invalid URL';
            }
          },
        },
        {
          type: 'password',
          name: 'token',
          message: 'Server token:',
          validate: (value) => value.startsWith('tk_') || 'Token must start with tk_',
        },
      ]);

      const answersName: Cli_Menu_Interactive_ServerMenu_AnswersName = answers['name'];
      const answersServer: Cli_Menu_Interactive_ServerMenu_AnswersServer = answers['server'];
      const answersToken: Cli_Menu_Interactive_ServerMenu_AnswersToken = answers['token'];

      if (
        answersName !== undefined
        && answersServer !== undefined
        && answersToken !== undefined
      ) {
        try {
          addServer(configPath, {
            name: answersName,
            server: answersServer,
            token: answersToken,
          });

          Logger.info(`Server "${answersName}" added.`);
        } catch (error) {
          const errorMessage: Cli_Menu_Interactive_ServerMenu_ErrorMessage = (error instanceof Error) ? error['message'] : String(error);

          Logger.error(`Error: ${errorMessage}`);
        }
      }
    } else if (action === 'edit') {
      try {
        const servers: Cli_Menu_Interactive_ServerMenu_Servers = listServers(configPath);

        servers.sort((a, b) => a['name'].localeCompare(b['name']));

        if (servers['length'] === 0) {
          Logger.warn('No servers to edit.');
        } else {
          const selectResponse: Cli_Menu_Interactive_ServerMenu_SelectResponse = await prompts({
            type: 'select',
            name: 'name',
            message: 'Select server to edit:',
            choices: servers.map((server) => ({
              title: server['name'],
              value: server['name'],
            })),
          });

          const name: Cli_Menu_Interactive_ServerMenu_Name = selectResponse['name'];

          if (name !== undefined) {
            const current: Cli_Menu_Interactive_ServerMenu_Current = servers.find((server) => server['name'] === name);

            const currentServer: Cli_Menu_Interactive_ServerMenu_CurrentServer = (current !== undefined) ? current['server'] : undefined;

            const updates: Cli_Menu_Interactive_ServerMenu_Updates = await prompts([
              {
                type: 'text',
                name: 'server',
                message: 'Server URL:',
                initial: currentServer,
                validate: (value) => {
                  if (value.startsWith('https://') === false) {
                    return 'URL must start with https://';
                  }

                  try {
                    const editUrlInstance: Cli_Menu_Interactive_ServerMenu_EditUrlInstance = new URL(value);

                    void editUrlInstance;

                    return true;
                  } catch {
                    return 'Invalid URL';
                  }
                },
              },
              {
                type: 'password',
                name: 'token',
                message: 'Server token (leave blank to keep current):',
                validate: (value) => {
                  const trimmedEmpty: Cli_Menu_Interactive_ServerMenu_TrimmedEmpty = (value.trim() === '');
                  const startsWithTk: Cli_Menu_Interactive_ServerMenu_StartsWithTk = value.startsWith('tk_');

                  if (trimmedEmpty === true) {
                    return true;
                  }

                  return startsWithTk || 'Token must start with tk_';
                },
              },
            ]);

            if (updates['server'] === undefined || updates['token'] === undefined) {
              break;
            }

            const editImport: Cli_Menu_Interactive_ServerMenu_EditImport = await import('../commands/server.js');
            const updatesServerString: Cli_Menu_Interactive_ServerMenu_UpdatesServerString = updates['server'];
            const serverUrlTrimmed: Cli_Menu_Interactive_ServerMenu_ServerUrlTrimmed = updatesServerString.trim();
            const serverUrl: Cli_Menu_Interactive_ServerMenu_ServerUrl = (serverUrlTrimmed !== '') ? updatesServerString : undefined;
            const updatesTokenString: Cli_Menu_Interactive_ServerMenu_UpdatesTokenString = updates['token'];
            const tokenTrimmed: Cli_Menu_Interactive_ServerMenu_TokenTrimmed = updatesTokenString.trim();
            const tokenValue: Cli_Menu_Interactive_ServerMenu_TokenValue = (tokenTrimmed !== '') ? updatesTokenString : undefined;

            if (serverUrl !== undefined || tokenValue !== undefined) {
              const editUpdates: Cli_Menu_Interactive_ServerMenu_EditUpdates = {};

              if (serverUrl !== undefined) {
                Reflect.set(editUpdates, 'server', serverUrl);
              }

              if (tokenValue !== undefined) {
                Reflect.set(editUpdates, 'token', tokenValue);
              }

              editImport.editServer(configPath, name, editUpdates);

              Logger.info(`Server "${name}" updated.`);
            }
          }
        }
      } catch (error) {
        const editErrorMessage: Cli_Menu_Interactive_ServerMenu_EditErrorMessage = (error instanceof Error) ? error['message'] : String(error);

        Logger.error(`Error: ${editErrorMessage}`);
      }
    } else if (action === 'remove') {
      try {
        const removeServers: Cli_Menu_Interactive_ServerMenu_RemoveServers = listServers(configPath);

        removeServers.sort((a, b) => a['name'].localeCompare(b['name']));

        if (removeServers['length'] === 0) {
          Logger.warn('No servers to remove.');
        } else {
          const removeSelectResponse: Cli_Menu_Interactive_ServerMenu_RemoveSelectResponse = await prompts({
            type: 'select',
            name: 'name',
            message: 'Select server to remove:',
            choices: removeServers.map((server) => ({
              title: server['name'],
              value: server['name'],
            })),
          });

          const removeName: Cli_Menu_Interactive_ServerMenu_RemoveName = removeSelectResponse['name'];

          if (removeName !== undefined) {
            const confirmResponse: Cli_Menu_Interactive_ServerMenu_ConfirmResponse = await prompts({
              type: 'confirm',
              name: 'confirmed',
              message: chalk.yellow(`Remove "${removeName}"?`),
              initial: false,
            });

            const confirmed: Cli_Menu_Interactive_ServerMenu_Confirmed = confirmResponse['confirmed'];

            if (confirmed === true) {
              removeServer(configPath, removeName);

              Logger.info(`Server "${removeName}" removed.`);
            }
          }
        }
      } catch (error) {
        const removeErrorMessage: Cli_Menu_Interactive_ServerMenu_RemoveErrorMessage = (error instanceof Error) ? error['message'] : String(error);

        Logger.error(`Error: ${removeErrorMessage}`);
      }
    }
  }

  return;
}

/**
 * CLI - Menu - Interactive - Context Menu.
 *
 * Presents the context management sub-menu in a loop.
 * Handles adding, editing, and removing context entries.
 *
 * @since 2.0.0
 */
async function contextMenu(configPath: Cli_Menu_Interactive_ContextMenu_ConfigPath): Cli_Menu_Interactive_ContextMenu_Returns {
  let inMenu: Cli_Menu_Interactive_ContextMenu_InMenu = true;

  while (inMenu === true) {
    const response: Cli_Menu_Interactive_ContextMenu_Response = await prompts({
      type: 'select',
      name: 'action',
      message: chalk.cyan('Manage Contexts'),
      choices: [
        {
          title: 'Add',
          value: 'add',
        },
        {
          title: 'Edit',
          value: 'edit',
        },
        {
          title: 'Remove',
          value: 'remove',
        },
        {
          title: 'Back',
          value: 'back',
        },
      ],
    });

    const action: Cli_Menu_Interactive_ContextMenu_Action = response['action'];

    if (action === undefined || action === 'back') {
      inMenu = false;

      break;
    }

    if (action === 'add') {
      try {
        const servers: Cli_Menu_Interactive_ContextMenu_Servers = listServers(configPath);

        if (servers['length'] === 0) {
          Logger.warn('Add a server first.');
        } else {
          await addContextFlow(configPath, servers);
        }
      } catch (error) {
        const errorMessage: Cli_Menu_Interactive_ContextMenu_ErrorMessage = (error instanceof Error) ? error['message'] : String(error);

        Logger.error(`Error: ${errorMessage}`);
      }
    } else if (action === 'edit') {
      try {
        const contexts: Cli_Menu_Interactive_ContextMenu_Contexts = listContexts(configPath);

        contexts.sort((a, b) => a['name'].localeCompare(b['name']));

        if (contexts['length'] === 0) {
          Logger.warn('No contexts to edit.');
        } else {
          const selectResponse: Cli_Menu_Interactive_ContextMenu_SelectResponse = await prompts({
            type: 'select',
            name: 'name',
            message: 'Select context to edit:',
            choices: contexts.map((context) => ({
              title: context['name'],
              value: context['name'],
            })),
          });

          const name: Cli_Menu_Interactive_ContextMenu_Name = selectResponse['name'];

          if (name !== undefined) {
            const current: Cli_Menu_Interactive_ContextMenu_Current = contexts.find((context) => context['name'] === name);

            if (current !== undefined) {
              const editServers: Cli_Menu_Interactive_ContextMenu_EditServers = listServers(configPath);
              const serverChoices: Cli_Menu_Interactive_ContextMenu_ServerChoices = editServers.map((server) => ({
                title: server['name'],
                value: server['name'],
              }));

              const keepIdResponse: Cli_Menu_Interactive_ContextMenu_KeepIdResponse = await prompts({
                type: 'confirm',
                name: 'keepId',
                message: `Keep current ID (${current['id']})?`,
                initial: true,
              });

              const keepId: Cli_Menu_Interactive_ContextMenu_KeepId = keepIdResponse['keepId'];

              let id: Cli_Menu_Interactive_ContextMenu_Id = undefined;

              if (keepId === false) {
                id = generateId();

                Logger.info(`  New ID: ${id}`);
              }

              const httpChoices: Cli_Menu_Interactive_ContextMenu_HttpChoices = [
                {
                  title: 'Plain Text',
                  value: 'plain-text',
                },
                {
                  title: 'ntfy JSON',
                  value: 'ntfy-json',
                },
                {
                  title: 'Seerr',
                  value: 'seerr',
                },
                {
                  title: 'Synology DSM',
                  value: 'synology',
                },
                {
                  title: 'Statuspage.io',
                  value: 'statuspage',
                },
              ];
              const emailChoices: Cli_Menu_Interactive_ContextMenu_EmailChoices = [
                {
                  title: 'Plain Text',
                  value: 'plain-text',
                },
                {
                  title: 'pfSense',
                  value: 'pfsense',
                },
                {
                  title: 'UniFi',
                  value: 'unifi',
                },
              ];
              const knownChoices: Cli_Menu_Interactive_ContextMenu_KnownChoices = (current['type'] === 'http') ? httpChoices : emailChoices;
              const exists: Cli_Menu_Interactive_ContextMenu_Exists = knownChoices.some((c) => c['value'] === current['interpreter']);

              if (exists === false) {
                knownChoices.unshift({
                  title: `${current['interpreter']} (current, unknown)`,
                  value: current['interpreter'],
                });
              }

              const httpValues: Cli_Menu_Interactive_ContextMenu_HttpValues = [
                'plain-text',
                'ntfy-json',
                'seerr',
                'synology',
                'statuspage',
              ];
              const emailValues: Cli_Menu_Interactive_ContextMenu_EmailValues = [
                'plain-text',
                'pfsense',
                'unifi',
              ];
              const knownValues: Cli_Menu_Interactive_ContextMenu_KnownValues = (current['type'] === 'http') ? httpValues : emailValues;
              const interpreterIdx: Cli_Menu_Interactive_ContextMenu_InterpreterIdx = knownValues.indexOf(current['interpreter']);
              const interpreterInitial: Cli_Menu_Interactive_ContextMenu_InterpreterInitial = (interpreterIdx >= 0) ? interpreterIdx : 0;

              const interpreterResponse: Cli_Menu_Interactive_ContextMenu_InterpreterResponse = await prompts({
                type: 'select',
                name: 'interpreter',
                message: 'Interpreter:',
                choices: knownChoices,
                initial: interpreterInitial,
              });

              const interpreter: Cli_Menu_Interactive_ContextMenu_Interpreter = interpreterResponse['interpreter'];

              const topicResponse: Cli_Menu_Interactive_ContextMenu_TopicResponse = await prompts({
                type: 'text',
                name: 'topic',
                message: 'ntfy topic:',
                initial: current['topic'],
                validate: (value) => value.trim()['length'] > 0 || 'Topic is required',
              });

              const topic: Cli_Menu_Interactive_ContextMenu_Topic = topicResponse['topic'];

              const currentErrorTopic: Cli_Menu_Interactive_ContextMenu_CurrentErrorTopic = (current['error_topic'] !== undefined) ? current['error_topic'] : '';

              const errorTopicResponse: Cli_Menu_Interactive_ContextMenu_ErrorTopicResponse = await prompts({
                type: 'text',
                name: 'error_topic',
                message: 'ntfy error topic (blank to skip):',
                initial: currentErrorTopic,
              });

              const errorTopic: Cli_Menu_Interactive_ContextMenu_ErrorTopic = errorTopicResponse['error_topic'];

              const currentErrorEvents: Cli_Menu_Interactive_ContextMenu_CurrentErrorEvents = current['error_events'];

              const errorEventsResponse: Cli_Menu_Interactive_ContextMenu_ErrorEventsResponse = await prompts({
                type: 'multiselect',
                name: 'error_events',
                message: 'Errors that notify the error topic (space to select):',
                choices: [
                  {
                    title: 'Authentication (failed auth, scanner traffic)',
                    value: 'authentication',
                    selected: currentErrorEvents === undefined || currentErrorEvents.includes('authentication'),
                  },
                  {
                    title: 'Interpretation (interpreter errors)',
                    value: 'interpretation',
                    selected: currentErrorEvents === undefined || currentErrorEvents.includes('interpretation'),
                  },
                ],
              });

              const errorEvents: Cli_Menu_Interactive_ContextMenu_ErrorEvents = errorEventsResponse['error_events'];

              const modeInitial: Cli_Menu_Interactive_ContextMenu_ModeInitial = (current['mode'] === 'send-all') ? 1 : 0;

              const modeResponse: Cli_Menu_Interactive_ContextMenu_ModeResponse = await prompts({
                type: 'select',
                name: 'mode',
                message: 'Mode:',
                choices: [
                  {
                    title: 'Send to one server only',
                    value: 'send-once',
                  },
                  {
                    title: 'Send to all servers',
                    value: 'send-all',
                  },
                ],
                initial: modeInitial,
              });

              const mode: Cli_Menu_Interactive_ContextMenu_Mode = modeResponse['mode'];

              const showVisitorInfoResponse: Cli_Menu_Interactive_ContextMenu_ShowVisitorInfoResponse = await prompts({
                type: 'confirm',
                name: 'show_visitor_info',
                message: 'Show visitor info?',
                initial: current['show_visitor_info'],
              });

              const showVisitorInfo: Cli_Menu_Interactive_ContextMenu_ShowVisitorInfo = showVisitorInfoResponse['show_visitor_info'];

              const primaryServerIdx: Cli_Menu_Interactive_ContextMenu_PrimaryServerIdx = serverChoices.findIndex((s) => s['value'] === current['primary_server']);

              if (primaryServerIdx < 0) {
                serverChoices.unshift({
                  title: `${current['primary_server']} (current, not found)`,
                  value: current['primary_server'],
                });
              }

              const primaryServerInitial: Cli_Menu_Interactive_ContextMenu_PrimaryServerInitial = (primaryServerIdx >= 0) ? primaryServerIdx : 0;

              const primaryServerResponse: Cli_Menu_Interactive_ContextMenu_PrimaryServerResponse = await prompts({
                type: 'select',
                name: 'primary_server',
                message: 'Primary server:',
                choices: serverChoices,
                initial: primaryServerInitial,
              });

              const primaryServer: Cli_Menu_Interactive_ContextMenu_PrimaryServer = primaryServerResponse['primary_server'];

              const selectedServersResponse: Cli_Menu_Interactive_ContextMenu_SelectedServersResponse = await prompts({
                type: 'multiselect',
                name: 'selectedServers',
                message: 'All servers (space to select):',
                choices: serverChoices.map((s) => ({
                  ...s,
                  selected: current['servers'].includes(s['value']),
                })),
              });

              const selectedServers: Cli_Menu_Interactive_ContextMenu_SelectedServers = selectedServersResponse['selectedServers'];

              const updates: Cli_Menu_Interactive_ContextMenu_Updates = {};

              if (id !== undefined) {
                Reflect.set(updates, 'id', id);
              }

              if (interpreter !== undefined) {
                Reflect.set(updates, 'interpreter', interpreter);
              }

              if (topic !== undefined) {
                Reflect.set(updates, 'topic', topic);
              }

              if (mode !== undefined) {
                Reflect.set(updates, 'mode', mode);
              }

              if (showVisitorInfo !== undefined) {
                Reflect.set(updates, 'show_visitor_info', showVisitorInfo);
              }

              if (primaryServer !== undefined) {
                Reflect.set(updates, 'primary_server', primaryServer);
              }

              if (selectedServers !== undefined) {
                Reflect.set(updates, 'servers', selectedServers);
              }

              const errorTopicValue: Cli_Menu_Interactive_ContextMenu_ErrorTopicValue = errorTopic;
              const errorTopicTrimmed: Cli_Menu_Interactive_ContextMenu_ErrorTopicTrimmed = (errorTopicValue !== undefined) ? errorTopicValue.trim() : '';
              const resolvedErrorTopic: Cli_Menu_Interactive_ContextMenu_ResolvedErrorTopic = (errorTopicTrimmed !== '') ? errorTopicTrimmed : undefined;

              Reflect.set(updates, 'error_topic', resolvedErrorTopic);

              if (errorEvents !== undefined) {
                Reflect.set(updates, 'error_events', errorEvents);
              }

              if (current['type'] === 'http' && current['token'] !== undefined) {
                const keepTokenResponse: Cli_Menu_Interactive_ContextMenu_KeepTokenResponse = await prompts({
                  type: 'confirm',
                  name: 'keepToken',
                  message: 'Keep current auth token?',
                  initial: true,
                });

                const keepToken: Cli_Menu_Interactive_ContextMenu_KeepToken = keepTokenResponse['keepToken'];

                if (keepToken === false) {
                  const newToken: Cli_Menu_Interactive_ContextMenu_NewToken = generateToken();

                  Reflect.set(updates, 'token', newToken);

                  Logger.info(`  New token: ${newToken}`);
                }
              } else if (current['type'] === 'http' && current['token'] === undefined) {
                const addTokenResponse: Cli_Menu_Interactive_ContextMenu_AddTokenResponse = await prompts({
                  type: 'confirm',
                  name: 'addToken',
                  message: 'Add auth token?',
                  initial: false,
                });

                const addToken: Cli_Menu_Interactive_ContextMenu_AddToken = addTokenResponse['addToken'];

                if (addToken === true) {
                  const addNewToken: Cli_Menu_Interactive_ContextMenu_AddNewToken = generateToken();

                  Reflect.set(updates, 'token', addNewToken);

                  Logger.info(`  New token: ${addNewToken}`);
                }
              } else if (current['type'] === 'email') {
                const currentAllowedFrom: Cli_Menu_Interactive_ContextMenu_CurrentAllowedFrom = (current['allowed_from'] !== undefined) ? current['allowed_from'] : '';

                const allowedFromResponse: Cli_Menu_Interactive_ContextMenu_AllowedFromResponse = await prompts({
                  type: 'text',
                  name: 'allowed_from',
                  message: 'Allowed from email (blank to clear):',
                  initial: currentAllowedFrom,
                });

                const allowedFrom: Cli_Menu_Interactive_ContextMenu_AllowedFrom = allowedFromResponse['allowed_from'];
                const allowedFromTrimmed: Cli_Menu_Interactive_ContextMenu_AllowedFromTrimmed = (allowedFrom !== undefined) ? allowedFrom.trim() : '';
                const resolvedAllowedFrom: Cli_Menu_Interactive_ContextMenu_ResolvedAllowedFrom = (allowedFromTrimmed !== '') ? allowedFromTrimmed : undefined;

                Reflect.set(updates, 'allowed_from', resolvedAllowedFrom);
              }

              const editImport: Cli_Menu_Interactive_ContextMenu_EditImport = await import('../commands/context.js');

              editImport.editContext(configPath, name, updates);

              Logger.info(`Context "${name}" updated.`);
            }
          }
        }
      } catch (error) {
        const editErrorMessage: Cli_Menu_Interactive_ContextMenu_EditErrorMessage = (error instanceof Error) ? error['message'] : String(error);

        Logger.error(`Error: ${editErrorMessage}`);
      }
    } else if (action === 'remove') {
      try {
        const removeContexts: Cli_Menu_Interactive_ContextMenu_RemoveContexts = listContexts(configPath);

        removeContexts.sort((a, b) => a['name'].localeCompare(b['name']));

        if (removeContexts['length'] === 0) {
          Logger.warn('No contexts to remove.');
        } else {
          const removeSelectResponse: Cli_Menu_Interactive_ContextMenu_RemoveSelectResponse = await prompts({
            type: 'select',
            name: 'name',
            message: 'Select context to remove:',
            choices: removeContexts.map((context) => ({
              title: context['name'],
              value: context['name'],
            })),
          });

          const removeName: Cli_Menu_Interactive_ContextMenu_RemoveName = removeSelectResponse['name'];

          if (removeName !== undefined) {
            const confirmResponse: Cli_Menu_Interactive_ContextMenu_ConfirmResponse = await prompts({
              type: 'confirm',
              name: 'confirmed',
              message: chalk.yellow(`Remove "${removeName}"?`),
              initial: false,
            });

            const confirmed: Cli_Menu_Interactive_ContextMenu_Confirmed = confirmResponse['confirmed'];

            if (confirmed === true) {
              removeContext(configPath, removeName);

              Logger.info(`Context "${removeName}" removed.`);
            }
          }
        }
      } catch (error) {
        const removeErrorMessage: Cli_Menu_Interactive_ContextMenu_RemoveErrorMessage = (error instanceof Error) ? error['message'] : String(error);

        Logger.error(`Error: ${removeErrorMessage}`);
      }
    }
  }

  return;
}

/**
 * CLI - Menu - Interactive - Add Context Flow.
 *
 * Walks the user through creating a new HTTP or email context.
 * Collects all required fields before persisting the configuration.
 *
 * @since 2.0.0
 */
async function addContextFlow(configPath: Cli_Menu_Interactive_AddContextFlow_ConfigPath, servers: Cli_Menu_Interactive_AddContextFlow_Servers): Cli_Menu_Interactive_AddContextFlow_Returns {
  const autoId: Cli_Menu_Interactive_AddContextFlow_AutoId = generateId();

  const typeResponse: Cli_Menu_Interactive_AddContextFlow_TypeResponse = await prompts({
    type: 'select',
    name: 'contextType',
    message: 'Context type:',
    choices: [
      {
        title: 'HTTP',
        value: 'http',
      },
      {
        title: 'Email',
        value: 'email',
      },
    ],
  });

  const contextType: Cli_Menu_Interactive_AddContextFlow_ContextType = typeResponse['contextType'];

  if (contextType === undefined) {
    return;
  }

  const httpInterpreters: Cli_Menu_Interactive_AddContextFlow_HttpInterpreters = [
    {
      title: 'Plain Text',
      value: 'plain-text',
    },
    {
      title: 'ntfy JSON',
      value: 'ntfy-json',
    },
    {
      title: 'Seerr',
      value: 'seerr',
    },
    {
      title: 'Synology DSM',
      value: 'synology',
    },
    {
      title: 'Statuspage.io',
      value: 'statuspage',
    },
  ];

  const emailInterpreters: Cli_Menu_Interactive_AddContextFlow_EmailInterpreters = [
    {
      title: 'Plain Text',
      value: 'plain-text',
    },
    {
      title: 'pfSense',
      value: 'pfsense',
    },
    {
      title: 'UniFi',
      value: 'unifi',
    },
  ];

  const nameResponse: Cli_Menu_Interactive_AddContextFlow_NameResponse = await prompts({
    type: 'text',
    name: 'name',
    message: 'Context name:',
    validate: (value) => value.trim()['length'] > 0 || 'Name is required',
  });

  const name: Cli_Menu_Interactive_AddContextFlow_Name = nameResponse['name'];

  if (name === undefined) {
    return;
  }

  const idMessage: Cli_Menu_Interactive_AddContextFlow_IdMessage = (contextType === 'http') ? `ID (blank for auto: ${autoId}):` : 'ID (email local part, e.g. "pfsense"):';

  const idResponse: Cli_Menu_Interactive_AddContextFlow_IdResponse = await prompts({
    type: 'text',
    name: 'id',
    message: idMessage,
    validate: (value) => {
      if (contextType === 'http') {
        return true;
      }

      if (value.trim()['length'] === 0) {
        return 'ID is required for email contexts';
      }

      if (LIB_REGEX_NON_ALPHANUMERIC_ID.test(value) === true) {
        return 'ID must be alphanumeric (plus . _ -)';
      }

      return true;
    },
  });

  const rawId: Cli_Menu_Interactive_AddContextFlow_RawId = idResponse['id'];

  if (rawId === undefined) {
    return;
  }

  const interpreterChoices: Cli_Menu_Interactive_AddContextFlow_InterpreterChoices = (contextType === 'http') ? httpInterpreters : emailInterpreters;

  const interpreterResponse: Cli_Menu_Interactive_AddContextFlow_InterpreterResponse = await prompts({
    type: 'select',
    name: 'interpreter',
    message: 'Interpreter:',
    choices: interpreterChoices,
  });

  const interpreter: Cli_Menu_Interactive_AddContextFlow_Interpreter = interpreterResponse['interpreter'];

  if (interpreter === undefined) {
    return;
  }

  const topicResponse: Cli_Menu_Interactive_AddContextFlow_TopicResponse = await prompts({
    type: 'text',
    name: 'topic',
    message: 'ntfy topic:',
    validate: (value) => value.trim()['length'] > 0 || 'Topic is required',
  });

  const topic: Cli_Menu_Interactive_AddContextFlow_Topic = topicResponse['topic'];

  if (topic === undefined) {
    return;
  }

  const errorTopicResponse: Cli_Menu_Interactive_AddContextFlow_ErrorTopicResponse = await prompts({
    type: 'text',
    name: 'error_topic',
    message: 'ntfy error topic (blank to skip):',
  });

  const errorTopic: Cli_Menu_Interactive_AddContextFlow_ErrorTopic = errorTopicResponse['error_topic'];

  const errorEventsResponse: Cli_Menu_Interactive_AddContextFlow_ErrorEventsResponse = await prompts({
    type: 'multiselect',
    name: 'error_events',
    message: 'Errors that notify the error topic (space to select):',
    choices: [
      {
        title: 'Authentication (failed auth, scanner traffic)',
        value: 'authentication',
        selected: true,
      },
      {
        title: 'Interpretation (interpreter errors)',
        value: 'interpretation',
        selected: true,
      },
    ],
  });

  const errorEvents: Cli_Menu_Interactive_AddContextFlow_ErrorEvents = errorEventsResponse['error_events'];

  const modeResponse: Cli_Menu_Interactive_AddContextFlow_ModeResponse = await prompts({
    type: 'select',
    name: 'mode',
    message: 'Mode:',
    choices: [
      {
        title: 'Send to one server only',
        value: 'send-once',
      },
      {
        title: 'Send to all servers',
        value: 'send-all',
      },
    ],
  });

  const mode: Cli_Menu_Interactive_AddContextFlow_Mode = modeResponse['mode'];

  if (mode === undefined) {
    return;
  }

  const showVisitorInfoResponse: Cli_Menu_Interactive_AddContextFlow_ShowVisitorInfoResponse = await prompts({
    type: 'confirm',
    name: 'show_visitor_info',
    message: 'Show visitor info?',
    initial: false,
  });

  const showVisitorInfo: Cli_Menu_Interactive_AddContextFlow_ShowVisitorInfo = showVisitorInfoResponse['show_visitor_info'];

  if (showVisitorInfo === undefined) {
    return;
  }

  const primaryServerResponse: Cli_Menu_Interactive_AddContextFlow_PrimaryServerResponse = await prompts({
    type: 'select',
    name: 'primary_server',
    message: 'Primary server:',
    choices: servers.map((server) => ({
      title: server['name'],
      value: server['name'],
    })),
  });

  const primaryServer: Cli_Menu_Interactive_AddContextFlow_PrimaryServer = primaryServerResponse['primary_server'];

  if (primaryServer === undefined) {
    return;
  }

  const selectedServersResponse: Cli_Menu_Interactive_AddContextFlow_SelectedServersResponse = await prompts({
    type: 'multiselect',
    name: 'selectedServers',
    message: 'All servers for this context (space to select):',
    choices: servers.map((server) => ({
      title: server['name'],
      value: server['name'],
    })),
  });

  const selectedServers: Cli_Menu_Interactive_AddContextFlow_SelectedServers = selectedServersResponse['selectedServers'];

  if (selectedServers === undefined) {
    return;
  }

  const rawIdString: Cli_Menu_Interactive_AddContextFlow_RawIdString = rawId;
  const idTrimmed: Cli_Menu_Interactive_AddContextFlow_IdTrimmed = rawIdString.trim();
  const resolvedId: Cli_Menu_Interactive_AddContextFlow_ResolvedId = (idTrimmed !== '') ? idTrimmed : autoId;

  const errorTopicString: Cli_Menu_Interactive_AddContextFlow_ErrorTopicString = (errorTopic !== undefined) ? (errorTopic) : '';
  const errorTopicTrimmed: Cli_Menu_Interactive_AddContextFlow_ErrorTopicTrimmed = errorTopicString.trim();
  const resolvedErrorTopic: Cli_Menu_Interactive_AddContextFlow_ResolvedErrorTopic = (errorTopicTrimmed !== '') ? errorTopicTrimmed : undefined;

  const topicString: Cli_Menu_Interactive_AddContextFlow_TopicString = topic;
  const typedInterpreter: Cli_Menu_Interactive_AddContextFlow_TypedInterpreter = interpreter as Cli_Menu_Interactive_AddContextFlow_TypedInterpreter;
  const typedMode: Cli_Menu_Interactive_AddContextFlow_TypedMode = mode as Cli_Menu_Interactive_AddContextFlow_TypedMode;
  const typedErrorEvents: Cli_Menu_Interactive_AddContextFlow_TypedErrorEvents = errorEvents as Cli_Menu_Interactive_AddContextFlow_TypedErrorEvents;

  if (contextType === 'http') {
    const autoToken: Cli_Menu_Interactive_AddContextFlow_AutoToken = generateToken();

    const tokenResponse: Cli_Menu_Interactive_AddContextFlow_TokenResponse = await prompts({
      type: 'text',
      name: 'token',
      message: 'Auth token (blank to skip, enter to accept):',
      initial: autoToken,
    });

    const rawToken: Cli_Menu_Interactive_AddContextFlow_RawToken = tokenResponse['token'];
    const tokenTrimmed: Cli_Menu_Interactive_AddContextFlow_TokenTrimmed = (rawToken !== undefined) ? rawToken.trim() : '';
    const resolvedToken: Cli_Menu_Interactive_AddContextFlow_ResolvedToken = (tokenTrimmed !== '') ? tokenTrimmed : undefined;

    addContext(configPath, {
      name,
      type: 'http',
      id: resolvedId,
      interpreter: typedInterpreter,
      topic: topicString,
      error_topic: resolvedErrorTopic,
      error_events: typedErrorEvents,
      mode: typedMode,
      show_visitor_info: showVisitorInfo,
      primary_server: primaryServer,
      servers: selectedServers,
      token: resolvedToken,
    });
  } else {
    const allowedFromResponse: Cli_Menu_Interactive_AddContextFlow_AllowedFromResponse = await prompts({
      type: 'text',
      name: 'allowed_from',
      message: 'Allowed from email (blank to skip):',
    });

    const rawAllowedFrom: Cli_Menu_Interactive_AddContextFlow_RawAllowedFrom = allowedFromResponse['allowed_from'];
    const allowedFromTrimmed: Cli_Menu_Interactive_AddContextFlow_AllowedFromTrimmed = (rawAllowedFrom !== undefined) ? rawAllowedFrom.trim() : '';
    const resolvedAllowedFrom: Cli_Menu_Interactive_AddContextFlow_ResolvedAllowedFrom = (allowedFromTrimmed !== '') ? allowedFromTrimmed : undefined;

    addContext(configPath, {
      name,
      type: 'email',
      id: resolvedId,
      interpreter: typedInterpreter,
      topic: topicString,
      error_topic: resolvedErrorTopic,
      error_events: typedErrorEvents,
      mode: typedMode,
      show_visitor_info: showVisitorInfo,
      primary_server: primaryServer,
      servers: selectedServers,
      allowed_from: resolvedAllowedFrom,
    });
  }

  Logger.info(`Context "${name}" added.`);

  return;
}

/**
 * CLI - Menu - Interactive - Settings Flow.
 *
 * Prompts the user for updated settings values.
 * Persists changes to the configuration file on confirmation.
 *
 * @since 2.0.0
 */
async function settingsFlow(configPath: Cli_Menu_Interactive_SettingsFlow_ConfigPath): Cli_Menu_Interactive_SettingsFlow_Returns {
  let currentSettings: Cli_Menu_Interactive_SettingsFlow_CurrentSettings = undefined;

  try {
    currentSettings = getSettings(configPath);
  } catch (error) {
    const errorMessage: Cli_Menu_Interactive_SettingsFlow_ErrorMessage = (error instanceof Error) ? error['message'] : String(error);

    Logger.error(`Error: ${errorMessage}`);

    return;
  }

  const workerNameResponse: Cli_Menu_Interactive_SettingsFlow_WorkerNameResponse = await prompts({
    type: 'text',
    name: 'worker_name',
    message: 'Worker name:',
    initial: currentSettings['worker_name'],
    validate: (value) => value.trim()['length'] > 0 || 'Worker name is required',
  });

  const workerName: Cli_Menu_Interactive_SettingsFlow_WorkerName = workerNameResponse['worker_name'];

  if (workerName === undefined) {
    return;
  }

  const baseDomainResponse: Cli_Menu_Interactive_SettingsFlow_BaseDomainResponse = await prompts({
    type: 'text',
    name: 'base_domain',
    message: 'Base domain:',
    initial: currentSettings['base_domain'],
    validate: (value) => value.trim()['length'] > 0 || 'Base domain is required',
  });

  const baseDomain: Cli_Menu_Interactive_SettingsFlow_BaseDomain = baseDomainResponse['base_domain'];

  if (baseDomain === undefined) {
    return;
  }

  const showResponseOutputResponse: Cli_Menu_Interactive_SettingsFlow_ShowResponseOutputResponse = await prompts({
    type: 'confirm',
    name: 'show_response_output',
    message: 'Show response output (debug mode)?',
    initial: currentSettings['show_response_output'],
  });

  const showResponseOutput: Cli_Menu_Interactive_SettingsFlow_ShowResponseOutput = showResponseOutputResponse['show_response_output'];

  if (showResponseOutput === undefined) {
    return;
  }

  try {
    updateSettings(configPath, {
      worker_name: workerName,
      base_domain: baseDomain,
      show_response_output: showResponseOutput,
    });

    Logger.info('Settings updated.');
  } catch (error) {
    const updateErrorMessage: Cli_Menu_Interactive_SettingsFlow_UpdateErrorMessage = (error instanceof Error) ? error['message'] : String(error);

    Logger.error(`Error: ${updateErrorMessage}`);
  }

  return;
}

export {
  interactiveMenu,
};

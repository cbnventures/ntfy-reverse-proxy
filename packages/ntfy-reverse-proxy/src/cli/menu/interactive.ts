import { existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

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
  CliMenuInteractiveAddContextFlowAllowedFromResponse,
  CliMenuInteractiveAddContextFlowAllowedFromTrimmed,
  CliMenuInteractiveAddContextFlowAutoId,
  CliMenuInteractiveAddContextFlowAutoToken,
  CliMenuInteractiveAddContextFlowConfigPath,
  CliMenuInteractiveAddContextFlowContextType,
  CliMenuInteractiveAddContextFlowEmailInterpreters,
  CliMenuInteractiveAddContextFlowErrorTopic,
  CliMenuInteractiveAddContextFlowErrorTopicResponse,
  CliMenuInteractiveAddContextFlowErrorTopicString,
  CliMenuInteractiveAddContextFlowErrorTopicTrimmed,
  CliMenuInteractiveAddContextFlowHttpInterpreters,
  CliMenuInteractiveAddContextFlowIdMessage,
  CliMenuInteractiveAddContextFlowIdResponse,
  CliMenuInteractiveAddContextFlowIdTrimmed,
  CliMenuInteractiveAddContextFlowIdValidateValue,
  CliMenuInteractiveAddContextFlowInterpreter,
  CliMenuInteractiveAddContextFlowInterpreterChoices,
  CliMenuInteractiveAddContextFlowInterpreterResponse,
  CliMenuInteractiveAddContextFlowMode,
  CliMenuInteractiveAddContextFlowModeResponse,
  CliMenuInteractiveAddContextFlowName,
  CliMenuInteractiveAddContextFlowNameResponse,
  CliMenuInteractiveAddContextFlowNameValidateValue,
  CliMenuInteractiveAddContextFlowPrimaryServer,
  CliMenuInteractiveAddContextFlowPrimaryServerResponse,
  CliMenuInteractiveAddContextFlowRawAllowedFrom,
  CliMenuInteractiveAddContextFlowRawId,
  CliMenuInteractiveAddContextFlowRawIdString,
  CliMenuInteractiveAddContextFlowRawToken,
  CliMenuInteractiveAddContextFlowResolvedAllowedFrom,
  CliMenuInteractiveAddContextFlowResolvedErrorTopic,
  CliMenuInteractiveAddContextFlowResolvedId,
  CliMenuInteractiveAddContextFlowResolvedToken,
  CliMenuInteractiveAddContextFlowReturn,
  CliMenuInteractiveAddContextFlowSelectedServers,
  CliMenuInteractiveAddContextFlowSelectedServersResponse,
  CliMenuInteractiveAddContextFlowServers,
  CliMenuInteractiveAddContextFlowShowVisitorInfo,
  CliMenuInteractiveAddContextFlowShowVisitorInfoResponse,
  CliMenuInteractiveAddContextFlowTokenResponse,
  CliMenuInteractiveAddContextFlowTokenTrimmed,
  CliMenuInteractiveAddContextFlowTopic,
  CliMenuInteractiveAddContextFlowTopicResponse,
  CliMenuInteractiveAddContextFlowTopicString,
  CliMenuInteractiveAddContextFlowTopicValidateValue,
  CliMenuInteractiveAddContextFlowTypedInterpreter,
  CliMenuInteractiveAddContextFlowTypedMode,
  CliMenuInteractiveAddContextFlowTypeResponse,
  CliMenuInteractiveContextMenuAction,
  CliMenuInteractiveContextMenuAddToken,
  CliMenuInteractiveContextMenuAddTokenResponse,
  CliMenuInteractiveContextMenuAllowedFrom,
  CliMenuInteractiveContextMenuAllowedFromResponse,
  CliMenuInteractiveContextMenuAllowedFromTrimmed,
  CliMenuInteractiveContextMenuConfigPath,
  CliMenuInteractiveContextMenuConfirmed,
  CliMenuInteractiveContextMenuConfirmResponse,
  CliMenuInteractiveContextMenuContexts,
  CliMenuInteractiveContextMenuCurrent,
  CliMenuInteractiveContextMenuEditImport,
  CliMenuInteractiveContextMenuEmailChoices,
  CliMenuInteractiveContextMenuErrorMessage,
  CliMenuInteractiveContextMenuErrorTopic,
  CliMenuInteractiveContextMenuErrorTopicResponse,
  CliMenuInteractiveContextMenuErrorTopicTrimmed,
  CliMenuInteractiveContextMenuErrorTopicValue,
  CliMenuInteractiveContextMenuExists,
  CliMenuInteractiveContextMenuHttpChoices,
  CliMenuInteractiveContextMenuId,
  CliMenuInteractiveContextMenuIdx,
  CliMenuInteractiveContextMenuInMenu,
  CliMenuInteractiveContextMenuInterpreter,
  CliMenuInteractiveContextMenuInterpreterResponse,
  CliMenuInteractiveContextMenuKeepId,
  CliMenuInteractiveContextMenuKeepIdResponse,
  CliMenuInteractiveContextMenuKeepToken,
  CliMenuInteractiveContextMenuKeepTokenResponse,
  CliMenuInteractiveContextMenuKnownChoices,
  CliMenuInteractiveContextMenuKnownValues,
  CliMenuInteractiveContextMenuMode,
  CliMenuInteractiveContextMenuModeResponse,
  CliMenuInteractiveContextMenuName,
  CliMenuInteractiveContextMenuNewToken,
  CliMenuInteractiveContextMenuPrimaryServer,
  CliMenuInteractiveContextMenuPrimaryServerIdx,
  CliMenuInteractiveContextMenuPrimaryServerResponse,
  CliMenuInteractiveContextMenuResponse,
  CliMenuInteractiveContextMenuReturn,
  CliMenuInteractiveContextMenuSelectedServers,
  CliMenuInteractiveContextMenuSelectedServersResponse,
  CliMenuInteractiveContextMenuSelectResponse,
  CliMenuInteractiveContextMenuServerChoices,
  CliMenuInteractiveContextMenuServers,
  CliMenuInteractiveContextMenuShowVisitorInfo,
  CliMenuInteractiveContextMenuShowVisitorInfoResponse,
  CliMenuInteractiveContextMenuTopic,
  CliMenuInteractiveContextMenuTopicResponse,
  CliMenuInteractiveContextMenuTopicValidateValue,
  CliMenuInteractiveContextMenuUpdates,
  CliMenuInteractiveInteractiveMenuAction,
  CliMenuInteractiveInteractiveMenuConfigDirResponse,
  CliMenuInteractiveInteractiveMenuConfigDirs,
  CliMenuInteractiveInteractiveMenuCurrentFilePath,
  CliMenuInteractiveInteractiveMenuDefaultConfigDir,
  CliMenuInteractiveInteractiveMenuDir,
  CliMenuInteractiveInteractiveMenuErrorMessage,
  CliMenuInteractiveInteractiveMenuHeader,
  CliMenuInteractiveInteractiveMenuInteractiveConfigPath,
  CliMenuInteractiveInteractiveMenuPackageJsonParsed,
  CliMenuInteractiveInteractiveMenuPackageJsonPath,
  CliMenuInteractiveInteractiveMenuPackageJsonRaw,
  CliMenuInteractiveInteractiveMenuParent,
  CliMenuInteractiveInteractiveMenuResponse,
  CliMenuInteractiveInteractiveMenuReturn,
  CliMenuInteractiveInteractiveMenuRunning,
  CliMenuInteractiveInteractiveMenuVersion,
  CliMenuInteractiveServerMenuAction,
  CliMenuInteractiveServerMenuAnswers,
  CliMenuInteractiveServerMenuConfigPath,
  CliMenuInteractiveServerMenuConfirmed,
  CliMenuInteractiveServerMenuConfirmResponse,
  CliMenuInteractiveServerMenuCurrent,
  CliMenuInteractiveServerMenuEditImport,
  CliMenuInteractiveServerMenuEditUpdates,
  CliMenuInteractiveServerMenuErrorMessage,
  CliMenuInteractiveServerMenuInMenu,
  CliMenuInteractiveServerMenuName,
  CliMenuInteractiveServerMenuNameValidateValue,
  CliMenuInteractiveServerMenuResponse,
  CliMenuInteractiveServerMenuReturn,
  CliMenuInteractiveServerMenuSelectResponse,
  CliMenuInteractiveServerMenuServer,
  CliMenuInteractiveServerMenuServers,
  CliMenuInteractiveServerMenuServerUrl,
  CliMenuInteractiveServerMenuServerUrlTrimmed,
  CliMenuInteractiveServerMenuServerValidateValue,
  CliMenuInteractiveServerMenuStartsWithTk,
  CliMenuInteractiveServerMenuToken,
  CliMenuInteractiveServerMenuTokenTrimmed,
  CliMenuInteractiveServerMenuTokenValidateValue,
  CliMenuInteractiveServerMenuTokenValue,
  CliMenuInteractiveServerMenuTrimmedEmpty,
  CliMenuInteractiveServerMenuUpdates,
  CliMenuInteractiveServerMenuUpdatesServerString,
  CliMenuInteractiveServerMenuUpdatesTokenString,
  CliMenuInteractiveServerMenuUrlInstance,
  CliMenuInteractiveSettingsFlowBaseDomain,
  CliMenuInteractiveSettingsFlowBaseDomainResponse,
  CliMenuInteractiveSettingsFlowBaseDomainValidateValue,
  CliMenuInteractiveSettingsFlowConfigPath,
  CliMenuInteractiveSettingsFlowCurrentSettings,
  CliMenuInteractiveSettingsFlowErrorMessage,
  CliMenuInteractiveSettingsFlowReturn,
  CliMenuInteractiveSettingsFlowShowResponseOutput,
  CliMenuInteractiveSettingsFlowShowResponseOutputResponse,
  CliMenuInteractiveSettingsFlowWorkerName,
  CliMenuInteractiveSettingsFlowWorkerNameResponse,
  CliMenuInteractiveSettingsFlowWorkerNameValidateValue,
} from '../../types/cli/menu/interactive.d.ts';

/**
 * CLI - Menu - Interactive - Menu.
 *
 * Orchestrates the top-level interactive CLI menu loop.
 * Dispatches user selections to the appropriate sub-menus.
 *
 * @since 2.0.0
 */
async function interactiveMenu(configDirs: CliMenuInteractiveInteractiveMenuConfigDirs): CliMenuInteractiveInteractiveMenuReturn {
  const currentFilePath: CliMenuInteractiveInteractiveMenuCurrentFilePath = fileURLToPath(import.meta.url);

  let dir: CliMenuInteractiveInteractiveMenuDir = dirname(currentFilePath);
  let version: CliMenuInteractiveInteractiveMenuVersion = '0.0.0';

  while (dir !== dirname(dir)) {
    const packageJsonPath: CliMenuInteractiveInteractiveMenuPackageJsonPath = join(dir, 'package.json');

    if (existsSync(packageJsonPath) === true) {
      const packageJsonRaw: CliMenuInteractiveInteractiveMenuPackageJsonRaw = readFileSync(packageJsonPath, 'utf-8');
      const packageJsonParsed: CliMenuInteractiveInteractiveMenuPackageJsonParsed = JSON.parse(packageJsonRaw);

      version = packageJsonParsed['version'] as CliMenuInteractiveInteractiveMenuVersion;

      break;
    }

    const parent: CliMenuInteractiveInteractiveMenuParent = dirname(dir);

    dir = parent;
  }

  const header: CliMenuInteractiveInteractiveMenuHeader = CLIHeader.render([
    chalk.magentaBright(`Reverse Proxy for ntfy v${version}`),
    chalk.dim('A CBN Ventures Creation'),
  ], {
    style: 'round',
    width: 50,
    marginBottom: 1,
  });

  process.stdout.write(`${header}\n`);

  let configPath: CliMenuInteractiveInteractiveMenuInteractiveConfigPath = undefined;

  if (configDirs['length'] > 1) {
    const configDirResponse: CliMenuInteractiveInteractiveMenuConfigDirResponse = await prompts({
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
    const defaultConfigDir: CliMenuInteractiveInteractiveMenuDefaultConfigDir = Bootstrap.getConfigDir('ntfy-reverse-proxy');

    configPath = join(defaultConfigDir, 'config.json');
  }

  let running: CliMenuInteractiveInteractiveMenuRunning = true;

  while (running === true) {
    const response: CliMenuInteractiveInteractiveMenuResponse = await prompts({
      type: 'select',
      name: 'action',
      message: chalk.cyan('What would you like to do?'),
      choices: [
        {
          title: 'Manage Servers', value: 'servers',
        },
        {
          title: 'Manage Contexts', value: 'contexts',
        },
        {
          title: 'Settings', value: 'settings',
        },
        {
          title: 'Deploy', value: 'deploy',
        },
        {
          title: 'Exit', value: 'exit',
        },
      ],
    });

    const action: CliMenuInteractiveInteractiveMenuAction = response['action'];

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
        const errorMessage: CliMenuInteractiveInteractiveMenuErrorMessage = (error instanceof Error) ? error['message'] : String(error);

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
async function serverMenu(configPath: CliMenuInteractiveServerMenuConfigPath): CliMenuInteractiveServerMenuReturn {
  let inMenu: CliMenuInteractiveServerMenuInMenu = true;

  while (inMenu === true) {
    const response: CliMenuInteractiveServerMenuResponse = await prompts({
      type: 'select',
      name: 'action',
      message: chalk.cyan('Manage Servers'),
      choices: [
        {
          title: 'Add', value: 'add',
        },
        {
          title: 'Edit', value: 'edit',
        },
        {
          title: 'Remove', value: 'remove',
        },
        {
          title: 'Back', value: 'back',
        },
      ],
    });

    const action: CliMenuInteractiveServerMenuAction = response['action'];

    if (action === undefined || action === 'back') {
      inMenu = false;

      break;
    }

    if (action === 'add') {
      const answers: CliMenuInteractiveServerMenuAnswers = await prompts([
        {
          type: 'text',
          name: 'name',
          message: 'Server name:',
          validate: (value: CliMenuInteractiveServerMenuNameValidateValue) => value.trim()['length'] > 0 || 'Name is required',
        },
        {
          type: 'text',
          name: 'server',
          message: 'Server URL:',
          validate: (value: CliMenuInteractiveServerMenuServerValidateValue) => {
            if (value.startsWith('https://') === false) {
              return 'URL must start with https://';
            }

            try {
              const urlInstance: CliMenuInteractiveServerMenuUrlInstance = new URL(value);

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
          validate: (value: CliMenuInteractiveServerMenuTokenValidateValue) => value.startsWith('tk_') || 'Token must start with tk_',
        },
      ]);

      const answersName: CliMenuInteractiveServerMenuName = answers['name'];
      const answersServer: CliMenuInteractiveServerMenuServer = answers['server'];
      const answersToken: CliMenuInteractiveServerMenuToken = answers['token'];

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
          const errorMessage: CliMenuInteractiveServerMenuErrorMessage = (error instanceof Error) ? error['message'] : String(error);

          Logger.error(`Error: ${errorMessage}`);
        }
      }
    } else if (action === 'edit') {
      try {
        const servers: CliMenuInteractiveServerMenuServers = listServers(configPath);

        servers.sort((a, b) => a['name'].localeCompare(b['name']));

        if (servers['length'] === 0) {
          Logger.warn('No servers to edit.');
        } else {
          const selectResponse: CliMenuInteractiveServerMenuSelectResponse = await prompts({
            type: 'select',
            name: 'name',
            message: 'Select server to edit:',
            choices: servers.map((server) => ({
              title: server['name'], value: server['name'],
            })),
          });

          const name: CliMenuInteractiveServerMenuName = selectResponse['name'];

          if (name !== undefined) {
            const current: CliMenuInteractiveServerMenuCurrent = servers.find((server) => server['name'] === name);

            const currentServer: CliMenuInteractiveServerMenuServer = (current !== undefined) ? current['server'] : undefined;

            const updates: CliMenuInteractiveServerMenuUpdates = await prompts([
              {
                type: 'text',
                name: 'server',
                message: 'Server URL:',
                initial: currentServer,
                validate: (value: CliMenuInteractiveServerMenuServerValidateValue) => {
                  if (value.startsWith('https://') === false) {
                    return 'URL must start with https://';
                  }

                  try {
                    const urlInstance: CliMenuInteractiveServerMenuUrlInstance = new URL(value);

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
                message: 'Server token (leave blank to keep current):',
                validate: (value: CliMenuInteractiveServerMenuTokenValidateValue) => {
                  const trimmedEmpty: CliMenuInteractiveServerMenuTrimmedEmpty = (value.trim() === '');
                  const startsWithTk: CliMenuInteractiveServerMenuStartsWithTk = value.startsWith('tk_');

                  if (trimmedEmpty === true) {
                    return true;
                  }

                  return startsWithTk || 'Token must start with tk_';
                },
              },
            ]);

            const editImport: CliMenuInteractiveServerMenuEditImport = await import('../commands/server.js');
            const updatesServerString: CliMenuInteractiveServerMenuUpdatesServerString = updates['server'];
            const serverUrlTrimmed: CliMenuInteractiveServerMenuServerUrlTrimmed = updatesServerString.trim();
            const serverUrl: CliMenuInteractiveServerMenuServerUrl = (serverUrlTrimmed !== '') ? updatesServerString : undefined;
            const updatesTokenString: CliMenuInteractiveServerMenuUpdatesTokenString = updates['token'];
            const tokenTrimmed: CliMenuInteractiveServerMenuTokenTrimmed = updatesTokenString.trim();
            const tokenValue: CliMenuInteractiveServerMenuTokenValue = (tokenTrimmed !== '') ? updatesTokenString : undefined;

            if (serverUrl !== undefined || tokenValue !== undefined) {
              const editUpdates: CliMenuInteractiveServerMenuEditUpdates = {};

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
        const errorMessage: CliMenuInteractiveServerMenuErrorMessage = (error instanceof Error) ? error['message'] : String(error);

        Logger.error(`Error: ${errorMessage}`);
      }
    } else if (action === 'remove') {
      try {
        const servers: CliMenuInteractiveServerMenuServers = listServers(configPath);

        servers.sort((a, b) => a['name'].localeCompare(b['name']));

        if (servers['length'] === 0) {
          Logger.warn('No servers to remove.');
        } else {
          const selectResponse: CliMenuInteractiveServerMenuSelectResponse = await prompts({
            type: 'select',
            name: 'name',
            message: 'Select server to remove:',
            choices: servers.map((server) => ({
              title: server['name'], value: server['name'],
            })),
          });

          const name: CliMenuInteractiveServerMenuName = selectResponse['name'];

          if (name !== undefined) {
            const confirmResponse: CliMenuInteractiveServerMenuConfirmResponse = await prompts({
              type: 'confirm',
              name: 'confirmed',
              message: chalk.yellow(`Remove "${name}"?`),
              initial: false,
            });

            const confirmed: CliMenuInteractiveServerMenuConfirmed = confirmResponse['confirmed'];

            if (confirmed === true) {
              removeServer(configPath, name);

              Logger.info(`Server "${name}" removed.`);
            }
          }
        }
      } catch (error) {
        const errorMessage: CliMenuInteractiveServerMenuErrorMessage = (error instanceof Error) ? error['message'] : String(error);

        Logger.error(`Error: ${errorMessage}`);
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
async function contextMenu(configPath: CliMenuInteractiveContextMenuConfigPath): CliMenuInteractiveContextMenuReturn {
  let inMenu: CliMenuInteractiveContextMenuInMenu = true;

  while (inMenu === true) {
    const response: CliMenuInteractiveContextMenuResponse = await prompts({
      type: 'select',
      name: 'action',
      message: chalk.cyan('Manage Contexts'),
      choices: [
        {
          title: 'Add', value: 'add',
        },
        {
          title: 'Edit', value: 'edit',
        },
        {
          title: 'Remove', value: 'remove',
        },
        {
          title: 'Back', value: 'back',
        },
      ],
    });

    const action: CliMenuInteractiveContextMenuAction = response['action'];

    if (action === undefined || action === 'back') {
      inMenu = false;

      break;
    }

    if (action === 'add') {
      try {
        const servers: CliMenuInteractiveContextMenuServers = listServers(configPath);

        if (servers['length'] === 0) {
          Logger.warn('Add a server first.');
        } else {
          await addContextFlow(configPath, servers);
        }
      } catch (error) {
        const errorMessage: CliMenuInteractiveContextMenuErrorMessage = (error instanceof Error) ? error['message'] : String(error);

        Logger.error(`Error: ${errorMessage}`);
      }
    } else if (action === 'edit') {
      try {
        const contexts: CliMenuInteractiveContextMenuContexts = listContexts(configPath);

        contexts.sort((a, b) => a['name'].localeCompare(b['name']));

        if (contexts['length'] === 0) {
          Logger.warn('No contexts to edit.');
        } else {
          const selectResponse: CliMenuInteractiveContextMenuSelectResponse = await prompts({
            type: 'select',
            name: 'name',
            message: 'Select context to edit:',
            choices: contexts.map((context) => ({
              title: context['name'], value: context['name'],
            })),
          });

          const name: CliMenuInteractiveContextMenuName = selectResponse['name'];

          if (name !== undefined) {
            const current: CliMenuInteractiveContextMenuCurrent = contexts.find((context) => context['name'] === name);

            if (current !== undefined) {
              const servers: CliMenuInteractiveContextMenuServers = listServers(configPath);
              const serverChoices: CliMenuInteractiveContextMenuServerChoices = servers.map((server) => ({
                title: server['name'], value: server['name'],
              }));

              const keepIdResponse: CliMenuInteractiveContextMenuKeepIdResponse = await prompts({
                type: 'confirm',
                name: 'keepId',
                message: `Keep current ID (${current['id']})?`,
                initial: true,
              });

              const keepId: CliMenuInteractiveContextMenuKeepId = keepIdResponse['keepId'];

              let id: CliMenuInteractiveContextMenuId = undefined;

              if (keepId === false) {
                id = generateId();

                Logger.info(`  New ID: ${id}`);
              }

              const httpChoices: CliMenuInteractiveContextMenuHttpChoices = [
                {
                  title: 'Plain Text', value: 'plain-text',
                },
                {
                  title: 'ntfy JSON', value: 'ntfy-json',
                },
                {
                  title: 'Seerr', value: 'seerr',
                },
                {
                  title: 'Synology DSM', value: 'synology',
                },
                {
                  title: 'Statuspage.io', value: 'statuspage',
                },
              ];
              const emailChoices: CliMenuInteractiveContextMenuEmailChoices = [
                {
                  title: 'Plain Text', value: 'plain-text',
                },
                {
                  title: 'pfSense', value: 'pfsense',
                },
                {
                  title: 'UniFi', value: 'unifi',
                },
              ];
              const knownChoices: CliMenuInteractiveContextMenuKnownChoices = (current['type'] === 'http') ? httpChoices : emailChoices;
              const exists: CliMenuInteractiveContextMenuExists = knownChoices.some((c) => c['value'] === current['interpreter']);

              if (exists === false) {
                knownChoices.unshift({
                  title: `${current['interpreter']} (current, unknown)`, value: current['interpreter'],
                });
              }

              const httpValues: CliMenuInteractiveContextMenuKnownValues = [
                'plain-text',
                'ntfy-json',
                'seerr',
                'synology',
                'statuspage',
              ];
              const emailValues: CliMenuInteractiveContextMenuKnownValues = [
                'plain-text',
                'pfsense',
                'unifi',
              ];
              const knownValues: CliMenuInteractiveContextMenuKnownValues = (current['type'] === 'http') ? httpValues : emailValues;
              const interpreterIdx: CliMenuInteractiveContextMenuIdx = knownValues.indexOf(current['interpreter']);
              const interpreterInitial: CliMenuInteractiveContextMenuIdx = (interpreterIdx >= 0) ? interpreterIdx : 0;

              const interpreterResponse: CliMenuInteractiveContextMenuInterpreterResponse = await prompts({
                type: 'select',
                name: 'interpreter',
                message: 'Interpreter:',
                choices: knownChoices,
                initial: interpreterInitial,
              });

              const interpreter: CliMenuInteractiveContextMenuInterpreter = interpreterResponse['interpreter'];

              const topicResponse: CliMenuInteractiveContextMenuTopicResponse = await prompts({
                type: 'text',
                name: 'topic',
                message: 'ntfy topic:',
                initial: current['topic'],
                validate: (value: CliMenuInteractiveContextMenuTopicValidateValue) => value.trim()['length'] > 0 || 'Topic is required',
              });

              const topic: CliMenuInteractiveContextMenuTopic = topicResponse['topic'];

              const currentErrorTopic: CliMenuInteractiveContextMenuErrorTopic = (current['error_topic'] !== undefined) ? current['error_topic'] : '';

              const errorTopicResponse: CliMenuInteractiveContextMenuErrorTopicResponse = await prompts({
                type: 'text',
                name: 'error_topic',
                message: 'ntfy error topic (blank to skip):',
                initial: currentErrorTopic,
              });

              const errorTopic: CliMenuInteractiveContextMenuErrorTopic = errorTopicResponse['error_topic'];

              const modeInitial: CliMenuInteractiveContextMenuIdx = (current['mode'] === 'send-all') ? 1 : 0;

              const modeResponse: CliMenuInteractiveContextMenuModeResponse = await prompts({
                type: 'select',
                name: 'mode',
                message: 'Mode:',
                choices: [
                  {
                    title: 'Send to one server only', value: 'send-once',
                  },
                  {
                    title: 'Send to all servers', value: 'send-all',
                  },
                ],
                initial: modeInitial,
              });

              const mode: CliMenuInteractiveContextMenuMode = modeResponse['mode'];

              const showVisitorInfoResponse: CliMenuInteractiveContextMenuShowVisitorInfoResponse = await prompts({
                type: 'confirm',
                name: 'show_visitor_info',
                message: 'Show visitor info?',
                initial: current['show_visitor_info'],
              });

              const showVisitorInfo: CliMenuInteractiveContextMenuShowVisitorInfo = showVisitorInfoResponse['show_visitor_info'];

              const primaryServerIdx: CliMenuInteractiveContextMenuPrimaryServerIdx = serverChoices.findIndex((s) => s['value'] === current['primary_server']);

              if (primaryServerIdx < 0) {
                serverChoices.unshift({
                  title: `${current['primary_server']} (current, not found)`, value: current['primary_server'],
                });
              }

              const primaryServerInitial: CliMenuInteractiveContextMenuPrimaryServerIdx = (primaryServerIdx >= 0) ? primaryServerIdx : 0;

              const primaryServerResponse: CliMenuInteractiveContextMenuPrimaryServerResponse = await prompts({
                type: 'select',
                name: 'primary_server',
                message: 'Primary server:',
                choices: serverChoices,
                initial: primaryServerInitial,
              });

              const primaryServer: CliMenuInteractiveContextMenuPrimaryServer = primaryServerResponse['primary_server'];

              const selectedServersResponse: CliMenuInteractiveContextMenuSelectedServersResponse = await prompts({
                type: 'multiselect',
                name: 'selectedServers',
                message: 'All servers (space to select):',
                choices: serverChoices.map((s) => ({
                  ...s,
                  selected: current['servers'].includes(s['value']),
                })),
              });

              const selectedServers: CliMenuInteractiveContextMenuSelectedServers = selectedServersResponse['selectedServers'];

              const updates: CliMenuInteractiveContextMenuUpdates = {};

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

              const errorTopicValue: CliMenuInteractiveContextMenuErrorTopicValue = errorTopic;
              const errorTopicTrimmed: CliMenuInteractiveContextMenuErrorTopicTrimmed = (errorTopicValue !== undefined) ? errorTopicValue.trim() : '';
              const resolvedErrorTopic: CliMenuInteractiveContextMenuErrorTopic = (errorTopicTrimmed !== '') ? errorTopicTrimmed : undefined;

              Reflect.set(updates, 'error_topic', resolvedErrorTopic);

              if (current['type'] === 'http' && current['token'] !== undefined) {
                const keepTokenResponse: CliMenuInteractiveContextMenuKeepTokenResponse = await prompts({
                  type: 'confirm',
                  name: 'keepToken',
                  message: 'Keep current auth token?',
                  initial: true,
                });

                const keepToken: CliMenuInteractiveContextMenuKeepToken = keepTokenResponse['keepToken'];

                if (keepToken === false) {
                  const newToken: CliMenuInteractiveContextMenuNewToken = generateToken();

                  Reflect.set(updates, 'token', newToken);

                  Logger.info(`  New token: ${newToken}`);
                }
              } else if (current['type'] === 'http' && current['token'] === undefined) {
                const addTokenResponse: CliMenuInteractiveContextMenuAddTokenResponse = await prompts({
                  type: 'confirm',
                  name: 'addToken',
                  message: 'Add auth token?',
                  initial: false,
                });

                const addToken: CliMenuInteractiveContextMenuAddToken = addTokenResponse['addToken'];

                if (addToken === true) {
                  const newToken: CliMenuInteractiveContextMenuNewToken = generateToken();

                  Reflect.set(updates, 'token', newToken);

                  Logger.info(`  New token: ${newToken}`);
                }
              } else if (current['type'] === 'email') {
                const currentAllowedFrom: CliMenuInteractiveContextMenuAllowedFrom = (current['allowed_from'] !== undefined) ? current['allowed_from'] : '';

                const allowedFromResponse: CliMenuInteractiveContextMenuAllowedFromResponse = await prompts({
                  type: 'text',
                  name: 'allowed_from',
                  message: 'Allowed from email (blank to clear):',
                  initial: currentAllowedFrom,
                });

                const allowedFrom: CliMenuInteractiveContextMenuAllowedFrom = allowedFromResponse['allowed_from'];
                const allowedFromTrimmed: CliMenuInteractiveContextMenuAllowedFromTrimmed = (allowedFrom !== undefined) ? allowedFrom.trim() : '';
                const resolvedAllowedFrom: CliMenuInteractiveContextMenuAllowedFrom = (allowedFromTrimmed !== '') ? allowedFromTrimmed : undefined;

                Reflect.set(updates, 'allowed_from', resolvedAllowedFrom);
              }

              const editImport: CliMenuInteractiveContextMenuEditImport = await import('../commands/context.js');

              editImport.editContext(configPath, name, updates);

              Logger.info(`Context "${name}" updated.`);
            }
          }
        }
      } catch (error) {
        const errorMessage: CliMenuInteractiveContextMenuErrorMessage = (error instanceof Error) ? error['message'] : String(error);

        Logger.error(`Error: ${errorMessage}`);
      }
    } else if (action === 'remove') {
      try {
        const contexts: CliMenuInteractiveContextMenuContexts = listContexts(configPath);

        contexts.sort((a, b) => a['name'].localeCompare(b['name']));

        if (contexts['length'] === 0) {
          Logger.warn('No contexts to remove.');
        } else {
          const selectResponse: CliMenuInteractiveContextMenuSelectResponse = await prompts({
            type: 'select',
            name: 'name',
            message: 'Select context to remove:',
            choices: contexts.map((context) => ({
              title: context['name'], value: context['name'],
            })),
          });

          const name: CliMenuInteractiveContextMenuName = selectResponse['name'];

          if (name !== undefined) {
            const confirmResponse: CliMenuInteractiveContextMenuConfirmResponse = await prompts({
              type: 'confirm',
              name: 'confirmed',
              message: chalk.yellow(`Remove "${name}"?`),
              initial: false,
            });

            const confirmed: CliMenuInteractiveContextMenuConfirmed = confirmResponse['confirmed'];

            if (confirmed === true) {
              removeContext(configPath, name);

              Logger.info(`Context "${name}" removed.`);
            }
          }
        }
      } catch (error) {
        const errorMessage: CliMenuInteractiveContextMenuErrorMessage = (error instanceof Error) ? error['message'] : String(error);

        Logger.error(`Error: ${errorMessage}`);
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
async function addContextFlow(configPath: CliMenuInteractiveAddContextFlowConfigPath, servers: CliMenuInteractiveAddContextFlowServers): CliMenuInteractiveAddContextFlowReturn {
  const autoId: CliMenuInteractiveAddContextFlowAutoId = generateId();

  const typeResponse: CliMenuInteractiveAddContextFlowTypeResponse = await prompts({
    type: 'select',
    name: 'contextType',
    message: 'Context type:',
    choices: [
      {
        title: 'HTTP', value: 'http',
      },
      {
        title: 'Email', value: 'email',
      },
    ],
  });

  const contextType: CliMenuInteractiveAddContextFlowContextType = typeResponse['contextType'];

  if (contextType === undefined) {
    return;
  }

  const httpInterpreters: CliMenuInteractiveAddContextFlowHttpInterpreters = [
    {
      title: 'Plain Text', value: 'plain-text',
    },
    {
      title: 'ntfy JSON', value: 'ntfy-json',
    },
    {
      title: 'Seerr', value: 'seerr',
    },
    {
      title: 'Synology DSM', value: 'synology',
    },
    {
      title: 'Statuspage.io', value: 'statuspage',
    },
  ];

  const emailInterpreters: CliMenuInteractiveAddContextFlowEmailInterpreters = [
    {
      title: 'Plain Text', value: 'plain-text',
    },
    {
      title: 'pfSense', value: 'pfsense',
    },
    {
      title: 'UniFi', value: 'unifi',
    },
  ];

  const nameResponse: CliMenuInteractiveAddContextFlowNameResponse = await prompts({
    type: 'text',
    name: 'name',
    message: 'Context name:',
    validate: (value: CliMenuInteractiveAddContextFlowNameValidateValue) => value.trim()['length'] > 0 || 'Name is required',
  });

  const name: CliMenuInteractiveAddContextFlowName = nameResponse['name'];

  if (name === undefined) {
    return;
  }

  const idMessage: CliMenuInteractiveAddContextFlowIdMessage = (contextType === 'http') ? `ID (blank for auto: ${autoId}):` : 'ID (email local part, e.g. "pfsense"):';

  const idResponse: CliMenuInteractiveAddContextFlowIdResponse = await prompts({
    type: 'text',
    name: 'id',
    message: idMessage,
    validate: (value: CliMenuInteractiveAddContextFlowIdValidateValue) => {
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

  const rawId: CliMenuInteractiveAddContextFlowRawId = idResponse['id'];

  if (rawId === undefined) {
    return;
  }

  const interpreterChoices: CliMenuInteractiveAddContextFlowInterpreterChoices = (contextType === 'http') ? httpInterpreters : emailInterpreters;

  const interpreterResponse: CliMenuInteractiveAddContextFlowInterpreterResponse = await prompts({
    type: 'select',
    name: 'interpreter',
    message: 'Interpreter:',
    choices: interpreterChoices,
  });

  const interpreter: CliMenuInteractiveAddContextFlowInterpreter = interpreterResponse['interpreter'];

  if (interpreter === undefined) {
    return;
  }

  const topicResponse: CliMenuInteractiveAddContextFlowTopicResponse = await prompts({
    type: 'text',
    name: 'topic',
    message: 'ntfy topic:',
    validate: (value: CliMenuInteractiveAddContextFlowTopicValidateValue) => value.trim()['length'] > 0 || 'Topic is required',
  });

  const topic: CliMenuInteractiveAddContextFlowTopic = topicResponse['topic'];

  if (topic === undefined) {
    return;
  }

  const errorTopicResponse: CliMenuInteractiveAddContextFlowErrorTopicResponse = await prompts({
    type: 'text',
    name: 'error_topic',
    message: 'ntfy error topic (blank to skip):',
  });

  const errorTopic: CliMenuInteractiveAddContextFlowErrorTopic = errorTopicResponse['error_topic'];

  const modeResponse: CliMenuInteractiveAddContextFlowModeResponse = await prompts({
    type: 'select',
    name: 'mode',
    message: 'Mode:',
    choices: [
      {
        title: 'Send to one server only', value: 'send-once',
      },
      {
        title: 'Send to all servers', value: 'send-all',
      },
    ],
  });

  const mode: CliMenuInteractiveAddContextFlowMode = modeResponse['mode'];

  if (mode === undefined) {
    return;
  }

  const showVisitorInfoResponse: CliMenuInteractiveAddContextFlowShowVisitorInfoResponse = await prompts({
    type: 'confirm',
    name: 'show_visitor_info',
    message: 'Show visitor info?',
    initial: false,
  });

  const showVisitorInfo: CliMenuInteractiveAddContextFlowShowVisitorInfo = showVisitorInfoResponse['show_visitor_info'];

  if (showVisitorInfo === undefined) {
    return;
  }

  const primaryServerResponse: CliMenuInteractiveAddContextFlowPrimaryServerResponse = await prompts({
    type: 'select',
    name: 'primary_server',
    message: 'Primary server:',
    choices: servers.map((server) => ({
      title: server['name'], value: server['name'],
    })),
  });

  const primaryServer: CliMenuInteractiveAddContextFlowPrimaryServer = primaryServerResponse['primary_server'];

  if (primaryServer === undefined) {
    return;
  }

  const selectedServersResponse: CliMenuInteractiveAddContextFlowSelectedServersResponse = await prompts({
    type: 'multiselect',
    name: 'selectedServers',
    message: 'All servers for this context (space to select):',
    choices: servers.map((server) => ({
      title: server['name'], value: server['name'],
    })),
  });

  const selectedServers: CliMenuInteractiveAddContextFlowSelectedServers = selectedServersResponse['selectedServers'];

  if (selectedServers === undefined) {
    return;
  }

  const rawIdString: CliMenuInteractiveAddContextFlowRawIdString = rawId;
  const idTrimmed: CliMenuInteractiveAddContextFlowIdTrimmed = rawIdString.trim();
  const resolvedId: CliMenuInteractiveAddContextFlowResolvedId = (idTrimmed !== '') ? idTrimmed : autoId;

  const errorTopicString: CliMenuInteractiveAddContextFlowErrorTopicString = (errorTopic !== undefined) ? (errorTopic) : '';
  const errorTopicTrimmed: CliMenuInteractiveAddContextFlowErrorTopicTrimmed = errorTopicString.trim();
  const resolvedErrorTopic: CliMenuInteractiveAddContextFlowResolvedErrorTopic = (errorTopicTrimmed !== '') ? errorTopicTrimmed : undefined;

  const topicString: CliMenuInteractiveAddContextFlowTopicString = topic;
  const typedInterpreter: CliMenuInteractiveAddContextFlowTypedInterpreter = interpreter as CliMenuInteractiveAddContextFlowTypedInterpreter;
  const typedMode: CliMenuInteractiveAddContextFlowTypedMode = mode as CliMenuInteractiveAddContextFlowTypedMode;

  if (contextType === 'http') {
    const autoToken: CliMenuInteractiveAddContextFlowAutoToken = generateToken();

    const tokenResponse: CliMenuInteractiveAddContextFlowTokenResponse = await prompts({
      type: 'text',
      name: 'token',
      message: 'Auth token (blank to skip, enter to accept):',
      initial: autoToken,
    });

    const rawToken: CliMenuInteractiveAddContextFlowRawToken = tokenResponse['token'];
    const tokenTrimmed: CliMenuInteractiveAddContextFlowTokenTrimmed = (rawToken !== undefined) ? rawToken.trim() : '';
    const resolvedToken: CliMenuInteractiveAddContextFlowResolvedToken = (tokenTrimmed !== '') ? tokenTrimmed : undefined;

    addContext(configPath, {
      name,
      type: 'http',
      id: resolvedId,
      interpreter: typedInterpreter,
      topic: topicString,
      error_topic: resolvedErrorTopic,
      mode: typedMode,
      show_visitor_info: showVisitorInfo,
      primary_server: primaryServer,
      servers: selectedServers,
      token: resolvedToken,
    });
  } else {
    const allowedFromResponse: CliMenuInteractiveAddContextFlowAllowedFromResponse = await prompts({
      type: 'text',
      name: 'allowed_from',
      message: 'Allowed from email (blank to skip):',
    });

    const rawAllowedFrom: CliMenuInteractiveAddContextFlowRawAllowedFrom = allowedFromResponse['allowed_from'];
    const allowedFromTrimmed: CliMenuInteractiveAddContextFlowAllowedFromTrimmed = (rawAllowedFrom !== undefined) ? rawAllowedFrom.trim() : '';
    const resolvedAllowedFrom: CliMenuInteractiveAddContextFlowResolvedAllowedFrom = (allowedFromTrimmed !== '') ? allowedFromTrimmed : undefined;

    addContext(configPath, {
      name,
      type: 'email',
      id: resolvedId,
      interpreter: typedInterpreter,
      topic: topicString,
      error_topic: resolvedErrorTopic,
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
async function settingsFlow(configPath: CliMenuInteractiveSettingsFlowConfigPath): CliMenuInteractiveSettingsFlowReturn {
  let currentSettings: CliMenuInteractiveSettingsFlowCurrentSettings = undefined;

  try {
    currentSettings = getSettings(configPath);
  } catch (error) {
    const errorMessage: CliMenuInteractiveSettingsFlowErrorMessage = (error instanceof Error) ? error['message'] : String(error);

    Logger.error(`Error: ${errorMessage}`);

    return;
  }

  const workerNameResponse: CliMenuInteractiveSettingsFlowWorkerNameResponse = await prompts({
    type: 'text',
    name: 'worker_name',
    message: 'Worker name:',
    initial: currentSettings['worker_name'],
    validate: (value: CliMenuInteractiveSettingsFlowWorkerNameValidateValue) => value.trim()['length'] > 0 || 'Worker name is required',
  });

  const workerName: CliMenuInteractiveSettingsFlowWorkerName = workerNameResponse['worker_name'];

  if (workerName === undefined) {
    return;
  }

  const baseDomainResponse: CliMenuInteractiveSettingsFlowBaseDomainResponse = await prompts({
    type: 'text',
    name: 'base_domain',
    message: 'Base domain:',
    initial: currentSettings['base_domain'],
    validate: (value: CliMenuInteractiveSettingsFlowBaseDomainValidateValue) => value.trim()['length'] > 0 || 'Base domain is required',
  });

  const baseDomain: CliMenuInteractiveSettingsFlowBaseDomain = baseDomainResponse['base_domain'];

  if (baseDomain === undefined) {
    return;
  }

  const showResponseOutputResponse: CliMenuInteractiveSettingsFlowShowResponseOutputResponse = await prompts({
    type: 'confirm',
    name: 'show_response_output',
    message: 'Show response output (debug mode)?',
    initial: currentSettings['show_response_output'],
  });

  const showResponseOutput: CliMenuInteractiveSettingsFlowShowResponseOutput = showResponseOutputResponse['show_response_output'];

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
    const errorMessage: CliMenuInteractiveSettingsFlowErrorMessage = (error instanceof Error) ? error['message'] : String(error);

    Logger.error(`Error: ${errorMessage}`);
  }

  return;
}

export {
  interactiveMenu,
};

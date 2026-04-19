import { configSchema } from '../../lib/schema.js';
import { loadConfig, saveConfig } from './config-io.js';

import type {
  CliCommandsServerAddServerConfig,
  CliCommandsServerAddServerConfigPath,
  CliCommandsServerAddServerDuplicate,
  CliCommandsServerAddServerReturn,
  CliCommandsServerAddServerServer,
  CliCommandsServerEditServerConfig,
  CliCommandsServerEditServerConfigPath,
  CliCommandsServerEditServerIndex,
  CliCommandsServerEditServerMerged,
  CliCommandsServerEditServerName,
  CliCommandsServerEditServerReturn,
  CliCommandsServerEditServerUpdates,
  CliCommandsServerListServersConfigPath,
  CliCommandsServerListServersReturn,
  CliCommandsServerRemoveServerConfig,
  CliCommandsServerRemoveServerConfigPath,
  CliCommandsServerRemoveServerContextNames,
  CliCommandsServerRemoveServerFiltered,
  CliCommandsServerRemoveServerName,
  CliCommandsServerRemoveServerReferencedContexts,
  CliCommandsServerRemoveServerReturn,
} from '../../types/cli/commands/server.d.ts';

/**
 * CLI - Commands - Server - Add Server.
 *
 * Appends a new server entry to the configuration file after verifying
 * that no server with the same name already exists.
 *
 * @since 2.0.0
 */
function addServer(configPath: CliCommandsServerAddServerConfigPath, server: CliCommandsServerAddServerServer): CliCommandsServerAddServerReturn {
  const config: CliCommandsServerAddServerConfig = configSchema.parse(loadConfig(configPath));
  const duplicate: CliCommandsServerAddServerDuplicate = config['servers'].some((existingServer) => existingServer['name'] === server['name']);

  if (duplicate === true) {
    throw new Error(`Server with name "${server['name']}" already exists.`);
  }

  config['servers'].push(server);

  saveConfig(configPath, config);

  return;
}

/**
 * CLI - Commands - Server - List Servers.
 *
 * Loads the configuration file and returns the full list of server
 * entries so callers can display or inspect them.
 *
 * @since 2.0.0
 */
function listServers(configPath: CliCommandsServerListServersConfigPath): CliCommandsServerListServersReturn {
  return configSchema.parse(loadConfig(configPath))['servers'];
}

/**
 * CLI - Commands - Server - Edit Server.
 *
 * Locates an existing server by name and merges the provided updates
 * into its configuration, then persists the result.
 *
 * @since 2.0.0
 */
function editServer(configPath: CliCommandsServerEditServerConfigPath, name: CliCommandsServerEditServerName, updates: CliCommandsServerEditServerUpdates): CliCommandsServerEditServerReturn {
  const config: CliCommandsServerEditServerConfig = configSchema.parse(loadConfig(configPath));
  const index: CliCommandsServerEditServerIndex = config['servers'].findIndex((server) => server['name'] === name);

  if (index === -1) {
    throw new Error(`Server with name "${name}" not found.`);
  }

  const merged: CliCommandsServerEditServerMerged = {
    ...config['servers'][index],
    ...updates,
  } as CliCommandsServerEditServerMerged;

  Reflect.set(config['servers'], index, merged);

  saveConfig(configPath, config);

  return;
}

/**
 * CLI - Commands - Server - Remove Server.
 *
 * Checks that no context references the server before filtering it
 * out of the configuration and saving the result.
 *
 * @since 2.0.0
 */
function removeServer(configPath: CliCommandsServerRemoveServerConfigPath, name: CliCommandsServerRemoveServerName): CliCommandsServerRemoveServerReturn {
  const config: CliCommandsServerRemoveServerConfig = configSchema.parse(loadConfig(configPath));
  const referencedContexts: CliCommandsServerRemoveServerReferencedContexts = config['contexts'].filter(
    (context) => context['primary_server'] === name || context['servers'].includes(name),
  );

  if (referencedContexts['length'] > 0) {
    const contextNames: CliCommandsServerRemoveServerContextNames = referencedContexts.map((context) => context['name']).join(', ');

    throw new Error(`Server "${name}" is referenced by the following contexts: ${contextNames}.`);
  }

  const filtered: CliCommandsServerRemoveServerFiltered = config['servers'].filter((server) => server['name'] !== name);

  Reflect.set(config, 'servers', filtered);

  saveConfig(configPath, config);

  return;
}

export {
  addServer,
  editServer,
  listServers,
  removeServer,
};

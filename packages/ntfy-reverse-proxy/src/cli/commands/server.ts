import { configSchema } from '../../lib/schema.js';
import { loadConfig, saveConfig } from './config-io.js';

import type {
  Cli_Commands_Server_AddServer_Config,
  Cli_Commands_Server_AddServer_ConfigPath,
  Cli_Commands_Server_AddServer_Duplicate,
  Cli_Commands_Server_AddServer_Returns,
  Cli_Commands_Server_AddServer_Server,
  Cli_Commands_Server_EditServer_Config,
  Cli_Commands_Server_EditServer_ConfigPath,
  Cli_Commands_Server_EditServer_Index,
  Cli_Commands_Server_EditServer_Merged,
  Cli_Commands_Server_EditServer_Name,
  Cli_Commands_Server_EditServer_Returns,
  Cli_Commands_Server_EditServer_Updates,
  Cli_Commands_Server_ListServers_ConfigPath,
  Cli_Commands_Server_ListServers_Returns,
  Cli_Commands_Server_RemoveServer_Config,
  Cli_Commands_Server_RemoveServer_ConfigPath,
  Cli_Commands_Server_RemoveServer_ContextNames,
  Cli_Commands_Server_RemoveServer_Filtered,
  Cli_Commands_Server_RemoveServer_Name,
  Cli_Commands_Server_RemoveServer_ReferencedContexts,
  Cli_Commands_Server_RemoveServer_Returns,
} from '../../types/cli/commands/server.d.ts';

/**
 * CLI - Commands - Server - Add Server.
 *
 * Appends a new server entry to the configuration file after verifying
 * that no server with the same name already exists.
 *
 * @since 2.0.0
 */
function addServer(configPath: Cli_Commands_Server_AddServer_ConfigPath, server: Cli_Commands_Server_AddServer_Server): Cli_Commands_Server_AddServer_Returns {
  const config: Cli_Commands_Server_AddServer_Config = configSchema.parse(loadConfig(configPath));
  const duplicate: Cli_Commands_Server_AddServer_Duplicate = config['servers'].some((existingServer) => existingServer['name'] === server['name']);

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
function listServers(configPath: Cli_Commands_Server_ListServers_ConfigPath): Cli_Commands_Server_ListServers_Returns {
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
function editServer(configPath: Cli_Commands_Server_EditServer_ConfigPath, name: Cli_Commands_Server_EditServer_Name, updates: Cli_Commands_Server_EditServer_Updates): Cli_Commands_Server_EditServer_Returns {
  const config: Cli_Commands_Server_EditServer_Config = configSchema.parse(loadConfig(configPath));
  const index: Cli_Commands_Server_EditServer_Index = config['servers'].findIndex((server) => server['name'] === name);

  if (index === -1) {
    throw new Error(`Server with name "${name}" not found.`);
  }

  const merged: Cli_Commands_Server_EditServer_Merged = {
    ...config['servers'][index],
    ...updates,
  } as Cli_Commands_Server_EditServer_Merged;

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
function removeServer(configPath: Cli_Commands_Server_RemoveServer_ConfigPath, name: Cli_Commands_Server_RemoveServer_Name): Cli_Commands_Server_RemoveServer_Returns {
  const config: Cli_Commands_Server_RemoveServer_Config = configSchema.parse(loadConfig(configPath));
  const referencedContexts: Cli_Commands_Server_RemoveServer_ReferencedContexts = config['contexts'].filter(
    (context) => context['primary_server'] === name || context['servers'].includes(name),
  );

  if (referencedContexts['length'] > 0) {
    const contextNames: Cli_Commands_Server_RemoveServer_ContextNames = referencedContexts.map((context) => context['name']).join(', ');

    throw new Error(`Server "${name}" is referenced by the following contexts: ${contextNames}.`);
  }

  const filtered: Cli_Commands_Server_RemoveServer_Filtered = config['servers'].filter((server) => server['name'] !== name);

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

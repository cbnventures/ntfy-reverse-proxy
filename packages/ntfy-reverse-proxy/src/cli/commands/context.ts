import { randomBytes } from 'node:crypto';

import { LIB_REGEX_NON_ALPHANUMERIC } from '../../lib/regex.js';
import { configSchema } from '../../lib/schema.js';
import { loadConfig, saveConfig } from './config-io.js';

import type {
  Cli_Commands_Context_AddContext_Config,
  Cli_Commands_Context_AddContext_ConfigPath,
  Cli_Commands_Context_AddContext_Context,
  Cli_Commands_Context_AddContext_CurrentContext,
  Cli_Commands_Context_AddContext_DuplicateName,
  Cli_Commands_Context_AddContext_ExistingIds,
  Cli_Commands_Context_AddContext_MissingServer,
  Cli_Commands_Context_AddContext_NewId,
  Cli_Commands_Context_AddContext_Ordered,
  Cli_Commands_Context_AddContext_Returns,
  Cli_Commands_Context_AddContext_ServerNames,
  Cli_Commands_Context_EditContext_Config,
  Cli_Commands_Context_EditContext_ConfigPath,
  Cli_Commands_Context_EditContext_ExistingIds,
  Cli_Commands_Context_EditContext_Index,
  Cli_Commands_Context_EditContext_Merged,
  Cli_Commands_Context_EditContext_Name,
  Cli_Commands_Context_EditContext_NewId,
  Cli_Commands_Context_EditContext_Ordered,
  Cli_Commands_Context_EditContext_Returns,
  Cli_Commands_Context_EditContext_UpdatedUpdates,
  Cli_Commands_Context_EditContext_Updates,
  Cli_Commands_Context_GenerateId_Returns,
  Cli_Commands_Context_GenerateRandomString_Chunk,
  Cli_Commands_Context_GenerateRandomString_Length,
  Cli_Commands_Context_GenerateRandomString_Lowercase,
  Cli_Commands_Context_GenerateRandomString_Result,
  Cli_Commands_Context_GenerateRandomString_Returns,
  Cli_Commands_Context_GenerateToken_Returns,
  Cli_Commands_Context_ListContexts_ConfigPath,
  Cli_Commands_Context_ListContexts_Returns,
  Cli_Commands_Context_OrderContextKeys_Context,
  Cli_Commands_Context_OrderContextKeys_Id,
  Cli_Commands_Context_OrderContextKeys_Name,
  Cli_Commands_Context_OrderContextKeys_Rest,
  Cli_Commands_Context_OrderContextKeys_Returns,
  Cli_Commands_Context_OrderContextKeys_Type,
  Cli_Commands_Context_RemoveContext_Config,
  Cli_Commands_Context_RemoveContext_ConfigPath,
  Cli_Commands_Context_RemoveContext_Filtered,
  Cli_Commands_Context_RemoveContext_Name,
  Cli_Commands_Context_RemoveContext_Returns,
} from '../../types/cli/commands/context.d.ts';

/**
 * CLI - Commands - Context - Add Context.
 *
 * Registers a new context entry in the configuration after checking
 * for duplicate names and validating server references.
 *
 * @since 2.0.0
 */
function addContext(configPath: Cli_Commands_Context_AddContext_ConfigPath, context: Cli_Commands_Context_AddContext_Context): Cli_Commands_Context_AddContext_Returns {
  const config: Cli_Commands_Context_AddContext_Config = configSchema.parse(loadConfig(configPath));
  const duplicateName: Cli_Commands_Context_AddContext_DuplicateName = config['contexts'].some((existingContext) => existingContext['name'] === context['name']);

  if (duplicateName === true) {
    throw new Error(`Context with name "${context['name']}" already exists.`);
  }

  let currentContext: Cli_Commands_Context_AddContext_CurrentContext = context;
  const existingIds: Cli_Commands_Context_AddContext_ExistingIds = new Set(config['contexts'].map((existingContext) => existingContext['id']));

  if (existingIds.has(currentContext['id']) === true) {
    let newId: Cli_Commands_Context_AddContext_NewId = generateId();

    while (existingIds.has(newId) === true) {
      newId = generateId();
    }

    currentContext = {
      ...currentContext,
      id: newId,
    };
  }

  const serverNames: Cli_Commands_Context_AddContext_ServerNames = config['servers'].map((server) => server['name']);
  const missingServer: Cli_Commands_Context_AddContext_MissingServer = currentContext['servers'].find((serverName) => serverNames.includes(serverName) === false);

  if (missingServer !== undefined) {
    throw new Error(`Server "${missingServer}" does not exist.`);
  }

  if (serverNames.includes(currentContext['primary_server']) === false) {
    throw new Error(`Server "${currentContext['primary_server']}" does not exist.`);
  }

  const ordered: Cli_Commands_Context_AddContext_Ordered = orderContextKeys(currentContext);

  config['contexts'].push(ordered);

  saveConfig(configPath, config);

  return;
}

/**
 * CLI - Commands - Context - List Contexts.
 *
 * Loads the configuration file and returns the full list of context
 * entries so callers can display or inspect them.
 *
 * @since 2.0.0
 */
function listContexts(configPath: Cli_Commands_Context_ListContexts_ConfigPath): Cli_Commands_Context_ListContexts_Returns {
  return configSchema.parse(loadConfig(configPath))['contexts'];
}

/**
 * CLI - Commands - Context - Edit Context.
 *
 * Locates an existing context by name and merges the provided updates
 * into its configuration, then persists the result.
 *
 * @since 2.0.0
 */
function editContext(configPath: Cli_Commands_Context_EditContext_ConfigPath, name: Cli_Commands_Context_EditContext_Name, updates: Cli_Commands_Context_EditContext_Updates): Cli_Commands_Context_EditContext_Returns {
  const config: Cli_Commands_Context_EditContext_Config = configSchema.parse(loadConfig(configPath));
  const index: Cli_Commands_Context_EditContext_Index = config['contexts'].findIndex((context) => context['name'] === name);

  if (index === -1) {
    throw new Error(`Context with name "${name}" not found.`);
  }

  let updatedUpdates: Cli_Commands_Context_EditContext_UpdatedUpdates = updates;

  if (updatedUpdates['id'] !== undefined) {
    let newId: Cli_Commands_Context_EditContext_NewId = updatedUpdates['id'];
    const existingIds: Cli_Commands_Context_EditContext_ExistingIds = new Set(
      config['contexts'].filter((_context, i) => i !== index).map((context) => context['id']),
    );

    if (existingIds.has(newId) === true) {
      newId = generateId();

      while (existingIds.has(newId) === true) {
        newId = generateId();
      }
    }

    updatedUpdates = {
      ...updatedUpdates,
      id: newId,
    };
  }

  const merged: Cli_Commands_Context_EditContext_Merged = {
    ...config['contexts'][index],
    ...updatedUpdates,
  } as Cli_Commands_Context_EditContext_Merged;

  const ordered: Cli_Commands_Context_EditContext_Ordered = orderContextKeys(merged);

  Reflect.set(config['contexts'], index, ordered);

  saveConfig(configPath, config);

  return;
}

/**
 * CLI - Commands - Context - Remove Context.
 *
 * Filters a named context out of the configuration and saves the
 * result so the context is no longer available.
 *
 * @since 2.0.0
 */
function removeContext(configPath: Cli_Commands_Context_RemoveContext_ConfigPath, name: Cli_Commands_Context_RemoveContext_Name): Cli_Commands_Context_RemoveContext_Returns {
  const config: Cli_Commands_Context_RemoveContext_Config = configSchema.parse(loadConfig(configPath));
  const filtered: Cli_Commands_Context_RemoveContext_Filtered = config['contexts'].filter((context) => context['name'] !== name);

  Reflect.set(config, 'contexts', filtered);

  saveConfig(configPath, config);

  return;
}

/**
 * CLI - Commands - Context - Order Context Keys.
 *
 * Rebuilds a context object with type, name, and id placed first so
 * that the serialized output matches the interactive UI prompt order.
 *
 * @since 2.0.0
 */
function orderContextKeys(context: Cli_Commands_Context_OrderContextKeys_Context): Cli_Commands_Context_OrderContextKeys_Returns {
  const type: Cli_Commands_Context_OrderContextKeys_Type = context['type'];
  const name: Cli_Commands_Context_OrderContextKeys_Name = context['name'];
  const id: Cli_Commands_Context_OrderContextKeys_Id = context['id'];
  const rest: Cli_Commands_Context_OrderContextKeys_Rest = {
    ...context,
  };

  Reflect.deleteProperty(rest, 'type');
  Reflect.deleteProperty(rest, 'name');
  Reflect.deleteProperty(rest, 'id');

  return {
    type,
    name,
    id,
    ...rest,
  } as Cli_Commands_Context_OrderContextKeys_Returns;
}

/**
 * CLI - Commands - Context - Generate Random String.
 *
 * Produces a random alphanumeric string of the requested length using
 * cryptographic random bytes for unpredictability.
 *
 * @since 2.0.0
 */
function generateRandomString(length: Cli_Commands_Context_GenerateRandomString_Length, lowercase: Cli_Commands_Context_GenerateRandomString_Lowercase = false): Cli_Commands_Context_GenerateRandomString_Returns {
  let result: Cli_Commands_Context_GenerateRandomString_Result = '';

  while (result['length'] < length) {
    const chunk: Cli_Commands_Context_GenerateRandomString_Chunk = randomBytes(48).toString('base64').replace(new RegExp(LIB_REGEX_NON_ALPHANUMERIC, 'g'), '');

    result += (lowercase === true) ? chunk.toLowerCase() : chunk;
  }

  return result.slice(0, length);
}

/**
 * CLI - Commands - Context - Generate ID.
 *
 * Creates a short lowercase identifier used to uniquely distinguish
 * each context entry within the configuration.
 *
 * @since 2.0.0
 */
function generateId(): Cli_Commands_Context_GenerateId_Returns {
  return generateRandomString(20, true);
}

/**
 * CLI - Commands - Context - Generate Token.
 *
 * Creates a long mixed-case token used for authenticating incoming
 * HTTP requests against a specific context.
 *
 * @since 2.0.0
 */
function generateToken(): Cli_Commands_Context_GenerateToken_Returns {
  return generateRandomString(64);
}

export {
  addContext,
  editContext,
  generateId,
  generateToken,
  listContexts,
  removeContext,
};

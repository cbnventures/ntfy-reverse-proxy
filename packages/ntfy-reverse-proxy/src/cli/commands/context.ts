import { randomBytes } from 'crypto';

import { LIB_REGEX_NON_ALPHANUMERIC } from '../../lib/regex.js';
import { configSchema } from '../../lib/schema.js';
import { loadConfig, saveConfig } from './config-io.js';

import type {
  CliCommandsContextAddContextConfig,
  CliCommandsContextAddContextConfigPath,
  CliCommandsContextAddContextContext,
  CliCommandsContextAddContextCurrentContext,
  CliCommandsContextAddContextDuplicateName,
  CliCommandsContextAddContextExistingIds,
  CliCommandsContextAddContextMissingServer,
  CliCommandsContextAddContextNewId,
  CliCommandsContextAddContextOrdered,
  CliCommandsContextAddContextReturn,
  CliCommandsContextAddContextServerNames,
  CliCommandsContextEditContextConfig,
  CliCommandsContextEditContextConfigPath,
  CliCommandsContextEditContextExistingIds,
  CliCommandsContextEditContextIndex,
  CliCommandsContextEditContextMerged,
  CliCommandsContextEditContextName,
  CliCommandsContextEditContextNewId,
  CliCommandsContextEditContextOrdered,
  CliCommandsContextEditContextReturn,
  CliCommandsContextEditContextUpdatedUpdates,
  CliCommandsContextEditContextUpdates,
  CliCommandsContextGenerateIdReturn,
  CliCommandsContextGenerateRandomStringChunk,
  CliCommandsContextGenerateRandomStringLength,
  CliCommandsContextGenerateRandomStringLowercase,
  CliCommandsContextGenerateRandomStringResult,
  CliCommandsContextGenerateRandomStringReturn,
  CliCommandsContextGenerateTokenReturn,
  CliCommandsContextListContextsConfigPath,
  CliCommandsContextListContextsReturn,
  CliCommandsContextOrderContextKeysContext,
  CliCommandsContextOrderContextKeysId,
  CliCommandsContextOrderContextKeysName,
  CliCommandsContextOrderContextKeysRest,
  CliCommandsContextOrderContextKeysReturn,
  CliCommandsContextOrderContextKeysType,
  CliCommandsContextRemoveContextConfig,
  CliCommandsContextRemoveContextConfigPath,
  CliCommandsContextRemoveContextFiltered,
  CliCommandsContextRemoveContextName,
  CliCommandsContextRemoveContextReturn,
} from '../../types/cli/commands/context.d.ts';

/**
 * CLI - Commands - Context - Add Context.
 *
 * Registers a new context entry in the configuration after checking
 * for duplicate names and validating server references.
 *
 * @since 2.0.0
 */
function addContext(configPath: CliCommandsContextAddContextConfigPath, context: CliCommandsContextAddContextContext): CliCommandsContextAddContextReturn {
  const config: CliCommandsContextAddContextConfig = configSchema.parse(loadConfig(configPath));
  const duplicateName: CliCommandsContextAddContextDuplicateName = config['contexts'].some((existingContext) => existingContext['name'] === context['name']);

  if (duplicateName === true) {
    throw new Error(`Context with name "${context['name']}" already exists.`);
  }

  let currentContext: CliCommandsContextAddContextCurrentContext = context;
  const existingIds: CliCommandsContextAddContextExistingIds = new Set(config['contexts'].map((existingContext) => existingContext['id']));

  if (existingIds.has(currentContext['id']) === true) {
    let newId: CliCommandsContextAddContextNewId = generateId();

    while (existingIds.has(newId) === true) {
      newId = generateId();
    }

    currentContext = {
      ...currentContext,
      id: newId,
    };
  }

  const serverNames: CliCommandsContextAddContextServerNames = config['servers'].map((server) => server['name']);
  const missingServer: CliCommandsContextAddContextMissingServer = currentContext['servers'].find((serverName) => serverNames.includes(serverName) === false);

  if (missingServer !== undefined) {
    throw new Error(`Server "${missingServer}" does not exist.`);
  }

  if (serverNames.includes(currentContext['primary_server']) === false) {
    throw new Error(`Server "${currentContext['primary_server']}" does not exist.`);
  }

  const ordered: CliCommandsContextAddContextOrdered = orderContextKeys(currentContext);

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
function listContexts(configPath: CliCommandsContextListContextsConfigPath): CliCommandsContextListContextsReturn {
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
function editContext(configPath: CliCommandsContextEditContextConfigPath, name: CliCommandsContextEditContextName, updates: CliCommandsContextEditContextUpdates): CliCommandsContextEditContextReturn {
  const config: CliCommandsContextEditContextConfig = configSchema.parse(loadConfig(configPath));
  const index: CliCommandsContextEditContextIndex = config['contexts'].findIndex((context) => context['name'] === name);

  if (index === -1) {
    throw new Error(`Context with name "${name}" not found.`);
  }

  let updatedUpdates: CliCommandsContextEditContextUpdatedUpdates = updates;

  if (updatedUpdates['id'] !== undefined) {
    let newId: CliCommandsContextEditContextNewId = updatedUpdates['id'];
    const existingIds: CliCommandsContextEditContextExistingIds = new Set(
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

  const merged: CliCommandsContextEditContextMerged = {
    ...config['contexts'][index],
    ...updatedUpdates,
  } as CliCommandsContextEditContextMerged;

  const ordered: CliCommandsContextEditContextOrdered = orderContextKeys(merged);

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
function removeContext(configPath: CliCommandsContextRemoveContextConfigPath, name: CliCommandsContextRemoveContextName): CliCommandsContextRemoveContextReturn {
  const config: CliCommandsContextRemoveContextConfig = configSchema.parse(loadConfig(configPath));
  const filtered: CliCommandsContextRemoveContextFiltered = config['contexts'].filter((context) => context['name'] !== name);

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
function orderContextKeys(context: CliCommandsContextOrderContextKeysContext): CliCommandsContextOrderContextKeysReturn {
  const type: CliCommandsContextOrderContextKeysType = context['type'];
  const name: CliCommandsContextOrderContextKeysName = context['name'];
  const id: CliCommandsContextOrderContextKeysId = context['id'];
  const rest: CliCommandsContextOrderContextKeysRest = {
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
  } as CliCommandsContextOrderContextKeysReturn;
}

/**
 * CLI - Commands - Context - Generate Random String.
 *
 * Produces a random alphanumeric string of the requested length using
 * cryptographic random bytes for unpredictability.
 *
 * @since 2.0.0
 */
function generateRandomString(length: CliCommandsContextGenerateRandomStringLength, lowercase: CliCommandsContextGenerateRandomStringLowercase = false): CliCommandsContextGenerateRandomStringReturn {
  let result: CliCommandsContextGenerateRandomStringResult = '';

  while (result['length'] < length) {
    const chunk: CliCommandsContextGenerateRandomStringChunk = randomBytes(48).toString('base64').replace(new RegExp(LIB_REGEX_NON_ALPHANUMERIC, 'g'), '');

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
function generateId(): CliCommandsContextGenerateIdReturn {
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
function generateToken(): CliCommandsContextGenerateTokenReturn {
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

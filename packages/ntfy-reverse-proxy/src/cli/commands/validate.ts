import { configSchema } from '../../lib/schema.js';
import { loadConfig } from './config-io.js';

import type {
  CliCommandsValidateValidateConfigConfig,
  CliCommandsValidateValidateConfigConfigPath,
  CliCommandsValidateValidateConfigEntryCount,
  CliCommandsValidateValidateConfigEntryId,
  CliCommandsValidateValidateConfigErrors,
  CliCommandsValidateValidateConfigIdCounts,
  CliCommandsValidateValidateConfigParseResult,
  CliCommandsValidateValidateConfigRaw,
  CliCommandsValidateValidateConfigReturn,
  CliCommandsValidateValidateConfigServerNames,
} from '../../types/cli/commands/validate.d.ts';

/**
 * CLI - Commands - Validate - Config.
 *
 * Runs structural and referential integrity checks on the configuration
 * file, returning a list of any validation errors found.
 *
 * @since 2.0.0
 */
function validateConfig(configPath: CliCommandsValidateValidateConfigConfigPath): CliCommandsValidateValidateConfigReturn {
  const errors: CliCommandsValidateValidateConfigErrors = [];
  const raw: CliCommandsValidateValidateConfigRaw = loadConfig(configPath);
  const parseResult: CliCommandsValidateValidateConfigParseResult = configSchema.safeParse(raw);

  if (parseResult['success'] === false) {
    for (const issue of parseResult['error']['issues']) {
      errors.push(issue['message']);
    }

    return {
      valid: false,
      errors,
    };
  }

  const config: CliCommandsValidateValidateConfigConfig = parseResult['data'];
  const serverNames: CliCommandsValidateValidateConfigServerNames = new Set(config['servers'].map((server) => server['name']));

  for (const context of config['contexts']) {
    if (serverNames.has(context['primary_server']) === false) {
      errors.push(`Context "${context['name']}": primary_server "${context['primary_server']}" references a server that does not exist (missing).`);
    }

    for (const serverRef of context['servers']) {
      if (serverNames.has(serverRef) === false) {
        errors.push(`Context "${context['name']}": servers list references "${serverRef}" which does not exist (missing).`);
      }
    }
  }

  const idCounts: CliCommandsValidateValidateConfigIdCounts = new Map();

  for (const context of config['contexts']) {
    idCounts.set(context['id'], (idCounts.get(context['id']) ?? 0) + 1);
  }

  for (const entry of idCounts) {
    const entryId: CliCommandsValidateValidateConfigEntryId = entry[0];
    const entryCount: CliCommandsValidateValidateConfigEntryCount = entry[1];

    if (entryCount > 1) {
      errors.push(`Duplicate id "${entryId}" found in multiple contexts.`);
    }
  }

  return {
    valid: errors['length'] === 0,
    errors,
  };
}

export {
  validateConfig,
};

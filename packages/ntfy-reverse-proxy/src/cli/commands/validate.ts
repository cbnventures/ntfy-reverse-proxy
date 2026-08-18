import { configSchema } from '../../lib/schema.js';
import { loadConfig } from './config-io.js';

import type {
  Cli_Commands_Validate_ValidateConfig_Config,
  Cli_Commands_Validate_ValidateConfig_ConfigPath,
  Cli_Commands_Validate_ValidateConfig_EntryCount,
  Cli_Commands_Validate_ValidateConfig_EntryId,
  Cli_Commands_Validate_ValidateConfig_Errors,
  Cli_Commands_Validate_ValidateConfig_IdCounts,
  Cli_Commands_Validate_ValidateConfig_ParseResult,
  Cli_Commands_Validate_ValidateConfig_Raw,
  Cli_Commands_Validate_ValidateConfig_Returns,
  Cli_Commands_Validate_ValidateConfig_ServerNames,
} from '../../types/cli/commands/validate.d.ts';

/**
 * CLI - Commands - Validate - Config.
 *
 * Runs structural and referential integrity checks on the configuration
 * file, returning a list of any validation errors found.
 *
 * @since 2.0.0
 */
function validateConfig(configPath: Cli_Commands_Validate_ValidateConfig_ConfigPath): Cli_Commands_Validate_ValidateConfig_Returns {
  const errors: Cli_Commands_Validate_ValidateConfig_Errors = [];
  const raw: Cli_Commands_Validate_ValidateConfig_Raw = loadConfig(configPath);
  const parseResult: Cli_Commands_Validate_ValidateConfig_ParseResult = configSchema.safeParse(raw);

  if (parseResult['success'] === false) {
    for (const issue of parseResult['error']['issues']) {
      errors.push(issue['message']);
    }

    return {
      valid: false,
      errors,
    };
  }

  const config: Cli_Commands_Validate_ValidateConfig_Config = parseResult['data'];
  const serverNames: Cli_Commands_Validate_ValidateConfig_ServerNames = new Set(config['servers'].map((server) => server['name']));

  for (const context of config['contexts']) {
    if (serverNames.has(context['primary_server']) === false) {
      errors.push(`Context "${context['name']}": primary_server "${context['primary_server']}" references a server that does not exist (missing).`);
    }

    for (const serverRef of context['servers']) {
      if (serverNames.has(serverRef) === false) {
        errors.push(`Context "${context['name']}": servers list references "${serverRef}" which does not exist (missing).`);
      }
    }

    if (context['servers'].includes(context['primary_server']) === false) {
      errors.push(`Context "${context['name']}": primary_server "${context['primary_server']}" is not included in the context's servers list.`);
    }
  }

  const idCounts: Cli_Commands_Validate_ValidateConfig_IdCounts = new Map();

  for (const context of config['contexts']) {
    idCounts.set(context['id'], (idCounts.get(context['id']) ?? 0) + 1);
  }

  for (const entry of idCounts) {
    const entryId: Cli_Commands_Validate_ValidateConfig_EntryId = entry[0];
    const entryCount: Cli_Commands_Validate_ValidateConfig_EntryCount = entry[1];

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

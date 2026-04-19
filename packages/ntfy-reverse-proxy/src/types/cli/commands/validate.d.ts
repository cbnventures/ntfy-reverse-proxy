import type { z } from 'zod';

import type { LibSchemaConfigSchema } from '../../lib/schema.d.ts';

/**
 * CLI - Commands - Validate - Validate Config.
 *
 * @since 2.0.0
 */
export type CliCommandsValidateValidateConfigConfigPath = string;

export type CliCommandsValidateValidateConfigReturn = CliCommandsValidateValidateConfigResult;

export type CliCommandsValidateValidateConfigErrors = string[];

export type CliCommandsValidateValidateConfigRaw = unknown;

export type CliCommandsValidateValidateConfigParseResult = z.ZodSafeParseResult<LibSchemaConfigSchema>;

export type CliCommandsValidateValidateConfigConfig = LibSchemaConfigSchema;

export type CliCommandsValidateValidateConfigServerNames = Set<string>;

export type CliCommandsValidateValidateConfigIdCounts = Map<string, number>;

export type CliCommandsValidateValidateConfigEntryId = string;

export type CliCommandsValidateValidateConfigEntryCount = number;

export type CliCommandsValidateValidateConfigResultValid = boolean;

export type CliCommandsValidateValidateConfigResultErrors = string[];

export type CliCommandsValidateValidateConfigResult = {
  valid: CliCommandsValidateValidateConfigResultValid;
  errors: CliCommandsValidateValidateConfigResultErrors;
};

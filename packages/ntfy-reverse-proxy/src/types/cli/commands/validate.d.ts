import type { z } from 'zod';

import type { Lib_Schema_ConfigSchema } from '../../lib/schema.d.ts';

/**
 * CLI - Commands - Validate - Validate Config.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Validate_ValidateConfig_ConfigPath = string;

export type Cli_Commands_Validate_ValidateConfig_Returns = Cli_Commands_Validate_ValidateConfig_Result;

export type Cli_Commands_Validate_ValidateConfig_Errors = string[];

export type Cli_Commands_Validate_ValidateConfig_Raw = unknown;

export type Cli_Commands_Validate_ValidateConfig_ParseResult = z.ZodSafeParseResult<Lib_Schema_ConfigSchema>;

export type Cli_Commands_Validate_ValidateConfig_Config = { [Key in keyof Lib_Schema_ConfigSchema]: Lib_Schema_ConfigSchema[Key] };

export type Cli_Commands_Validate_ValidateConfig_ServerNames = Set<string>;

export type Cli_Commands_Validate_ValidateConfig_IdCounts = Map<string, number>;

export type Cli_Commands_Validate_ValidateConfig_EntryId = string;

export type Cli_Commands_Validate_ValidateConfig_EntryCount = number;

export type Cli_Commands_Validate_ValidateConfig_ResultValid = boolean;

export type Cli_Commands_Validate_ValidateConfig_ResultErrors = string[];

export type Cli_Commands_Validate_ValidateConfig_Result = {
  valid: Cli_Commands_Validate_ValidateConfig_ResultValid;
  errors: Cli_Commands_Validate_ValidateConfig_ResultErrors;
};

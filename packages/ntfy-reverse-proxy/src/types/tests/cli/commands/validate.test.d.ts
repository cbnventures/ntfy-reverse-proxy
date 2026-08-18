/**
 * Tests - CLI - Commands - Validate.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Validate_TestConfigPathFragment = string;

export type Tests_Cli_Commands_Validate_TestConfigTmpDir = string;

export type Tests_Cli_Commands_Validate_TestConfigPath = string;

/**
 * Tests - CLI - Commands - Validate - Validate Command - Detects Duplicate Ids.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Validate_ValidateCommand_DetectsDuplicateIds_ConfigJson = string;

export type Tests_Cli_Commands_Validate_ValidateCommand_DetectsDuplicateIds_ResultValid = boolean;

export type Tests_Cli_Commands_Validate_ValidateCommand_DetectsDuplicateIds_ResultErrors = string[];

export type Tests_Cli_Commands_Validate_ValidateCommand_DetectsDuplicateIds_Result = {
  valid: Tests_Cli_Commands_Validate_ValidateCommand_DetectsDuplicateIds_ResultValid;
  errors: Tests_Cli_Commands_Validate_ValidateCommand_DetectsDuplicateIds_ResultErrors;
};

export type Tests_Cli_Commands_Validate_ValidateCommand_DetectsDuplicateIds_HasMatch = boolean;

/**
 * Tests - CLI - Commands - Validate - Validate Command - Detects Orphaned Server References.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Validate_ValidateCommand_DetectsOrphanedServerReferences_ConfigJson = string;

export type Tests_Cli_Commands_Validate_ValidateCommand_DetectsOrphanedServerReferences_ResultValid = boolean;

export type Tests_Cli_Commands_Validate_ValidateCommand_DetectsOrphanedServerReferences_ResultErrors = string[];

export type Tests_Cli_Commands_Validate_ValidateCommand_DetectsOrphanedServerReferences_Result = {
  valid: Tests_Cli_Commands_Validate_ValidateCommand_DetectsOrphanedServerReferences_ResultValid;
  errors: Tests_Cli_Commands_Validate_ValidateCommand_DetectsOrphanedServerReferences_ResultErrors;
};

export type Tests_Cli_Commands_Validate_ValidateCommand_DetectsOrphanedServerReferences_HasMatch = boolean;

/**
 * Tests - CLI - Commands - Validate - Validate Command - Detects Primary Server Not In Context Servers List.
 *
 * @since 2.1.0
 */
export type Tests_Cli_Commands_Validate_ValidateCommand_DetectsPrimaryServerNotInContextServersList_ConfigJson = string;

export type Tests_Cli_Commands_Validate_ValidateCommand_DetectsPrimaryServerNotInContextServersList_ResultValid = boolean;

export type Tests_Cli_Commands_Validate_ValidateCommand_DetectsPrimaryServerNotInContextServersList_ResultErrors = string[];

export type Tests_Cli_Commands_Validate_ValidateCommand_DetectsPrimaryServerNotInContextServersList_Result = {
  valid: Tests_Cli_Commands_Validate_ValidateCommand_DetectsPrimaryServerNotInContextServersList_ResultValid;
  errors: Tests_Cli_Commands_Validate_ValidateCommand_DetectsPrimaryServerNotInContextServersList_ResultErrors;
};

export type Tests_Cli_Commands_Validate_ValidateCommand_DetectsPrimaryServerNotInContextServersList_HasMatch = boolean;

/**
 * Tests - CLI - Commands - Validate - Validate Command - Passes Valid Config.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Validate_ValidateCommand_PassesValidConfig_ConfigJson = string;

export type Tests_Cli_Commands_Validate_ValidateCommand_PassesValidConfig_ResultValid = boolean;

export type Tests_Cli_Commands_Validate_ValidateCommand_PassesValidConfig_ResultErrors = string[];

export type Tests_Cli_Commands_Validate_ValidateCommand_PassesValidConfig_Result = {
  valid: Tests_Cli_Commands_Validate_ValidateCommand_PassesValidConfig_ResultValid;
  errors: Tests_Cli_Commands_Validate_ValidateCommand_PassesValidConfig_ResultErrors;
};

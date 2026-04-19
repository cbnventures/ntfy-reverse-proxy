/**
 * Tests - CLI - Commands - Validate.
 *
 * @since 2.0.0
 */
export type TestsCliCommandsValidateTestConfigPath = string;

export type TestsCliCommandsValidateConfigJson = string;

export type TestsCliCommandsValidateResult = {
  valid: TestsCliCommandsValidateResultValid;
  errors: TestsCliCommandsValidateResultErrors;
};

export type TestsCliCommandsValidateResultValid = boolean;

export type TestsCliCommandsValidateResultErrors = string[];

export type TestsCliCommandsValidateHasMatch = boolean;

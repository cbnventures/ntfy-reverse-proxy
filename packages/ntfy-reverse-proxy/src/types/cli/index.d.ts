import type { Command } from 'commander';

import type { Cli_Commands_Validate_ValidateConfig_Returns } from './commands/validate.d.ts';

/**
 * CLI - Env Dir.
 *
 * @since 2.0.0
 */
export type Cli_Index_EnvDir = string | undefined;

/**
 * CLI - Get Config File Path.
 *
 * @since 2.0.0
 */
export type Cli_Index_GetConfigFilePath_Returns = string;

export type Cli_Index_ConfigDir = string | undefined;

export type Cli_Index_ConfigPath = string;

export type Cli_Index_GetConfigFilePath_DefaultDir = string;

export type Cli_Index_SamplePath = string;

/**
 * CLI - Main.
 *
 * @since 2.0.0
 */
export type Cli_Index_Main_Returns = Promise<void>;

export type Cli_Index_Main_ConfigDirs = string[];

export type Cli_Index_Main_ConfigPath = string;

export type Cli_Index_Main_ServerCommand = Command;

export type Cli_Index_Main_ContextCommand = Command;

export type Cli_Index_Main_Result = { [Key in keyof Cli_Commands_Validate_ValidateConfig_Returns]: Cli_Commands_Validate_ValidateConfig_Returns[Key] };

export type Cli_Index_Main_Message = string;

/**
 * CLI - Program.
 *
 * @since 2.0.0
 */
export type Cli_Index_Program = Command;

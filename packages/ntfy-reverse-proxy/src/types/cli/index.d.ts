import type { Command } from 'commander';

import type { CliCommandsValidateValidateConfigReturn } from './commands/validate.d.ts';

/**
 * CLI - Env Dir.
 *
 * @since 2.0.0
 */
export type CliIndexEnvDir = string | undefined;

/**
 * CLI - Get Config File Path.
 *
 * @since 2.0.0
 */
export type CliIndexGetConfigFilePathReturn = string;

export type CliIndexConfigDir = string | undefined;

export type CliIndexConfigPath = string;

export type CliIndexSamplePath = string;

/**
 * CLI - Main.
 *
 * @since 2.0.0
 */
export type CliIndexMainReturn = Promise<void>;

export type CliIndexMainConfigDirs = string[];

export type CliIndexMainConfigPath = string;

export type CliIndexMainServerCommand = Command;

export type CliIndexMainServerRemoveName = string;

export type CliIndexMainContextCommand = Command;

export type CliIndexMainContextRemoveName = string;

export type CliIndexMainValidateResult = CliCommandsValidateValidateConfigReturn;

export type CliIndexMainValidateError = string;

export type CliIndexMainCatchError = unknown;

/**
 * CLI - Program.
 *
 * @since 2.0.0
 */
export type CliIndexProgram = Command;

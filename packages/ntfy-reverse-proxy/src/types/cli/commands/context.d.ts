import type { LibSchemaConfigSchema } from '../../lib/schema.d.ts';

import type { LibSchemaContextConfig } from '../../lib/schema.d.ts';

/**
 * CLI - Commands - Context.
 *
 * @since 2.0.0
 */
export type CliCommandsContextAddContextConfigPath = string;

export type CliCommandsContextAddContextContext = LibSchemaContextConfig;

export type CliCommandsContextAddContextReturn = void;

export type CliCommandsContextAddContextConfig = LibSchemaConfigSchema;

export type CliCommandsContextAddContextDuplicateName = boolean;

export type CliCommandsContextAddContextCurrentContext = LibSchemaContextConfig;

export type CliCommandsContextAddContextExistingIds = Set<string>;

export type CliCommandsContextAddContextNewId = string;

export type CliCommandsContextAddContextServerNames = string[];

export type CliCommandsContextAddContextMissingServer = string | undefined;

export type CliCommandsContextAddContextOrdered = LibSchemaContextConfig;

/**
 * CLI - Commands - Context.
 *
 * @since 2.0.0
 */
export type CliCommandsContextListContextsConfigPath = string;

export type CliCommandsContextListContextsReturn = LibSchemaContextConfig[];

export type CliCommandsContextListContextsConfig = LibSchemaConfigSchema;

/**
 * CLI - Commands - Context.
 *
 * @since 2.0.0
 */
export type CliCommandsContextEditContextConfigPath = string;

export type CliCommandsContextEditContextName = string;

export type CliCommandsContextEditContextUpdates = Partial<LibSchemaContextConfig>;

export type CliCommandsContextEditContextReturn = void;

export type CliCommandsContextEditContextConfig = LibSchemaConfigSchema;

export type CliCommandsContextEditContextIndex = number;

export type CliCommandsContextEditContextUpdatedUpdates = Partial<LibSchemaContextConfig>;

export type CliCommandsContextEditContextNewId = string;

export type CliCommandsContextEditContextExistingIds = Set<string>;

export type CliCommandsContextEditContextMerged = LibSchemaContextConfig;

export type CliCommandsContextEditContextOrdered = LibSchemaContextConfig;

/**
 * CLI - Commands - Context.
 *
 * @since 2.0.0
 */
export type CliCommandsContextRemoveContextConfigPath = string;

export type CliCommandsContextRemoveContextName = string;

export type CliCommandsContextRemoveContextReturn = void;

export type CliCommandsContextRemoveContextConfig = LibSchemaConfigSchema;

export type CliCommandsContextRemoveContextFiltered = LibSchemaContextConfig[];

/**
 * CLI - Commands - Context.
 *
 * @since 2.0.0
 */
export type CliCommandsContextOrderContextKeysContext = LibSchemaContextConfig;

export type CliCommandsContextOrderContextKeysReturn = LibSchemaContextConfig;

export type CliCommandsContextOrderContextKeysType = 'http' | 'email';

export type CliCommandsContextOrderContextKeysName = string;

export type CliCommandsContextOrderContextKeysId = string;

export type CliCommandsContextOrderContextKeysRest = Record<string, unknown>;

export type CliCommandsContextOrderContextKeysResult = LibSchemaContextConfig;

/**
 * CLI - Commands - Context.
 *
 * @since 2.0.0
 */
export type CliCommandsContextGenerateRandomStringLength = number;

export type CliCommandsContextGenerateRandomStringLowercase = boolean;

export type CliCommandsContextGenerateRandomStringReturn = string;

export type CliCommandsContextGenerateRandomStringResult = string;

export type CliCommandsContextGenerateRandomStringChunk = string;

/**
 * CLI - Commands - Context.
 *
 * @since 2.0.0
 */
export type CliCommandsContextGenerateIdReturn = string;

/**
 * CLI - Commands - Context.
 *
 * @since 2.0.0
 */
export type CliCommandsContextGenerateTokenReturn = string;

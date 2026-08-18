import type { Lib_Schema_ConfigSchemaContexts } from '../../lib/schema.d.ts';

import type { Lib_Schema_ConfigSchemaServers } from '../../lib/schema.d.ts';

import type { Lib_Schema_ConfigSchemaSettings } from '../../lib/schema.d.ts';

import type { Lib_Schema_ContextConfig } from '../../lib/schema.d.ts';

import type { Lib_Schema_EmailContextConfig } from '../../lib/schema.d.ts';

import type { Lib_Schema_HttpContextConfig } from '../../lib/schema.d.ts';

/**
 * CLI - Commands - Context.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Context_AddContext_ConfigPath = string;

export type Cli_Commands_Context_AddContext_Context = Lib_Schema_ContextConfig;

export type Cli_Commands_Context_AddContext_Returns = void;

export type Cli_Commands_Context_AddContext_Config_Settings = Lib_Schema_ConfigSchemaSettings;

export type Cli_Commands_Context_AddContext_Config_Servers = Lib_Schema_ConfigSchemaServers;

export type Cli_Commands_Context_AddContext_Config_Contexts = Lib_Schema_ConfigSchemaContexts;

export type Cli_Commands_Context_AddContext_Config = {
  settings: Cli_Commands_Context_AddContext_Config_Settings;
  servers: Cli_Commands_Context_AddContext_Config_Servers;
  contexts: Cli_Commands_Context_AddContext_Config_Contexts;
};

export type Cli_Commands_Context_AddContext_DuplicateName = boolean;

export type Cli_Commands_Context_AddContext_CurrentContext = Lib_Schema_HttpContextConfig | Lib_Schema_EmailContextConfig;

export type Cli_Commands_Context_AddContext_ExistingIds = Set<string>;

export type Cli_Commands_Context_AddContext_NewId = string;

export type Cli_Commands_Context_AddContext_ServerNames = string[];

export type Cli_Commands_Context_AddContext_MissingServer = string | undefined;

export type Cli_Commands_Context_AddContext_Ordered = Lib_Schema_HttpContextConfig | Lib_Schema_EmailContextConfig;

/**
 * CLI - Commands - Context.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Context_EditContext_ConfigPath = string;

export type Cli_Commands_Context_EditContext_Name = string;

export type Cli_Commands_Context_EditContext_Updates = Partial<Lib_Schema_ContextConfig>;

export type Cli_Commands_Context_EditContext_Returns = void;

export type Cli_Commands_Context_EditContext_Config_Settings = Lib_Schema_ConfigSchemaSettings;

export type Cli_Commands_Context_EditContext_Config_Servers = Lib_Schema_ConfigSchemaServers;

export type Cli_Commands_Context_EditContext_Config_Contexts = Lib_Schema_ConfigSchemaContexts;

export type Cli_Commands_Context_EditContext_Config = {
  settings: Cli_Commands_Context_EditContext_Config_Settings;
  servers: Cli_Commands_Context_EditContext_Config_Servers;
  contexts: Cli_Commands_Context_EditContext_Config_Contexts;
};

export type Cli_Commands_Context_EditContext_Index = number;

export type Cli_Commands_Context_EditContext_UpdatedUpdates = Partial<Lib_Schema_ContextConfig>;

export type Cli_Commands_Context_EditContext_NewId = string;

export type Cli_Commands_Context_EditContext_ExistingIds = Set<string>;

export type Cli_Commands_Context_EditContext_Merged = Lib_Schema_HttpContextConfig | Lib_Schema_EmailContextConfig;

export type Cli_Commands_Context_EditContext_Ordered = Lib_Schema_HttpContextConfig | Lib_Schema_EmailContextConfig;

/**
 * CLI - Commands - Context.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Context_GenerateId_Returns = string;

/**
 * CLI - Commands - Context.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Context_GenerateRandomString_Length = number;

export type Cli_Commands_Context_GenerateRandomString_Lowercase = boolean;

export type Cli_Commands_Context_GenerateRandomString_Returns = string;

export type Cli_Commands_Context_GenerateRandomString_Result = string;

export type Cli_Commands_Context_GenerateRandomString_Chunk = string;

/**
 * CLI - Commands - Context.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Context_GenerateToken_Returns = string;

/**
 * CLI - Commands - Context.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Context_ListContexts_ConfigPath = string;

export type Cli_Commands_Context_ListContexts_Returns = Lib_Schema_ContextConfig[];

export type Cli_Commands_Context_ListContexts_Config = Lib_Schema_ConfigSchemaContexts;

/**
 * CLI - Commands - Context.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Context_OrderContextKeys_Context = Lib_Schema_ContextConfig;

export type Cli_Commands_Context_OrderContextKeys_Returns = Lib_Schema_ContextConfig;

export type Cli_Commands_Context_OrderContextKeys_Type = 'http' | 'email';

export type Cli_Commands_Context_OrderContextKeys_Name = string;

export type Cli_Commands_Context_OrderContextKeys_Id = string;

export type Cli_Commands_Context_OrderContextKeys_Rest = Record<string, unknown>;

export type Cli_Commands_Context_OrderContextKeys_Result = Lib_Schema_ContextConfig;

/**
 * CLI - Commands - Context.
 *
 * @since 2.0.0
 */
export type Cli_Commands_Context_RemoveContext_ConfigPath = string;

export type Cli_Commands_Context_RemoveContext_Name = string;

export type Cli_Commands_Context_RemoveContext_Returns = void;

export type Cli_Commands_Context_RemoveContext_Config_Settings = Lib_Schema_ConfigSchemaSettings;

export type Cli_Commands_Context_RemoveContext_Config_Servers = Lib_Schema_ConfigSchemaServers;

export type Cli_Commands_Context_RemoveContext_Config_Contexts = Lib_Schema_ConfigSchemaContexts;

export type Cli_Commands_Context_RemoveContext_Config = {
  settings: Cli_Commands_Context_RemoveContext_Config_Settings;
  servers: Cli_Commands_Context_RemoveContext_Config_Servers;
  contexts: Cli_Commands_Context_RemoveContext_Config_Contexts;
};

export type Cli_Commands_Context_RemoveContext_Filtered = (Lib_Schema_HttpContextConfig | Lib_Schema_EmailContextConfig)[];

import type { Lib_Schema_ConfigSchema } from '../../../lib/schema.d.ts';

/**
 * Tests - CLI - Commands - Generate.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Generate_TestConfigPathFragment = string;

export type Tests_Cli_Commands_Generate_TestConfigTmpDir = string;

export type Tests_Cli_Commands_Generate_TestConfigPath = string;

export type Tests_Cli_Commands_Generate_TestOutputDir = string;

export type Tests_Cli_Commands_Generate_TestOutputPath = string;

/**
 * Tests - CLI - Commands - Generate.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Generate_GenerateCommand_ConfigJson = string;

/**
 * Tests - CLI - Commands - Generate - Generate Command - Binds The SQLite Delivery Outbox Durable Object.
 *
 * @since 2.2.1
 */
export type Tests_Cli_Commands_Generate_GenerateCommand_BindsTheSQLiteDeliveryOutboxDurableObject_Toml = string;

/**
 * Tests - CLI - Commands - Generate.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Generate_GenerateCommand_GeneratesEmailRoutingCommentsForEmailContexts_Toml = string;

/**
 * Tests - CLI - Commands - Generate.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Generate_GenerateCommand_GeneratesRoutesFromHTTPContextIdsAndBaseDomain_Toml = string;

/**
 * Tests - CLI - Commands - Generate.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Generate_GenerateCommand_GeneratesValidWranglerToml_Toml = string;

/**
 * Tests - CLI - Commands - Generate.
 *
 * @since 2.0.0
 */
export type Tests_Cli_Commands_Generate_GenerateCommand_OmitsEmailRoutingSectionWhenNoEmailContextsExist_ConfigJson = string;

export type Tests_Cli_Commands_Generate_GenerateCommand_OmitsEmailRoutingSectionWhenNoEmailContextsExist_Toml = string;

/**
 * Tests - CLI - Commands - Generate - Generate Command - Points Main At The Bundled Worker Entry.
 *
 * @since 2.3.0
 */
export type Tests_Cli_Commands_Generate_GenerateCommand_PointsMainAtTheBundledWorkerEntry_Toml = string;

/**
 * Tests - CLI - Commands - Generate - Generate Command - Resolves The Worker Import From A Symlinked Config Folder.
 *
 * @since 2.3.0
 */
export type Tests_Cli_Commands_Generate_GenerateCommand_ResolvesTheWorkerImportFromASymlinkedConfigFolder_RealDir = string;

export type Tests_Cli_Commands_Generate_GenerateCommand_ResolvesTheWorkerImportFromASymlinkedConfigFolder_LinkedDir = string;

export type Tests_Cli_Commands_Generate_GenerateCommand_ResolvesTheWorkerImportFromASymlinkedConfigFolder_BundleDir = string;

export type Tests_Cli_Commands_Generate_GenerateCommand_ResolvesTheWorkerImportFromASymlinkedConfigFolder_EntryLines = string[];

export type Tests_Cli_Commands_Generate_GenerateCommand_ResolvesTheWorkerImportFromASymlinkedConfigFolder_ImportPath = string;

/**
 * Tests - CLI - Commands - Generate - Generate Command - Writes Next To The Config File By Default.
 *
 * @since 2.3.0
 */
export type Tests_Cli_Commands_Generate_GenerateCommand_WritesNextToTheConfigFileByDefault_ConfigPath = string;

/**
 * Tests - CLI - Commands - Generate - Generate Command - Writes The Config And An Entry That Imports The Worker.
 *
 * @since 2.3.0
 */
export type Tests_Cli_Commands_Generate_GenerateCommand_WritesTheConfigAndAnEntryThatImportsTheWorker_BundleDir = string;

export type Tests_Cli_Commands_Generate_GenerateCommand_WritesTheConfigAndAnEntryThatImportsTheWorker_BundledConfig = unknown;

export type Tests_Cli_Commands_Generate_GenerateCommand_WritesTheConfigAndAnEntryThatImportsTheWorker_ExpectedConfig = Lib_Schema_ConfigSchema & {};

export type Tests_Cli_Commands_Generate_GenerateCommand_WritesTheConfigAndAnEntryThatImportsTheWorker_Entry = string;

export type Tests_Cli_Commands_Generate_GenerateCommand_WritesTheConfigAndAnEntryThatImportsTheWorker_WorkerEntryPath = string;

export type Tests_Cli_Commands_Generate_GenerateCommand_WritesTheConfigAndAnEntryThatImportsTheWorker_ExpectedImport = string;

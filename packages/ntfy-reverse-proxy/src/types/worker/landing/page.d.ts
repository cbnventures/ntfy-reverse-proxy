import type {
  Lib_Schema_ConfigSchema,
  Lib_Schema_ContextConfig,
  Lib_Schema_ServerConfig,
  Lib_Schema_SettingsConfig,
} from '../../lib/schema.d.ts';

/**
 * Worker - Landing - Page.
 *
 * @since 2.0.0
 */
export type Worker_Landing_Page_Config = Lib_Schema_ConfigSchema;

/**
 * Worker - Landing - Page - Escape HTML.
 *
 * @since 2.0.0
 */
export type Worker_Landing_Page_EscapeHtml_Str = string;

export type Worker_Landing_Page_EscapeHtml_Returns = string;

/**
 * Worker - Landing - Page - Landing Page.
 *
 * @since 2.0.0
 */
export type Worker_Landing_Page_LandingPage_Returns = Response;

export type Worker_Landing_Page_LandingPage_Settings = Lib_Schema_SettingsConfig & {};

export type Worker_Landing_Page_LandingPage_Servers = Array<Lib_Schema_ServerConfig>;

export type Worker_Landing_Page_LandingPage_Contexts = Array<Lib_Schema_ContextConfig>;

export type Worker_Landing_Page_LandingPage_DebugSection = string;

export type Worker_Landing_Page_LandingPage_MaskedServers = Record<string, string>[];

export type Worker_Landing_Page_LandingPage_MaskedContexts = Record<string, unknown>[];

export type Worker_Landing_Page_LandingPage_Base = Record<string, unknown>;

export type Worker_Landing_Page_LandingPage_MaskedConfig = Record<string, unknown>;

export type Worker_Landing_Page_LandingPage_MaskedJsonRaw = string;

export type Worker_Landing_Page_LandingPage_MaskedJson = string;

export type Worker_Landing_Page_LandingPage_Html = string;

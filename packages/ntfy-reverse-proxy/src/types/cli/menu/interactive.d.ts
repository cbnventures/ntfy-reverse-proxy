import type prompts from 'prompts';

import type {
  Lib_Schema_ContextConfig,
  Lib_Schema_ContextConfigErrorEvent,
  Lib_Schema_ServerConfig,
  Lib_Schema_SettingsConfig,
} from '../../lib/schema.d.ts';

/**
 * CLI - Menu - Interactive - Add Context Flow.
 *
 * @since 2.0.0
 */
export type Cli_Menu_Interactive_AddContextFlow_ConfigPath = string;

export type Cli_Menu_Interactive_AddContextFlow_Servers = Lib_Schema_ServerConfig[];

export type Cli_Menu_Interactive_AddContextFlow_Returns = Promise<void>;

export type Cli_Menu_Interactive_AddContextFlow_AutoId = string;

export type Cli_Menu_Interactive_AddContextFlow_TypeResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_AddContextFlow_ContextType = string | undefined;

export type Cli_Menu_Interactive_AddContextFlow_ChoiceTitle = string;

export type Cli_Menu_Interactive_AddContextFlow_ChoiceValue = string;

export type Cli_Menu_Interactive_AddContextFlow_Choice = {
  title: Cli_Menu_Interactive_AddContextFlow_ChoiceTitle;
  value: Cli_Menu_Interactive_AddContextFlow_ChoiceValue;
};

export type Cli_Menu_Interactive_AddContextFlow_HttpInterpreters = Cli_Menu_Interactive_AddContextFlow_Choice[];

export type Cli_Menu_Interactive_AddContextFlow_EmailInterpreters = Cli_Menu_Interactive_AddContextFlow_Choice[];

export type Cli_Menu_Interactive_AddContextFlow_NameResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_AddContextFlow_NameValidateValue = string;

export type Cli_Menu_Interactive_AddContextFlow_Name = string | undefined;

export type Cli_Menu_Interactive_AddContextFlow_IdMessage = string;

export type Cli_Menu_Interactive_AddContextFlow_IdResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_AddContextFlow_IdValidateValue = string;

export type Cli_Menu_Interactive_AddContextFlow_RawId = string | undefined;

export type Cli_Menu_Interactive_AddContextFlow_InterpreterChoices = Cli_Menu_Interactive_AddContextFlow_Choice[];

export type Cli_Menu_Interactive_AddContextFlow_InterpreterResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_AddContextFlow_Interpreter = string | undefined;

export type Cli_Menu_Interactive_AddContextFlow_TopicResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_AddContextFlow_TopicValidateValue = string;

export type Cli_Menu_Interactive_AddContextFlow_Topic = string | undefined;

export type Cli_Menu_Interactive_AddContextFlow_ErrorTopicResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_AddContextFlow_ErrorTopic = string | undefined;

export type Cli_Menu_Interactive_AddContextFlow_ErrorEventsResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_AddContextFlow_ErrorEvents = string[] | undefined;

export type Cli_Menu_Interactive_AddContextFlow_ModeResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_AddContextFlow_Mode = string | undefined;

export type Cli_Menu_Interactive_AddContextFlow_ShowVisitorInfoResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_AddContextFlow_ShowVisitorInfo = boolean | undefined;

export type Cli_Menu_Interactive_AddContextFlow_PrimaryServerResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_AddContextFlow_PrimaryServer = string | undefined;

export type Cli_Menu_Interactive_AddContextFlow_SelectedServersResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_AddContextFlow_SelectedServers = string[] | undefined;

export type Cli_Menu_Interactive_AddContextFlow_RawIdString = string;

export type Cli_Menu_Interactive_AddContextFlow_IdTrimmed = string;

export type Cli_Menu_Interactive_AddContextFlow_ResolvedId = string;

export type Cli_Menu_Interactive_AddContextFlow_ErrorTopicString = string;

export type Cli_Menu_Interactive_AddContextFlow_ErrorTopicTrimmed = string;

export type Cli_Menu_Interactive_AddContextFlow_ResolvedErrorTopic = string | undefined;

export type Cli_Menu_Interactive_AddContextFlow_TopicString = string;

export type Cli_Menu_Interactive_AddContextFlow_TypedInterpreter = 'plain-text' | 'ntfy-json' | 'seerr' | 'synology' | 'statuspage' | 'pfsense' | 'unifi';

export type Cli_Menu_Interactive_AddContextFlow_TypedMode = 'send-once' | 'send-all';

export type Cli_Menu_Interactive_AddContextFlow_TypedErrorEvents = Array<Lib_Schema_ContextConfigErrorEvent> | undefined;

export type Cli_Menu_Interactive_AddContextFlow_AutoToken = string;

export type Cli_Menu_Interactive_AddContextFlow_TokenResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_AddContextFlow_RawToken = string | undefined;

export type Cli_Menu_Interactive_AddContextFlow_TokenTrimmed = string;

export type Cli_Menu_Interactive_AddContextFlow_ResolvedToken = string | undefined;

export type Cli_Menu_Interactive_AddContextFlow_AllowedFromResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_AddContextFlow_RawAllowedFrom = string | undefined;

export type Cli_Menu_Interactive_AddContextFlow_AllowedFromTrimmed = string;

export type Cli_Menu_Interactive_AddContextFlow_ResolvedAllowedFrom = string | undefined;

/**
 * CLI - Menu - Interactive - Context Menu.
 *
 * @since 2.0.0
 */
export type Cli_Menu_Interactive_ContextMenu_ConfigPath = string;

export type Cli_Menu_Interactive_ContextMenu_Returns = Promise<void>;

export type Cli_Menu_Interactive_ContextMenu_InMenu = boolean;

export type Cli_Menu_Interactive_ContextMenu_Response = prompts.Answers<string>;

export type Cli_Menu_Interactive_ContextMenu_Action = string | undefined;

export type Cli_Menu_Interactive_ContextMenu_Servers = Array<Lib_Schema_ServerConfig>;

export type Cli_Menu_Interactive_ContextMenu_ErrorMessage = string;

export type Cli_Menu_Interactive_ContextMenu_Contexts = Array<Lib_Schema_ContextConfig>;

export type Cli_Menu_Interactive_ContextMenu_SelectResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_ContextMenu_Name = string | undefined;

export type Cli_Menu_Interactive_ContextMenu_Current = Lib_Schema_ContextConfig | undefined;

export type Cli_Menu_Interactive_ContextMenu_EditServers = Array<Lib_Schema_ServerConfig>;

export type Cli_Menu_Interactive_ContextMenu_ServerChoices = Array<{
  title: string;
  value: string;
}>;

export type Cli_Menu_Interactive_ContextMenu_KeepIdResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_ContextMenu_KeepId = boolean | undefined;

export type Cli_Menu_Interactive_ContextMenu_Id = string | undefined;

export type Cli_Menu_Interactive_ContextMenu_ChoiceTitle = string;

export type Cli_Menu_Interactive_ContextMenu_ChoiceValue = string;

export type Cli_Menu_Interactive_ContextMenu_Choice = {
  title: Cli_Menu_Interactive_ContextMenu_ChoiceTitle;
  value: Cli_Menu_Interactive_ContextMenu_ChoiceValue;
};

export type Cli_Menu_Interactive_ContextMenu_HttpChoices = Cli_Menu_Interactive_ContextMenu_Choice[];

export type Cli_Menu_Interactive_ContextMenu_EmailChoices = Cli_Menu_Interactive_ContextMenu_Choice[];

export type Cli_Menu_Interactive_ContextMenu_KnownChoices = Cli_Menu_Interactive_ContextMenu_Choice[];

export type Cli_Menu_Interactive_ContextMenu_Exists = boolean;

export type Cli_Menu_Interactive_ContextMenu_HttpValues = string[];

export type Cli_Menu_Interactive_ContextMenu_EmailValues = string[];

export type Cli_Menu_Interactive_ContextMenu_KnownValues = string[];

export type Cli_Menu_Interactive_ContextMenu_InterpreterIdx = number;

export type Cli_Menu_Interactive_ContextMenu_InterpreterInitial = number;

export type Cli_Menu_Interactive_ContextMenu_InterpreterResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_ContextMenu_Interpreter = string | undefined;

export type Cli_Menu_Interactive_ContextMenu_TopicResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_ContextMenu_TopicValidateValue = string;

export type Cli_Menu_Interactive_ContextMenu_Topic = string | undefined;

export type Cli_Menu_Interactive_ContextMenu_CurrentErrorTopic = string;

export type Cli_Menu_Interactive_ContextMenu_ErrorTopicResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_ContextMenu_ErrorTopic = string | undefined;

export type Cli_Menu_Interactive_ContextMenu_CurrentErrorEvents = Array<Lib_Schema_ContextConfigErrorEvent> | undefined;

export type Cli_Menu_Interactive_ContextMenu_ErrorEventsResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_ContextMenu_ErrorEvents = string[] | undefined;

export type Cli_Menu_Interactive_ContextMenu_ModeInitial = number;

export type Cli_Menu_Interactive_ContextMenu_ModeResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_ContextMenu_Mode = string | undefined;

export type Cli_Menu_Interactive_ContextMenu_ShowVisitorInfoResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_ContextMenu_ShowVisitorInfo = boolean | undefined;

export type Cli_Menu_Interactive_ContextMenu_PrimaryServerIdx = number;

export type Cli_Menu_Interactive_ContextMenu_PrimaryServerInitial = number;

export type Cli_Menu_Interactive_ContextMenu_PrimaryServerResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_ContextMenu_PrimaryServer = string | undefined;

export type Cli_Menu_Interactive_ContextMenu_SelectedServersResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_ContextMenu_SelectedServers = string[] | undefined;

export type Cli_Menu_Interactive_ContextMenu_Updates = Record<string, unknown>;

export type Cli_Menu_Interactive_ContextMenu_ErrorTopicValue = string | undefined;

export type Cli_Menu_Interactive_ContextMenu_ErrorTopicTrimmed = string;

export type Cli_Menu_Interactive_ContextMenu_ResolvedErrorTopic = string | undefined;

export type Cli_Menu_Interactive_ContextMenu_KeepTokenResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_ContextMenu_KeepToken = boolean | undefined;

export type Cli_Menu_Interactive_ContextMenu_NewToken = string;

export type Cli_Menu_Interactive_ContextMenu_AddTokenResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_ContextMenu_AddToken = boolean | undefined;

export type Cli_Menu_Interactive_ContextMenu_AddNewToken = string;

export type Cli_Menu_Interactive_ContextMenu_CurrentAllowedFrom = string;

export type Cli_Menu_Interactive_ContextMenu_AllowedFromResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_ContextMenu_AllowedFrom = string | undefined;

export type Cli_Menu_Interactive_ContextMenu_AllowedFromTrimmed = string;

export type Cli_Menu_Interactive_ContextMenu_ResolvedAllowedFrom = string | undefined;

export type Cli_Menu_Interactive_ContextMenu_EditImportEditContext = (configPath: string, name: string, updates: Partial<Lib_Schema_ContextConfig>) => void;

export type Cli_Menu_Interactive_ContextMenu_EditImport = {
  editContext: Cli_Menu_Interactive_ContextMenu_EditImportEditContext;
};

export type Cli_Menu_Interactive_ContextMenu_EditErrorMessage = string;

export type Cli_Menu_Interactive_ContextMenu_RemoveContexts = Array<Lib_Schema_ContextConfig>;

export type Cli_Menu_Interactive_ContextMenu_RemoveSelectResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_ContextMenu_RemoveName = string | undefined;

export type Cli_Menu_Interactive_ContextMenu_ConfirmResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_ContextMenu_Confirmed = boolean | undefined;

export type Cli_Menu_Interactive_ContextMenu_RemoveErrorMessage = string;

/**
 * CLI - Menu - Interactive - Interactive Menu.
 *
 * @since 2.0.0
 */
export type Cli_Menu_Interactive_InteractiveMenu_ConfigDirs = string[];

export type Cli_Menu_Interactive_InteractiveMenu_Returns = Promise<void>;

export type Cli_Menu_Interactive_InteractiveMenu_CurrentFilePath = string;

export type Cli_Menu_Interactive_InteractiveMenu_Dir = string;

export type Cli_Menu_Interactive_InteractiveMenu_Version = string;

export type Cli_Menu_Interactive_InteractiveMenu_PackageJsonPath = string;

export type Cli_Menu_Interactive_InteractiveMenu_PackageJsonRaw = string;

export type Cli_Menu_Interactive_InteractiveMenu_PackageJsonParsed = Record<string, unknown>;

export type Cli_Menu_Interactive_InteractiveMenu_Parent = string;

export type Cli_Menu_Interactive_InteractiveMenu_Header = string;

export type Cli_Menu_Interactive_InteractiveMenu_ConfigPath = string | undefined;

export type Cli_Menu_Interactive_InteractiveMenu_ConfigDirResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_InteractiveMenu_DefaultConfigDir = string;

export type Cli_Menu_Interactive_InteractiveMenu_Running = boolean;

export type Cli_Menu_Interactive_InteractiveMenu_Response = prompts.Answers<string>;

export type Cli_Menu_Interactive_InteractiveMenu_Action = string | undefined;

export type Cli_Menu_Interactive_InteractiveMenu_ErrorMessage = string;

/**
 * CLI - Menu - Interactive - Server Menu.
 *
 * @since 2.0.0
 */
export type Cli_Menu_Interactive_ServerMenu_ConfigPath = string;

export type Cli_Menu_Interactive_ServerMenu_Returns = Promise<void>;

export type Cli_Menu_Interactive_ServerMenu_InMenu = boolean;

export type Cli_Menu_Interactive_ServerMenu_Response = prompts.Answers<string>;

export type Cli_Menu_Interactive_ServerMenu_Action = string | undefined;

export type Cli_Menu_Interactive_ServerMenu_Answers = prompts.Answers<string>;

export type Cli_Menu_Interactive_ServerMenu_UrlInstance = URL;

export type Cli_Menu_Interactive_ServerMenu_AnswersName = string | undefined;

export type Cli_Menu_Interactive_ServerMenu_AnswersServer = string | undefined;

export type Cli_Menu_Interactive_ServerMenu_AnswersToken = string | undefined;

export type Cli_Menu_Interactive_ServerMenu_ErrorMessage = string;

export type Cli_Menu_Interactive_ServerMenu_Servers = Array<Lib_Schema_ServerConfig>;

export type Cli_Menu_Interactive_ServerMenu_SelectResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_ServerMenu_Name = string | undefined;

export type Cli_Menu_Interactive_ServerMenu_Current = Lib_Schema_ServerConfig | undefined;

export type Cli_Menu_Interactive_ServerMenu_CurrentServer = string | undefined;

export type Cli_Menu_Interactive_ServerMenu_Updates = prompts.Answers<string>;

export type Cli_Menu_Interactive_ServerMenu_EditUrlInstance = URL;

export type Cli_Menu_Interactive_ServerMenu_TrimmedEmpty = boolean;

export type Cli_Menu_Interactive_ServerMenu_StartsWithTk = boolean;

export type Cli_Menu_Interactive_ServerMenu_EditImportEditServer = (configPath: string, name: string, updates: Partial<Lib_Schema_ServerConfig>) => void;

export type Cli_Menu_Interactive_ServerMenu_EditImport = {
  editServer: Cli_Menu_Interactive_ServerMenu_EditImportEditServer;
};

export type Cli_Menu_Interactive_ServerMenu_UpdatesServerString = string;

export type Cli_Menu_Interactive_ServerMenu_ServerUrlTrimmed = string;

export type Cli_Menu_Interactive_ServerMenu_ServerUrl = string | undefined;

export type Cli_Menu_Interactive_ServerMenu_UpdatesTokenString = string;

export type Cli_Menu_Interactive_ServerMenu_TokenTrimmed = string;

export type Cli_Menu_Interactive_ServerMenu_TokenValue = string | undefined;

export type Cli_Menu_Interactive_ServerMenu_EditUpdates = Partial<Lib_Schema_ServerConfig>;

export type Cli_Menu_Interactive_ServerMenu_EditErrorMessage = string;

export type Cli_Menu_Interactive_ServerMenu_RemoveServers = Array<Lib_Schema_ServerConfig>;

export type Cli_Menu_Interactive_ServerMenu_RemoveSelectResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_ServerMenu_RemoveName = string | undefined;

export type Cli_Menu_Interactive_ServerMenu_ConfirmResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_ServerMenu_Confirmed = boolean | undefined;

export type Cli_Menu_Interactive_ServerMenu_RemoveErrorMessage = string;

/**
 * CLI - Menu - Interactive - Settings Flow.
 *
 * @since 2.0.0
 */
export type Cli_Menu_Interactive_SettingsFlow_ConfigPath = string;

export type Cli_Menu_Interactive_SettingsFlow_Returns = Promise<void>;

export type Cli_Menu_Interactive_SettingsFlow_CurrentSettings = Lib_Schema_SettingsConfig | undefined;

export type Cli_Menu_Interactive_SettingsFlow_ErrorMessage = string;

export type Cli_Menu_Interactive_SettingsFlow_WorkerNameResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_SettingsFlow_WorkerNameValidateValue = string;

export type Cli_Menu_Interactive_SettingsFlow_WorkerName = string | undefined;

export type Cli_Menu_Interactive_SettingsFlow_BaseDomainResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_SettingsFlow_BaseDomainValidateValue = string;

export type Cli_Menu_Interactive_SettingsFlow_BaseDomain = string | undefined;

export type Cli_Menu_Interactive_SettingsFlow_ShowResponseOutputResponse = prompts.Answers<string>;

export type Cli_Menu_Interactive_SettingsFlow_ShowResponseOutput = boolean | undefined;

export type Cli_Menu_Interactive_SettingsFlow_UpdateErrorMessage = string;

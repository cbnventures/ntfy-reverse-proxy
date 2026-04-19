import type prompts from 'prompts';

import type {
  LibSchemaContextConfig,
  LibSchemaContextConfigInterpreter,
  LibSchemaContextConfigMode,
  LibSchemaServerConfig,
  LibSchemaSettingsConfig,
} from '../../lib/schema.d.ts';

/**
 * CLI - Menu - Interactive - Add Context Flow.
 *
 * @since 2.0.0
 */
export type CliMenuInteractiveAddContextFlowConfigPath = string;

export type CliMenuInteractiveAddContextFlowServers = LibSchemaServerConfig[];

export type CliMenuInteractiveAddContextFlowReturn = Promise<void>;

export type CliMenuInteractiveAddContextFlowAutoId = string;

export type CliMenuInteractiveAddContextFlowTypeResponse = prompts.Answers<string>;

export type CliMenuInteractiveAddContextFlowContextType = string | undefined;

export type CliMenuInteractiveAddContextFlowChoiceTitle = string;

export type CliMenuInteractiveAddContextFlowChoiceValue = string;

export type CliMenuInteractiveAddContextFlowChoice = {
  title: CliMenuInteractiveAddContextFlowChoiceTitle;
  value: CliMenuInteractiveAddContextFlowChoiceValue;
};

export type CliMenuInteractiveAddContextFlowHttpInterpreters = CliMenuInteractiveAddContextFlowChoice[];

export type CliMenuInteractiveAddContextFlowEmailInterpreters = CliMenuInteractiveAddContextFlowChoice[];

export type CliMenuInteractiveAddContextFlowNameResponse = prompts.Answers<string>;

export type CliMenuInteractiveAddContextFlowNameValidateValue = string;

export type CliMenuInteractiveAddContextFlowName = string | undefined;

export type CliMenuInteractiveAddContextFlowIdMessage = string;

export type CliMenuInteractiveAddContextFlowIdResponse = prompts.Answers<string>;

export type CliMenuInteractiveAddContextFlowIdValidateValue = string;

export type CliMenuInteractiveAddContextFlowRawId = string | undefined;

export type CliMenuInteractiveAddContextFlowInterpreterChoices = CliMenuInteractiveAddContextFlowChoice[];

export type CliMenuInteractiveAddContextFlowInterpreterResponse = prompts.Answers<string>;

export type CliMenuInteractiveAddContextFlowInterpreter = string | undefined;

export type CliMenuInteractiveAddContextFlowTopicResponse = prompts.Answers<string>;

export type CliMenuInteractiveAddContextFlowTopicValidateValue = string;

export type CliMenuInteractiveAddContextFlowTopic = string | undefined;

export type CliMenuInteractiveAddContextFlowErrorTopicResponse = prompts.Answers<string>;

export type CliMenuInteractiveAddContextFlowErrorTopic = string | undefined;

export type CliMenuInteractiveAddContextFlowModeResponse = prompts.Answers<string>;

export type CliMenuInteractiveAddContextFlowMode = string | undefined;

export type CliMenuInteractiveAddContextFlowShowVisitorInfoResponse = prompts.Answers<string>;

export type CliMenuInteractiveAddContextFlowShowVisitorInfo = boolean | undefined;

export type CliMenuInteractiveAddContextFlowPrimaryServerResponse = prompts.Answers<string>;

export type CliMenuInteractiveAddContextFlowPrimaryServer = string | undefined;

export type CliMenuInteractiveAddContextFlowSelectedServersResponse = prompts.Answers<string>;

export type CliMenuInteractiveAddContextFlowSelectedServers = string[] | undefined;

export type CliMenuInteractiveAddContextFlowRawIdString = string;

export type CliMenuInteractiveAddContextFlowIdTrimmed = string;

export type CliMenuInteractiveAddContextFlowResolvedId = string;

export type CliMenuInteractiveAddContextFlowErrorTopicString = string;

export type CliMenuInteractiveAddContextFlowErrorTopicTrimmed = string;

export type CliMenuInteractiveAddContextFlowResolvedErrorTopic = string | undefined;

export type CliMenuInteractiveAddContextFlowTopicString = string;

export type CliMenuInteractiveAddContextFlowTypedInterpreter = LibSchemaContextConfigInterpreter;

export type CliMenuInteractiveAddContextFlowTypedMode = LibSchemaContextConfigMode;

export type CliMenuInteractiveAddContextFlowAutoToken = string;

export type CliMenuInteractiveAddContextFlowTokenResponse = prompts.Answers<string>;

export type CliMenuInteractiveAddContextFlowRawToken = string | undefined;

export type CliMenuInteractiveAddContextFlowTokenTrimmed = string;

export type CliMenuInteractiveAddContextFlowResolvedToken = string | undefined;

export type CliMenuInteractiveAddContextFlowAllowedFromResponse = prompts.Answers<string>;

export type CliMenuInteractiveAddContextFlowRawAllowedFrom = string | undefined;

export type CliMenuInteractiveAddContextFlowAllowedFromTrimmed = string;

export type CliMenuInteractiveAddContextFlowResolvedAllowedFrom = string | undefined;

/**
 * CLI - Menu - Interactive - Context Menu.
 *
 * @since 2.0.0
 */
export type CliMenuInteractiveContextMenuConfigPath = string;

export type CliMenuInteractiveContextMenuReturn = Promise<void>;

export type CliMenuInteractiveContextMenuInMenu = boolean;

export type CliMenuInteractiveContextMenuResponse = prompts.Answers<string>;

export type CliMenuInteractiveContextMenuAction = string | undefined;

export type CliMenuInteractiveContextMenuServers = LibSchemaServerConfig[];

export type CliMenuInteractiveContextMenuErrorMessage = string;

export type CliMenuInteractiveContextMenuContexts = LibSchemaContextConfig[];

export type CliMenuInteractiveContextMenuSelectResponse = prompts.Answers<string>;

export type CliMenuInteractiveContextMenuName = string | undefined;

export type CliMenuInteractiveContextMenuCurrent = LibSchemaContextConfig | undefined;

export type CliMenuInteractiveContextMenuServerChoices = Array<{
  title: string;
  value: string;
}>;

export type CliMenuInteractiveContextMenuKeepIdResponse = prompts.Answers<string>;

export type CliMenuInteractiveContextMenuKeepId = boolean | undefined;

export type CliMenuInteractiveContextMenuId = string | undefined;

export type CliMenuInteractiveContextMenuChoiceTitle = string;

export type CliMenuInteractiveContextMenuChoiceValue = string;

export type CliMenuInteractiveContextMenuChoice = {
  title: CliMenuInteractiveContextMenuChoiceTitle;
  value: CliMenuInteractiveContextMenuChoiceValue;
};

export type CliMenuInteractiveContextMenuHttpChoices = CliMenuInteractiveContextMenuChoice[];

export type CliMenuInteractiveContextMenuEmailChoices = CliMenuInteractiveContextMenuChoice[];

export type CliMenuInteractiveContextMenuKnownChoices = CliMenuInteractiveContextMenuChoice[];

export type CliMenuInteractiveContextMenuExists = boolean;

export type CliMenuInteractiveContextMenuKnownValues = string[];

export type CliMenuInteractiveContextMenuIdx = number;

export type CliMenuInteractiveContextMenuInterpreterResponse = prompts.Answers<string>;

export type CliMenuInteractiveContextMenuInterpreter = string | undefined;

export type CliMenuInteractiveContextMenuTopicResponse = prompts.Answers<string>;

export type CliMenuInteractiveContextMenuTopicValidateValue = string;

export type CliMenuInteractiveContextMenuTopic = string | undefined;

export type CliMenuInteractiveContextMenuErrorTopic = string | undefined;

export type CliMenuInteractiveContextMenuErrorTopicResponse = prompts.Answers<string>;

export type CliMenuInteractiveContextMenuModeResponse = prompts.Answers<string>;

export type CliMenuInteractiveContextMenuMode = string | undefined;

export type CliMenuInteractiveContextMenuShowVisitorInfoResponse = prompts.Answers<string>;

export type CliMenuInteractiveContextMenuShowVisitorInfo = boolean | undefined;

export type CliMenuInteractiveContextMenuPrimaryServerIdx = number;

export type CliMenuInteractiveContextMenuPrimaryServerResponse = prompts.Answers<string>;

export type CliMenuInteractiveContextMenuPrimaryServer = string | undefined;

export type CliMenuInteractiveContextMenuSelectedServersResponse = prompts.Answers<string>;

export type CliMenuInteractiveContextMenuSelectedServers = string[] | undefined;

export type CliMenuInteractiveContextMenuUpdates = Record<string, unknown>;

export type CliMenuInteractiveContextMenuErrorTopicValue = string | undefined;

export type CliMenuInteractiveContextMenuErrorTopicTrimmed = string;

export type CliMenuInteractiveContextMenuKeepTokenResponse = prompts.Answers<string>;

export type CliMenuInteractiveContextMenuKeepToken = boolean | undefined;

export type CliMenuInteractiveContextMenuNewToken = string;

export type CliMenuInteractiveContextMenuAddTokenResponse = prompts.Answers<string>;

export type CliMenuInteractiveContextMenuAddToken = boolean | undefined;

export type CliMenuInteractiveContextMenuAllowedFrom = string | undefined;

export type CliMenuInteractiveContextMenuAllowedFromResponse = prompts.Answers<string>;

export type CliMenuInteractiveContextMenuAllowedFromTrimmed = string;

export type CliMenuInteractiveContextMenuEditImportEditContext = (configPath: string, name: string, updates: Partial<LibSchemaContextConfig>) => void;

export type CliMenuInteractiveContextMenuEditImport = {
  editContext: CliMenuInteractiveContextMenuEditImportEditContext;
};

export type CliMenuInteractiveContextMenuConfirmResponse = prompts.Answers<string>;

export type CliMenuInteractiveContextMenuConfirmed = boolean | undefined;

/**
 * CLI - Menu - Interactive - Interactive Menu.
 *
 * @since 2.0.0
 */
export type CliMenuInteractiveInteractiveMenuConfigDirs = string[];

export type CliMenuInteractiveInteractiveMenuReturn = Promise<void>;

export type CliMenuInteractiveInteractiveMenuCurrentFilePath = string;

export type CliMenuInteractiveInteractiveMenuDir = string;

export type CliMenuInteractiveInteractiveMenuVersion = string;

export type CliMenuInteractiveInteractiveMenuPackageJsonPath = string;

export type CliMenuInteractiveInteractiveMenuPackageJsonRaw = string;

export type CliMenuInteractiveInteractiveMenuPackageJsonParsed = Record<string, unknown>;

export type CliMenuInteractiveInteractiveMenuParent = string;

export type CliMenuInteractiveInteractiveMenuHeader = string;

export type CliMenuInteractiveInteractiveMenuInteractiveConfigPath = string | undefined;

export type CliMenuInteractiveInteractiveMenuConfigDirResponse = prompts.Answers<string>;

export type CliMenuInteractiveInteractiveMenuDefaultConfigDir = string;

export type CliMenuInteractiveInteractiveMenuRunning = boolean;

export type CliMenuInteractiveInteractiveMenuResponse = prompts.Answers<string>;

export type CliMenuInteractiveInteractiveMenuAction = string | undefined;

export type CliMenuInteractiveInteractiveMenuErrorMessage = string;

/**
 * CLI - Menu - Interactive - Server Menu.
 *
 * @since 2.0.0
 */
export type CliMenuInteractiveServerMenuConfigPath = string;

export type CliMenuInteractiveServerMenuReturn = Promise<void>;

export type CliMenuInteractiveServerMenuInMenu = boolean;

export type CliMenuInteractiveServerMenuResponse = prompts.Answers<string>;

export type CliMenuInteractiveServerMenuAction = string | undefined;

export type CliMenuInteractiveServerMenuAnswers = prompts.Answers<string>;

export type CliMenuInteractiveServerMenuNameValidateValue = string;

export type CliMenuInteractiveServerMenuServerValidateValue = string;

export type CliMenuInteractiveServerMenuUrlInstance = URL;

export type CliMenuInteractiveServerMenuTokenValidateValue = string;

export type CliMenuInteractiveServerMenuName = string | undefined;

export type CliMenuInteractiveServerMenuServer = string | undefined;

export type CliMenuInteractiveServerMenuToken = string | undefined;

export type CliMenuInteractiveServerMenuErrorMessage = string;

export type CliMenuInteractiveServerMenuServers = LibSchemaServerConfig[];

export type CliMenuInteractiveServerMenuSelectResponse = prompts.Answers<string>;

export type CliMenuInteractiveServerMenuCurrent = LibSchemaServerConfig | undefined;

export type CliMenuInteractiveServerMenuUpdates = prompts.Answers<string>;

export type CliMenuInteractiveServerMenuTrimmedEmpty = boolean;

export type CliMenuInteractiveServerMenuStartsWithTk = boolean;

export type CliMenuInteractiveServerMenuEditImportEditServer = (configPath: string, name: string, updates: Partial<LibSchemaServerConfig>) => void;

export type CliMenuInteractiveServerMenuEditImport = {
  editServer: CliMenuInteractiveServerMenuEditImportEditServer;
};

export type CliMenuInteractiveServerMenuUpdatesServerString = string;

export type CliMenuInteractiveServerMenuServerUrlTrimmed = string;

export type CliMenuInteractiveServerMenuServerUrl = string | undefined;

export type CliMenuInteractiveServerMenuUpdatesTokenString = string;

export type CliMenuInteractiveServerMenuTokenTrimmed = string;

export type CliMenuInteractiveServerMenuTokenValue = string | undefined;

export type CliMenuInteractiveServerMenuEditUpdates = Partial<LibSchemaServerConfig>;

export type CliMenuInteractiveServerMenuConfirmResponse = prompts.Answers<string>;

export type CliMenuInteractiveServerMenuConfirmed = boolean | undefined;

/**
 * CLI - Menu - Interactive - Settings Flow.
 *
 * @since 2.0.0
 */
export type CliMenuInteractiveSettingsFlowConfigPath = string;

export type CliMenuInteractiveSettingsFlowReturn = Promise<void>;

export type CliMenuInteractiveSettingsFlowCurrentSettings = LibSchemaSettingsConfig | undefined;

export type CliMenuInteractiveSettingsFlowErrorMessage = string;

export type CliMenuInteractiveSettingsFlowWorkerNameResponse = prompts.Answers<string>;

export type CliMenuInteractiveSettingsFlowWorkerNameValidateValue = string;

export type CliMenuInteractiveSettingsFlowWorkerName = string | undefined;

export type CliMenuInteractiveSettingsFlowBaseDomainResponse = prompts.Answers<string>;

export type CliMenuInteractiveSettingsFlowBaseDomainValidateValue = string;

export type CliMenuInteractiveSettingsFlowBaseDomain = string | undefined;

export type CliMenuInteractiveSettingsFlowShowResponseOutputResponse = prompts.Answers<string>;

export type CliMenuInteractiveSettingsFlowShowResponseOutput = boolean | undefined;

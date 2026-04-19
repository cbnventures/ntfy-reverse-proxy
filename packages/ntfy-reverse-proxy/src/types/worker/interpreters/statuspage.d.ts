import type {
  WorkerPipelineInterpretContext,
  WorkerPipelineInterpretInput,
  WorkerPipelineInterpretNotificationObjectPriority,
  WorkerPipelineInterpretResult,
} from '../pipeline/interpret.d.ts';
import type {
  WorkerPipelineSharedComponentDiff,
  WorkerPipelineSharedComponentsMap,
  WorkerPipelineSharedStoredState,
} from '../pipeline/shared.d.ts';

/**
 * Worker - Interpreters - Statuspage.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersStatuspageResult = WorkerPipelineInterpretResult;

export type WorkerInterpretersStatuspageInput = WorkerPipelineInterpretInput;

export type WorkerInterpretersStatuspageContext = WorkerPipelineInterpretContext;

export type WorkerInterpretersStatuspageInterpreter = (input: WorkerInterpretersStatuspageInput, context?: WorkerInterpretersStatuspageContext) => Promise<WorkerInterpretersStatuspageResult | null>;

/**
 * Worker - Interpreters - Statuspage - Build Incident Notification.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersStatuspageBuildIncidentNotificationServiceName = string;

export type WorkerInterpretersStatuspageBuildIncidentNotificationIncidentName = string;

export type WorkerInterpretersStatuspageBuildIncidentNotificationStatus = string;

export type WorkerInterpretersStatuspageBuildIncidentNotificationImpact = string;

export type WorkerInterpretersStatuspageBuildIncidentNotificationLatestBody = string | undefined;

export type WorkerInterpretersStatuspageBuildIncidentNotificationShortlink = string | undefined;

export type WorkerInterpretersStatuspageBuildIncidentNotificationUnsubscribeUrl = string | undefined;

export type WorkerInterpretersStatuspageBuildIncidentNotificationComponentLines = string[];

export type WorkerInterpretersStatuspageBuildIncidentNotificationIsTerminal = boolean;

export type WorkerInterpretersStatuspageBuildIncidentNotificationPriority = WorkerPipelineInterpretNotificationObjectPriority;

export type WorkerInterpretersStatuspageBuildIncidentNotificationHumanizedStatus = string;

export type WorkerInterpretersStatuspageBuildIncidentNotificationHumanizedImpact = string;

export type WorkerInterpretersStatuspageBuildIncidentNotificationEmojiTag = string;

export type WorkerInterpretersStatuspageBuildIncidentNotificationTags = string[];

export type WorkerInterpretersStatuspageBuildIncidentNotificationBodyLines = string[];

export type WorkerInterpretersStatuspageBuildIncidentNotificationLatestBodyJoined = string;

export type WorkerInterpretersStatuspageBuildIncidentNotificationComponentLinesJoined = string;

export type WorkerInterpretersStatuspageBuildIncidentNotificationBody = string;

export type WorkerInterpretersStatuspageBuildIncidentNotificationActions = string[];

/**
 * Worker - Interpreters - Statuspage - Extract Service Name.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersStatuspageExtractServiceNameUnsubscribeUrl = string | undefined;

export type WorkerInterpretersStatuspageExtractServiceNameReturns = string;

export type WorkerInterpretersStatuspageExtractServiceNameServiceName = string;

export type WorkerInterpretersStatuspageExtractServiceNameParsedUrl = URL;

export type WorkerInterpretersStatuspageExtractServiceNameHostname = string;

/**
 * Worker - Interpreters - Statuspage - Humanize Slug.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersStatuspageHumanizeSlugSlug = string;

export type WorkerInterpretersStatuspageHumanizeSlugReturns = string;

export type WorkerInterpretersStatuspageHumanizeSlugParts = string[];

export type WorkerInterpretersStatuspageHumanizeSlugCapitalized = string[];

/**
 * Worker - Interpreters - Statuspage - Interpreter.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersStatuspageInterpreterReturns = Promise<WorkerPipelineInterpretResult | null>;

export type WorkerInterpretersStatuspageInterpreterParsed = unknown;

export type WorkerInterpretersStatuspageInterpreterDecoder = TextDecoder;

export type WorkerInterpretersStatuspageInterpreterDecodedBody = string;

export type WorkerInterpretersStatuspageInterpreterData = Record<string, unknown>;

export type WorkerInterpretersStatuspageInterpreterMetaDefault = Record<string, unknown>;

export type WorkerInterpretersStatuspageInterpreterMetaRaw = unknown;

export type WorkerInterpretersStatuspageInterpreterMeta = Record<string, unknown>;

export type WorkerInterpretersStatuspageInterpreterUnsubscribeUrl = string | undefined;

export type WorkerInterpretersStatuspageInterpreterServiceName = string;

export type WorkerInterpretersStatuspageInterpreterPage = Record<string, unknown> | undefined;

export type WorkerInterpretersStatuspageInterpreterPageIdAvailable = boolean;

export type WorkerInterpretersStatuspageInterpreterPageId = string | undefined;

export type WorkerInterpretersStatuspageInterpreterKvAvailable = boolean;

export type WorkerInterpretersStatuspageInterpreterKv = KVNamespace | undefined;

export type WorkerInterpretersStatuspageInterpreterHasKv = boolean;

export type WorkerInterpretersStatuspageInterpreterKvMissing = boolean;

export type WorkerInterpretersStatuspageInterpreterExistingState = WorkerPipelineSharedStoredState | null;

export type WorkerInterpretersStatuspageInterpreterComponents = WorkerPipelineSharedComponentsMap;

export type WorkerInterpretersStatuspageInterpreterComponentUpdate = Record<string, unknown> | undefined;

export type WorkerInterpretersStatuspageInterpreterComponent = Record<string, unknown> | undefined;

export type WorkerInterpretersStatuspageInterpreterComponentId = string | undefined;

export type WorkerInterpretersStatuspageInterpreterComponentName = string | undefined;

export type WorkerInterpretersStatuspageInterpreterHasUpdateStatus = boolean;

export type WorkerInterpretersStatuspageInterpreterHasComponentStatus = boolean;

export type WorkerInterpretersStatuspageInterpreterComponentStatus = string | undefined;

export type WorkerInterpretersStatuspageInterpreterIncidentName = string;

export type WorkerInterpretersStatuspageInterpreterCanUpdate = boolean;

export type WorkerInterpretersStatuspageInterpreterUpdatedState = WorkerPipelineSharedStoredState;

export type WorkerInterpretersStatuspageInterpreterUpdateStatusValue = string | undefined;

export type WorkerInterpretersStatuspageInterpreterComponentStatusValue = string | undefined;

export type WorkerInterpretersStatuspageInterpreterIncident = Record<string, unknown>;

export type WorkerInterpretersStatuspageInterpreterStatus = string;

export type WorkerInterpretersStatuspageInterpreterImpact = string;

export type WorkerInterpretersStatuspageInterpreterShortlink = string | undefined;

export type WorkerInterpretersStatuspageInterpreterRawUpdates = unknown;

export type WorkerInterpretersStatuspageInterpreterIsUpdatesArray = boolean;

export type WorkerInterpretersStatuspageInterpreterUpdates = Array<Record<string, unknown>>;

export type WorkerInterpretersStatuspageInterpreterLatestUpdate = Record<string, unknown> | undefined;

export type WorkerInterpretersStatuspageInterpreterLatestBody = string | undefined;

export type WorkerInterpretersStatuspageInterpreterUpdateId = string | undefined;

export type WorkerInterpretersStatuspageInterpreterComponentLines = string[];

export type WorkerInterpretersStatuspageInterpreterIsDuplicate = boolean;

export type WorkerInterpretersStatuspageInterpreterPreviousComponents = WorkerPipelineSharedComponentsMap;

export type WorkerInterpretersStatuspageInterpreterCurrentComponents = WorkerPipelineSharedComponentsMap;

export type WorkerInterpretersStatuspageInterpreterAffectedComponents = Array<Record<string, unknown>> | undefined;

export type WorkerInterpretersStatuspageInterpreterIsAffectedArray = boolean;

export type WorkerInterpretersStatuspageInterpreterAffectedCode = string | undefined;

export type WorkerInterpretersStatuspageInterpreterAffectedName = string | undefined;

export type WorkerInterpretersStatuspageInterpreterAffectedNewStatus = string | undefined;

export type WorkerInterpretersStatuspageInterpreterCanUpdateAffected = boolean;

export type WorkerInterpretersStatuspageInterpreterDiff = WorkerPipelineSharedComponentDiff;

export type WorkerInterpretersStatuspageInterpreterIncidentId = string | undefined;

export type WorkerInterpretersStatuspageInterpreterNewState = WorkerPipelineSharedStoredState;

/**
 * Worker - Interpreters - Statuspage - Is Terminal Status.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersStatuspageIsTerminalStatusStatus = string;

export type WorkerInterpretersStatuspageIsTerminalStatusReturns = boolean;

export type WorkerInterpretersStatuspageIsTerminalStatusTerminal = string[];

export type WorkerInterpretersStatuspageIsTerminalStatusLowered = string;

/**
 * Worker - Interpreters - Statuspage - Map Impact To Priority.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersStatuspageMapImpactToPriorityImpact = string;

export type WorkerInterpretersStatuspageMapImpactToPriorityReturns = WorkerPipelineInterpretNotificationObjectPriority;

/**
 * Worker - Interpreters - Statuspage - Map Status To Emoji Tag.
 *
 * @since 2.0.0
 */
export type WorkerInterpretersStatuspageMapStatusToEmojiTagStatus = string;

export type WorkerInterpretersStatuspageMapStatusToEmojiTagReturns = string;

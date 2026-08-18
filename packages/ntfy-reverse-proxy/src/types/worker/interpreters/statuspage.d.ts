import type {
  Shared_StatusPage_ComponentDiff,
  Shared_StatusPage_ComponentState,
  Shared_StatusPage_StoredState,
} from '../../shared.d.ts';
import type {
  Worker_Pipeline_Interpret_Context,
  Worker_Pipeline_Interpret_Input,
  Worker_Pipeline_Interpret_NotificationObjectPriority,
  Worker_Pipeline_Interpret_Result,
} from '../pipeline/interpret.d.ts';

/**
 * Worker - Interpreters - Statuspage.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Statuspage_Result = Worker_Pipeline_Interpret_Result;

export type Worker_Interpreters_Statuspage_Input = Worker_Pipeline_Interpret_Input;

export type Worker_Interpreters_Statuspage_Context = Worker_Pipeline_Interpret_Context;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter = (input: Worker_Interpreters_Statuspage_Input, context?: Worker_Interpreters_Statuspage_Context) => Promise<Worker_Interpreters_Statuspage_Result | null>;

/**
 * Worker - Interpreters - Statuspage - Build Incident Notification.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Statuspage_BuildIncidentNotification_ServiceName = string;

export type Worker_Interpreters_Statuspage_BuildIncidentNotification_IncidentName = string;

export type Worker_Interpreters_Statuspage_BuildIncidentNotification_Status = string;

export type Worker_Interpreters_Statuspage_BuildIncidentNotification_Impact = string;

export type Worker_Interpreters_Statuspage_BuildIncidentNotification_LatestBody = string | undefined;

export type Worker_Interpreters_Statuspage_BuildIncidentNotification_Shortlink = string | undefined;

export type Worker_Interpreters_Statuspage_BuildIncidentNotification_UnsubscribeUrl = string | undefined;

export type Worker_Interpreters_Statuspage_BuildIncidentNotification_ComponentLines = string[];

export type Worker_Interpreters_Statuspage_BuildIncidentNotification_Returns = Worker_Pipeline_Interpret_Result;

export type Worker_Interpreters_Statuspage_BuildIncidentNotification_IsTerminal = boolean;

export type Worker_Interpreters_Statuspage_BuildIncidentNotification_Priority = 1 | 2 | 3 | 4 | 5;

export type Worker_Interpreters_Statuspage_BuildIncidentNotification_HumanizedStatus = string;

export type Worker_Interpreters_Statuspage_BuildIncidentNotification_HumanizedImpact = string;

export type Worker_Interpreters_Statuspage_BuildIncidentNotification_EmojiTag = string;

export type Worker_Interpreters_Statuspage_BuildIncidentNotification_Tags = string[];

export type Worker_Interpreters_Statuspage_BuildIncidentNotification_BodyLines = string[];

export type Worker_Interpreters_Statuspage_BuildIncidentNotification_LatestBodyJoined = string;

export type Worker_Interpreters_Statuspage_BuildIncidentNotification_ComponentLinesJoined = string;

export type Worker_Interpreters_Statuspage_BuildIncidentNotification_Body = string;

export type Worker_Interpreters_Statuspage_BuildIncidentNotification_Actions = string[];

export type Worker_Interpreters_Statuspage_BuildIncidentNotification_ValidatedShortlink = string | undefined;

export type Worker_Interpreters_Statuspage_BuildIncidentNotification_ValidatedUnsubscribeUrl = string | undefined;

/**
 * Worker - Interpreters - Statuspage - Extract Service Name.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Statuspage_ExtractServiceName_UnsubscribeUrl = string | undefined;

export type Worker_Interpreters_Statuspage_ExtractServiceName_Returns = string;

export type Worker_Interpreters_Statuspage_ExtractServiceName_ServiceName = string;

export type Worker_Interpreters_Statuspage_ExtractServiceName_ParsedUrl = URL;

export type Worker_Interpreters_Statuspage_ExtractServiceName_Hostname = string;

/**
 * Worker - Interpreters - Statuspage - Humanize Slug.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Statuspage_HumanizeSlug_Slug = string;

export type Worker_Interpreters_Statuspage_HumanizeSlug_Returns = string;

export type Worker_Interpreters_Statuspage_HumanizeSlug_Parts = string[];

export type Worker_Interpreters_Statuspage_HumanizeSlug_Capitalized = string[];

/**
 * Worker - Interpreters - Statuspage - Is Terminal Status.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Statuspage_IsTerminalStatus_Status = string;

export type Worker_Interpreters_Statuspage_IsTerminalStatus_Returns = boolean;

export type Worker_Interpreters_Statuspage_IsTerminalStatus_Terminal = string[];

export type Worker_Interpreters_Statuspage_IsTerminalStatus_Lowered = string;

/**
 * Worker - Interpreters - Statuspage - Map Impact To Priority.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Statuspage_MapImpactToPriority_Impact = string;

export type Worker_Interpreters_Statuspage_MapImpactToPriority_Returns = Worker_Pipeline_Interpret_NotificationObjectPriority;

/**
 * Worker - Interpreters - Statuspage - Map Status To Emoji Tag.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Statuspage_MapStatusToEmojiTag_Status = string;

export type Worker_Interpreters_Statuspage_MapStatusToEmojiTag_Returns = string;

/**
 * Worker - Interpreters - Statuspage - Statuspage Interpreter.
 *
 * @since 2.0.0
 */
export type Worker_Interpreters_Statuspage_StatuspageInterpreter_Returns = Promise<Worker_Pipeline_Interpret_Result | null>;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_Parsed = unknown;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_Decoder = TextDecoder;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_DecodedBody = string;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_Data = Record<string, unknown>;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_MetaDefault = Record<string, unknown>;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_MetaRaw = unknown;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_Meta = Record<string, unknown>;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_UnsubscribeUrl = string | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_ServiceName = string;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_Page = Record<string, unknown> | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_PageIdAvailable = boolean;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_PageId = string | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_KvAvailable = boolean;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_Kv = KVNamespace | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_HasKv = boolean;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_MissingComponentKv = boolean;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_ExistingComponentState = Shared_StatusPage_StoredState | null;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_Components = Record<string, Shared_StatusPage_ComponentState>;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_ComponentUpdate = Record<string, unknown> | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_Component = Record<string, unknown> | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_ComponentId = string | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_ComponentName = string | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_HasUpdateStatus = boolean;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_HasComponentStatus = boolean;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_ComponentStatus = string | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_IncidentName = string;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_CanUpdate = boolean;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_UpdatedState_IncidentId = string | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_UpdatedState_IncidentName = string | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_UpdatedState_Status = string | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_UpdatedState_Impact = string | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_UpdatedState_Body = string | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_UpdatedState_Shortlink = string | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_UpdatedState_ServiceName = string;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_UpdatedState_UnsubscribeUrl = string | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_UpdatedState_UpdateId = string | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_UpdatedState_Components = Record<string, Shared_StatusPage_ComponentState>;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_UpdatedState = {
  incidentId: Worker_Interpreters_Statuspage_StatuspageInterpreter_UpdatedState_IncidentId;
  incidentName: Worker_Interpreters_Statuspage_StatuspageInterpreter_UpdatedState_IncidentName;
  status: Worker_Interpreters_Statuspage_StatuspageInterpreter_UpdatedState_Status;
  impact: Worker_Interpreters_Statuspage_StatuspageInterpreter_UpdatedState_Impact;
  body: Worker_Interpreters_Statuspage_StatuspageInterpreter_UpdatedState_Body;
  shortlink: Worker_Interpreters_Statuspage_StatuspageInterpreter_UpdatedState_Shortlink;
  serviceName: Worker_Interpreters_Statuspage_StatuspageInterpreter_UpdatedState_ServiceName;
  unsubscribeUrl: Worker_Interpreters_Statuspage_StatuspageInterpreter_UpdatedState_UnsubscribeUrl;
  updateId: Worker_Interpreters_Statuspage_StatuspageInterpreter_UpdatedState_UpdateId;
  components: Worker_Interpreters_Statuspage_StatuspageInterpreter_UpdatedState_Components;
};

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_Incident = Record<string, unknown>;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_Status = string;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_Impact = string;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_Shortlink = string | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_RawUpdates = unknown;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_IsUpdatesArray = boolean;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_Updates = Array<Record<string, unknown>>;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_LatestUpdate = Record<string, unknown> | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_LatestBody = string | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_UpdateId = string | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_MissingIncidentKv = boolean;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_FallbackComponentLines = string[];

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_UnverifiedComponentLines = string[];

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_ExistingIncidentState = Shared_StatusPage_StoredState | null;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_IsDuplicate = boolean;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_PreviousComponents = Record<string, Shared_StatusPage_ComponentState>;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_CurrentComponents = Record<string, Shared_StatusPage_ComponentState>;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_AffectedComponents = Array<Record<string, unknown>> | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_IsAffectedArray = boolean;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_Code = string | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_Name = string | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_NewStatus = string | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_CanUpdateAffected = boolean;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_Diff = Array<Shared_StatusPage_ComponentDiff[number]>;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_ComponentLines = string[];

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_IncidentId = string | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_NewState_IncidentId = string | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_NewState_IncidentName = string;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_NewState_Status = string;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_NewState_Impact = string;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_NewState_Body = string | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_NewState_Shortlink = string | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_NewState_ServiceName = string;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_NewState_UnsubscribeUrl = string | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_NewState_UpdateId = string | undefined;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_NewState_Components = Record<string, Shared_StatusPage_ComponentState>;

export type Worker_Interpreters_Statuspage_StatuspageInterpreter_NewState = {
  incidentId: Worker_Interpreters_Statuspage_StatuspageInterpreter_NewState_IncidentId;
  incidentName: Worker_Interpreters_Statuspage_StatuspageInterpreter_NewState_IncidentName;
  status: Worker_Interpreters_Statuspage_StatuspageInterpreter_NewState_Status;
  impact: Worker_Interpreters_Statuspage_StatuspageInterpreter_NewState_Impact;
  body: Worker_Interpreters_Statuspage_StatuspageInterpreter_NewState_Body;
  shortlink: Worker_Interpreters_Statuspage_StatuspageInterpreter_NewState_Shortlink;
  serviceName: Worker_Interpreters_Statuspage_StatuspageInterpreter_NewState_ServiceName;
  unsubscribeUrl: Worker_Interpreters_Statuspage_StatuspageInterpreter_NewState_UnsubscribeUrl;
  updateId: Worker_Interpreters_Statuspage_StatuspageInterpreter_NewState_UpdateId;
  components: Worker_Interpreters_Statuspage_StatuspageInterpreter_NewState_Components;
};

/**
 * Worker - Interpreters - Statuspage - Validate Url.
 *
 * @since 2.1.0
 */
export type Worker_Interpreters_Statuspage_ValidateUrl_RawUrl = string;

export type Worker_Interpreters_Statuspage_ValidateUrl_Returns = string | undefined;

export type Worker_Interpreters_Statuspage_ValidateUrl_Url = URL;

export type Worker_Interpreters_Statuspage_ValidateUrl_Protocol = string;

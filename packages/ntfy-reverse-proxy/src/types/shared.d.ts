/**
 * Shared - Status Page - Component Diff Entry.
 *
 * @since 2.0.0
 */
export type Shared_StatusPage_ComponentDiffEntry_Name = string;

export type Shared_StatusPage_ComponentDiffEntry_NewStatus = string;

export type Shared_StatusPage_ComponentDiffEntry_OldStatus = string | undefined;

export type Shared_StatusPage_ComponentDiffEntry_Changed = boolean;

export type Shared_StatusPage_ComponentDiffEntry = {
  name: Shared_StatusPage_ComponentDiffEntry_Name;
  oldStatus: Shared_StatusPage_ComponentDiffEntry_OldStatus;
  newStatus: Shared_StatusPage_ComponentDiffEntry_NewStatus;
  changed: Shared_StatusPage_ComponentDiffEntry_Changed;
};

/**
 * Shared - Status Page - Component Diff.
 *
 * @since 2.0.0
 */
export type Shared_StatusPage_ComponentDiff = Shared_StatusPage_ComponentDiffEntry[];

/**
 * Shared - Status Page - Component State.
 *
 * @since 2.0.0
 */
export type Shared_StatusPage_ComponentState_Name = string;

export type Shared_StatusPage_ComponentState_Status = string;

export type Shared_StatusPage_ComponentState = {
  name: Shared_StatusPage_ComponentState_Name;
  status: Shared_StatusPage_ComponentState_Status;
};

/**
 * Shared - Status Page - Components Map.
 *
 * @since 2.0.0
 */
export type Shared_StatusPage_ComponentsMap = Record<string, Shared_StatusPage_ComponentState>;

/**
 * Shared - Status Page - Stored State.
 *
 * @since 2.0.0
 */
export type Shared_StatusPage_StoredState_IncidentId = string | undefined;

export type Shared_StatusPage_StoredState_IncidentName = string | undefined;

export type Shared_StatusPage_StoredState_Status = string | undefined;

export type Shared_StatusPage_StoredState_Impact = string | undefined;

export type Shared_StatusPage_StoredState_Body = string | undefined;

export type Shared_StatusPage_StoredState_Shortlink = string | undefined;

export type Shared_StatusPage_StoredState_ServiceName = string;

export type Shared_StatusPage_StoredState_UnsubscribeUrl = string | undefined;

export type Shared_StatusPage_StoredState_UpdateId = string | undefined;

export type Shared_StatusPage_StoredState_Components = Shared_StatusPage_ComponentsMap;

export type Shared_StatusPage_StoredState = {
  incidentId: Shared_StatusPage_StoredState_IncidentId;
  incidentName: Shared_StatusPage_StoredState_IncidentName;
  status: Shared_StatusPage_StoredState_Status;
  impact: Shared_StatusPage_StoredState_Impact;
  body: Shared_StatusPage_StoredState_Body;
  shortlink: Shared_StatusPage_StoredState_Shortlink;
  serviceName: Shared_StatusPage_StoredState_ServiceName;
  unsubscribeUrl: Shared_StatusPage_StoredState_UnsubscribeUrl;
  updateId: Shared_StatusPage_StoredState_UpdateId;
  components: Shared_StatusPage_StoredState_Components;
};

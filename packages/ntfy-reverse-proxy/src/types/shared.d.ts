/**
 * Shared - Status Page - Component Diff Entry.
 *
 * @since 2.0.0
 */
export type Shared_StatusPage_ComponentDiffEntry_Name = string;

export type Shared_StatusPage_ComponentDiffEntry_OldStatus = string | undefined;

export type Shared_StatusPage_ComponentDiffEntry_NewStatus = string;

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

/**
 * Shared - Cloudflare Zone.
 *
 * @since 2.5.0
 */
export type Shared_CloudflareZone_ZoneId = string;

export type Shared_CloudflareZone_AccountId = string;

export type Shared_CloudflareZone_ZoneName = string;

export type Shared_CloudflareZone = {
  zoneId: Shared_CloudflareZone_ZoneId;
  accountId: Shared_CloudflareZone_AccountId;
  zoneName: Shared_CloudflareZone_ZoneName;
};

/**
 * Shared - Cloudflare Kv Namespace.
 *
 * @since 2.5.0
 */
export type Shared_CloudflareKvNamespace_Id = string;

export type Shared_CloudflareKvNamespace_Title = string;

export type Shared_CloudflareKvNamespace = {
  id: Shared_CloudflareKvNamespace_Id;
  title: Shared_CloudflareKvNamespace_Title;
};

/**
 * Shared - Cloudflare Email Routing Rule.
 *
 * @since 2.5.0
 */
export type Shared_CloudflareEmailRoutingRule_Id = string;

export type Shared_CloudflareEmailRoutingRule_ToAddress = string;

export type Shared_CloudflareEmailRoutingRule_ToAddresses = Shared_CloudflareEmailRoutingRule_ToAddress[];

export type Shared_CloudflareEmailRoutingRule_WorkerName = string;

export type Shared_CloudflareEmailRoutingRule_WorkerNames = Shared_CloudflareEmailRoutingRule_WorkerName[];

export type Shared_CloudflareEmailRoutingRule = {
  id: Shared_CloudflareEmailRoutingRule_Id;
  toAddresses: Shared_CloudflareEmailRoutingRule_ToAddresses;
  workerNames: Shared_CloudflareEmailRoutingRule_WorkerNames;
};

/**
 * Shared - Cloudflare Worker Domain.
 *
 * @since 2.5.0
 */
export type Shared_CloudflareWorkerDomain_Hostname = string;

export type Shared_CloudflareWorkerDomain_WorkerName = string;

export type Shared_CloudflareWorkerDomain = {
  hostname: Shared_CloudflareWorkerDomain_Hostname;
  workerName: Shared_CloudflareWorkerDomain_WorkerName;
};

/**
 * Shared - Public DNS Record.
 *
 * @since 2.5.0
 */
export type Shared_PublicDnsRecord_Type = string;

export type Shared_PublicDnsRecord_Name = string;

export type Shared_PublicDnsRecord_Content = string | undefined;

export type Shared_PublicDnsRecord = {
  type: Shared_PublicDnsRecord_Type;
  name: Shared_PublicDnsRecord_Name;
  content: Shared_PublicDnsRecord_Content;
};

/**
 * Shared - Ntfy Message.
 *
 * @since 2.5.0
 */
export type Shared_NtfyMessage_Body = string;

export type Shared_NtfyMessage_Title = string | undefined;

export type Shared_NtfyMessage_Priority = number | undefined;

export type Shared_NtfyMessage_Tag = string;

export type Shared_NtfyMessage_Tags = Shared_NtfyMessage_Tag[] | undefined;

export type Shared_NtfyMessage_Markdown = boolean | undefined;

export type Shared_NtfyMessage_Icon = string | undefined;

export type Shared_NtfyMessage_Actions = string | undefined;

export type Shared_NtfyMessage_Attach = string | undefined;

export type Shared_NtfyMessage_Filename = string | undefined;

export type Shared_NtfyMessage = {
  body: Shared_NtfyMessage_Body;
  title?: Shared_NtfyMessage_Title;
  priority?: Shared_NtfyMessage_Priority;
  tags?: Shared_NtfyMessage_Tags;
  markdown?: Shared_NtfyMessage_Markdown;
  icon?: Shared_NtfyMessage_Icon;
  actions?: Shared_NtfyMessage_Actions;
  attach?: Shared_NtfyMessage_Attach;
  filename?: Shared_NtfyMessage_Filename;
};

/**
 * Shared - Ntfy Delivery.
 *
 * @since 2.5.0
 */
export type Shared_NtfyDelivery_Ok = boolean;

export type Shared_NtfyDelivery_Status = number;

export type Shared_NtfyDelivery = {
  ok: Shared_NtfyDelivery_Ok;
  status: Shared_NtfyDelivery_Status;
};

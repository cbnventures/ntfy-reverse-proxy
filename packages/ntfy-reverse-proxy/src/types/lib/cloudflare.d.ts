import type {
  Shared_CloudflareEmailRoutingRule,
  Shared_CloudflareKvNamespace,
  Shared_CloudflareWorkerDomain,
  Shared_CloudflareZone,
} from '../shared.d.ts';
import type {
  Lib_Schema_CloudflareEmailRoutingRules,
  Lib_Schema_CloudflareEnvelope,
  Lib_Schema_CloudflareKvNamespace,
  Lib_Schema_CloudflareKvNamespaces,
  Lib_Schema_CloudflareWorkerDomains,
  Lib_Schema_CloudflareZone,
  Lib_Schema_CloudflareZones,
} from './schema.d.ts';

/**
 * Lib - Cloudflare - Runner - Create Email Routing Rule.
 *
 * @since 2.5.0
 */
export type Lib_Cloudflare_Runner_CreateEmailRoutingRule_Token = string;

export type Lib_Cloudflare_Runner_CreateEmailRoutingRule_ZoneId = string;

export type Lib_Cloudflare_Runner_CreateEmailRoutingRule_Email = string;

export type Lib_Cloudflare_Runner_CreateEmailRoutingRule_Name = string;

export type Lib_Cloudflare_Runner_CreateEmailRoutingRule_WorkerName = string;

export type Lib_Cloudflare_Runner_CreateEmailRoutingRule_Returns = Promise<void>;

/**
 * Lib - Cloudflare - Runner - Create Kv Namespace.
 *
 * @since 2.5.0
 */
export type Lib_Cloudflare_Runner_CreateKvNamespace_Token = string;

export type Lib_Cloudflare_Runner_CreateKvNamespace_AccountId = string;

export type Lib_Cloudflare_Runner_CreateKvNamespace_Title = string;

export type Lib_Cloudflare_Runner_CreateKvNamespace_Returns = Promise<string>;

export type Lib_Cloudflare_Runner_CreateKvNamespace_Envelope = { [Key in keyof Lib_Schema_CloudflareEnvelope]: Lib_Schema_CloudflareEnvelope[Key] };

export type Lib_Cloudflare_Runner_CreateKvNamespace_Namespace = { [Key in keyof Lib_Schema_CloudflareKvNamespace]: Lib_Schema_CloudflareKvNamespace[Key] };

/**
 * Lib - Cloudflare - Runner - Delete Email Routing Rule.
 *
 * @since 2.5.0
 */
export type Lib_Cloudflare_Runner_DeleteEmailRoutingRule_Token = string;

export type Lib_Cloudflare_Runner_DeleteEmailRoutingRule_ZoneId = string;

export type Lib_Cloudflare_Runner_DeleteEmailRoutingRule_RuleId = string;

export type Lib_Cloudflare_Runner_DeleteEmailRoutingRule_Returns = Promise<void>;

/**
 * Lib - Cloudflare - Runner - Find Missing Permissions.
 *
 * @since 2.5.0
 */
export type Lib_Cloudflare_Runner_FindMissingPermissions_Token = string;

export type Lib_Cloudflare_Runner_FindMissingPermissions_ZoneId = string;

export type Lib_Cloudflare_Runner_FindMissingPermissions_AccountId = string;

export type Lib_Cloudflare_Runner_FindMissingPermissions_EmailRouting = boolean;

export type Lib_Cloudflare_Runner_FindMissingPermissions_Returns = Promise<Lib_Cloudflare_Runner_FindMissingPermissions_Missing>;

export type Lib_Cloudflare_Runner_FindMissingPermissions_HasWorkersScripts = boolean;

export type Lib_Cloudflare_Runner_FindMissingPermissions_HasWorkersRoutes = boolean;

export type Lib_Cloudflare_Runner_FindMissingPermissions_HasKvStorage = boolean;

export type Lib_Cloudflare_Runner_FindMissingPermissions_HasEmailRouting = boolean;

export type Lib_Cloudflare_Runner_FindMissingPermissions_Permission = string;

export type Lib_Cloudflare_Runner_FindMissingPermissions_Missing = Lib_Cloudflare_Runner_FindMissingPermissions_Permission[];

/**
 * Lib - Cloudflare - Runner - Find Zone.
 *
 * @since 2.5.0
 */
export type Lib_Cloudflare_Runner_FindZone_Token = string;

export type Lib_Cloudflare_Runner_FindZone_Name = string;

export type Lib_Cloudflare_Runner_FindZone_Returns = Promise<Shared_CloudflareZone | undefined>;

export type Lib_Cloudflare_Runner_FindZone_Response = Response;

export type Lib_Cloudflare_Runner_FindZone_Data = unknown;

export type Lib_Cloudflare_Runner_FindZone_Envelope = { [Key in keyof Lib_Schema_CloudflareEnvelope]: Lib_Schema_CloudflareEnvelope[Key] };

export type Lib_Cloudflare_Runner_FindZone_Zones = { [Key in keyof Lib_Schema_CloudflareZones]: Lib_Schema_CloudflareZones[Key] };

export type Lib_Cloudflare_Runner_FindZone_FirstZone = Lib_Schema_CloudflareZone | undefined;

/**
 * Lib - Cloudflare - Runner - Has Permission.
 *
 * @since 2.5.0
 */
export type Lib_Cloudflare_Runner_HasPermission_Token = string;

export type Lib_Cloudflare_Runner_HasPermission_Path = string;

export type Lib_Cloudflare_Runner_HasPermission_Returns = Promise<boolean>;

export type Lib_Cloudflare_Runner_HasPermission_Response = Response;

export type Lib_Cloudflare_Runner_HasPermission_Data = unknown;

export type Lib_Cloudflare_Runner_HasPermission_Envelope = { [Key in keyof Lib_Schema_CloudflareEnvelope]: Lib_Schema_CloudflareEnvelope[Key] };

/**
 * Lib - Cloudflare - Runner - Is Email Routing Mx Host.
 *
 * @since 2.5.0
 */
export type Lib_Cloudflare_Runner_IsEmailRoutingMxHost_Host = string;

export type Lib_Cloudflare_Runner_IsEmailRoutingMxHost_Returns = boolean;

export type Lib_Cloudflare_Runner_IsEmailRoutingMxHost_NormalizedHost = string;

/**
 * Lib - Cloudflare - Runner - List Email Routing Rules.
 *
 * @since 2.5.0
 */
export type Lib_Cloudflare_Runner_ListEmailRoutingRules_Token = string;

export type Lib_Cloudflare_Runner_ListEmailRoutingRules_ZoneId = string;

export type Lib_Cloudflare_Runner_ListEmailRoutingRules_Returns = Promise<Lib_Cloudflare_Runner_ListEmailRoutingRules_Rules>;

export type Lib_Cloudflare_Runner_ListEmailRoutingRules_Rules = Shared_CloudflareEmailRoutingRule[];

export type Lib_Cloudflare_Runner_ListEmailRoutingRules_Page = number;

export type Lib_Cloudflare_Runner_ListEmailRoutingRules_PageRules = { [Key in keyof Lib_Schema_CloudflareEmailRoutingRules]: Lib_Schema_CloudflareEmailRoutingRules[Key] };

export type Lib_Cloudflare_Runner_ListEmailRoutingRules_Envelope = { [Key in keyof Lib_Schema_CloudflareEnvelope]: Lib_Schema_CloudflareEnvelope[Key] };

/**
 * Lib - Cloudflare - Runner - List Kv Namespaces.
 *
 * @since 2.5.0
 */
export type Lib_Cloudflare_Runner_ListKvNamespaces_Token = string;

export type Lib_Cloudflare_Runner_ListKvNamespaces_AccountId = string;

export type Lib_Cloudflare_Runner_ListKvNamespaces_Returns = Promise<Lib_Cloudflare_Runner_ListKvNamespaces_Namespaces>;

export type Lib_Cloudflare_Runner_ListKvNamespaces_Namespaces = Shared_CloudflareKvNamespace[];

export type Lib_Cloudflare_Runner_ListKvNamespaces_Page = number;

export type Lib_Cloudflare_Runner_ListKvNamespaces_Cursor = string | undefined;

export type Lib_Cloudflare_Runner_ListKvNamespaces_HasMore = boolean;

export type Lib_Cloudflare_Runner_ListKvNamespaces_Path = string;

export type Lib_Cloudflare_Runner_ListKvNamespaces_Envelope = { [Key in keyof Lib_Schema_CloudflareEnvelope]: Lib_Schema_CloudflareEnvelope[Key] };

export type Lib_Cloudflare_Runner_ListKvNamespaces_PageNamespaces = { [Key in keyof Lib_Schema_CloudflareKvNamespaces]: Lib_Schema_CloudflareKvNamespaces[Key] };

export type Lib_Cloudflare_Runner_ListKvNamespaces_ResultInfoCursor = string | undefined;

/**
 * Lib - Cloudflare - Runner - List Worker Domains.
 *
 * @since 2.5.0
 */
export type Lib_Cloudflare_Runner_ListWorkerDomains_Token = string;

export type Lib_Cloudflare_Runner_ListWorkerDomains_AccountId = string;

export type Lib_Cloudflare_Runner_ListWorkerDomains_ZoneId = string;

export type Lib_Cloudflare_Runner_ListWorkerDomains_Returns = Promise<Shared_CloudflareWorkerDomain[]>;

export type Lib_Cloudflare_Runner_ListWorkerDomains_Envelope = { [Key in keyof Lib_Schema_CloudflareEnvelope]: Lib_Schema_CloudflareEnvelope[Key] };

export type Lib_Cloudflare_Runner_ListWorkerDomains_Domains = { [Key in keyof Lib_Schema_CloudflareWorkerDomains]: Lib_Schema_CloudflareWorkerDomains[Key] };

/**
 * Lib - Cloudflare - Runner - Send.
 *
 * @since 2.5.0
 */
export type Lib_Cloudflare_Runner_Send_Token = string;

export type Lib_Cloudflare_Runner_Send_Method = 'GET' | 'POST' | 'DELETE';

export type Lib_Cloudflare_Runner_Send_Path = string;

export type Lib_Cloudflare_Runner_Send_Body = Record<string, unknown> | undefined;

export type Lib_Cloudflare_Runner_Send_HttpAction = string;

export type Lib_Cloudflare_Runner_Send_ApiAction = string;

export type Lib_Cloudflare_Runner_Send_Returns = Promise<Lib_Schema_CloudflareEnvelope>;

export type Lib_Cloudflare_Runner_Send_Headers = Record<string, string>;

export type Lib_Cloudflare_Runner_Send_Response = Response;

export type Lib_Cloudflare_Runner_Send_ResponseData = unknown;

export type Lib_Cloudflare_Runner_Send_Envelope = { [Key in keyof Lib_Schema_CloudflareEnvelope]: Lib_Schema_CloudflareEnvelope[Key] };

export type Lib_Cloudflare_Runner_Send_ErrorDetails = string;

/**
 * Lib - Cloudflare - Runner - Verify Token.
 *
 * @since 2.5.0
 */
export type Lib_Cloudflare_Runner_VerifyToken_Token = string;

export type Lib_Cloudflare_Runner_VerifyToken_Returns = Promise<boolean>;

export type Lib_Cloudflare_Runner_VerifyToken_Response = Response;

export type Lib_Cloudflare_Runner_VerifyToken_Data = unknown;

export type Lib_Cloudflare_Runner_VerifyToken_Envelope = { [Key in keyof Lib_Schema_CloudflareEnvelope]: Lib_Schema_CloudflareEnvelope[Key] };

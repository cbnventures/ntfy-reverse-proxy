import {
  cloudflareEmailRoutingRulesSchema,
  cloudflareEnvelopeSchema,
  cloudflareKvNamespaceSchema,
  cloudflareKvNamespacesSchema,
  cloudflareWorkerDomainsSchema,
  cloudflareZonesSchema,
} from './schema.js';

import type {
  Lib_Cloudflare_Runner_CreateEmailRoutingRule_Email,
  Lib_Cloudflare_Runner_CreateEmailRoutingRule_Name,
  Lib_Cloudflare_Runner_CreateEmailRoutingRule_Returns,
  Lib_Cloudflare_Runner_CreateEmailRoutingRule_Token,
  Lib_Cloudflare_Runner_CreateEmailRoutingRule_WorkerName,
  Lib_Cloudflare_Runner_CreateEmailRoutingRule_ZoneId,
  Lib_Cloudflare_Runner_CreateKvNamespace_AccountId,
  Lib_Cloudflare_Runner_CreateKvNamespace_Envelope,
  Lib_Cloudflare_Runner_CreateKvNamespace_Namespace,
  Lib_Cloudflare_Runner_CreateKvNamespace_Returns,
  Lib_Cloudflare_Runner_CreateKvNamespace_Title,
  Lib_Cloudflare_Runner_CreateKvNamespace_Token,
  Lib_Cloudflare_Runner_DeleteEmailRoutingRule_Returns,
  Lib_Cloudflare_Runner_DeleteEmailRoutingRule_RuleId,
  Lib_Cloudflare_Runner_DeleteEmailRoutingRule_Token,
  Lib_Cloudflare_Runner_DeleteEmailRoutingRule_ZoneId,
  Lib_Cloudflare_Runner_FindMissingPermissions_AccountId,
  Lib_Cloudflare_Runner_FindMissingPermissions_EmailRouting,
  Lib_Cloudflare_Runner_FindMissingPermissions_HasEmailRouting,
  Lib_Cloudflare_Runner_FindMissingPermissions_HasKvStorage,
  Lib_Cloudflare_Runner_FindMissingPermissions_HasWorkersRoutes,
  Lib_Cloudflare_Runner_FindMissingPermissions_HasWorkersScripts,
  Lib_Cloudflare_Runner_FindMissingPermissions_Missing,
  Lib_Cloudflare_Runner_FindMissingPermissions_Returns,
  Lib_Cloudflare_Runner_FindMissingPermissions_Token,
  Lib_Cloudflare_Runner_FindMissingPermissions_ZoneId,
  Lib_Cloudflare_Runner_FindZone_Data,
  Lib_Cloudflare_Runner_FindZone_Envelope,
  Lib_Cloudflare_Runner_FindZone_FirstZone,
  Lib_Cloudflare_Runner_FindZone_Name,
  Lib_Cloudflare_Runner_FindZone_Response,
  Lib_Cloudflare_Runner_FindZone_Returns,
  Lib_Cloudflare_Runner_FindZone_Token,
  Lib_Cloudflare_Runner_FindZone_Zones,
  Lib_Cloudflare_Runner_HasPermission_Data,
  Lib_Cloudflare_Runner_HasPermission_Envelope,
  Lib_Cloudflare_Runner_HasPermission_Path,
  Lib_Cloudflare_Runner_HasPermission_Response,
  Lib_Cloudflare_Runner_HasPermission_Returns,
  Lib_Cloudflare_Runner_HasPermission_Token,
  Lib_Cloudflare_Runner_IsEmailRoutingMxHost_Host,
  Lib_Cloudflare_Runner_IsEmailRoutingMxHost_NormalizedHost,
  Lib_Cloudflare_Runner_IsEmailRoutingMxHost_Returns,
  Lib_Cloudflare_Runner_ListEmailRoutingRules_Envelope,
  Lib_Cloudflare_Runner_ListEmailRoutingRules_Page,
  Lib_Cloudflare_Runner_ListEmailRoutingRules_PageRules,
  Lib_Cloudflare_Runner_ListEmailRoutingRules_Returns,
  Lib_Cloudflare_Runner_ListEmailRoutingRules_Rules,
  Lib_Cloudflare_Runner_ListEmailRoutingRules_Token,
  Lib_Cloudflare_Runner_ListEmailRoutingRules_ZoneId,
  Lib_Cloudflare_Runner_ListKvNamespaces_AccountId,
  Lib_Cloudflare_Runner_ListKvNamespaces_Cursor,
  Lib_Cloudflare_Runner_ListKvNamespaces_Envelope,
  Lib_Cloudflare_Runner_ListKvNamespaces_HasMore,
  Lib_Cloudflare_Runner_ListKvNamespaces_Namespaces,
  Lib_Cloudflare_Runner_ListKvNamespaces_Page,
  Lib_Cloudflare_Runner_ListKvNamespaces_PageNamespaces,
  Lib_Cloudflare_Runner_ListKvNamespaces_Path,
  Lib_Cloudflare_Runner_ListKvNamespaces_ResultInfoCursor,
  Lib_Cloudflare_Runner_ListKvNamespaces_Returns,
  Lib_Cloudflare_Runner_ListKvNamespaces_Token,
  Lib_Cloudflare_Runner_ListWorkerDomains_AccountId,
  Lib_Cloudflare_Runner_ListWorkerDomains_Domains,
  Lib_Cloudflare_Runner_ListWorkerDomains_Envelope,
  Lib_Cloudflare_Runner_ListWorkerDomains_Returns,
  Lib_Cloudflare_Runner_ListWorkerDomains_Token,
  Lib_Cloudflare_Runner_ListWorkerDomains_ZoneId,
  Lib_Cloudflare_Runner_Send_ApiAction,
  Lib_Cloudflare_Runner_Send_Body,
  Lib_Cloudflare_Runner_Send_Envelope,
  Lib_Cloudflare_Runner_Send_ErrorDetails,
  Lib_Cloudflare_Runner_Send_Headers,
  Lib_Cloudflare_Runner_Send_HttpAction,
  Lib_Cloudflare_Runner_Send_Method,
  Lib_Cloudflare_Runner_Send_Path,
  Lib_Cloudflare_Runner_Send_Response,
  Lib_Cloudflare_Runner_Send_ResponseData,
  Lib_Cloudflare_Runner_Send_Returns,
  Lib_Cloudflare_Runner_Send_Token,
  Lib_Cloudflare_Runner_VerifyToken_Data,
  Lib_Cloudflare_Runner_VerifyToken_Envelope,
  Lib_Cloudflare_Runner_VerifyToken_Response,
  Lib_Cloudflare_Runner_VerifyToken_Returns,
  Lib_Cloudflare_Runner_VerifyToken_Token,
} from '../types/lib/cloudflare.d.ts';

/**
 * Lib - Cloudflare - API Base.
 *
 * Base URL for the Cloudflare v4 REST API that deploy uses for the token, the
 * zone, KV, Email Routing rules, and the Worker's custom domains.
 *
 * @since 2.5.0
 */
const CLOUDFLARE_API_BASE = 'https://api.cloudflare.com/client/v4';

/**
 * Lib - Cloudflare - Email Routing Mx Suffix.
 *
 * Cloudflare Email Routing's MX hosts all end with this name, such as
 * "route1.mx.cloudflare.net", so a domain's MX records show it is enabled.
 *
 * @since 2.5.0
 */
const EMAIL_ROUTING_MX_SUFFIX = '.mx.cloudflare.net';

/**
 * Lib - Cloudflare - Kv Page Size.
 *
 * Number of KV namespaces deploy asks for per page; a full page means the
 * cursor in the answer leads to another one.
 *
 * @since 2.5.0
 */
const KV_PAGE_SIZE = 100;

/**
 * Lib - Cloudflare - Rules Page Size.
 *
 * Number of Email Routing rules deploy asks for per page, so a short page tells
 * it the list has ended.
 *
 * @since 2.5.0
 */
const RULES_PAGE_SIZE = 50;

/**
 * Lib - Cloudflare.
 *
 * Client for the Cloudflare APIs deploy uses. URLs, the auth header, and request
 * and response shapes stay here, and deploy only sees project-owned shapes.
 *
 * @since 2.5.0
 */
export class Runner {
  /**
   * Lib - Cloudflare - Create Email Routing Rule.
   *
   * Adds a literal rule that sends one address to the Worker under the given
   * name. Throws with Cloudflare's details when it refuses.
   *
   * @param {Lib_Cloudflare_Runner_CreateEmailRoutingRule_Token}      token      - Token.
   * @param {Lib_Cloudflare_Runner_CreateEmailRoutingRule_ZoneId}     zoneId     - Zone id.
   * @param {Lib_Cloudflare_Runner_CreateEmailRoutingRule_Email}      email      - Email.
   * @param {Lib_Cloudflare_Runner_CreateEmailRoutingRule_Name}       name       - Name.
   * @param {Lib_Cloudflare_Runner_CreateEmailRoutingRule_WorkerName} workerName - Worker name.
   *
   * @returns {Lib_Cloudflare_Runner_CreateEmailRoutingRule_Returns}
   *
   * @since 2.5.0
   */
  public static async createEmailRoutingRule(token: Lib_Cloudflare_Runner_CreateEmailRoutingRule_Token, zoneId: Lib_Cloudflare_Runner_CreateEmailRoutingRule_ZoneId, email: Lib_Cloudflare_Runner_CreateEmailRoutingRule_Email, name: Lib_Cloudflare_Runner_CreateEmailRoutingRule_Name, workerName: Lib_Cloudflare_Runner_CreateEmailRoutingRule_WorkerName): Lib_Cloudflare_Runner_CreateEmailRoutingRule_Returns {
    await Runner.send(token, 'POST', `/zones/${zoneId}/email/routing/rules`, {
      matchers: [{
        type: 'literal',
        field: 'to',
        value: email,
      }],
      actions: [{
        type: 'worker',
        value: [workerName],
      }],
      name,
      enabled: true,
    }, `create email routing rule for "${email}"`, `create email routing rule for "${email}"`);

    return;
  }

  /**
   * Lib - Cloudflare - Create Kv Namespace.
   *
   * Creates a KV namespace with the given title and returns its ID. Throws with
   * Cloudflare's details when it refuses.
   *
   * @param {Lib_Cloudflare_Runner_CreateKvNamespace_Token}     token     - Token.
   * @param {Lib_Cloudflare_Runner_CreateKvNamespace_AccountId} accountId - Account id.
   * @param {Lib_Cloudflare_Runner_CreateKvNamespace_Title}     title     - Title.
   *
   * @returns {Lib_Cloudflare_Runner_CreateKvNamespace_Returns}
   *
   * @since 2.5.0
   */
  public static async createKvNamespace(token: Lib_Cloudflare_Runner_CreateKvNamespace_Token, accountId: Lib_Cloudflare_Runner_CreateKvNamespace_AccountId, title: Lib_Cloudflare_Runner_CreateKvNamespace_Title): Lib_Cloudflare_Runner_CreateKvNamespace_Returns {
    const envelope: Lib_Cloudflare_Runner_CreateKvNamespace_Envelope = await Runner.send(token, 'POST', `/accounts/${accountId}/storage/kv/namespaces`, { title }, 'create KV namespace', `create KV namespace "${title}"`);
    const namespace: Lib_Cloudflare_Runner_CreateKvNamespace_Namespace = cloudflareKvNamespaceSchema.parse(envelope['result']);

    return namespace['id'];
  }

  /**
   * Lib - Cloudflare - Delete Email Routing Rule.
   *
   * Removes one Email Routing rule by its ID. Throws with Cloudflare's details
   * when it refuses.
   *
   * @param {Lib_Cloudflare_Runner_DeleteEmailRoutingRule_Token}  token  - Token.
   * @param {Lib_Cloudflare_Runner_DeleteEmailRoutingRule_ZoneId} zoneId - Zone id.
   * @param {Lib_Cloudflare_Runner_DeleteEmailRoutingRule_RuleId} ruleId - Rule id.
   *
   * @returns {Lib_Cloudflare_Runner_DeleteEmailRoutingRule_Returns}
   *
   * @since 2.5.0
   */
  public static async deleteEmailRoutingRule(token: Lib_Cloudflare_Runner_DeleteEmailRoutingRule_Token, zoneId: Lib_Cloudflare_Runner_DeleteEmailRoutingRule_ZoneId, ruleId: Lib_Cloudflare_Runner_DeleteEmailRoutingRule_RuleId): Lib_Cloudflare_Runner_DeleteEmailRoutingRule_Returns {
    await Runner.send(token, 'DELETE', `/zones/${zoneId}/email/routing/rules/${ruleId}`, undefined, `delete email routing rule "${ruleId}"`, `delete email routing rule "${ruleId}"`);

    return;
  }

  /**
   * Lib - Cloudflare - Find Missing Permissions.
   *
   * Reads one endpoint per permission group deploy needs and names each group the
   * token can't reach. Email Routing is only checked when email contexts exist.
   *
   * @param {Lib_Cloudflare_Runner_FindMissingPermissions_Token}        token        - Token.
   * @param {Lib_Cloudflare_Runner_FindMissingPermissions_ZoneId}       zoneId       - Zone id.
   * @param {Lib_Cloudflare_Runner_FindMissingPermissions_AccountId}    accountId    - Account id.
   * @param {Lib_Cloudflare_Runner_FindMissingPermissions_EmailRouting} emailRouting - Email routing.
   *
   * @returns {Lib_Cloudflare_Runner_FindMissingPermissions_Returns}
   *
   * @since 2.5.0
   */
  public static async findMissingPermissions(token: Lib_Cloudflare_Runner_FindMissingPermissions_Token, zoneId: Lib_Cloudflare_Runner_FindMissingPermissions_ZoneId, accountId: Lib_Cloudflare_Runner_FindMissingPermissions_AccountId, emailRouting: Lib_Cloudflare_Runner_FindMissingPermissions_EmailRouting): Lib_Cloudflare_Runner_FindMissingPermissions_Returns {
    const hasWorkersScripts: Lib_Cloudflare_Runner_FindMissingPermissions_HasWorkersScripts = await Runner.hasPermission(token, `/accounts/${accountId}/workers/scripts`);
    const hasWorkersRoutes: Lib_Cloudflare_Runner_FindMissingPermissions_HasWorkersRoutes = await Runner.hasPermission(token, `/zones/${zoneId}/workers/routes`);
    const hasKvStorage: Lib_Cloudflare_Runner_FindMissingPermissions_HasKvStorage = await Runner.hasPermission(token, `/accounts/${accountId}/storage/kv/namespaces?per_page=1`);
    let hasEmailRouting: Lib_Cloudflare_Runner_FindMissingPermissions_HasEmailRouting = true;

    if (emailRouting === true) {
      try {
        await Runner.listEmailRoutingRules(token, zoneId);
      } catch {
        hasEmailRouting = false;
      }
    }

    const missing: Lib_Cloudflare_Runner_FindMissingPermissions_Missing = [];

    if (hasWorkersScripts === false) {
      missing.push('Account > Workers Scripts > Edit');
    }

    if (hasKvStorage === false) {
      missing.push('Account > Workers KV Storage > Edit');
    }

    if (hasWorkersRoutes === false) {
      missing.push('Zone > Workers Routes > Edit');
    }

    if (hasEmailRouting === false) {
      missing.push('Zone > Email Routing Rules > Edit');
    }

    return missing;
  }

  /**
   * Lib - Cloudflare - Find Zone.
   *
   * Looks up a zone by exact name and returns its IDs and name, or undefined when
   * Cloudflare refuses or has no such zone for the token.
   *
   * @param {Lib_Cloudflare_Runner_FindZone_Token} token - Token.
   * @param {Lib_Cloudflare_Runner_FindZone_Name}  name  - Name.
   *
   * @returns {Lib_Cloudflare_Runner_FindZone_Returns}
   *
   * @since 2.5.0
   */
  public static async findZone(token: Lib_Cloudflare_Runner_FindZone_Token, name: Lib_Cloudflare_Runner_FindZone_Name): Lib_Cloudflare_Runner_FindZone_Returns {
    const response: Lib_Cloudflare_Runner_FindZone_Response = await fetch(`${CLOUDFLARE_API_BASE}/zones?name=${name}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response['ok'] === false) {
      return undefined;
    }

    const data: Lib_Cloudflare_Runner_FindZone_Data = await response.json();
    const envelope: Lib_Cloudflare_Runner_FindZone_Envelope = cloudflareEnvelopeSchema.parse(data);

    if (envelope['success'] === false) {
      return undefined;
    }

    const zones: Lib_Cloudflare_Runner_FindZone_Zones = cloudflareZonesSchema.parse(envelope['result']);
    const firstZone: Lib_Cloudflare_Runner_FindZone_FirstZone = zones[0];

    if (firstZone === undefined) {
      return undefined;
    }

    return {
      zoneId: firstZone['id'],
      accountId: firstZone['account']['id'],
      zoneName: firstZone['name'],
    };
  }

  /**
   * Lib - Cloudflare - Is Email Routing Mx Host.
   *
   * Reports whether an MX host, as a public resolver returns it, belongs to
   * Cloudflare Email Routing.
   *
   * @param {Lib_Cloudflare_Runner_IsEmailRoutingMxHost_Host} host - Host.
   *
   * @returns {Lib_Cloudflare_Runner_IsEmailRoutingMxHost_Returns}
   *
   * @since 2.5.0
   */
  public static isEmailRoutingMxHost(host: Lib_Cloudflare_Runner_IsEmailRoutingMxHost_Host): Lib_Cloudflare_Runner_IsEmailRoutingMxHost_Returns {
    const normalizedHost: Lib_Cloudflare_Runner_IsEmailRoutingMxHost_NormalizedHost = host.trim().toLowerCase();

    return normalizedHost.endsWith(EMAIL_ROUTING_MX_SUFFIX) === true || normalizedHost.endsWith(`${EMAIL_ROUTING_MX_SUFFIX}.`) === true;
  }

  /**
   * Lib - Cloudflare - List Email Routing Rules.
   *
   * Reads every Email Routing rule on the zone, page by page, as the literal "to"
   * addresses each matches and the Workers it sends to. Failures throw.
   *
   * @param {Lib_Cloudflare_Runner_ListEmailRoutingRules_Token}  token  - Token.
   * @param {Lib_Cloudflare_Runner_ListEmailRoutingRules_ZoneId} zoneId - Zone id.
   *
   * @returns {Lib_Cloudflare_Runner_ListEmailRoutingRules_Returns}
   *
   * @since 2.5.0
   */
  public static async listEmailRoutingRules(token: Lib_Cloudflare_Runner_ListEmailRoutingRules_Token, zoneId: Lib_Cloudflare_Runner_ListEmailRoutingRules_ZoneId): Lib_Cloudflare_Runner_ListEmailRoutingRules_Returns {
    const rules: Lib_Cloudflare_Runner_ListEmailRoutingRules_Rules = [];
    let page: Lib_Cloudflare_Runner_ListEmailRoutingRules_Page = 1;
    let pageRules: Lib_Cloudflare_Runner_ListEmailRoutingRules_PageRules = [];

    do {
      const envelope: Lib_Cloudflare_Runner_ListEmailRoutingRules_Envelope = await Runner.send(token, 'GET', `/zones/${zoneId}/email/routing/rules?page=${String(page)}&per_page=${String(RULES_PAGE_SIZE)}`, undefined, 'list email routing rules', 'list email routing rules');

      pageRules = cloudflareEmailRoutingRulesSchema.parse(envelope['result']);

      for (const pageRule of pageRules) {
        rules.push({
          id: pageRule['tag'],
          toAddresses: pageRule['matchers'].filter((matcher) => matcher['type'] === 'literal' && matcher['field'] === 'to').flatMap((matcher) => matcher['value'] ?? []),
          workerNames: pageRule['actions'].filter((action) => action['type'] === 'worker').flatMap((action) => action['value'] ?? []),
        });
      }
      page += 1;
    } while (pageRules.length === RULES_PAGE_SIZE);

    return rules;
  }

  /**
   * Lib - Cloudflare - List Kv Namespaces.
   *
   * Reads every KV namespace on the account, following Cloudflare's cursor for
   * up to 100 pages. Failures throw with Cloudflare's details.
   *
   * @param {Lib_Cloudflare_Runner_ListKvNamespaces_Token}     token     - Token.
   * @param {Lib_Cloudflare_Runner_ListKvNamespaces_AccountId} accountId - Account id.
   *
   * @returns {Lib_Cloudflare_Runner_ListKvNamespaces_Returns}
   *
   * @since 2.5.0
   */
  public static async listKvNamespaces(token: Lib_Cloudflare_Runner_ListKvNamespaces_Token, accountId: Lib_Cloudflare_Runner_ListKvNamespaces_AccountId): Lib_Cloudflare_Runner_ListKvNamespaces_Returns {
    const namespaces: Lib_Cloudflare_Runner_ListKvNamespaces_Namespaces = [];
    let page: Lib_Cloudflare_Runner_ListKvNamespaces_Page = 1;
    let cursor: Lib_Cloudflare_Runner_ListKvNamespaces_Cursor = undefined;
    let hasMore: Lib_Cloudflare_Runner_ListKvNamespaces_HasMore = true;

    while (hasMore === true) {
      const path: Lib_Cloudflare_Runner_ListKvNamespaces_Path = (cursor !== undefined) ? `/accounts/${accountId}/storage/kv/namespaces?per_page=${String(KV_PAGE_SIZE)}&cursor=${cursor}` : `/accounts/${accountId}/storage/kv/namespaces?per_page=${String(KV_PAGE_SIZE)}`;
      const envelope: Lib_Cloudflare_Runner_ListKvNamespaces_Envelope = await Runner.send(token, 'GET', path, undefined, 'list KV namespaces', 'list KV namespaces');
      const pageNamespaces: Lib_Cloudflare_Runner_ListKvNamespaces_PageNamespaces = cloudflareKvNamespacesSchema.parse(envelope['result']);
      const resultInfoCursor: Lib_Cloudflare_Runner_ListKvNamespaces_ResultInfoCursor = (envelope['result_info'] !== undefined && envelope['result_info'] !== null) ? envelope['result_info']['cursor'] : undefined;

      namespaces.push(...pageNamespaces);

      hasMore = pageNamespaces.length >= KV_PAGE_SIZE
        && page < 100
        && resultInfoCursor !== undefined
        && resultInfoCursor !== '';
      cursor = resultInfoCursor;
      page += 1;
    }

    return namespaces;
  }

  /**
   * Lib - Cloudflare - List Worker Domains.
   *
   * Reads the zone's Workers custom domains as each hostname and the Worker it
   * belongs to. Throws with Cloudflare's details when it can't.
   *
   * @param {Lib_Cloudflare_Runner_ListWorkerDomains_Token}     token     - Token.
   * @param {Lib_Cloudflare_Runner_ListWorkerDomains_AccountId} accountId - Account id.
   * @param {Lib_Cloudflare_Runner_ListWorkerDomains_ZoneId}    zoneId    - Zone id.
   *
   * @returns {Lib_Cloudflare_Runner_ListWorkerDomains_Returns}
   *
   * @since 2.5.0
   */
  public static async listWorkerDomains(token: Lib_Cloudflare_Runner_ListWorkerDomains_Token, accountId: Lib_Cloudflare_Runner_ListWorkerDomains_AccountId, zoneId: Lib_Cloudflare_Runner_ListWorkerDomains_ZoneId): Lib_Cloudflare_Runner_ListWorkerDomains_Returns {
    const envelope: Lib_Cloudflare_Runner_ListWorkerDomains_Envelope = await Runner.send(token, 'GET', `/accounts/${accountId}/workers/domains?zone_id=${zoneId}`, undefined, 'list Workers custom domains', 'list Workers custom domains');
    const domains: Lib_Cloudflare_Runner_ListWorkerDomains_Domains = cloudflareWorkerDomainsSchema.parse(envelope['result']);

    return domains.map((domain) => ({
      hostname: domain['hostname'],
      workerName: domain['service'],
    }));
  }

  /**
   * Lib - Cloudflare - Verify Token.
   *
   * Calls the token verify endpoint and reports whether Cloudflare accepts the
   * token. Network and parsing failures count as an invalid token.
   *
   * @param {Lib_Cloudflare_Runner_VerifyToken_Token} token - Token.
   *
   * @returns {Lib_Cloudflare_Runner_VerifyToken_Returns}
   *
   * @since 2.5.0
   */
  public static async verifyToken(token: Lib_Cloudflare_Runner_VerifyToken_Token): Lib_Cloudflare_Runner_VerifyToken_Returns {
    try {
      const response: Lib_Cloudflare_Runner_VerifyToken_Response = await fetch(`${CLOUDFLARE_API_BASE}/user/tokens/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: Lib_Cloudflare_Runner_VerifyToken_Data = await response.json();
      const envelope: Lib_Cloudflare_Runner_VerifyToken_Envelope = cloudflareEnvelopeSchema.parse(data);

      return envelope['success'];
    } catch {
      return false;
    }
  }

  /**
   * Lib - Cloudflare - Has Permission.
   *
   * Reads one endpoint and reports whether Cloudflare answered with success.
   * Network and parsing failures count as a missing permission.
   *
   * @param {Lib_Cloudflare_Runner_HasPermission_Token} token - Token.
   * @param {Lib_Cloudflare_Runner_HasPermission_Path}  path  - Path.
   *
   * @private
   *
   * @returns {Lib_Cloudflare_Runner_HasPermission_Returns}
   *
   * @since 2.5.0
   */
  private static async hasPermission(token: Lib_Cloudflare_Runner_HasPermission_Token, path: Lib_Cloudflare_Runner_HasPermission_Path): Lib_Cloudflare_Runner_HasPermission_Returns {
    try {
      const response: Lib_Cloudflare_Runner_HasPermission_Response = await fetch(`${CLOUDFLARE_API_BASE}${path}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: Lib_Cloudflare_Runner_HasPermission_Data = await response.json();
      const envelope: Lib_Cloudflare_Runner_HasPermission_Envelope = cloudflareEnvelopeSchema.parse(data);

      return envelope['success'];
    } catch {
      return false;
    }
  }

  /**
   * Lib - Cloudflare - Send.
   *
   * Sends an authenticated request and returns the validated envelope. An HTTP
   * error throws "Failed to <action>: HTTP <status>", and a refusal its details.
   *
   * @param {Lib_Cloudflare_Runner_Send_Token}      token      - Token.
   * @param {Lib_Cloudflare_Runner_Send_Method}     method     - Method.
   * @param {Lib_Cloudflare_Runner_Send_Path}       path       - Path.
   * @param {Lib_Cloudflare_Runner_Send_Body}       body       - Body.
   * @param {Lib_Cloudflare_Runner_Send_HttpAction} httpAction - Http action.
   * @param {Lib_Cloudflare_Runner_Send_ApiAction}  apiAction  - Api action.
   *
   * @private
   *
   * @returns {Lib_Cloudflare_Runner_Send_Returns}
   *
   * @since 2.5.0
   */
  private static async send(token: Lib_Cloudflare_Runner_Send_Token, method: Lib_Cloudflare_Runner_Send_Method, path: Lib_Cloudflare_Runner_Send_Path, body: Lib_Cloudflare_Runner_Send_Body, httpAction: Lib_Cloudflare_Runner_Send_HttpAction, apiAction: Lib_Cloudflare_Runner_Send_ApiAction): Lib_Cloudflare_Runner_Send_Returns {
    const headers: Lib_Cloudflare_Runner_Send_Headers = {
      Authorization: `Bearer ${token}`,
      ...((body !== undefined) ? { 'Content-Type': 'application/json' } : {}),
    };
    const response: Lib_Cloudflare_Runner_Send_Response = await fetch(`${CLOUDFLARE_API_BASE}${path}`, {
      method,
      headers,
      ...((body !== undefined) ? { body: JSON.stringify(body) } : {}),
    });

    if (response['ok'] === false) {
      throw new Error(`Failed to ${httpAction}: HTTP ${String(response['status'])}`);
    }

    const responseData: Lib_Cloudflare_Runner_Send_ResponseData = await response.json();
    const envelope: Lib_Cloudflare_Runner_Send_Envelope = cloudflareEnvelopeSchema.parse(responseData);

    if (envelope['success'] === false) {
      let errorDetails: Lib_Cloudflare_Runner_Send_ErrorDetails = 'Unknown error';

      if (envelope['errors'] !== undefined && envelope['errors'] !== null) {
        errorDetails = envelope['errors'].map((error) => `${String(error['code'])}: ${error['message']}`).join(', ');
      }

      throw new Error(`Failed to ${apiAction}: ${errorDetails}`);
    }

    return envelope;
  }
}

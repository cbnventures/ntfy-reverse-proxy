import { LIB_REGEX_STATUSPAGE_LEADING_WWW } from '../../lib/regex.js';

import {
  diffComponents,
  formatComponentLines,
  readState,
  writeState,
} from '../pipeline/accumulate.js';

import type {
  Worker_Interpreters_Statuspage_BuildIncidentNotification_Actions,
  Worker_Interpreters_Statuspage_BuildIncidentNotification_Body,
  Worker_Interpreters_Statuspage_BuildIncidentNotification_BodyLines,
  Worker_Interpreters_Statuspage_BuildIncidentNotification_ComponentLines,
  Worker_Interpreters_Statuspage_BuildIncidentNotification_ComponentLinesJoined,
  Worker_Interpreters_Statuspage_BuildIncidentNotification_EmojiTag,
  Worker_Interpreters_Statuspage_BuildIncidentNotification_HumanizedImpact,
  Worker_Interpreters_Statuspage_BuildIncidentNotification_HumanizedStatus,
  Worker_Interpreters_Statuspage_BuildIncidentNotification_Impact,
  Worker_Interpreters_Statuspage_BuildIncidentNotification_IncidentName,
  Worker_Interpreters_Statuspage_BuildIncidentNotification_IsTerminal,
  Worker_Interpreters_Statuspage_BuildIncidentNotification_LatestBody,
  Worker_Interpreters_Statuspage_BuildIncidentNotification_LatestBodyJoined,
  Worker_Interpreters_Statuspage_BuildIncidentNotification_Priority,
  Worker_Interpreters_Statuspage_BuildIncidentNotification_Returns,
  Worker_Interpreters_Statuspage_BuildIncidentNotification_ServiceName,
  Worker_Interpreters_Statuspage_BuildIncidentNotification_Shortlink,
  Worker_Interpreters_Statuspage_BuildIncidentNotification_Status,
  Worker_Interpreters_Statuspage_BuildIncidentNotification_Tags,
  Worker_Interpreters_Statuspage_BuildIncidentNotification_UnsubscribeUrl,
  Worker_Interpreters_Statuspage_BuildIncidentNotification_ValidatedShortlink,
  Worker_Interpreters_Statuspage_BuildIncidentNotification_ValidatedUnsubscribeUrl,
  Worker_Interpreters_Statuspage_Context,
  Worker_Interpreters_Statuspage_ExtractServiceName_Hostname,
  Worker_Interpreters_Statuspage_ExtractServiceName_ParsedUrl,
  Worker_Interpreters_Statuspage_ExtractServiceName_Returns,
  Worker_Interpreters_Statuspage_ExtractServiceName_ServiceName,
  Worker_Interpreters_Statuspage_ExtractServiceName_UnsubscribeUrl,
  Worker_Interpreters_Statuspage_HumanizeSlug_Capitalized,
  Worker_Interpreters_Statuspage_HumanizeSlug_Parts,
  Worker_Interpreters_Statuspage_HumanizeSlug_Returns,
  Worker_Interpreters_Statuspage_HumanizeSlug_Slug,
  Worker_Interpreters_Statuspage_Input,
  Worker_Interpreters_Statuspage_IsTerminalStatus_Lowered,
  Worker_Interpreters_Statuspage_IsTerminalStatus_Returns,
  Worker_Interpreters_Statuspage_IsTerminalStatus_Status,
  Worker_Interpreters_Statuspage_IsTerminalStatus_Terminal,
  Worker_Interpreters_Statuspage_MapImpactToPriority_Impact,
  Worker_Interpreters_Statuspage_MapImpactToPriority_Returns,
  Worker_Interpreters_Statuspage_MapStatusToEmojiTag_Returns,
  Worker_Interpreters_Statuspage_MapStatusToEmojiTag_Status,
  Worker_Interpreters_Statuspage_StatuspageInterpreter,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_AffectedComponents,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_CanUpdate,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_CanUpdateAffected,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_Code,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_Component,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_ComponentId,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_ComponentLines,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_ComponentName,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_Components,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_ComponentStatus,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_ComponentUpdate,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_CurrentComponents,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_Data,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_DecodedBody,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_Decoder,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_Diff,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_ExistingComponentState,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_ExistingIncidentState,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_FallbackComponentLines,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_HasComponentStatus,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_HasKv,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_HasUpdateStatus,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_Impact,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_Incident,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_IncidentId,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_IncidentName,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_IsAffectedArray,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_IsDuplicate,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_IsUpdatesArray,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_Kv,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_KvAvailable,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_LatestBody,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_LatestUpdate,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_Meta,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_MetaDefault,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_MetaRaw,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_MissingComponentKv,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_MissingIncidentKv,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_Name,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_NewState,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_NewStatus,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_Page,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_PageId,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_PageIdAvailable,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_Parsed,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_PreviousComponents,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_RawUpdates,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_Returns,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_ServiceName,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_Shortlink,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_Status,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_UnsubscribeUrl,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_UnverifiedComponentLines,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_UpdatedState,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_UpdateId,
  Worker_Interpreters_Statuspage_StatuspageInterpreter_Updates,
  Worker_Interpreters_Statuspage_ValidateUrl_Protocol,
  Worker_Interpreters_Statuspage_ValidateUrl_RawUrl,
  Worker_Interpreters_Statuspage_ValidateUrl_Returns,
  Worker_Interpreters_Statuspage_ValidateUrl_Url,
} from '../../types/worker/interpreters/statuspage.d.ts';

/**
 * Worker - Interpreters - Statuspage - Map Impact To Priority.
 *
 * Converts a Statuspage incident impact level string into
 * the corresponding ntfy numeric priority value.
 *
 * @param {Worker_Interpreters_Statuspage_MapImpactToPriority_Impact} impact - Impact.
 *
 * @returns {Worker_Interpreters_Statuspage_MapImpactToPriority_Returns}
 *
 * @since 2.0.0
 */
function mapImpactToPriority(impact: Worker_Interpreters_Statuspage_MapImpactToPriority_Impact): Worker_Interpreters_Statuspage_MapImpactToPriority_Returns {
  switch (impact.toLowerCase()) {
    case 'critical': { return 5; }

    case 'major': { return 4; }

    case 'minor': { return 3; }

    case 'none':
    default: { return 2; }
  }
}

/**
 * Worker - Interpreters - Statuspage - Map Status To Emoji Tag.
 *
 * Converts a Statuspage incident status string into the
 * corresponding ntfy emoji shortcode for visual indicators.
 *
 * @param {Worker_Interpreters_Statuspage_MapStatusToEmojiTag_Status} status - Status.
 *
 * @returns {Worker_Interpreters_Statuspage_MapStatusToEmojiTag_Returns}
 *
 * @since 2.0.0
 */
function mapStatusToEmojiTag(status: Worker_Interpreters_Statuspage_MapStatusToEmojiTag_Status): Worker_Interpreters_Statuspage_MapStatusToEmojiTag_Returns {
  switch (status.toLowerCase()) {
    case 'investigating': { return 'mag'; }

    case 'identified': { return 'dart'; }

    case 'monitoring': { return 'eyes'; }

    case 'resolved': { return 'white_check_mark'; }

    case 'scheduled': { return 'calendar'; }

    case 'in_progress': { return 'hammer_and_wrench'; }

    case 'verifying': { return 'rotating_light'; }

    case 'completed': { return 'tada'; }

    default: { return 'bell'; }
  }
}

/**
 * Worker - Interpreters - Statuspage - Is Terminal Status.
 *
 * Checks whether the given status string represents a terminal
 * incident state such as resolved, completed, or postmortem.
 *
 * @param {Worker_Interpreters_Statuspage_IsTerminalStatus_Status} status - Status.
 *
 * @returns {Worker_Interpreters_Statuspage_IsTerminalStatus_Returns}
 *
 * @since 2.0.0
 */
function isTerminalStatus(status: Worker_Interpreters_Statuspage_IsTerminalStatus_Status): Worker_Interpreters_Statuspage_IsTerminalStatus_Returns {
  const terminal: Worker_Interpreters_Statuspage_IsTerminalStatus_Terminal = [
    'resolved',
    'completed',
    'postmortem',
  ];
  const lowered: Worker_Interpreters_Statuspage_IsTerminalStatus_Lowered = status.toLowerCase();
  return terminal.includes(lowered);
}

/**
 * Worker - Interpreters - Statuspage - Humanize Slug.
 *
 * Converts an underscore-separated slug string into a
 * human-readable title-cased label for display purposes.
 *
 * @param {Worker_Interpreters_Statuspage_HumanizeSlug_Slug} slug - Slug.
 *
 * @returns {Worker_Interpreters_Statuspage_HumanizeSlug_Returns}
 *
 * @since 2.0.0
 */
function humanizeSlug(slug: Worker_Interpreters_Statuspage_HumanizeSlug_Slug): Worker_Interpreters_Statuspage_HumanizeSlug_Returns {
  const parts: Worker_Interpreters_Statuspage_HumanizeSlug_Parts = slug.split('_');
  const capitalized: Worker_Interpreters_Statuspage_HumanizeSlug_Capitalized = parts.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalized.join(' ');
}

/**
 * Worker - Interpreters - Statuspage - Extract Service Name.
 *
 * Parses the unsubscribe URL hostname to determine which
 * service generated the Statuspage notification.
 *
 * @param {Worker_Interpreters_Statuspage_ExtractServiceName_UnsubscribeUrl} unsubscribeUrl - Unsubscribe url.
 *
 * @returns {Worker_Interpreters_Statuspage_ExtractServiceName_Returns}
 *
 * @since 2.0.0
 */
function extractServiceName(unsubscribeUrl: Worker_Interpreters_Statuspage_ExtractServiceName_UnsubscribeUrl): Worker_Interpreters_Statuspage_ExtractServiceName_Returns {
  let serviceName: Worker_Interpreters_Statuspage_ExtractServiceName_ServiceName = 'Statuspage';
  if (unsubscribeUrl !== undefined) {
    try {
      const parsedUrl: Worker_Interpreters_Statuspage_ExtractServiceName_ParsedUrl = new URL(unsubscribeUrl);
      const hostname: Worker_Interpreters_Statuspage_ExtractServiceName_Hostname = parsedUrl['hostname'];
      serviceName = hostname.replace(LIB_REGEX_STATUSPAGE_LEADING_WWW, '');
    } catch { /* Fall back to default. */ }
  }

  return serviceName;
}

/**
 * Worker - Interpreters - Statuspage - Validate URL.
 *
 * Validates and normalizes a URL string by parsing it with
 * the URL constructor, returning the normalized href on
 * success or undefined if the string is not a valid URL.
 *
 * @param {Worker_Interpreters_Statuspage_ValidateUrl_RawUrl} rawUrl - Raw url.
 *
 * @returns {Worker_Interpreters_Statuspage_ValidateUrl_Returns}
 *
 * @since 2.1.0
 */
function validateUrl(rawUrl: Worker_Interpreters_Statuspage_ValidateUrl_RawUrl): Worker_Interpreters_Statuspage_ValidateUrl_Returns {
  try {
    const url: Worker_Interpreters_Statuspage_ValidateUrl_Url = new URL(rawUrl);
    const protocol: Worker_Interpreters_Statuspage_ValidateUrl_Protocol = url['protocol'];

    if (protocol !== 'http:' && protocol !== 'https:') {
      return undefined;
    }

    return url.href;
  } catch {
    return undefined;
  }
}

/**
 * Worker - Interpreters - Statuspage - Build Incident Notification.
 *
 * Assembles a complete ntfy notification object from parsed
 * Statuspage incident data including status, impact, and components.
 *
 * @param {Worker_Interpreters_Statuspage_BuildIncidentNotification_ServiceName}     serviceName    - Service name.
 * @param {Worker_Interpreters_Statuspage_BuildIncidentNotification_IncidentName}    incidentName   - Incident name.
 * @param {Worker_Interpreters_Statuspage_BuildIncidentNotification_Status}          status         - Status.
 * @param {Worker_Interpreters_Statuspage_BuildIncidentNotification_Impact}          impact         - Impact.
 * @param {Worker_Interpreters_Statuspage_BuildIncidentNotification_LatestBody}      latestBody     - Latest body.
 * @param {Worker_Interpreters_Statuspage_BuildIncidentNotification_Shortlink}       shortlink      - Shortlink.
 * @param {Worker_Interpreters_Statuspage_BuildIncidentNotification_UnsubscribeUrl}  unsubscribeUrl - Unsubscribe url.
 * @param {Worker_Interpreters_Statuspage_BuildIncidentNotification_ComponentLines}  componentLines - Component lines.
 *
 * @returns {Worker_Interpreters_Statuspage_BuildIncidentNotification_Returns}
 *
 * @since 2.0.0
 */
function buildIncidentNotification(serviceName: Worker_Interpreters_Statuspage_BuildIncidentNotification_ServiceName, incidentName: Worker_Interpreters_Statuspage_BuildIncidentNotification_IncidentName, status: Worker_Interpreters_Statuspage_BuildIncidentNotification_Status, impact: Worker_Interpreters_Statuspage_BuildIncidentNotification_Impact, latestBody: Worker_Interpreters_Statuspage_BuildIncidentNotification_LatestBody, shortlink: Worker_Interpreters_Statuspage_BuildIncidentNotification_Shortlink, unsubscribeUrl: Worker_Interpreters_Statuspage_BuildIncidentNotification_UnsubscribeUrl, componentLines: Worker_Interpreters_Statuspage_BuildIncidentNotification_ComponentLines): Worker_Interpreters_Statuspage_BuildIncidentNotification_Returns {
  const isTerminal: Worker_Interpreters_Statuspage_BuildIncidentNotification_IsTerminal = isTerminalStatus(status);
  const priority: Worker_Interpreters_Statuspage_BuildIncidentNotification_Priority = (isTerminal === true) ? 2 : mapImpactToPriority(impact);
  const humanizedStatus: Worker_Interpreters_Statuspage_BuildIncidentNotification_HumanizedStatus = humanizeSlug(status);
  const humanizedImpact: Worker_Interpreters_Statuspage_BuildIncidentNotification_HumanizedImpact = humanizeSlug(impact);
  const emojiTag: Worker_Interpreters_Statuspage_BuildIncidentNotification_EmojiTag = mapStatusToEmojiTag(status);
  const tags: Worker_Interpreters_Statuspage_BuildIncidentNotification_Tags = [
    'statuspage',
    status.toLowerCase(),
    emojiTag,
  ];
  const bodyLines: Worker_Interpreters_Statuspage_BuildIncidentNotification_BodyLines = [
    `**Status:** ${humanizedStatus}`,
    `**Impact:** ${humanizedImpact}`,
  ];

  if (latestBody !== undefined) {
    const latestBodyJoined: Worker_Interpreters_Statuspage_BuildIncidentNotification_LatestBodyJoined = [
      '',
      `> ${latestBody}`,
    ].join('\n');

    bodyLines.push(latestBodyJoined);
  }

  if (componentLines.length > 0) {
    const componentLinesJoined: Worker_Interpreters_Statuspage_BuildIncidentNotification_ComponentLinesJoined = [
      '',
      '**Affected:**',
      componentLines.join('\n'),
    ].join('\n');

    bodyLines.push(componentLinesJoined);
  }

  const body: Worker_Interpreters_Statuspage_BuildIncidentNotification_Body = bodyLines.join('\n');
  const actions: Worker_Interpreters_Statuspage_BuildIncidentNotification_Actions = [];
  const validatedShortlink: Worker_Interpreters_Statuspage_BuildIncidentNotification_ValidatedShortlink = (shortlink !== undefined) ? validateUrl(shortlink) : undefined;
  if (validatedShortlink !== undefined) {
    actions.push(`view, View Incident, ${validatedShortlink}`);
  }

  const validatedUnsubscribeUrl: Worker_Interpreters_Statuspage_BuildIncidentNotification_ValidatedUnsubscribeUrl = (unsubscribeUrl !== undefined) ? validateUrl(unsubscribeUrl) : undefined;
  if (validatedUnsubscribeUrl !== undefined) {
    actions.push(`view, Unsubscribe, ${validatedUnsubscribeUrl}`);
  }

  return {
    notification: {
      title: `[${serviceName}] ${incidentName}`,
      body,
      priority,
      tags,
      markdown: true,
      ...((actions.length > 0) ? { actions: actions.join('; ') } : {}),
    },
  };
}

/**
 * Worker - Interpreters - Statuspage - Interpreter.
 *
 * Parses Statuspage webhook and email payloads and builds
 * structured ntfy notifications with component tracking via KV.
 *
 * @param {Worker_Interpreters_Statuspage_Input}    input   - Input.
 * @param {Worker_Interpreters_Statuspage_Context} [context] - Optional context with KV.
 *
 * @returns {Worker_Interpreters_Statuspage_StatuspageInterpreter_Returns}
 *
 * @since 2.0.0
 */
const statuspageInterpreter: Worker_Interpreters_Statuspage_StatuspageInterpreter = async (input: Worker_Interpreters_Statuspage_Input, context?: Worker_Interpreters_Statuspage_Context): Worker_Interpreters_Statuspage_StatuspageInterpreter_Returns => {
  let parsed: Worker_Interpreters_Statuspage_StatuspageInterpreter_Parsed = undefined;
  if (typeof input === 'string') {
    try {
      parsed = JSON.parse(input);
    } catch {
      return null;
    }
  } else if (input instanceof ArrayBuffer) {
    const decoder: Worker_Interpreters_Statuspage_StatuspageInterpreter_Decoder = new TextDecoder('utf-8');
    const decodedBody: Worker_Interpreters_Statuspage_StatuspageInterpreter_DecodedBody = decoder.decode(input);

    try {
      parsed = JSON.parse(decodedBody);
    } catch {
      return null;
    }
  } else {
    parsed = input;
  }

  const data: Worker_Interpreters_Statuspage_StatuspageInterpreter_Data = parsed as Worker_Interpreters_Statuspage_StatuspageInterpreter_Data;
  const metaDefault: Worker_Interpreters_Statuspage_StatuspageInterpreter_MetaDefault = {};
  const metaRaw: Worker_Interpreters_Statuspage_StatuspageInterpreter_MetaRaw = data['meta'];
  const meta: Worker_Interpreters_Statuspage_StatuspageInterpreter_Meta = (metaRaw !== undefined && metaRaw !== null) ? metaRaw as Worker_Interpreters_Statuspage_StatuspageInterpreter_Meta : metaDefault;
  const unsubscribeUrl: Worker_Interpreters_Statuspage_StatuspageInterpreter_UnsubscribeUrl = (typeof meta['unsubscribe'] === 'string') ? meta['unsubscribe'] : undefined;
  const serviceName: Worker_Interpreters_Statuspage_StatuspageInterpreter_ServiceName = extractServiceName(unsubscribeUrl);
  const page: Worker_Interpreters_Statuspage_StatuspageInterpreter_Page = data['page'] as Worker_Interpreters_Statuspage_StatuspageInterpreter_Page;
  const pageIdAvailable: Worker_Interpreters_Statuspage_StatuspageInterpreter_PageIdAvailable = page !== undefined
    && page !== null
    && typeof page['id'] === 'string';
  const pageId: Worker_Interpreters_Statuspage_StatuspageInterpreter_PageId = (pageIdAvailable === true && page !== undefined) ? page['id'] as Worker_Interpreters_Statuspage_StatuspageInterpreter_ServiceName : undefined;
  const kvAvailable: Worker_Interpreters_Statuspage_StatuspageInterpreter_KvAvailable = context !== undefined && context !== null;
  const kv: Worker_Interpreters_Statuspage_StatuspageInterpreter_Kv = (kvAvailable === true && context !== undefined) ? context['kv'] : undefined;
  const hasKv: Worker_Interpreters_Statuspage_StatuspageInterpreter_HasKv = kv !== undefined && pageId !== undefined;
  if ('component_update' in data && !('incident' in data)) {
    const missingComponentKv: Worker_Interpreters_Statuspage_StatuspageInterpreter_MissingComponentKv = hasKv === false
      || kv === undefined
      || pageId === undefined;
    if (missingComponentKv === true) {
      return null;
    }

    if (kv === undefined || pageId === undefined) {
      return null;
    }

    const existingComponentState: Worker_Interpreters_Statuspage_StatuspageInterpreter_ExistingComponentState = await readState(kv, pageId);
    const components: Worker_Interpreters_Statuspage_StatuspageInterpreter_Components = (existingComponentState !== null) ? { ...existingComponentState['components'] } : {};
    const componentUpdate: Worker_Interpreters_Statuspage_StatuspageInterpreter_ComponentUpdate = data['component_update'] as Worker_Interpreters_Statuspage_StatuspageInterpreter_ComponentUpdate;
    const component: Worker_Interpreters_Statuspage_StatuspageInterpreter_Component = data['component'] as Worker_Interpreters_Statuspage_StatuspageInterpreter_Component;
    const componentId: Worker_Interpreters_Statuspage_StatuspageInterpreter_ComponentId = (
      component !== undefined
      && component !== null
      && typeof component['id'] === 'string'
    ) ? component['id'] : undefined;
    const componentName: Worker_Interpreters_Statuspage_StatuspageInterpreter_ComponentName = (
      component !== undefined
      && component !== null
      && typeof component['name'] === 'string'
    ) ? component['name'] : undefined;
    const hasUpdateStatus: Worker_Interpreters_Statuspage_StatuspageInterpreter_HasUpdateStatus = componentUpdate !== undefined
      && componentUpdate !== null
      && typeof componentUpdate['new_status'] === 'string';
    const hasComponentStatus: Worker_Interpreters_Statuspage_StatuspageInterpreter_HasComponentStatus = component !== undefined
      && component !== null
      && typeof component['status'] === 'string';
    let componentStatus: Worker_Interpreters_Statuspage_StatuspageInterpreter_ComponentStatus = undefined;
    if (hasUpdateStatus === true && componentUpdate !== undefined) {
      componentStatus = componentUpdate['new_status'] as Worker_Interpreters_Statuspage_StatuspageInterpreter_IncidentName;
    } else if (hasComponentStatus === true && component !== undefined) {
      componentStatus = component['status'] as Worker_Interpreters_Statuspage_StatuspageInterpreter_IncidentName;
    }

    const canUpdate: Worker_Interpreters_Statuspage_StatuspageInterpreter_CanUpdate = componentId !== undefined
      && componentName !== undefined
      && componentStatus !== undefined;
    if (canUpdate === true
      && componentId !== undefined
      && componentName !== undefined
      && componentStatus !== undefined) {
      Reflect.set(components, componentId, {
        name: componentName,
        status: componentStatus,
      });
    }

    const updatedState: Worker_Interpreters_Statuspage_StatuspageInterpreter_UpdatedState = (existingComponentState !== null) ? {
      ...existingComponentState,
      components,
    } : {
      incidentId: undefined,
      incidentName: undefined,
      status: undefined,
      impact: undefined,
      body: undefined,
      shortlink: undefined,
      serviceName,
      unsubscribeUrl,
      updateId: undefined,
      components,
    };

    await writeState(kv, pageId, updatedState);

    return null;
  }

  if ('incident' in data) {
    const incident: Worker_Interpreters_Statuspage_StatuspageInterpreter_Incident = data['incident'] as Worker_Interpreters_Statuspage_StatuspageInterpreter_Incident;
    const incidentName: Worker_Interpreters_Statuspage_StatuspageInterpreter_IncidentName = (incident !== null && typeof incident['name'] === 'string') ? incident['name'] : 'Incident';
    const status: Worker_Interpreters_Statuspage_StatuspageInterpreter_Status = (incident !== null && typeof incident['status'] === 'string') ? incident['status'] : 'unknown';
    const impact: Worker_Interpreters_Statuspage_StatuspageInterpreter_Impact = (incident !== null && typeof incident['impact'] === 'string') ? incident['impact'] : 'none';
    const shortlink: Worker_Interpreters_Statuspage_StatuspageInterpreter_Shortlink = (incident !== null && typeof incident['shortlink'] === 'string') ? incident['shortlink'] : undefined;
    const rawUpdates: Worker_Interpreters_Statuspage_StatuspageInterpreter_RawUpdates = (incident !== null) ? incident['incident_updates'] : undefined;
    const isUpdatesArray: Worker_Interpreters_Statuspage_StatuspageInterpreter_IsUpdatesArray = Array.isArray(rawUpdates);
    const updates: Worker_Interpreters_Statuspage_StatuspageInterpreter_Updates = (isUpdatesArray === true) ? (rawUpdates as Worker_Interpreters_Statuspage_StatuspageInterpreter_Updates) : [];
    const latestUpdate: Worker_Interpreters_Statuspage_StatuspageInterpreter_LatestUpdate = updates[0];
    const latestBody: Worker_Interpreters_Statuspage_StatuspageInterpreter_LatestBody = (latestUpdate !== undefined && typeof latestUpdate['body'] === 'string') ? latestUpdate['body'] : undefined;
    const updateId: Worker_Interpreters_Statuspage_StatuspageInterpreter_UpdateId = (latestUpdate !== undefined && typeof latestUpdate['id'] === 'string') ? latestUpdate['id'] : undefined;
    const missingIncidentKv: Worker_Interpreters_Statuspage_StatuspageInterpreter_MissingIncidentKv = hasKv === false
      || kv === undefined
      || pageId === undefined;
    if (missingIncidentKv === true) {
      const fallbackComponentLines: Worker_Interpreters_Statuspage_StatuspageInterpreter_FallbackComponentLines = [];
      return buildIncidentNotification(serviceName, incidentName, status, impact, latestBody, shortlink, unsubscribeUrl, fallbackComponentLines);
    }

    if (kv === undefined || pageId === undefined) {
      const unverifiedComponentLines: Worker_Interpreters_Statuspage_StatuspageInterpreter_UnverifiedComponentLines = [];
      return buildIncidentNotification(serviceName, incidentName, status, impact, latestBody, shortlink, unsubscribeUrl, unverifiedComponentLines);
    }

    const existingIncidentState: Worker_Interpreters_Statuspage_StatuspageInterpreter_ExistingIncidentState = await readState(kv, pageId);
    const isDuplicate: Worker_Interpreters_Statuspage_StatuspageInterpreter_IsDuplicate = existingIncidentState !== null
      && updateId !== undefined
      && existingIncidentState['updateId'] === updateId;
    if (isDuplicate === true) {
      return null;
    }

    const previousComponents: Worker_Interpreters_Statuspage_StatuspageInterpreter_PreviousComponents = (existingIncidentState !== null) ? { ...existingIncidentState['components'] } : {};
    const currentComponents: Worker_Interpreters_Statuspage_StatuspageInterpreter_CurrentComponents = { ...previousComponents };
    if (latestUpdate !== undefined) {
      const affectedComponents: Worker_Interpreters_Statuspage_StatuspageInterpreter_AffectedComponents = latestUpdate['affected_components'] as Worker_Interpreters_Statuspage_StatuspageInterpreter_AffectedComponents;
      const isAffectedArray: Worker_Interpreters_Statuspage_StatuspageInterpreter_IsAffectedArray = Array.isArray(affectedComponents);
      if (isAffectedArray === true && affectedComponents !== undefined) {
        for (const affected of affectedComponents) {
          const code: Worker_Interpreters_Statuspage_StatuspageInterpreter_Code = (typeof affected['code'] === 'string') ? affected['code'] : undefined;
          const name: Worker_Interpreters_Statuspage_StatuspageInterpreter_Name = (typeof affected['name'] === 'string') ? affected['name'] : undefined;
          const newStatus: Worker_Interpreters_Statuspage_StatuspageInterpreter_NewStatus = (typeof affected['new_status'] === 'string') ? affected['new_status'] : undefined;
          const canUpdateAffected: Worker_Interpreters_Statuspage_StatuspageInterpreter_CanUpdateAffected = code !== undefined
            && name !== undefined
            && newStatus !== undefined;
          if (canUpdateAffected === true
            && code !== undefined
            && name !== undefined
            && newStatus !== undefined) {
            Reflect.set(currentComponents, code, {
              name,
              status: newStatus,
            });
          }
        }
      }
    }

    const diff: Worker_Interpreters_Statuspage_StatuspageInterpreter_Diff = diffComponents(previousComponents, currentComponents);
    const componentLines: Worker_Interpreters_Statuspage_StatuspageInterpreter_ComponentLines = formatComponentLines(diff);
    const incidentId: Worker_Interpreters_Statuspage_StatuspageInterpreter_IncidentId = (typeof incident['id'] === 'string') ? incident['id'] : undefined;
    const newState: Worker_Interpreters_Statuspage_StatuspageInterpreter_NewState = {
      incidentId,
      incidentName,
      status,
      impact,
      body: latestBody,
      shortlink,
      serviceName,
      unsubscribeUrl,
      updateId,
      components: currentComponents,
    };

    await writeState(kv, pageId, newState);
    return buildIncidentNotification(serviceName, incidentName, status, impact, latestBody, shortlink, unsubscribeUrl, componentLines);
  }

  throw new Error('Unrecognized Statuspage.io payload: expected "incident" field');
};

export {
  statuspageInterpreter,
};

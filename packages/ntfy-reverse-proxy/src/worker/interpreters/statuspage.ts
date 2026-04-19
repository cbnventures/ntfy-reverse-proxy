import { LIB_REGEX_STATUSPAGE_LEADING_WWW } from '../../lib/regex.js';

import {
  diffComponents,
  formatComponentLines,
  readState,
  writeState,
} from '../pipeline/accumulate.js';

import type {
  WorkerInterpretersStatuspageBuildIncidentNotificationActions,
  WorkerInterpretersStatuspageBuildIncidentNotificationBody,
  WorkerInterpretersStatuspageBuildIncidentNotificationBodyLines,
  WorkerInterpretersStatuspageBuildIncidentNotificationComponentLines,
  WorkerInterpretersStatuspageBuildIncidentNotificationComponentLinesJoined,
  WorkerInterpretersStatuspageBuildIncidentNotificationEmojiTag,
  WorkerInterpretersStatuspageBuildIncidentNotificationHumanizedImpact,
  WorkerInterpretersStatuspageBuildIncidentNotificationHumanizedStatus,
  WorkerInterpretersStatuspageBuildIncidentNotificationImpact,
  WorkerInterpretersStatuspageBuildIncidentNotificationIncidentName,
  WorkerInterpretersStatuspageBuildIncidentNotificationIsTerminal,
  WorkerInterpretersStatuspageBuildIncidentNotificationLatestBody,
  WorkerInterpretersStatuspageBuildIncidentNotificationLatestBodyJoined,
  WorkerInterpretersStatuspageBuildIncidentNotificationPriority,
  WorkerInterpretersStatuspageBuildIncidentNotificationServiceName,
  WorkerInterpretersStatuspageBuildIncidentNotificationShortlink,
  WorkerInterpretersStatuspageBuildIncidentNotificationStatus,
  WorkerInterpretersStatuspageBuildIncidentNotificationTags,
  WorkerInterpretersStatuspageBuildIncidentNotificationUnsubscribeUrl,
  WorkerInterpretersStatuspageContext,
  WorkerInterpretersStatuspageExtractServiceNameHostname,
  WorkerInterpretersStatuspageExtractServiceNameParsedUrl,
  WorkerInterpretersStatuspageExtractServiceNameReturns,
  WorkerInterpretersStatuspageExtractServiceNameServiceName,
  WorkerInterpretersStatuspageExtractServiceNameUnsubscribeUrl,
  WorkerInterpretersStatuspageHumanizeSlugCapitalized,
  WorkerInterpretersStatuspageHumanizeSlugParts,
  WorkerInterpretersStatuspageHumanizeSlugReturns,
  WorkerInterpretersStatuspageHumanizeSlugSlug,
  WorkerInterpretersStatuspageInput,
  WorkerInterpretersStatuspageInterpreter,
  WorkerInterpretersStatuspageInterpreterAffectedCode,
  WorkerInterpretersStatuspageInterpreterAffectedComponents,
  WorkerInterpretersStatuspageInterpreterAffectedName,
  WorkerInterpretersStatuspageInterpreterAffectedNewStatus,
  WorkerInterpretersStatuspageInterpreterCanUpdate,
  WorkerInterpretersStatuspageInterpreterCanUpdateAffected,
  WorkerInterpretersStatuspageInterpreterComponent,
  WorkerInterpretersStatuspageInterpreterComponentId,
  WorkerInterpretersStatuspageInterpreterComponentLines,
  WorkerInterpretersStatuspageInterpreterComponentName,
  WorkerInterpretersStatuspageInterpreterComponents,
  WorkerInterpretersStatuspageInterpreterComponentStatus,
  WorkerInterpretersStatuspageInterpreterComponentUpdate,
  WorkerInterpretersStatuspageInterpreterCurrentComponents,
  WorkerInterpretersStatuspageInterpreterData,
  WorkerInterpretersStatuspageInterpreterDecodedBody,
  WorkerInterpretersStatuspageInterpreterDecoder,
  WorkerInterpretersStatuspageInterpreterDiff,
  WorkerInterpretersStatuspageInterpreterExistingState,
  WorkerInterpretersStatuspageInterpreterHasComponentStatus,
  WorkerInterpretersStatuspageInterpreterHasKv,
  WorkerInterpretersStatuspageInterpreterHasUpdateStatus,
  WorkerInterpretersStatuspageInterpreterImpact,
  WorkerInterpretersStatuspageInterpreterIncident,
  WorkerInterpretersStatuspageInterpreterIncidentId,
  WorkerInterpretersStatuspageInterpreterIncidentName,
  WorkerInterpretersStatuspageInterpreterIsAffectedArray,
  WorkerInterpretersStatuspageInterpreterIsDuplicate,
  WorkerInterpretersStatuspageInterpreterIsUpdatesArray,
  WorkerInterpretersStatuspageInterpreterKv,
  WorkerInterpretersStatuspageInterpreterKvAvailable,
  WorkerInterpretersStatuspageInterpreterKvMissing,
  WorkerInterpretersStatuspageInterpreterLatestBody,
  WorkerInterpretersStatuspageInterpreterLatestUpdate,
  WorkerInterpretersStatuspageInterpreterMeta,
  WorkerInterpretersStatuspageInterpreterMetaDefault,
  WorkerInterpretersStatuspageInterpreterMetaRaw,
  WorkerInterpretersStatuspageInterpreterNewState,
  WorkerInterpretersStatuspageInterpreterPage,
  WorkerInterpretersStatuspageInterpreterPageId,
  WorkerInterpretersStatuspageInterpreterPageIdAvailable,
  WorkerInterpretersStatuspageInterpreterParsed,
  WorkerInterpretersStatuspageInterpreterPreviousComponents,
  WorkerInterpretersStatuspageInterpreterRawUpdates,
  WorkerInterpretersStatuspageInterpreterReturns,
  WorkerInterpretersStatuspageInterpreterServiceName,
  WorkerInterpretersStatuspageInterpreterShortlink,
  WorkerInterpretersStatuspageInterpreterStatus,
  WorkerInterpretersStatuspageInterpreterUnsubscribeUrl,
  WorkerInterpretersStatuspageInterpreterUpdatedState,
  WorkerInterpretersStatuspageInterpreterUpdateId,
  WorkerInterpretersStatuspageInterpreterUpdates,
  WorkerInterpretersStatuspageIsTerminalStatusLowered,
  WorkerInterpretersStatuspageIsTerminalStatusReturns,
  WorkerInterpretersStatuspageIsTerminalStatusStatus,
  WorkerInterpretersStatuspageIsTerminalStatusTerminal,
  WorkerInterpretersStatuspageMapImpactToPriorityImpact,
  WorkerInterpretersStatuspageMapImpactToPriorityReturns,
  WorkerInterpretersStatuspageMapStatusToEmojiTagReturns,
  WorkerInterpretersStatuspageMapStatusToEmojiTagStatus,
  WorkerInterpretersStatuspageResult,
} from '../../types/worker/interpreters/statuspage.d.ts';

/**
 * Worker - Interpreters - Statuspage - Map Impact To Priority.
 *
 * Converts a Statuspage incident impact level string into
 * the corresponding ntfy numeric priority value.
 *
 * @param {WorkerInterpretersStatuspageMapImpactToPriorityImpact} impact - Impact.
 *
 * @returns {WorkerInterpretersStatuspageMapImpactToPriorityReturns}
 *
 * @since 2.0.0
 */
const mapImpactToPriority = (impact: WorkerInterpretersStatuspageMapImpactToPriorityImpact): WorkerInterpretersStatuspageMapImpactToPriorityReturns => {
  switch (impact.toLowerCase()) {
    case 'critical': { return 5; }

    case 'major': { return 4; }

    case 'minor': { return 3; }

    case 'none':
    default: { return 2; }
  }
};

/**
 * Worker - Interpreters - Statuspage - Map Status To Emoji Tag.
 *
 * Converts a Statuspage incident status string into the
 * corresponding ntfy emoji shortcode for visual indicators.
 *
 * @param {WorkerInterpretersStatuspageMapStatusToEmojiTagStatus} status - Status.
 *
 * @returns {WorkerInterpretersStatuspageMapStatusToEmojiTagReturns}
 *
 * @since 2.0.0
 */
const mapStatusToEmojiTag = (status: WorkerInterpretersStatuspageMapStatusToEmojiTagStatus): WorkerInterpretersStatuspageMapStatusToEmojiTagReturns => {
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
};

/**
 * Worker - Interpreters - Statuspage - Is Terminal Status.
 *
 * Checks whether the given status string represents a terminal
 * incident state such as resolved, completed, or postmortem.
 *
 * @param {WorkerInterpretersStatuspageIsTerminalStatusStatus} status - Status.
 *
 * @returns {WorkerInterpretersStatuspageIsTerminalStatusReturns}
 *
 * @since 2.0.0
 */
const isTerminalStatus = (status: WorkerInterpretersStatuspageIsTerminalStatusStatus): WorkerInterpretersStatuspageIsTerminalStatusReturns => {
  const terminal: WorkerInterpretersStatuspageIsTerminalStatusTerminal = [
    'resolved',
    'completed',
    'postmortem',
  ];
  const lowered: WorkerInterpretersStatuspageIsTerminalStatusLowered = status.toLowerCase();
  return terminal.includes(lowered);
};

/**
 * Worker - Interpreters - Statuspage - Humanize Slug.
 *
 * Converts an underscore-separated slug string into a
 * human-readable title-cased label for display purposes.
 *
 * @param {WorkerInterpretersStatuspageHumanizeSlugSlug} slug - Slug.
 *
 * @returns {WorkerInterpretersStatuspageHumanizeSlugReturns}
 *
 * @since 2.0.0
 */
const humanizeSlug = (slug: WorkerInterpretersStatuspageHumanizeSlugSlug): WorkerInterpretersStatuspageHumanizeSlugReturns => {
  const parts: WorkerInterpretersStatuspageHumanizeSlugParts = slug.split('_');
  const capitalized: WorkerInterpretersStatuspageHumanizeSlugCapitalized = parts.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalized.join(' ');
};

/**
 * Worker - Interpreters - Statuspage - Extract Service Name.
 *
 * Parses the unsubscribe URL hostname to determine which
 * service generated the Statuspage notification.
 *
 * @param {WorkerInterpretersStatuspageExtractServiceNameUnsubscribeUrl} unsubscribeUrl - Unsubscribe url.
 *
 * @returns {WorkerInterpretersStatuspageExtractServiceNameReturns}
 *
 * @since 2.0.0
 */
const extractServiceName = (unsubscribeUrl: WorkerInterpretersStatuspageExtractServiceNameUnsubscribeUrl): WorkerInterpretersStatuspageExtractServiceNameReturns => {
  let serviceName: WorkerInterpretersStatuspageExtractServiceNameServiceName = 'Statuspage';
  if (unsubscribeUrl !== undefined) {
    try {
      const parsedUrl: WorkerInterpretersStatuspageExtractServiceNameParsedUrl = new URL(unsubscribeUrl);
      const hostname: WorkerInterpretersStatuspageExtractServiceNameHostname = parsedUrl['hostname'];
      serviceName = hostname.replace(LIB_REGEX_STATUSPAGE_LEADING_WWW, '');
    } catch { /* Fall back to default. */ }
  }

  return serviceName;
};

/**
 * Worker - Interpreters - Statuspage - Build Incident Notification.
 *
 * Assembles a complete ntfy notification object from parsed
 * Statuspage incident data including status, impact, and components.
 *
 * @param {WorkerInterpretersStatuspageBuildIncidentNotificationServiceName}     serviceName    - Service name.
 * @param {WorkerInterpretersStatuspageBuildIncidentNotificationIncidentName}    incidentName   - Incident name.
 * @param {WorkerInterpretersStatuspageBuildIncidentNotificationStatus}          status         - Status.
 * @param {WorkerInterpretersStatuspageBuildIncidentNotificationImpact}          impact         - Impact.
 * @param {WorkerInterpretersStatuspageBuildIncidentNotificationLatestBody}      latestBody     - Latest body.
 * @param {WorkerInterpretersStatuspageBuildIncidentNotificationShortlink}       shortlink      - Shortlink.
 * @param {WorkerInterpretersStatuspageBuildIncidentNotificationUnsubscribeUrl}  unsubscribeUrl - Unsubscribe url.
 * @param {WorkerInterpretersStatuspageBuildIncidentNotificationComponentLines}  componentLines - Component lines.
 *
 * @returns {WorkerInterpretersStatuspageResult}
 *
 * @since 2.0.0
 */
const buildIncidentNotification = (serviceName: WorkerInterpretersStatuspageBuildIncidentNotificationServiceName, incidentName: WorkerInterpretersStatuspageBuildIncidentNotificationIncidentName, status: WorkerInterpretersStatuspageBuildIncidentNotificationStatus, impact: WorkerInterpretersStatuspageBuildIncidentNotificationImpact, latestBody: WorkerInterpretersStatuspageBuildIncidentNotificationLatestBody, shortlink: WorkerInterpretersStatuspageBuildIncidentNotificationShortlink, unsubscribeUrl: WorkerInterpretersStatuspageBuildIncidentNotificationUnsubscribeUrl, componentLines: WorkerInterpretersStatuspageBuildIncidentNotificationComponentLines): WorkerInterpretersStatuspageResult => {
  const isTerminal: WorkerInterpretersStatuspageBuildIncidentNotificationIsTerminal = isTerminalStatus(status);
  const priority: WorkerInterpretersStatuspageBuildIncidentNotificationPriority = (isTerminal === true) ? 2 : mapImpactToPriority(impact);
  const humanizedStatus: WorkerInterpretersStatuspageBuildIncidentNotificationHumanizedStatus = humanizeSlug(status);
  const humanizedImpact: WorkerInterpretersStatuspageBuildIncidentNotificationHumanizedImpact = humanizeSlug(impact);
  const emojiTag: WorkerInterpretersStatuspageBuildIncidentNotificationEmojiTag = mapStatusToEmojiTag(status);
  const tags: WorkerInterpretersStatuspageBuildIncidentNotificationTags = [
    'statuspage',
    status.toLowerCase(),
    emojiTag,
  ];
  const bodyLines: WorkerInterpretersStatuspageBuildIncidentNotificationBodyLines = [
    `**Status:** ${humanizedStatus}`,
    `**Impact:** ${humanizedImpact}`,
  ];

  if (latestBody !== undefined) {
    const latestBodyJoined: WorkerInterpretersStatuspageBuildIncidentNotificationLatestBodyJoined = [
      '',
      `> ${latestBody}`,
    ].join('\n');

    bodyLines.push(latestBodyJoined);
  }

  if (componentLines.length > 0) {
    const componentLinesJoined: WorkerInterpretersStatuspageBuildIncidentNotificationComponentLinesJoined = [
      '',
      '**Affected:**',
      componentLines.join('\n'),
    ].join('\n');

    bodyLines.push(componentLinesJoined);
  }

  const body: WorkerInterpretersStatuspageBuildIncidentNotificationBody = bodyLines.join('\n');
  const actions: WorkerInterpretersStatuspageBuildIncidentNotificationActions = [];
  if (shortlink !== undefined) {
    actions.push(`view, View Incident, ${shortlink}`);
  }

  if (unsubscribeUrl !== undefined) {
    actions.push(`view, Unsubscribe, ${unsubscribeUrl}`);
  }

  return {
    notification: {
      title: `[${serviceName}] ${incidentName}`, body, priority, tags, markdown: true, ...(actions.length > 0 ? { actions: actions.join('; ') } : {}),
    },
  };
};

/**
 * Worker - Interpreters - Statuspage - Interpreter.
 *
 * Parses Statuspage webhook and email payloads and builds
 * structured ntfy notifications with component tracking via KV.
 *
 * @param {WorkerInterpretersStatuspageInput}    input   - Input.
 * @param {WorkerInterpretersStatuspageContext} [context] - Optional context with KV.
 *
 * @returns {WorkerInterpretersStatuspageInterpreterReturns}
 *
 * @since 2.0.0
 */
const statuspageInterpreter: WorkerInterpretersStatuspageInterpreter = async (input: WorkerInterpretersStatuspageInput, context?: WorkerInterpretersStatuspageContext): WorkerInterpretersStatuspageInterpreterReturns => {
  let parsed: WorkerInterpretersStatuspageInterpreterParsed = undefined;
  if (typeof input === 'string') {
    try {
      parsed = JSON.parse(input);
    } catch {
      return null;
    }
  } else if (input instanceof ArrayBuffer) {
    const decoder: WorkerInterpretersStatuspageInterpreterDecoder = new TextDecoder('utf-8');
    const decodedBody: WorkerInterpretersStatuspageInterpreterDecodedBody = decoder.decode(input);

    try {
      parsed = JSON.parse(decodedBody);
    } catch {
      return null;
    }
  } else {
    parsed = input;
  }

  const data: WorkerInterpretersStatuspageInterpreterData = parsed as WorkerInterpretersStatuspageInterpreterData;
  const metaDefault: WorkerInterpretersStatuspageInterpreterMetaDefault = {};
  const metaRaw: WorkerInterpretersStatuspageInterpreterMetaRaw = data['meta'];
  const meta: WorkerInterpretersStatuspageInterpreterMeta = (metaRaw !== undefined && metaRaw !== null) ? metaRaw as WorkerInterpretersStatuspageInterpreterMeta : metaDefault;
  const unsubscribeUrl: WorkerInterpretersStatuspageInterpreterUnsubscribeUrl = (typeof meta['unsubscribe'] === 'string') ? meta['unsubscribe'] : undefined;
  const serviceName: WorkerInterpretersStatuspageInterpreterServiceName = extractServiceName(unsubscribeUrl);
  const page: WorkerInterpretersStatuspageInterpreterPage = data['page'] as WorkerInterpretersStatuspageInterpreterPage;
  const pageIdAvailable: WorkerInterpretersStatuspageInterpreterPageIdAvailable = page !== undefined && typeof page['id'] === 'string';
  const pageId: WorkerInterpretersStatuspageInterpreterPageId = (pageIdAvailable === true && page !== undefined) ? page['id'] as WorkerInterpretersStatuspageInterpreterServiceName : undefined;
  const kvAvailable: WorkerInterpretersStatuspageInterpreterKvAvailable = context !== undefined && context !== null;
  const kv: WorkerInterpretersStatuspageInterpreterKv = (kvAvailable === true && context !== undefined) ? context['kv'] : undefined;
  const hasKv: WorkerInterpretersStatuspageInterpreterHasKv = kv !== undefined && pageId !== undefined;
  if ('component_update' in data && !('incident' in data)) {
    const kvMissing: WorkerInterpretersStatuspageInterpreterKvMissing = hasKv === false
      || kv === undefined
      || pageId === undefined;
    if (kvMissing === true) {
      return null;
    }

    if (kv === undefined || pageId === undefined) {
      return null;
    }

    const existingState: WorkerInterpretersStatuspageInterpreterExistingState = await readState(kv, pageId);
    const components: WorkerInterpretersStatuspageInterpreterComponents = (existingState !== null) ? { ...existingState['components'] } : {};
    const componentUpdate: WorkerInterpretersStatuspageInterpreterComponentUpdate = data['component_update'] as WorkerInterpretersStatuspageInterpreterComponentUpdate;
    const component: WorkerInterpretersStatuspageInterpreterComponent = data['component'] as WorkerInterpretersStatuspageInterpreterComponent;
    const componentId: WorkerInterpretersStatuspageInterpreterComponentId = (component !== undefined && typeof component['id'] === 'string') ? component['id'] : undefined;
    const componentName: WorkerInterpretersStatuspageInterpreterComponentName = (component !== undefined && typeof component['name'] === 'string') ? component['name'] : undefined;
    const hasUpdateStatus: WorkerInterpretersStatuspageInterpreterHasUpdateStatus = componentUpdate !== undefined && typeof componentUpdate['new_status'] === 'string';
    const hasComponentStatus: WorkerInterpretersStatuspageInterpreterHasComponentStatus = component !== undefined && typeof component['status'] === 'string';
    let componentStatus: WorkerInterpretersStatuspageInterpreterComponentStatus = undefined;
    if (hasUpdateStatus === true && componentUpdate !== undefined) {
      componentStatus = componentUpdate['new_status'] as WorkerInterpretersStatuspageInterpreterIncidentName;
    } else if (hasComponentStatus === true && component !== undefined) {
      componentStatus = component['status'] as WorkerInterpretersStatuspageInterpreterIncidentName;
    }

    const canUpdate: WorkerInterpretersStatuspageInterpreterCanUpdate = componentId !== undefined
      && componentName !== undefined
      && componentStatus !== undefined;
    if (canUpdate === true
      && componentId !== undefined
      && componentName !== undefined
      && componentStatus !== undefined) {
      Reflect.set(components, componentId, {
        name: componentName, status: componentStatus,
      });
    }

    const updatedState: WorkerInterpretersStatuspageInterpreterUpdatedState = (existingState !== null) ? {
      ...existingState, components,
    } : {
      incidentId: undefined, incidentName: undefined, status: undefined, impact: undefined, body: undefined, shortlink: undefined, serviceName, unsubscribeUrl, updateId: undefined, components,
    };

    await writeState(kv, pageId, updatedState);

    return null;
  }

  if ('incident' in data) {
    const incident: WorkerInterpretersStatuspageInterpreterIncident = data['incident'] as WorkerInterpretersStatuspageInterpreterIncident;
    const incidentName: WorkerInterpretersStatuspageInterpreterIncidentName = (typeof incident['name'] === 'string') ? incident['name'] : 'Incident';
    const status: WorkerInterpretersStatuspageInterpreterStatus = (typeof incident['status'] === 'string') ? incident['status'] : 'unknown';
    const impact: WorkerInterpretersStatuspageInterpreterImpact = (typeof incident['impact'] === 'string') ? incident['impact'] : 'none';
    const shortlink: WorkerInterpretersStatuspageInterpreterShortlink = (typeof incident['shortlink'] === 'string') ? incident['shortlink'] : undefined;
    const rawUpdates: WorkerInterpretersStatuspageInterpreterRawUpdates = incident['incident_updates'];
    const isUpdatesArray: WorkerInterpretersStatuspageInterpreterIsUpdatesArray = Array.isArray(rawUpdates);
    const updates: WorkerInterpretersStatuspageInterpreterUpdates = (isUpdatesArray === true) ? (rawUpdates as WorkerInterpretersStatuspageInterpreterUpdates) : [];
    const latestUpdate: WorkerInterpretersStatuspageInterpreterLatestUpdate = updates[0];
    const latestBody: WorkerInterpretersStatuspageInterpreterLatestBody = (latestUpdate !== undefined && typeof latestUpdate['body'] === 'string') ? latestUpdate['body'] : undefined;
    const updateId: WorkerInterpretersStatuspageInterpreterUpdateId = (latestUpdate !== undefined && typeof latestUpdate['id'] === 'string') ? latestUpdate['id'] : undefined;
    const kvMissing: WorkerInterpretersStatuspageInterpreterKvMissing = hasKv === false
      || kv === undefined
      || pageId === undefined;
    if (kvMissing === true) {
      const componentLines: WorkerInterpretersStatuspageInterpreterComponentLines = [];
      return buildIncidentNotification(serviceName, incidentName, status, impact, latestBody, shortlink, unsubscribeUrl, componentLines);
    }

    if (kv === undefined || pageId === undefined) {
      const componentLines: WorkerInterpretersStatuspageInterpreterComponentLines = [];
      return buildIncidentNotification(serviceName, incidentName, status, impact, latestBody, shortlink, unsubscribeUrl, componentLines);
    }

    const existingState: WorkerInterpretersStatuspageInterpreterExistingState = await readState(kv, pageId);
    const isDuplicate: WorkerInterpretersStatuspageInterpreterIsDuplicate = existingState !== null
      && updateId !== undefined
      && existingState['updateId'] === updateId;
    if (isDuplicate === true) {
      return null;
    }

    const previousComponents: WorkerInterpretersStatuspageInterpreterPreviousComponents = (existingState !== null) ? { ...existingState['components'] } : {};
    const currentComponents: WorkerInterpretersStatuspageInterpreterCurrentComponents = { ...previousComponents };
    if (latestUpdate !== undefined) {
      const affectedComponents: WorkerInterpretersStatuspageInterpreterAffectedComponents = latestUpdate['affected_components'] as WorkerInterpretersStatuspageInterpreterAffectedComponents;
      const isAffectedArray: WorkerInterpretersStatuspageInterpreterIsAffectedArray = Array.isArray(affectedComponents);
      if (isAffectedArray === true && affectedComponents !== undefined) {
        for (const affected of affectedComponents) {
          const code: WorkerInterpretersStatuspageInterpreterAffectedCode = (typeof affected['code'] === 'string') ? affected['code'] : undefined;
          const name: WorkerInterpretersStatuspageInterpreterAffectedName = (typeof affected['name'] === 'string') ? affected['name'] : undefined;
          const newStatus: WorkerInterpretersStatuspageInterpreterAffectedNewStatus = (typeof affected['new_status'] === 'string') ? affected['new_status'] : undefined;
          const canUpdateAffected: WorkerInterpretersStatuspageInterpreterCanUpdateAffected = code !== undefined
            && name !== undefined
            && newStatus !== undefined;
          if (canUpdateAffected === true
            && code !== undefined
            && name !== undefined
            && newStatus !== undefined) {
            Reflect.set(currentComponents, code, {
              name, status: newStatus,
            });
          }
        }
      }
    }

    const diff: WorkerInterpretersStatuspageInterpreterDiff = diffComponents(previousComponents, currentComponents);
    const componentLines: WorkerInterpretersStatuspageInterpreterComponentLines = formatComponentLines(diff);
    const incidentId: WorkerInterpretersStatuspageInterpreterIncidentId = (typeof incident['id'] === 'string') ? incident['id'] : undefined;
    const newState: WorkerInterpretersStatuspageInterpreterNewState = {
      incidentId, incidentName, status, impact, body: latestBody, shortlink, serviceName, unsubscribeUrl, updateId, components: currentComponents,
    };

    await writeState(kv, pageId, newState);
    return buildIncidentNotification(serviceName, incidentName, status, impact, latestBody, shortlink, unsubscribeUrl, componentLines);
  }

  throw new Error('Unrecognized Statuspage.io payload: expected "incident" field');
};

export {
  statuspageInterpreter,
};

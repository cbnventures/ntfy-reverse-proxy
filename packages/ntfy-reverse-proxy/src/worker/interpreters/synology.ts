import { LIB_REGEX_NON_LOWERCASE_ALPHANUMERIC } from '../../lib/regex.js';

import type {
  WorkerInterpretersSynologyInput,
  WorkerInterpretersSynologyInterpreter,
  WorkerInterpretersSynologyInterpreterBody,
  WorkerInterpretersSynologyInterpreterBodyLines,
  WorkerInterpretersSynologyInterpreterData,
  WorkerInterpretersSynologyInterpreterDate,
  WorkerInterpretersSynologyInterpreterDecoder,
  WorkerInterpretersSynologyInterpreterDsmUrl,
  WorkerInterpretersSynologyInterpreterEvent,
  WorkerInterpretersSynologyInterpreterHostname,
  WorkerInterpretersSynologyInterpreterLowerMessage,
  WorkerInterpretersSynologyInterpreterMessage,
  WorkerInterpretersSynologyInterpreterParts,
  WorkerInterpretersSynologyInterpreterPrefixParts,
  WorkerInterpretersSynologyInterpreterPriority,
  WorkerInterpretersSynologyInterpreterProxyConfig,
  WorkerInterpretersSynologyInterpreterRawDate,
  WorkerInterpretersSynologyInterpreterRawEvent,
  WorkerInterpretersSynologyInterpreterRawHostname,
  WorkerInterpretersSynologyInterpreterRawMessage,
  WorkerInterpretersSynologyInterpreterRawPrefix,
  WorkerInterpretersSynologyInterpreterRawProxyConfigDefault,
  WorkerInterpretersSynologyInterpreterRawSeverity,
  WorkerInterpretersSynologyInterpreterRawTime,
  WorkerInterpretersSynologyInterpreterRawUrl,
  WorkerInterpretersSynologyInterpreterSanitizedEvent,
  WorkerInterpretersSynologyInterpreterSeverity,
  WorkerInterpretersSynologyInterpreterTags,
  WorkerInterpretersSynologyInterpreterTime,
  WorkerInterpretersSynologyInterpreterTimestamp,
  WorkerInterpretersSynologyInterpreterTitle,
  WorkerInterpretersSynologyMapSeverityToPriorityReturns,
  WorkerInterpretersSynologyMapSeverityToPrioritySeverity,
  WorkerInterpretersSynologyResult,
  WorkerInterpretersSynologyValidateUrlRawUrl,
  WorkerInterpretersSynologyValidateUrlReturns,
  WorkerInterpretersSynologyValidateUrlUrl,
} from '../../types/worker/interpreters/synology.d.ts';

/**
 * Worker - Interpreters - Synology - Map Severity To Priority.
 *
 * Converts a Synology DSM severity string into the corresponding
 * ntfy priority level for the notification payload.
 *
 * @param {WorkerInterpretersSynologyMapSeverityToPrioritySeverity} severity - Severity.
 *
 * @returns {WorkerInterpretersSynologyMapSeverityToPriorityReturns}
 *
 * @since 2.0.0
 */
const mapSeverityToPriority = (severity: WorkerInterpretersSynologyMapSeverityToPrioritySeverity): WorkerInterpretersSynologyMapSeverityToPriorityReturns => {
  switch (severity.toLowerCase()) {
    case 'critical': {
      return 5;
    }

    case 'error': {
      return 4;
    }

    case 'warning': {
      return 3;
    }

    case 'info':
    default: {
      return 2;
    }
  }
};

/**
 * Worker - Interpreters - Synology - Validate URL.
 *
 * Attempts to parse the raw string as a URL and returns it
 * on success or undefined if the string is not a valid URL.
 *
 * @param {WorkerInterpretersSynologyValidateUrlRawUrl} rawUrl - Raw url.
 *
 * @returns {WorkerInterpretersSynologyValidateUrlReturns}
 *
 * @since 2.0.0
 */
const validateUrl = (rawUrl: WorkerInterpretersSynologyValidateUrlRawUrl): WorkerInterpretersSynologyValidateUrlReturns => {
  try {
    const url: WorkerInterpretersSynologyValidateUrlUrl = new URL(rawUrl);

    return url.href;
  } catch {
    return undefined;
  }
};

/**
 * Worker - Interpreters - Synology - Interpreter.
 *
 * Parses Synology DSM notification payloads from string, binary,
 * or structured object formats into ntfy notification results.
 *
 * @param {WorkerInterpretersSynologyInput} input - Input.
 *
 * @returns {WorkerInterpretersSynologyResult}
 *
 * @since 2.0.0
 */
const synologyInterpreter: WorkerInterpretersSynologyInterpreter = (input: WorkerInterpretersSynologyInput): WorkerInterpretersSynologyResult => {
  if (typeof input === 'string' || input instanceof ArrayBuffer) {
    let body: WorkerInterpretersSynologyInterpreterBody = undefined;

    if (input instanceof ArrayBuffer) {
      const decoder: WorkerInterpretersSynologyInterpreterDecoder = new TextDecoder('utf-8');

      body = decoder.decode(input);
    } else {
      body = input;
    }

    return {
      notification: {
        title: 'Synology DSM',
        body,
        priority: 3,
        tags: ['synology'],
        markdown: true,
      },
    };
  }

  const data: WorkerInterpretersSynologyInterpreterData = input as WorkerInterpretersSynologyInterpreterData;

  /*
   * Extract fields - supports multiple template formats.
   * Recommended template: {"text": "@@TEXT@@", "prefix": "@@PREFIX@@"}
   * With prefix field set to: %HOSTNAME% | %DATE% %TIME%
   * Legacy/custom formats also supported.
   */
  let rawMessage: WorkerInterpretersSynologyInterpreterRawMessage = data['text'];

  if (rawMessage === undefined) {
    rawMessage = data['message'];
  }

  if (rawMessage === undefined) {
    rawMessage = data['body'];
  }

  if (rawMessage === undefined) {
    rawMessage = data['content'];
  }

  if (rawMessage === undefined) {
    rawMessage = data['description'];
  }

  let message: WorkerInterpretersSynologyInterpreterMessage = (typeof rawMessage === 'string') ? rawMessage : JSON.stringify(data);

  /*
   * Parse prefix field - expected format: "hostname | date time"
   * or "hostname". DSM prepends prefix to @@TEXT@@, so strip it
   * from the message if present.
   */
  const rawPrefix: WorkerInterpretersSynologyInterpreterRawPrefix = data['prefix'];
  let hostname: WorkerInterpretersSynologyInterpreterHostname = undefined;
  let timestamp: WorkerInterpretersSynologyInterpreterTimestamp = undefined;

  if (typeof rawPrefix === 'string' && rawPrefix.trim() !== '') {
    const prefixParts: WorkerInterpretersSynologyInterpreterPrefixParts = rawPrefix.split('|').map((part) => part.trim());

    if (prefixParts.length >= 2) {
      hostname = (prefixParts[0] !== '') ? prefixParts[0] : undefined;
      timestamp = (prefixParts[1] !== '') ? prefixParts[1] : undefined;
    } else {
      hostname = (rawPrefix.trim() !== '') ? rawPrefix.trim() : undefined;
    }

    /* Strip prefix from message if DSM prepended it. */
    if (message.startsWith(rawPrefix) === true) {
      message = message.slice(rawPrefix.length).trim();
    }
  }

  /* Fallback to direct hostname/date/time fields if prefix not available. */
  if (hostname === undefined) {
    let rawHostname: WorkerInterpretersSynologyInterpreterRawHostname = data['hostname'];

    if (rawHostname === undefined) {
      rawHostname = data['host'];
    }

    if (rawHostname === undefined) {
      rawHostname = data['device'];
    }

    hostname = (typeof rawHostname === 'string') ? rawHostname : undefined;
  }

  if (timestamp === undefined) {
    const rawDate: WorkerInterpretersSynologyInterpreterRawDate = data['date'];
    const rawTime: WorkerInterpretersSynologyInterpreterRawTime = data['time'];
    const date: WorkerInterpretersSynologyInterpreterDate = (typeof rawDate === 'string') ? rawDate : undefined;
    const time: WorkerInterpretersSynologyInterpreterTime = (typeof rawTime === 'string') ? rawTime : undefined;
    const parts: WorkerInterpretersSynologyInterpreterParts = [
      date,
      time,
    ].filter(Boolean).join(' ');

    timestamp = (parts !== '') ? parts : undefined;
  }

  const rawSeverity: WorkerInterpretersSynologyInterpreterRawSeverity = (data['severity'] !== undefined) ? data['severity'] : data['level'];
  const severity: WorkerInterpretersSynologyInterpreterSeverity = (typeof rawSeverity === 'string') ? rawSeverity : 'info';

  let rawEvent: WorkerInterpretersSynologyInterpreterRawEvent = data['event'];

  if (rawEvent === undefined) {
    rawEvent = data['category'];
  }

  if (rawEvent === undefined) {
    rawEvent = data['type'];
  }

  const event: WorkerInterpretersSynologyInterpreterEvent = (typeof rawEvent === 'string') ? rawEvent : undefined;

  /* Build title from hostname. */
  const title: WorkerInterpretersSynologyInterpreterTitle = (hostname !== undefined) ? hostname : 'Synology DSM';

  /* Infer priority from message keywords if severity not provided. */
  let priority: WorkerInterpretersSynologyInterpreterPriority = mapSeverityToPriority(severity);

  if (rawSeverity === undefined) {
    const lowerMessage: WorkerInterpretersSynologyInterpreterLowerMessage = message.toLowerCase();

    if (
      lowerMessage.includes('is down') === true
      || lowerMessage.includes('lost link') === true
      || lowerMessage.includes('unreachable') === true
    ) {
      priority = 5;
    } else if (
      lowerMessage.includes('error') === true
      || lowerMessage.includes('bad sector') === true
      || lowerMessage.includes('failure') === true
    ) {
      priority = 4;
    } else if (
      lowerMessage.includes('warning') === true
      || lowerMessage.includes('packet loss') === true
      || lowerMessage.includes('high latency') === true
      || lowerMessage.includes('running out') === true
    ) {
      priority = 3;
    } else if (
      lowerMessage.includes('is available') === true
      || lowerMessage.includes('restored') === true
      || lowerMessage.includes('completed successfully') === true
    ) {
      priority = 2;
    }
  }

  /*
   * Build tags.
   * Level 1: Interpreter tag (identifies the source service).
   * Level 2: Keyword tags (matched from content, not applicable for Synology).
   * Level 3: Webhook tags (from the payload data).
   * Level 4: Emoji tags (ntfy emoji shortcodes for visual indicators).
   */
  const tags: WorkerInterpretersSynologyInterpreterTags = ['synology'];

  if (event !== undefined) {
    const sanitizedEvent: WorkerInterpretersSynologyInterpreterSanitizedEvent = event.toLowerCase().replace(new RegExp(LIB_REGEX_NON_LOWERCASE_ALPHANUMERIC, 'g'), '');

    tags.push(sanitizedEvent);
  }

  if (severity !== 'info' && rawSeverity !== undefined) {
    tags.push(severity);
  }

  if (priority === 5) {
    tags.push('rotating_light');
  } else if (priority === 4) {
    tags.push('warning');
  } else if (priority === 2) {
    tags.push('white_check_mark');
  }

  /* Build body with timestamp if available. */
  const bodyLines: WorkerInterpretersSynologyInterpreterBodyLines = [];

  if (timestamp !== undefined) {
    bodyLines.push(`**${timestamp}**`);
  }

  bodyLines.push(message);

  /* Extract DSM URL for "Open DSM" button from ntfy-reverse-proxy config. */
  const rawProxyConfigDefault: WorkerInterpretersSynologyInterpreterRawProxyConfigDefault = {};
  const proxyConfig: WorkerInterpretersSynologyInterpreterProxyConfig = (typeof data['ntfy-reverse-proxy'] === 'object' && data['ntfy-reverse-proxy'] !== null) ? data['ntfy-reverse-proxy'] as WorkerInterpretersSynologyInterpreterProxyConfig : rawProxyConfigDefault;
  const rawUrl: WorkerInterpretersSynologyInterpreterRawUrl = proxyConfig['url'];
  let dsmUrl: WorkerInterpretersSynologyInterpreterDsmUrl = undefined;

  if (typeof rawUrl === 'string') {
    dsmUrl = validateUrl(rawUrl);
  }

  return {
    notification: {
      title,
      body: bodyLines.join('\n'),
      priority,
      tags,
      markdown: true,
      ...(dsmUrl !== undefined ? { actions: `view, Open DSM, ${dsmUrl}, clear=true` } : {}),
    },
  };
};

export {
  synologyInterpreter,
};

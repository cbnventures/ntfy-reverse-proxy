import { LIB_REGEX_NON_LOWERCASE_ALPHANUMERIC } from '../../lib/regex.js';

import type {
  Worker_Interpreters_Synology_Input,
  Worker_Interpreters_Synology_MapSeverityToPriority_Returns,
  Worker_Interpreters_Synology_MapSeverityToPriority_Severity,
  Worker_Interpreters_Synology_Result,
  Worker_Interpreters_Synology_SynologyInterpreter,
  Worker_Interpreters_Synology_SynologyInterpreter_Body,
  Worker_Interpreters_Synology_SynologyInterpreter_BodyLines,
  Worker_Interpreters_Synology_SynologyInterpreter_Data,
  Worker_Interpreters_Synology_SynologyInterpreter_Date,
  Worker_Interpreters_Synology_SynologyInterpreter_Decoder,
  Worker_Interpreters_Synology_SynologyInterpreter_DsmUrl,
  Worker_Interpreters_Synology_SynologyInterpreter_Event,
  Worker_Interpreters_Synology_SynologyInterpreter_Hostname,
  Worker_Interpreters_Synology_SynologyInterpreter_LowerMessage,
  Worker_Interpreters_Synology_SynologyInterpreter_Message,
  Worker_Interpreters_Synology_SynologyInterpreter_Parts,
  Worker_Interpreters_Synology_SynologyInterpreter_PrefixParts,
  Worker_Interpreters_Synology_SynologyInterpreter_Priority,
  Worker_Interpreters_Synology_SynologyInterpreter_ProxyConfig,
  Worker_Interpreters_Synology_SynologyInterpreter_RawDate,
  Worker_Interpreters_Synology_SynologyInterpreter_RawEvent,
  Worker_Interpreters_Synology_SynologyInterpreter_RawHostname,
  Worker_Interpreters_Synology_SynologyInterpreter_RawMessage,
  Worker_Interpreters_Synology_SynologyInterpreter_RawPrefix,
  Worker_Interpreters_Synology_SynologyInterpreter_RawProxyConfigDefault,
  Worker_Interpreters_Synology_SynologyInterpreter_RawSeverity,
  Worker_Interpreters_Synology_SynologyInterpreter_RawTime,
  Worker_Interpreters_Synology_SynologyInterpreter_RawUrl,
  Worker_Interpreters_Synology_SynologyInterpreter_SanitizedEvent,
  Worker_Interpreters_Synology_SynologyInterpreter_Severity,
  Worker_Interpreters_Synology_SynologyInterpreter_Tags,
  Worker_Interpreters_Synology_SynologyInterpreter_Time,
  Worker_Interpreters_Synology_SynologyInterpreter_Timestamp,
  Worker_Interpreters_Synology_SynologyInterpreter_Title,
  Worker_Interpreters_Synology_ValidateUrl_Protocol,
  Worker_Interpreters_Synology_ValidateUrl_RawUrl,
  Worker_Interpreters_Synology_ValidateUrl_Returns,
  Worker_Interpreters_Synology_ValidateUrl_Url,
} from '../../types/worker/interpreters/synology.d.ts';

/**
 * Worker - Interpreters - Synology - Map Severity To Priority.
 *
 * Converts a Synology DSM severity string into the corresponding
 * ntfy priority level for the notification payload.
 *
 * @param {Worker_Interpreters_Synology_MapSeverityToPriority_Severity} severity - Severity.
 *
 * @returns {Worker_Interpreters_Synology_MapSeverityToPriority_Returns}
 *
 * @since 2.0.0
 */
function mapSeverityToPriority(severity: Worker_Interpreters_Synology_MapSeverityToPriority_Severity): Worker_Interpreters_Synology_MapSeverityToPriority_Returns {
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
}

/**
 * Worker - Interpreters - Synology - Validate URL.
 *
 * Attempts to parse the raw string as a URL and returns it
 * on success or undefined if the string is not a valid URL.
 *
 * @param {Worker_Interpreters_Synology_ValidateUrl_RawUrl} rawUrl - Raw url.
 *
 * @returns {Worker_Interpreters_Synology_ValidateUrl_Returns}
 *
 * @since 2.0.0
 */
function validateUrl(rawUrl: Worker_Interpreters_Synology_ValidateUrl_RawUrl): Worker_Interpreters_Synology_ValidateUrl_Returns {
  try {
    const url: Worker_Interpreters_Synology_ValidateUrl_Url = new URL(rawUrl);
    const protocol: Worker_Interpreters_Synology_ValidateUrl_Protocol = url['protocol'];

    if (protocol !== 'http:' && protocol !== 'https:') {
      return undefined;
    }

    return url.href;
  } catch {
    return undefined;
  }
}

/**
 * Worker - Interpreters - Synology - Interpreter.
 *
 * Parses Synology DSM notification payloads from string, binary,
 * or structured object formats into ntfy notification results.
 *
 * @param {Worker_Interpreters_Synology_Input} input - Input.
 *
 * @returns {Worker_Interpreters_Synology_Result}
 *
 * @since 2.0.0
 */
const synologyInterpreter: Worker_Interpreters_Synology_SynologyInterpreter = (input: Worker_Interpreters_Synology_Input): Worker_Interpreters_Synology_Result => {
  if (typeof input === 'string' || input instanceof ArrayBuffer) {
    let body: Worker_Interpreters_Synology_SynologyInterpreter_Body = undefined;

    if (input instanceof ArrayBuffer) {
      const decoder: Worker_Interpreters_Synology_SynologyInterpreter_Decoder = new TextDecoder('utf-8');

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

  const data: Worker_Interpreters_Synology_SynologyInterpreter_Data = input as Worker_Interpreters_Synology_SynologyInterpreter_Data;

  /*
   * Extract fields - supports multiple template formats.
   * Recommended template: {"text": "@@TEXT@@", "prefix": "@@PREFIX@@"}
   * With prefix field set to: %HOSTNAME% | %DATE% %TIME%
   * Legacy/custom formats also supported.
   */
  let rawMessage: Worker_Interpreters_Synology_SynologyInterpreter_RawMessage = data['text'];

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

  let message: Worker_Interpreters_Synology_SynologyInterpreter_Message = (typeof rawMessage === 'string') ? rawMessage : JSON.stringify(data);

  /*
   * Parse prefix field - expected format: "hostname | date time"
   * or "hostname". DSM prepends prefix to @@TEXT@@, so strip it
   * from the message if present.
   */
  const rawPrefix: Worker_Interpreters_Synology_SynologyInterpreter_RawPrefix = data['prefix'];
  let hostname: Worker_Interpreters_Synology_SynologyInterpreter_Hostname = undefined;
  let timestamp: Worker_Interpreters_Synology_SynologyInterpreter_Timestamp = undefined;

  if (typeof rawPrefix === 'string' && rawPrefix.trim() !== '') {
    const prefixParts: Worker_Interpreters_Synology_SynologyInterpreter_PrefixParts = rawPrefix.split('|').map((part) => part.trim());

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
    let rawHostname: Worker_Interpreters_Synology_SynologyInterpreter_RawHostname = data['hostname'];

    if (rawHostname === undefined) {
      rawHostname = data['host'];
    }

    if (rawHostname === undefined) {
      rawHostname = data['device'];
    }

    hostname = (typeof rawHostname === 'string') ? rawHostname : undefined;
  }

  if (timestamp === undefined) {
    const rawDate: Worker_Interpreters_Synology_SynologyInterpreter_RawDate = data['date'];
    const rawTime: Worker_Interpreters_Synology_SynologyInterpreter_RawTime = data['time'];
    const date: Worker_Interpreters_Synology_SynologyInterpreter_Date = (typeof rawDate === 'string') ? rawDate : undefined;
    const time: Worker_Interpreters_Synology_SynologyInterpreter_Time = (typeof rawTime === 'string') ? rawTime : undefined;
    const parts: Worker_Interpreters_Synology_SynologyInterpreter_Parts = [
      date,
      time,
    ].filter(Boolean).join(' ');

    timestamp = (parts !== '') ? parts : undefined;
  }

  const rawSeverity: Worker_Interpreters_Synology_SynologyInterpreter_RawSeverity = (data['severity'] !== undefined) ? data['severity'] : data['level'];
  const severity: Worker_Interpreters_Synology_SynologyInterpreter_Severity = (typeof rawSeverity === 'string') ? rawSeverity : 'info';

  let rawEvent: Worker_Interpreters_Synology_SynologyInterpreter_RawEvent = data['event'];

  if (rawEvent === undefined) {
    rawEvent = data['category'];
  }

  if (rawEvent === undefined) {
    rawEvent = data['type'];
  }

  const event: Worker_Interpreters_Synology_SynologyInterpreter_Event = (typeof rawEvent === 'string') ? rawEvent : undefined;

  /* Build title from hostname. */
  const title: Worker_Interpreters_Synology_SynologyInterpreter_Title = (hostname !== undefined) ? hostname : 'Synology DSM';

  /* Infer priority from message keywords if severity not provided. */
  let priority: Worker_Interpreters_Synology_SynologyInterpreter_Priority = mapSeverityToPriority(severity);

  if (rawSeverity === undefined) {
    const lowerMessage: Worker_Interpreters_Synology_SynologyInterpreter_LowerMessage = message.toLowerCase();

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
  const tags: Worker_Interpreters_Synology_SynologyInterpreter_Tags = ['synology'];

  if (event !== undefined) {
    const sanitizedEvent: Worker_Interpreters_Synology_SynologyInterpreter_SanitizedEvent = event.toLowerCase().replace(new RegExp(LIB_REGEX_NON_LOWERCASE_ALPHANUMERIC, 'g'), '');

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
  const bodyLines: Worker_Interpreters_Synology_SynologyInterpreter_BodyLines = [];

  if (timestamp !== undefined) {
    bodyLines.push(`**${timestamp}**`);
  }

  bodyLines.push(message);

  /* Extract DSM URL for "Open DSM" button from ntfy-reverse-proxy config. */
  const rawProxyConfigDefault: Worker_Interpreters_Synology_SynologyInterpreter_RawProxyConfigDefault = {};
  const proxyConfig: Worker_Interpreters_Synology_SynologyInterpreter_ProxyConfig = (typeof data['ntfy-reverse-proxy'] === 'object' && data['ntfy-reverse-proxy'] !== null) ? data['ntfy-reverse-proxy'] as Worker_Interpreters_Synology_SynologyInterpreter_ProxyConfig : rawProxyConfigDefault;
  const rawUrl: Worker_Interpreters_Synology_SynologyInterpreter_RawUrl = proxyConfig['url'];
  let dsmUrl: Worker_Interpreters_Synology_SynologyInterpreter_DsmUrl = undefined;

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
      ...((dsmUrl !== undefined) ? { actions: `view, Open DSM, ${dsmUrl}, clear=true` } : {}),
    },
  };
};

export {
  synologyInterpreter,
};

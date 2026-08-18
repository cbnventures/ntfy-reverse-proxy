import {
  LIB_REGEX_UNIFI_ALERT_LINE,
  LIB_REGEX_UNIFI_DEVICE_NAME_LINE,
  LIB_REGEX_UNIFI_DEVICE_URL_LINE,
  LIB_REGEX_UNIFI_SUBJECT_PREFIX,
  LIB_REGEX_UNIFI_TIME_LINE,
} from '../../lib/regex.js';

import type {
  Worker_Interpreters_Unifi_ExtractDeviceTags_Lower,
  Worker_Interpreters_Unifi_ExtractDeviceTags_Returns,
  Worker_Interpreters_Unifi_ExtractDeviceTags_Tags,
  Worker_Interpreters_Unifi_ExtractDeviceTags_Text,
  Worker_Interpreters_Unifi_Input,
  Worker_Interpreters_Unifi_MapEventToPriority_Lower,
  Worker_Interpreters_Unifi_MapEventToPriority_Returns,
  Worker_Interpreters_Unifi_MapEventToPriority_Text,
  Worker_Interpreters_Unifi_MapPriorityToEmojiTag_Priority,
  Worker_Interpreters_Unifi_MapPriorityToEmojiTag_Returns,
  Worker_Interpreters_Unifi_Result,
  Worker_Interpreters_Unifi_StripSubjectPrefix_Returns,
  Worker_Interpreters_Unifi_StripSubjectPrefix_Stripped,
  Worker_Interpreters_Unifi_StripSubjectPrefix_Subject,
  Worker_Interpreters_Unifi_UnifiInterpreter,
  Worker_Interpreters_Unifi_UnifiInterpreter_Alert,
  Worker_Interpreters_Unifi_UnifiInterpreter_AlertMatch,
  Worker_Interpreters_Unifi_UnifiInterpreter_BinaryBody,
  Worker_Interpreters_Unifi_UnifiInterpreter_BinaryEmojiTag,
  Worker_Interpreters_Unifi_UnifiInterpreter_BinaryPriority,
  Worker_Interpreters_Unifi_UnifiInterpreter_Body,
  Worker_Interpreters_Unifi_UnifiInterpreter_BodyLines,
  Worker_Interpreters_Unifi_UnifiInterpreter_CombinedText,
  Worker_Interpreters_Unifi_UnifiInterpreter_Data,
  Worker_Interpreters_Unifi_UnifiInterpreter_Decoder,
  Worker_Interpreters_Unifi_UnifiInterpreter_Details,
  Worker_Interpreters_Unifi_UnifiInterpreter_DeviceName,
  Worker_Interpreters_Unifi_UnifiInterpreter_DeviceNameMatch,
  Worker_Interpreters_Unifi_UnifiInterpreter_DeviceTags,
  Worker_Interpreters_Unifi_UnifiInterpreter_DeviceUrl,
  Worker_Interpreters_Unifi_UnifiInterpreter_DeviceUrlMatch,
  Worker_Interpreters_Unifi_UnifiInterpreter_EmojiTag,
  Worker_Interpreters_Unifi_UnifiInterpreter_EventType,
  Worker_Interpreters_Unifi_UnifiInterpreter_Priority,
  Worker_Interpreters_Unifi_UnifiInterpreter_RawSubject,
  Worker_Interpreters_Unifi_UnifiInterpreter_RawTextBody,
  Worker_Interpreters_Unifi_UnifiInterpreter_StringEmojiTag,
  Worker_Interpreters_Unifi_UnifiInterpreter_StringPriority,
  Worker_Interpreters_Unifi_UnifiInterpreter_Subject,
  Worker_Interpreters_Unifi_UnifiInterpreter_Tags,
  Worker_Interpreters_Unifi_UnifiInterpreter_TextBody,
  Worker_Interpreters_Unifi_UnifiInterpreter_Time,
  Worker_Interpreters_Unifi_UnifiInterpreter_TimeMatch,
  Worker_Interpreters_Unifi_UnifiInterpreter_ValidatedDeviceUrl,
  Worker_Interpreters_Unifi_ValidateUrl_Protocol,
  Worker_Interpreters_Unifi_ValidateUrl_RawUrl,
  Worker_Interpreters_Unifi_ValidateUrl_Returns,
  Worker_Interpreters_Unifi_ValidateUrl_Url,
} from '../../types/worker/interpreters/unifi.d.ts';

/**
 * Worker - Interpreters - Unifi - Strip Subject Prefix.
 *
 * Removes the bracketed UniFi site-name prefix from email
 * subject lines to produce a clean event type string.
 *
 * @param {Worker_Interpreters_Unifi_StripSubjectPrefix_Subject} subject - Subject.
 *
 * @returns {Worker_Interpreters_Unifi_StripSubjectPrefix_Returns}
 *
 * @since 2.0.0
 */
function stripSubjectPrefix(subject: Worker_Interpreters_Unifi_StripSubjectPrefix_Subject): Worker_Interpreters_Unifi_StripSubjectPrefix_Returns {
  const stripped: Worker_Interpreters_Unifi_StripSubjectPrefix_Stripped = subject.replace(new RegExp(LIB_REGEX_UNIFI_SUBJECT_PREFIX), '');

  return (stripped.trim() !== '') ? stripped.trim() : subject;
}

/**
 * Worker - Interpreters - Unifi - Map Event To Priority.
 *
 * Scans the lowercased text for network event keywords and
 * returns the corresponding ntfy priority level.
 *
 * @param {Worker_Interpreters_Unifi_MapEventToPriority_Text} text - Text.
 *
 * @returns {Worker_Interpreters_Unifi_MapEventToPriority_Returns}
 *
 * @since 2.0.0
 */
function mapEventToPriority(text: Worker_Interpreters_Unifi_MapEventToPriority_Text): Worker_Interpreters_Unifi_MapEventToPriority_Returns {
  const lower: Worker_Interpreters_Unifi_MapEventToPriority_Lower = text.toLowerCase();

  if (
    lower.includes('ids') === true
    || lower.includes('ips') === true
    || lower.includes('threat') === true
    || lower.includes('security') === true
  ) {
    return 5;
  }

  if (
    lower.includes('disconnect') === true
    || lower.includes('down') === true
    || lower.includes('failover') === true
    || lower.includes('lost') === true
  ) {
    return 4;
  }

  if (
    lower.includes('connect') === true
    || lower.includes('reconnect') === true
    || lower.includes('up') === true
    || lower.includes('restored') === true
  ) {
    return 2;
  }

  return 3;
}

/**
 * Worker - Interpreters - Unifi - Map Priority To Emoji Tag.
 *
 * Converts a numeric ntfy priority level into the corresponding
 * emoji shortcode string used as a visual indicator in tags.
 *
 * @param {Worker_Interpreters_Unifi_MapPriorityToEmojiTag_Priority} priority - Priority.
 *
 * @returns {Worker_Interpreters_Unifi_MapPriorityToEmojiTag_Returns}
 *
 * @since 2.0.0
 */
function mapPriorityToEmojiTag(priority: Worker_Interpreters_Unifi_MapPriorityToEmojiTag_Priority): Worker_Interpreters_Unifi_MapPriorityToEmojiTag_Returns {
  switch (priority) {
    case 5: {
      return 'rotating_light';
    }

    case 4: {
      return 'warning';
    }

    case 2: {
      return 'white_check_mark';
    }

    default: {
      return 'bell';
    }
  }
}

/**
 * Worker - Interpreters - Unifi - Extract Device Tags.
 *
 * Scans the lowercased text for UniFi device type keywords
 * and builds an array of matching tag strings.
 *
 * @param {Worker_Interpreters_Unifi_ExtractDeviceTags_Text} text - Text.
 *
 * @returns {Worker_Interpreters_Unifi_ExtractDeviceTags_Returns}
 *
 * @since 2.0.0
 */
function extractDeviceTags(text: Worker_Interpreters_Unifi_ExtractDeviceTags_Text): Worker_Interpreters_Unifi_ExtractDeviceTags_Returns {
  const lower: Worker_Interpreters_Unifi_ExtractDeviceTags_Lower = text.toLowerCase();
  const tags: Worker_Interpreters_Unifi_ExtractDeviceTags_Tags = [];

  if (
    lower.includes('ap') === true
    || lower.includes('access point') === true
  ) {
    tags.push('ap');
  }

  if (lower.includes('switch') === true) {
    tags.push('switch');
  }

  if (
    lower.includes('gateway') === true
    || lower.includes('wan') === true
    || lower.includes('usg') === true
    || lower.includes('udm') === true
  ) {
    tags.push('gateway');
  }

  return tags;
}

/**
 * Worker - Interpreters - Unifi - Validate URL.
 *
 * Attempts to parse the raw string as a URL and returns it
 * on success or undefined if the string is not a valid URL.
 *
 * @param {Worker_Interpreters_Unifi_ValidateUrl_RawUrl} rawUrl - Raw url.
 *
 * @returns {Worker_Interpreters_Unifi_ValidateUrl_Returns}
 *
 * @since 2.1.0
 */
function validateUrl(rawUrl: Worker_Interpreters_Unifi_ValidateUrl_RawUrl): Worker_Interpreters_Unifi_ValidateUrl_Returns {
  try {
    const url: Worker_Interpreters_Unifi_ValidateUrl_Url = new URL(rawUrl);
    const protocol: Worker_Interpreters_Unifi_ValidateUrl_Protocol = url['protocol'];

    if (protocol !== 'http:' && protocol !== 'https:') {
      return undefined;
    }

    return url.href;
  } catch {
    return undefined;
  }
}

/**
 * Worker - Interpreters - Unifi - Interpreter.
 *
 * Parses UniFi notification payloads from string, binary, or
 * email object formats into structured ntfy notification results.
 *
 * @param {Worker_Interpreters_Unifi_Input} input - Input.
 *
 * @returns {Worker_Interpreters_Unifi_Result}
 *
 * @since 2.0.0
 */
const unifiInterpreter: Worker_Interpreters_Unifi_UnifiInterpreter = (input: Worker_Interpreters_Unifi_Input): Worker_Interpreters_Unifi_Result => {
  if (typeof input === 'string') {
    const stringPriority: Worker_Interpreters_Unifi_UnifiInterpreter_StringPriority = mapEventToPriority(input);
    const stringEmojiTag: Worker_Interpreters_Unifi_UnifiInterpreter_StringEmojiTag = mapPriorityToEmojiTag(stringPriority);

    return {
      notification: {
        title: 'UniFi',
        body: input,
        priority: stringPriority,
        tags: [
          'unifi',
          ...extractDeviceTags(input),
          stringEmojiTag,
        ],
        markdown: true,
      },
    };
  }

  if (input instanceof ArrayBuffer) {
    const decoder: Worker_Interpreters_Unifi_UnifiInterpreter_Decoder = new TextDecoder('utf-8');
    const binaryBody: Worker_Interpreters_Unifi_UnifiInterpreter_BinaryBody = decoder.decode(input);
    const binaryPriority: Worker_Interpreters_Unifi_UnifiInterpreter_BinaryPriority = mapEventToPriority(binaryBody);
    const binaryEmojiTag: Worker_Interpreters_Unifi_UnifiInterpreter_BinaryEmojiTag = mapPriorityToEmojiTag(binaryPriority);

    return {
      notification: {
        title: 'UniFi',
        body: binaryBody,
        priority: binaryPriority,
        tags: [
          'unifi',
          ...extractDeviceTags(binaryBody),
          binaryEmojiTag,
        ],
        markdown: true,
      },
    };
  }

  const data: Worker_Interpreters_Unifi_UnifiInterpreter_Data = input as Worker_Interpreters_Unifi_UnifiInterpreter_Data;

  const rawSubject: Worker_Interpreters_Unifi_UnifiInterpreter_RawSubject = data['subject'];
  const subject: Worker_Interpreters_Unifi_UnifiInterpreter_Subject = (typeof rawSubject === 'string') ? rawSubject : '';

  const rawTextBody: Worker_Interpreters_Unifi_UnifiInterpreter_RawTextBody = data['textBody'];
  const textBody: Worker_Interpreters_Unifi_UnifiInterpreter_TextBody = (typeof rawTextBody === 'string') ? rawTextBody : JSON.stringify(data);

  const eventType: Worker_Interpreters_Unifi_UnifiInterpreter_EventType = (subject !== '') ? stripSubjectPrefix(subject) : 'UniFi';
  const combinedText: Worker_Interpreters_Unifi_UnifiInterpreter_CombinedText = `${subject} ${textBody}`;
  const priority: Worker_Interpreters_Unifi_UnifiInterpreter_Priority = mapEventToPriority(combinedText);
  const deviceTags: Worker_Interpreters_Unifi_UnifiInterpreter_DeviceTags = extractDeviceTags(combinedText);

  /*
   * Level 1: Interpreter tag (identifies the source service).
   * Level 2: Keyword tags (matched from email content).
   * Level 3: Webhook tags (not applicable for UniFi email).
   * Level 4: Emoji tags (ntfy emoji shortcodes for visual indicators).
   */
  const emojiTag: Worker_Interpreters_Unifi_UnifiInterpreter_EmojiTag = mapPriorityToEmojiTag(priority);
  const tags: Worker_Interpreters_Unifi_UnifiInterpreter_Tags = [
    'unifi',
    ...deviceTags,
    emojiTag,
  ];

  /* Parse structured fields from text body. */
  const alertMatch: Worker_Interpreters_Unifi_UnifiInterpreter_AlertMatch = textBody.match(new RegExp(LIB_REGEX_UNIFI_ALERT_LINE, 'i'));
  const deviceNameMatch: Worker_Interpreters_Unifi_UnifiInterpreter_DeviceNameMatch = textBody.match(new RegExp(LIB_REGEX_UNIFI_DEVICE_NAME_LINE, 'i'));
  const timeMatch: Worker_Interpreters_Unifi_UnifiInterpreter_TimeMatch = textBody.match(new RegExp(LIB_REGEX_UNIFI_TIME_LINE, 'i'));
  const deviceUrlMatch: Worker_Interpreters_Unifi_UnifiInterpreter_DeviceUrlMatch = textBody.match(new RegExp(LIB_REGEX_UNIFI_DEVICE_URL_LINE, 'i'));

  const alert: Worker_Interpreters_Unifi_UnifiInterpreter_Alert = (alertMatch !== null && alertMatch[1] !== undefined) ? alertMatch[1].trim() : undefined;
  const deviceName: Worker_Interpreters_Unifi_UnifiInterpreter_DeviceName = (deviceNameMatch !== null && deviceNameMatch[1] !== undefined) ? deviceNameMatch[1].trim() : undefined;
  const time: Worker_Interpreters_Unifi_UnifiInterpreter_Time = (timeMatch !== null && timeMatch[1] !== undefined) ? timeMatch[1].trim() : undefined;
  const deviceUrl: Worker_Interpreters_Unifi_UnifiInterpreter_DeviceUrl = (deviceUrlMatch !== null && deviceUrlMatch[1] !== undefined) ? deviceUrlMatch[1] : undefined;
  const validatedDeviceUrl: Worker_Interpreters_Unifi_UnifiInterpreter_ValidatedDeviceUrl = (deviceUrl !== undefined) ? validateUrl(deviceUrl) : undefined;

  /* Build formatted body. */
  const bodyLines: Worker_Interpreters_Unifi_UnifiInterpreter_BodyLines = [];

  if (alert !== undefined) {
    bodyLines.push(alert);
  }

  const details: Worker_Interpreters_Unifi_UnifiInterpreter_Details = [];

  if (deviceName !== undefined) {
    details.push(`**Device:** ${deviceName}`);
  }

  if (time !== undefined) {
    details.push(`**Time:** ${time}`);
  }

  if (details.length > 0) {
    if (bodyLines.length > 0) {
      bodyLines.push('');
    }

    bodyLines.push(...details);
  }

  /* Fallback to raw text if no structured fields found. */
  const body: Worker_Interpreters_Unifi_UnifiInterpreter_Body = (bodyLines.length > 0) ? bodyLines.join('\n') : textBody;

  return {
    notification: {
      title: eventType,
      body,
      priority,
      tags,
      markdown: true,
      ...((validatedDeviceUrl !== undefined) ? { actions: `view, Open UniFi, ${validatedDeviceUrl}, clear=true` } : {}),
    },
  };
};

export {
  unifiInterpreter,
};

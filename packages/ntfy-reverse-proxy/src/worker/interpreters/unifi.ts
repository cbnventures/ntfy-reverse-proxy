import {
  LIB_REGEX_UNIFI_ALERT_LINE,
  LIB_REGEX_UNIFI_DEVICE_NAME_LINE,
  LIB_REGEX_UNIFI_DEVICE_URL_LINE,
  LIB_REGEX_UNIFI_SUBJECT_PREFIX,
  LIB_REGEX_UNIFI_TIME_LINE,
} from '../../lib/regex.js';

import type {
  WorkerInterpretersUnifiExtractDeviceTagsLower,
  WorkerInterpretersUnifiExtractDeviceTagsReturns,
  WorkerInterpretersUnifiExtractDeviceTagsTags,
  WorkerInterpretersUnifiExtractDeviceTagsText,
  WorkerInterpretersUnifiInput,
  WorkerInterpretersUnifiInterpreter,
  WorkerInterpretersUnifiInterpreterAlert,
  WorkerInterpretersUnifiInterpreterAlertMatch,
  WorkerInterpretersUnifiInterpreterBody,
  WorkerInterpretersUnifiInterpreterBodyLines,
  WorkerInterpretersUnifiInterpreterCombinedText,
  WorkerInterpretersUnifiInterpreterData,
  WorkerInterpretersUnifiInterpreterDecoder,
  WorkerInterpretersUnifiInterpreterDetails,
  WorkerInterpretersUnifiInterpreterDeviceName,
  WorkerInterpretersUnifiInterpreterDeviceNameMatch,
  WorkerInterpretersUnifiInterpreterDeviceTags,
  WorkerInterpretersUnifiInterpreterDeviceUrl,
  WorkerInterpretersUnifiInterpreterDeviceUrlMatch,
  WorkerInterpretersUnifiInterpreterEmojiTag,
  WorkerInterpretersUnifiInterpreterEventType,
  WorkerInterpretersUnifiInterpreterPriority,
  WorkerInterpretersUnifiInterpreterRawSubject,
  WorkerInterpretersUnifiInterpreterRawTextBody,
  WorkerInterpretersUnifiInterpreterSubject,
  WorkerInterpretersUnifiInterpreterTags,
  WorkerInterpretersUnifiInterpreterTextBody,
  WorkerInterpretersUnifiInterpreterTime,
  WorkerInterpretersUnifiInterpreterTimeMatch,
  WorkerInterpretersUnifiMapEventToPriorityLower,
  WorkerInterpretersUnifiMapEventToPriorityReturns,
  WorkerInterpretersUnifiMapEventToPriorityText,
  WorkerInterpretersUnifiMapPriorityToEmojiTagPriority,
  WorkerInterpretersUnifiMapPriorityToEmojiTagReturns,
  WorkerInterpretersUnifiResult,
  WorkerInterpretersUnifiStripSubjectPrefixReturns,
  WorkerInterpretersUnifiStripSubjectPrefixStripped,
  WorkerInterpretersUnifiStripSubjectPrefixSubject,
} from '../../types/worker/interpreters/unifi.d.ts';

/**
 * Worker - Interpreters - Unifi - Strip Subject Prefix.
 *
 * Removes the bracketed UniFi site-name prefix from email
 * subject lines to produce a clean event type string.
 *
 * @param {WorkerInterpretersUnifiStripSubjectPrefixSubject} subject - Subject.
 *
 * @returns {WorkerInterpretersUnifiStripSubjectPrefixReturns}
 *
 * @since 2.0.0
 */
const stripSubjectPrefix = (subject: WorkerInterpretersUnifiStripSubjectPrefixSubject): WorkerInterpretersUnifiStripSubjectPrefixReturns => {
  const stripped: WorkerInterpretersUnifiStripSubjectPrefixStripped = subject.replace(new RegExp(LIB_REGEX_UNIFI_SUBJECT_PREFIX), '');

  return (stripped.trim() !== '') ? stripped.trim() : subject;
};

/**
 * Worker - Interpreters - Unifi - Map Event To Priority.
 *
 * Scans the lowercased text for network event keywords and
 * returns the corresponding ntfy priority level.
 *
 * @param {WorkerInterpretersUnifiMapEventToPriorityText} text - Text.
 *
 * @returns {WorkerInterpretersUnifiMapEventToPriorityReturns}
 *
 * @since 2.0.0
 */
const mapEventToPriority = (text: WorkerInterpretersUnifiMapEventToPriorityText): WorkerInterpretersUnifiMapEventToPriorityReturns => {
  const lower: WorkerInterpretersUnifiMapEventToPriorityLower = text.toLowerCase();

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
};

/**
 * Worker - Interpreters - Unifi - Map Priority To Emoji Tag.
 *
 * Converts a numeric ntfy priority level into the corresponding
 * emoji shortcode string used as a visual indicator in tags.
 *
 * @param {WorkerInterpretersUnifiMapPriorityToEmojiTagPriority} priority - Priority.
 *
 * @returns {WorkerInterpretersUnifiMapPriorityToEmojiTagReturns}
 *
 * @since 2.0.0
 */
const mapPriorityToEmojiTag = (priority: WorkerInterpretersUnifiMapPriorityToEmojiTagPriority): WorkerInterpretersUnifiMapPriorityToEmojiTagReturns => {
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
};

/**
 * Worker - Interpreters - Unifi - Extract Device Tags.
 *
 * Scans the lowercased text for UniFi device type keywords
 * and builds an array of matching tag strings.
 *
 * @param {WorkerInterpretersUnifiExtractDeviceTagsText} text - Text.
 *
 * @returns {WorkerInterpretersUnifiExtractDeviceTagsReturns}
 *
 * @since 2.0.0
 */
const extractDeviceTags = (text: WorkerInterpretersUnifiExtractDeviceTagsText): WorkerInterpretersUnifiExtractDeviceTagsReturns => {
  const lower: WorkerInterpretersUnifiExtractDeviceTagsLower = text.toLowerCase();
  const tags: WorkerInterpretersUnifiExtractDeviceTagsTags = [];

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
};

/**
 * Worker - Interpreters - Unifi - Interpreter.
 *
 * Parses UniFi notification payloads from string, binary, or
 * email object formats into structured ntfy notification results.
 *
 * @param {WorkerInterpretersUnifiInput} input - Input.
 *
 * @returns {WorkerInterpretersUnifiResult}
 *
 * @since 2.0.0
 */
const unifiInterpreter: WorkerInterpretersUnifiInterpreter = (input: WorkerInterpretersUnifiInput): WorkerInterpretersUnifiResult => {
  if (typeof input === 'string') {
    const priority: WorkerInterpretersUnifiInterpreterPriority = mapEventToPriority(input);
    const emojiTag: WorkerInterpretersUnifiInterpreterEmojiTag = mapPriorityToEmojiTag(priority);

    return {
      notification: {
        title: 'UniFi',
        body: input,
        priority,
        tags: [
          'unifi',
          ...extractDeviceTags(input),
          emojiTag,
        ],
        markdown: true,
      },
    };
  }

  if (input instanceof ArrayBuffer) {
    const decoder: WorkerInterpretersUnifiInterpreterDecoder = new TextDecoder('utf-8');
    const body: WorkerInterpretersUnifiInterpreterBody = decoder.decode(input);
    const priority: WorkerInterpretersUnifiInterpreterPriority = mapEventToPriority(body);
    const emojiTag: WorkerInterpretersUnifiInterpreterEmojiTag = mapPriorityToEmojiTag(priority);

    return {
      notification: {
        title: 'UniFi',
        body,
        priority,
        tags: [
          'unifi',
          ...extractDeviceTags(body),
          emojiTag,
        ],
        markdown: true,
      },
    };
  }

  const data: WorkerInterpretersUnifiInterpreterData = input as WorkerInterpretersUnifiInterpreterData;

  const rawSubject: WorkerInterpretersUnifiInterpreterRawSubject = data['subject'];
  const subject: WorkerInterpretersUnifiInterpreterSubject = (typeof rawSubject === 'string') ? rawSubject : '';

  const rawTextBody: WorkerInterpretersUnifiInterpreterRawTextBody = data['textBody'];
  const textBody: WorkerInterpretersUnifiInterpreterTextBody = (typeof rawTextBody === 'string') ? rawTextBody : JSON.stringify(data);

  const eventType: WorkerInterpretersUnifiInterpreterEventType = (subject !== '') ? stripSubjectPrefix(subject) : 'UniFi';
  const combinedText: WorkerInterpretersUnifiInterpreterCombinedText = `${subject} ${textBody}`;
  const priority: WorkerInterpretersUnifiInterpreterPriority = mapEventToPriority(combinedText);
  const deviceTags: WorkerInterpretersUnifiInterpreterDeviceTags = extractDeviceTags(combinedText);

  /*
   * Level 1: Interpreter tag (identifies the source service).
   * Level 2: Keyword tags (matched from email content).
   * Level 3: Webhook tags (not applicable for UniFi email).
   * Level 4: Emoji tags (ntfy emoji shortcodes for visual indicators).
   */
  const emojiTag: WorkerInterpretersUnifiInterpreterEmojiTag = mapPriorityToEmojiTag(priority);
  const tags: WorkerInterpretersUnifiInterpreterTags = [
    'unifi',
    ...deviceTags,
    emojiTag,
  ];

  /* Parse structured fields from text body. */
  const alertMatch: WorkerInterpretersUnifiInterpreterAlertMatch = textBody.match(new RegExp(LIB_REGEX_UNIFI_ALERT_LINE, 'i'));
  const deviceNameMatch: WorkerInterpretersUnifiInterpreterDeviceNameMatch = textBody.match(new RegExp(LIB_REGEX_UNIFI_DEVICE_NAME_LINE, 'i'));
  const timeMatch: WorkerInterpretersUnifiInterpreterTimeMatch = textBody.match(new RegExp(LIB_REGEX_UNIFI_TIME_LINE, 'i'));
  const deviceUrlMatch: WorkerInterpretersUnifiInterpreterDeviceUrlMatch = textBody.match(new RegExp(LIB_REGEX_UNIFI_DEVICE_URL_LINE, 'i'));

  const alert: WorkerInterpretersUnifiInterpreterAlert = (alertMatch !== null && alertMatch[1] !== undefined) ? alertMatch[1].trim() : undefined;
  const deviceName: WorkerInterpretersUnifiInterpreterDeviceName = (deviceNameMatch !== null && deviceNameMatch[1] !== undefined) ? deviceNameMatch[1].trim() : undefined;
  const time: WorkerInterpretersUnifiInterpreterTime = (timeMatch !== null && timeMatch[1] !== undefined) ? timeMatch[1].trim() : undefined;
  const deviceUrl: WorkerInterpretersUnifiInterpreterDeviceUrl = (deviceUrlMatch !== null && deviceUrlMatch[1] !== undefined) ? deviceUrlMatch[1] : undefined;

  /* Build formatted body. */
  const bodyLines: WorkerInterpretersUnifiInterpreterBodyLines = [];

  if (alert !== undefined) {
    bodyLines.push(alert);
  }

  const details: WorkerInterpretersUnifiInterpreterDetails = [];

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
  const body: WorkerInterpretersUnifiInterpreterBody = (bodyLines.length > 0) ? bodyLines.join('\n') : textBody;

  return {
    notification: {
      title: eventType,
      body,
      priority,
      tags,
      markdown: true,
      ...(deviceUrl !== undefined ? { actions: `view, Open UniFi, ${deviceUrl}, clear=true` } : {}),
    },
  };
};

export {
  unifiInterpreter,
};

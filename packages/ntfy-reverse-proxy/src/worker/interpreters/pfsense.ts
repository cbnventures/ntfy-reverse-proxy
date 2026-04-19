import type {
  WorkerInterpretersPfsenseExtractContentTagsLower,
  WorkerInterpretersPfsenseExtractContentTagsReturns,
  WorkerInterpretersPfsenseExtractContentTagsTags,
  WorkerInterpretersPfsenseExtractContentTagsText,
  WorkerInterpretersPfsenseInput,
  WorkerInterpretersPfsenseInterpreter,
  WorkerInterpretersPfsenseInterpreterBody,
  WorkerInterpretersPfsenseInterpreterContentTags,
  WorkerInterpretersPfsenseInterpreterData,
  WorkerInterpretersPfsenseInterpreterDecoder,
  WorkerInterpretersPfsenseInterpreterEmojiTag,
  WorkerInterpretersPfsenseInterpreterHostname,
  WorkerInterpretersPfsenseInterpreterNotifications,
  WorkerInterpretersPfsenseInterpreterPriority,
  WorkerInterpretersPfsenseInterpreterRawSubject,
  WorkerInterpretersPfsenseInterpreterRawTextBody,
  WorkerInterpretersPfsenseInterpreterSubject,
  WorkerInterpretersPfsenseInterpreterTags,
  WorkerInterpretersPfsenseInterpreterTextBody,
  WorkerInterpretersPfsenseMapKeywordsToPriorityLower,
  WorkerInterpretersPfsenseMapKeywordsToPriorityReturns,
  WorkerInterpretersPfsenseMapKeywordsToPriorityText,
  WorkerInterpretersPfsenseMapPriorityToEmojiTagPriority,
  WorkerInterpretersPfsenseMapPriorityToEmojiTagReturns,
  WorkerInterpretersPfsenseParseNotificationsLines,
  WorkerInterpretersPfsenseParseNotificationsNotifications,
  WorkerInterpretersPfsenseParseNotificationsPastSeparator,
  WorkerInterpretersPfsenseParseNotificationsReturns,
  WorkerInterpretersPfsenseParseNotificationsTextBody,
  WorkerInterpretersPfsenseParseNotificationsTrimmed,
  WorkerInterpretersPfsenseResult,
} from '../../types/worker/interpreters/pfsense.d.ts';

/**
 * Worker - Interpreters - Pfsense - Map Keywords To Priority.
 *
 * Scans the lowercased text for severity keywords and returns
 * the corresponding ntfy priority level for the notification.
 *
 * @param {WorkerInterpretersPfsenseMapKeywordsToPriorityText} text - Text.
 *
 * @returns {WorkerInterpretersPfsenseMapKeywordsToPriorityReturns}
 *
 * @since 2.0.0
 */
const mapKeywordsToPriority = (text: WorkerInterpretersPfsenseMapKeywordsToPriorityText): WorkerInterpretersPfsenseMapKeywordsToPriorityReturns => {
  const lower: WorkerInterpretersPfsenseMapKeywordsToPriorityLower = text.toLowerCase();

  if (lower.includes('is down') === true) {
    return 5;
  }

  if (
    lower.includes('error') === true
    || lower.includes('bad sectors') === true
  ) {
    return 4;
  }

  if (
    lower.includes('packet loss') === true
    || lower.includes('high latency') === true
    || lower.includes('warning') === true
  ) {
    return 3;
  }

  if (
    lower.includes('is available') === true
    || lower.includes('restored') === true
  ) {
    return 2;
  }

  return 3;
};

/**
 * Worker - Interpreters - Pfsense - Map Priority To Emoji Tag.
 *
 * Converts a numeric ntfy priority level into the corresponding
 * emoji shortcode string used as a visual indicator in tags.
 *
 * @param {WorkerInterpretersPfsenseMapPriorityToEmojiTagPriority} priority - Priority.
 *
 * @returns {WorkerInterpretersPfsenseMapPriorityToEmojiTagReturns}
 *
 * @since 2.0.0
 */
const mapPriorityToEmojiTag = (priority: WorkerInterpretersPfsenseMapPriorityToEmojiTagPriority): WorkerInterpretersPfsenseMapPriorityToEmojiTagReturns => {
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
 * Worker - Interpreters - Pfsense - Extract Content Tags.
 *
 * Scans the lowercased text for infrastructure keywords and builds
 * an array of matching tag strings for the notification payload.
 *
 * @param {WorkerInterpretersPfsenseExtractContentTagsText} text - Text.
 *
 * @returns {WorkerInterpretersPfsenseExtractContentTagsReturns}
 *
 * @since 2.0.0
 */
const extractContentTags = (text: WorkerInterpretersPfsenseExtractContentTagsText): WorkerInterpretersPfsenseExtractContentTagsReturns => {
  const lower: WorkerInterpretersPfsenseExtractContentTagsLower = text.toLowerCase();
  const tags: WorkerInterpretersPfsenseExtractContentTagsTags = [];

  if (lower.includes('gateway') === true) {
    tags.push('gateway');
  }

  if (lower.includes('certificate') === true) {
    tags.push('certificate');
  }

  if (
    lower.includes('firewall') === true
    || lower.includes('filter') === true
  ) {
    tags.push('firewall');
  }

  if (
    lower.includes('openvpn') === true
    || lower.includes('ipsec') === true
    || lower.includes('vpn') === true
  ) {
    tags.push('vpn');
  }

  if (
    lower.includes('dns') === true
    || lower.includes('resolver') === true
  ) {
    tags.push('dns');
  }

  return tags;
};

/**
 * Worker - Interpreters - Pfsense - Parse Notifications.
 *
 * Splits the pfSense email text body into individual notification
 * lines, skipping separator rows and empty lines.
 *
 * @param {WorkerInterpretersPfsenseParseNotificationsTextBody} textBody - Text body.
 *
 * @returns {WorkerInterpretersPfsenseParseNotificationsReturns}
 *
 * @since 2.0.0
 */
const parseNotifications = (textBody: WorkerInterpretersPfsenseParseNotificationsTextBody): WorkerInterpretersPfsenseParseNotificationsReturns => {
  const lines: WorkerInterpretersPfsenseParseNotificationsLines = textBody.split('\n');
  const notifications: WorkerInterpretersPfsenseParseNotificationsNotifications = [];
  let pastSeparator: WorkerInterpretersPfsenseParseNotificationsPastSeparator = false;

  for (const line of lines) {
    const trimmed: WorkerInterpretersPfsenseParseNotificationsTrimmed = line.trim();

    if (trimmed.startsWith('====') === true) {
      pastSeparator = true;

      continue;
    }

    if (trimmed.startsWith('Notifications in this message') === true) {
      continue;
    }

    if (trimmed === '') {
      continue;
    }

    if (pastSeparator === true) {
      notifications.push(trimmed);
    } else {
      notifications.push(trimmed);
    }
  }

  return notifications;
};

/**
 * Worker - Interpreters - Pfsense - Interpreter.
 *
 * Parses pfSense notification payloads from string, binary, or email
 * object formats into structured ntfy notification results.
 *
 * @param {WorkerInterpretersPfsenseInput} input - Input.
 *
 * @returns {WorkerInterpretersPfsenseResult}
 *
 * @since 2.0.0
 */
const pfsenseInterpreter: WorkerInterpretersPfsenseInterpreter = (input: WorkerInterpretersPfsenseInput): WorkerInterpretersPfsenseResult => {
  if (typeof input === 'string') {
    const priority: WorkerInterpretersPfsenseInterpreterPriority = mapKeywordsToPriority(input);
    const emojiTag: WorkerInterpretersPfsenseInterpreterEmojiTag = mapPriorityToEmojiTag(priority);

    return {
      notification: {
        title: 'pfSense',
        body: input,
        priority,
        tags: [
          'pfsense',
          ...extractContentTags(input),
          emojiTag,
        ],
        markdown: true,
      },
    };
  }

  if (input instanceof ArrayBuffer) {
    const decoder: WorkerInterpretersPfsenseInterpreterDecoder = new TextDecoder('utf-8');
    const body: WorkerInterpretersPfsenseInterpreterBody = decoder.decode(input);
    const priority: WorkerInterpretersPfsenseInterpreterPriority = mapKeywordsToPriority(body);
    const emojiTag: WorkerInterpretersPfsenseInterpreterEmojiTag = mapPriorityToEmojiTag(priority);

    return {
      notification: {
        title: 'pfSense',
        body,
        priority,
        tags: [
          'pfsense',
          ...extractContentTags(body),
          emojiTag,
        ],
        markdown: true,
      },
    };
  }

  const data: WorkerInterpretersPfsenseInterpreterData = input as WorkerInterpretersPfsenseInterpreterData;

  const rawSubject: WorkerInterpretersPfsenseInterpreterRawSubject = data['subject'];
  const subject: WorkerInterpretersPfsenseInterpreterSubject = (typeof rawSubject === 'string') ? rawSubject : '';

  const rawTextBody: WorkerInterpretersPfsenseInterpreterRawTextBody = data['textBody'];
  const textBody: WorkerInterpretersPfsenseInterpreterTextBody = (typeof rawTextBody === 'string') ? rawTextBody : JSON.stringify(data);

  const hostname: WorkerInterpretersPfsenseInterpreterHostname = (subject.includes(' - Notification') === true) ? subject.replace(' - Notification', '').trim() : 'pfSense';

  const notifications: WorkerInterpretersPfsenseInterpreterNotifications = parseNotifications(textBody);
  const priority: WorkerInterpretersPfsenseInterpreterPriority = mapKeywordsToPriority(textBody);
  const contentTags: WorkerInterpretersPfsenseInterpreterContentTags = extractContentTags(textBody);

  /*
   * Level 1: Interpreter tag (identifies the source service).
   * Level 2: Keyword tags (matched from email content).
   * Level 3: Webhook tags (not applicable for pfSense email).
   * Level 4: Emoji tags (ntfy emoji shortcodes for visual indicators).
   */
  const emojiTag: WorkerInterpretersPfsenseInterpreterEmojiTag = mapPriorityToEmojiTag(priority);

  const tags: WorkerInterpretersPfsenseInterpreterTags = [
    'pfsense',
    ...contentTags,
    emojiTag,
  ];

  const body: WorkerInterpretersPfsenseInterpreterBody = notifications.join('\n');

  return {
    notification: {
      title: hostname,
      body,
      priority,
      tags,
      markdown: true,
    },
  };
};

export {
  pfsenseInterpreter,
};

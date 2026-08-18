import type {
  Worker_Interpreters_Pfsense_ExtractContentTags_Lower,
  Worker_Interpreters_Pfsense_ExtractContentTags_Returns,
  Worker_Interpreters_Pfsense_ExtractContentTags_Tags,
  Worker_Interpreters_Pfsense_ExtractContentTags_Text,
  Worker_Interpreters_Pfsense_Input,
  Worker_Interpreters_Pfsense_MapKeywordsToPriority_Lower,
  Worker_Interpreters_Pfsense_MapKeywordsToPriority_Returns,
  Worker_Interpreters_Pfsense_MapKeywordsToPriority_Text,
  Worker_Interpreters_Pfsense_MapPriorityToEmojiTag_Priority,
  Worker_Interpreters_Pfsense_MapPriorityToEmojiTag_Returns,
  Worker_Interpreters_Pfsense_ParseNotifications_Lines,
  Worker_Interpreters_Pfsense_ParseNotifications_Notifications,
  Worker_Interpreters_Pfsense_ParseNotifications_Returns,
  Worker_Interpreters_Pfsense_ParseNotifications_TextBody,
  Worker_Interpreters_Pfsense_ParseNotifications_Trimmed,
  Worker_Interpreters_Pfsense_PfsenseInterpreter,
  Worker_Interpreters_Pfsense_PfsenseInterpreter_Body,
  Worker_Interpreters_Pfsense_PfsenseInterpreter_BufferBody,
  Worker_Interpreters_Pfsense_PfsenseInterpreter_BufferEmojiTag,
  Worker_Interpreters_Pfsense_PfsenseInterpreter_BufferPriority,
  Worker_Interpreters_Pfsense_PfsenseInterpreter_ContentTags,
  Worker_Interpreters_Pfsense_PfsenseInterpreter_Data,
  Worker_Interpreters_Pfsense_PfsenseInterpreter_Decoder,
  Worker_Interpreters_Pfsense_PfsenseInterpreter_EmojiTag,
  Worker_Interpreters_Pfsense_PfsenseInterpreter_Hostname,
  Worker_Interpreters_Pfsense_PfsenseInterpreter_Notifications,
  Worker_Interpreters_Pfsense_PfsenseInterpreter_Priority,
  Worker_Interpreters_Pfsense_PfsenseInterpreter_RawSubject,
  Worker_Interpreters_Pfsense_PfsenseInterpreter_RawTextBody,
  Worker_Interpreters_Pfsense_PfsenseInterpreter_StringEmojiTag,
  Worker_Interpreters_Pfsense_PfsenseInterpreter_StringPriority,
  Worker_Interpreters_Pfsense_PfsenseInterpreter_Subject,
  Worker_Interpreters_Pfsense_PfsenseInterpreter_Tags,
  Worker_Interpreters_Pfsense_PfsenseInterpreter_TextBody,
  Worker_Interpreters_Pfsense_Result,
} from '../../types/worker/interpreters/pfsense.d.ts';

/**
 * Worker - Interpreters - Pfsense - Map Keywords To Priority.
 *
 * Scans the lowercased text for severity keywords and returns
 * the corresponding ntfy priority level for the notification.
 *
 * @param {Worker_Interpreters_Pfsense_MapKeywordsToPriority_Text} text - Text.
 *
 * @returns {Worker_Interpreters_Pfsense_MapKeywordsToPriority_Returns}
 *
 * @since 2.0.0
 */
function mapKeywordsToPriority(text: Worker_Interpreters_Pfsense_MapKeywordsToPriority_Text): Worker_Interpreters_Pfsense_MapKeywordsToPriority_Returns {
  const lower: Worker_Interpreters_Pfsense_MapKeywordsToPriority_Lower = text.toLowerCase();

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
}

/**
 * Worker - Interpreters - Pfsense - Map Priority To Emoji Tag.
 *
 * Converts a numeric ntfy priority level into the corresponding
 * emoji shortcode string used as a visual indicator in tags.
 *
 * @param {Worker_Interpreters_Pfsense_MapPriorityToEmojiTag_Priority} priority - Priority.
 *
 * @returns {Worker_Interpreters_Pfsense_MapPriorityToEmojiTag_Returns}
 *
 * @since 2.0.0
 */
function mapPriorityToEmojiTag(priority: Worker_Interpreters_Pfsense_MapPriorityToEmojiTag_Priority): Worker_Interpreters_Pfsense_MapPriorityToEmojiTag_Returns {
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
 * Worker - Interpreters - Pfsense - Extract Content Tags.
 *
 * Scans the lowercased text for infrastructure keywords and builds
 * an array of matching tag strings for the notification payload.
 *
 * @param {Worker_Interpreters_Pfsense_ExtractContentTags_Text} text - Text.
 *
 * @returns {Worker_Interpreters_Pfsense_ExtractContentTags_Returns}
 *
 * @since 2.0.0
 */
function extractContentTags(text: Worker_Interpreters_Pfsense_ExtractContentTags_Text): Worker_Interpreters_Pfsense_ExtractContentTags_Returns {
  const lower: Worker_Interpreters_Pfsense_ExtractContentTags_Lower = text.toLowerCase();
  const tags: Worker_Interpreters_Pfsense_ExtractContentTags_Tags = [];

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
}

/**
 * Worker - Interpreters - Pfsense - Parse Notifications.
 *
 * Splits the pfSense email text body into individual notification
 * lines, skipping separator rows and empty lines.
 *
 * @param {Worker_Interpreters_Pfsense_ParseNotifications_TextBody} textBody - Text body.
 *
 * @returns {Worker_Interpreters_Pfsense_ParseNotifications_Returns}
 *
 * @since 2.0.0
 */
function parseNotifications(textBody: Worker_Interpreters_Pfsense_ParseNotifications_TextBody): Worker_Interpreters_Pfsense_ParseNotifications_Returns {
  const lines: Worker_Interpreters_Pfsense_ParseNotifications_Lines = textBody.split('\n');
  const notifications: Worker_Interpreters_Pfsense_ParseNotifications_Notifications = [];

  for (const line of lines) {
    const trimmed: Worker_Interpreters_Pfsense_ParseNotifications_Trimmed = line.trim();

    if (trimmed.startsWith('====') === true) {
      continue;
    }

    if (trimmed.startsWith('Notifications in this message') === true) {
      continue;
    }

    if (trimmed === '') {
      continue;
    }

    notifications.push(trimmed);
  }

  return notifications;
}

/**
 * Worker - Interpreters - Pfsense - Interpreter.
 *
 * Parses pfSense notification payloads from string, binary, or email
 * object formats into structured ntfy notification results.
 *
 * @param {Worker_Interpreters_Pfsense_Input} input - Input.
 *
 * @returns {Worker_Interpreters_Pfsense_Result}
 *
 * @since 2.0.0
 */
const pfsenseInterpreter: Worker_Interpreters_Pfsense_PfsenseInterpreter = (input: Worker_Interpreters_Pfsense_Input): Worker_Interpreters_Pfsense_Result => {
  if (typeof input === 'string') {
    const stringPriority: Worker_Interpreters_Pfsense_PfsenseInterpreter_StringPriority = mapKeywordsToPriority(input);
    const stringEmojiTag: Worker_Interpreters_Pfsense_PfsenseInterpreter_StringEmojiTag = mapPriorityToEmojiTag(stringPriority);

    return {
      notification: {
        title: 'pfSense',
        body: input,
        priority: stringPriority,
        tags: [
          'pfsense',
          ...extractContentTags(input),
          stringEmojiTag,
        ],
        markdown: true,
      },
    };
  }

  if (input instanceof ArrayBuffer) {
    const decoder: Worker_Interpreters_Pfsense_PfsenseInterpreter_Decoder = new TextDecoder('utf-8');
    const bufferBody: Worker_Interpreters_Pfsense_PfsenseInterpreter_BufferBody = decoder.decode(input);
    const bufferPriority: Worker_Interpreters_Pfsense_PfsenseInterpreter_BufferPriority = mapKeywordsToPriority(bufferBody);
    const bufferEmojiTag: Worker_Interpreters_Pfsense_PfsenseInterpreter_BufferEmojiTag = mapPriorityToEmojiTag(bufferPriority);

    return {
      notification: {
        title: 'pfSense',
        body: bufferBody,
        priority: bufferPriority,
        tags: [
          'pfsense',
          ...extractContentTags(bufferBody),
          bufferEmojiTag,
        ],
        markdown: true,
      },
    };
  }

  const data: Worker_Interpreters_Pfsense_PfsenseInterpreter_Data = input as Worker_Interpreters_Pfsense_PfsenseInterpreter_Data;

  const rawSubject: Worker_Interpreters_Pfsense_PfsenseInterpreter_RawSubject = data['subject'];
  const subject: Worker_Interpreters_Pfsense_PfsenseInterpreter_Subject = (typeof rawSubject === 'string') ? rawSubject : '';

  const rawTextBody: Worker_Interpreters_Pfsense_PfsenseInterpreter_RawTextBody = data['textBody'];
  const textBody: Worker_Interpreters_Pfsense_PfsenseInterpreter_TextBody = (typeof rawTextBody === 'string') ? rawTextBody : JSON.stringify(data);

  const hostname: Worker_Interpreters_Pfsense_PfsenseInterpreter_Hostname = (subject.includes(' - Notification') === true) ? subject.replace(' - Notification', '').trim() : 'pfSense';

  const notifications: Worker_Interpreters_Pfsense_PfsenseInterpreter_Notifications = parseNotifications(textBody);
  const priority: Worker_Interpreters_Pfsense_PfsenseInterpreter_Priority = mapKeywordsToPriority(textBody);
  const contentTags: Worker_Interpreters_Pfsense_PfsenseInterpreter_ContentTags = extractContentTags(textBody);

  /*
   * Level 1: Interpreter tag (identifies the source service).
   * Level 2: Keyword tags (matched from email content).
   * Level 3: Webhook tags (not applicable for pfSense email).
   * Level 4: Emoji tags (ntfy emoji shortcodes for visual indicators).
   */
  const emojiTag: Worker_Interpreters_Pfsense_PfsenseInterpreter_EmojiTag = mapPriorityToEmojiTag(priority);

  const tags: Worker_Interpreters_Pfsense_PfsenseInterpreter_Tags = [
    'pfsense',
    ...contentTags,
    emojiTag,
  ];

  const body: Worker_Interpreters_Pfsense_PfsenseInterpreter_Body = notifications.join('\n');

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

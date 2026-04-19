import type {
  WorkerInterpretersSeerrInput,
  WorkerInterpretersSeerrInterpreter,
  WorkerInterpretersSeerrInterpreterActions,
  WorkerInterpretersSeerrInterpreterBody,
  WorkerInterpretersSeerrInterpreterBodyLines,
  WorkerInterpretersSeerrInterpreterComment,
  WorkerInterpretersSeerrInterpreterCommentedByUsername,
  WorkerInterpretersSeerrInterpreterCommentMessage,
  WorkerInterpretersSeerrInterpreterData,
  WorkerInterpretersSeerrInterpreterDecodedBody,
  WorkerInterpretersSeerrInterpreterDecoder,
  WorkerInterpretersSeerrInterpreterEmojiTag,
  WorkerInterpretersSeerrInterpreterEvent,
  WorkerInterpretersSeerrInterpreterImage,
  WorkerInterpretersSeerrInterpreterIssue,
  WorkerInterpretersSeerrInterpreterIssueType,
  WorkerInterpretersSeerrInterpreterMedia,
  WorkerInterpretersSeerrInterpreterMediaStatus,
  WorkerInterpretersSeerrInterpreterMediaType,
  WorkerInterpretersSeerrInterpreterMessage,
  WorkerInterpretersSeerrInterpreterNotificationType,
  WorkerInterpretersSeerrInterpreterParsed,
  WorkerInterpretersSeerrInterpreterPriority,
  WorkerInterpretersSeerrInterpreterProxyConfig,
  WorkerInterpretersSeerrInterpreterRawCommentDefault,
  WorkerInterpretersSeerrInterpreterRawIssueDefault,
  WorkerInterpretersSeerrInterpreterRawMediaDefault,
  WorkerInterpretersSeerrInterpreterRawProxyConfigDefault,
  WorkerInterpretersSeerrInterpreterRawRequestDefault,
  WorkerInterpretersSeerrInterpreterRawSeerrUrl,
  WorkerInterpretersSeerrInterpreterReportedByUsername,
  WorkerInterpretersSeerrInterpreterRequest,
  WorkerInterpretersSeerrInterpreterRequestedByUsername,
  WorkerInterpretersSeerrInterpreterSeerrUrl,
  WorkerInterpretersSeerrInterpreterSubject,
  WorkerInterpretersSeerrInterpreterTags,
  WorkerInterpretersSeerrInterpreterTitle,
  WorkerInterpretersSeerrInterpreterTmdbId,
  WorkerInterpretersSeerrInterpreterTmdbUrl,
  WorkerInterpretersSeerrMapNotificationTypeToPriorityNotificationType,
  WorkerInterpretersSeerrMapNotificationTypeToPriorityReturns,
  WorkerInterpretersSeerrMapPriorityToEmojiTagPriority,
  WorkerInterpretersSeerrMapPriorityToEmojiTagReturns,
  WorkerInterpretersSeerrResult,
  WorkerInterpretersSeerrValidateUrlRawUrl,
  WorkerInterpretersSeerrValidateUrlReturns,
  WorkerInterpretersSeerrValidateUrlUrl,
} from '../../types/worker/interpreters/seerr.d.ts';

/**
 * Worker - Interpreters - Seerr - Map Notification Type To Priority.
 *
 * Converts a Seerr notification type string into the corresponding
 * ntfy priority level based on event severity.
 *
 * @param {WorkerInterpretersSeerrMapNotificationTypeToPriorityNotificationType} notificationType - Notification type.
 *
 * @returns {WorkerInterpretersSeerrMapNotificationTypeToPriorityReturns}
 *
 * @since 2.0.0
 */
const mapNotificationTypeToPriority = (notificationType: WorkerInterpretersSeerrMapNotificationTypeToPriorityNotificationType): WorkerInterpretersSeerrMapNotificationTypeToPriorityReturns => {
  switch (notificationType) {
    case 'MEDIA_FAILED': {
      return 4;
    }

    case 'ISSUE_CREATED':
    case 'ISSUE_REOPENED':
    case 'MEDIA_PENDING':
    case 'MEDIA_APPROVED':
    case 'MEDIA_AUTO_APPROVED':
    case 'MEDIA_AUTO_REQUESTED':
    case 'MEDIA_DECLINED':
    case 'ISSUE_COMMENT': {
      return 3;
    }

    case 'MEDIA_AVAILABLE':
    case 'ISSUE_RESOLVED':
    case 'TEST_NOTIFICATION': {
      return 2;
    }

    default: {
      return 3;
    }
  }
};

/**
 * Worker - Interpreters - Seerr - Map Priority To Emoji Tag.
 *
 * Converts a numeric ntfy priority level into the corresponding
 * emoji shortcode string used as a visual indicator in tags.
 *
 * @param {WorkerInterpretersSeerrMapPriorityToEmojiTagPriority} priority - Priority.
 *
 * @returns {WorkerInterpretersSeerrMapPriorityToEmojiTagReturns}
 *
 * @since 2.0.0
 */
const mapPriorityToEmojiTag = (priority: WorkerInterpretersSeerrMapPriorityToEmojiTagPriority): WorkerInterpretersSeerrMapPriorityToEmojiTagReturns => {
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
      return 'movie_camera';
    }
  }
};

/**
 * Worker - Interpreters - Seerr - Validate URL.
 *
 * Attempts to parse the raw string as a URL and returns it
 * on success or undefined if the string is not a valid URL.
 *
 * @param {WorkerInterpretersSeerrValidateUrlRawUrl} rawUrl - Raw url.
 *
 * @returns {WorkerInterpretersSeerrValidateUrlReturns}
 *
 * @since 2.0.0
 */
const validateUrl = (rawUrl: WorkerInterpretersSeerrValidateUrlRawUrl): WorkerInterpretersSeerrValidateUrlReturns => {
  try {
    const url: WorkerInterpretersSeerrValidateUrlUrl = new URL(rawUrl);

    return url.href;
  } catch {
    return undefined;
  }
};

/**
 * Worker - Interpreters - Seerr - Interpreter.
 *
 * Parses Seerr webhook payloads and builds a structured ntfy
 * notification with media metadata, action links, and tags.
 *
 * @param {WorkerInterpretersSeerrInput} input - Input.
 *
 * @returns {WorkerInterpretersSeerrResult}
 *
 * @since 2.0.0
 */
const seerrInterpreter: WorkerInterpretersSeerrInterpreter = (input: WorkerInterpretersSeerrInput): WorkerInterpretersSeerrResult => {
  let parsed: WorkerInterpretersSeerrInterpreterParsed = undefined;

  if (typeof input === 'string') {
    try {
      parsed = JSON.parse(input);
    } catch {
      return {
        notification: {
          title: '[Seerr] Notification',
          body: input,
          priority: 3,
          tags: [
            'seerr',
            'movie_camera',
          ],
          markdown: true,
        },
      };
    }
  } else if (input instanceof ArrayBuffer) {
    const decoder: WorkerInterpretersSeerrInterpreterDecoder = new TextDecoder('utf-8');
    const decodedBody: WorkerInterpretersSeerrInterpreterDecodedBody = decoder.decode(input);

    try {
      parsed = JSON.parse(decodedBody);
    } catch {
      return {
        notification: {
          title: '[Seerr] Notification',
          body: decodedBody,
          priority: 3,
          tags: [
            'seerr',
            'movie_camera',
          ],
          markdown: true,
        },
      };
    }
  } else {
    parsed = input;
  }

  const data: WorkerInterpretersSeerrInterpreterData = parsed as WorkerInterpretersSeerrInterpreterData;
  const notificationType: WorkerInterpretersSeerrInterpreterNotificationType = (typeof data['notification_type'] === 'string') ? data['notification_type'] : 'UNKNOWN';
  const event: WorkerInterpretersSeerrInterpreterEvent = (typeof data['event'] === 'string') ? data['event'] : 'Notification';
  const subject: WorkerInterpretersSeerrInterpreterSubject = (typeof data['subject'] === 'string') ? data['subject'] : '';
  const message: WorkerInterpretersSeerrInterpreterMessage = (typeof data['message'] === 'string') ? data['message'] : '';
  const image: WorkerInterpretersSeerrInterpreterImage = (typeof data['image'] === 'string') ? data['image'] : undefined;

  const rawMediaDefault: WorkerInterpretersSeerrInterpreterRawMediaDefault = {};
  const media: WorkerInterpretersSeerrInterpreterMedia = (data['media'] !== undefined) ? data['media'] as WorkerInterpretersSeerrInterpreterMedia : rawMediaDefault;
  const mediaType: WorkerInterpretersSeerrInterpreterMediaType = (typeof media['media_type'] === 'string') ? media['media_type'] : '';
  const tmdbId: WorkerInterpretersSeerrInterpreterTmdbId = (typeof media['tmdbId'] === 'string') ? media['tmdbId'] : '';
  const mediaStatus: WorkerInterpretersSeerrInterpreterMediaStatus = (typeof media['status'] === 'string') ? media['status'] : '';

  const rawRequestDefault: WorkerInterpretersSeerrInterpreterRawRequestDefault = {};
  const request: WorkerInterpretersSeerrInterpreterRequest = (data['request'] !== undefined) ? data['request'] as WorkerInterpretersSeerrInterpreterRequest : rawRequestDefault;
  const requestedByUsername: WorkerInterpretersSeerrInterpreterRequestedByUsername = (typeof request['requestedBy_username'] === 'string') ? request['requestedBy_username'] : '';

  const rawIssueDefault: WorkerInterpretersSeerrInterpreterRawIssueDefault = {};
  const issue: WorkerInterpretersSeerrInterpreterIssue = (data['issue'] !== undefined) ? data['issue'] as WorkerInterpretersSeerrInterpreterIssue : rawIssueDefault;
  const issueType: WorkerInterpretersSeerrInterpreterIssueType = (typeof issue['issue_type'] === 'string') ? issue['issue_type'] : '';
  const reportedByUsername: WorkerInterpretersSeerrInterpreterReportedByUsername = (typeof issue['reportedBy_username'] === 'string') ? issue['reportedBy_username'] : '';

  const rawCommentDefault: WorkerInterpretersSeerrInterpreterRawCommentDefault = {};
  const comment: WorkerInterpretersSeerrInterpreterComment = (data['comment'] !== undefined) ? data['comment'] as WorkerInterpretersSeerrInterpreterComment : rawCommentDefault;
  const commentMessage: WorkerInterpretersSeerrInterpreterCommentMessage = (typeof comment['comment_message'] === 'string') ? comment['comment_message'] : '';
  const commentedByUsername: WorkerInterpretersSeerrInterpreterCommentedByUsername = (typeof comment['commentedBy_username'] === 'string') ? comment['commentedBy_username'] : '';

  const title: WorkerInterpretersSeerrInterpreterTitle = `[Seerr] ${event}`;

  const bodyLines: WorkerInterpretersSeerrInterpreterBodyLines = [];

  if (subject !== '') {
    bodyLines.push(`**${subject}**`);
  }

  if (message !== '') {
    bodyLines.push(message);
  }

  if (mediaType !== '' || mediaStatus !== '') {
    bodyLines.push(`**Type:** ${mediaType} | **Status:** ${mediaStatus}`);
  }

  if (requestedByUsername !== '') {
    bodyLines.push(`**Requested by:** ${requestedByUsername}`);
  }

  if (reportedByUsername !== '' || issueType !== '') {
    bodyLines.push(`**Reported by:** ${reportedByUsername} | **Type:** ${issueType}`);
  }

  if (commentedByUsername !== '' && commentMessage !== '') {
    bodyLines.push(`**Comment by:** ${commentedByUsername}: ${commentMessage}`);
  }

  const body: WorkerInterpretersSeerrInterpreterBody = bodyLines.join('\n');
  const priority: WorkerInterpretersSeerrInterpreterPriority = mapNotificationTypeToPriority(notificationType);

  /*
   * Level 1: Interpreter tag (identifies the source service).
   * Level 2: Keyword tags (not applicable for Seerr).
   * Level 3: Webhook tags (not applicable for Seerr).
   * Level 4: Emoji tags (ntfy emoji shortcodes for visual indicators).
   */
  const emojiTag: WorkerInterpretersSeerrInterpreterEmojiTag = mapPriorityToEmojiTag(priority);
  const tags: WorkerInterpretersSeerrInterpreterTags = [
    'seerr',
    emojiTag,
  ];

  const tmdbUrl: WorkerInterpretersSeerrInterpreterTmdbUrl = (tmdbId !== '' && mediaType !== '') ? `https://www.themoviedb.org/${mediaType}/${tmdbId}` : undefined;

  /* Extract optional Seerr dashboard URL from payload. */
  const rawProxyConfigDefault: WorkerInterpretersSeerrInterpreterRawProxyConfigDefault = {};
  const proxyConfig: WorkerInterpretersSeerrInterpreterProxyConfig = (typeof data['ntfy-reverse-proxy'] === 'object' && data['ntfy-reverse-proxy'] !== null) ? data['ntfy-reverse-proxy'] as WorkerInterpretersSeerrInterpreterProxyConfig : rawProxyConfigDefault;
  const rawSeerrUrl: WorkerInterpretersSeerrInterpreterRawSeerrUrl = proxyConfig['url'];
  let seerrUrl: WorkerInterpretersSeerrInterpreterSeerrUrl = undefined;

  if (typeof rawSeerrUrl === 'string') {
    seerrUrl = validateUrl(rawSeerrUrl);
  }

  const actions: WorkerInterpretersSeerrInterpreterActions = [];

  if (tmdbUrl !== undefined) {
    actions.push(`view, View on TMDB, ${tmdbUrl}`);
  }

  if (seerrUrl !== undefined) {
    actions.push(`view, Open Seerr, ${seerrUrl}`);
  }

  return {
    notification: {
      title,
      body,
      priority,
      tags,
      markdown: true,
      ...(image !== undefined ? { icon: image } : {}),
      ...(actions.length > 0 ? { actions: actions.join('; ') } : {}),
    },
  };
};

export {
  seerrInterpreter,
};

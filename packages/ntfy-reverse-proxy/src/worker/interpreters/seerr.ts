import type {
  Worker_Interpreters_Seerr_Input,
  Worker_Interpreters_Seerr_MapNotificationTypeToPriority_NotificationType,
  Worker_Interpreters_Seerr_MapNotificationTypeToPriority_Returns,
  Worker_Interpreters_Seerr_MapPriorityToEmojiTag_Priority,
  Worker_Interpreters_Seerr_MapPriorityToEmojiTag_Returns,
  Worker_Interpreters_Seerr_Result,
  Worker_Interpreters_Seerr_SeerrInterpreter,
  Worker_Interpreters_Seerr_SeerrInterpreter_Actions,
  Worker_Interpreters_Seerr_SeerrInterpreter_Body,
  Worker_Interpreters_Seerr_SeerrInterpreter_BodyLines,
  Worker_Interpreters_Seerr_SeerrInterpreter_Comment,
  Worker_Interpreters_Seerr_SeerrInterpreter_CommentedByUsername,
  Worker_Interpreters_Seerr_SeerrInterpreter_CommentMessage,
  Worker_Interpreters_Seerr_SeerrInterpreter_Data,
  Worker_Interpreters_Seerr_SeerrInterpreter_DecodedBody,
  Worker_Interpreters_Seerr_SeerrInterpreter_Decoder,
  Worker_Interpreters_Seerr_SeerrInterpreter_EmojiTag,
  Worker_Interpreters_Seerr_SeerrInterpreter_Event,
  Worker_Interpreters_Seerr_SeerrInterpreter_Image,
  Worker_Interpreters_Seerr_SeerrInterpreter_Issue,
  Worker_Interpreters_Seerr_SeerrInterpreter_IssueType,
  Worker_Interpreters_Seerr_SeerrInterpreter_Media,
  Worker_Interpreters_Seerr_SeerrInterpreter_MediaStatus,
  Worker_Interpreters_Seerr_SeerrInterpreter_MediaType,
  Worker_Interpreters_Seerr_SeerrInterpreter_Message,
  Worker_Interpreters_Seerr_SeerrInterpreter_NotificationType,
  Worker_Interpreters_Seerr_SeerrInterpreter_Parsed,
  Worker_Interpreters_Seerr_SeerrInterpreter_Priority,
  Worker_Interpreters_Seerr_SeerrInterpreter_ProxyConfig,
  Worker_Interpreters_Seerr_SeerrInterpreter_RawCommentDefault,
  Worker_Interpreters_Seerr_SeerrInterpreter_RawIssueDefault,
  Worker_Interpreters_Seerr_SeerrInterpreter_RawMediaDefault,
  Worker_Interpreters_Seerr_SeerrInterpreter_RawProxyConfigDefault,
  Worker_Interpreters_Seerr_SeerrInterpreter_RawRequestDefault,
  Worker_Interpreters_Seerr_SeerrInterpreter_RawSeerrUrl,
  Worker_Interpreters_Seerr_SeerrInterpreter_ReportedByUsername,
  Worker_Interpreters_Seerr_SeerrInterpreter_Request,
  Worker_Interpreters_Seerr_SeerrInterpreter_RequestedByUsername,
  Worker_Interpreters_Seerr_SeerrInterpreter_SeerrUrl,
  Worker_Interpreters_Seerr_SeerrInterpreter_Subject,
  Worker_Interpreters_Seerr_SeerrInterpreter_Tags,
  Worker_Interpreters_Seerr_SeerrInterpreter_Title,
  Worker_Interpreters_Seerr_SeerrInterpreter_TmdbId,
  Worker_Interpreters_Seerr_SeerrInterpreter_TmdbUrl,
  Worker_Interpreters_Seerr_ValidateUrl_Protocol,
  Worker_Interpreters_Seerr_ValidateUrl_RawUrl,
  Worker_Interpreters_Seerr_ValidateUrl_Returns,
  Worker_Interpreters_Seerr_ValidateUrl_Url,
} from '../../types/worker/interpreters/seerr.d.ts';

/**
 * Worker - Interpreters - Seerr - Map Notification Type To Priority.
 *
 * Converts a Seerr notification type string into the corresponding
 * ntfy priority level based on event severity.
 *
 * @param {Worker_Interpreters_Seerr_MapNotificationTypeToPriority_NotificationType} notificationType - Notification type.
 *
 * @returns {Worker_Interpreters_Seerr_MapNotificationTypeToPriority_Returns}
 *
 * @since 2.0.0
 */
function mapNotificationTypeToPriority(notificationType: Worker_Interpreters_Seerr_MapNotificationTypeToPriority_NotificationType): Worker_Interpreters_Seerr_MapNotificationTypeToPriority_Returns {
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
}

/**
 * Worker - Interpreters - Seerr - Map Priority To Emoji Tag.
 *
 * Converts a numeric ntfy priority level into the corresponding
 * emoji shortcode string used as a visual indicator in tags.
 *
 * @param {Worker_Interpreters_Seerr_MapPriorityToEmojiTag_Priority} priority - Priority.
 *
 * @returns {Worker_Interpreters_Seerr_MapPriorityToEmojiTag_Returns}
 *
 * @since 2.0.0
 */
function mapPriorityToEmojiTag(priority: Worker_Interpreters_Seerr_MapPriorityToEmojiTag_Priority): Worker_Interpreters_Seerr_MapPriorityToEmojiTag_Returns {
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
}

/**
 * Worker - Interpreters - Seerr - Validate URL.
 *
 * Attempts to parse the raw string as a URL and returns it
 * on success or undefined if the string is not a valid URL.
 *
 * @param {Worker_Interpreters_Seerr_ValidateUrl_RawUrl} rawUrl - Raw url.
 *
 * @returns {Worker_Interpreters_Seerr_ValidateUrl_Returns}
 *
 * @since 2.0.0
 */
function validateUrl(rawUrl: Worker_Interpreters_Seerr_ValidateUrl_RawUrl): Worker_Interpreters_Seerr_ValidateUrl_Returns {
  try {
    const url: Worker_Interpreters_Seerr_ValidateUrl_Url = new URL(rawUrl);
    const protocol: Worker_Interpreters_Seerr_ValidateUrl_Protocol = url['protocol'];

    if (protocol !== 'http:' && protocol !== 'https:') {
      return undefined;
    }

    return url.href;
  } catch {
    return undefined;
  }
}

/**
 * Worker - Interpreters - Seerr - Interpreter.
 *
 * Parses Seerr webhook payloads and builds a structured ntfy
 * notification with media metadata, action links, and tags.
 *
 * @param {Worker_Interpreters_Seerr_Input} input - Input.
 *
 * @returns {Worker_Interpreters_Seerr_Result}
 *
 * @since 2.0.0
 */
const seerrInterpreter: Worker_Interpreters_Seerr_SeerrInterpreter = (input: Worker_Interpreters_Seerr_Input): Worker_Interpreters_Seerr_Result => {
  let parsed: Worker_Interpreters_Seerr_SeerrInterpreter_Parsed = undefined;

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
    const decoder: Worker_Interpreters_Seerr_SeerrInterpreter_Decoder = new TextDecoder('utf-8');
    const decodedBody: Worker_Interpreters_Seerr_SeerrInterpreter_DecodedBody = decoder.decode(input);

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

  const data: Worker_Interpreters_Seerr_SeerrInterpreter_Data = parsed as Worker_Interpreters_Seerr_SeerrInterpreter_Data;
  const notificationType: Worker_Interpreters_Seerr_SeerrInterpreter_NotificationType = (typeof data['notification_type'] === 'string') ? data['notification_type'] : 'UNKNOWN';
  const event: Worker_Interpreters_Seerr_SeerrInterpreter_Event = (typeof data['event'] === 'string') ? data['event'] : 'Notification';
  const subject: Worker_Interpreters_Seerr_SeerrInterpreter_Subject = (typeof data['subject'] === 'string') ? data['subject'] : '';
  const message: Worker_Interpreters_Seerr_SeerrInterpreter_Message = (typeof data['message'] === 'string') ? data['message'] : '';
  const image: Worker_Interpreters_Seerr_SeerrInterpreter_Image = (typeof data['image'] === 'string') ? data['image'] : undefined;

  const rawMediaDefault: Worker_Interpreters_Seerr_SeerrInterpreter_RawMediaDefault = {};
  const media: Worker_Interpreters_Seerr_SeerrInterpreter_Media = (typeof data['media'] === 'object' && data['media'] !== null) ? data['media'] as Worker_Interpreters_Seerr_SeerrInterpreter_Media : rawMediaDefault;
  const mediaType: Worker_Interpreters_Seerr_SeerrInterpreter_MediaType = (typeof media['media_type'] === 'string') ? media['media_type'] : '';
  const tmdbId: Worker_Interpreters_Seerr_SeerrInterpreter_TmdbId = (typeof media['tmdbId'] === 'string') ? media['tmdbId'] : '';
  const mediaStatus: Worker_Interpreters_Seerr_SeerrInterpreter_MediaStatus = (typeof media['status'] === 'string') ? media['status'] : '';

  const rawRequestDefault: Worker_Interpreters_Seerr_SeerrInterpreter_RawRequestDefault = {};
  const request: Worker_Interpreters_Seerr_SeerrInterpreter_Request = (typeof data['request'] === 'object' && data['request'] !== null) ? data['request'] as Worker_Interpreters_Seerr_SeerrInterpreter_Request : rawRequestDefault;
  const requestedByUsername: Worker_Interpreters_Seerr_SeerrInterpreter_RequestedByUsername = (typeof request['requestedBy_username'] === 'string') ? request['requestedBy_username'] : '';

  const rawIssueDefault: Worker_Interpreters_Seerr_SeerrInterpreter_RawIssueDefault = {};
  const issue: Worker_Interpreters_Seerr_SeerrInterpreter_Issue = (typeof data['issue'] === 'object' && data['issue'] !== null) ? data['issue'] as Worker_Interpreters_Seerr_SeerrInterpreter_Issue : rawIssueDefault;
  const issueType: Worker_Interpreters_Seerr_SeerrInterpreter_IssueType = (typeof issue['issue_type'] === 'string') ? issue['issue_type'] : '';
  const reportedByUsername: Worker_Interpreters_Seerr_SeerrInterpreter_ReportedByUsername = (typeof issue['reportedBy_username'] === 'string') ? issue['reportedBy_username'] : '';

  const rawCommentDefault: Worker_Interpreters_Seerr_SeerrInterpreter_RawCommentDefault = {};
  const comment: Worker_Interpreters_Seerr_SeerrInterpreter_Comment = (typeof data['comment'] === 'object' && data['comment'] !== null) ? data['comment'] as Worker_Interpreters_Seerr_SeerrInterpreter_Comment : rawCommentDefault;
  const commentMessage: Worker_Interpreters_Seerr_SeerrInterpreter_CommentMessage = (typeof comment['comment_message'] === 'string') ? comment['comment_message'] : '';
  const commentedByUsername: Worker_Interpreters_Seerr_SeerrInterpreter_CommentedByUsername = (typeof comment['commentedBy_username'] === 'string') ? comment['commentedBy_username'] : '';

  const title: Worker_Interpreters_Seerr_SeerrInterpreter_Title = `[Seerr] ${event}`;

  const bodyLines: Worker_Interpreters_Seerr_SeerrInterpreter_BodyLines = [];

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

  const body: Worker_Interpreters_Seerr_SeerrInterpreter_Body = bodyLines.join('\n');
  const priority: Worker_Interpreters_Seerr_SeerrInterpreter_Priority = mapNotificationTypeToPriority(notificationType);

  /*
   * Level 1: Interpreter tag (identifies the source service).
   * Level 2: Keyword tags (not applicable for Seerr).
   * Level 3: Webhook tags (not applicable for Seerr).
   * Level 4: Emoji tags (ntfy emoji shortcodes for visual indicators).
   */
  const emojiTag: Worker_Interpreters_Seerr_SeerrInterpreter_EmojiTag = mapPriorityToEmojiTag(priority);
  const tags: Worker_Interpreters_Seerr_SeerrInterpreter_Tags = [
    'seerr',
    emojiTag,
  ];

  const tmdbUrl: Worker_Interpreters_Seerr_SeerrInterpreter_TmdbUrl = (tmdbId !== '' && mediaType !== '') ? `https://www.themoviedb.org/${mediaType}/${tmdbId}` : undefined;

  /* Extract optional Seerr dashboard URL from payload. */
  const rawProxyConfigDefault: Worker_Interpreters_Seerr_SeerrInterpreter_RawProxyConfigDefault = {};
  const proxyConfig: Worker_Interpreters_Seerr_SeerrInterpreter_ProxyConfig = (typeof data['ntfy-reverse-proxy'] === 'object' && data['ntfy-reverse-proxy'] !== null) ? data['ntfy-reverse-proxy'] as Worker_Interpreters_Seerr_SeerrInterpreter_ProxyConfig : rawProxyConfigDefault;
  const rawSeerrUrl: Worker_Interpreters_Seerr_SeerrInterpreter_RawSeerrUrl = proxyConfig['url'];
  let seerrUrl: Worker_Interpreters_Seerr_SeerrInterpreter_SeerrUrl = undefined;

  if (typeof rawSeerrUrl === 'string') {
    seerrUrl = validateUrl(rawSeerrUrl);
  }

  const actions: Worker_Interpreters_Seerr_SeerrInterpreter_Actions = [];

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
      ...((image !== undefined) ? { icon: image } : {}),
      ...((actions.length > 0) ? { actions: actions.join('; ') } : {}),
    },
  };
};

export {
  seerrInterpreter,
};

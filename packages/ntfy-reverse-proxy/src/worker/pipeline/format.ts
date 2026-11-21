import type {
  Worker_Pipeline_Format_Body,
  Worker_Pipeline_Format_Cf,
  Worker_Pipeline_Format_Format_Bold_Bold,
  Worker_Pipeline_Format_Ip,
  Worker_Pipeline_Format_IsMarkdown,
  Worker_Pipeline_Format_Lines,
  Worker_Pipeline_Format_Notification,
  Worker_Pipeline_Format_Options,
  Worker_Pipeline_Format_Returns,
  Worker_Pipeline_Format_Separator,
} from '../../types/worker/pipeline/format.d.ts';

/**
 * Worker - Pipeline - Format - Format.
 *
 * Transforms a parsed notification object into the final message
 * body and fields, which the ntfy client turns into its request.
 *
 * @returns {Worker_Pipeline_Format_Returns}
 *
 * @since 2.0.0
 */
function format(notification: Worker_Pipeline_Format_Notification, options: Worker_Pipeline_Format_Options): Worker_Pipeline_Format_Returns {
  let body: Worker_Pipeline_Format_Body = notification['body'];

  if (options['showVisitorInfo'] === true && options['cfProperties'] !== undefined) {
    const cf: Worker_Pipeline_Format_Cf = options['cfProperties'];
    const ip: Worker_Pipeline_Format_Ip = options['visitorIp'] ?? 'unknown';
    const separator: Worker_Pipeline_Format_Separator = (notification['markdown'] === true) ? '\n\n---\n\n' : '\n\n';
    const isMarkdown: Worker_Pipeline_Format_IsMarkdown = notification['markdown'] === true;
    /**
     * Worker - Pipeline - Format - Format - Bold.
     *
     * Wraps the passed text in Markdown bold markers when the
     * notification is Markdown, otherwise returns it unchanged.
     *
     * @param {string} text - Text.
     *
     * @private
     *
     * @returns {Worker_Pipeline_Format_Format_Bold_Bold_Returns}
     *
     * @since 2.1.0
     */
    const bold: Worker_Pipeline_Format_Format_Bold_Bold = (text) => (isMarkdown === true) ? `**${text}**` : text;

    const lines: Worker_Pipeline_Format_Lines = [
      bold('« Incoming Request Details »'),
      `${bold('IP address')}: ${ip}`,
      `${bold('Location')}: ${cf['region'] ?? 'Unknown'} (country: ${cf['country'] ?? 'Unknown'}, colo: ${cf['colo'] ?? 'Unknown'})`,
      `${bold('Coordinates')}: ${cf['latitude'] ?? 'Unknown'}, ${cf['longitude'] ?? 'Unknown'}`,
      `${bold('Provider')}: ${cf['asOrganization'] ?? 'Unknown'} (asn: ${String(cf['asn'] ?? 'Unknown')})`,
    ];

    body = `${body}${separator}${lines.join('\n')}`;
  }

  return {
    body,
    ...((notification['title'] !== undefined) ? { title: notification['title'] } : {}),
    ...((notification['priority'] !== undefined) ? { priority: notification['priority'] } : {}),
    ...((notification['tags'] !== undefined) ? { tags: notification['tags'] } : {}),
    ...((notification['markdown'] !== undefined) ? { markdown: notification['markdown'] } : {}),
    ...((notification['icon'] !== undefined) ? { icon: notification['icon'] } : {}),
    ...((notification['actions'] !== undefined) ? { actions: notification['actions'] } : {}),
    ...((notification['attach'] !== undefined) ? { attach: notification['attach'] } : {}),
    ...((notification['filename'] !== undefined) ? { filename: notification['filename'] } : {}),
  };
}

export {
  format,
};

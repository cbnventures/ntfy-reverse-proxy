import type {
  Worker_Pipeline_Format_Body,
  Worker_Pipeline_Format_Cf,
  Worker_Pipeline_Format_Format_Bold_Bold,
  Worker_Pipeline_Format_Headers,
  Worker_Pipeline_Format_Ip,
  Worker_Pipeline_Format_IsMarkdown,
  Worker_Pipeline_Format_Lines,
  Worker_Pipeline_Format_Notification,
  Worker_Pipeline_Format_Options,
  Worker_Pipeline_Format_Returns,
  Worker_Pipeline_Format_Separator,
} from '../../types/worker/pipeline/format.d.ts';

/**
 * Worker - Pipeline - Format.
 *
 * Transforms a parsed notification object into the final request
 * body and ntfy-compatible headers for delivery to the server.
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

  const headers: Worker_Pipeline_Format_Headers = {};

  if (notification['title'] !== undefined) {
    Reflect.set(headers, 'X-Title', notification['title']);
  }

  if (notification['priority'] !== undefined) {
    Reflect.set(headers, 'X-Priority', String(notification['priority']));
  }

  if (notification['tags'] !== undefined) {
    Reflect.set(headers, 'X-Tags', notification['tags'].join(','));
  }

  if (notification['markdown'] !== undefined) {
    Reflect.set(headers, 'X-Markdown', String(notification['markdown']));
  }

  if (notification['icon'] !== undefined) {
    Reflect.set(headers, 'X-Icon', notification['icon']);
  }

  if (notification['actions'] !== undefined) {
    Reflect.set(headers, 'X-Actions', notification['actions']);
  }

  if (notification['attach'] !== undefined) {
    Reflect.set(headers, 'X-Attach', notification['attach']);
  }

  if (notification['filename'] !== undefined) {
    Reflect.set(headers, 'X-Filename', notification['filename']);
  }

  return {
    body,
    headers,
  };
}

export {
  format,
};

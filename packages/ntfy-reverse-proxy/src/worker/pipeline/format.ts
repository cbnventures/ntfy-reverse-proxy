import type {
  WorkerPipelineFormatBody,
  WorkerPipelineFormatBoldFn,
  WorkerPipelineFormatCf,
  WorkerPipelineFormatHeaders,
  WorkerPipelineFormatIp,
  WorkerPipelineFormatIsMarkdown,
  WorkerPipelineFormatLines,
  WorkerPipelineFormatOptions,
  WorkerPipelineFormatResult,
  WorkerPipelineFormatSeparator,
} from '../../types/worker/pipeline/format.d.ts';
import type { WorkerPipelineInterpretNotificationObject } from '../../types/worker/pipeline/interpret.d.ts';

/**
 * Worker - Pipeline - Format.
 *
 * Transforms a parsed notification object into the final request
 * body and ntfy-compatible headers for delivery to the server.
 *
 * @since 2.0.0
 */
function format(notification: WorkerPipelineInterpretNotificationObject, options: WorkerPipelineFormatOptions): WorkerPipelineFormatResult {
  let body: WorkerPipelineFormatBody = notification['body'];

  if (options['showVisitorInfo'] === true && options['cfProperties'] !== undefined) {
    const cf: WorkerPipelineFormatCf = options['cfProperties'];
    const ip: WorkerPipelineFormatIp = options['visitorIp'] ?? 'unknown';
    const separator: WorkerPipelineFormatSeparator = (notification['markdown'] === true) ? '\n\n---\n\n' : '\n\n';
    const isMarkdown: WorkerPipelineFormatIsMarkdown = notification['markdown'] === true;
    const bold: WorkerPipelineFormatBoldFn = (text) => (isMarkdown === true) ? `**${text}**` : text;

    const lines: WorkerPipelineFormatLines = [
      bold('« Incoming Request Details »'),
      `${bold('IP address')}: ${ip}`,
      `${bold('Location')}: ${cf['region'] ?? 'Unknown'} (country: ${cf['country'] ?? 'Unknown'}, colo: ${cf['colo'] ?? 'Unknown'})`,
      `${bold('Coordinates')}: ${cf['latitude'] ?? 'Unknown'}, ${cf['longitude'] ?? 'Unknown'}`,
      `${bold('Provider')}: ${cf['asOrganization'] ?? 'Unknown'} (asn: ${String(cf['asn'] ?? 'Unknown')})`,
    ];

    body = `${body}${separator}${lines.join('\n')}`;
  }

  const headers: WorkerPipelineFormatHeaders = {};

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
    body, headers,
  };
}

export {
  format,
};

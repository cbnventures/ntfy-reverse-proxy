import {
  REGEX_EMAIL_ANGLE_BRACKET,
  REGEX_EMBEDDED_MIME_BOUNDARY,
  REGEX_HEADER_CONTINUATION,
  REGEX_MIME_BOUNDARY,
} from '../../lib/regex.js';

import { stripHtml } from '../../lib/utility.js';

import type {
  WorkerPipelineEmailBodySection,
  WorkerPipelineEmailBoundary,
  WorkerPipelineEmailBoundaryMatch,
  WorkerPipelineEmailContentType,
  WorkerPipelineEmailExtractEmailAddressMatch,
  WorkerPipelineEmailExtractFromMultipartHtml,
  WorkerPipelineEmailExtractFromMultipartResult,
  WorkerPipelineEmailExtractFromMultipartSeparator,
  WorkerPipelineEmailExtractFromMultipartText,
  WorkerPipelineEmailHeaderKey,
  WorkerPipelineEmailHeaderLines,
  WorkerPipelineEmailHeaders,
  WorkerPipelineEmailHeaderSection,
  WorkerPipelineEmailHeaderSeparatorIndex,
  WorkerPipelineEmailHeaderValue,
  WorkerPipelineEmailParseEmailEmbeddedBoundaryArg,
  WorkerPipelineEmailParseEmailEmbeddedHtmlStripped,
  WorkerPipelineEmailParseEmailEmbeddedResult,
  WorkerPipelineEmailParseEmailNestedPartHeaders,
  WorkerPipelineEmailParseEmailNestedResult,
  WorkerPipelineEmailParseEmailReturns,
  WorkerPipelineEmailParseEmailSeparator,
  WorkerPipelineEmailPart,
  WorkerPipelineEmailPartBody,
  WorkerPipelineEmailPartContentType,
  WorkerPipelineEmailPartHeaderSeparatorIndex,
  WorkerPipelineEmailParts,
  WorkerPipelineEmailRawEmail,
  WorkerPipelineEmailTextBody,
} from '../../types/worker/pipeline/email.d.ts';

/**
 * Worker - Pipeline - Email - Extract Email Address.
 *
 * Extracts a bare email address from a header value that may
 * contain a display name and angle-bracket-wrapped address.
 *
 * @since 2.0.0
 */
function extractEmailAddress(header: WorkerPipelineEmailHeaderValue): WorkerPipelineEmailHeaderValue {
  const match: WorkerPipelineEmailExtractEmailAddressMatch = header.match(REGEX_EMAIL_ANGLE_BRACKET);

  return (match !== null && match[1] !== undefined) ? match[1] : header;
}

/**
 * Worker - Pipeline - Email - Extract From Multipart.
 *
 * Splits a nested multipart MIME section into its parts and
 * returns the first text/plain and text/html bodies found.
 *
 * @since 2.0.0
 */
function extractFromMultipart(body: WorkerPipelineEmailBodySection, headerSection: WorkerPipelineEmailHeaderSection): WorkerPipelineEmailExtractFromMultipartResult {
  const nestedBoundaryMatch: WorkerPipelineEmailBoundaryMatch = headerSection.match(REGEX_MIME_BOUNDARY);
  const nestedBoundary: WorkerPipelineEmailBoundary = (nestedBoundaryMatch !== null && nestedBoundaryMatch[1] !== undefined) ? nestedBoundaryMatch[1] : undefined;

  let text: WorkerPipelineEmailExtractFromMultipartText = '';
  let html: WorkerPipelineEmailExtractFromMultipartHtml = '';

  if (nestedBoundary === undefined) {
    return {
      text, html,
    };
  }

  const parts: WorkerPipelineEmailParts = body.split(`--${nestedBoundary}`);

  for (const part of parts) {
    const trimmedPart: WorkerPipelineEmailPart = part.trim();

    if (trimmedPart === '' || trimmedPart === '--') {
      continue;
    }

    const separator: WorkerPipelineEmailExtractFromMultipartSeparator = [
      '\r\n',
      '\r\n',
    ].join('');
    const separatorIndex: WorkerPipelineEmailPartHeaderSeparatorIndex = trimmedPart.indexOf(separator);

    if (separatorIndex === -1) {
      continue;
    }

    const partContentType: WorkerPipelineEmailPartContentType = trimmedPart.slice(0, separatorIndex).toLowerCase();
    const partBody: WorkerPipelineEmailPartBody = trimmedPart.slice(separatorIndex + 4).trim();

    if (partContentType.includes('text/plain') === true && text === '') {
      text = partBody;
    } else if (partContentType.includes('text/html') === true && html === '') {
      html = partBody;
    }
  }

  return {
    text, html,
  };
}

/**
 * Worker - Pipeline - Email - Parse Email.
 *
 * Parses a raw RFC 5322 email string into structured parts by
 * splitting headers from body and handling multipart MIME.
 *
 * @since 2.0.0
 */
async function parseEmail(rawEmail: WorkerPipelineEmailRawEmail): WorkerPipelineEmailParseEmailReturns {
  // Split headers and body at the first blank line.
  const separator: WorkerPipelineEmailParseEmailSeparator = [
    '\r\n',
    '\r\n',
  ].join('');
  const headerSeparatorIndex: WorkerPipelineEmailHeaderSeparatorIndex = rawEmail.indexOf(separator);
  const headerSection: WorkerPipelineEmailHeaderSection = (headerSeparatorIndex !== -1) ? rawEmail.slice(0, headerSeparatorIndex) : rawEmail;
  const bodySection: WorkerPipelineEmailBodySection = (headerSeparatorIndex !== -1) ? rawEmail.slice(headerSeparatorIndex + 4) : '';

  // Unfold continuation headers (lines starting with whitespace are part of the previous header).
  const unfoldedHeaderSection: WorkerPipelineEmailHeaderSection = headerSection.replace(new RegExp(REGEX_HEADER_CONTINUATION, 'g'), ' ');

  // Parse headers into a map.
  const headerLines: WorkerPipelineEmailHeaderLines = unfoldedHeaderSection.split('\r\n');
  const headers: WorkerPipelineEmailHeaders = new Map();

  for (const headerLine of headerLines) {
    const colonIndex: WorkerPipelineEmailHeaderSeparatorIndex = headerLine.indexOf(':');

    if (colonIndex === -1) {
      continue;
    }

    const key: WorkerPipelineEmailHeaderKey = headerLine.slice(0, colonIndex).trim().toLowerCase();
    const value: WorkerPipelineEmailHeaderValue = headerLine.slice(colonIndex + 1).trim();

    headers.set(key, value);
  }

  const from: WorkerPipelineEmailHeaderValue = extractEmailAddress(headers.get('from') ?? '');
  const to: WorkerPipelineEmailHeaderValue = extractEmailAddress(headers.get('to') ?? '');
  const subject: WorkerPipelineEmailHeaderValue = headers.get('subject') ?? '';

  // Determine content type and boundary.
  const contentType: WorkerPipelineEmailContentType = headers.get('content-type') ?? 'text/plain';
  const boundaryMatch: WorkerPipelineEmailBoundaryMatch = contentType.match(REGEX_MIME_BOUNDARY);
  const boundary: WorkerPipelineEmailBoundary = (boundaryMatch !== null && boundaryMatch[1] !== undefined) ? boundaryMatch[1] : undefined;

  // Handle multipart emails.
  if (boundary !== undefined) {
    const parts: WorkerPipelineEmailParts = bodySection.split(`--${boundary}`);
    let textBody: WorkerPipelineEmailTextBody = '';
    let htmlBody: WorkerPipelineEmailTextBody = '';

    for (const part of parts) {
      const trimmedPart: WorkerPipelineEmailPart = part.trim();

      if (trimmedPart === '' || trimmedPart === '--') {
        continue;
      }

      const partSeparator: WorkerPipelineEmailParseEmailSeparator = [
        '\r\n',
        '\r\n',
      ].join('');
      const partHeaderSeparatorIndex: WorkerPipelineEmailPartHeaderSeparatorIndex = trimmedPart.indexOf(partSeparator);

      if (partHeaderSeparatorIndex === -1) {
        continue;
      }

      const partContentType: WorkerPipelineEmailPartContentType = trimmedPart.slice(0, partHeaderSeparatorIndex).toLowerCase();
      const partBody: WorkerPipelineEmailPartBody = trimmedPart.slice(partHeaderSeparatorIndex + 4);

      if (partContentType.includes('text/plain') === true) {
        textBody = partBody.trim();
      } else if (partContentType.includes('text/html') === true) {
        htmlBody = partBody.trim();
      } else if (partContentType.includes('multipart/') === true) {
        // Handle nested multipart parts.
        const nestedPartHeaders: WorkerPipelineEmailParseEmailNestedPartHeaders = trimmedPart.slice(0, partHeaderSeparatorIndex);
        const nestedResult: WorkerPipelineEmailParseEmailNestedResult = extractFromMultipart(partBody, nestedPartHeaders);

        if (nestedResult['text'] !== '') {
          textBody = nestedResult['text'];
        }

        if (nestedResult['html'] !== '' && htmlBody === '') {
          htmlBody = nestedResult['html'];
        }
      }
    }

    if (textBody !== '') {
      return {
        from, to, subject, textBody,
      };
    }

    if (htmlBody !== '') {
      const strippedBody: WorkerPipelineEmailTextBody = stripHtml(htmlBody);

      return {
        from, to, subject, textBody: strippedBody,
      };
    }

    return {
      from, to, subject, textBody: '',
    };
  }

  // Handle single-part emails.
  if (contentType.includes('text/html') === true) {
    const textBody: WorkerPipelineEmailTextBody = stripHtml(bodySection);

    return {
      from, to, subject, textBody,
    };
  }

  // Check if body contains embedded MIME parts (e.g. boundary in body but not in headers).
  const embeddedBoundaryMatch: WorkerPipelineEmailBoundaryMatch = bodySection.match(new RegExp(REGEX_EMBEDDED_MIME_BOUNDARY, 'm'));

  if (embeddedBoundaryMatch !== null && embeddedBoundaryMatch[1] !== undefined) {
    const embeddedBoundaryArg: WorkerPipelineEmailParseEmailEmbeddedBoundaryArg = `boundary="${embeddedBoundaryMatch[1]}"`;
    const embeddedResult: WorkerPipelineEmailParseEmailEmbeddedResult = extractFromMultipart(bodySection, embeddedBoundaryArg);

    if (embeddedResult['text'] !== '') {
      return {
        from, to, subject, textBody: embeddedResult['text'],
      };
    }

    if (embeddedResult['html'] !== '') {
      const embeddedHtmlStripped: WorkerPipelineEmailParseEmailEmbeddedHtmlStripped = stripHtml(embeddedResult['html']);

      return {
        from, to, subject, textBody: embeddedHtmlStripped,
      };
    }
  }

  const textBody: WorkerPipelineEmailTextBody = bodySection.trim();

  return {
    from, to, subject, textBody,
  };
}

export {
  parseEmail,
};

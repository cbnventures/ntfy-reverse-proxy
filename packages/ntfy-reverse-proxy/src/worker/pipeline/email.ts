import {
  REGEX_EMAIL_ANGLE_BRACKET,
  REGEX_EMBEDDED_MIME_BOUNDARY,
  REGEX_HEADER_CONTINUATION,
  REGEX_MIME_BOUNDARY,
} from '../../lib/regex.js';

import { stripHtml } from '../../lib/utility.js';

import type {
  Worker_Pipeline_Email_ExtractEmailAddress_Header,
  Worker_Pipeline_Email_ExtractEmailAddress_Match,
  Worker_Pipeline_Email_ExtractEmailAddress_Returns,
  Worker_Pipeline_Email_ExtractFromMultipart_Body,
  Worker_Pipeline_Email_ExtractFromMultipart_HeaderSection,
  Worker_Pipeline_Email_ExtractFromMultipart_Html,
  Worker_Pipeline_Email_ExtractFromMultipart_NestedBoundary,
  Worker_Pipeline_Email_ExtractFromMultipart_NestedBoundaryMatch,
  Worker_Pipeline_Email_ExtractFromMultipart_PartBody,
  Worker_Pipeline_Email_ExtractFromMultipart_PartContentType,
  Worker_Pipeline_Email_ExtractFromMultipart_Parts,
  Worker_Pipeline_Email_ExtractFromMultipart_Returns,
  Worker_Pipeline_Email_ExtractFromMultipart_Separator,
  Worker_Pipeline_Email_ExtractFromMultipart_SeparatorIndex,
  Worker_Pipeline_Email_ExtractFromMultipart_Text,
  Worker_Pipeline_Email_ExtractFromMultipart_TrimmedPart,
  Worker_Pipeline_Email_ParseEmail_BodySection,
  Worker_Pipeline_Email_ParseEmail_Boundary,
  Worker_Pipeline_Email_ParseEmail_BoundaryMatch,
  Worker_Pipeline_Email_ParseEmail_ColonIndex,
  Worker_Pipeline_Email_ParseEmail_ContentType,
  Worker_Pipeline_Email_ParseEmail_EmbeddedBoundaryArg,
  Worker_Pipeline_Email_ParseEmail_EmbeddedBoundaryMatch,
  Worker_Pipeline_Email_ParseEmail_EmbeddedHtmlStripped,
  Worker_Pipeline_Email_ParseEmail_EmbeddedResult,
  Worker_Pipeline_Email_ParseEmail_From,
  Worker_Pipeline_Email_ParseEmail_HeaderLines,
  Worker_Pipeline_Email_ParseEmail_Headers,
  Worker_Pipeline_Email_ParseEmail_HeaderSection,
  Worker_Pipeline_Email_ParseEmail_HeaderSeparatorIndex,
  Worker_Pipeline_Email_ParseEmail_HtmlBody,
  Worker_Pipeline_Email_ParseEmail_HtmlTextBody,
  Worker_Pipeline_Email_ParseEmail_Key,
  Worker_Pipeline_Email_ParseEmail_NestedPartHeaders,
  Worker_Pipeline_Email_ParseEmail_NestedResult,
  Worker_Pipeline_Email_ParseEmail_PartBody,
  Worker_Pipeline_Email_ParseEmail_PartContentType,
  Worker_Pipeline_Email_ParseEmail_PartHeaderSeparatorIndex,
  Worker_Pipeline_Email_ParseEmail_Parts,
  Worker_Pipeline_Email_ParseEmail_PartSeparator,
  Worker_Pipeline_Email_ParseEmail_PlainTextBody,
  Worker_Pipeline_Email_ParseEmail_RawEmail,
  Worker_Pipeline_Email_ParseEmail_Returns,
  Worker_Pipeline_Email_ParseEmail_Separator,
  Worker_Pipeline_Email_ParseEmail_StrippedBody,
  Worker_Pipeline_Email_ParseEmail_Subject,
  Worker_Pipeline_Email_ParseEmail_TextBody,
  Worker_Pipeline_Email_ParseEmail_To,
  Worker_Pipeline_Email_ParseEmail_TrimmedPart,
  Worker_Pipeline_Email_ParseEmail_UnfoldedHeaderSection,
  Worker_Pipeline_Email_ParseEmail_Value,
} from '../../types/worker/pipeline/email.d.ts';

/**
 * Worker - Pipeline - Email - Extract Email Address.
 *
 * Extracts a bare email address from a header value that may
 * contain a display name and angle-bracket-wrapped address.
 *
 * @since 2.0.0
 */
function extractEmailAddress(header: Worker_Pipeline_Email_ExtractEmailAddress_Header): Worker_Pipeline_Email_ExtractEmailAddress_Returns {
  const match: Worker_Pipeline_Email_ExtractEmailAddress_Match = header.match(REGEX_EMAIL_ANGLE_BRACKET);

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
function extractFromMultipart(body: Worker_Pipeline_Email_ExtractFromMultipart_Body, headerSection: Worker_Pipeline_Email_ExtractFromMultipart_HeaderSection): Worker_Pipeline_Email_ExtractFromMultipart_Returns {
  const nestedBoundaryMatch: Worker_Pipeline_Email_ExtractFromMultipart_NestedBoundaryMatch = headerSection.match(REGEX_MIME_BOUNDARY);
  const nestedBoundary: Worker_Pipeline_Email_ExtractFromMultipart_NestedBoundary = (nestedBoundaryMatch !== null && nestedBoundaryMatch[1] !== undefined) ? nestedBoundaryMatch[1] : undefined;

  let text: Worker_Pipeline_Email_ExtractFromMultipart_Text = '';
  let html: Worker_Pipeline_Email_ExtractFromMultipart_Html = '';

  if (nestedBoundary === undefined) {
    return {
      text,
      html,
    };
  }

  const parts: Worker_Pipeline_Email_ExtractFromMultipart_Parts = body.split(`--${nestedBoundary}`);

  for (const part of parts) {
    const trimmedPart: Worker_Pipeline_Email_ExtractFromMultipart_TrimmedPart = part.trim();

    if (trimmedPart === '' || trimmedPart === '--') {
      continue;
    }

    const separator: Worker_Pipeline_Email_ExtractFromMultipart_Separator = [
      '\r\n',
      '\r\n',
    ].join('');
    const separatorIndex: Worker_Pipeline_Email_ExtractFromMultipart_SeparatorIndex = trimmedPart.indexOf(separator);

    if (separatorIndex === -1) {
      continue;
    }

    const partContentType: Worker_Pipeline_Email_ExtractFromMultipart_PartContentType = trimmedPart.slice(0, separatorIndex).toLowerCase();
    const partBody: Worker_Pipeline_Email_ExtractFromMultipart_PartBody = trimmedPart.slice(separatorIndex + 4).trim();

    if (partContentType.includes('text/plain') === true && text === '') {
      text = partBody;
    } else if (partContentType.includes('text/html') === true && html === '') {
      html = partBody;
    }
  }

  return {
    text,
    html,
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
async function parseEmail(rawEmail: Worker_Pipeline_Email_ParseEmail_RawEmail): Worker_Pipeline_Email_ParseEmail_Returns {
  // Split headers and body at the first blank line.
  const separator: Worker_Pipeline_Email_ParseEmail_Separator = [
    '\r\n',
    '\r\n',
  ].join('');
  const headerSeparatorIndex: Worker_Pipeline_Email_ParseEmail_HeaderSeparatorIndex = rawEmail.indexOf(separator);
  const headerSection: Worker_Pipeline_Email_ParseEmail_HeaderSection = (headerSeparatorIndex !== -1) ? rawEmail.slice(0, headerSeparatorIndex) : rawEmail;
  const bodySection: Worker_Pipeline_Email_ParseEmail_BodySection = (headerSeparatorIndex !== -1) ? rawEmail.slice(headerSeparatorIndex + 4) : '';

  // Unfold continuation headers (lines starting with whitespace are part of the previous header).
  const unfoldedHeaderSection: Worker_Pipeline_Email_ParseEmail_UnfoldedHeaderSection = headerSection.replace(new RegExp(REGEX_HEADER_CONTINUATION, 'g'), ' ');

  // Parse headers into a map.
  const headerLines: Worker_Pipeline_Email_ParseEmail_HeaderLines = unfoldedHeaderSection.split('\r\n');
  const headers: Worker_Pipeline_Email_ParseEmail_Headers = new Map();

  for (const headerLine of headerLines) {
    const colonIndex: Worker_Pipeline_Email_ParseEmail_ColonIndex = headerLine.indexOf(':');

    if (colonIndex === -1) {
      continue;
    }

    const key: Worker_Pipeline_Email_ParseEmail_Key = headerLine.slice(0, colonIndex).trim().toLowerCase();
    const value: Worker_Pipeline_Email_ParseEmail_Value = headerLine.slice(colonIndex + 1).trim();

    headers.set(key, value);
  }

  const from: Worker_Pipeline_Email_ParseEmail_From = extractEmailAddress(headers.get('from') ?? '');
  const to: Worker_Pipeline_Email_ParseEmail_To = extractEmailAddress(headers.get('to') ?? '');
  const subject: Worker_Pipeline_Email_ParseEmail_Subject = headers.get('subject') ?? '';

  // Determine content type and boundary.
  const contentType: Worker_Pipeline_Email_ParseEmail_ContentType = headers.get('content-type') ?? 'text/plain';
  const boundaryMatch: Worker_Pipeline_Email_ParseEmail_BoundaryMatch = contentType.match(REGEX_MIME_BOUNDARY);
  const boundary: Worker_Pipeline_Email_ParseEmail_Boundary = (boundaryMatch !== null && boundaryMatch[1] !== undefined) ? boundaryMatch[1] : undefined;

  // Handle multipart emails.
  if (boundary !== undefined) {
    const parts: Worker_Pipeline_Email_ParseEmail_Parts = bodySection.split(`--${boundary}`);
    let textBody: Worker_Pipeline_Email_ParseEmail_TextBody = '';
    let htmlBody: Worker_Pipeline_Email_ParseEmail_HtmlBody = '';

    for (const part of parts) {
      const trimmedPart: Worker_Pipeline_Email_ParseEmail_TrimmedPart = part.trim();

      if (trimmedPart === '' || trimmedPart === '--') {
        continue;
      }

      const partSeparator: Worker_Pipeline_Email_ParseEmail_PartSeparator = [
        '\r\n',
        '\r\n',
      ].join('');
      const partHeaderSeparatorIndex: Worker_Pipeline_Email_ParseEmail_PartHeaderSeparatorIndex = trimmedPart.indexOf(partSeparator);

      if (partHeaderSeparatorIndex === -1) {
        continue;
      }

      const partContentType: Worker_Pipeline_Email_ParseEmail_PartContentType = trimmedPart.slice(0, partHeaderSeparatorIndex).toLowerCase();
      const partBody: Worker_Pipeline_Email_ParseEmail_PartBody = trimmedPart.slice(partHeaderSeparatorIndex + 4);

      if (partContentType.includes('text/plain') === true) {
        textBody = partBody.trim();
      } else if (partContentType.includes('text/html') === true) {
        htmlBody = partBody.trim();
      } else if (partContentType.includes('multipart/') === true) {
        // Handle nested multipart parts.
        const nestedPartHeaders: Worker_Pipeline_Email_ParseEmail_NestedPartHeaders = trimmedPart.slice(0, partHeaderSeparatorIndex);
        const nestedResult: Worker_Pipeline_Email_ParseEmail_NestedResult = extractFromMultipart(partBody, nestedPartHeaders);

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
        from,
        to,
        subject,
        textBody,
      };
    }

    if (htmlBody !== '') {
      const strippedBody: Worker_Pipeline_Email_ParseEmail_StrippedBody = stripHtml(htmlBody);

      return {
        from,
        to,
        subject,
        textBody: strippedBody,
      };
    }

    return {
      from,
      to,
      subject,
      textBody: '',
    };
  }

  // Handle single-part emails.
  if (contentType.includes('text/html') === true) {
    const htmlTextBody: Worker_Pipeline_Email_ParseEmail_HtmlTextBody = stripHtml(bodySection);

    return {
      from,
      to,
      subject,
      textBody: htmlTextBody,
    };
  }

  // Check if body contains embedded MIME parts (e.g. boundary in body but not in headers).
  const embeddedBoundaryMatch: Worker_Pipeline_Email_ParseEmail_EmbeddedBoundaryMatch = bodySection.match(new RegExp(REGEX_EMBEDDED_MIME_BOUNDARY, 'm'));

  if (embeddedBoundaryMatch !== null && embeddedBoundaryMatch[1] !== undefined) {
    const embeddedBoundaryArg: Worker_Pipeline_Email_ParseEmail_EmbeddedBoundaryArg = `boundary="${embeddedBoundaryMatch[1]}"`;
    const embeddedResult: Worker_Pipeline_Email_ParseEmail_EmbeddedResult = extractFromMultipart(bodySection, embeddedBoundaryArg);

    if (embeddedResult['text'] !== '') {
      return {
        from,
        to,
        subject,
        textBody: embeddedResult['text'],
      };
    }

    if (embeddedResult['html'] !== '') {
      const embeddedHtmlStripped: Worker_Pipeline_Email_ParseEmail_EmbeddedHtmlStripped = stripHtml(embeddedResult['html']);

      return {
        from,
        to,
        subject,
        textBody: embeddedHtmlStripped,
      };
    }
  }

  const plainTextBody: Worker_Pipeline_Email_ParseEmail_PlainTextBody = bodySection.trim();

  return {
    from,
    to,
    subject,
    textBody: plainTextBody,
  };
}

export {
  parseEmail,
};

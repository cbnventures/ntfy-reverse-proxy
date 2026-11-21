/**
 * Lib - Line Endings - Trim Line Ends.
 *
 * Trims the end of every line while keeping the file's own line endings, so
 * a CRLF checkout on Windows is not quietly rewritten to LF.
 *
 * @param {string} content - Content.
 *
 * @returns {string}
 *
 * @since 0.0.0
 */
export function trimLineEnds(content) {
  const lineEnding = (content.includes('\r\n') === true) ? '\r\n' : '\n';

  return content
    .split(lineEnding)
    .map((line) => line.trimEnd())
    .join(lineEnding);
}

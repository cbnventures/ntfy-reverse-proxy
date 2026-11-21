import { describe, expect, it } from 'vitest';

import { PATTERN_LINE_BREAK } from './regex.mjs';

/**
 * Lib - Regex - Regex.
 *
 * Wrangler output read by tail-logs may use CRLF on Windows, so the line break
 * pattern must split both endings without leaving a carriage return behind.
 *
 * @since 0.0.0
 */
describe('Regex', () => {
  it('splits LF and CRLF output into the same lines', () => {
    const lines = [
      '{"a":1}',
      '{"b":2}',
      '',
    ];

    expect(lines.join('\r\n').split(PATTERN_LINE_BREAK)).toEqual(lines);

    expect(lines.join('\n').split(PATTERN_LINE_BREAK)).toEqual(lines);

    return;
  });

  return;
});

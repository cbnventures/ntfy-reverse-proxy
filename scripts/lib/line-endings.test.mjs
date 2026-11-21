import { describe, expect, it } from 'vitest';

import { trimLineEnds } from './line-endings.mjs';

/**
 * Lib - Line Endings - Line Endings.
 *
 * Generated declarations may be checked out with CRLF on Windows, so trimming
 * trailing whitespace must keep whichever line endings the file already has.
 *
 * @since 0.0.0
 */
describe('Line endings', () => {
  it('trims trailing whitespace in an LF file', () => {
    expect(trimLineEnds([
      'a  ',
      'b\t',
      '',
    ].join('\n'))).toBe([
      'a',
      'b',
      '',
    ].join('\n'));

    return;
  });

  it('keeps CRLF line endings while trimming', () => {
    expect(trimLineEnds([
      'a  ',
      'b\t',
      '',
    ].join('\r\n'))).toBe([
      'a',
      'b',
      '',
    ].join('\r\n'));

    return;
  });

  it('leaves clean content unchanged', () => {
    const crlfContent = [
      'a',
      'b',
      '',
    ].join('\r\n');
    const lfContent = [
      'a',
      'b',
      '',
    ].join('\n');

    expect(trimLineEnds(crlfContent)).toBe(crlfContent);

    expect(trimLineEnds(lfContent)).toBe(lfContent);

    return;
  });

  return;
});

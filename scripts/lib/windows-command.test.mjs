import { describe, expect, it } from 'vitest';

import { buildWindowsCommandLine, quoteWindowsArgument } from './windows-command.mjs';

/**
 * Lib - Windows Command - Windows Command.
 *
 * Root scripts start npm and npx through the Windows command shell, so each
 * argument must reach it quoted only when plain characters are not enough.
 *
 * @since 0.0.0
 */
describe('Windows command', () => {
  it('leaves plain arguments unquoted', () => {
    expect([
      'pack',
      '--dry-run',
      '--inspector-port=0',
      'build/worker/index.js',
    ].map((arg) => quoteWindowsArgument(arg))).toEqual([
      'pack',
      '--dry-run',
      '--inspector-port=0',
      'build/worker/index.js',
    ]);

    return;
  });

  it('quotes arguments with spaces, backslashes, or quotes', () => {
    expect(quoteWindowsArgument('a b')).toBe('"a b"');

    expect(quoteWindowsArgument('C:\\Temp\\cache')).toBe('"C:\\Temp\\cache"');

    expect(quoteWindowsArgument('say "hi"')).toBe('"say ""hi"""');

    return;
  });

  it('quotes an empty argument', () => {
    expect(quoteWindowsArgument('')).toBe('""');

    return;
  });

  it('builds one command line from the command and its arguments', () => {
    expect(buildWindowsCommandLine('npm', [
      'pack',
      '--cache',
      'C:\\Users\\Jane Doe\\cache',
    ])).toBe('npm pack --cache "C:\\Users\\Jane Doe\\cache"');

    return;
  });

  return;
});

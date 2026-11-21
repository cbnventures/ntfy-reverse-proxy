import { PATTERN_PLAIN_COMMAND_ARGUMENT } from './regex.mjs';

/**
 * Lib - Windows Command - Quote Windows Argument.
 *
 * Wraps one argument in double quotes for the Windows command shell when it
 * holds anything beyond plain flag, path, and name characters.
 *
 * @param {string} arg - Arg.
 *
 * @returns {string}
 *
 * @since 0.0.0
 */
export function quoteWindowsArgument(arg) {
  if (PATTERN_PLAIN_COMMAND_ARGUMENT.test(arg) === true) {
    return arg;
  }

  return `"${arg.replaceAll('"', '""')}"`;
}

/**
 * Lib - Windows Command - Build Windows Command Line.
 *
 * Joins a command and its quoted arguments into one string because Windows
 * ships npm and npx as command scripts that only a shell can start.
 *
 * @param {string}   command - Command.
 * @param {string[]} args    - Args.
 *
 * @returns {string}
 *
 * @since 0.0.0
 */
export function buildWindowsCommandLine(command, args) {
  return [
    command,
    ...args.map((arg) => quoteWindowsArgument(arg)),
  ].join(' ');
}

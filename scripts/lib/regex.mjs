/**
 * Lib - Regex - Pattern Cloudflare API Token.
 *
 * Captures the CLOUDFLARE_API_TOKEN value from a .env file, tolerating optional
 * single or double quotes around the token so loadToken can read it back.
 *
 * @since 2.0.0
 */
export const PATTERN_CLOUDFLARE_API_TOKEN = /CLOUDFLARE_API_TOKEN=["']?([^\s"']+)["']?/;

/**
 * Lib - Regex - Pattern Line Break.
 *
 * Matches an LF or CRLF line break so streamed wrangler output splits into
 * clean lines whichever line endings the platform writes.
 *
 * @since 0.0.0
 */
export const PATTERN_LINE_BREAK = /\r?\n/;

/**
 * Lib - Regex - Pattern Plain Command Argument.
 *
 * Matches a command argument made only of word characters and the flag, path,
 * and name punctuation that the Windows command shell reads literally.
 *
 * @since 0.0.0
 */
export const PATTERN_PLAIN_COMMAND_ARGUMENT = /^[\w./:=@-]+$/;

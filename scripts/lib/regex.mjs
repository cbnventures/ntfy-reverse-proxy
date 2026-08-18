/**
 * Lib - Regex - Pattern Cloudflare API Token.
 *
 * Captures the CLOUDFLARE_API_TOKEN value from a .env file, tolerating optional
 * single or double quotes around the token so loadToken can read it back.
 *
 * @since 2.0.0
 */
export const PATTERN_CLOUDFLARE_API_TOKEN = /CLOUDFLARE_API_TOKEN=["']?([^\s"']+)["']?/;

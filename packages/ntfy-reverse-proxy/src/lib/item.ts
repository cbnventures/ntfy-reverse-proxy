/**
 * Lib - Item - App Name.
 *
 * Application identifier used for resolving the XDG
 * config directory and environment file paths.
 *
 * @since 2.0.0
 */
const APP_NAME = 'ntfy-reverse-proxy';

/**
 * Lib - Item - Secret Path Prefix.
 *
 * Fixed folder every secret path sits under, so a single WAF rule
 * can let secret paths through without listing the secrets.
 *
 * @since 2.6.1
 */
const SECRET_PATH_PREFIX = '/inbound/';

export {
  APP_NAME,
  SECRET_PATH_PREFIX,
};

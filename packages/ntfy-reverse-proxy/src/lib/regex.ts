/**
 * Lib - Regex - Ampersand.
 *
 * Matches the ampersand character for HTML entity escaping.
 * Used by the landing page sanitizer to prevent XSS injection.
 *
 * @since 2.0.0
 */
const LIB_REGEX_AMPERSAND = /&/;

/**
 * Lib - Regex - Greater Than.
 *
 * Matches the greater-than character for HTML entity escaping.
 * Used by the landing page sanitizer to prevent XSS injection.
 *
 * @since 2.0.0
 */
const LIB_REGEX_GREATER_THAN = />/;

/**
 * Lib - Regex - Less Than.
 *
 * Matches the less-than character for HTML entity escaping.
 * Used by the landing page sanitizer to prevent XSS injection.
 *
 * @since 2.0.0
 */
const LIB_REGEX_LESS_THAN = /</;

/**
 * Lib - Regex - Double Quote.
 *
 * Matches the double-quote character for HTML entity escaping.
 * Used by the landing page sanitizer to prevent XSS injection.
 *
 * @since 2.0.0
 */
const LIB_REGEX_DOUBLE_QUOTE = /"/;

/**
 * Lib - Regex - Single Quote.
 *
 * Matches the single-quote character for HTML entity escaping.
 * Used by the landing page sanitizer to prevent XSS injection.
 *
 * @since 2.0.0
 */
const LIB_REGEX_SINGLE_QUOTE = /'/;

/**
 * Lib - Regex - Non Alphanumeric.
 *
 * Matches any character that is not a letter or digit.
 * Used by the ID generator to strip unsafe base64 characters.
 *
 * @since 2.0.0
 */
const LIB_REGEX_NON_ALPHANUMERIC = /[^a-zA-Z0-9]/;

/**
 * Lib - Regex - Non Alphanumeric ID.
 *
 * Matches characters outside the allowed set for email context IDs.
 * Used by the interactive menu to validate user-supplied identifiers.
 *
 * @since 2.0.0
 */
const LIB_REGEX_NON_ALPHANUMERIC_ID = /[^a-zA-Z0-9._-]/;

/**
 * Lib - Regex - Surrounding Quotes.
 *
 * Matches a leading or trailing single or double quote character.
 * Used by the env token loader to strip wrapper quotes from values.
 *
 * @since 2.0.0
 */
const LIB_REGEX_SURROUNDING_QUOTES = /^["']|["']$/;

/**
 * Lib - Regex - Non Lowercase Alphanumeric.
 *
 * Matches any character that is not a lowercase letter or digit.
 * Used by the Synology interpreter to sanitize event tag strings.
 *
 * @since 2.0.0
 */
const LIB_REGEX_NON_LOWERCASE_ALPHANUMERIC = /[^a-z0-9]/;

/**
 * Lib - Regex - Statuspage Leading Www.
 *
 * Matches a leading "www." prefix on a hostname string.
 * Used by the Statuspage interpreter to clean extracted hostnames.
 *
 * @since 2.0.0
 */
const LIB_REGEX_STATUSPAGE_LEADING_WWW = /^www\./;

/**
 * Lib - Regex - Unifi Subject Prefix.
 *
 * Matches the bracketed UniFi site-name prefix on email subjects.
 * Used by the UniFi interpreter to strip the prefix from subjects.
 *
 * @since 2.0.0
 */
const LIB_REGEX_UNIFI_SUBJECT_PREFIX = /^\[UniFi\s+\w+]\s*/;

/**
 * Lib - Regex - Unifi Alert Line.
 *
 * Matches the "Alert - ..." line in a UniFi notification email body.
 * Used by the UniFi interpreter to extract the alert description.
 *
 * @since 2.0.0
 */
const LIB_REGEX_UNIFI_ALERT_LINE = /Alert\s*-\s*(.+)/;

/**
 * Lib - Regex - Unifi Device Name Line.
 *
 * Matches the "Device Name: ..." line in a UniFi notification email.
 * Used by the UniFi interpreter to extract the device name field.
 *
 * @since 2.0.0
 */
const LIB_REGEX_UNIFI_DEVICE_NAME_LINE = /Device Name:\s*(.+)/;

/**
 * Lib - Regex - Unifi Time Line.
 *
 * Matches the "Time: ..." line in a UniFi notification email body.
 * Used by the UniFi interpreter to extract the timestamp field.
 *
 * @since 2.0.0
 */
const LIB_REGEX_UNIFI_TIME_LINE = /Time:\s*(.+)/;

/**
 * Lib - Regex - Unifi Device URL Line.
 *
 * Matches the "Device url: https://..." line in a UniFi email body.
 * Used by the UniFi interpreter to extract the device dashboard URL.
 *
 * @since 2.0.0
 */
const LIB_REGEX_UNIFI_DEVICE_URL_LINE = /Device url:\s*(https?:\/\/\S+)/;

/**
 * Lib - Regex - Email Angle Bracket.
 *
 * Captures the email address inside angle brackets so the
 * raw address can be extracted from formatted email headers.
 *
 * @since 2.0.0
 */
const REGEX_EMAIL_ANGLE_BRACKET = /<([^>]+)>/;

/**
 * Lib - Regex - Embedded Mime Boundary.
 *
 * Captures a MIME boundary marker embedded within the body
 * when no boundary is declared in the top-level headers.
 *
 * @since 2.0.0
 */
const REGEX_EMBEDDED_MIME_BOUNDARY = /^--([-=_\w.]+)/;

/**
 * Lib - Regex - Header Continuation.
 *
 * Matches folded header continuation lines that start with
 * whitespace so they can be unfolded into a single line.
 *
 * @since 2.0.0
 */
const REGEX_HEADER_CONTINUATION = /\r\n[ \t]+/;

/**
 * Lib - Regex - HTML Entity Amp.
 *
 * Matches the ampersand HTML entity so that it can be
 * decoded back to a literal ampersand character.
 *
 * @since 2.0.0
 */
const REGEX_HTML_ENTITY_AMP = /&amp;/;

/**
 * Lib - Regex - HTML Entity Apos.
 *
 * Matches the apostrophe HTML entity so that it can be
 * decoded back to a literal apostrophe character.
 *
 * @since 2.0.0
 */
const REGEX_HTML_ENTITY_APOS = /&#39;/;

/**
 * Lib - Regex - HTML Entity Gt.
 *
 * Matches the greater-than HTML entity so that it can be
 * decoded back to a literal greater-than character.
 *
 * @since 2.0.0
 */
const REGEX_HTML_ENTITY_GT = /&gt;/;

/**
 * Lib - Regex - HTML Entity Lt.
 *
 * Matches the less-than HTML entity so that it can be
 * decoded back to a literal less-than character.
 *
 * @since 2.0.0
 */
const REGEX_HTML_ENTITY_LT = /&lt;/;

/**
 * Lib - Regex - HTML Entity Nbsp.
 *
 * Matches the non-breaking space HTML entity so it can be
 * decoded back to a literal space character.
 *
 * @since 2.0.0
 */
const REGEX_HTML_ENTITY_NBSP = /&nbsp;/;

/**
 * Lib - Regex - HTML Entity Quot.
 *
 * Matches the double-quote HTML entity so that it can be
 * decoded back to a literal double-quote character.
 *
 * @since 2.0.0
 */
const REGEX_HTML_ENTITY_QUOT = /&quot;/;

/**
 * Lib - Regex - HTML Tag.
 *
 * Matches any HTML tag including its attributes so that
 * tag removal can be performed during email body parsing.
 *
 * @since 2.0.0
 */
const REGEX_HTML_TAG = /<[^>]*>/;

/**
 * Lib - Regex - Mime Boundary.
 *
 * Captures the MIME boundary value from a Content-Type header
 * so multipart email bodies can be split into individual parts.
 *
 * @since 2.0.0
 */
const REGEX_MIME_BOUNDARY = /boundary="?([^";\s]+)"?/;

/**
 * Lib - Regex - Parenthetical Content.
 *
 * Matches parenthetical content including surrounding spaces
 * so component names can be cleaned for display purposes.
 *
 * @since 2.0.0
 */
const REGEX_PARENTHETICAL_CONTENT = /\s*\(.*?\)\s*/;

/**
 * Lib - Regex - Referenced.
 *
 * Matches the word "referenced" in an error message string so
 * tests can assert that server-removal warnings fire correctly.
 *
 * @since 2.0.0
 */
const LIB_REGEX_REFERENCED = /referenced/;

export {
  LIB_REGEX_AMPERSAND,
  LIB_REGEX_DOUBLE_QUOTE,
  LIB_REGEX_GREATER_THAN,
  LIB_REGEX_LESS_THAN,
  LIB_REGEX_NON_ALPHANUMERIC,
  LIB_REGEX_NON_ALPHANUMERIC_ID,
  LIB_REGEX_NON_LOWERCASE_ALPHANUMERIC,
  LIB_REGEX_REFERENCED,
  LIB_REGEX_SINGLE_QUOTE,
  LIB_REGEX_STATUSPAGE_LEADING_WWW,
  LIB_REGEX_SURROUNDING_QUOTES,
  LIB_REGEX_UNIFI_ALERT_LINE,
  LIB_REGEX_UNIFI_DEVICE_NAME_LINE,
  LIB_REGEX_UNIFI_DEVICE_URL_LINE,
  LIB_REGEX_UNIFI_SUBJECT_PREFIX,
  LIB_REGEX_UNIFI_TIME_LINE,
  REGEX_EMAIL_ANGLE_BRACKET,
  REGEX_EMBEDDED_MIME_BOUNDARY,
  REGEX_HEADER_CONTINUATION,
  REGEX_HTML_ENTITY_AMP,
  REGEX_HTML_ENTITY_APOS,
  REGEX_HTML_ENTITY_GT,
  REGEX_HTML_ENTITY_LT,
  REGEX_HTML_ENTITY_NBSP,
  REGEX_HTML_ENTITY_QUOT,
  REGEX_HTML_TAG,
  REGEX_MIME_BOUNDARY,
  REGEX_PARENTHETICAL_CONTENT,
};

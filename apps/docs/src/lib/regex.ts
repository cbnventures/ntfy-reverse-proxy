/**
 * Lib - Regex - Pattern Blog Date Prefix.
 *
 * Strips the leading "YYYY-MM-DD-" date prefix from blog filenames so the link
 * test can derive a slug when no explicit slug is set in frontmatter.
 *
 * @since 0.14.0
 */
export const PATTERN_BLOG_DATE_PREFIX = /^\d{4}-\d{2}-\d{2}-/;

/**
 * Lib - Regex - Pattern Blog Prefix.
 *
 * Detects the leading "/blog/" segment in link hrefs so the link test can
 * resolve blog paths for validation.
 *
 * @since 0.14.0
 */
export const PATTERN_BLOG_PREFIX = /^\/blog\//;

/**
 * Lib - Regex - Pattern Code Block.
 *
 * Captures content between triple-backtick fences so the import-docs test can
 * extract code examples and validate their import specifiers.
 *
 * @since 0.14.0
 */
export const PATTERN_CODE_BLOCK = /```[^\n]*\n([\s\S]*?)```/;

/**
 * Lib - Regex - Pattern Docs Prefix.
 *
 * Detects the leading "/docs/" segment in link hrefs so the link-docs test can
 * resolve relative doc paths back to on-disk locations.
 *
 * @since 0.14.0
 */
export const PATTERN_DOCS_PREFIX = /^\/docs\//;

/**
 * Lib - Regex - Pattern Description Line.
 *
 * Extracts the description value from MDX frontmatter so the frontmatter-docs
 * test can verify every page has a description.
 *
 * @since 0.14.0
 */
export const PATTERN_DESCRIPTION_LINE = /^description:\s*(.+)$/;

/**
 * Lib - Regex - Pattern Export Dot Slash.
 *
 * Strips the leading "./" from package.json export keys so the import-docs test
 * can normalize paths before comparing specifiers.
 *
 * @since 0.14.0
 */
export const PATTERN_EXPORT_DOT_SLASH = /^\.\//;

/**
 * Lib - Regex - Pattern File Extension Md.
 *
 * Matches .md and .mdx file extensions so the link-docs test can filter directory
 * listings down to only markdown documentation files.
 *
 * @since 0.14.0
 */
export const PATTERN_FILE_EXTENSION_MD = /\.(md|mdx)$/;

/**
 * Lib - Regex - Pattern Heading H2 Line.
 *
 * Captures H2 heading text from the terminology page so the terminology-docs test
 * can build a lookup of valid anchor targets for validation.
 *
 * @since 0.14.0
 */
export const PATTERN_HEADING_H2_LINE = /^## (.+)$/;

/**
 * Lib - Regex - Pattern Heading Line.
 *
 * Captures any markdown heading (H1 through H6) so the link-docs test can build
 * a map of heading anchors and verify fragment links.
 *
 * @since 0.14.0
 */
export const PATTERN_HEADING_LINE = /^#{1,6}\s+(.+)$/;

/**
 * Lib - Regex - Pattern HTML Tags.
 *
 * Strips HTML and JSX tags from heading text so the link-docs and terminology-docs
 * tests can generate clean slug anchors matching IDs.
 *
 * @since 0.14.0
 */
export const PATTERN_HTML_TAGS = /<[^>]+>/;

/**
 * Lib - Regex - Pattern ID Line.
 *
 * Extracts the id value from MDX frontmatter so the frontmatter-docs and link-docs
 * tests can map each page to its custom slug.
 *
 * @since 0.14.0
 */
export const PATTERN_ID_LINE = /^id:\s*(.+)$/;

/**
 * Lib - Regex - Pattern Import Specifier.
 *
 * Captures Nova package import paths from code examples so the import-docs test
 * can verify every specifier maps to an export.
 *
 * @since 0.14.0
 */
export const PATTERN_IMPORT_SPECIFIER = /(?:from\s+['"]|require\s*\(\s*['"])(@cbnventures\/nova(?:\/[^'"]+)?)['"]/;

/**
 * Lib - Regex - Pattern Index Suffix.
 *
 * Strips trailing "/index" from resolved doc paths so the link-docs test can
 * normalize category index pages for link validation.
 *
 * @since 0.14.0
 */
export const PATTERN_INDEX_SUFFIX = /\/index$/;

/**
 * Lib - Regex - Pattern Markdown Link.
 *
 * Captures the display text and href from markdown links so the link-docs test
 * can validate every internal link resolves.
 *
 * @since 0.14.0
 */
export const PATTERN_MARKDOWN_LINK = /\[([^\]]*)\]\(([^)]+)\)/;

/**
 * Lib - Regex - Pattern Non Word Chars.
 *
 * Removes punctuation and special characters from heading text so the link-docs
 * and terminology-docs tests can produce valid slug anchors.
 *
 * @since 0.14.0
 */
export const PATTERN_NON_WORD_CHARS = /[^\w\s-]/;

/**
 * Lib - Regex - Pattern Slug Line.
 *
 * Extracts the slug value from blog frontmatter so the link test can build
 * a lookup of valid blog paths for validation.
 *
 * @since 0.14.0
 */
export const PATTERN_SLUG_LINE = /^slug:\s*(.+)$/;

/**
 * Lib - Regex - Pattern Trailing Slash.
 *
 * Strips trailing slashes from resolved doc paths so the link-docs test can normalize
 * directory-style URLs before comparing them to on-disk file paths.
 *
 * @since 0.14.0
 */
export const PATTERN_TRAILING_SLASH = /\/$/;

/**
 * Lib - Regex - Pattern Terminology Component.
 *
 * Captures the attributes and children of Terminology JSX elements so the terminology-docs
 * test can validate every usage links to an anchor.
 *
 * @since 0.14.0
 */
export const PATTERN_TERMINOLOGY_COMPONENT = /<Terminology\s+([^>]*)>([^<]*)<\/Terminology>/;

/**
 * Lib - Regex - Pattern Terminology Title Attr.
 *
 * Extracts the title attribute value from a Terminology component so the terminology-docs
 * test can verify it matches the terminology heading.
 *
 * @since 0.14.0
 */
export const PATTERN_TERMINOLOGY_TITLE_ATTR = /title="([^"]*)"/;

/**
 * Lib - Regex - Pattern Terminology To Attr.
 *
 * Extracts the to attribute value from a Terminology component so the terminology-docs
 * test can verify the link target resolves correctly.
 *
 * @since 0.14.0
 */
export const PATTERN_TERMINOLOGY_TO_ATTR = /to="([^"]*)"/;

/**
 * Lib - Regex - Pattern Wildcard Suffix.
 *
 * Strips wildcard suffixes from package.json export keys so the import-docs test
 * can match directory exports against specifiers.
 *
 * @since 0.14.0
 */
export const PATTERN_WILDCARD_SUFFIX = /\*.*$/;

/**
 * Lib - Regex - Pattern Whitespace.
 *
 * Collapses whitespace runs into single hyphens when the link-docs and terminology-docs
 * tests slugify heading text into anchor IDs.
 *
 * @since 0.14.0
 */
export const PATTERN_WHITESPACE = /\s+/;

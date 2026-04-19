import {
  REGEX_HTML_ENTITY_AMP,
  REGEX_HTML_ENTITY_APOS,
  REGEX_HTML_ENTITY_GT,
  REGEX_HTML_ENTITY_LT,
  REGEX_HTML_ENTITY_NBSP,
  REGEX_HTML_ENTITY_QUOT,
  REGEX_HTML_TAG,
} from './regex.js';

import type {
  LibUtilityStripHtmlHtml,
  LibUtilityStripHtmlText,
} from '../types/lib/utility.d.ts';

/**
 * Lib - Utility - Strip HTML.
 *
 * Removes all HTML tags and decodes common HTML entities so
 * that content can be read as plain text.
 *
 * @param {LibUtilityStripHtmlHtml} html - Html.
 *
 * @returns {LibUtilityStripHtmlText}
 *
 * @since 2.0.0
 */
function stripHtml(html: LibUtilityStripHtmlHtml): LibUtilityStripHtmlText {
  let text: LibUtilityStripHtmlText = html;

  // Remove HTML tags.
  text = text.replace(new RegExp(REGEX_HTML_TAG, 'g'), '');

  // Decode common HTML entities.
  text = text.replace(new RegExp(REGEX_HTML_ENTITY_AMP, 'g'), '&');
  text = text.replace(new RegExp(REGEX_HTML_ENTITY_LT, 'g'), '<');
  text = text.replace(new RegExp(REGEX_HTML_ENTITY_GT, 'g'), '>');
  text = text.replace(new RegExp(REGEX_HTML_ENTITY_QUOT, 'g'), '"');
  text = text.replace(new RegExp(REGEX_HTML_ENTITY_APOS, 'g'), '\'');
  text = text.replace(new RegExp(REGEX_HTML_ENTITY_NBSP, 'g'), ' ');

  return text.trim();
}

export {
  stripHtml,
};

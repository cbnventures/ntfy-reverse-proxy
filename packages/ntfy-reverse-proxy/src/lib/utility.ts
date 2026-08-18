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
  Lib_Utility_StripHtml_Html,
  Lib_Utility_StripHtml_Returns,
  Lib_Utility_StripHtml_Text,
} from '../types/lib/utility.d.ts';

/**
 * Lib - Utility - Strip HTML.
 *
 * Removes all HTML tags and decodes common HTML entities so
 * that content can be read as plain text.
 *
 * @param {Lib_Utility_StripHtml_Html} html - Html.
 *
 * @returns {Lib_Utility_StripHtml_Returns}
 *
 * @since 2.0.0
 */
function stripHtml(html: Lib_Utility_StripHtml_Html): Lib_Utility_StripHtml_Returns {
  let text: Lib_Utility_StripHtml_Text = html;

  // Remove HTML tags.
  text = text.replace(new RegExp(REGEX_HTML_TAG, 'g'), '');

  // Decode common HTML entities (&amp; last to prevent double-decoding).
  text = text.replace(new RegExp(REGEX_HTML_ENTITY_LT, 'g'), '<');
  text = text.replace(new RegExp(REGEX_HTML_ENTITY_GT, 'g'), '>');
  text = text.replace(new RegExp(REGEX_HTML_ENTITY_QUOT, 'g'), '"');
  text = text.replace(new RegExp(REGEX_HTML_ENTITY_APOS, 'g'), '\'');
  text = text.replace(new RegExp(REGEX_HTML_ENTITY_NBSP, 'g'), ' ');
  text = text.replace(new RegExp(REGEX_HTML_ENTITY_AMP, 'g'), '&');

  return text.trim();
}

export {
  stripHtml,
};

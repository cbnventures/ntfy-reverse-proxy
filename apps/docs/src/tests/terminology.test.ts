import { strictEqual } from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';

import { describe, it } from 'vitest';

import {
  PATTERN_CODE_BLOCK,
  PATTERN_HEADING_H2_LINE,
  PATTERN_HTML_TAGS,
  PATTERN_NON_WORD_CHARS,
  PATTERN_TERMINOLOGY_COMPONENT,
  PATTERN_TERMINOLOGY_TITLE_ATTR,
  PATTERN_TERMINOLOGY_TO_ATTR,
  PATTERN_WHITESPACE,
} from '../lib/regex.js';

import type {
  TestsTerminologyTerminologyValidationAnchor,
  TestsTerminologyTerminologyValidationAttrs,
  TestsTerminologyTerminologyValidationChildren,
  TestsTerminologyTerminologyValidationContent,
  TestsTerminologyTerminologyValidationContentDirs,
  TestsTerminologyTerminologyValidationContentPath,
  TestsTerminologyTerminologyValidationCwd,
  TestsTerminologyTerminologyValidationEntries,
  TestsTerminologyTerminologyValidationExpectedBase,
  TestsTerminologyTerminologyValidationExt,
  TestsTerminologyTerminologyValidationFailures,
  TestsTerminologyTerminologyValidationFilePath,
  TestsTerminologyTerminologyValidationHeadingCapture,
  TestsTerminologyTerminologyValidationHeadingText,
  TestsTerminologyTerminologyValidationMdFiles,
  TestsTerminologyTerminologyValidationStrippedContent,
  TestsTerminologyTerminologyValidationTerminologyContent,
  TestsTerminologyTerminologyValidationTerminologyPath,
  TestsTerminologyTerminologyValidationTitleMatch,
  TestsTerminologyTerminologyValidationToMatch,
  TestsTerminologyTerminologyValidationToValue,
  TestsTerminologyTerminologyValidationValidAnchors,
} from '../types/tests/terminology.test.d.ts';

/**
 * Tests - Terminology - Terminology Validation.
 *
 * @since 0.14.0
 */
describe('Terminology validation', async () => {
  it('all Terminology components have valid attributes and anchors', async () => {
    const cwd: TestsTerminologyTerminologyValidationCwd = process.cwd();
    const contentDirs: TestsTerminologyTerminologyValidationContentDirs = [
      'docs',
      'blog',
    ];
    const terminologyPath: TestsTerminologyTerminologyValidationTerminologyPath = join(cwd, 'docs', 'quickstart', 'terminology.mdx');

    if (existsSync(terminologyPath) === false) {
      return;
    }

    const terminologyContent: TestsTerminologyTerminologyValidationTerminologyContent = await readFile(terminologyPath, 'utf-8');

    // Build valid anchors from h2 headings in terminology.mdx.
    const validAnchors: TestsTerminologyTerminologyValidationValidAnchors = new Set();

    for (const headingMatch of terminologyContent.matchAll(new RegExp(PATTERN_HEADING_H2_LINE, 'gm'))) {
      const headingCapture: TestsTerminologyTerminologyValidationHeadingCapture = headingMatch[1] ?? '';

      const headingText: TestsTerminologyTerminologyValidationHeadingText = headingCapture
        .replace(new RegExp(PATTERN_HTML_TAGS, 'g'), '')
        .trim()
        .toLowerCase()
        .replace(new RegExp(PATTERN_NON_WORD_CHARS, 'g'), '')
        .replace(new RegExp(PATTERN_WHITESPACE, 'g'), '-');

      validAnchors.add(headingText);
    }

    const mdFiles: TestsTerminologyTerminologyValidationMdFiles = [];

    for (const contentDir of contentDirs) {
      const contentPath: TestsTerminologyTerminologyValidationContentPath = resolve(cwd, contentDir);
      const entries: TestsTerminologyTerminologyValidationEntries = await readdir(contentPath, { recursive: true });

      for (const entry of entries) {
        const ext: TestsTerminologyTerminologyValidationExt = extname(entry);

        if (ext === '.md' || ext === '.mdx') {
          mdFiles.push(join(contentDir, entry));
        }
      }
    }

    const failures: TestsTerminologyTerminologyValidationFailures = [];

    for (const mdFile of mdFiles) {
      const filePath: TestsTerminologyTerminologyValidationFilePath = join(cwd, mdFile);
      const content: TestsTerminologyTerminologyValidationContent = await readFile(filePath, 'utf-8');
      const strippedContent: TestsTerminologyTerminologyValidationStrippedContent = content.replace(new RegExp(PATTERN_CODE_BLOCK, 'g'), '');

      for (const terminologyMatch of strippedContent.matchAll(new RegExp(PATTERN_TERMINOLOGY_COMPONENT, 'g'))) {
        const attrs: TestsTerminologyTerminologyValidationAttrs = terminologyMatch[1] ?? '';
        const children: TestsTerminologyTerminologyValidationChildren = (terminologyMatch[2] ?? '').trim();
        const titleMatch: TestsTerminologyTerminologyValidationTitleMatch = new RegExp(PATTERN_TERMINOLOGY_TITLE_ATTR).exec(attrs);
        const toMatch: TestsTerminologyTerminologyValidationToMatch = new RegExp(PATTERN_TERMINOLOGY_TO_ATTR).exec(attrs);

        if (titleMatch === null || (titleMatch[1] ?? '').length === 0) {
          failures.push(`${mdFile}: <Terminology> missing or empty title attribute`);

          continue;
        }

        if (toMatch === null || (toMatch[1] ?? '').length === 0) {
          failures.push(`${mdFile}: <Terminology> missing or empty to attribute`);

          continue;
        }

        if (children.length === 0) {
          failures.push(`${mdFile}: <Terminology> has empty children`);

          continue;
        }

        const toValue: TestsTerminologyTerminologyValidationToValue = toMatch[1] ?? '';
        const expectedBase: TestsTerminologyTerminologyValidationExpectedBase = '/docs/quickstart/terminology';

        if (toValue !== expectedBase && toValue.startsWith(`${expectedBase}#`) === false) {
          failures.push(`${mdFile}: <Terminology to="${toValue}"> does not point to ${expectedBase}`);

          continue;
        }

        if (toValue.startsWith(`${expectedBase}#`) === true) {
          const anchor: TestsTerminologyTerminologyValidationAnchor = toValue.slice(`${expectedBase}#`.length);

          if (validAnchors.has(anchor) === false) {
            failures.push(`${mdFile}: <Terminology to="${toValue}"> references unknown anchor "#${anchor}"`);
          }
        }
      }
    }

    strictEqual(
      failures.length,
      0,
      `\nTerminology component issues:\n${failures.join('\n')}`,
    );

    return;
  });

  return;
});

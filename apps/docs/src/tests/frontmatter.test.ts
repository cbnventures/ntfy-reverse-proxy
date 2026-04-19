import { strictEqual } from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import {
  basename,
  extname,
  join,
  resolve,
} from 'node:path';

import { describe, it } from 'vitest';

import {
  PATTERN_DESCRIPTION_LINE,
  PATTERN_ID_LINE,
} from '../lib/regex.js';

import type {
  TestsFrontmatterFrontmatterValidationAfterKeywords,
  TestsFrontmatterFrontmatterValidationAfterTags,
  TestsFrontmatterFrontmatterValidationBody,
  TestsFrontmatterFrontmatterValidationContent,
  TestsFrontmatterFrontmatterValidationContentDirs,
  TestsFrontmatterFrontmatterValidationContentPath,
  TestsFrontmatterFrontmatterValidationCwd,
  TestsFrontmatterFrontmatterValidationDescMatch,
  TestsFrontmatterFrontmatterValidationEndIndex,
  TestsFrontmatterFrontmatterValidationEntries,
  TestsFrontmatterFrontmatterValidationExpectedId,
  TestsFrontmatterFrontmatterValidationExt,
  TestsFrontmatterFrontmatterValidationFailures,
  TestsFrontmatterFrontmatterValidationFieldRegex,
  TestsFrontmatterFrontmatterValidationFieldSource,
  TestsFrontmatterFrontmatterValidationFileName,
  TestsFrontmatterFrontmatterValidationFilePath,
  TestsFrontmatterFrontmatterValidationFrontmatter,
  TestsFrontmatterFrontmatterValidationId,
  TestsFrontmatterFrontmatterValidationIdMatch,
  TestsFrontmatterFrontmatterValidationIsBlogPost,
  TestsFrontmatterFrontmatterValidationIsPlaceholder,
  TestsFrontmatterFrontmatterValidationKeywordLines,
  TestsFrontmatterFrontmatterValidationKeywordsIndex,
  TestsFrontmatterFrontmatterValidationLine,
  TestsFrontmatterFrontmatterValidationLines,
  TestsFrontmatterFrontmatterValidationMdFiles,
  TestsFrontmatterFrontmatterValidationRequiredFields,
  TestsFrontmatterFrontmatterValidationTagLines,
  TestsFrontmatterFrontmatterValidationTagsIndex,
  TestsFrontmatterFrontmatterValidationTarget,
  TestsFrontmatterFrontmatterValidationWarnings,
} from '../types/tests/frontmatter.test.d.ts';

/**
 * Tests - Frontmatter - Frontmatter Validation.
 *
 * @since 0.14.0
 */
describe('Frontmatter validation', async () => {
  it('all documentation files have valid frontmatter', async () => {
    const cwd: TestsFrontmatterFrontmatterValidationCwd = process.cwd();
    const contentDirs: TestsFrontmatterFrontmatterValidationContentDirs = [
      'docs',
      'blog',
    ];
    const mdFiles: TestsFrontmatterFrontmatterValidationMdFiles = [];

    for (const contentDir of contentDirs) {
      const contentPath: TestsFrontmatterFrontmatterValidationContentPath = resolve(cwd, contentDir);
      const entries: TestsFrontmatterFrontmatterValidationEntries = await readdir(contentPath, { recursive: true });

      for (const entry of entries) {
        const ext: TestsFrontmatterFrontmatterValidationExt = extname(entry);

        if (ext === '.md' || ext === '.mdx') {
          mdFiles.push(join(contentDir, entry));
        }
      }
    }

    const failures: TestsFrontmatterFrontmatterValidationFailures = [];
    const warnings: TestsFrontmatterFrontmatterValidationWarnings = [];

    for (const mdFile of mdFiles) {
      const filePath: TestsFrontmatterFrontmatterValidationFilePath = join(cwd, mdFile);
      const content: TestsFrontmatterFrontmatterValidationContent = await readFile(filePath, 'utf-8');

      if (content.startsWith('---') === false) {
        failures.push(`${mdFile}: missing frontmatter`);

        continue;
      }

      const endIndex: TestsFrontmatterFrontmatterValidationEndIndex = content.indexOf('---', 3);

      if (endIndex === -1) {
        failures.push(`${mdFile}: unclosed frontmatter`);

        continue;
      }

      const frontmatter: TestsFrontmatterFrontmatterValidationFrontmatter = content.slice(3, endIndex).trim();
      const body: TestsFrontmatterFrontmatterValidationBody = content.slice(endIndex + 3).trim();
      const fileExt: TestsFrontmatterFrontmatterValidationExt = extname(mdFile);
      const fileName: TestsFrontmatterFrontmatterValidationFileName = basename(mdFile, fileExt);
      /*
       * TODO Remove placeholder warning bypass (isPlaceholder, warnings, target, and console.log)
       * once all "Coming soon" pages have real frontmatter.
       */
      const isBlogPost: TestsFrontmatterFrontmatterValidationIsBlogPost = mdFile.startsWith('blog/');
      const isPlaceholder: TestsFrontmatterFrontmatterValidationIsPlaceholder = body.startsWith('Coming soon');

      const target: TestsFrontmatterFrontmatterValidationTarget = (isPlaceholder === true) ? warnings : failures;

      // Check required fields exist.
      let requiredFields: TestsFrontmatterFrontmatterValidationRequiredFields = ['title'];

      if (isBlogPost === true) {
        requiredFields = [
          'title',
          'authors',
          'tags',
        ];
      }

      for (const field of requiredFields) {
        const fieldSource: TestsFrontmatterFrontmatterValidationFieldSource = `^${field}:`;
        const fieldRegex: TestsFrontmatterFrontmatterValidationFieldRegex = new RegExp(fieldSource, 'm');

        if (fieldRegex.test(frontmatter) === false) {
          target.push(`${mdFile}: missing "${field}" in frontmatter`);
        }
      }

      // Check id matches filename (docs only).
      const idMatch: TestsFrontmatterFrontmatterValidationIdMatch = new RegExp(PATTERN_ID_LINE, 'm').exec(frontmatter);

      if (
        isBlogPost === false
        && idMatch !== null
        && idMatch[1] !== undefined
      ) {
        const id: TestsFrontmatterFrontmatterValidationId = idMatch[1].trim();
        const expectedId: TestsFrontmatterFrontmatterValidationExpectedId = (fileName === 'index') ? 'overview' : fileName;

        if (id !== expectedId) {
          target.push(`${mdFile}: id "${id}" does not match expected "${expectedId}"`);
        }
      }

      /*
       * TODO Remove placeholder "x" checks once all pages have real description, keywords, and tags.
       * Check description is not placeholder.
       */
      const descMatch: TestsFrontmatterFrontmatterValidationDescMatch = new RegExp(PATTERN_DESCRIPTION_LINE, 'm').exec(frontmatter);

      if (
        isBlogPost === false
        && descMatch !== null
        && descMatch[1] !== undefined
        && descMatch[1].trim() === 'x'
      ) {
        target.push(`${mdFile}: description is placeholder "x"`);
      }

      // Check keywords is not placeholder (docs only).
      const keywordsIndex: TestsFrontmatterFrontmatterValidationKeywordsIndex = frontmatter.indexOf('keywords:');

      if (isBlogPost === false && keywordsIndex !== -1) {
        const afterKeywords: TestsFrontmatterFrontmatterValidationAfterKeywords = frontmatter.slice(keywordsIndex + 'keywords:'.length);
        const keywordLines: TestsFrontmatterFrontmatterValidationKeywordLines = [];
        const lines: TestsFrontmatterFrontmatterValidationLines = afterKeywords.split('\n');

        for (let i = 1; i < lines.length; i += 1) {
          const line: TestsFrontmatterFrontmatterValidationLine = lines[i];

          if (line === undefined) {
            break;
          }

          if (line.startsWith('  - ') === true) {
            keywordLines.push(line.replace('  - ', '').trim());
          } else {
            break;
          }
        }

        if (keywordLines.length === 1 && keywordLines[0] === 'x') {
          target.push(`${mdFile}: keywords contains only placeholder "x"`);
        }

        if (keywordLines.length === 0) {
          target.push(`${mdFile}: keywords is empty`);
        }
      }

      // Check tags is not placeholder.
      const tagsIndex: TestsFrontmatterFrontmatterValidationTagsIndex = frontmatter.indexOf('tags:');

      if (tagsIndex !== -1) {
        const afterTags: TestsFrontmatterFrontmatterValidationAfterTags = frontmatter.slice(tagsIndex + 'tags:'.length);

        // Skip inline array format (e.g. tags: [a, b, c]).
        if (afterTags.trimStart().startsWith('[') === false) {
          const tagLines: TestsFrontmatterFrontmatterValidationTagLines = [];
          const lines: TestsFrontmatterFrontmatterValidationLines = afterTags.split('\n');

          for (let i = 1; i < lines.length; i += 1) {
            const line: TestsFrontmatterFrontmatterValidationLine = lines[i];

            if (line === undefined) {
              break;
            }

            if (line.startsWith('  - ') === true) {
              tagLines.push(line.replace('  - ', '').trim());
            } else {
              break;
            }
          }

          if (tagLines.length === 1 && tagLines[0] === 'x') {
            target.push(`${mdFile}: tags contains only placeholder "x"`);
          }

          if (tagLines.length === 0) {
            target.push(`${mdFile}: tags is empty`);
          }
        }
      }
    }

    if (warnings.length > 0) {
      process.stdout.write(`\nPlaceholder pages with incomplete frontmatter (${warnings.length}):\n${warnings.join('\n')}\n`);
    }

    strictEqual(
      failures.length,
      0,
      `\nFrontmatter issues:\n${failures.join('\n')}`,
    );

    return;
  });

  return;
});

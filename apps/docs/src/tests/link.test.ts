import { strictEqual } from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import {
  dirname,
  extname,
  join,
  resolve,
} from 'node:path';

import { describe, it } from 'vitest';

import {
  PATTERN_BLOG_DATE_PREFIX,
  PATTERN_BLOG_PREFIX,
  PATTERN_DOCS_PREFIX,
  PATTERN_FILE_EXTENSION_MD,
  PATTERN_HEADING_LINE,
  PATTERN_HTML_TAGS,
  PATTERN_ID_LINE,
  PATTERN_INDEX_SUFFIX,
  PATTERN_MARKDOWN_LINK,
  PATTERN_NON_WORD_CHARS,
  PATTERN_SLUG_LINE,
  PATTERN_TRAILING_SLASH,
  PATTERN_WHITESPACE,
} from '../lib/regex.js';

import type {
  TestsLinkLinkValidationAnchor,
  TestsLinkLinkValidationBlogFileName,
  TestsLinkLinkValidationBlogPath,
  TestsLinkLinkValidationBlogPaths,
  TestsLinkLinkValidationBlogSlug,
  TestsLinkLinkValidationContent,
  TestsLinkLinkValidationContentDirs,
  TestsLinkLinkValidationContentPath,
  TestsLinkLinkValidationCurrentPath,
  TestsLinkLinkValidationCwd,
  TestsLinkLinkValidationDir,
  TestsLinkLinkValidationDocPath,
  TestsLinkLinkValidationDocRelativePath,
  TestsLinkLinkValidationEntries,
  TestsLinkLinkValidationExistingPaths,
  TestsLinkLinkValidationExt,
  TestsLinkLinkValidationFailures,
  TestsLinkLinkValidationFileHeadings,
  TestsLinkLinkValidationFilePath,
  TestsLinkLinkValidationHeadings,
  TestsLinkLinkValidationHeadingsLookup,
  TestsLinkLinkValidationHref,
  TestsLinkLinkValidationId,
  TestsLinkLinkValidationIdMatch,
  TestsLinkLinkValidationIdPath,
  TestsLinkLinkValidationIdPaths,
  TestsLinkLinkValidationInCodeBlock,
  TestsLinkLinkValidationIndexSuffix,
  TestsLinkLinkValidationLines,
  TestsLinkLinkValidationMatchCapture,
  TestsLinkLinkValidationMdFiles,
  TestsLinkLinkValidationPathPartValue,
  TestsLinkLinkValidationProse,
  TestsLinkLinkValidationProseLines,
  TestsLinkLinkValidationSlugMatch,
  TestsLinkLinkValidationWithoutExt,
} from '../types/tests/link.test.d.ts';

/**
 * Tests - Link - Link Validation.
 *
 * @since 0.14.0
 */
describe('Link validation', async () => {
  it('all internal links point to existing files and anchors', async () => {
    const cwd: TestsLinkLinkValidationCwd = process.cwd();
    const contentDirs: TestsLinkLinkValidationContentDirs = [
      'docs',
      'blog',
    ];
    const mdFiles: TestsLinkLinkValidationMdFiles = [];

    for (const contentDir of contentDirs) {
      const contentPath: TestsLinkLinkValidationContentPath = resolve(cwd, contentDir);
      const entries: TestsLinkLinkValidationEntries = await readdir(contentPath, { recursive: true });

      for (const entry of entries) {
        const ext: TestsLinkLinkValidationExt = extname(entry);

        if (ext === '.md' || ext === '.mdx') {
          mdFiles.push(join(contentDir, entry));
        }
      }
    }

    // Build a set of all existing doc file paths (normalized without extension).
    const existingPaths: TestsLinkLinkValidationExistingPaths = new Set();

    // Build a set of valid blog slugs for /blog/... link validation.
    const blogPaths: TestsLinkLinkValidationBlogPaths = new Set();

    // Build an id-based lookup: dir + frontmatter id → valid path.
    const idPaths: TestsLinkLinkValidationIdPaths = new Set();

    for (const mdFile of mdFiles) {
      if (mdFile.startsWith('docs/') === false) {
        continue;
      }

      const docRelativePath: TestsLinkLinkValidationDocRelativePath = mdFile.slice('docs/'.length);
      const withoutExt: TestsLinkLinkValidationWithoutExt = docRelativePath.replace(new RegExp(PATTERN_FILE_EXTENSION_MD), '');

      existingPaths.add(withoutExt);

      // index files can be referenced by directory path.
      if (withoutExt.endsWith('/index') === true) {
        const indexSuffix: TestsLinkLinkValidationIndexSuffix = withoutExt.replace(new RegExp(PATTERN_INDEX_SUFFIX), '');

        existingPaths.add(indexSuffix);
      }

      // Parse frontmatter id for id-based routing.
      const filePath: TestsLinkLinkValidationFilePath = join(cwd, mdFile);
      const content: TestsLinkLinkValidationContent = await readFile(filePath, 'utf-8');
      const idMatch: TestsLinkLinkValidationIdMatch = new RegExp(PATTERN_ID_LINE, 'm').exec(content);

      if (idMatch !== null && idMatch[1] !== undefined) {
        const id: TestsLinkLinkValidationId = idMatch[1].trim();
        const dir: TestsLinkLinkValidationDir = dirname(withoutExt);
        const idPath: TestsLinkLinkValidationIdPath = (dir === '.') ? id : `${dir}/${id}`;

        idPaths.add(idPath);
      }
    }

    // Build a map of file path to heading anchors.
    const fileHeadings: TestsLinkLinkValidationFileHeadings = new Map();

    for (const mdFile of mdFiles) {
      const filePath: TestsLinkLinkValidationFilePath = join(cwd, mdFile);
      const content: TestsLinkLinkValidationContent = await readFile(filePath, 'utf-8');
      const headings: TestsLinkLinkValidationHeadings = new Set();

      for (const match of content.matchAll(new RegExp(PATTERN_HEADING_LINE, 'gm'))) {
        const matchCapture: TestsLinkLinkValidationMatchCapture = match[1] ?? '';

        const anchor: TestsLinkLinkValidationAnchor = matchCapture
          .replace(new RegExp(PATTERN_HTML_TAGS, 'g'), '')
          .trim()
          .toLowerCase()
          .replace(new RegExp(PATTERN_NON_WORD_CHARS, 'g'), '')
          .replace(new RegExp(PATTERN_WHITESPACE, 'g'), '-');

        headings.add(anchor);
      }

      // Store by full path for self-anchor lookups.
      const withoutExt: TestsLinkLinkValidationWithoutExt = mdFile.replace(new RegExp(PATTERN_FILE_EXTENSION_MD), '');

      fileHeadings.set(withoutExt, headings);

      // Docs files also need docs-relative keys for /docs/... link lookups.
      if (mdFile.startsWith('docs/') === true) {
        const docRelativePath: TestsLinkLinkValidationDocRelativePath = mdFile.slice('docs/'.length);
        const docWithoutExt: TestsLinkLinkValidationWithoutExt = docRelativePath.replace(new RegExp(PATTERN_FILE_EXTENSION_MD), '');

        fileHeadings.set(docWithoutExt, headings);

        if (docWithoutExt.endsWith('/index') === true) {
          const indexSuffix: TestsLinkLinkValidationIndexSuffix = docWithoutExt.replace(new RegExp(PATTERN_INDEX_SUFFIX), '');

          fileHeadings.set(indexSuffix, headings);
        }

        // Also map by frontmatter id.
        const idMatch: TestsLinkLinkValidationIdMatch = new RegExp(PATTERN_ID_LINE, 'm').exec(content);

        if (idMatch !== null && idMatch[1] !== undefined) {
          const id: TestsLinkLinkValidationId = idMatch[1].trim();
          const dir: TestsLinkLinkValidationDir = dirname(docWithoutExt);
          const idPath: TestsLinkLinkValidationIdPath = (dir === '.') ? id : `${dir}/${id}`;

          fileHeadings.set(idPath, headings);
        }
      }

      // Blog files: build slug lookup for /blog/... link validation.
      if (mdFile.startsWith('blog/') === true) {
        const slugMatch: TestsLinkLinkValidationSlugMatch = new RegExp(PATTERN_SLUG_LINE, 'm').exec(content);
        let blogSlug: TestsLinkLinkValidationBlogSlug = '';

        if (slugMatch !== null && slugMatch[1] !== undefined) {
          blogSlug = slugMatch[1].trim();
        } else {
          const blogFileName: TestsLinkLinkValidationBlogFileName = withoutExt.split('/').pop() ?? '';

          blogSlug = blogFileName.replace(new RegExp(PATTERN_BLOG_DATE_PREFIX), '');
        }

        if (blogSlug !== '') {
          blogPaths.add(blogSlug);

          fileHeadings.set(blogSlug, headings);
        }
      }
    }

    const failures: TestsLinkLinkValidationFailures = [];

    for (const mdFile of mdFiles) {
      const filePath: TestsLinkLinkValidationFilePath = join(cwd, mdFile);
      const content: TestsLinkLinkValidationContent = await readFile(filePath, 'utf-8');

      // Skip code blocks.
      const lines: TestsLinkLinkValidationLines = content.split('\n');
      let inCodeBlock: TestsLinkLinkValidationInCodeBlock = false;
      const proseLines: TestsLinkLinkValidationProseLines = [];

      for (const line of lines) {
        if (line.trimStart().startsWith('```') === true) {
          inCodeBlock = !inCodeBlock;

          continue;
        }

        if (inCodeBlock === false) {
          proseLines.push(line);
        }
      }

      const prose: TestsLinkLinkValidationProse = proseLines.join('\n');

      for (const linkMatch of prose.matchAll(new RegExp(PATTERN_MARKDOWN_LINK, 'g'))) {
        const href: TestsLinkLinkValidationHref = linkMatch[2] ?? '';

        // Skip external links, mailto, and protocol links.
        if (
          href.startsWith('http://') === true
          || href.startsWith('https://') === true
          || href.startsWith('mailto:') === true
          || href.startsWith('#') === true
        ) {
          // Anchor-only links: check heading exists in current file.
          if (href.startsWith('#') === true) {
            const anchor: TestsLinkLinkValidationAnchor = href.slice(1);
            const currentPath: TestsLinkLinkValidationCurrentPath = mdFile.replace(new RegExp(PATTERN_FILE_EXTENSION_MD), '');
            const headings: TestsLinkLinkValidationHeadingsLookup = fileHeadings.get(currentPath);

            if (headings !== undefined && headings.has(anchor) === false) {
              failures.push(`${mdFile}: anchor "${href}" not found in same file`);
            }
          }

          continue;
        }

        // Internal doc links starting with /docs/.
        if (href.startsWith('/docs/') === true) {
          const pathPartValue: TestsLinkLinkValidationPathPartValue = href.split('#')[0] ?? '';
          const anchor: TestsLinkLinkValidationAnchor = href.split('#')[1] ?? '';

          // Strip trailing slash and normalize.
          const docPath: TestsLinkLinkValidationDocPath = pathPartValue.replace(new RegExp(PATTERN_DOCS_PREFIX), '').replace(new RegExp(PATTERN_TRAILING_SLASH), '');

          // Skip Docusaurus auto-generated category routes.
          if (docPath.startsWith('category/') === true) {
            continue;
          }

          if (existingPaths.has(docPath) === false && idPaths.has(docPath) === false) {
            failures.push(`${mdFile}: link target "${pathPartValue}" does not exist`);

            continue;
          }

          if (anchor !== '') {
            const headings: TestsLinkLinkValidationHeadingsLookup = fileHeadings.get(docPath);

            if (headings !== undefined && headings.has(anchor) === false) {
              failures.push(`${mdFile}: anchor "${href}" not found in target file`);
            }
          }
        }

        // Internal blog links starting with /blog/.
        if (href.startsWith('/blog/') === true) {
          const pathPartValue: TestsLinkLinkValidationPathPartValue = href.split('#')[0] ?? '';
          const anchor: TestsLinkLinkValidationAnchor = href.split('#')[1] ?? '';

          // Strip /blog/ prefix and trailing slash.
          const blogPath: TestsLinkLinkValidationBlogPath = pathPartValue.replace(new RegExp(PATTERN_BLOG_PREFIX), '').replace(new RegExp(PATTERN_TRAILING_SLASH), '');

          if (blogPaths.has(blogPath) === false) {
            failures.push(`${mdFile}: link target "${pathPartValue}" does not exist`);

            continue;
          }

          if (anchor !== '') {
            const headings: TestsLinkLinkValidationHeadingsLookup = fileHeadings.get(blogPath);

            if (headings !== undefined && headings.has(anchor) === false) {
              failures.push(`${mdFile}: anchor "${href}" not found in target file`);
            }
          }
        }
      }
    }

    strictEqual(
      failures.length,
      0,
      `\nBroken links:\n${failures.join('\n')}`,
    );

    return;
  });

  return;
});

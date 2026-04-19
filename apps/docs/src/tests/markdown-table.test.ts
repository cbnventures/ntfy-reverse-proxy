import { strictEqual } from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';

import { MarkdownTable } from '@cbnventures/nova/toolkit';
import { describe, it } from 'vitest';

import type {
  TestsMarkdownTableMarkdowntableValidationContent,
  TestsMarkdownTableMarkdowntableValidationContentDirs,
  TestsMarkdownTableMarkdowntableValidationContentPath,
  TestsMarkdownTableMarkdowntableValidationCurrentTable,
  TestsMarkdownTableMarkdowntableValidationCwd,
  TestsMarkdownTableMarkdowntableValidationDataRows,
  TestsMarkdownTableMarkdowntableValidationDelimiterLine,
  TestsMarkdownTableMarkdowntableValidationEntries,
  TestsMarkdownTableMarkdowntableValidationExt,
  TestsMarkdownTableMarkdowntableValidationFailures,
  TestsMarkdownTableMarkdowntableValidationFilePath,
  TestsMarkdownTableMarkdowntableValidationHeaderLine,
  TestsMarkdownTableMarkdowntableValidationHeaders,
  TestsMarkdownTableMarkdowntableValidationInCodeBlock,
  TestsMarkdownTableMarkdowntableValidationLines,
  TestsMarkdownTableMarkdowntableValidationMdFiles,
  TestsMarkdownTableMarkdowntableValidationOriginal,
  TestsMarkdownTableMarkdowntableValidationParseCells,
  TestsMarkdownTableMarkdowntableValidationParsedCells,
  TestsMarkdownTableMarkdowntableValidationRendered,
  TestsMarkdownTableMarkdowntableValidationTable,
  TestsMarkdownTableMarkdowntableValidationTableLines,
  TestsMarkdownTableMarkdowntableValidationTables,
} from '../types/tests/markdown-table.test.d.ts';

/**
 * Tests - Markdown Table - MarkdownTable Validation.
 *
 * @since 0.14.0
 */
describe('MarkdownTable validation', async () => {
  it('all documentation tables match MarkdownTable output', async () => {
    const cwd: TestsMarkdownTableMarkdowntableValidationCwd = process.cwd();
    const contentDirs: TestsMarkdownTableMarkdowntableValidationContentDirs = [
      'docs',
      'blog',
    ];
    const mdFiles: TestsMarkdownTableMarkdowntableValidationMdFiles = [];

    for (const contentDir of contentDirs) {
      const contentPath: TestsMarkdownTableMarkdowntableValidationContentPath = resolve(cwd, contentDir);
      const entries: TestsMarkdownTableMarkdowntableValidationEntries = await readdir(contentPath, { recursive: true });

      for (const entry of entries) {
        const ext: TestsMarkdownTableMarkdowntableValidationExt = extname(entry);

        if (ext === '.md' || ext === '.mdx') {
          mdFiles.push(join(contentDir, entry));
        }
      }
    }

    /*
     * Replace escaped pipes with a placeholder before splitting,
     * then restore as raw pipes so MarkdownTable can re-escape them.
     */
    const parseCells: TestsMarkdownTableMarkdowntableValidationParseCells = (row) => {
      return row
        .replaceAll('\\|', '\x00')
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.trim().replaceAll('\x00', '|'));
    };

    const failures: TestsMarkdownTableMarkdowntableValidationFailures = [];

    for (const mdFile of mdFiles) {
      const filePath: TestsMarkdownTableMarkdowntableValidationFilePath = join(cwd, mdFile);
      const content: TestsMarkdownTableMarkdowntableValidationContent = await readFile(filePath, 'utf-8');
      const lines: TestsMarkdownTableMarkdowntableValidationLines = content.split('\n');
      const tables: TestsMarkdownTableMarkdowntableValidationTables = [];

      let currentTable: TestsMarkdownTableMarkdowntableValidationCurrentTable = [];
      let inCodeBlock: TestsMarkdownTableMarkdowntableValidationInCodeBlock = false;

      for (const line of lines) {
        if (line.trimStart().startsWith('```') === true) {
          inCodeBlock = !inCodeBlock;

          if (currentTable.length >= 3) {
            tables.push(currentTable);
          }

          currentTable = [];

          continue;
        }

        if (inCodeBlock === true) {
          continue;
        }

        if (line.trimStart().startsWith('|') === true) {
          currentTable.push(line);
        } else {
          if (currentTable.length >= 3) {
            tables.push(currentTable);
          }

          currentTable = [];
        }
      }

      if (currentTable.length >= 3) {
        tables.push(currentTable);
      }

      for (let i = 0; i < tables.length; i += 1) {
        const tableLines: TestsMarkdownTableMarkdowntableValidationTableLines = tables[i];

        if (tableLines === undefined) {
          continue;
        }

        const headerLine: TestsMarkdownTableMarkdowntableValidationHeaderLine = tableLines[0];
        const delimiterLine: TestsMarkdownTableMarkdowntableValidationDelimiterLine = tableLines[1];

        if (headerLine === undefined || delimiterLine === undefined) {
          continue;
        }

        // Skip tables with alignment markers.
        if (delimiterLine.includes(':') === true) {
          continue;
        }

        const headers: TestsMarkdownTableMarkdowntableValidationHeaders = parseCells(headerLine);
        const dataRows: TestsMarkdownTableMarkdowntableValidationDataRows = tableLines.slice(2);

        try {
          const table: TestsMarkdownTableMarkdowntableValidationTable = new MarkdownTable(headers);

          for (const row of dataRows) {
            const parsedCells: TestsMarkdownTableMarkdowntableValidationParsedCells = parseCells(row);

            table.addRow(parsedCells);
          }

          const rendered: TestsMarkdownTableMarkdowntableValidationRendered = table.render();
          const original: TestsMarkdownTableMarkdowntableValidationOriginal = tableLines.map((tableLine) => tableLine.trimEnd()).join('\n');

          if (rendered !== original) {
            failures.push(`${mdFile} (table ${i + 1})`);
          }
        } catch (error) {
          failures.push(`${mdFile} (table ${i + 1}): ${String(error)}`);
        }
      }
    }

    strictEqual(
      failures.length,
      0,
      `\nTables with formatting issues:\n${failures.join('\n')}`,
    );

    return;
  });

  return;
});

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';

/**
 * Fix Markdown Tables - Parse Cells.
 *
 * Splits a markdown table row into trimmed cell strings, preserving escaped
 * pipes through a placeholder so they survive the split.
 *
 * @param {string} row - Row.
 *
 * @returns {string[]}
 *
 * @since 0.0.0
 */
function parseCells(row) {
  const withPlaceholders = row.replaceAll('\\|', '\x00');
  const rawCells = withPlaceholders.split('|').slice(1, -1);

  return rawCells.map((cell) => cell.trim().replaceAll('\x00', '|'));
}

/**
 * Fix Markdown Tables - Fix Markdown Tables.
 *
 * Scans every markdown file under the working directory and rewrites each pipe
 * table through nova's MarkdownTable renderer whenever the output differs.
 *
 * @returns {Promise<void>}
 *
 * @since 0.0.0
 */
async function fixMarkdownTables() {
  let logger = undefined;
  let MarkdownTable = undefined;

  try {
    const toolkit = await import('@cbnventures/nova/toolkit');

    logger = toolkit['Logger'];
    MarkdownTable = toolkit['MarkdownTable'];
  } catch {
    process.stderr.write('fix-markdown-tables: requires @cbnventures/nova to be built. Run "npm run build" first.\n');

    process.exit(1);
  }

  const baseDir = resolve('.');
  const skipDirs = new Set([
    'node_modules',
    '.git',
    '.claude',
    'build',
  ]);
  const markdownExtensions = new Set([
    '.md',
    '.mdx',
  ]);
  const queue = [baseDir];
  const files = [];

  while (queue.length > 0) {
    const current = queue.pop();

    if (current === undefined) {
      continue;
    }

    for (const entry of readdirSync(current, { withFileTypes: true })) {
      if (skipDirs.has(entry.name) === true) {
        continue;
      }

      const entryPath = join(current, entry.name);

      if (entry.isDirectory() === true) {
        queue.push(entryPath);
      }

      const ext = extname(entry.name);

      if (entry.isFile() === true && markdownExtensions.has(ext) === true) {
        files.push(entryPath);
      }
    }
  }

  let totalFixed = 0;

  for (const file of files) {
    const relativePath = file.slice(baseDir.length + 1);
    const original = readFileSync(file, 'utf-8');
    const lines = original.split('\n');
    const tables = [];
    let currentTableStart = -1;
    let currentTableLines = [];
    let inCodeBlock = false;

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];

      if (line === undefined) {
        continue;
      }

      if (line.trimStart().startsWith('```') === true) {
        inCodeBlock = inCodeBlock === false;

        if (currentTableLines.length >= 3) {
          tables.push({
            start: currentTableStart,
            end: i - 1,
            lines: currentTableLines,
          });
        }

        currentTableStart = -1;
        currentTableLines = [];

        continue;
      }

      if (inCodeBlock === true) {
        continue;
      }

      if (line.trimStart().startsWith('|') === true) {
        if (currentTableLines.length === 0) {
          currentTableStart = i;
        }

        currentTableLines.push(line);
      } else {
        if (currentTableLines.length >= 3) {
          tables.push({
            start: currentTableStart,
            end: i - 1,
            lines: currentTableLines,
          });
        }

        currentTableStart = -1;
        currentTableLines = [];
      }
    }

    if (currentTableLines.length >= 3) {
      tables.push({
        start: currentTableStart,
        end: lines.length - 1,
        lines: currentTableLines,
      });
    }

    let fileFixed = 0;

    for (let i = tables.length - 1; i >= 0; i -= 1) {
      const currentTable = tables[i];

      if (currentTable === undefined) {
        continue;
      }

      const start = currentTable['start'];
      const tableLines = currentTable['lines'];
      const headerLine = tableLines[0];
      const delimiterLine = tableLines[1];

      if (headerLine === undefined || delimiterLine === undefined) {
        continue;
      }

      if (delimiterLine.includes(':') === true) {
        continue;
      }

      const headers = parseCells(headerLine);
      const dataRows = tableLines.slice(2);

      try {
        const table = new MarkdownTable(headers);

        for (const row of dataRows) {
          table.addRow(parseCells(row));
        }

        const rendered = table.render();
        const originalTable = tableLines.map((tableLine) => tableLine.trimEnd()).join('\n');

        if (rendered !== originalTable) {
          const renderedLines = rendered.split('\n');

          lines.splice(start, tableLines.length, ...renderedLines);
          fileFixed += 1;
        }
      } catch {
        continue;
      }
    }

    if (fileFixed > 0) {
      writeFileSync(file, lines.join('\n'), 'utf-8');
      totalFixed += fileFixed;

      logger.info(`Fixed ${fileFixed} table(s) in ${relativePath}`);
    }
  }

  if (totalFixed === 0) {
    logger.info('All tables are already formatted correctly.');
  } else {
    logger.info([
      '',
      `Fixed ${totalFixed} table(s) total.`,
    ].join('\n'));
  }

  return;
}

fixMarkdownTables();

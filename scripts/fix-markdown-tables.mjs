import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { extname, join, resolve } from 'path';

import { MarkdownTable } from '@cbnventures/nova/toolkit';

// Scan all markdown files in the current working directory.
const baseDir = resolve('.');
const skipDirs = new Set([
  'node_modules',
  '.git',
  '.claude',
  'build',
]);
const queue = [baseDir];
const files = [];

while (queue.length > 0) {
  const current = queue.pop();

  for (const entry of readdirSync(current, { withFileTypes: true })) {
    if (skipDirs.has(entry.name)) {
      continue;
    }

    const entryPath = join(current, entry.name);

    if (entry.isDirectory()) {
      queue.push(entryPath);
    }

    const ext = extname(entry.name);

    if (entry.isFile() && (ext === '.md' || ext === '.mdx')) {
      files.push(entryPath);
    }
  }
}

// Replace escaped pipes with a placeholder before splitting,
// then restore as raw pipes so MarkdownTable can re-escape them.
const parseCells = (row) => row
  .replaceAll('\\|', '\x00')
  .split('|')
  .slice(1, -1)
  .map((cell) => cell.trim().replaceAll('\x00', '|'));

let totalFixed = 0;

for (const file of files) {
  const relativePath = file.slice(baseDir.length + 1);
  const original = readFileSync(file, 'utf-8');
  const lines = original.split('\n');

  // Collect table locations (line ranges) and their rendered replacements.
  const tables = [];
  let currentTableStart = -1;
  let currentTableLines = [];
  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    if (line.trimStart().startsWith('```')) {
      inCodeBlock = !inCodeBlock;

      if (currentTableLines.length >= 3) {
        tables.push({
          start: currentTableStart, end: i - 1, lines: currentTableLines,
        });
      }

      currentTableStart = -1;
      currentTableLines = [];

      continue;
    }

    if (inCodeBlock) {
      continue;
    }

    if (line.trimStart().startsWith('|')) {
      if (currentTableLines.length === 0) {
        currentTableStart = i;
      }

      currentTableLines.push(line);
    } else {
      if (currentTableLines.length >= 3) {
        tables.push({
          start: currentTableStart, end: i - 1, lines: currentTableLines,
        });
      }

      currentTableStart = -1;
      currentTableLines = [];
    }
  }

  if (currentTableLines.length >= 3) {
    tables.push({
      start: currentTableStart, end: lines.length - 1, lines: currentTableLines,
    });
  }

  // Rebuild tables in reverse order so line indices stay valid.
  let fileFixed = 0;

  for (let i = tables.length - 1; i >= 0; i -= 1) {
    const { start, lines: tableLines } = tables[i];
    const headerLine = tableLines[0];
    const delimiterLine = tableLines[1];

    if (headerLine === undefined || delimiterLine === undefined) {
      continue;
    }

    // Skip tables with alignment markers.
    if (delimiterLine.includes(':')) {
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
      // Skip tables that fail to parse.
    }
  }

  if (fileFixed > 0) {
    writeFileSync(file, lines.join('\n'), 'utf-8');
    totalFixed += fileFixed;
    console.info(`Fixed ${fileFixed} table(s) in ${relativePath}`);
  }
}

if (totalFixed === 0) {
  console.info('All tables are already formatted correctly.');
} else {
  console.info(`\nFixed ${totalFixed} table(s) total.`);
}

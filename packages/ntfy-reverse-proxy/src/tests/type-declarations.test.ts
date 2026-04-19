import { strictEqual } from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  dirname,
  relative,
  resolve,
  sep,
} from 'node:path';
import { fileURLToPath } from 'node:url';

import { glob } from 'glob';
import { describe, it } from 'vitest';

import type {
  TestsTypeDeclarationsClassPrefix,
  TestsTypeDeclarationsCompareResult,
  TestsTypeDeclarationsContent,
  TestsTypeDeclarationsCurrentDirectory,
  TestsTypeDeclarationsCurrentFileDirectory,
  TestsTypeDeclarationsCurrentFilePath,
  TestsTypeDeclarationsCurrentSection,
  TestsTypeDeclarationsCurrentSectionPrefix,
  TestsTypeDeclarationsCurrentSpecifier,
  TestsTypeDeclarationsDefinedTypes,
  TestsTypeDeclarationsDiscoverTypeFilesReturns,
  TestsTypeDeclarationsFileExistsReturns,
  TestsTypeDeclarationsFiles,
  TestsTypeDeclarationsImportedNames,
  TestsTypeDeclarationsInImportBlock,
  TestsTypeDeclarationsInlineMatchCapture,
  TestsTypeDeclarationsIsImported,
  TestsTypeDeclarationsIsOtherSection,
  TestsTypeDeclarationsIsSameSection,
  TestsTypeDeclarationsLine,
  TestsTypeDeclarationsLineIndex,
  TestsTypeDeclarationsLines,
  TestsTypeDeclarationsMatch,
  TestsTypeDeclarationsMatched,
  TestsTypeDeclarationsMethodName,
  TestsTypeDeclarationsObjectProperties,
  TestsTypeDeclarationsObjectTypes,
  TestsTypeDeclarationsPackageRoot,
  TestsTypeDeclarationsPatterns,
  TestsTypeDeclarationsPreviousSpecifier,
  TestsTypeDeclarationsPropertyExpectedPrefix,
  TestsTypeDeclarationsPropertyKey,
  TestsTypeDeclarationsPropertyValueType,
  TestsTypeDeclarationsRawPrefix,
  TestsTypeDeclarationsReferencedType,
  TestsTypeDeclarationsReferencedTypes,
  TestsTypeDeclarationsRelativeCleaned,
  TestsTypeDeclarationsRelativePath,
  TestsTypeDeclarationsRightSide,
  TestsTypeDeclarationsSection,
  TestsTypeDeclarationsSectionComment,
  TestsTypeDeclarationsSectionIndex,
  TestsTypeDeclarationsSectionPrefixes,
  TestsTypeDeclarationsSections,
  TestsTypeDeclarationsSectionTypeLines,
  TestsTypeDeclarationsSegments,
  TestsTypeDeclarationsSourceExists,
  TestsTypeDeclarationsSourceLineIndex,
  TestsTypeDeclarationsSourcePath,
  TestsTypeDeclarationsSourcePathAlternative,
  TestsTypeDeclarationsSpecifierBuffer,
  TestsTypeDeclarationsSpecifiers,
  TestsTypeDeclarationsTestConfig,
  TestsTypeDeclarationsTrimmed,
  TestsTypeDeclarationsTypeLineMap,
  TestsTypeDeclarationsTypeMatch,
  TestsTypeDeclarationsTypeName,
  TestsTypeDeclarationsTypeNamePattern,
  TestsTypeDeclarationsTypeNames,
  TestsTypeDeclarationsTypePattern,
  TestsTypeDeclarationsTypePosition,
  TestsTypeDeclarationsTypePositions,
  TestsTypeDeclarationsViolation,
  TestsTypeDeclarationsViolations,
} from '../types/tests/type-declarations.test.d.ts';

/**
 * Tests - Type Declarations - Test Config.
 *
 * @since 0.15.0
 */
const testConfig: TestsTypeDeclarationsTestConfig = {
  standaloneTypeFiles: [
    '/fetch-response.d.ts',
    '/shared.d.ts',
  ],
  typeRoots: [
    'src',
    'utils',
  ],
};

/**
 * Tests - Type Declarations - Type Declaration Cross-section References.
 *
 * @since 0.15.0
 */
describe('type declaration cross-section references', async () => {
  const files: TestsTypeDeclarationsFiles = await discoverTypeFiles();

  const crossSectionCurrentDirectory: TestsTypeDeclarationsCurrentDirectory = getPackageRoot();

  for (const file of files) {
    const crossSectionRelativePath: TestsTypeDeclarationsRelativePath = relative(crossSectionCurrentDirectory, file);

    it(`no cross-section references in ${crossSectionRelativePath}`, async () => {
      if (testConfig['standaloneTypeFiles'].some((pattern) => file.endsWith(pattern)) === true) {
        return;
      }

      const content: TestsTypeDeclarationsContent = await readFile(file, 'utf-8');
      const lines: TestsTypeDeclarationsLines = content.split('\n');
      const classPrefix: TestsTypeDeclarationsClassPrefix = deriveClassPrefix(file);
      const importedNames: TestsTypeDeclarationsImportedNames = extractImportedNames(lines);
      const sections: TestsTypeDeclarationsSections = extractSections(lines);
      const sectionPrefixes: TestsTypeDeclarationsSectionPrefixes = sections.map((section) => section['prefix']);
      const violations: TestsTypeDeclarationsViolations = [];

      for (const section of sections) {
        const currentSectionPrefix: TestsTypeDeclarationsCurrentSectionPrefix = section['prefix'];

        for (const line of section['typeLines']) {
          const referencedTypes: TestsTypeDeclarationsReferencedTypes = extractReferencedTypes(line, classPrefix);

          for (const referencedType of referencedTypes) {
            const isSameSection: TestsTypeDeclarationsIsSameSection = referencedType.startsWith(currentSectionPrefix) === true;
            const isImported: TestsTypeDeclarationsIsImported = importedNames.has(referencedType) === true;
            const isOtherSection: TestsTypeDeclarationsIsOtherSection = sectionPrefixes.some((sectionPrefix) => {
              return referencedType.startsWith(sectionPrefix) === true && sectionPrefix !== currentSectionPrefix;
            });

            if (
              isOtherSection === true
              && isSameSection === false
              && isImported === false
            ) {
              const violation: TestsTypeDeclarationsViolation = `Section "${currentSectionPrefix}" references "${referencedType}" from another section. Move shared types to a shared type file (e.g., shared.d.ts).`;

              violations.push(violation);
            }
          }
        }
      }

      const violationMessage: TestsTypeDeclarationsViolation = violations.join('\n');

      strictEqual(violations.length, 0, violationMessage);

      return;
    });
  }

  return;
});

/**
 * Tests - Type Declarations - Type Declaration Section Alphabetical Order.
 *
 * @since 0.15.0
 */
describe('type declaration section alphabetical order', async () => {
  const files: TestsTypeDeclarationsFiles = await discoverTypeFiles();
  const sectionOrderCurrentDirectory: TestsTypeDeclarationsCurrentDirectory = getPackageRoot();

  for (const file of files) {
    const sectionOrderRelativePath: TestsTypeDeclarationsRelativePath = relative(sectionOrderCurrentDirectory, file);

    it(`sections alphabetical in ${sectionOrderRelativePath}`, async () => {
      const content: TestsTypeDeclarationsContent = await readFile(file, 'utf-8');
      const lines: TestsTypeDeclarationsLines = content.split('\n');
      const sections: TestsTypeDeclarationsSections = extractSections(lines);
      const violations: TestsTypeDeclarationsViolations = [];

      for (let i: TestsTypeDeclarationsSectionIndex = 1; i < sections.length; i += 1) {
        const previous: TestsTypeDeclarationsSection = sections[i - 1] as TestsTypeDeclarationsSection;
        const current: TestsTypeDeclarationsSection = sections[i] as TestsTypeDeclarationsSection;

        if (previous === undefined || current === undefined) {
          continue;
        }

        const compareResult: TestsTypeDeclarationsCompareResult = previous['prefix'].localeCompare(current['prefix']);

        if (compareResult > 0) {
          const violation: TestsTypeDeclarationsViolation = `Section "${current['prefix']}" should come before "${previous['prefix']}"`;

          violations.push(violation);
        }
      }

      const violationMessage: TestsTypeDeclarationsViolation = violations.join('\n');

      strictEqual(violations.length, 0, violationMessage);

      return;
    });
  }

  return;
});

/**
 * Tests - Type Declarations - Type Declaration Import Specifier Order.
 *
 * @since 0.15.0
 */
describe('type declaration import specifier order', async () => {
  const files: TestsTypeDeclarationsFiles = await discoverTypeFiles();
  const importOrderCurrentDirectory: TestsTypeDeclarationsCurrentDirectory = getPackageRoot();

  for (const file of files) {
    const importOrderRelativePath: TestsTypeDeclarationsRelativePath = relative(importOrderCurrentDirectory, file);

    it(`import specifiers alphabetical in ${importOrderRelativePath}`, async () => {
      const content: TestsTypeDeclarationsContent = await readFile(file, 'utf-8');
      const lines: TestsTypeDeclarationsLines = content.split('\n');
      const violations: TestsTypeDeclarationsViolations = [];
      const specifierBuffer: TestsTypeDeclarationsSpecifierBuffer = [];
      let inImportBlock: TestsTypeDeclarationsInImportBlock = false;

      for (const line of lines) {
        if (line.startsWith('import type {') === true) {
          inImportBlock = true;
          specifierBuffer.length = 0;

          const inlineMatch: TestsTypeDeclarationsMatch = line.match(new RegExp('^import type \\{ (.+) \\} from'));

          if (inlineMatch !== null && inlineMatch[1] !== undefined) {
            const inlineMatchCapture: TestsTypeDeclarationsInlineMatchCapture = inlineMatch[1];
            const specifiers: TestsTypeDeclarationsSpecifiers = inlineMatchCapture.split(',').map((specifier) => specifier.trim());

            for (let i = 1; i < specifiers.length; i += 1) {
              const previousSpecifier: TestsTypeDeclarationsPreviousSpecifier = specifiers[i - 1];
              const currentSpecifier: TestsTypeDeclarationsCurrentSpecifier = specifiers[i];

              if (
                previousSpecifier !== undefined
                && currentSpecifier !== undefined
                && previousSpecifier.localeCompare(currentSpecifier) > 0
              ) {
                const violation: TestsTypeDeclarationsViolation = `Import specifier "${currentSpecifier}" should come before "${previousSpecifier}"`;

                violations.push(violation);
              }
            }

            inImportBlock = false;
          }

          continue;
        }

        if (inImportBlock === true) {
          const trimmed: TestsTypeDeclarationsTrimmed = line.trim().replace(',', '');

          if (trimmed.startsWith('}') === true) {
            for (let i = 1; i < specifierBuffer.length; i += 1) {
              const previousSpecifier: TestsTypeDeclarationsPreviousSpecifier = specifierBuffer[i - 1];
              const currentSpecifier: TestsTypeDeclarationsCurrentSpecifier = specifierBuffer[i];

              if (
                previousSpecifier !== undefined
                && currentSpecifier !== undefined
                && previousSpecifier.localeCompare(currentSpecifier) > 0
              ) {
                const violation: TestsTypeDeclarationsViolation = `Import specifier "${currentSpecifier}" should come before "${previousSpecifier}"`;

                violations.push(violation);
              }
            }

            inImportBlock = false;
            specifierBuffer.length = 0;
          } else if (trimmed !== '') {
            specifierBuffer.push(trimmed);
          }
        }
      }

      const violationMessage: TestsTypeDeclarationsViolation = violations.join('\n');

      strictEqual(violations.length, 0, violationMessage);

      return;
    });
  }

  return;
});

/**
 * Tests - Type Declarations - Type Declaration First-come-first-serve Order.
 *
 * @since 0.15.0
 */
describe('type declaration first-come-first-serve order', async () => {
  const files: TestsTypeDeclarationsFiles = await discoverTypeFiles();
  const orderCurrentDirectory: TestsTypeDeclarationsCurrentDirectory = getPackageRoot();

  for (const file of files) {
    const orderRelativePath: TestsTypeDeclarationsRelativePath = relative(orderCurrentDirectory, file);

    it(`types match source order in ${orderRelativePath}`, async () => {
      if (testConfig['standaloneTypeFiles'].some((pattern) => file.endsWith(pattern)) === true) {
        return;
      }

      let sourcePath: TestsTypeDeclarationsSourcePath = deriveSourcePath(file);
      let sourceExists: TestsTypeDeclarationsSourceExists = await fileExists(sourcePath);

      if (sourceExists === false) {
        const sourcePathAlternative: TestsTypeDeclarationsSourcePathAlternative = sourcePath.replace('.ts', '.tsx');

        sourcePath = sourcePathAlternative;
        sourceExists = await fileExists(sourcePath);

        if (sourceExists === false) {
          strictEqual(sourceExists, true, `Missing source file for ${orderRelativePath}. Expected: ${relative(orderCurrentDirectory, sourcePath)}`);

          return;
        }
      }

      const sourceContent: TestsTypeDeclarationsContent = await readFile(sourcePath, 'utf-8');
      const sourceLines: TestsTypeDeclarationsLines = sourceContent.split('\n');
      const dtsContent: TestsTypeDeclarationsContent = await readFile(file, 'utf-8');
      const dtsLines: TestsTypeDeclarationsLines = dtsContent.split('\n');
      const sections: TestsTypeDeclarationsSections = extractSections(dtsLines);
      const violations: TestsTypeDeclarationsViolations = [];

      for (const section of sections) {
        const typeNames: TestsTypeDeclarationsTypeNames = extractTypeNames(section['typeLines']);
        const typePositions: TestsTypeDeclarationsTypePositions = [];

        for (const typeName of typeNames) {
          const sourceLineIndex: TestsTypeDeclarationsSourceLineIndex = findFirstOccurrence(sourceLines, typeName);

          if (sourceLineIndex === -1) {
            continue;
          }

          typePositions.push({
            name: typeName,
            sourceLine: sourceLineIndex,
          });
        }

        const sortedPositions: TestsTypeDeclarationsTypePositions = [...typePositions].sort((positionA, positionB) => positionA['sourceLine'] - positionB['sourceLine']);

        for (let j: TestsTypeDeclarationsLineIndex = 0; j < typePositions.length; j += 1) {
          const actual: TestsTypeDeclarationsTypePosition = typePositions[j] as TestsTypeDeclarationsTypePosition;
          const expected: TestsTypeDeclarationsTypePosition = sortedPositions[j] as TestsTypeDeclarationsTypePosition;

          if (actual === undefined || expected === undefined) {
            continue;
          }

          if (actual['name'] !== expected['name']) {
            const violation: TestsTypeDeclarationsViolation = `Section "${section['prefix']}": type "${actual['name']}" (source line ${actual['sourceLine'] + 1}) is at .d.ts position ${j + 1}, but should be "${expected['name']}" (source line ${expected['sourceLine'] + 1}).`;

            violations.push(violation);
          }
        }
      }

      const violationMessage: TestsTypeDeclarationsViolation = violations.join('\n');

      strictEqual(violations.length, 0, violationMessage);

      return;
    });
  }

  return;
});

/**
 * Tests - Type Declarations - Type Declaration Object Property Types.
 *
 * @since 0.15.0
 */
describe('type declaration object property types', async () => {
  const files: TestsTypeDeclarationsFiles = await discoverTypeFiles();
  const objectPropsCurrentDirectory: TestsTypeDeclarationsCurrentDirectory = getPackageRoot();

  for (const file of files) {
    const objectPropsRelativePath: TestsTypeDeclarationsRelativePath = relative(objectPropsCurrentDirectory, file);

    it(`object properties use named types in ${objectPropsRelativePath}`, async () => {
      const content: TestsTypeDeclarationsContent = await readFile(file, 'utf-8');
      const lines: TestsTypeDeclarationsLines = content.split('\n');
      const classPrefix: TestsTypeDeclarationsClassPrefix = deriveClassPrefix(file);
      const violations: TestsTypeDeclarationsViolations = [];
      const definedTypes: TestsTypeDeclarationsDefinedTypes = new Set<string>();

      for (let i: TestsTypeDeclarationsLineIndex = 0; i < lines.length; i += 1) {
        const line: TestsTypeDeclarationsLine = lines[i] as TestsTypeDeclarationsLine;

        if (line === undefined) {
          continue;
        }

        const typeDefMatch: TestsTypeDeclarationsMatch = line.match(new RegExp('^export type (\\w+)'));

        if (typeDefMatch !== null && typeDefMatch[1] !== undefined) {
          definedTypes.add(typeDefMatch[1]);
        }
      }

      const objectTypes: TestsTypeDeclarationsObjectTypes = extractObjectTypes(lines, classPrefix);

      for (const objectType of objectTypes) {
        for (const property of objectType['properties']) {
          const propertyExpectedPrefix: TestsTypeDeclarationsPropertyExpectedPrefix = objectType['name'];

          if (property['valueType'].startsWith(propertyExpectedPrefix) === false) {
            const violation: TestsTypeDeclarationsViolation = `"${objectType['name']}": property "${property['key']}" must use a named type starting with "${propertyExpectedPrefix}" but found "${property['valueType']}".`;

            violations.push(violation);

            continue;
          }

          if (definedTypes.has(property['valueType']) === false) {
            const violation: TestsTypeDeclarationsViolation = `"${objectType['name']}": property type "${property['valueType']}" is not defined in this file.`;

            violations.push(violation);

            continue;
          }

          if (property['typeLineIndex'] > objectType['lineIndex']) {
            const violation: TestsTypeDeclarationsViolation = `"${objectType['name']}": property type "${property['valueType']}" (line ${property['typeLineIndex'] + 1}) must be defined before the object type (line ${objectType['lineIndex'] + 1}).`;

            violations.push(violation);
          }
        }
      }

      const violationMessage: TestsTypeDeclarationsViolation = violations.join('\n');

      strictEqual(violations.length, 0, violationMessage);

      return;
    });
  }

  return;
});

/**
 * Tests - Type Declarations - Discover Type Files.
 *
 * @since 0.15.0
 */
async function discoverTypeFiles(): TestsTypeDeclarationsDiscoverTypeFilesReturns {
  const patterns: TestsTypeDeclarationsPatterns = testConfig['typeRoots'].map(
    (typeRoot) => `${typeRoot}/types/**/*.d.ts`,
  );

  const matched: TestsTypeDeclarationsMatched = await glob(patterns, {
    cwd: getPackageRoot(),
    absolute: true,
  });

  return matched.sort();
}

/**
 * Tests - Type Declarations - Derive Class Prefix.
 *
 * @since 0.15.0
 */
function deriveClassPrefix(filePath: TestsTypeDeclarationsLine): TestsTypeDeclarationsClassPrefix {
  const currentDirectory: TestsTypeDeclarationsCurrentDirectory = getPackageRoot();
  const relativePath: TestsTypeDeclarationsRelativePath = relative(currentDirectory, filePath);
  let relativeCleaned: TestsTypeDeclarationsRelativeCleaned = relativePath;

  for (const typeRoot of testConfig['typeRoots']) {
    relativeCleaned = relativeCleaned.replace(`${typeRoot}/types/`, '');
  }

  const segments: TestsTypeDeclarationsSegments = relativeCleaned
    .replace('.d.ts', '')
    .split(sep)
    .join('/')
    .split('/');

  return segments.map((segment) => {
    return segment.split('-').map((part) => {
      return part.charAt(0).toUpperCase() + part.slice(1);
    }).join('');
  }).join('');
}

/**
 * Tests - Type Declarations - Extract Imported Names.
 *
 * @since 0.15.0
 */
function extractImportedNames(lines: TestsTypeDeclarationsLines): TestsTypeDeclarationsImportedNames {
  const importedNames: TestsTypeDeclarationsImportedNames = new Set<string>();
  let inImportBlock: TestsTypeDeclarationsInImportBlock = false;

  for (const line of lines) {
    if (line.startsWith('import type') === true) {
      inImportBlock = true;

      const inlineMatch: TestsTypeDeclarationsMatch = line.match(new RegExp('^import type \\{ (.+) \\} from'));

      if (inlineMatch !== null && inlineMatch[1] !== undefined) {
        const inlineMatchCapture: TestsTypeDeclarationsInlineMatchCapture = inlineMatch[1];
        const specifiers: TestsTypeDeclarationsSpecifiers = inlineMatchCapture.split(',').map((specifier) => specifier.trim());

        for (const specifier of specifiers) {
          importedNames.add(specifier);
        }

        inImportBlock = false;
      }

      continue;
    }

    if (inImportBlock === true) {
      const trimmed: TestsTypeDeclarationsTrimmed = line.trim().replace(',', '');

      if (trimmed.startsWith('}') === true) {
        inImportBlock = false;
      } else if (trimmed !== '' && trimmed.startsWith('//') === false) {
        importedNames.add(trimmed);
      }
    }
  }

  return importedNames;
}

/**
 * Tests - Type Declarations - Extract Sections.
 *
 * @since 0.15.0
 */
function extractSections(lines: TestsTypeDeclarationsLines): TestsTypeDeclarationsSections {
  const sections: TestsTypeDeclarationsSections = [];
  let currentSection: TestsTypeDeclarationsCurrentSection = undefined;

  for (let i: TestsTypeDeclarationsLineIndex = 0; i < lines.length; i += 1) {
    const line: TestsTypeDeclarationsLine = lines[i] as TestsTypeDeclarationsLine;

    if (line === undefined) {
      continue;
    }

    const sectionComment: TestsTypeDeclarationsSectionComment = line.match(new RegExp('^ \\* (.+)\\.$'));

    if (
      sectionComment !== null
      && sectionComment[1] !== undefined
      && line.includes('@') === false
    ) {
      const rawPrefix: TestsTypeDeclarationsRawPrefix = sectionComment[1];
      const segments: TestsTypeDeclarationsSegments = rawPrefix.split(' - ');
      const methodName: TestsTypeDeclarationsMethodName = segments.map((segment) => {
        return segment.split(new RegExp('[\\s.]+', 'g')).map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join('');
      }).join('');

      if (currentSection !== undefined) {
        sections.push(currentSection);
      }

      currentSection = {
        prefix: methodName,
        typeLines: [],
      };

      continue;
    }

    if (currentSection !== undefined && line.startsWith('export type ') === true) {
      currentSection['typeLines'].push(line);
    }
  }

  if (currentSection !== undefined) {
    sections.push(currentSection);
  }

  return sections;
}

/**
 * Tests - Type Declarations - Extract Referenced Types.
 *
 * @since 0.15.0
 */
function extractReferencedTypes(line: TestsTypeDeclarationsLine, classPrefix: TestsTypeDeclarationsClassPrefix): TestsTypeDeclarationsReferencedTypes {
  const match: TestsTypeDeclarationsMatch = line.match(new RegExp('^export type (\\w+)'));

  if (match === null || match[1] === undefined) {
    return [];
  }

  const typeName: TestsTypeDeclarationsTypeName = match[1];
  const rightSide: TestsTypeDeclarationsRightSide = line.slice(line.indexOf('=') + 1);
  const referencedTypes: TestsTypeDeclarationsReferencedTypes = [];
  const typePattern: TestsTypeDeclarationsTypePattern = new RegExp(`${classPrefix}\\w+`, 'g');
  let typeMatch: TestsTypeDeclarationsTypeMatch = typePattern.exec(rightSide);

  while (typeMatch !== null) {
    const referencedType: TestsTypeDeclarationsReferencedType = typeMatch[0];

    if (referencedType !== typeName) {
      referencedTypes.push(referencedType);
    }

    typeMatch = typePattern.exec(rightSide);
  }

  return referencedTypes;
}

/**
 * Tests - Type Declarations - Derive Source Path.
 *
 * @since 0.15.0
 */
function deriveSourcePath(dtsPath: TestsTypeDeclarationsLine): TestsTypeDeclarationsSourcePath {
  return dtsPath.replace('/types/', '/').replace('.d.ts', '.ts');
}

/**
 * Tests - Type Declarations - File Exists.
 *
 * @since 0.15.0
 */
async function fileExists(filePath: TestsTypeDeclarationsLine): TestsTypeDeclarationsFileExistsReturns {
  try {
    await readFile(filePath, 'utf-8');

    return true;
  } catch {
    return false;
  }
}

/**
 * Tests - Type Declarations - Get Package Root.
 *
 * @since 0.15.0
 */
function getPackageRoot(): TestsTypeDeclarationsPackageRoot {
  const currentFilePath: TestsTypeDeclarationsCurrentFilePath = fileURLToPath(import.meta.url);
  const currentFileDirectory: TestsTypeDeclarationsCurrentFileDirectory = dirname(currentFilePath);

  return resolve(currentFileDirectory, '..', '..');
}

/**
 * Tests - Type Declarations - Extract Type Names.
 *
 * @since 0.15.0
 */
function extractTypeNames(typeLines: TestsTypeDeclarationsSectionTypeLines): TestsTypeDeclarationsTypeNames {
  const typeNames: TestsTypeDeclarationsTypeNames = [];

  for (const line of typeLines) {
    const match: TestsTypeDeclarationsMatch = line.match(new RegExp('^export type (\\w+)'));

    if (match !== null && match[1] !== undefined) {
      typeNames.push(match[1]);
    }
  }

  return typeNames;
}

/**
 * Tests - Type Declarations - Find First Occurrence.
 *
 * @since 0.15.0
 */
function findFirstOccurrence(sourceLines: TestsTypeDeclarationsLines, typeName: TestsTypeDeclarationsTypeName): TestsTypeDeclarationsSourceLineIndex {
  let inImportBlock: TestsTypeDeclarationsInImportBlock = false;

  for (let i: TestsTypeDeclarationsLineIndex = 0; i < sourceLines.length; i += 1) {
    const line: TestsTypeDeclarationsLine = sourceLines[i] as TestsTypeDeclarationsLine;

    if (line === undefined) {
      continue;
    }

    if (line.startsWith('import ') === true || line.startsWith('import type') === true) {
      inImportBlock = true;
    }

    if (inImportBlock === true) {
      if (line.includes(' from ') === true) {
        inImportBlock = false;
      }

      continue;
    }

    const typeNamePattern: TestsTypeDeclarationsTypeNamePattern = new RegExp(`\\b${typeName}\\b`);

    if (typeNamePattern.test(line) === true) {
      return i;
    }
  }

  return -1;
}

/**
 * Tests - Type Declarations - Extract Object Types.
 *
 * @since 0.15.0
 */
function extractObjectTypes(lines: TestsTypeDeclarationsLines, classPrefix: TestsTypeDeclarationsClassPrefix): TestsTypeDeclarationsObjectTypes {
  const objectTypes: TestsTypeDeclarationsObjectTypes = [];
  const typeLineMap: TestsTypeDeclarationsTypeLineMap = new Map<string, number>();

  for (let i: TestsTypeDeclarationsLineIndex = 0; i < lines.length; i += 1) {
    const line: TestsTypeDeclarationsLine = lines[i] as TestsTypeDeclarationsLine;

    if (line === undefined) {
      continue;
    }

    const typeDefMatch: TestsTypeDeclarationsMatch = line.match(new RegExp(`^export type (${classPrefix}\\w+)`));

    if (typeDefMatch !== null && typeDefMatch[1] !== undefined) {
      typeLineMap.set(typeDefMatch[1], i);
    }
  }

  for (let i: TestsTypeDeclarationsLineIndex = 0; i < lines.length; i += 1) {
    const line: TestsTypeDeclarationsLine = lines[i] as TestsTypeDeclarationsLine;

    if (line === undefined) {
      continue;
    }

    const objectMatch: TestsTypeDeclarationsMatch = line.match(new RegExp(`^export type (${classPrefix}\\w+) = (?:Readonly<)?\\{$`));

    if (objectMatch === null || objectMatch[1] === undefined) {
      continue;
    }

    const properties: TestsTypeDeclarationsObjectProperties = [];

    for (let j: TestsTypeDeclarationsLineIndex = i + 1; j < lines.length; j += 1) {
      const propertyLine: TestsTypeDeclarationsLine = lines[j] as TestsTypeDeclarationsLine;

      if (propertyLine === undefined) {
        continue;
      }

      const trimmedProperty: TestsTypeDeclarationsTrimmed = propertyLine.trim();

      if (
        trimmedProperty === '}>'
        || trimmedProperty === '};'
        || trimmedProperty === '}>;'
      ) {
        break;
      }

      const propertyMatch: TestsTypeDeclarationsMatch = trimmedProperty.match(new RegExp('^(\\w+):\\s+(.+);$'));

      if (
        propertyMatch !== null
        && propertyMatch[1] !== undefined
        && propertyMatch[2] !== undefined
      ) {
        const propertyKey: TestsTypeDeclarationsPropertyKey = propertyMatch[1];
        const propertyValueType: TestsTypeDeclarationsPropertyValueType = propertyMatch[2];
        const typeLineIndex: TestsTypeDeclarationsLineIndex = typeLineMap.get(propertyValueType) ?? -1;

        properties.push({
          key: propertyKey,
          valueType: propertyValueType,
          typeLineIndex,
        });
      }
    }

    const objectName: TestsTypeDeclarationsTypeName = objectMatch[1];

    objectTypes.push({
      name: objectName,
      lineIndex: i,
      properties,
    });
  }

  return objectTypes;
}

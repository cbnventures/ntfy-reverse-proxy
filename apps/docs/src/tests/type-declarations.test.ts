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
  TestsTypeDeclarationsDeriveClassPrefixCurrentDirectory,
  TestsTypeDeclarationsDeriveClassPrefixFilePath,
  TestsTypeDeclarationsDeriveClassPrefixRelativeCleaned,
  TestsTypeDeclarationsDeriveClassPrefixRelativePath,
  TestsTypeDeclarationsDeriveClassPrefixReturns,
  TestsTypeDeclarationsDeriveClassPrefixSegments,
  TestsTypeDeclarationsDeriveSourcePathDtsPath,
  TestsTypeDeclarationsDeriveSourcePathReturns,
  TestsTypeDeclarationsDiscoverTypeFilesMatched,
  TestsTypeDeclarationsDiscoverTypeFilesPatterns,
  TestsTypeDeclarationsDiscoverTypeFilesReturns,
  TestsTypeDeclarationsExtractImportedNamesImportedNames,
  TestsTypeDeclarationsExtractImportedNamesInImportBlock,
  TestsTypeDeclarationsExtractImportedNamesInlineMatchCapture,
  TestsTypeDeclarationsExtractImportedNamesLines,
  TestsTypeDeclarationsExtractImportedNamesMatch,
  TestsTypeDeclarationsExtractImportedNamesReturns,
  TestsTypeDeclarationsExtractImportedNamesSpecifiers,
  TestsTypeDeclarationsExtractImportedNamesTrimmed,
  TestsTypeDeclarationsExtractObjectTypesClassPrefix,
  TestsTypeDeclarationsExtractObjectTypesLine,
  TestsTypeDeclarationsExtractObjectTypesLineIndex,
  TestsTypeDeclarationsExtractObjectTypesLines,
  TestsTypeDeclarationsExtractObjectTypesMatch,
  TestsTypeDeclarationsExtractObjectTypesObjectTypeProperties,
  TestsTypeDeclarationsExtractObjectTypesObjectTypes,
  TestsTypeDeclarationsExtractObjectTypesPropertyKey,
  TestsTypeDeclarationsExtractObjectTypesPropertyValueType,
  TestsTypeDeclarationsExtractObjectTypesReturns,
  TestsTypeDeclarationsExtractObjectTypesTrimmed,
  TestsTypeDeclarationsExtractObjectTypesTypeLineMap,
  TestsTypeDeclarationsExtractObjectTypesTypeName,
  TestsTypeDeclarationsExtractReferencedTypesClassPrefix,
  TestsTypeDeclarationsExtractReferencedTypesLine,
  TestsTypeDeclarationsExtractReferencedTypesMatch,
  TestsTypeDeclarationsExtractReferencedTypesReferencedType,
  TestsTypeDeclarationsExtractReferencedTypesReferencedTypes,
  TestsTypeDeclarationsExtractReferencedTypesReturns,
  TestsTypeDeclarationsExtractReferencedTypesRightSide,
  TestsTypeDeclarationsExtractReferencedTypesTypeMatch,
  TestsTypeDeclarationsExtractReferencedTypesTypeName,
  TestsTypeDeclarationsExtractReferencedTypesTypePattern,
  TestsTypeDeclarationsExtractSectionsCurrentSection,
  TestsTypeDeclarationsExtractSectionsLine,
  TestsTypeDeclarationsExtractSectionsLineIndex,
  TestsTypeDeclarationsExtractSectionsLines,
  TestsTypeDeclarationsExtractSectionsMethodName,
  TestsTypeDeclarationsExtractSectionsRawPrefix,
  TestsTypeDeclarationsExtractSectionsReturns,
  TestsTypeDeclarationsExtractSectionsSectionComment,
  TestsTypeDeclarationsExtractSectionsSections,
  TestsTypeDeclarationsExtractSectionsSegments,
  TestsTypeDeclarationsExtractSourceSectionsLines,
  TestsTypeDeclarationsExtractSourceSectionsMethodName,
  TestsTypeDeclarationsExtractSourceSectionsNextIsSummary,
  TestsTypeDeclarationsExtractSourceSectionsRawPrefix,
  TestsTypeDeclarationsExtractSourceSectionsReturns,
  TestsTypeDeclarationsExtractSourceSectionsSectionComment,
  TestsTypeDeclarationsExtractSourceSectionsSections,
  TestsTypeDeclarationsExtractSourceSectionsSegments,
  TestsTypeDeclarationsExtractTypeNamesMatch,
  TestsTypeDeclarationsExtractTypeNamesReturns,
  TestsTypeDeclarationsExtractTypeNamesTypeLines,
  TestsTypeDeclarationsExtractTypeNamesTypeNames,
  TestsTypeDeclarationsFileExistsFilePath,
  TestsTypeDeclarationsFileExistsReturns,
  TestsTypeDeclarationsFindFirstOccurrenceInImportBlock,
  TestsTypeDeclarationsFindFirstOccurrenceLine,
  TestsTypeDeclarationsFindFirstOccurrenceLineIndex,
  TestsTypeDeclarationsFindFirstOccurrenceReturns,
  TestsTypeDeclarationsFindFirstOccurrenceSourceLines,
  TestsTypeDeclarationsFindFirstOccurrenceTypeName,
  TestsTypeDeclarationsFindFirstOccurrenceTypeNamePattern,
  TestsTypeDeclarationsGetPackageRootCurrentFileDirectory,
  TestsTypeDeclarationsGetPackageRootCurrentFilePath,
  TestsTypeDeclarationsGetPackageRootReturns,
  TestsTypeDeclarationsTestConfig,
  TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesClassPrefix,
  TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesContent,
  TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesCurrentDirectory,
  TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesCurrentSectionPrefix,
  TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesFiles,
  TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesImportedNames,
  TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesIsImported,
  TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesIsOtherSection,
  TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesIsSameSection,
  TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesLines,
  TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesReferencedTypes,
  TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesRelativePath,
  TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesSectionPrefixes,
  TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesSections,
  TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesViolation,
  TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesViolations,
  TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderClassPrefix,
  TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderContent,
  TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderCurrentDirectory,
  TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderFiles,
  TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderLineIndex,
  TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderLines,
  TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderObjectPropertyTypeNames,
  TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderObjectTypes,
  TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderRelativePath,
  TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderSections,
  TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderSourceExists,
  TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderSourceLineIndex,
  TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderSourcePath,
  TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderSourcePathAlternative,
  TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderTypeNames,
  TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderTypePosition,
  TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderTypePositions,
  TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderViolation,
  TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderViolations,
  TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderContent,
  TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderCurrentDirectory,
  TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderCurrentSpecifier,
  TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderFiles,
  TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderInImportBlock,
  TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderInlineMatchCapture,
  TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderLines,
  TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderMatch,
  TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderPreviousSpecifier,
  TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderRelativePath,
  TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderSpecifierBuffer,
  TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderSpecifiers,
  TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderTrimmed,
  TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderViolation,
  TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderViolations,
  TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesClassPrefix,
  TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesContent,
  TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesCurrentDirectory,
  TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesDefinedTypes,
  TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesFiles,
  TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesLine,
  TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesLineIndex,
  TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesLines,
  TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesMatch,
  TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesObjectTypes,
  TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesPropertyExpectedPrefix,
  TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesRelativePath,
  TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesViolation,
  TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesViolations,
  TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderCompareResult,
  TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderContent,
  TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderCurrentDirectory,
  TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderFiles,
  TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderLines,
  TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderRelativePath,
  TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderSection,
  TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderSectionIndex,
  TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderSections,
  TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderViolation,
  TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderViolations,
  TestsTypeDeclarationsTypeDeclarationSectionCoverageContent,
  TestsTypeDeclarationsTypeDeclarationSectionCoverageCurrentDirectory,
  TestsTypeDeclarationsTypeDeclarationSectionCoverageDtsSectionPrefixes,
  TestsTypeDeclarationsTypeDeclarationSectionCoverageFiles,
  TestsTypeDeclarationsTypeDeclarationSectionCoverageIsParent,
  TestsTypeDeclarationsTypeDeclarationSectionCoverageLines,
  TestsTypeDeclarationsTypeDeclarationSectionCoverageRelativePath,
  TestsTypeDeclarationsTypeDeclarationSectionCoverageSections,
  TestsTypeDeclarationsTypeDeclarationSectionCoverageSourceExists,
  TestsTypeDeclarationsTypeDeclarationSectionCoverageSourcePath,
  TestsTypeDeclarationsTypeDeclarationSectionCoverageSourcePathAlternative,
  TestsTypeDeclarationsTypeDeclarationSectionCoverageSourceSectionPrefix,
  TestsTypeDeclarationsTypeDeclarationSectionCoverageSourceSections,
  TestsTypeDeclarationsTypeDeclarationSectionCoverageViolation,
  TestsTypeDeclarationsTypeDeclarationSectionCoverageViolations,
} from '../types/tests/type-declarations.test.d.ts';

/**
 * Tests - Type Declarations - Test Config.
 *
 * @since 0.15.0
 */
const testConfig: TestsTypeDeclarationsTestConfig = {
  standaloneTypeFiles: ['/shared.d.ts'],
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
  const files: TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesFiles = await discoverTypeFiles();

  const crossSectionCurrentDirectory: TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesCurrentDirectory = getPackageRoot();

  for (const file of files) {
    const crossSectionRelativePath: TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesRelativePath = relative(crossSectionCurrentDirectory, file);

    it(`no cross-section references in ${crossSectionRelativePath}`, async () => {
      if (testConfig['standaloneTypeFiles'].some((pattern) => file.endsWith(pattern)) === true) {
        return;
      }

      const content: TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesContent = await readFile(file, 'utf-8');
      const lines: TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesLines = content.split('\n');
      const classPrefix: TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesClassPrefix = deriveClassPrefix(file);
      const importedNames: TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesImportedNames = extractImportedNames(lines);
      const sections: TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesSections = extractSections(lines);
      const sectionPrefixes: TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesSectionPrefixes = sections.map((section) => section['prefix']);
      const violations: TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesViolations = [];

      for (const section of sections) {
        const currentSectionPrefix: TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesCurrentSectionPrefix = section['prefix'];

        for (const line of section['typeLines']) {
          const referencedTypes: TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesReferencedTypes = extractReferencedTypes(line, classPrefix);

          for (const referencedType of referencedTypes) {
            const isSameSection: TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesIsSameSection = referencedType.startsWith(currentSectionPrefix) === true;
            const isImported: TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesIsImported = importedNames.has(referencedType) === true;
            const isOtherSection: TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesIsOtherSection = sectionPrefixes.some((sectionPrefix) => {
              return referencedType.startsWith(sectionPrefix) === true && sectionPrefix !== currentSectionPrefix;
            });

            if (
              isOtherSection === true
              && isSameSection === false
              && isImported === false
            ) {
              const violation: TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesViolation = `Section "${currentSectionPrefix}" references "${referencedType}" from another section. Move shared types to a shared type file (e.g., shared.d.ts).`;

              violations.push(violation);
            }
          }
        }
      }

      const violationMessage: TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesViolation = violations.join('\n');

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
  const files: TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderFiles = await discoverTypeFiles();
  const sectionOrderCurrentDirectory: TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderCurrentDirectory = getPackageRoot();

  for (const file of files) {
    const sectionOrderRelativePath: TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderRelativePath = relative(sectionOrderCurrentDirectory, file);

    it(`sections alphabetical in ${sectionOrderRelativePath}`, async () => {
      const content: TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderContent = await readFile(file, 'utf-8');
      const lines: TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderLines = content.split('\n');
      const sections: TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderSections = extractSections(lines);
      const violations: TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderViolations = [];

      for (let i: TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderSectionIndex = 1; i < sections.length; i += 1) {
        const previous: TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderSection = sections[i - 1] as TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderSection;
        const current: TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderSection = sections[i] as TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderSection;

        if (previous === undefined || current === undefined) {
          continue;
        }

        const compareResult: TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderCompareResult = previous['prefix'].localeCompare(current['prefix']);

        if (compareResult > 0) {
          const violation: TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderViolation = `Section "${current['prefix']}" should come before "${previous['prefix']}"`;

          violations.push(violation);
        }
      }

      const violationMessage: TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderViolation = violations.join('\n');

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
  const files: TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderFiles = await discoverTypeFiles();
  const importOrderCurrentDirectory: TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderCurrentDirectory = getPackageRoot();

  for (const file of files) {
    const importOrderRelativePath: TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderRelativePath = relative(importOrderCurrentDirectory, file);

    it(`import specifiers alphabetical in ${importOrderRelativePath}`, async () => {
      const content: TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderContent = await readFile(file, 'utf-8');
      const lines: TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderLines = content.split('\n');
      const violations: TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderViolations = [];
      const specifierBuffer: TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderSpecifierBuffer = [];
      let inImportBlock: TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderInImportBlock = false;

      for (const line of lines) {
        if (line.startsWith('import type {') === true) {
          inImportBlock = true;
          specifierBuffer.length = 0;

          const inlineMatch: TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderMatch = line.match(new RegExp('^import type \\{ (.+) \\} from'));

          if (inlineMatch !== null && inlineMatch[1] !== undefined) {
            const inlineMatchCapture: TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderInlineMatchCapture = inlineMatch[1];
            const specifiers: TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderSpecifiers = inlineMatchCapture.split(',').map((specifier) => specifier.trim());

            for (let i = 1; i < specifiers.length; i += 1) {
              const previousSpecifier: TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderPreviousSpecifier = specifiers[i - 1];
              const currentSpecifier: TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderCurrentSpecifier = specifiers[i];

              if (
                previousSpecifier !== undefined
                && currentSpecifier !== undefined
                && previousSpecifier.localeCompare(currentSpecifier) > 0
              ) {
                const violation: TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderViolation = `Import specifier "${currentSpecifier}" should come before "${previousSpecifier}"`;

                violations.push(violation);
              }
            }

            inImportBlock = false;
          }

          continue;
        }

        if (inImportBlock === true) {
          const trimmed: TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderTrimmed = line.trim().replace(',', '');

          if (trimmed.startsWith('}') === true) {
            for (let i = 1; i < specifierBuffer.length; i += 1) {
              const previousSpecifier: TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderPreviousSpecifier = specifierBuffer[i - 1];
              const currentSpecifier: TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderCurrentSpecifier = specifierBuffer[i];

              if (
                previousSpecifier !== undefined
                && currentSpecifier !== undefined
                && previousSpecifier.localeCompare(currentSpecifier) > 0
              ) {
                const violation: TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderViolation = `Import specifier "${currentSpecifier}" should come before "${previousSpecifier}"`;

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

      const violationMessage: TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderViolation = violations.join('\n');

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
  const files: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderFiles = await discoverTypeFiles();
  const orderCurrentDirectory: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderCurrentDirectory = getPackageRoot();

  for (const file of files) {
    const orderRelativePath: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderRelativePath = relative(orderCurrentDirectory, file);

    it(`types match source order in ${orderRelativePath}`, async () => {
      if (testConfig['standaloneTypeFiles'].some((pattern) => file.endsWith(pattern)) === true) {
        return;
      }

      let sourcePath: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderSourcePath = deriveSourcePath(file);
      let sourceExists: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderSourceExists = await fileExists(sourcePath);

      if (sourceExists === false) {
        const sourcePathAlternative: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderSourcePathAlternative = sourcePath.replace('.ts', '.tsx');

        sourcePath = sourcePathAlternative;
        sourceExists = await fileExists(sourcePath);

        if (sourceExists === false) {
          strictEqual(sourceExists, true, `Missing source file for ${orderRelativePath}. Expected: ${relative(orderCurrentDirectory, sourcePath)}`);

          return;
        }
      }

      const sourceContent: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderContent = await readFile(sourcePath, 'utf-8');
      const sourceLines: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderLines = sourceContent.split('\n');
      const dtsContent: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderContent = await readFile(file, 'utf-8');
      const dtsLines: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderLines = dtsContent.split('\n');
      const sections: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderSections = extractSections(dtsLines);
      const classPrefix: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderClassPrefix = deriveClassPrefix(file);
      const objectTypes: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderObjectTypes = extractObjectTypes(dtsLines, classPrefix);
      const objectPropertyTypeNames: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderObjectPropertyTypeNames = new Set<string>();

      for (const objectType of objectTypes) {
        for (const property of objectType['properties']) {
          objectPropertyTypeNames.add(property['valueType']);
        }
      }

      const violations: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderViolations = [];

      for (const section of sections) {
        const typeNames: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderTypeNames = extractTypeNames(section['typeLines']);
        const typePositions: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderTypePositions = [];

        for (const typeName of typeNames) {
          // Skip object property types — validated by object property test.
          if (objectPropertyTypeNames.has(typeName) === true) {
            continue;
          }

          const sourceLineIndex: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderSourceLineIndex = findFirstOccurrence(sourceLines, typeName);

          if (sourceLineIndex === -1) {
            continue;
          }

          typePositions.push({
            name: typeName,
            sourceLine: sourceLineIndex,
          });
        }

        const sortedPositions: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderTypePositions = [...typePositions].sort((positionA, positionB) => positionA['sourceLine'] - positionB['sourceLine']);

        for (let j: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderLineIndex = 0; j < typePositions.length; j += 1) {
          const actual: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderTypePosition = typePositions[j] as TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderTypePosition;
          const expected: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderTypePosition = sortedPositions[j] as TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderTypePosition;

          if (actual === undefined || expected === undefined) {
            continue;
          }

          if (actual['name'] !== expected['name']) {
            const violation: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderViolation = `Section "${section['prefix']}": type "${actual['name']}" (source line ${actual['sourceLine'] + 1}) is at .d.ts position ${j + 1}, but should be "${expected['name']}" (source line ${expected['sourceLine'] + 1}).`;

            violations.push(violation);
          }
        }
      }

      const violationMessage: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderViolation = violations.join('\n');

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
  const files: TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesFiles = await discoverTypeFiles();
  const objectPropsCurrentDirectory: TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesCurrentDirectory = getPackageRoot();

  for (const file of files) {
    const objectPropsRelativePath: TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesRelativePath = relative(objectPropsCurrentDirectory, file);

    it(`object properties use named types in ${objectPropsRelativePath}`, async () => {
      const content: TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesContent = await readFile(file, 'utf-8');
      const lines: TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesLines = content.split('\n');
      const classPrefix: TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesClassPrefix = deriveClassPrefix(file);
      const violations: TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesViolations = [];
      const definedTypes: TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesDefinedTypes = new Set<string>();

      for (let i: TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesLineIndex = 0; i < lines.length; i += 1) {
        const line: TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesLine = lines[i] as TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesLine;

        if (line === undefined) {
          continue;
        }

        const typeDefMatch: TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesMatch = line.match(new RegExp('^export type (\\w+)'));

        if (typeDefMatch !== null && typeDefMatch[1] !== undefined) {
          definedTypes.add(typeDefMatch[1]);
        }
      }

      const objectTypes: TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesObjectTypes = extractObjectTypes(lines, classPrefix);

      for (const objectType of objectTypes) {
        for (const property of objectType['properties']) {
          const propertyExpectedPrefix: TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesPropertyExpectedPrefix = objectType['name'];

          if (property['valueType'].startsWith(propertyExpectedPrefix) === false) {
            const violation: TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesViolation = `"${objectType['name']}": property "${property['key']}" must use a named type starting with "${propertyExpectedPrefix}" but found "${property['valueType']}".`;

            violations.push(violation);

            continue;
          }

          if (definedTypes.has(property['valueType']) === false) {
            const violation: TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesViolation = `"${objectType['name']}": property type "${property['valueType']}" is not defined in this file.`;

            violations.push(violation);

            continue;
          }

          if (property['typeLineIndex'] > objectType['lineIndex']) {
            const violation: TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesViolation = `"${objectType['name']}": property type "${property['valueType']}" (line ${property['typeLineIndex'] + 1}) must be defined before the object type (line ${objectType['lineIndex'] + 1}).`;

            violations.push(violation);
          }
        }
      }

      const violationMessage: TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesViolation = violations.join('\n');

      strictEqual(violations.length, 0, violationMessage);

      return;
    });
  }

  return;
});

/**
 * Tests - Type Declarations - Type Declaration Section Coverage.
 *
 * @since 0.15.0
 */
describe('type declaration section coverage', async () => {
  const files: TestsTypeDeclarationsTypeDeclarationSectionCoverageFiles = await discoverTypeFiles();
  const coverageCurrentDirectory: TestsTypeDeclarationsTypeDeclarationSectionCoverageCurrentDirectory = getPackageRoot();

  for (const file of files) {
    const coverageRelativePath: TestsTypeDeclarationsTypeDeclarationSectionCoverageRelativePath = relative(coverageCurrentDirectory, file);

    it(`source sections have matching .d.ts sections in ${coverageRelativePath}`, async () => {
      if (testConfig['standaloneTypeFiles'].some((pattern) => file.endsWith(pattern)) === true) {
        return;
      }

      let sourcePath: TestsTypeDeclarationsTypeDeclarationSectionCoverageSourcePath = deriveSourcePath(file);
      let sourceExists: TestsTypeDeclarationsTypeDeclarationSectionCoverageSourceExists = await fileExists(sourcePath);

      if (sourceExists === false) {
        const sourcePathAlternative: TestsTypeDeclarationsTypeDeclarationSectionCoverageSourcePathAlternative = sourcePath.replace('.ts', '.tsx');

        sourcePath = sourcePathAlternative;
        sourceExists = await fileExists(sourcePath);

        if (sourceExists === false) {
          return;
        }
      }

      const sourceContent: TestsTypeDeclarationsTypeDeclarationSectionCoverageContent = await readFile(sourcePath, 'utf-8');
      const sourceLines: TestsTypeDeclarationsTypeDeclarationSectionCoverageLines = sourceContent.split('\n');
      const dtsContent: TestsTypeDeclarationsTypeDeclarationSectionCoverageContent = await readFile(file, 'utf-8');
      const dtsLines: TestsTypeDeclarationsTypeDeclarationSectionCoverageLines = dtsContent.split('\n');
      const sourceSections: TestsTypeDeclarationsTypeDeclarationSectionCoverageSourceSections = extractSourceSections(sourceLines);
      const dtsSections: TestsTypeDeclarationsTypeDeclarationSectionCoverageSections = extractSections(dtsLines);
      const dtsSectionPrefixes: TestsTypeDeclarationsTypeDeclarationSectionCoverageDtsSectionPrefixes = dtsSections.map((section) => section['prefix']);
      const violations: TestsTypeDeclarationsTypeDeclarationSectionCoverageViolations = [];

      for (const sourceSection of sourceSections) {
        const sourceSectionPrefix: TestsTypeDeclarationsTypeDeclarationSectionCoverageSourceSectionPrefix = sourceSection['prefix'];

        // Skip parent sections (class-level JSDoc with child sections).
        const isParent: TestsTypeDeclarationsTypeDeclarationSectionCoverageIsParent = sourceSections.some((otherSection) => {
          return otherSection['prefix'] !== sourceSectionPrefix && otherSection['prefix'].startsWith(sourceSectionPrefix) === true;
        });

        if (isParent === true) {
          continue;
        }

        if (dtsSectionPrefixes.includes(sourceSectionPrefix) === false) {
          const violation: TestsTypeDeclarationsTypeDeclarationSectionCoverageViolation = `Source has section "${sourceSectionPrefix}" but .d.ts does not.`;

          violations.push(violation);
        }
      }

      const violationMessage: TestsTypeDeclarationsTypeDeclarationSectionCoverageViolation = violations.join('\n');

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
  const patterns: TestsTypeDeclarationsDiscoverTypeFilesPatterns = testConfig['typeRoots'].map(
    (typeRoot) => `${typeRoot}/types/**/*.d.ts`,
  );

  const matched: TestsTypeDeclarationsDiscoverTypeFilesMatched = await glob(patterns, {
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
function deriveClassPrefix(filePath: TestsTypeDeclarationsDeriveClassPrefixFilePath): TestsTypeDeclarationsDeriveClassPrefixReturns {
  const currentDirectory: TestsTypeDeclarationsDeriveClassPrefixCurrentDirectory = getPackageRoot();
  const relativePath: TestsTypeDeclarationsDeriveClassPrefixRelativePath = relative(currentDirectory, filePath);
  let relativeCleaned: TestsTypeDeclarationsDeriveClassPrefixRelativeCleaned = relativePath;

  for (const typeRoot of testConfig['typeRoots']) {
    relativeCleaned = relativeCleaned.replace(`${typeRoot}/types/`, '');
  }

  const segments: TestsTypeDeclarationsDeriveClassPrefixSegments = relativeCleaned
    .replace('.d.ts', '')
    .replace('.test', '')
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
function extractImportedNames(lines: TestsTypeDeclarationsExtractImportedNamesLines): TestsTypeDeclarationsExtractImportedNamesReturns {
  const importedNames: TestsTypeDeclarationsExtractImportedNamesImportedNames = new Set<string>();
  let inImportBlock: TestsTypeDeclarationsExtractImportedNamesInImportBlock = false;

  for (const line of lines) {
    if (line.startsWith('import type') === true) {
      inImportBlock = true;

      const inlineMatch: TestsTypeDeclarationsExtractImportedNamesMatch = line.match(new RegExp('^import type \\{ (.+) \\} from'));

      if (inlineMatch !== null && inlineMatch[1] !== undefined) {
        const inlineMatchCapture: TestsTypeDeclarationsExtractImportedNamesInlineMatchCapture = inlineMatch[1];
        const specifiers: TestsTypeDeclarationsExtractImportedNamesSpecifiers = inlineMatchCapture.split(',').map((specifier) => specifier.trim());

        for (const specifier of specifiers) {
          importedNames.add(specifier);
        }

        inImportBlock = false;
      }

      continue;
    }

    if (inImportBlock === true) {
      const trimmed: TestsTypeDeclarationsExtractImportedNamesTrimmed = line.trim().replace(',', '');

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
function extractSections(lines: TestsTypeDeclarationsExtractSectionsLines): TestsTypeDeclarationsExtractSectionsReturns {
  const sections: TestsTypeDeclarationsExtractSectionsSections = [];
  let currentSection: TestsTypeDeclarationsExtractSectionsCurrentSection = undefined;

  for (let i: TestsTypeDeclarationsExtractSectionsLineIndex = 0; i < lines.length; i += 1) {
    const line: TestsTypeDeclarationsExtractSectionsLine = lines[i] as TestsTypeDeclarationsExtractSectionsLine;

    if (line === undefined) {
      continue;
    }

    const sectionComment: TestsTypeDeclarationsExtractSectionsSectionComment = line.match(new RegExp('^ \\* (.+)\\.$'));

    if (
      sectionComment !== null
      && sectionComment[1] !== undefined
      && line.includes('@') === false
    ) {
      const rawPrefix: TestsTypeDeclarationsExtractSectionsRawPrefix = sectionComment[1];
      const segments: TestsTypeDeclarationsExtractSectionsSegments = rawPrefix.split(' - ');
      const methodName: TestsTypeDeclarationsExtractSectionsMethodName = segments.map((segment) => {
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
function extractReferencedTypes(line: TestsTypeDeclarationsExtractReferencedTypesLine, classPrefix: TestsTypeDeclarationsExtractReferencedTypesClassPrefix): TestsTypeDeclarationsExtractReferencedTypesReturns {
  const match: TestsTypeDeclarationsExtractReferencedTypesMatch = line.match(new RegExp('^export type (\\w+)'));

  if (match === null || match[1] === undefined) {
    return [];
  }

  const typeName: TestsTypeDeclarationsExtractReferencedTypesTypeName = match[1];
  const rightSide: TestsTypeDeclarationsExtractReferencedTypesRightSide = line.slice(line.indexOf('=') + 1);
  const referencedTypes: TestsTypeDeclarationsExtractReferencedTypesReferencedTypes = [];
  const typePattern: TestsTypeDeclarationsExtractReferencedTypesTypePattern = new RegExp(`${classPrefix}\\w+`, 'g');
  let typeMatch: TestsTypeDeclarationsExtractReferencedTypesTypeMatch = typePattern.exec(rightSide);

  while (typeMatch !== null) {
    const referencedType: TestsTypeDeclarationsExtractReferencedTypesReferencedType = typeMatch[0];

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
function deriveSourcePath(dtsPath: TestsTypeDeclarationsDeriveSourcePathDtsPath): TestsTypeDeclarationsDeriveSourcePathReturns {
  return dtsPath.replace('/types/', '/').replace('.d.ts', '.ts');
}

/**
 * Tests - Type Declarations - File Exists.
 *
 * @since 0.15.0
 */
async function fileExists(filePath: TestsTypeDeclarationsFileExistsFilePath): TestsTypeDeclarationsFileExistsReturns {
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
function getPackageRoot(): TestsTypeDeclarationsGetPackageRootReturns {
  const currentFilePath: TestsTypeDeclarationsGetPackageRootCurrentFilePath = fileURLToPath(import.meta.url);
  const currentFileDirectory: TestsTypeDeclarationsGetPackageRootCurrentFileDirectory = dirname(currentFilePath);

  return resolve(currentFileDirectory, '..', '..');
}

/**
 * Tests - Type Declarations - Extract Type Names.
 *
 * @since 0.15.0
 */
function extractTypeNames(typeLines: TestsTypeDeclarationsExtractTypeNamesTypeLines): TestsTypeDeclarationsExtractTypeNamesReturns {
  const typeNames: TestsTypeDeclarationsExtractTypeNamesTypeNames = [];

  for (const line of typeLines) {
    const match: TestsTypeDeclarationsExtractTypeNamesMatch = line.match(new RegExp('^export type (\\w+)'));

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
function findFirstOccurrence(sourceLines: TestsTypeDeclarationsFindFirstOccurrenceSourceLines, typeName: TestsTypeDeclarationsFindFirstOccurrenceTypeName): TestsTypeDeclarationsFindFirstOccurrenceReturns {
  let inImportBlock: TestsTypeDeclarationsFindFirstOccurrenceInImportBlock = false;

  for (let i: TestsTypeDeclarationsFindFirstOccurrenceLineIndex = 0; i < sourceLines.length; i += 1) {
    const line: TestsTypeDeclarationsFindFirstOccurrenceLine = sourceLines[i] as TestsTypeDeclarationsFindFirstOccurrenceLine;

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

    const typeNamePattern: TestsTypeDeclarationsFindFirstOccurrenceTypeNamePattern = new RegExp(`\\b${typeName}\\b`);

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
function extractObjectTypes(lines: TestsTypeDeclarationsExtractObjectTypesLines, classPrefix: TestsTypeDeclarationsExtractObjectTypesClassPrefix): TestsTypeDeclarationsExtractObjectTypesReturns {
  const objectTypes: TestsTypeDeclarationsExtractObjectTypesObjectTypes = [];
  const typeLineMap: TestsTypeDeclarationsExtractObjectTypesTypeLineMap = new Map<string, number>();

  for (let i: TestsTypeDeclarationsExtractObjectTypesLineIndex = 0; i < lines.length; i += 1) {
    const line: TestsTypeDeclarationsExtractObjectTypesLine = lines[i] as TestsTypeDeclarationsExtractObjectTypesLine;

    if (line === undefined) {
      continue;
    }

    const typeDefMatch: TestsTypeDeclarationsExtractObjectTypesMatch = line.match(new RegExp(`^export type (${classPrefix}\\w+)`));

    if (typeDefMatch !== null && typeDefMatch[1] !== undefined) {
      typeLineMap.set(typeDefMatch[1], i);
    }
  }

  for (let i: TestsTypeDeclarationsExtractObjectTypesLineIndex = 0; i < lines.length; i += 1) {
    const line: TestsTypeDeclarationsExtractObjectTypesLine = lines[i] as TestsTypeDeclarationsExtractObjectTypesLine;

    if (line === undefined) {
      continue;
    }

    const objectMatch: TestsTypeDeclarationsExtractObjectTypesMatch = line.match(new RegExp(`^export type (${classPrefix}\\w+) = (?:Readonly<)?\\{$`));

    if (objectMatch === null || objectMatch[1] === undefined) {
      continue;
    }

    const properties: TestsTypeDeclarationsExtractObjectTypesObjectTypeProperties = [];

    for (let j: TestsTypeDeclarationsExtractObjectTypesLineIndex = i + 1; j < lines.length; j += 1) {
      const propertyLine: TestsTypeDeclarationsExtractObjectTypesLine = lines[j] as TestsTypeDeclarationsExtractObjectTypesLine;

      if (propertyLine === undefined) {
        continue;
      }

      const trimmedProperty: TestsTypeDeclarationsExtractObjectTypesTrimmed = propertyLine.trim();

      if (
        trimmedProperty === '}>'
        || trimmedProperty === '};'
        || trimmedProperty === '}>;'
      ) {
        break;
      }

      const propertyMatch: TestsTypeDeclarationsExtractObjectTypesMatch = trimmedProperty.match(new RegExp('^(\\w+):\\s+(.+);$'));

      if (
        propertyMatch !== null
        && propertyMatch[1] !== undefined
        && propertyMatch[2] !== undefined
      ) {
        const propertyKey: TestsTypeDeclarationsExtractObjectTypesPropertyKey = propertyMatch[1];
        const propertyValueType: TestsTypeDeclarationsExtractObjectTypesPropertyValueType = propertyMatch[2];
        const typeLineIndex: TestsTypeDeclarationsExtractObjectTypesLineIndex = typeLineMap.get(propertyValueType) ?? -1;

        properties.push({
          key: propertyKey,
          valueType: propertyValueType,
          typeLineIndex,
        });
      }
    }

    const objectName: TestsTypeDeclarationsExtractObjectTypesTypeName = objectMatch[1];

    objectTypes.push({
      name: objectName,
      lineIndex: i,
      properties,
    });
  }

  return objectTypes;
}

/**
 * Tests - Type Declarations - Extract Source Sections.
 *
 * @since 0.15.0
 */
function extractSourceSections(lines: TestsTypeDeclarationsExtractSourceSectionsLines): TestsTypeDeclarationsExtractSourceSectionsReturns {
  const sections: TestsTypeDeclarationsExtractSourceSectionsSections = [];
  let nextIsSummary: TestsTypeDeclarationsExtractSourceSectionsNextIsSummary = false;

  for (const line of lines) {
    if (line.trim() === '/**') {
      nextIsSummary = true;

      continue;
    }

    if (nextIsSummary === true) {
      nextIsSummary = false;

      const sectionComment: TestsTypeDeclarationsExtractSourceSectionsSectionComment = line.match(new RegExp('^\\s*\\* (.+)\\.$'));

      if (
        sectionComment !== null
        && sectionComment[1] !== undefined
        && line.includes('@') === false
        && sectionComment[1].includes(' - ') === true
      ) {
        const rawPrefix: TestsTypeDeclarationsExtractSourceSectionsRawPrefix = sectionComment[1];
        const segments: TestsTypeDeclarationsExtractSourceSectionsSegments = rawPrefix.split(' - ');
        const methodName: TestsTypeDeclarationsExtractSourceSectionsMethodName = segments.map((segment) => {
          return segment.split(new RegExp('[\\s.]+', 'g')).map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          }).join('');
        }).join('');

        sections.push({
          prefix: methodName,
          typeLines: [],
        });
      }
    }
  }

  return sections;
}

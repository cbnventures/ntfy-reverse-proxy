/**
 * Tests - Type Declarations - Derive Class Prefix.
 *
 * @since 0.15.0
 */
export type TestsTypeDeclarationsDeriveClassPrefixFilePath = string;

export type TestsTypeDeclarationsDeriveClassPrefixReturns = string;

export type TestsTypeDeclarationsDeriveClassPrefixCurrentDirectory = string;

export type TestsTypeDeclarationsDeriveClassPrefixRelativePath = string;

export type TestsTypeDeclarationsDeriveClassPrefixRelativeCleaned = string;

export type TestsTypeDeclarationsDeriveClassPrefixSegments = string[];

/**
 * Tests - Type Declarations - Derive Source Path.
 *
 * @since 0.15.0
 */
export type TestsTypeDeclarationsDeriveSourcePathDtsPath = string;

export type TestsTypeDeclarationsDeriveSourcePathReturns = string;

/**
 * Tests - Type Declarations - Discover Type Files.
 *
 * @since 0.15.0
 */
export type TestsTypeDeclarationsDiscoverTypeFilesReturns = Promise<string[]>;

export type TestsTypeDeclarationsDiscoverTypeFilesPatterns = string[];

export type TestsTypeDeclarationsDiscoverTypeFilesMatched = string[];

/**
 * Tests - Type Declarations - Extract Imported Names.
 *
 * @since 0.15.0
 */
export type TestsTypeDeclarationsExtractImportedNamesLines = string[];

export type TestsTypeDeclarationsExtractImportedNamesReturns = Set<string>;

export type TestsTypeDeclarationsExtractImportedNamesImportedNames = Set<string>;

export type TestsTypeDeclarationsExtractImportedNamesInImportBlock = boolean;

export type TestsTypeDeclarationsExtractImportedNamesMatch = RegExpMatchArray | null;

export type TestsTypeDeclarationsExtractImportedNamesInlineMatchCapture = string;

export type TestsTypeDeclarationsExtractImportedNamesSpecifiers = string[];

export type TestsTypeDeclarationsExtractImportedNamesTrimmed = string;

/**
 * Tests - Type Declarations - Extract Object Types.
 *
 * @since 0.15.0
 */
export type TestsTypeDeclarationsExtractObjectTypesLines = string[];

export type TestsTypeDeclarationsExtractObjectTypesClassPrefix = string;

export type TestsTypeDeclarationsExtractObjectTypesObjectPropertyKey = string;

export type TestsTypeDeclarationsExtractObjectTypesObjectPropertyValueType = string;

export type TestsTypeDeclarationsExtractObjectTypesObjectPropertyLineIndex = number;

export type TestsTypeDeclarationsExtractObjectTypesObjectProperty = {
  key: TestsTypeDeclarationsExtractObjectTypesObjectPropertyKey;
  valueType: TestsTypeDeclarationsExtractObjectTypesObjectPropertyValueType;
  typeLineIndex: TestsTypeDeclarationsExtractObjectTypesObjectPropertyLineIndex;
};

export type TestsTypeDeclarationsExtractObjectTypesObjectTypeProperties = TestsTypeDeclarationsExtractObjectTypesObjectProperty[];

export type TestsTypeDeclarationsExtractObjectTypesObjectTypeName = string;

export type TestsTypeDeclarationsExtractObjectTypesObjectTypeLineIndex = number;

export type TestsTypeDeclarationsExtractObjectTypesObjectType = {
  name: TestsTypeDeclarationsExtractObjectTypesObjectTypeName;
  lineIndex: TestsTypeDeclarationsExtractObjectTypesObjectTypeLineIndex;
  properties: TestsTypeDeclarationsExtractObjectTypesObjectTypeProperties;
};

export type TestsTypeDeclarationsExtractObjectTypesReturns = TestsTypeDeclarationsExtractObjectTypesObjectType[];

export type TestsTypeDeclarationsExtractObjectTypesObjectTypes = TestsTypeDeclarationsExtractObjectTypesObjectType[];

export type TestsTypeDeclarationsExtractObjectTypesTypeLineMap = Map<string, number>;

export type TestsTypeDeclarationsExtractObjectTypesLineIndex = number;

export type TestsTypeDeclarationsExtractObjectTypesLine = string;

export type TestsTypeDeclarationsExtractObjectTypesMatch = RegExpMatchArray | null;

export type TestsTypeDeclarationsExtractObjectTypesTrimmed = string;

export type TestsTypeDeclarationsExtractObjectTypesPropertyKey = string;

export type TestsTypeDeclarationsExtractObjectTypesPropertyValueType = string;

export type TestsTypeDeclarationsExtractObjectTypesTypeName = string;

/**
 * Tests - Type Declarations - Extract Referenced Types.
 *
 * @since 0.15.0
 */
export type TestsTypeDeclarationsExtractReferencedTypesLine = string;

export type TestsTypeDeclarationsExtractReferencedTypesClassPrefix = string;

export type TestsTypeDeclarationsExtractReferencedTypesReturns = string[];

export type TestsTypeDeclarationsExtractReferencedTypesMatch = RegExpMatchArray | null;

export type TestsTypeDeclarationsExtractReferencedTypesTypeName = string;

export type TestsTypeDeclarationsExtractReferencedTypesRightSide = string;

export type TestsTypeDeclarationsExtractReferencedTypesReferencedTypes = string[];

export type TestsTypeDeclarationsExtractReferencedTypesTypePattern = RegExp;

export type TestsTypeDeclarationsExtractReferencedTypesTypeMatch = RegExpExecArray | null;

export type TestsTypeDeclarationsExtractReferencedTypesReferencedType = string;

/**
 * Tests - Type Declarations - Extract Sections.
 *
 * @since 0.15.0
 */
export type TestsTypeDeclarationsExtractSectionsLines = string[];

export type TestsTypeDeclarationsExtractSectionsSectionPrefix = string;

export type TestsTypeDeclarationsExtractSectionsSectionTypeLines = string[];

export type TestsTypeDeclarationsExtractSectionsSection = {
  prefix: TestsTypeDeclarationsExtractSectionsSectionPrefix;
  typeLines: TestsTypeDeclarationsExtractSectionsSectionTypeLines;
};

export type TestsTypeDeclarationsExtractSectionsReturns = TestsTypeDeclarationsExtractSectionsSection[];

export type TestsTypeDeclarationsExtractSectionsSections = TestsTypeDeclarationsExtractSectionsSection[];

export type TestsTypeDeclarationsExtractSectionsCurrentSection = TestsTypeDeclarationsExtractSectionsSection | undefined;

export type TestsTypeDeclarationsExtractSectionsLineIndex = number;

export type TestsTypeDeclarationsExtractSectionsLine = string;

export type TestsTypeDeclarationsExtractSectionsSectionComment = RegExpMatchArray | null;

export type TestsTypeDeclarationsExtractSectionsRawPrefix = string;

export type TestsTypeDeclarationsExtractSectionsSegments = string[];

export type TestsTypeDeclarationsExtractSectionsMethodName = string;

/**
 * Tests - Type Declarations - Extract Source Sections.
 *
 * @since 0.15.0
 */
export type TestsTypeDeclarationsExtractSourceSectionsLines = string[];

export type TestsTypeDeclarationsExtractSourceSectionsSectionPrefix = string;

export type TestsTypeDeclarationsExtractSourceSectionsSectionTypeLines = string[];

export type TestsTypeDeclarationsExtractSourceSectionsSection = {
  prefix: TestsTypeDeclarationsExtractSourceSectionsSectionPrefix;
  typeLines: TestsTypeDeclarationsExtractSourceSectionsSectionTypeLines;
};

export type TestsTypeDeclarationsExtractSourceSectionsReturns = TestsTypeDeclarationsExtractSourceSectionsSection[];

export type TestsTypeDeclarationsExtractSourceSectionsSections = TestsTypeDeclarationsExtractSourceSectionsSection[];

export type TestsTypeDeclarationsExtractSourceSectionsNextIsSummary = boolean;

export type TestsTypeDeclarationsExtractSourceSectionsSectionComment = RegExpMatchArray | null;

export type TestsTypeDeclarationsExtractSourceSectionsRawPrefix = string;

export type TestsTypeDeclarationsExtractSourceSectionsSegments = string[];

export type TestsTypeDeclarationsExtractSourceSectionsMethodName = string;

/**
 * Tests - Type Declarations - Extract Type Names.
 *
 * @since 0.15.0
 */
export type TestsTypeDeclarationsExtractTypeNamesTypeLines = string[];

export type TestsTypeDeclarationsExtractTypeNamesReturns = string[];

export type TestsTypeDeclarationsExtractTypeNamesTypeNames = string[];

export type TestsTypeDeclarationsExtractTypeNamesMatch = RegExpMatchArray | null;

/**
 * Tests - Type Declarations - File Exists.
 *
 * @since 0.15.0
 */
export type TestsTypeDeclarationsFileExistsFilePath = string;

export type TestsTypeDeclarationsFileExistsReturns = Promise<boolean>;

/**
 * Tests - Type Declarations - Find First Occurrence.
 *
 * @since 0.15.0
 */
export type TestsTypeDeclarationsFindFirstOccurrenceSourceLines = string[];

export type TestsTypeDeclarationsFindFirstOccurrenceTypeName = string;

export type TestsTypeDeclarationsFindFirstOccurrenceReturns = number;

export type TestsTypeDeclarationsFindFirstOccurrenceInImportBlock = boolean;

export type TestsTypeDeclarationsFindFirstOccurrenceLineIndex = number;

export type TestsTypeDeclarationsFindFirstOccurrenceLine = string;

export type TestsTypeDeclarationsFindFirstOccurrenceTypeNamePattern = RegExp;

/**
 * Tests - Type Declarations - Get Package Root.
 *
 * @since 0.15.0
 */
export type TestsTypeDeclarationsGetPackageRootReturns = string;

export type TestsTypeDeclarationsGetPackageRootCurrentFilePath = string;

export type TestsTypeDeclarationsGetPackageRootCurrentFileDirectory = string;

/**
 * Tests - Type Declarations - Test Config.
 *
 * @since 0.15.0
 */
export type TestsTypeDeclarationsTestConfigStandaloneTypeFiles = string[];

export type TestsTypeDeclarationsTestConfigTypeRoots = string[];

export type TestsTypeDeclarationsTestConfig = {
  standaloneTypeFiles: TestsTypeDeclarationsTestConfigStandaloneTypeFiles;
  typeRoots: TestsTypeDeclarationsTestConfigTypeRoots;
};

/**
 * Tests - Type Declarations - Type Declaration Cross-section References.
 *
 * @since 0.15.0
 */
export type TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesFiles = string[];

export type TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesCurrentDirectory = string;

export type TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesRelativePath = string;

export type TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesContent = string;

export type TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesLines = string[];

export type TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesClassPrefix = string;

export type TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesImportedNames = Set<string>;

export type TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesSectionPrefix = string;

export type TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesSectionTypeLines = string[];

export type TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesSection = {
  prefix: TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesSectionPrefix;
  typeLines: TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesSectionTypeLines;
};

export type TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesSections = TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesSection[];

export type TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesSectionPrefixes = string[];

export type TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesViolations = string[];

export type TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesCurrentSectionPrefix = string;

export type TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesReferencedTypes = string[];

export type TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesIsSameSection = boolean;

export type TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesIsImported = boolean;

export type TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesIsOtherSection = boolean;

export type TestsTypeDeclarationsTypeDeclarationCrossSectionReferencesViolation = string;

/**
 * Tests - Type Declarations - Type Declaration First-come-first-serve Order.
 *
 * @since 0.15.0
 */
export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderFiles = string[];

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderCurrentDirectory = string;

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderRelativePath = string;

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderSourcePath = string;

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderSourceExists = boolean;

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderSourcePathAlternative = string;

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderContent = string;

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderLines = string[];

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderSectionPrefix = string;

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderSectionTypeLines = string[];

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderSection = {
  prefix: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderSectionPrefix;
  typeLines: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderSectionTypeLines;
};

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderSections = TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderSection[];

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderClassPrefix = string;

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderObjectPropertyKey = string;

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderObjectPropertyValueType = string;

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderObjectPropertyLineIndex = number;

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderObjectProperty = {
  key: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderObjectPropertyKey;
  valueType: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderObjectPropertyValueType;
  typeLineIndex: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderObjectPropertyLineIndex;
};

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderObjectTypeProperties = TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderObjectProperty[];

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderObjectTypeName = string;

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderObjectTypeLineIndex = number;

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderObjectType = {
  name: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderObjectTypeName;
  lineIndex: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderObjectTypeLineIndex;
  properties: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderObjectTypeProperties;
};

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderObjectTypes = TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderObjectType[];

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderObjectPropertyTypeNames = Set<string>;

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderViolations = string[];

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderTypeNames = string[];

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderTypePositions = TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderTypePosition[];

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderSourceLineIndex = number;

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderLineIndex = number;

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderTypePositionName = string;

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderTypePositionSourceLine = number;

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderTypePosition = {
  name: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderTypePositionName;
  sourceLine: TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderTypePositionSourceLine;
};

export type TestsTypeDeclarationsTypeDeclarationFirstComeFirstServeOrderViolation = string;

/**
 * Tests - Type Declarations - Type Declaration Import Specifier Order.
 *
 * @since 0.15.0
 */
export type TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderFiles = string[];

export type TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderCurrentDirectory = string;

export type TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderRelativePath = string;

export type TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderContent = string;

export type TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderLines = string[];

export type TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderViolations = string[];

export type TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderSpecifierBuffer = string[];

export type TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderInImportBlock = boolean;

export type TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderMatch = RegExpMatchArray | null;

export type TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderInlineMatchCapture = string;

export type TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderSpecifiers = string[];

export type TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderPreviousSpecifier = string | undefined;

export type TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderCurrentSpecifier = string | undefined;

export type TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderViolation = string;

export type TestsTypeDeclarationsTypeDeclarationImportSpecifierOrderTrimmed = string;

/**
 * Tests - Type Declarations - Type Declaration Object Property Types.
 *
 * @since 0.15.0
 */
export type TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesFiles = string[];

export type TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesCurrentDirectory = string;

export type TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesRelativePath = string;

export type TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesContent = string;

export type TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesLines = string[];

export type TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesClassPrefix = string;

export type TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesViolations = string[];

export type TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesDefinedTypes = Set<string>;

export type TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesLineIndex = number;

export type TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesLine = string;

export type TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesMatch = RegExpMatchArray | null;

export type TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesObjectPropertyKey = string;

export type TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesObjectPropertyValueType = string;

export type TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesObjectPropertyLineIndex = number;

export type TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesObjectProperty = {
  key: TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesObjectPropertyKey;
  valueType: TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesObjectPropertyValueType;
  typeLineIndex: TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesObjectPropertyLineIndex;
};

export type TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesObjectTypeProperties = TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesObjectProperty[];

export type TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesObjectTypeName = string;

export type TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesObjectTypeLineIndex = number;

export type TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesObjectType = {
  name: TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesObjectTypeName;
  lineIndex: TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesObjectTypeLineIndex;
  properties: TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesObjectTypeProperties;
};

export type TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesObjectTypes = TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesObjectType[];

export type TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesPropertyExpectedPrefix = string;

export type TestsTypeDeclarationsTypeDeclarationObjectPropertyTypesViolation = string;

/**
 * Tests - Type Declarations - Type Declaration Section Alphabetical Order.
 *
 * @since 0.15.0
 */
export type TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderFiles = string[];

export type TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderCurrentDirectory = string;

export type TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderRelativePath = string;

export type TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderContent = string;

export type TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderLines = string[];

export type TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderSections = TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderSection[];

export type TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderViolations = string[];

export type TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderSectionIndex = number;

export type TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderSectionPrefix = string;

export type TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderSectionTypeLines = string[];

export type TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderSection = {
  prefix: TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderSectionPrefix;
  typeLines: TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderSectionTypeLines;
};

export type TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderCompareResult = number;

export type TestsTypeDeclarationsTypeDeclarationSectionAlphabeticalOrderViolation = string;

/**
 * Tests - Type Declarations - Type Declaration Section Coverage.
 *
 * @since 0.15.0
 */
export type TestsTypeDeclarationsTypeDeclarationSectionCoverageFiles = string[];

export type TestsTypeDeclarationsTypeDeclarationSectionCoverageCurrentDirectory = string;

export type TestsTypeDeclarationsTypeDeclarationSectionCoverageRelativePath = string;

export type TestsTypeDeclarationsTypeDeclarationSectionCoverageSourcePath = string;

export type TestsTypeDeclarationsTypeDeclarationSectionCoverageSourceExists = boolean;

export type TestsTypeDeclarationsTypeDeclarationSectionCoverageSourcePathAlternative = string;

export type TestsTypeDeclarationsTypeDeclarationSectionCoverageContent = string;

export type TestsTypeDeclarationsTypeDeclarationSectionCoverageLines = string[];

export type TestsTypeDeclarationsTypeDeclarationSectionCoverageSectionPrefix = string;

export type TestsTypeDeclarationsTypeDeclarationSectionCoverageSectionTypeLines = string[];

export type TestsTypeDeclarationsTypeDeclarationSectionCoverageSection = {
  prefix: TestsTypeDeclarationsTypeDeclarationSectionCoverageSectionPrefix;
  typeLines: TestsTypeDeclarationsTypeDeclarationSectionCoverageSectionTypeLines;
};

export type TestsTypeDeclarationsTypeDeclarationSectionCoverageSourceSections = TestsTypeDeclarationsTypeDeclarationSectionCoverageSection[];

export type TestsTypeDeclarationsTypeDeclarationSectionCoverageSections = TestsTypeDeclarationsTypeDeclarationSectionCoverageSection[];

export type TestsTypeDeclarationsTypeDeclarationSectionCoverageDtsSectionPrefixes = string[];

export type TestsTypeDeclarationsTypeDeclarationSectionCoverageViolations = string[];

export type TestsTypeDeclarationsTypeDeclarationSectionCoverageSourceSectionPrefix = string;

export type TestsTypeDeclarationsTypeDeclarationSectionCoverageIsParent = boolean;

export type TestsTypeDeclarationsTypeDeclarationSectionCoverageViolation = string;

/**
 * Tests - Type Declarations.
 *
 * @since 0.15.0
 */
export type TestsTypeDeclarationsTestConfigStandaloneTypeFiles = string[];

export type TestsTypeDeclarationsTestConfigTypeRoots = string[];

export type TestsTypeDeclarationsTestConfig = {
  standaloneTypeFiles: TestsTypeDeclarationsTestConfigStandaloneTypeFiles;
  typeRoots: TestsTypeDeclarationsTestConfigTypeRoots;
};

export type TestsTypeDeclarationsFiles = string[];

export type TestsTypeDeclarationsCurrentDirectory = string;

export type TestsTypeDeclarationsRelativePath = string;

export type TestsTypeDeclarationsContent = string;

export type TestsTypeDeclarationsLines = string[];

export type TestsTypeDeclarationsClassPrefix = string;

export type TestsTypeDeclarationsImportedNames = Set<string>;

export type TestsTypeDeclarationsSections = TestsTypeDeclarationsSection[];

export type TestsTypeDeclarationsSectionPrefixes = string[];

export type TestsTypeDeclarationsViolations = string[];

export type TestsTypeDeclarationsCurrentSectionPrefix = string;

export type TestsTypeDeclarationsReferencedTypes = string[];

export type TestsTypeDeclarationsIsSameSection = boolean;

export type TestsTypeDeclarationsIsImported = boolean;

export type TestsTypeDeclarationsIsOtherSection = boolean;

export type TestsTypeDeclarationsViolation = string;

export type TestsTypeDeclarationsSectionIndex = number;

export type TestsTypeDeclarationsSectionPrefix = string;

export type TestsTypeDeclarationsSection = {
  prefix: TestsTypeDeclarationsSectionPrefix;
  typeLines: TestsTypeDeclarationsSectionTypeLines;
};

export type TestsTypeDeclarationsCompareResult = number;

export type TestsTypeDeclarationsSpecifierBuffer = string[];

export type TestsTypeDeclarationsInImportBlock = boolean;

export type TestsTypeDeclarationsMatch = RegExpMatchArray | null;

export type TestsTypeDeclarationsInlineMatchCapture = string;

export type TestsTypeDeclarationsSpecifiers = string[];

export type TestsTypeDeclarationsPreviousSpecifier = string | undefined;

export type TestsTypeDeclarationsCurrentSpecifier = string | undefined;

export type TestsTypeDeclarationsTrimmed = string;

export type TestsTypeDeclarationsSourcePath = string;

export type TestsTypeDeclarationsSourceExists = boolean;

export type TestsTypeDeclarationsSourcePathAlternative = string;

export type TestsTypeDeclarationsTypeNames = string[];

export type TestsTypeDeclarationsTypePositionName = string;

export type TestsTypeDeclarationsTypePositionSourceLine = number;

export type TestsTypeDeclarationsTypePositions = TestsTypeDeclarationsTypePosition[];

export type TestsTypeDeclarationsSourceLineIndex = number;

export type TestsTypeDeclarationsLineIndex = number;

export type TestsTypeDeclarationsTypePosition = {
  name: TestsTypeDeclarationsTypePositionName;
  sourceLine: TestsTypeDeclarationsTypePositionSourceLine;
};

export type TestsTypeDeclarationsDefinedTypes = Set<string>;

export type TestsTypeDeclarationsLine = string;

export type TestsTypeDeclarationsObjectTypeName = string;

export type TestsTypeDeclarationsObjectTypeLineIndex = number;

export type TestsTypeDeclarationsObjectPropertyLineIndex = number;

export type TestsTypeDeclarationsObjectProperty = {
  key: TestsTypeDeclarationsPropertyKey;
  valueType: TestsTypeDeclarationsPropertyValueType;
  typeLineIndex: TestsTypeDeclarationsObjectPropertyLineIndex;
};

export type TestsTypeDeclarationsObjectType = {
  name: TestsTypeDeclarationsObjectTypeName;
  lineIndex: TestsTypeDeclarationsObjectTypeLineIndex;
  properties: TestsTypeDeclarationsObjectProperties;
};

export type TestsTypeDeclarationsObjectTypes = TestsTypeDeclarationsObjectType[];

export type TestsTypeDeclarationsPropertyExpectedPrefix = string;

export type TestsTypeDeclarationsDiscoverTypeFilesReturns = Promise<TestsTypeDeclarationsFiles>;

export type TestsTypeDeclarationsPatterns = string[];

export type TestsTypeDeclarationsMatched = string[];

export type TestsTypeDeclarationsRelativeCleaned = string;

export type TestsTypeDeclarationsSegments = string[];

export type TestsTypeDeclarationsCurrentSection = TestsTypeDeclarationsSection | undefined;

export type TestsTypeDeclarationsSectionComment = RegExpMatchArray | null;

export type TestsTypeDeclarationsRawPrefix = string;

export type TestsTypeDeclarationsMethodName = string;

export type TestsTypeDeclarationsTypeName = string;

export type TestsTypeDeclarationsRightSide = string;

export type TestsTypeDeclarationsTypePattern = RegExp;

export type TestsTypeDeclarationsTypeMatch = RegExpExecArray | null;

export type TestsTypeDeclarationsReferencedType = string;

export type TestsTypeDeclarationsFileExistsReturns = Promise<boolean>;

export type TestsTypeDeclarationsPackageRoot = string;

export type TestsTypeDeclarationsCurrentFilePath = string;

export type TestsTypeDeclarationsCurrentFileDirectory = string;

export type TestsTypeDeclarationsSectionTypeLines = string[];

export type TestsTypeDeclarationsTypeNamePattern = RegExp;

export type TestsTypeDeclarationsTypeLineMap = Map<string, number>;

export type TestsTypeDeclarationsObjectProperties = TestsTypeDeclarationsObjectProperty[];

export type TestsTypeDeclarationsPropertyKey = string;

export type TestsTypeDeclarationsPropertyValueType = string;

export type TestsTypeDeclarationsExpectedPrefix = string;

export type TestsTypeDeclarationsObjectPropertyName = string;

import type {
  CreateNtfyHeadersContentType,
  CreateNtfyHeadersFetchStage,
  CreateNtfyHeadersHeaders,
  CreateNtfyHeadersReturns,
  CreateNtfyHeadersShowVisitorInfo,
  FetchRequestBodyRequest,
  FetchRequestBodyReturns,
  FetchRequestHeaderName,
  FetchRequestHeaderRequest,
  FetchRequestHeaderReturns,
  IsInputValidInput,
  IsInputValidList,
  IsInputValidMode,
  IsInputValidReturns,
  PrettyPrintData,
  PrettyPrintReturns,
} from '@/types/index.d.ts';

/**
 * Create ntfy headers.
 *
 * @param {CreateNtfyHeadersFetchStage}      fetchStage      - Fetch stage.
 * @param {CreateNtfyHeadersContentType}     contentType     - Content type.
 * @param {CreateNtfyHeadersHeaders}         headers         - Headers.
 * @param {CreateNtfyHeadersShowVisitorInfo} showVisitorInfo - Show visitor info.
 *
 * @returns {CreateNtfyHeadersReturns}
 *
 * @since 1.0.0
 */
export function createNtfyHeaders(fetchStage: CreateNtfyHeadersFetchStage, contentType: CreateNtfyHeadersContentType, headers: CreateNtfyHeadersHeaders, showVisitorInfo: CreateNtfyHeadersShowVisitorInfo): CreateNtfyHeadersReturns {
  const headerXActions = headers.get('x-actions');
  const headerXAttach = headers.get('x-attach');
  const headerXCache = headers.get('x-cache');
  const headerXCall = headers.get('x-call');
  const headerXClick = headers.get('x-click');
  const headerXDelay = headers.get('x-delay');
  const headerXEmail = headers.get('x-email');
  const headerXFilename = headers.get('x-filename');
  const headerXFirebase = headers.get('x-firebase');
  const headerXIcon = headers.get('x-icon');
  const headerXMarkdown = headers.get('x-markdown');
  const headerXPriority = headers.get('x-priority');
  const headerXTags = headers.get('x-tags');
  const headerXTitle = headers.get('x-title');
  const headerXUnifiedPush = headers.get('x-unifiedpush');

  return {
    ...((fetchStage === 1 || (fetchStage === 2 && !showVisitorInfo)) && headerXActions !== null) ? {
      'X-Actions': headerXActions,
    } : {},
    ...((fetchStage === 1 || (fetchStage === 2 && !showVisitorInfo)) && headerXAttach !== null) ? {
      // If "showVisitorInfo" is "false", user cannot include "X-Attach" header and binary file in one request – user error, not a bug.
      'X-Attach': headerXAttach,
    } : {},
    ...(headerXCache !== null) ? {
      'X-Cache': headerXCache,
    } : {},
    ...((fetchStage === 1 || (fetchStage === 2 && !showVisitorInfo)) && headerXCall !== null) ? {
      'X-Call': headerXCall,
    } : {},
    ...((fetchStage === 1 || (fetchStage === 2 && !showVisitorInfo)) && headerXClick !== null) ? {
      'X-Click': headerXClick,
    } : {},
    ...(headerXDelay !== null) ? {
      'X-Delay': headerXDelay,
    } : {},
    ...(headerXEmail !== null) ? {
      'X-Email': headerXEmail,
    } : {},
    ...(((fetchStage === 1 && contentType !== 'binary') || fetchStage === 2) && headerXFilename !== null) ? {
      'X-Filename': headerXFilename,
    } : {},
    ...(headerXFirebase !== null) ? {
      'X-Firebase': headerXFirebase,
    } : {},
    ...((fetchStage === 1 || (fetchStage === 2 && !showVisitorInfo)) && headerXIcon !== null) ? {
      'X-Icon': headerXIcon,
    } : {},
    ...((fetchStage === 1 || (fetchStage === 2 && !showVisitorInfo)) && headerXMarkdown !== null) ? {
      'X-Markdown': headerXMarkdown,
    } : {},
    ...((fetchStage === 1 || (fetchStage === 2 && !showVisitorInfo)) && headerXPriority !== null) ? {
      'X-Priority': headerXPriority,
    } : {},
    ...((fetchStage === 1 || (fetchStage === 2 && !showVisitorInfo)) && headerXTags !== null) ? {
      'X-Tags': headerXTags,
    } : {},
    ...((fetchStage === 1 || (fetchStage === 2 && !showVisitorInfo)) && headerXTitle !== null) ? {
      'X-Title': headerXTitle,
    } : {},
    ...(headerXUnifiedPush !== null) ? {
      'X-UnifiedPush': headerXUnifiedPush,
    } : {},
  };
}

/**
 * Fetch request body.
 *
 * @param {FetchRequestBodyRequest} request - Request.
 *
 * @returns {FetchRequestBodyReturns}
 *
 * @since 1.0.0
 */
export async function fetchRequestBody(request: FetchRequestBodyRequest): FetchRequestBodyReturns {
  try {
    const arrayBuffer = await request.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // If the buffer is a file.
    if (uint8Array.some((byte) => byte === 0)) {
      return {
        type: 'binary',
        data: Uint8Array.from(uint8Array),
      };
    }

    return {
      type: 'text',
      data: new TextDecoder('utf-8').decode(arrayBuffer),
    };
  } catch {
    return {
      type: 'unknown',
      data: undefined,
    };
  }
}

/**
 * Fetch request header.
 *
 * @param {FetchRequestHeaderRequest} request - Request.
 * @param {FetchRequestHeaderName}    name    - Name.
 *
 * @returns {FetchRequestHeaderReturns}
 *
 * @since 1.0.0
 */
export function fetchRequestHeader(request: FetchRequestHeaderRequest, name: FetchRequestHeaderName): FetchRequestHeaderReturns {
  return request.headers.get(name);
}

/**
 * Is input valid.
 *
 * @param {IsInputValidMode}  mode  - Mode.
 * @param {IsInputValidList}  list  - List.
 * @param {IsInputValidInput} input - Input.
 *
 * @returns {IsInputValidReturns}
 *
 * @since 1.0.0
 */
export function isInputValid(mode: IsInputValidMode, list: IsInputValidList, input: IsInputValidInput): IsInputValidReturns {
  // If mode is "disabled", skip the check.
  if (mode === 'disabled') {
    return true;
  }

  // If mode is not "disabled" and input is "null", request is invalid.
  if (input === null) {
    return false;
  }

  // If mode is "allow", input should be listed in "list" for input to be valid.
  // If mode is "disallow", input should not be listed in "list" for input to be valid.
  return (mode === 'allow' && list.includes(input)) || (mode === 'disallow' && !list.includes(input));
}

/**
 * Pretty print.
 *
 * @param {PrettyPrintData} data - Data.
 *
 * @returns {PrettyPrintReturns}
 *
 * @since 1.0.0
 */
export function prettyPrint(data: PrettyPrintData): PrettyPrintReturns {
  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return null;
  }
}

import type {
  FetchRequestHeaderName,
  FetchRequestHeaderRequest,
  FetchRequestHeaderReturns,
  FetchRequestTextRequest,
  FetchRequestTextReturns,
  IsInputValidInput,
  IsInputValidList,
  IsInputValidMode,
  IsInputValidReturns,
  PrettyPrintData,
  PrettyPrintReturns,
} from '@/types/index.d.ts';

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
 * Fetch request text.
 *
 * @param {FetchRequestTextRequest} request - Request.
 *
 * @returns {FetchRequestTextReturns}
 *
 * @since 1.0.0
 */
export async function fetchRequestText(request: FetchRequestTextRequest): FetchRequestTextReturns {
  try {
    const text = await request.text();

    // If empty body, return "null" instead of empty body.
    if (text === '') {
      return null;
    }

    return text;
  } catch {
    return null;
  }
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
  // If mode is disabled, skip the check.
  if (mode === 'disabled') {
    return true;
  }

  // If input is "null", request is invalid.
  if (input === null) {
    return false;
  }

  return (
    mode === 'allow'
    && list.includes(input)
  )
  || (
    mode === 'disallow'
    && !list.includes(input)
  );
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

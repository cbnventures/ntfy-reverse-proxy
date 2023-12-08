import type { FetchRequestJsonJson, FetchRequestJsonRequest, FetchRequestJsonReturns } from '@/types/index.d.ts';

/**
 * Fetch request json.
 *
 * @param {FetchRequestJsonRequest} request - Request.
 *
 * @returns {FetchRequestJsonReturns}
 *
 * @since 1.0.0
 */
export async function fetchRequestJson(request: FetchRequestJsonRequest): FetchRequestJsonReturns {
  let json;

  try {
    json = await request.json<FetchRequestJsonJson>();
  } catch {
    json = null;
  }

  return json;
}

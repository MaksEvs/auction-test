import { ApiError } from '@/shared/api/api-error';

function getErrorMessage(data: unknown): string {
  if (
    typeof data === 'object' &&
    data !== null &&
    'message' in data &&
    typeof data.message === 'string'
  ) {
    return data.message;
  }

  return 'Request failed';
}

async function readErrorData(response: Response): Promise<unknown | null> {
  const contentType = response.headers.get('content-type');

  if (!contentType?.includes('json')) {
    return null;
  }

  try {
    return (await response.json()) as unknown;
  } catch {
    return null;
  }
}

async function fetchResponse(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const response = await fetch(input, init);

  if (!response.ok) {
    const data = await readErrorData(response);

    throw new ApiError(getErrorMessage(data), response.status, data);
  }

  return response;
}

export async function fetchJson<TResponse>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<TResponse> {
  const response = await fetchResponse(input, init);

  return (await response.json()) as TResponse;
}

export async function fetchOk(input: RequestInfo | URL, init?: RequestInit): Promise<void> {
  await fetchResponse(input, init);
}

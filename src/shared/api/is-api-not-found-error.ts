import { ApiError } from '@/shared/api/api-error';

export function isApiNotFoundError(error: unknown): error is ApiError {
  return error instanceof ApiError && error.status === 404;
}

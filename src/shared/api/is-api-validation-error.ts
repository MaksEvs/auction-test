import { ApiError } from '@/shared/api/api-error';
import type { IValidationError, IValidationProblem } from '@/shared/types/api-error';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isNullableString(value: unknown): value is string | null | undefined {
  return value === undefined || value === null || typeof value === 'string';
}

function isValidationError(value: unknown): value is IValidationError {
  return (
    isRecord(value) &&
    typeof value.field === 'string' &&
    typeof value.message === 'string' &&
    isNullableString(value.code)
  );
}

function isValidationProblem(value: unknown): value is IValidationProblem {
  return (
    isRecord(value) &&
    value.code === 'validation_failed' &&
    typeof value.title === 'string' &&
    typeof value.message === 'string' &&
    isNullableString(value.trace_id) &&
    Array.isArray(value.errors) &&
    value.errors.every(isValidationError)
  );
}

export function isApiValidationError(
  error: unknown,
): error is ApiError<IValidationProblem> & { data: IValidationProblem } {
  return error instanceof ApiError && error.status === 422 && isValidationProblem(error.data);
}

export interface IValidationError {
  field: string;
  message: string;
  code?: string | null;
}

export interface IValidationProblem {
  code: 'validation_failed';
  title: string;
  message: string;
  trace_id?: string | null;
  errors: IValidationError[];
}

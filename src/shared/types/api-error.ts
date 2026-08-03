export interface IProblemDetail {
  code: string
  title: string
  message: string
  trace_id?: string | null
}

export interface IValidationError {
  field: string
  message: string
  code?: string | null
}

export interface IValidationProblem extends IProblemDetail {
  code: 'validation_failed'
  errors: IValidationError[]
}
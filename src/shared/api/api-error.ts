export class ApiError<TData = unknown> extends Error {
  public readonly status: number;
  public readonly data: TData | null;

  constructor(message: string, status: number, data: TData | null = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

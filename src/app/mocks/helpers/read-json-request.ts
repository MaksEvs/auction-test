export async function readJsonRequest<TValue>(
  request: Request,
  fallbackValue: TValue,
): Promise<TValue> {
  try {
    return await request.json() as TValue
  } catch {
    return fallbackValue
  }
}
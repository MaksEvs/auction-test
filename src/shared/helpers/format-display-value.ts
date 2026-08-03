import { formatCurrencyCode } from '@/shared/helpers/format-currency-code'
import type { TMaybe } from '@/shared/types/maybe'

const DEFAULT_EMPTY_VALUE = '—'

export function formatDisplayValue(
  value: TMaybe<string | number>,
  emptyValue = DEFAULT_EMPTY_VALUE,
): string {
  if (value === null || value === undefined) {
    return emptyValue
  }

  if (typeof value === 'string' && value.trim().length === 0) {
    return emptyValue
  }

  return String(value)
}

export function formatDateTime(
  value: TMaybe<string>,
  emptyValue = DEFAULT_EMPTY_VALUE,
): string {
  if (!value) {
    return emptyValue
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return emptyValue
  }

  return new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

export function formatNumber(
  value: TMaybe<number>,
  options?: Intl.NumberFormatOptions,
  emptyValue = DEFAULT_EMPTY_VALUE,
): string {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return emptyValue
  }

  return new Intl.NumberFormat('ru-RU', options).format(value)
}

export function formatMoney(
  value: TMaybe<number>,
  currencyCode: string,
  emptyValue = DEFAULT_EMPTY_VALUE,
): string {
  const formattedValue = formatNumber(
    value,
    { maximumFractionDigits: 2 },
    emptyValue,
  )

  if (formattedValue === emptyValue) {
    return formattedValue
  }

  const formattedCurrencyCode = formatCurrencyCode(currencyCode)

  return formattedCurrencyCode
    ? `${formattedValue} ${formattedCurrencyCode}`
    : formattedValue
}
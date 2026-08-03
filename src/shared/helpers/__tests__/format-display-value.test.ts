import { describe, expect, it } from 'vitest'
import {
  formatDateTime,
  formatDisplayValue,
  formatMoney,
  formatNumber,
} from '@/shared/helpers/format-display-value'

describe('formatDisplayValue', () => {
  it.each([null, undefined, '', '   '])(
    'returns the empty value for %s',
    (value) => {
      expect(formatDisplayValue(value)).toBe('—')
    },
  )

  it('keeps meaningful zero and supports a custom empty value', () => {
    expect(formatDisplayValue(0)).toBe('0')
    expect(formatDisplayValue(null, 'Нет данных')).toBe('Нет данных')
  })
})

describe('formatDateTime', () => {
  it('returns the empty value for an invalid date', () => {
    expect(formatDateTime('not-a-date')).toBe('—')
  })

  it('formats a valid date using the shared locale options', () => {
    const value = '2026-08-03T12:30:00+03:00'
    const expectedValue = new Intl.DateTimeFormat('ru-RU', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value))

    expect(formatDateTime(value)).toBe(expectedValue)
  })
})

describe('formatNumber', () => {
  it.each([Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    'returns the empty value for a non-finite number',
    (value) => {
      expect(formatNumber(value)).toBe('—')
    },
  )

  it('formats a finite number using ru-RU locale', () => {
    expect(formatNumber(12500.5, { maximumFractionDigits: 2 })).toBe(
      new Intl.NumberFormat('ru-RU', {
        maximumFractionDigits: 2,
      }).format(12500.5),
    )
  })
})

describe('formatMoney', () => {
  it('maps the numeric RUB code to the ruble symbol', () => {
    expect(formatMoney(12500, '643')).toBe(
      `${new Intl.NumberFormat('ru-RU').format(12500)} ₽`,
    )
  })

  it('keeps an unknown currency code', () => {
    expect(formatMoney(100, 'USD')).toBe('100 USD')
  })

  it('does not add trailing whitespace for an empty currency code', () => {
    expect(formatMoney(100, '')).toBe('100')
  })
})
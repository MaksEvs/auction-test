import {
  formatDateTime,
  formatDisplayValue,
  formatMoney,
} from '@/shared/helpers/format-display-value'
import type { TMaybe } from '@/shared/types/maybe'

const EMPTY_VALUE = '—'
const RUB_CURRENCY_CODE = '643'

export function formatAuctionBetValue(
  value: TMaybe<string | number>,
): string {
  return formatDisplayValue(value, EMPTY_VALUE)
}

export function formatAuctionBetDateTime(
  value: TMaybe<string>,
): string {
  return formatDateTime(value, EMPTY_VALUE)
}

export function formatAuctionBetMoney(value: TMaybe<number>): string {
  return formatMoney(value, RUB_CURRENCY_CODE, EMPTY_VALUE)
}
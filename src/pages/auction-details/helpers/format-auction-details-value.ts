import { AUCTION_DETAILS_EMPTY_VALUE } from '@/pages/auction-details/constants/auction-details.constants';
import {
  formatDateTime,
  formatDisplayValue,
  formatMoney,
} from '@/shared/helpers/format-display-value';
import type { TMaybe } from '@/shared/types/maybe';

export function formatAuctionDetailsValue(value: TMaybe<string | number>): string {
  return formatDisplayValue(value, AUCTION_DETAILS_EMPTY_VALUE);
}

export function formatAuctionDetailsDateTime(value: TMaybe<string>): string {
  return formatDateTime(value, AUCTION_DETAILS_EMPTY_VALUE);
}

export function formatAuctionDetailsMoney(value: TMaybe<number>, currencyCode: string): string {
  return formatMoney(value, currencyCode, AUCTION_DETAILS_EMPTY_VALUE);
}

export function formatAuctionDetailsValueWithUnit(
  value: TMaybe<string | number>,
  unit: string,
): string {
  const formattedValue = formatAuctionDetailsValue(value);

  if (formattedValue === AUCTION_DETAILS_EMPTY_VALUE) {
    return formattedValue;
  }

  return unit ? `${formattedValue} ${unit}` : formattedValue;
}

import type { IAuctionStoreItem } from '@/app/mocks/types/auction-store';

const PRICE_FRACTION_DIGITS = 2;

export function calculateAvailableAuctionPrice(
  auction: IAuctionStoreItem,
  currentPrice: number | null,
): number | null {
  const { available, min, max, step } = auction.trading.price;

  if (currentPrice === null || step === null || step <= 0) {
    return available;
  }

  if (auction.main.auc_type === 'Down') {
    const nextPrice = roundPrice(currentPrice - step);

    return nextPrice <= 0 || (min !== null && nextPrice < min) ? null : nextPrice;
  }

  if (auction.main.auc_type === 'Up') {
    const nextPrice = roundPrice(currentPrice + step);

    return max !== null && nextPrice > max ? null : nextPrice;
  }

  return available;
}

function roundPrice(price: number): number {
  return Number(price.toFixed(PRICE_FRACTION_DIGITS));
}
// коммент

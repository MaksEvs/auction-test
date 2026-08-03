import { beforeEach, describe, expect, it } from 'vitest';
import { auctionStoreItems } from '@/app/mocks/data/auction-store';
import { calculateAvailableAuctionPrice } from '@/app/mocks/helpers/calculate-available-auction-price';
import type { IAuctionStoreItem } from '@/app/mocks/types/auction-store';

describe('calculateAvailableAuctionPrice', () => {
  let auction: IAuctionStoreItem;

  beforeEach(() => {
    auction = structuredClone(auctionStoreItems[0]);
  });

  it('calculates the next price for a Down auction', () => {
    auction.main.auc_type = 'Down';
    auction.trading.price.step = 500;

    expect(calculateAvailableAuctionPrice(auction, 30000)).toBe(29500);
  });

  it('calculates the next price for an Up auction', () => {
    auction.main.auc_type = 'Up';
    auction.trading.price.step = 500;

    expect(calculateAvailableAuctionPrice(auction, 30000)).toBe(30500);
  });

  it('rounds a fractional next price to two digits', () => {
    auction.main.auc_type = 'Down';
    auction.trading.price.min = null;
    auction.trading.price.step = 0.1;

    expect(calculateAvailableAuctionPrice(auction, 0.3)).toBe(0.2);
  });

  it('returns null when a Down auction reaches its minimum', () => {
    auction.main.auc_type = 'Down';
    auction.trading.price.min = 20000;
    auction.trading.price.step = 500;

    expect(calculateAvailableAuctionPrice(auction, 20200)).toBeNull();
  });

  it('returns null when an Up auction reaches its maximum', () => {
    auction.main.auc_type = 'Up';
    auction.trading.price.max = 33000;
    auction.trading.price.step = 500;

    expect(calculateAvailableAuctionPrice(auction, 32800)).toBeNull();
  });

  it.each([null, 0, -100])('returns the stored available price for step %s', (step) => {
    auction.trading.price.available = 29000;
    auction.trading.price.step = step;

    expect(calculateAvailableAuctionPrice(auction, 30000)).toBe(29000);
  });

  it('returns the stored available price when current price is null', () => {
    auction.trading.price.available = 29000;

    expect(calculateAvailableAuctionPrice(auction, null)).toBe(29000);
  });

  it('returns the stored available price for a non-directed auction', () => {
    auction.main.auc_type = 'FixPrice';
    auction.trading.price.available = 29000;

    expect(calculateAvailableAuctionPrice(auction, 30000)).toBe(29000);
  });
});

import { describe, expect, it } from 'vitest';
import {
  mapAuctionsListSearchParamsToRequest,
  parseAuctionsListSearchParams,
} from '@/features/auctions-list-filters/model/auctions-list-search-params';

describe('parseAuctionsListSearchParams', () => {
  it('returns safe defaults for empty search params', () => {
    expect(parseAuctionsListSearchParams({})).toEqual({
      page: 1,
      status: [],
      statuses: [],
      auc_type: [],
    });
  });

  it('normalizes URL values', () => {
    expect(
      parseAuctionsListSearchParams({
        page: '3',
        cargo_num: ['  CARGO-42  ', 'ignored'],
        status: 'Leading,Losing',
        statuses: ['1, 2', '3'],
        auc_type: ['Down', 'Up'],
        load_city: '  Москва  ',
        is_available: 'false',
        is_bidder: true,
        current_price_from: '0',
        current_price_to: '125000.5',
      }),
    ).toMatchObject({
      page: 3,
      cargo_num: 'CARGO-42',
      status: ['Leading', 'Losing'],
      statuses: [1, 2, 3],
      auc_type: ['Down', 'Up'],
      load_city: 'Москва',
      is_available: false,
      is_bidder: true,
      current_price_from: 0,
      current_price_to: 125000.5,
    });
  });

  it('falls back safely for invalid search params', () => {
    expect(
      parseAuctionsListSearchParams({
        page: '-2',
        status: 'InvalidStatus',
        statuses: '0,-1,invalid',
        auc_type: 'Unknown',
        load_date_from: 'not-a-date',
        load_date_to: '2026/08/03',
        current_price_from: '-1',
        current_price_to: 'invalid',
      }),
    ).toEqual({
      page: 1,
      status: [],
      statuses: [],
      auc_type: [],
    });
  });
});

describe('mapAuctionsListSearchParamsToRequest', () => {
  it('maps dates and keeps meaningful false and zero values', () => {
    const searchParams = parseAuctionsListSearchParams({
      page: '2',
      cargo_num: 'CARGO-42',
      load_date_from: '2026-08-03',
      load_date_to: '2026-08-05',
      is_available: 'false',
      current_price_from: '0',
    });

    expect(mapAuctionsListSearchParamsToRequest(searchParams)).toEqual({
      page: 2,
      per_page: 6,
      cargo_num: 'CARGO-42',
      load_date_from: '2026-08-03T00:00:00+03:00',
      load_date_to: '2026-08-05T23:59:59+03:00',
      is_available: false,
      current_price_from: 0,
    });
  });
});

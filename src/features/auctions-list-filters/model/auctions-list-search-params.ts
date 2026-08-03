import { z } from 'zod';
import type {
  IAuctionListRequest,
  TAuctionType,
  TTradingStatus,
} from '@/entities/auction/types/auction-list';

const AUCTIONS_LIST_DEFAULT_PAGE = 1;
const AUCTIONS_LIST_DEFAULT_PER_PAGE = 6;

const AUCTION_TYPE_VALUES = [
  'Request',
  'Up',
  'Down',
  'FixPrice',
] as const satisfies readonly Exclude<TAuctionType, 'Unknown'>[];
const TRADING_STATUS_VALUES = [
  'NotParticipating',
  'Leading',
  'Losing',
  'OnPending',
  'Confirmed',
  'ChoosingWinner',
  'Winner',
  'Accepted',
  'Unknown',
] as const satisfies readonly TTradingStatus[];

const DATE_SEARCH_PARAM_REGEXP = /^\d{4}-\d{2}-\d{2}$/;

const stringSearchParamSchema = z.preprocess(
  normalizeOptionalStringSearchParam,
  z.string().optional(),
);

const numberSearchParamSchema = z.preprocess(
  normalizeOptionalNumberSearchParam,
  z.number().finite().nonnegative().optional().catch(undefined),
);

const booleanSearchParamSchema = z.preprocess(
  normalizeOptionalBooleanSearchParam,
  z.boolean().optional(),
);

const dateSearchParamSchema = z.preprocess(
  normalizeOptionalStringSearchParam,
  z.string().regex(DATE_SEARCH_PARAM_REGEXP).optional().catch(undefined),
);

const auctionsListSearchParamsSchema = z.object({
  page: z.preprocess(
    normalizeOptionalNumberSearchParam,
    z.number().int().positive().catch(AUCTIONS_LIST_DEFAULT_PAGE),
  ),
  cargo_num: stringSearchParamSchema,
  status: z.preprocess(normalizeArraySearchParam, z.array(z.enum(TRADING_STATUS_VALUES)).catch([])),
  statuses: z.preprocess(
    normalizeNumberArraySearchParam,
    z.array(z.number().int().positive()).catch([]),
  ),
  auc_type: z.preprocess(normalizeArraySearchParam, z.array(z.enum(AUCTION_TYPE_VALUES)).catch([])),
  load_city: stringSearchParamSchema,
  unload_city: stringSearchParamSchema,
  load_date_from: dateSearchParamSchema,
  load_date_to: dateSearchParamSchema,
  is_available: booleanSearchParamSchema,
  is_bidder: booleanSearchParamSchema,
  current_price_from: numberSearchParamSchema,
  current_price_to: numberSearchParamSchema,
});

export type TAuctionsListSearchParams = z.infer<typeof auctionsListSearchParamsSchema>;

export function parseAuctionsListSearchParams(searchParams: unknown): TAuctionsListSearchParams {
  return auctionsListSearchParamsSchema.parse(searchParams);
}

export function mapAuctionsListSearchParamsToRequest(
  searchParams: TAuctionsListSearchParams,
): IAuctionListRequest {
  return removeEmptyAuctionListRequestParams({
    page: searchParams.page,
    per_page: AUCTIONS_LIST_DEFAULT_PER_PAGE,
    cargo_num: searchParams.cargo_num,
    status: searchParams.status,
    statuses: searchParams.statuses,
    auc_type: searchParams.auc_type,
    load_city: searchParams.load_city,
    unload_city: searchParams.unload_city,
    load_date_from: mapSearchDateToRequestDateTime(searchParams.load_date_from, 'start'),
    load_date_to: mapSearchDateToRequestDateTime(searchParams.load_date_to, 'end'),
    is_available: searchParams.is_available,
    is_bidder: searchParams.is_bidder,
    current_price_from: searchParams.current_price_from,
    current_price_to: searchParams.current_price_to,
  });
}

function normalizeOptionalStringSearchParam(value: unknown): string | undefined {
  const normalizedValue = Array.isArray(value) ? value.at(0) : value;

  if (typeof normalizedValue !== 'string') {
    return undefined;
  }

  const trimmedValue = normalizedValue.trim();

  return trimmedValue.length > 0 ? trimmedValue : undefined;
}

function normalizeOptionalNumberSearchParam(value: unknown): number | undefined {
  const normalizedValue = normalizeOptionalStringSearchParam(value) ?? value;

  if (typeof normalizedValue === 'number') {
    return normalizedValue;
  }

  if (typeof normalizedValue !== 'string') {
    return undefined;
  }

  const numberValue = Number(normalizedValue);

  return Number.isFinite(numberValue) ? numberValue : undefined;
}

function normalizeOptionalBooleanSearchParam(value: unknown): boolean | undefined {
  const normalizedValue = normalizeOptionalStringSearchParam(value) ?? value;

  if (typeof normalizedValue === 'boolean') {
    return normalizedValue;
  }

  if (normalizedValue === 'true') {
    return true;
  }

  if (normalizedValue === 'false') {
    return false;
  }

  return undefined;
}

function normalizeArraySearchParam(value: unknown): string[] {
  const values = Array.isArray(value) ? value : [value];

  return values
    .flatMap((item) => (typeof item === 'string' ? item.split(',') : []))
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeNumberArraySearchParam(value: unknown): number[] {
  const values = Array.isArray(value) ? value : [value];

  return values
    .flatMap((item) => (typeof item === 'string' ? item.split(',') : [item]))
    .map((item) => (typeof item === 'number' ? item : Number(String(item).trim())))
    .filter(Number.isFinite);
}

function mapSearchDateToRequestDateTime(
  date: string | undefined,
  boundary: 'start' | 'end',
): string | undefined {
  if (!date) {
    return undefined;
  }

  return boundary === 'start' ? `${date}T00:00:00+03:00` : `${date}T23:59:59+03:00`;
}

function removeEmptyAuctionListRequestParams(request: IAuctionListRequest): IAuctionListRequest {
  return Object.fromEntries(
    Object.entries(request).filter(([, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }

      return value !== undefined && value !== '';
    }),
  ) as IAuctionListRequest;
}

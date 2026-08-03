import { fetchJson } from '@/shared/api/fetch-json';
import type { IBetListResponse } from '@/entities/auction/types/auction-bet';

const AUCTION_URL_PREFIX = '/api/v1/auctions';

export function getAuctionBets(auctionUuid: string): Promise<IBetListResponse> {
  return fetchJson<IBetListResponse>(`${AUCTION_URL_PREFIX}/${auctionUuid}/bets?all=true`);
}

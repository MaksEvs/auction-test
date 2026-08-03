import { fetchJson } from '@/shared/api/fetch-json';
import type { IAuctionShowResponse } from '@/entities/auction/types/auction-details';

const AUCTION_URL_PREFIX = '/api/v1/auctions';

export function getAuction(auctionUuid: string): Promise<IAuctionShowResponse> {
  return fetchJson<IAuctionShowResponse>(`${AUCTION_URL_PREFIX}/${auctionUuid}`);
}

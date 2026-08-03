import { fetchOk } from '@/shared/api/fetch-json'
import type { ISetBetRequest } from '@/entities/auction/types/auction-bet'

const AUCTION_URL_PREFIX = '/api/v1/auctions'

export function setAuctionBet(
  auctionUuid: string,
  request: ISetBetRequest,
): Promise<void> {
  return fetchOk(`${AUCTION_URL_PREFIX}/${auctionUuid}/bets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })
}
import { queryOptions, useQuery } from '@tanstack/react-query'
import { getAuction } from '@/entities/auction/api/get-auction'

export function getAuctionQueryOptions(auctionUuid: string) {
  return queryOptions({
    queryKey: ['auctions', 'details', auctionUuid],
    queryFn: () => getAuction(auctionUuid),
  })
}

export function useAuctionQuery(auctionUuid: string) {
  return useQuery(getAuctionQueryOptions(auctionUuid))
}
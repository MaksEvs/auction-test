import { useQuery } from '@tanstack/react-query'
import { getAuctionBets } from '@/entities/auction/api/get-auction-bets'

export function useAuctionBetsQuery(auctionUuid: string, enabled = true) {
  return useQuery({
    queryKey: ['auctions', 'bets', auctionUuid],
    queryFn: () => getAuctionBets(auctionUuid),
    enabled,
  })
}
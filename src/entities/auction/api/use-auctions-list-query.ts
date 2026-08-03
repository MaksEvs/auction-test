import { useQuery } from '@tanstack/react-query';
import { getListAuctions } from '@/entities/auction/api/get-list-auctions';
import type { IAuctionListRequest } from '@/entities/auction/types/auction-list';

export function useAuctionsListQuery(params: IAuctionListRequest = {}) {
  return useQuery({
    queryKey: ['auctions', 'list', params],
    queryFn: () => getListAuctions(params),
  });
}

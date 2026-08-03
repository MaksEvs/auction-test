import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setAuctionBet } from '@/entities/auction/api/set-auction-bet';
import type { ISetBetRequest } from '@/entities/auction/types/auction-bet';

interface IUseSetAuctionBetMutationParams {
  auctionUuid: string;
}

export function useSetAuctionBetMutation({ auctionUuid }: IUseSetAuctionBetMutationParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: ISetBetRequest) => setAuctionBet(auctionUuid, request),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['auctions', 'bets', auctionUuid],
        }),
        queryClient.invalidateQueries({
          queryKey: ['auctions', 'details', auctionUuid],
        }),
        queryClient.invalidateQueries({
          queryKey: ['auctions', 'list'],
        }),
      ]);
    },
  });
}

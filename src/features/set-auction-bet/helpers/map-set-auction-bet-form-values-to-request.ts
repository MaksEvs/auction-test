import type { ISetBetRequest } from '@/entities/auction/types/auction-bet';
import type { ISetAuctionBetFormValues } from '@/features/set-auction-bet/types/set-auction-bet';

export function mapSetAuctionBetFormValuesToRequest(
  values: ISetAuctionBetFormValues,
): ISetBetRequest {
  return {
    price: Number(values.price),
  };
}

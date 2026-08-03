import { auctionStoreItems } from '@/app/mocks/data/auction-store';
import type { IAuctionStoreItem } from '@/app/mocks/types/auction-store';

export function findAuctionStoreItemByUuid(auctionUuid: string): IAuctionStoreItem | undefined {
  return auctionStoreItems.find(
    (auctionStoreItem) => auctionStoreItem.main.order_uid === auctionUuid,
  );
}

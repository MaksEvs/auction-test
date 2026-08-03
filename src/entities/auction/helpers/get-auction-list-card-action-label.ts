import type { IAuctionListItem } from '@/entities/auction/types/auction-list';

export function getAuctionListCardActionLabel(auction: IAuctionListItem): string {
  if (!auction.trading.can_set_bet) {
    return 'Смотреть ставки';
  }

  return auction.trading.your?.bet ? 'Изменить ставку' : 'Сделать ставку';
}

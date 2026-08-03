import { calculateAvailableAuctionPrice } from '@/app/mocks/helpers/calculate-available-auction-price';
import { calculatePriceNoVat } from '@/app/mocks/helpers/calculate-price-no-vat';
import type { IAuctionStoreItem } from '@/app/mocks/types/auction-store';
import type { IAuctionShowResponse } from '@/entities/auction/types/auction-details';

export function mapAuctionStoreItemToShowResponse(
  auction: IAuctionStoreItem,
): IAuctionShowResponse {
  const availablePrice = calculateAvailableAuctionPrice(auction, auction.trading.price.current);
  const isDirectedAuction = auction.main.auc_type === 'Down' || auction.main.auc_type === 'Up';
  const canSetBet = auction.trading.can_set_bet && (!isDirectedAuction || availablePrice !== null);

  return {
    main: {
      id: auction.main.id,
      cargo_num: auction.main.cargo_num,
      cargo_date: auction.main.cargo_date,
      order_uid: auction.main.order_uid,
      auc_type: auction.main.auc_type,
      created_at: auction.main.created_at,
    },
    organizer: {
      subscriber_id: auction.organizer.subscriber_id,
      subscriber_code: auction.organizer.subscriber_code,
      infobase_code: auction.organizer.infobase_code,
      organization_name: auction.organizer.organization_name,
      organization_inn: auction.organizer.organization_inn,
      organization_kpp: auction.organizer.organization_kpp,
      organization_id: auction.organizer.organization_id,
    },
    contacts: auction.contacts,
    cargo: auction.cargo,
    trading: {
      ...auction.trading,
      can_set_bet: canSetBet,
      price: {
        ...auction.trading.price,
        available: availablePrice,
        available_no_vat: availablePrice === null ? null : calculatePriceNoVat(availablePrice),
      },
    },
    payment: auction.payment,
    assembly: auction.assembly,
    routes: auction.routes,
    admitted_organizations: auction.admitted_organizations,
    hide_bets_history: auction.hide_bets_history,
  };
}

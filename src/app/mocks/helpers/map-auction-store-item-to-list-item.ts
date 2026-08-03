import type { IAuctionStoreItem } from '@/app/mocks/types/auction-store';
import type { IAuctionListItem } from '@/entities/auction/types/auction-list';

export function mapAuctionStoreItemToListItem(auction: IAuctionStoreItem): IAuctionListItem {
  return {
    main: {
      id: auction.main.id,
      cargo_num: auction.main.cargo_num,
      cargo_date: auction.main.cargo_date,
      auc_type: auction.main.auc_type,
      order_uid: auction.main.order_uid,
      created_at: auction.main.created_at,
      priority_sort: auction.list.priority_sort,
      is_assembly: auction.list.is_assembly,
      price_per_km: auction.list.price_per_km,
    },
    organizer: {
      subscriber_id: auction.organizer.subscriber_id,
      organization_id: auction.organizer.organization_id,
      organization_name: auction.organizer.organization_name,
      organization_inn: auction.organizer.organization_inn,
      organization_kpp: auction.organizer.organization_kpp,
      is_hide_organization: auction.list.organizer.is_hide_organization,
    },
    route: auction.list.route,
    cargo: {
      name: auction.list.cargo.name,
      weight: auction.list.cargo.weight,
      volume: auction.list.cargo.volume,
      body_type: auction.cargo.body_type,
      truck_count: auction.cargo.truck_count,
      is_cargo: true,
      is_international: auction.cargo.is_international,
      containered: auction.cargo.containered,
      incoterms: auction.list.cargo.incoterms,
      conics: auction.cargo.conics,
      belts: auction.cargo.belts,
      adr: auction.cargo.adr,
      coupling: auction.cargo.coupling,
      air_pass: auction.cargo.air_pass,
      low_loader: auction.cargo.low_loader,
      additional_load: auction.cargo.additional_load,
      temp_from: auction.cargo.temp_from,
      temp_to: auction.cargo.temp_to,
      loading_types: auction.cargo.loading_types,
      docs: auction.cargo.docs,
      car: mapAuctionStoreCarToListCar(auction),
    },
    trading: {
      status: auction.trading.status,
      status_mobile: auction.trading.status_mobile,
      start_time: auction.trading.start_time,
      stop_time: auction.trading.stop_time,
      bid_measurement_type: auction.trading.bid_measurement_type,
      can_set_bet: auction.trading.can_set_bet,
      allow_counter_bets: auction.trading.allow_counter_bets,
      hide_points_address_and_contacts: auction.trading.hide_points_address_and_contacts,
      direction: auction.list.trading.direction,
      comment: auction.list.trading.comment,
      is_bidder: auction.trading.is_bidder,
      is_available: auction.list.trading.is_available,
      is_accredited: auction.list.trading.is_accredited,
      is_favorite: auction.trading.is_favorite,
      price: {
        start: auction.trading.price.start ?? 0,
        current: auction.trading.price.current ?? 0,
        current_no_vat: auction.trading.price.current_no_vat ?? 0,
      },
      your: {
        bet: auction.trading.your.bet,
        last_bet: auction.trading.your.last_bet,
      },
      red_bet_with_vat: auction.trading.red_bet_with_vat,
      red_bet_no_vat: auction.trading.red_bet_no_vat,
      is_last_bet_with_vat: auction.trading.is_last_bet_with_vat,
    },
    payment: {
      form: auction.payment.form,
      currency_code: auction.payment.currency_code,
      consignor: auction.list.payment.consignor,
      consignee: auction.list.payment.consignee,
    },
  };
}

function mapAuctionStoreCarToListCar(auction: IAuctionStoreItem): IAuctionListItem['cargo']['car'] {
  if (!auction.cargo.car) {
    return null;
  }

  return {
    type: auction.cargo.car.type,
    weight: auction.cargo.car.weight ?? 0,
    volume: auction.cargo.car.volume ?? 0,
    width: auction.cargo.car.width ?? 0,
    length: auction.cargo.car.length ?? 0,
    height: auction.cargo.car.height ?? 0,
  };
}

export type TAuctionType = 'Request' | 'Up' | 'Down' | 'FixPrice' | 'Unknown';

export type TAuctionStatus =
  | 'Planning'
  | 'Auction'
  | 'DeterminateWinner'
  | 'WaitDeal'
  | 'InProgress'
  | 'Finished'
  | 'Stopped'
  | 'Canceled'
  | 'Unknown';

export type TTradingStatus =
  | 'NotParticipating'
  | 'Leading'
  | 'Losing'
  | 'OnPending'
  | 'Confirmed'
  | 'ChoosingWinner'
  | 'Winner'
  | 'Accepted'
  | 'Unknown';

export type TBidMeasurementType = 'PerRoute' | 'PerKm' | 'Unknown';

export interface IAuctionListRequest {
  page?: number;
  per_page?: number;
  is_oldest?: boolean;
  sort?: Record<string, 'asc' | 'desc'> | null;
  status?: TTradingStatus[];
  mobile_statuses?: number[];
  statuses?: number[];
  cargo_num?: string;
  weight_from?: number;
  weight_to?: number;
  volume_from?: number;
  volume_to?: number;
  body_types?: string[];
  form_type?: string | null;
  is_international_shipment?: boolean;
  load_city?: string;
  load_gc_id?: number;
  load_range?: number;
  unload_city?: string;
  unload_gc_id?: number;
  unload_range?: number;
  load_date_from?: string;
  load_date_to?: string;
  unload_date_from?: string;
  unload_date_to?: string;
  create_date_from?: string;
  create_date_to?: string;
  start_time_from?: string;
  start_time_to?: string;
  stop_time_from?: string;
  stop_time_to?: string;
  is_available?: boolean;
  is_favorite?: boolean;
  is_bidder?: boolean;
  customer?: string;
  customer_ids?: number[];
  contractor?: string | null;
  auction_ids?: number[];
  replace_external_pads?: boolean | null;
  current_price_from?: number | null;
  current_price_to?: number | null;
  price_per_km_from?: number | null;
  price_per_km_to?: number | null;
  auc_type?: Exclude<TAuctionType, 'Unknown'>[];
}

export interface IAuctionListMeta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface IAuctionListItem {
  main: IAuctionListItemMain;
  organizer: IAuctionListItemOrganizer;
  route: IAuctionListItemRoute;
  cargo: IAuctionListItemCargo;
  trading: IAuctionListItemTrading;
  payment: IAuctionListItemPayment;
}

export interface IAuctionListItemMain {
  id: number;
  cargo_num: string;
  cargo_date: string;
  auc_type: TAuctionType;
  order_uid: string;
  created_at: string;
  priority_sort: number;
  is_assembly: boolean;
  price_per_km: number | null;
}

export interface IAuctionListItemOrganizer {
  subscriber_id: number;
  organization_id: number;
  organization_name: string;
  organization_inn: string;
  organization_kpp: string;
  is_hide_organization: boolean;
}

export interface IAuctionListItemRoute {
  load: IAuctionListItemRoutePoint;
  unload: IAuctionListItemRoutePoint;
}

export interface IAuctionListItemRoutePoint {
  city: string;
  address: string;
  date: string;
  city_gc_id: number;
  points_count: number;
}

export interface IAuctionListItemCargo {
  name: string;
  weight: number;
  volume: number;
  body_type: string;
  truck_count: number;
  is_cargo: boolean;
  is_international: boolean;
  containered: boolean;
  incoterms: string;
  conics: number | null;
  belts: number | null;
  adr: number | null;
  coupling: boolean | null;
  air_pass: boolean | null;
  low_loader: boolean | null;
  additional_load: boolean | null;
  temp_from: number | null;
  temp_to: number | null;
  loading_types: IAuctionListItemCargoLoadingType;
  docs: IAuctionListItemCargoDocs;
  car: IAuctionListItemCargoCar | null;
}

export interface IAuctionListItemCargoLoadingType {
  side: boolean;
  top: boolean;
  rear: boolean;
  full: boolean;
}

export interface IAuctionListItemCargoDocs {
  tir: boolean;
  cmr: boolean;
  t1: boolean;
  med: boolean;
}

export interface IAuctionListItemCargoCar {
  type: string;
  weight: number;
  volume: number;
  width: number;
  length: number;
  height: number;
}

export interface IAuctionListItemTrading {
  status: TAuctionStatus;
  status_mobile: TTradingStatus;
  start_time: string;
  stop_time: string;
  bid_measurement_type: TBidMeasurementType | null;
  can_set_bet: boolean;
  allow_counter_bets: boolean;
  hide_points_address_and_contacts: boolean;
  direction: string | null;
  comment: string | null;
  is_bidder: boolean;
  is_available: boolean;
  is_accredited: boolean;
  is_favorite: boolean;
  price: IAuctionListItemTradingPrice | null;
  your: IAuctionListItemTradingYour | null;
  red_bet_with_vat: boolean;
  red_bet_no_vat: boolean;
  is_last_bet_with_vat: boolean | null;
}

export interface IAuctionListItemTradingPrice {
  start: number;
  current: number;
  current_no_vat: number;
}

export interface IAuctionListItemTradingYour {
  bet: boolean;
  last_bet: number | null;
}

export interface IAuctionListItemPayment {
  form: string;
  currency_code: string;
  consignor: string | null;
  consignee: string | null;
}

export interface IAuctionListResponseBase {
  data: IAuctionListItem[];
  meta: IAuctionListMeta;
}

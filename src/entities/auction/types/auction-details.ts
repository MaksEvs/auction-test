import type {
  TAuctionStatus,
  TAuctionType,
  TBidMeasurementType,
  TTradingStatus,
} from '@/entities/auction/types/auction-list';

export interface IAuctionShowResponse {
  main: IAuctionShowMain;
  organizer: IAuctionShowOrganizer;
  contacts: IContact[];
  cargo: IAuctionShowCargo;
  trading: IAuctionShowTrading;
  payment: IAuctionShowPayment;
  assembly: IAssembly;
  routes: IRoutePoint[];
  admitted_organizations: IAdmittedOrganization[];
  hide_bets_history?: boolean;
}

export interface IAuctionShowMain {
  id: number;
  cargo_num: string;
  cargo_date: string;
  order_uid: string;
  auc_type: TAuctionType;
  created_at: string;
}

export interface IAuctionShowOrganizer {
  subscriber_id: number;
  subscriber_code: string;
  infobase_code: string;
  organization_name: string;
  organization_inn: string;
  organization_kpp: string;
  organization_id: number;
}

export interface IContact {
  name: string | null;
  phone: string | null;
  work_phone: string | null;
  uid: string | null;
  email: string | null;
}

export interface IAuctionShowCargo {
  price: string;
  currency: number | null;
  is_international: boolean;
  distance: number | null;
  truck_count: number;
  body_type: string;
  temp_from: number | null;
  temp_to: number | null;
  conics: number | null;
  belts: number | null;
  adr: number | null;
  coupling: boolean | null;
  air_pass: boolean | null;
  low_loader: boolean | null;
  additional_load: boolean | null;
  containered: boolean;
  container_type: string | null;
  container_size: string | null;
  loading_types: ILoadingTypes;
  docs: IDocs;
  car: ICarRequirements | null;
}

export interface ILoadingTypes {
  side: boolean;
  top: boolean;
  rear: boolean;
  full: boolean;
}

export interface IDocs {
  tir: boolean;
  cmr: boolean;
  t1: boolean;
  med: boolean;
}

export interface ICarRequirements {
  type: string;
  weight: number | null;
  volume: number | null;
  width: number | null;
  length: number | null;
  height: number | null;
}

export interface IAuctionShowTrading {
  status: TAuctionStatus;
  status_mobile: TTradingStatus;
  start_time: string;
  stop_time: string;
  bid_measurement_type: TBidMeasurementType | null;
  can_set_bet: boolean;
  allow_counter_bets: boolean;
  hide_bets_history: boolean;
  hide_places: boolean;
  no_view_cargo_price: boolean;
  hide_points_address_and_contacts: boolean;
  is_bidder: boolean;
  is_favorite: boolean;
  is_last_bet_with_vat: boolean | null;
  red_bet_with_vat: boolean;
  red_bet_no_vat: boolean;
  send_deal_before_load: boolean;
  chat_id: string | null;
  price: IAuctionShowTradingPrice;
  your: IAuctionShowTradingYour;
  settings: IAuctionShowTradingSettings;
}

export interface IAuctionShowTradingPrice {
  start: number | null;
  start_no_vat: number | null;
  current: number | null;
  current_no_vat: number | null;
  available: number | null;
  available_no_vat: number | null;
  min: number | null;
  min_no_vat: number | null;
  max: number | null;
  max_no_vat: number | null;
  step: number | null;
  step_no_vat: number | null;
  price_per_km: number;
}

export interface IAuctionShowTradingYour {
  bet: boolean;
  last_bet: number | null;
  last_bet_with_vat: number | null;
  win: boolean;
}

export interface IAuctionShowTradingSettings {
  prolong_after_bet: number | null;
  winner_confirm: number | null;
  winner_counter_mode: number | null;
  transmission_time_in: number | null;
  coefficient: number | null;
}

export interface IAuctionShowPayment {
  condition: string | null;
  condition_predefined: string | null;
  form: string;
  delay: number | null;
  delay_type: TPaymentDelayType;
  currency_code: string;
  prepay: string | null;
}

export type TPaymentDelayType = 'CalendarDays' | 'WorkDays' | 'Unknown';

export interface IAssembly {
  num: string | null;
  date: string | null;
}

export interface IRoutePoint {
  row_num: number;
  op_type: TOperationType;
  start_date: string;
  end_date: string;
  comment: string | null;
  contractor: string;
  contractor_inn: string;
  location: IRoutePointLocation;
  cargo: IRoutePointCargo;
  contact: IRoutePointContact;
}

export type TOperationType = 'Loading' | 'Unloading' | 'Unknown';

export interface IRoutePointLocation {
  city_name: string;
  city_full_name: string;
  city_gc_id: number;
  loading_address: string;
  lon: number;
  lat: number;
}

export interface IRoutePointCargo {
  name: string;
  package_name: string;
  weight: string;
  volume: string;
  length: string;
  width: string;
  height: string;
  oversized: boolean;
  package_amount: number | null;
}

export interface IRoutePointContact {
  name: string;
  phone: string;
}

export interface IAdmittedOrganization {
  id: number;
  inn: string;
  is_main: boolean;
  name: string;
  full_name: string;
  site: string | null;
  subscriber_id: number;
  subscriber_code: string;
  subscriber_role: string | null;
  infobase_code: string;
  infobase_address: string | null;
  nalog_key: string | null;
  hide_me: boolean;
  current_vat_rate: string | null;
}

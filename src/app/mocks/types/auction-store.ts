export type TAuctionStoreAuctionType = 'Request' | 'Up' | 'Down' | 'FixPrice' | 'Unknown'

export type TAuctionStoreAuctionStatus =
  | 'Planning'
  | 'Auction'
  | 'DeterminateWinner'
  | 'WaitDeal'
  | 'InProgress'
  | 'Finished'
  | 'Stopped'
  | 'Canceled'
  | 'Unknown'

export type TAuctionStoreTradingStatus =
  | 'NotParticipating'
  | 'Leading'
  | 'Losing'
  | 'OnPending'
  | 'Confirmed'
  | 'ChoosingWinner'
  | 'Winner'
  | 'Accepted'
  | 'Unknown'

export type TAuctionStoreBidMeasurementType = 'PerRoute' | 'PerKm' | 'Unknown'

export interface IAuctionStoreItem {
  main: IAuctionStoreMain
  organizer: IAuctionStoreOrganizer
  contacts: IAuctionStoreContact[]
  cargo: IAuctionStoreCargo
  trading: IAuctionStoreTrading
  payment: IAuctionStorePayment
  assembly: IAuctionStoreAssembly
  routes: IAuctionStoreRoutePoint[]
  admitted_organizations: IAuctionStoreAdmittedOrganization[]
  hide_bets_history?: boolean
  list: IAuctionStoreListSnapshot
}

export interface IAuctionStoreMain {
  id: number
  cargo_num: string
  cargo_date: string
  order_uid: string
  auc_type: TAuctionStoreAuctionType
  created_at: string
}

export interface IAuctionStoreOrganizer {
  subscriber_id: number
  subscriber_code: string
  infobase_code: string
  organization_name: string
  organization_inn: string
  organization_kpp: string
  organization_id: number
}

export interface IAuctionStoreContact {
  name: string | null
  phone: string | null
  work_phone: string | null
  uid: string | null
  email: string | null
}

export interface IAuctionStoreCargo {
  price: string
  currency: number | null
  is_international: boolean
  distance: number | null
  truck_count: number
  body_type: string
  temp_from: number | null
  temp_to: number | null
  conics: number | null
  belts: number | null
  adr: number | null
  coupling: boolean | null
  air_pass: boolean | null
  low_loader: boolean | null
  additional_load: boolean | null
  containered: boolean
  container_type: string | null
  container_size: string | null
  loading_types: IAuctionStoreLoadingTypes
  docs: IAuctionStoreDocs
  car: IAuctionStoreCar | null
}

export interface IAuctionStoreLoadingTypes {
  side: boolean
  top: boolean
  rear: boolean
  full: boolean
}

export interface IAuctionStoreDocs {
  tir: boolean
  cmr: boolean
  t1: boolean
  med: boolean
}

export interface IAuctionStoreCar {
  type: string
  weight: number
  volume: number
  width: number
  length: number
  height: number
}

export interface IAuctionStoreTrading {
  status: TAuctionStoreAuctionStatus
  status_mobile: TAuctionStoreTradingStatus
  start_time: string
  stop_time: string
  bid_measurement_type: TAuctionStoreBidMeasurementType | null
  can_set_bet: boolean
  allow_counter_bets: boolean
  hide_bets_history: boolean
  hide_places: boolean
  no_view_cargo_price: boolean
  hide_points_address_and_contacts: boolean
  is_bidder: boolean
  is_favorite: boolean
  is_last_bet_with_vat: boolean | null
  red_bet_with_vat: boolean
  red_bet_no_vat: boolean
  send_deal_before_load: boolean
  chat_id: string | null
  price: IAuctionStoreTradingPrice
  your: IAuctionStoreTradingYour
  settings: IAuctionStoreTradingSettings
}

export interface IAuctionStoreTradingPrice {
  start: number | null
  start_no_vat: number | null
  current: number | null
  current_no_vat: number | null
  available: number | null
  available_no_vat: number | null
  min: number | null
  min_no_vat: number | null
  max: number | null
  max_no_vat: number | null
  step: number | null
  step_no_vat: number | null
  price_per_km: number
}

export interface IAuctionStoreTradingYour {
  bet: boolean
  last_bet: number | null
  last_bet_with_vat: number | null
  win: boolean
}

export interface IAuctionStoreTradingSettings {
  prolong_after_bet: number | null
  winner_confirm: number | null
  winner_counter_mode: number | null
  transmission_time_in: number | null
  coefficient: number | null
}

export interface IAuctionStorePayment {
  condition: string | null
  condition_predefined: string | null
  form: string
  delay: number | null
  delay_type: TAuctionStorePaymentDelayType
  currency_code: string
  prepay: string | null
}

export type TAuctionStorePaymentDelayType = 'CalendarDays' | 'WorkDays' | 'Unknown'

export interface IAuctionStoreAssembly {
  num: string | null
  date: string | null
}

export interface IAuctionStoreRoutePoint {
  row_num: number
  op_type: TAuctionStoreOperationType
  start_date: string
  end_date: string
  comment: string | null
  contractor: string
  contractor_inn: string
  location: IAuctionStoreRoutePointLocation
  cargo: IAuctionStoreRoutePointCargo
  contact: IAuctionStoreRoutePointContact
}

export type TAuctionStoreOperationType = 'Loading' | 'Unloading' | 'Unknown'

export interface IAuctionStoreRoutePointLocation {
  city_name: string
  city_full_name: string
  city_gc_id: number
  loading_address: string
  lon: number
  lat: number
}

export interface IAuctionStoreRoutePointCargo {
  name: string
  package_name: string
  weight: string
  volume: string
  length: string
  width: string
  height: string
  oversized: boolean
  package_amount: number | null
}

export interface IAuctionStoreRoutePointContact {
  name: string
  phone: string
}

export interface IAuctionStoreAdmittedOrganization {
  id: number
  inn: string
  is_main: boolean
  name: string
  full_name: string
  site: string | null
  subscriber_id: number
  subscriber_code: string
  subscriber_role: string | null
  infobase_code: string
  infobase_address: string | null
  nalog_key: string | null
  hide_me: boolean
  current_vat_rate: string | null
}

export interface IAuctionStoreListSnapshot {
  priority_sort: number
  is_assembly: boolean
  price_per_km: number | null
  route: IAuctionStoreListRoute
  cargo: IAuctionStoreListCargo
  organizer: IAuctionStoreListOrganizer
  payment: IAuctionStoreListPayment
  trading: IAuctionStoreListTrading
}

export interface IAuctionStoreListRoute {
  load: IAuctionStoreListRoutePoint
  unload: IAuctionStoreListRoutePoint
}

export interface IAuctionStoreListRoutePoint {
  city: string
  address: string
  date: string
  city_gc_id: number
  points_count: number
}

export interface IAuctionStoreListCargo {
  name: string
  weight: number
  volume: number
  incoterms: string
}

export interface IAuctionStoreListOrganizer {
  is_hide_organization: boolean
}

export interface IAuctionStoreListPayment {
  consignor: string | null
  consignee: string | null
}

export interface IAuctionStoreListTrading {
  direction: string | null
  comment: string | null
  is_available: boolean
  is_accredited: boolean
}

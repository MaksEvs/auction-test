import type {
  IAuctionShowCargo,
  IAuctionShowMain,
  IAuctionShowOrganizer,
  IAuctionShowPayment,
  IAuctionShowTrading,
  IContact,
  IRoutePoint,
} from '@/entities/auction/types/auction-details'
import type { TAuctionType } from '@/entities/auction/types/auction-list'

export interface IAuctionDetailsHeaderProps {
  main: IAuctionShowMain
  trading: IAuctionShowTrading
}

export interface IAuctionDetailsOrganizerSectionProps {
  organizer: IAuctionShowOrganizer
  contacts: IContact[]
  areContactsHidden: boolean
}

export interface IAuctionDetailsRouteSectionProps {
  routes: IRoutePoint[]
  areAddressesAndContactsHidden: boolean
}

export interface IAuctionDetailsCargoSectionProps {
  cargo: IAuctionShowCargo
  routes: IRoutePoint[]
  isCargoPriceHidden: boolean
  currencyCode: string
}

export interface IAuctionDetailsPaymentSectionProps {
  payment: IAuctionShowPayment
}

export interface IAuctionDetailsTradingSectionProps {
  auctionType: TAuctionType
  trading: IAuctionShowTrading
  currencyCode: string
}
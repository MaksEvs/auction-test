import type { IAuctionShowTrading } from '@/entities/auction/types/auction-details'
import type { TAuctionType } from '@/entities/auction/types/auction-list'

export interface ISetAuctionBetFormValues {
  price: string
}

export interface ISetAuctionBetConstraints {
  auctionType: TAuctionType
  available: number | null
  min: number | null
  max: number | null
  step: number | null
}

export interface ISetAuctionBetFormProps {
  auctionUuid: string
  auctionType: TAuctionType
  trading: IAuctionShowTrading
  currencyCode: string
  onCancel: () => void
  onSuccess: () => void
}
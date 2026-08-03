import { calculateAvailableAuctionPrice } from '@/app/mocks/helpers/calculate-available-auction-price'
import { calculatePriceNoVat } from '@/app/mocks/helpers/calculate-price-no-vat'
import { findAuctionStoreItemByUuid } from '@/app/mocks/helpers/find-auction-store-item-by-uuid'

export function updateAuctionAfterBet(
  auctionUuid: string,
  price: number,
  place: number | null,
): void {
  const auction = findAuctionStoreItemByUuid(auctionUuid)

  if (!auction) {
    return
  }

  const priceNoVat = calculatePriceNoVat(price)
  const availablePrice = calculateAvailableAuctionPrice(auction, price)
  const availablePriceNoVat = availablePrice === null
    ? null
    : calculatePriceNoVat(availablePrice)
  const isDirectedAuction = auction.main.auc_type === 'Down'
    || auction.main.auc_type === 'Up'

  auction.trading.price.current = price
  auction.trading.price.current_no_vat = priceNoVat
  auction.trading.price.available = availablePrice
  auction.trading.price.available_no_vat = availablePriceNoVat
  auction.trading.status_mobile = place === 1
    ? 'Leading'
    : place === null
      ? 'NotParticipating'
      : 'Losing'
  auction.trading.is_bidder = true
  auction.trading.your.bet = true
  auction.trading.your.last_bet = price
  auction.trading.your.last_bet_with_vat = price

  if (isDirectedAuction && availablePrice === null) {
    auction.trading.can_set_bet = false
  }

  auction.list.trading.is_available = auction.trading.can_set_bet
}
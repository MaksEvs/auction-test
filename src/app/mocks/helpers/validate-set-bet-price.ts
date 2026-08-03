import { calculateAvailableAuctionPrice } from '@/app/mocks/helpers/calculate-available-auction-price'
import type { IAuctionStoreItem } from '@/app/mocks/types/auction-store'
import type { IValidationError } from '@/shared/types/api-error'

export function validateSetBetPrice(
  auction: IAuctionStoreItem,
  price: number,
): IValidationError | null {
  const { current, min, max } = auction.trading.price
  const available = calculateAvailableAuctionPrice(auction, current)

  if (!auction.trading.can_set_bet) {
    return createPriceValidationError(
      'Ставки для этого аукциона недоступны.',
      'auction_bet_unavailable',
    )
  }

  if (!Number.isFinite(price) || price <= 0) {
    return createPriceValidationError(
      'Цена ставки должна быть больше 0.',
      'greater_than',
    )
  }

  if (
    (auction.main.auc_type === 'Down' || auction.main.auc_type === 'Up')
    && available === null
  ) {
    return createPriceValidationError(
      'Достигнута предельная цена аукциона. Новая ставка недоступна.',
      'auction_price_limit_reached',
    )
  }

  if (min !== null && price < min) {
    return createPriceValidationError(
      `Цена ставки не может быть меньше ${min}.`,
      'minimum',
    )
  }

  if (max !== null && price > max) {
    return createPriceValidationError(
      `Цена ставки не может быть больше ${max}.`,
      'maximum',
    )
  }

  if (
    auction.main.auc_type === 'Down'
    && available !== null
    && price > available
  ) {
    return createPriceValidationError(
      `Для аукциона на понижение ставка должна быть не больше ${available}.`,
      'auction_direction',
    )
  }

  if (
    auction.main.auc_type === 'Up'
    && available !== null
    && price < available
  ) {
    return createPriceValidationError(
      `Для аукциона на повышение ставка должна быть не меньше ${available}.`,
      'auction_direction',
    )
  }

  return null
}

function createPriceValidationError(
  message: string,
  code: string,
): IValidationError {
  return {
    field: 'price',
    message,
    code,
  }
}
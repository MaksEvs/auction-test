import { beforeEach, describe, expect, it } from 'vitest'
import { auctionStoreItems } from '@/app/mocks/data/auction-store'
import { validateSetBetPrice } from '@/app/mocks/helpers/validate-set-bet-price'
import type { IAuctionStoreItem } from '@/app/mocks/types/auction-store'

describe('validateSetBetPrice', () => {
  let auction: IAuctionStoreItem

  beforeEach(() => {
    auction = structuredClone(auctionStoreItems[0])
    auction.main.auc_type = 'Down'
    auction.trading.can_set_bet = true
    auction.trading.price.current = 30000
    auction.trading.price.min = 20000
    auction.trading.price.max = 33000
    auction.trading.price.step = 500
  })

  it('prioritizes the unavailable auction guard', () => {
    auction.trading.can_set_bet = false

    expect(validateSetBetPrice(auction, 0)).toEqual({
      field: 'price',
      code: 'auction_bet_unavailable',
      message: 'Ставки для этого аукциона недоступны.',
    })
  })

  it.each([0, -100, Number.NaN, Number.POSITIVE_INFINITY])(
    'rejects a non-positive or non-finite price %s',
    (price) => {
      expect(validateSetBetPrice(auction, price)).toEqual({
        field: 'price',
        code: 'greater_than',
        message: 'Цена ставки должна быть больше 0.',
      })
    },
  )

  it('rejects a directed auction at its price limit', () => {
    auction.trading.price.current = 20000

    expect(validateSetBetPrice(auction, 20000)).toEqual({
      field: 'price',
      code: 'auction_price_limit_reached',
      message: 'Достигнута предельная цена аукциона. Новая ставка недоступна.',
    })
  })

  it('rejects a price below the minimum', () => {
    expect(validateSetBetPrice(auction, 19999)).toEqual({
      field: 'price',
      code: 'minimum',
      message: 'Цена ставки не может быть меньше 20000.',
    })
  })

  it('rejects a price above the maximum', () => {
    expect(validateSetBetPrice(auction, 33001)).toEqual({
      field: 'price',
      code: 'maximum',
      message: 'Цена ставки не может быть больше 33000.',
    })
  })

  it('rejects a price above the available price for a Down auction', () => {
    expect(validateSetBetPrice(auction, 29999)).toEqual({
      field: 'price',
      code: 'auction_direction',
      message: 'Для аукциона на понижение ставка должна быть не больше 29500.',
    })
  })

  it('rejects a price below the available price for an Up auction', () => {
    auction.main.auc_type = 'Up'

    expect(validateSetBetPrice(auction, 30001)).toEqual({
      field: 'price',
      code: 'auction_direction',
      message: 'Для аукциона на повышение ставка должна быть не меньше 30500.',
    })
  })

  it('accepts the available price boundary', () => {
    expect(validateSetBetPrice(auction, 29500)).toBeNull()
  })
})
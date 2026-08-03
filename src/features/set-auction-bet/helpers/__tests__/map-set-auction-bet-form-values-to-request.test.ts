import { describe, expect, it } from 'vitest'
import { mapSetAuctionBetFormValuesToRequest } from '@/features/set-auction-bet/helpers/map-set-auction-bet-form-values-to-request'

describe('mapSetAuctionBetFormValuesToRequest', () => {
  it.each([
    ['125000.5', 125000.5],
    [' 1000 ', 1000],
  ])('maps price %s to a number', (price, expectedPrice) => {
    expect(mapSetAuctionBetFormValuesToRequest({ price })).toEqual({
      price: expectedPrice,
    })
  })
})
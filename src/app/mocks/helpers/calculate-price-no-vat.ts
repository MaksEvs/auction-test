const VAT_MULTIPLIER = 1.2
const PRICE_FRACTION_DIGITS = 2

export function calculatePriceNoVat(priceWithVat: number): number {
  return Number(
    (priceWithVat / VAT_MULTIPLIER).toFixed(PRICE_FRACTION_DIGITS),
  )
}
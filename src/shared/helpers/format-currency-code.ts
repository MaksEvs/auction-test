enum ECurrencySymbolByNumericCode {
  RUB = '₽',
}

export function formatCurrencyCode(currencyCode: string): string {
  if (currencyCode === '643') {
    return ECurrencySymbolByNumericCode.RUB
  }

  return currencyCode
}
import type { TAuctionsListSearchParams } from '@/features/auctions-list-filters/model/auctions-list-search-params'
import type {
  IAuctionsListFiltersFormValues,
  TBooleanFilterValue,
} from '@/features/auctions-list-filters/types/auctions-list-filters'

export function mapAuctionsListSearchParamsToFiltersFormValues(
  searchParams: TAuctionsListSearchParams,
): IAuctionsListFiltersFormValues {
  return {
    cargo_num: searchParams.cargo_num ?? '',
    status: searchParams.status,
    statuses: searchParams.statuses,
    auc_type: searchParams.auc_type,
    load_city: searchParams.load_city ?? '',
    unload_city: searchParams.unload_city ?? '',
    load_date_from: searchParams.load_date_from ?? '',
    load_date_to: searchParams.load_date_to ?? '',
    is_available: mapBooleanToFilterValue(searchParams.is_available),
    is_bidder: mapBooleanToFilterValue(searchParams.is_bidder),
    current_price_from: mapNumberToInputValue(searchParams.current_price_from),
    current_price_to: mapNumberToInputValue(searchParams.current_price_to),
  }
}

export function mapAuctionsListFiltersFormValuesToSearchParams(
  values: IAuctionsListFiltersFormValues,
): Omit<TAuctionsListSearchParams, 'page'> {
  return {
    cargo_num: mapInputStringToOptionalValue(values.cargo_num),
    status: values.status,
    statuses: values.statuses,
    auc_type: values.auc_type,
    load_city: mapInputStringToOptionalValue(values.load_city),
    unload_city: mapInputStringToOptionalValue(values.unload_city),
    load_date_from: values.load_date_from || undefined,
    load_date_to: values.load_date_to || undefined,
    is_available: mapFilterValueToBoolean(values.is_available),
    is_bidder: mapFilterValueToBoolean(values.is_bidder),
    current_price_from: mapPriceInputToNumber(values.current_price_from),
    current_price_to: mapPriceInputToNumber(values.current_price_to),
  }
}

function mapBooleanToFilterValue(value: boolean | undefined): TBooleanFilterValue {
  if (value === undefined) {
    return ''
  }

  return String(value) as TBooleanFilterValue
}

function mapFilterValueToBoolean(value: TBooleanFilterValue): boolean | undefined {
  if (value === '') {
    return undefined
  }

  return value === 'true'
}

function mapNumberToInputValue(value: number | undefined): string {
  return value === undefined ? '' : String(value)
}

function mapPriceInputToNumber(value: string): number | undefined {
  return value === '' ? undefined : Number(value)
}

function mapInputStringToOptionalValue(value: string): string | undefined {
  const trimmedValue = value.trim()

  return trimmedValue || undefined
}
import type { TAuctionType, TTradingStatus } from '@/entities/auction/types/auction-list';

export type TAuctionFilterType = Exclude<TAuctionType, 'Unknown'>;

export type TBooleanFilterValue = '' | 'true' | 'false';

export interface IAuctionsListFilterOption<TValue extends string | number> {
  value: TValue;
  label: string;
}

export interface IAuctionsListFiltersFormValues {
  cargo_num: string;
  status: TTradingStatus[];
  statuses: number[];
  auc_type: TAuctionFilterType[];
  load_city: string;
  unload_city: string;
  load_date_from: string;
  load_date_to: string;
  is_available: TBooleanFilterValue;
  is_bidder: TBooleanFilterValue;
  current_price_from: string;
  current_price_to: string;
}

export interface IAuctionsListFiltersProps {
  values: IAuctionsListFiltersFormValues;
  isLoading?: boolean;
  onSubmit: (values: IAuctionsListFiltersFormValues) => void;
  onReset: () => void;
}

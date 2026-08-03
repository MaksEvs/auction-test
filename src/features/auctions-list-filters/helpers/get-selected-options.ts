import type { IAuctionsListFilterOption } from '@/features/auctions-list-filters/types/auctions-list-filters';

export function getSelectedOptions<TValue extends string | number>(
  options: readonly IAuctionsListFilterOption<TValue>[],
  values: readonly TValue[],
): IAuctionsListFilterOption<TValue>[] {
  const selectedValues = new Set(values);

  return options.filter((option) => selectedValues.has(option.value));
}

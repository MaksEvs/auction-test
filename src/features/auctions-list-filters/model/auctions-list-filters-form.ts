import { z } from 'zod';
import {
  AUCTION_TYPE_VALUES,
  DATE_INPUT_REGEXP,
  TRADING_STATUS_VALUES,
} from '@/features/auctions-list-filters/constants/auctions-list-filters.constants';
import type { IAuctionsListFiltersFormValues } from '@/features/auctions-list-filters/types/auctions-list-filters';

const optionalDateInputSchema = z.union([
  z.literal(''),
  z.string().regex(DATE_INPUT_REGEXP, 'Укажите корректную дату'),
]);

const optionalPriceInputSchema = z
  .string()
  .trim()
  .refine(
    (value) => value === '' || (Number.isFinite(Number(value)) && Number(value) >= 0),
    'Цена должна быть неотрицательным числом',
  );

export const auctionsListFiltersFormSchema = z
  .object({
    cargo_num: z.string().trim(),
    status: z.array(z.enum(TRADING_STATUS_VALUES)),
    statuses: z.array(z.number().int().min(1).max(7)),
    auc_type: z.array(z.enum(AUCTION_TYPE_VALUES)),
    load_city: z.string(),
    unload_city: z.string(),
    load_date_from: optionalDateInputSchema,
    load_date_to: optionalDateInputSchema,
    is_available: z.enum(['', 'true', 'false']),
    is_bidder: z.enum(['', 'true', 'false']),
    current_price_from: optionalPriceInputSchema,
    current_price_to: optionalPriceInputSchema,
  })
  .superRefine((values, context) => {
    if (
      values.load_date_from &&
      values.load_date_to &&
      values.load_date_from > values.load_date_to
    ) {
      context.addIssue({
        code: 'custom',
        path: ['load_date_to'],
        message: 'Дата «до» не может быть раньше даты «от»',
      });
    }

    if (
      values.current_price_from !== '' &&
      values.current_price_to !== '' &&
      Number(values.current_price_from) > Number(values.current_price_to)
    ) {
      context.addIssue({
        code: 'custom',
        path: ['current_price_to'],
        message: 'Цена «до» не может быть меньше цены «от»',
      });
    }
  }) satisfies z.ZodType<IAuctionsListFiltersFormValues>;

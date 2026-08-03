import { z } from 'zod';
import type {
  ISetAuctionBetConstraints,
  ISetAuctionBetFormValues,
} from '@/features/set-auction-bet/types/set-auction-bet';

export function createSetAuctionBetFormSchema(constraints: ISetAuctionBetConstraints) {
  return z.object({
    price: z
      .string()
      .trim()
      .superRefine((value, context) => {
        if (value === '') {
          context.addIssue({
            code: 'custom',
            message: 'Укажите цену ставки',
          });
          return;
        }

        const price = Number(value);

        if (!Number.isFinite(price)) {
          context.addIssue({
            code: 'custom',
            message: 'Укажите корректную цену',
          });
          return;
        }

        if (price <= 0) {
          context.addIssue({
            code: 'custom',
            message: 'Цена должна быть больше 0',
          });
          return;
        }

        if (constraints.min !== null && price < constraints.min) {
          context.addIssue({
            code: 'custom',
            message: `Цена не может быть меньше ${constraints.min}`,
          });
          return;
        }

        if (constraints.max !== null && price > constraints.max) {
          context.addIssue({
            code: 'custom',
            message: `Цена не может быть больше ${constraints.max}`,
          });
          return;
        }

        if (
          constraints.auctionType === 'Down' &&
          constraints.available !== null &&
          price > constraints.available
        ) {
          context.addIssue({
            code: 'custom',
            message: `Для аукциона на понижение ставка должна быть не больше ${constraints.available}`,
          });
          return;
        }

        if (
          constraints.auctionType === 'Up' &&
          constraints.available !== null &&
          price < constraints.available
        ) {
          context.addIssue({
            code: 'custom',
            message: `Для аукциона на повышение ставка должна быть не меньше ${constraints.available}`,
          });
          return;
        }
      }),
  }) satisfies z.ZodType<ISetAuctionBetFormValues>;
}

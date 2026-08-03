import { describe, expect, it } from 'vitest';
import { createSetAuctionBetFormSchema } from '@/features/set-auction-bet/model/create-set-auction-bet-form-schema';
import type { ISetAuctionBetConstraints } from '@/features/set-auction-bet/types/set-auction-bet';

const BASE_CONSTRAINTS: ISetAuctionBetConstraints = {
  auctionType: 'Request',
  available: null,
  min: null,
  max: null,
  step: null,
};

function getPriceErrorMessage(
  value: string,
  constraints: ISetAuctionBetConstraints = BASE_CONSTRAINTS,
): string | undefined {
  const result = createSetAuctionBetFormSchema(constraints).safeParse({
    price: value,
  });

  return result.success ? undefined : result.error.issues.at(0)?.message;
}

describe('createSetAuctionBetFormSchema', () => {
  it.each([
    ['', 'Укажите цену ставки'],
    ['not-a-number', 'Укажите корректную цену'],
    ['0', 'Цена должна быть больше 0'],
    ['-100', 'Цена должна быть больше 0'],
  ])('validates base price value %s', (value, expectedMessage) => {
    expect(getPriceErrorMessage(value)).toBe(expectedMessage);
  });

  it('validates minimum price', () => {
    expect(
      getPriceErrorMessage('999', {
        ...BASE_CONSTRAINTS,
        min: 1000,
      }),
    ).toBe('Цена не может быть меньше 1000');
  });

  it('validates maximum price', () => {
    expect(
      getPriceErrorMessage('1001', {
        ...BASE_CONSTRAINTS,
        max: 1000,
      }),
    ).toBe('Цена не может быть больше 1000');
  });

  it('validates available price for a Down auction', () => {
    expect(
      getPriceErrorMessage('1001', {
        ...BASE_CONSTRAINTS,
        auctionType: 'Down',
        available: 1000,
      }),
    ).toBe('Для аукциона на понижение ставка должна быть не больше 1000');
  });

  it('validates available price for an Up auction', () => {
    expect(
      getPriceErrorMessage('999', {
        ...BASE_CONSTRAINTS,
        auctionType: 'Up',
        available: 1000,
      }),
    ).toBe('Для аукциона на повышение ставка должна быть не меньше 1000');
  });

  it('accepts a valid boundary price', () => {
    const schema = createSetAuctionBetFormSchema({
      ...BASE_CONSTRAINTS,
      auctionType: 'Down',
      available: 1000,
      min: 1000,
      max: 2000,
      step: 100,
    });

    expect(schema.safeParse({ price: ' 1000 ' }).success).toBe(true);
  });
});

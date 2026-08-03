import { auctionBetsByAuctionUuid } from '@/app/mocks/data/auction-bets';
import { calculatePriceNoVat } from '@/app/mocks/helpers/calculate-price-no-vat';
import type { TAuctionStoreAuctionType } from '@/app/mocks/types/auction-store';
import type { IBetItem } from '@/entities/auction/types/auction-bet';

export function createBetItem(params: {
  auctionId: number;
  auctionUuid: string;
  price: number;
}): IBetItem {
  const currentBets = auctionBetsByAuctionUuid[params.auctionUuid] ?? [];
  const priceNoVat = calculatePriceNoVat(params.price);

  return {
    id: getNextBetId(),
    created_at: new Date().toISOString(),
    auction_id: params.auctionId,
    subscriber_id: 999,
    contact_name: 'Current User',
    contact_phone: '+79000000000',
    price_with_vat: params.price,
    price_no_vat: priceNoVat,
    organization_id: 999,
    organization_inn: '0000000000',
    organization_name: 'My Carrier Company',
    transporter_comment: null,
    is_rejected: false,
    is_counter: false,
    place: currentBets.length + 1,
    is_win: false,
    run_number: 0,
    cancel_reason: '',
    price_info: {
      price_with_vat: params.price,
      price_no_vat: priceNoVat,
      payment_type: 'Bank transfer with VAT',
      vat_rate: '20',
    },
  };
}

export function replaceOrInsertSubscriberBet(
  bets: IBetItem[],
  nextBet: IBetItem,
  auctionType: TAuctionStoreAuctionType,
): IBetItem[] {
  const otherSubscriberBets = bets.filter((bet) => bet.subscriber_id !== nextBet.subscriber_id);
  const nextBets = [nextBet, ...otherSubscriberBets];

  return rerankAuctionBets(nextBets, auctionType);
}

function getNextBetId(): number {
  return Object.values(auctionBetsByAuctionUuid).flat().length + 1;
}

function rerankAuctionBets(bets: IBetItem[], auctionType: TAuctionStoreAuctionType): IBetItem[] {
  if (auctionType !== 'Down' && auctionType !== 'Up') {
    return bets;
  }

  const activeBets = bets
    .filter((bet) => !bet.is_rejected)
    .sort((leftBet, rightBet) => {
      const priceDifference =
        auctionType === 'Down'
          ? leftBet.price_with_vat - rightBet.price_with_vat
          : rightBet.price_with_vat - leftBet.price_with_vat;

      if (priceDifference !== 0) {
        return priceDifference;
      }

      const createdAtDifference =
        new Date(leftBet.created_at).getTime() - new Date(rightBet.created_at).getTime();

      return createdAtDifference || leftBet.id - rightBet.id;
    })
    .map((bet, index) => ({
      ...bet,
      place: index + 1,
    }));
  const rejectedBets = bets
    .filter((bet) => bet.is_rejected)
    .map((bet) => ({
      ...bet,
      place: null,
    }));

  return [...activeBets, ...rejectedBets];
}

import { http, HttpResponse } from 'msw';
import { auctionBetsByAuctionUuid } from '@/app/mocks/data/auction-bets';
import { auctionStoreItems } from '@/app/mocks/data/auction-store';
import { filterAuctionStoreItems } from '@/app/mocks/helpers/filter-auction-store-items';
import { findAuctionStoreItemByUuid } from '@/app/mocks/helpers/find-auction-store-item-by-uuid';
import { mapAuctionStoreItemToListItem } from '@/app/mocks/helpers/map-auction-store-item-to-list-item';
import { mapAuctionStoreItemToShowResponse } from '@/app/mocks/helpers/map-auction-store-item-to-show-response';
import {
  createBetItem,
  replaceOrInsertSubscriberBet,
} from '@/app/mocks/helpers/upsert-auction-bet';
import { updateAuctionAfterBet } from '@/app/mocks/helpers/update-auction-after-bet';
import { validateSetBetPrice } from '@/app/mocks/helpers/validate-set-bet-price';
import type { IBetListResponse, ISetBetRequest } from '@/entities/auction/types/auction-bet';
import type {
  IAuctionListRequest,
  IAuctionListResponseBase,
} from '@/entities/auction/types/auction-list';
import type { IValidationProblem } from '@/shared/types/api-error';

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 20;

export const auctionHandlers = [
  http.post('/api/v1/auctions/list', async ({ request }) => {
    const body = (await request.json()) as IAuctionListRequest;
    const page = body.page ?? DEFAULT_PAGE;
    const perPage = body.per_page ?? DEFAULT_PER_PAGE;
    const filteredItems = filterAuctionStoreItems(auctionStoreItems, body);

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const data = filteredItems.slice(startIndex, endIndex).map(mapAuctionStoreItemToListItem);

    const response: IAuctionListResponseBase = {
      data,
      meta: {
        current_page: page,
        from: data.length > 0 ? startIndex + 1 : 0,
        last_page: Math.max(1, Math.ceil(filteredItems.length / perPage)),
        per_page: perPage,
        to: startIndex + data.length,
        total: filteredItems.length,
      },
    };

    return HttpResponse.json(response);
  }),

  http.get('/api/v1/auctions/:auctionUuid', ({ params }) => {
    const auctionUuid = String(params.auctionUuid);
    const auction = findAuctionStoreItemByUuid(auctionUuid);

    if (!auction) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(mapAuctionStoreItemToShowResponse(auction));
  }),

  http.get('/api/v1/auctions/:auctionUuid/bets', ({ params }) => {
    const auctionUuid = String(params.auctionUuid);
    const auction = findAuctionStoreItemByUuid(auctionUuid);

    if (!auction) {
      return new HttpResponse(null, { status: 404 });
    }

    const response: IBetListResponse = {
      bets: auctionBetsByAuctionUuid[auctionUuid] ?? [],
    };

    return HttpResponse.json(response);
  }),

  http.post('/api/v1/auctions/:auctionUuid/bets', async ({ params, request }) => {
    const auctionUuid = String(params.auctionUuid);
    const auction = findAuctionStoreItemByUuid(auctionUuid);

    if (!auction) {
      return new HttpResponse(null, { status: 404 });
    }

    const body = (await request.json()) as ISetBetRequest;
    const priceValidationError = validateSetBetPrice(auction, body.price);

    if (priceValidationError) {
      const response: IValidationProblem = {
        code: 'validation_failed',
        title: 'Ошибка валидации',
        message: 'Запрос содержит некорректные поля.',
        errors: [priceValidationError],
      };

      return HttpResponse.json(response, {
        status: 422,
        headers: { 'Content-Type': 'application/problem+json' },
      });
    }

    const newBet = createBetItem({
      auctionId: auction.main.id,
      price: body.price,
      auctionUuid,
    });

    const rankedBets = replaceOrInsertSubscriberBet(
      auctionBetsByAuctionUuid[auctionUuid] ?? [],
      newBet,
      auction.main.auc_type,
    );
    const rankedNewBet = rankedBets.find(({ id }) => id === newBet.id) ?? newBet;

    auctionBetsByAuctionUuid[auctionUuid] = rankedBets;

    updateAuctionAfterBet(auctionUuid, body.price, rankedNewBet.place);

    return HttpResponse.json(rankedNewBet);
  }),
];

import { fetchJson } from '@/shared/api/fetch-json';
import type {
  IAuctionListRequest,
  IAuctionListResponseBase,
} from '@/entities/auction/types/auction-list';

const AUCTIONS_LIST_URL = '/api/v1/auctions/list';

export function getListAuctions(
  params: IAuctionListRequest = {},
): Promise<IAuctionListResponseBase> {
  return fetchJson<IAuctionListResponseBase>(AUCTIONS_LIST_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

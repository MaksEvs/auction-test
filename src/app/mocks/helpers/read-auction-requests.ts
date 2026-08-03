import { readJsonRequest } from '@/app/mocks/helpers/read-json-request'
import type { ISetBetRequest } from '@/entities/auction/types/auction-bet'
import type { IAuctionListRequest } from '@/entities/auction/types/auction-list'

export function readAuctionListRequest(
  request: Request,
): Promise<IAuctionListRequest> {
  return readJsonRequest<IAuctionListRequest>(request, {})
}

export function readSetBetRequest(request: Request): Promise<ISetBetRequest> {
  return readJsonRequest<ISetBetRequest>(request, { price: 0 })
}
import type {
  IAuctionStoreItem,
  TAuctionStoreAuctionStatus,
} from '@/app/mocks/types/auction-store'
import type { IAuctionListRequest } from '@/entities/auction/types/auction-list'

const AUCTION_STATUS_IDS: Record<TAuctionStoreAuctionStatus, number | undefined> = {
  Planning: 1,
  Auction: 2,
  DeterminateWinner: 3,
  WaitDeal: 4,
  InProgress: 5,
  Finished: 6,
  Stopped: 7,
  Canceled: undefined,
  Unknown: undefined,
}

export function filterAuctionStoreItems(
  items: readonly IAuctionStoreItem[],
  filters: IAuctionListRequest,
): IAuctionStoreItem[] {
  return items.filter((item) => (
    matchesCargoNumber(item, filters)
    && matchesTradingStatus(item, filters)
    && matchesAuctionStatus(item, filters)
    && matchesAuctionType(item, filters)
    && matchesRoute(item, filters)
    && matchesAvailability(item, filters)
    && matchesBidder(item, filters)
    && matchesCurrentPrice(item, filters)
  ))
}

function matchesCargoNumber(item: IAuctionStoreItem, filters: IAuctionListRequest): boolean {
  if (!filters.cargo_num) {
    return true
  }

  return item.main.cargo_num.toLowerCase().includes(filters.cargo_num.toLowerCase())
}

function matchesTradingStatus(item: IAuctionStoreItem, filters: IAuctionListRequest): boolean {
  return !filters.status?.length || filters.status.includes(item.trading.status_mobile)
}

function matchesAuctionStatus(item: IAuctionStoreItem, filters: IAuctionListRequest): boolean {
  if (!filters.statuses?.length) {
    return true
  }

  const statusId = AUCTION_STATUS_IDS[item.trading.status]

  return statusId !== undefined && filters.statuses.includes(statusId)
}

function matchesAuctionType(item: IAuctionStoreItem, filters: IAuctionListRequest): boolean {
  if (!filters.auc_type?.length || item.main.auc_type === 'Unknown') {
    return !filters.auc_type?.length
  }

  return filters.auc_type.includes(item.main.auc_type)
}

function matchesRoute(item: IAuctionStoreItem, filters: IAuctionListRequest): boolean {
  const { load, unload } = item.list.route

  return (
    (!filters.load_city || load.city === filters.load_city)
    && (!filters.unload_city || unload.city === filters.unload_city)
    && (!filters.load_date_from || load.date >= filters.load_date_from)
    && (!filters.load_date_to || load.date <= filters.load_date_to)
  )
}

function matchesAvailability(item: IAuctionStoreItem, filters: IAuctionListRequest): boolean {
  return filters.is_available === undefined
    || item.list.trading.is_available === filters.is_available
}

function matchesBidder(item: IAuctionStoreItem, filters: IAuctionListRequest): boolean {
  return filters.is_bidder === undefined || item.trading.is_bidder === filters.is_bidder
}

function matchesCurrentPrice(item: IAuctionStoreItem, filters: IAuctionListRequest): boolean {
  const currentPrice = item.trading.price.current

  if (filters.current_price_from == null && filters.current_price_to == null) {
    return true
  }

  if (currentPrice === null) {
    return false
  }

  return (
    (filters.current_price_from == null || currentPrice >= filters.current_price_from)
    && (filters.current_price_to == null || currentPrice <= filters.current_price_to)
  )
}
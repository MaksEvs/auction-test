import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router';
import { AuctionBetsPage } from '@/pages/auction-bets/ui/auction-bets-page.component';
import { AuctionDetailsPage } from '@/pages/auction-details/ui/auction-details-page.component';
import { AuctionsListPage } from '@/pages/auctions-list/ui/auctions-list-page.component';
import { SetAuctionBetPage } from '@/pages/set-auction-bet/ui/set-auction-bet-page.component';
import { parseAuctionsListSearchParams } from '@/features/auctions-list-filters/model/auctions-list-search-params';
import { NotFoundPage } from '@/pages/not-found/ui/not-found-page.component';

const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: NotFoundPage,
});

const auctionsListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  validateSearch: parseAuctionsListSearchParams,
  component: AuctionsListPage,
});

const auctionDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auctions/$auctionUuid',
  component: AuctionDetailsPage,
});

const auctionBetsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auctions/$auctionUuid/bets',
  component: AuctionBetsPage,
});

const setAuctionBetRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auctions/$auctionUuid/bet',
  component: SetAuctionBetPage,
});

const routeTree = rootRoute.addChildren([
  auctionsListRoute,
  auctionDetailsRoute,
  auctionBetsRoute,
  setAuctionBetRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

declare module '@tanstack/history' {
  interface HistoryState {
    auctionsListHref?: string;
  }
}

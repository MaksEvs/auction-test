import { useLocation, useNavigate, useParams } from '@tanstack/react-router';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuctionQuery } from '@/entities/auction/api/use-auction-query';
import { parseAuctionsListSearchParams } from '@/features/auctions-list-filters/model/auctions-list-search-params';
import {
  AuctionDetailsActionsBoxStyled,
  AuctionDetailsBackButtonStyled,
  AuctionDetailsBetsHistoryButtonStyled,
  AuctionDetailsPageContainerStyled,
  AuctionDetailsSectionsBoxStyled,
} from '@/pages/auction-details/styles/auction-details.styles';
import { AuctionDetailsCargoSection } from '@/pages/auction-details/ui/auction-details-cargo-section.component';
import { AuctionDetailsHeader } from '@/pages/auction-details/ui/auction-details-header.component';
import { AuctionDetailsOrganizerSection } from '@/pages/auction-details/ui/auction-details-organizer-section.component';
import { AuctionDetailsPaymentSection } from '@/pages/auction-details/ui/auction-details-payment-section.component';
import { AuctionDetailsRouteSection } from '@/pages/auction-details/ui/auction-details-route-section.component';
import { AuctionDetailsTradingSection } from '@/pages/auction-details/ui/auction-details-trading-section.component';
import { NotFoundPage } from '@/pages/not-found/ui/not-found-page.component';
import { isApiNotFoundError } from '@/shared/api/is-api-not-found-error';

export function AuctionDetailsPage() {
  const { auctionUuid } = useParams({ from: '/auctions/$auctionUuid' });
  const auctionsListHref = useLocation({
    select: (location) => location.state.auctionsListHref,
  });
  const navigate = useNavigate({ from: '/auctions/$auctionUuid' });
  const { data: auction, error, isError, isPending } = useAuctionQuery(auctionUuid);

  function handleAuctionsListOpen() {
    if (auctionsListHref) {
      void navigate({ href: auctionsListHref });
      return;
    }

    void navigate({
      to: '/',
      search: parseAuctionsListSearchParams({ page: 1 }),
    });
  }

  function handleBetsHistoryOpen() {
    void navigate({
      to: '/auctions/$auctionUuid/bets',
      params: { auctionUuid },
      state: { auctionsListHref },
    });
  }

  function handleSetBetOpen() {
    void navigate({
      to: '/auctions/$auctionUuid/bet',
      params: { auctionUuid },
      state: { auctionsListHref },
    });
  }

  if (isPending) {
    return (
      <AuctionDetailsPageContainerStyled maxWidth="xl">
        <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </AuctionDetailsPageContainerStyled>
    );
  }

  if (isApiNotFoundError(error)) {
    return <NotFoundPage />;
  }

  if (isError || !auction) {
    return (
      <AuctionDetailsPageContainerStyled maxWidth="xl">
        <Alert severity="error">Не удалось загрузить детальную информацию об аукционе.</Alert>
      </AuctionDetailsPageContainerStyled>
    );
  }

  return (
    <AuctionDetailsPageContainerStyled maxWidth="xl">
      <AuctionDetailsBackButtonStyled onClick={handleAuctionsListOpen} variant="outlined">
        К списку аукционов
      </AuctionDetailsBackButtonStyled>

      <AuctionDetailsHeader main={auction.main} trading={auction.trading} />

      <AuctionDetailsActionsBoxStyled>
        {auction.trading.can_set_bet && (
          <AuctionDetailsBetsHistoryButtonStyled onClick={handleSetBetOpen} variant="contained">
            {auction.trading.your.bet ? 'Изменить ставку' : 'Сделать ставку'}
          </AuctionDetailsBetsHistoryButtonStyled>
        )}

        <AuctionDetailsBetsHistoryButtonStyled
          onClick={handleBetsHistoryOpen}
          variant={auction.trading.can_set_bet ? 'outlined' : 'contained'}
        >
          Смотреть ставки
        </AuctionDetailsBetsHistoryButtonStyled>
      </AuctionDetailsActionsBoxStyled>

      <AuctionDetailsSectionsBoxStyled>
        <AuctionDetailsOrganizerSection
          organizer={auction.organizer}
          contacts={auction.contacts}
          areContactsHidden={auction.trading.hide_points_address_and_contacts}
        />

        <AuctionDetailsPaymentSection payment={auction.payment} />

        <AuctionDetailsRouteSection
          routes={auction.routes}
          areAddressesAndContactsHidden={auction.trading.hide_points_address_and_contacts}
        />

        <AuctionDetailsCargoSection
          cargo={auction.cargo}
          routes={auction.routes}
          isCargoPriceHidden={auction.trading.no_view_cargo_price}
          currencyCode={auction.payment.currency_code}
        />

        <AuctionDetailsTradingSection
          auctionType={auction.main.auc_type}
          trading={auction.trading}
          currencyCode={auction.payment.currency_code}
        />
      </AuctionDetailsSectionsBoxStyled>
    </AuctionDetailsPageContainerStyled>
  );
}

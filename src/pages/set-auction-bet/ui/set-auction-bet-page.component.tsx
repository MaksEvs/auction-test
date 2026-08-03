import { useLocation, useNavigate, useParams } from '@tanstack/react-router';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useAuctionQuery } from '@/entities/auction/api/use-auction-query';
import { EAuctionTypeLabel } from '@/entities/auction/constants/auction-list-card.constants';
import { SetAuctionBetForm } from '@/features/set-auction-bet/ui/set-auction-bet-form.component';
import {
  SetAuctionBetBackButtonStyled,
  SetAuctionBetHeaderBoxStyled,
  SetAuctionBetPageContainerStyled,
  SetAuctionBetRootPaperStyled,
} from '@/pages/set-auction-bet/styles/set-auction-bet-page.styles';
import { NotFoundPage } from '@/pages/not-found/ui/not-found-page.component';
import { isApiNotFoundError } from '@/shared/api/is-api-not-found-error';

export function SetAuctionBetPage() {
  const { auctionUuid } = useParams({ from: '/auctions/$auctionUuid/bet' });
  const auctionsListHref = useLocation({
    select: (location) => location.state.auctionsListHref,
  });
  const navigate = useNavigate({ from: '/auctions/$auctionUuid/bet' });
  const auctionQuery = useAuctionQuery(auctionUuid);

  function handleAuctionOpen() {
    void navigate({
      to: '/auctions/$auctionUuid',
      params: { auctionUuid },
      state: { auctionsListHref },
    });
  }

  if (isApiNotFoundError(auctionQuery.error)) {
    return <NotFoundPage />;
  }

  return (
    <SetAuctionBetPageContainerStyled maxWidth="lg">
      <SetAuctionBetBackButtonStyled variant="text" color="inherit" onClick={handleAuctionOpen}>
        ← К аукциону
      </SetAuctionBetBackButtonStyled>

      <SetAuctionBetRootPaperStyled variant="outlined">
        {auctionQuery.isPending ? (
          <>
            <Skeleton variant="text" width="55%" height={48} />
            <Skeleton variant="text" width="35%" />
            <Skeleton variant="rounded" height={360} sx={{ mt: 3 }} />
          </>
        ) : auctionQuery.isError || !auctionQuery.data ? (
          <Alert severity="error">Не удалось загрузить информацию об аукционе.</Alert>
        ) : !auctionQuery.data.trading.can_set_bet ? (
          <Alert severity="warning">Установка ставки для этого аукциона сейчас недоступна.</Alert>
        ) : (
          <>
            <SetAuctionBetHeaderBoxStyled>
              <Typography variant="h4" component="h1">
                {auctionQuery.data.trading.your.bet ? 'Изменение ставки' : 'Новая ставка'}
              </Typography>
              <Typography color="text.secondary">
                Заявка № {auctionQuery.data.main.cargo_num}
              </Typography>
              <Typography color="text.secondary">
                Тип аукциона: {EAuctionTypeLabel[auctionQuery.data.main.auc_type]}
              </Typography>
            </SetAuctionBetHeaderBoxStyled>

            <SetAuctionBetForm
              auctionUuid={auctionUuid}
              auctionType={auctionQuery.data.main.auc_type}
              trading={auctionQuery.data.trading}
              currencyCode={auctionQuery.data.payment.currency_code}
              onCancel={handleAuctionOpen}
              onSuccess={handleAuctionOpen}
            />
          </>
        )}
      </SetAuctionBetRootPaperStyled>
    </SetAuctionBetPageContainerStyled>
  );
}

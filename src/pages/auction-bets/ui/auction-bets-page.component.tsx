import type { ReactNode } from 'react'
import { useLocation, useNavigate, useParams } from '@tanstack/react-router'
import Alert from '@mui/material/Alert'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { useAuctionBetsQuery } from '@/entities/auction/api/use-auction-bets-query'
import { useAuctionQuery } from '@/entities/auction/api/use-auction-query'
import {
  AuctionBetsBackButtonStyled,
  AuctionBetsCardsBoxStyled,
  AuctionBetsHeaderBoxStyled,
  AuctionBetsPageContainerStyled,
} from '@/pages/auction-bets/styles/auction-bets.styles'
import { AuctionBetCard } from '@/pages/auction-bets/ui/auction-bet-card.component'
import { NotFoundPage } from '@/pages/not-found/ui/not-found-page.component'
import { isApiNotFoundError } from '@/shared/api/is-api-not-found-error'

export function AuctionBetsPage() {
  const { auctionUuid } = useParams({ from: '/auctions/$auctionUuid/bets' })
  const auctionsListHref = useLocation({
    select: (location) => location.state.auctionsListHref,
  })
  const navigate = useNavigate({ from: '/auctions/$auctionUuid/bets' })
  const auctionQuery = useAuctionQuery(auctionUuid)
  const isHistoryHidden = auctionQuery.data?.trading.hide_bets_history ?? false
  const canLoadBets = auctionQuery.isSuccess && !isHistoryHidden
  const betsQuery = useAuctionBetsQuery(auctionUuid, canLoadBets)

  if (
    isApiNotFoundError(auctionQuery.error)
    || isApiNotFoundError(betsQuery.error)
  ) {
    return <NotFoundPage />
  }

  function handleAuctionOpen() {
    void navigate({
      to: '/auctions/$auctionUuid',
      params: { auctionUuid },
      state: { auctionsListHref },
    })
  }

  let content: ReactNode

  if (auctionQuery.isPending) {
    content = (
      <AuctionBetsCardsBoxStyled>
        <Skeleton variant="rounded" height={360} />
        <Skeleton variant="rounded" height={360} />
      </AuctionBetsCardsBoxStyled>
    )
  } else if (auctionQuery.isError || !auctionQuery.data) {
    content = (
      <Alert severity="error">
        Не удалось загрузить информацию об аукционе.
      </Alert>
    )
  } else if (isHistoryHidden) {
    content = (
      <Alert severity="warning">
        Организатор ограничил доступ к ставкам этого аукциона.
      </Alert>
    )
  } else if (betsQuery.isPending) {
    content = (
      <AuctionBetsCardsBoxStyled>
        <Skeleton variant="rounded" height={360} />
        <Skeleton variant="rounded" height={360} />
      </AuctionBetsCardsBoxStyled>
    )
  } else if (betsQuery.isError || !betsQuery.data) {
    content = (
      <Alert severity="error">
        Не удалось загрузить ставки.
      </Alert>
    )
  } else if (betsQuery.data.bets.length === 0) {
    content = <Alert severity="info">В этом аукционе пока нет ставок.</Alert>
  } else {
    const participantCount = new Set(
      betsQuery.data.bets.map((bet) => bet.subscriber_id),
    ).size

    content = (
      <>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Участников: {participantCount}. Ставок: {betsQuery.data.bets.length}.
        </Typography>

        <AuctionBetsCardsBoxStyled>
          {betsQuery.data.bets.map((bet) => (
            <AuctionBetCard key={bet.id} bet={bet} />
          ))}
        </AuctionBetsCardsBoxStyled>
      </>
    )
  }

  return (
    <AuctionBetsPageContainerStyled maxWidth="xl">
      <AuctionBetsBackButtonStyled
        onClick={handleAuctionOpen}
        variant="outlined"
      >
        К аукциону
      </AuctionBetsBackButtonStyled>

      <AuctionBetsHeaderBoxStyled>
        <div>
          <Typography variant="h4" component="h1">
            Ставки аукциона
          </Typography>
          {auctionQuery.data && (
            <Typography color="text.secondary">
              Заявка № {auctionQuery.data.main.cargo_num}
            </Typography>
          )}
        </div>
      </AuctionBetsHeaderBoxStyled>

      {content}
    </AuctionBetsPageContainerStyled>
  )
}
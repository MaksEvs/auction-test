import { Link, useLocation } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import {
  AUCTION_STATUS_COLORS,
  EAuctionStatusLabel,
  EAuctionTypeLabel,
  ETradingStatusLabel,
  TRADING_STATUS_COLORS,
} from '@/entities/auction/constants/auction-list-card.constants';
import { getAuctionQueryOptions } from '@/entities/auction/api/use-auction-query';
import { getAuctionListCardActionLabel } from '@/entities/auction/helpers/get-auction-list-card-action-label';
import { formatCurrencyCode } from '@/shared/helpers/format-currency-code';
import {
  AuctionListCardChipsBoxStyled,
  AuctionListCardContentStyled,
  AuctionListCardRootCardStyled,
  AuctionListCardRouteBoxStyled,
} from '@/entities/auction/styles/auction-list-card.styles';
import type { IAuctionListCardProps } from '@/entities/auction/types/auction-list-card';

const AUCTION_DETAILS_PREFETCH_STALE_TIME_MS = 10_000;

export function AuctionListCard({ auction }: IAuctionListCardProps) {
  const auctionsListHref = useLocation({ select: (location) => location.href });
  const queryClient = useQueryClient();
  const currentPrice = auction.trading.price?.current;
  const actionLabel = getAuctionListCardActionLabel(auction);

  function prefetchAuctionDetails() {
    void queryClient.prefetchQuery({
      ...getAuctionQueryOptions(auction.main.order_uid),
      staleTime: AUCTION_DETAILS_PREFETCH_STALE_TIME_MS,
    });
  }

  const actionButton = (
    <Button variant="contained" size="small" sx={{ px: 2, borderRadius: 2, fontWeight: 600 }}>
      {actionLabel}
    </Button>
  );

  return (
    <AuctionListCardRootCardStyled variant="outlined" onMouseEnter={prefetchAuctionDetails}>
      <AuctionListCardContentStyled>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
          }}
        >
          {auction.cargo.name}
        </Typography>

        <Typography color="text.secondary" variant="body2">
          Заявка № {auction.main.cargo_num}
        </Typography>

        <AuctionListCardChipsBoxStyled>
          <Chip
            label={`Тип: ${EAuctionTypeLabel[auction.main.auc_type]}`}
            size="small"
            variant="outlined"
          />
          <Chip
            label={`Этап: ${EAuctionStatusLabel[auction.trading.status]}`}
            color={AUCTION_STATUS_COLORS[auction.trading.status]}
            size="small"
          />
          <Chip
            label={`Вы: ${ETradingStatusLabel[auction.trading.status_mobile]}`}
            color={TRADING_STATUS_COLORS[auction.trading.status_mobile]}
            size="small"
            variant="outlined"
          />
        </AuctionListCardChipsBoxStyled>

        <AuctionListCardRouteBoxStyled sx={{ mt: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {auction.route.load.city}
          </Typography>
          <Typography color="text.secondary">→</Typography>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {auction.route.unload.city}
          </Typography>
        </AuctionListCardRouteBoxStyled>

        <Box sx={{ mt: 0.5, display: 'grid', gap: 0.25 }}>
          <Typography variant="body2" color="text.secondary">
            Погрузка: {auction.route.load.date}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Разгрузка: {auction.route.unload.date}
          </Typography>
        </Box>

        <Box sx={{ mt: 1, display: 'grid', gap: 0.25 }}>
          <Typography variant="body2" color="text.secondary">
            Кузов: {auction.cargo.body_type} · Машин: {auction.cargo.truck_count}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Вес: {auction.cargo.weight} т · Объём: {auction.cargo.volume} м³
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Текущая цена: {currentPrice ?? '—'} {formatCurrencyCode(auction.payment.currency_code)}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Цена за км: {auction.main.price_per_km ?? '—'}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Шаг ставки: {auction.trading.price?.start ? 'см. детали' : '—'}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Моя ставка: {auction.trading.your?.bet ? 'есть' : 'нет'}
          </Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          {auction.trading.can_set_bet ? (
            <Link
              to="/auctions/$auctionUuid/bet"
              params={{ auctionUuid: auction.main.order_uid }}
              state={{ auctionsListHref }}
              onFocus={prefetchAuctionDetails}
            >
              {actionButton}
            </Link>
          ) : (
            <Link
              to="/auctions/$auctionUuid/bets"
              params={{ auctionUuid: auction.main.order_uid }}
              state={{ auctionsListHref }}
              onFocus={prefetchAuctionDetails}
            >
              {actionButton}
            </Link>
          )}
        </Box>
      </AuctionListCardContentStyled>
    </AuctionListCardRootCardStyled>
  );
}

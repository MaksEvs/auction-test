import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import {
  AUCTION_STATUS_COLORS,
  EAuctionStatusLabel,
  EAuctionTypeLabel,
  ETradingStatusLabel,
  TRADING_STATUS_COLORS,
} from '@/entities/auction/constants/auction-list-card.constants';
import { formatAuctionDetailsDateTime } from '@/pages/auction-details/helpers/format-auction-details-value';
import {
  AuctionDetailsChipsBoxStyled,
  AuctionDetailsHeaderBoxStyled,
} from '@/pages/auction-details/styles/auction-details.styles';
import type { IAuctionDetailsHeaderProps } from '@/pages/auction-details/types/auction-details-sections';

export function AuctionDetailsHeader({ main, trading }: IAuctionDetailsHeaderProps) {
  return (
    <AuctionDetailsHeaderBoxStyled>
      <Box>
        <Typography variant="h3" component="h1" gutterBottom>
          Аукцион № {main.cargo_num}
        </Typography>

        <Typography color="text.secondary" sx={{ overflowWrap: 'anywhere' }}>
          UUID: {main.order_uid}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Дата заявки: {formatAuctionDetailsDateTime(main.cargo_date)}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Создан: {formatAuctionDetailsDateTime(main.created_at)}
        </Typography>
      </Box>

      <AuctionDetailsChipsBoxStyled>
        <Chip label={`Тип: ${EAuctionTypeLabel[main.auc_type]}`} variant="outlined" />
        <Chip
          label={EAuctionStatusLabel[trading.status]}
          color={AUCTION_STATUS_COLORS[trading.status]}
        />
        <Chip
          label={`Вы: ${ETradingStatusLabel[trading.status_mobile]}`}
          color={TRADING_STATUS_COLORS[trading.status_mobile]}
          variant="outlined"
        />
      </AuctionDetailsChipsBoxStyled>
    </AuctionDetailsHeaderBoxStyled>
  );
}

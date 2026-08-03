import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import {
  AuctionBetChipsBoxStyled,
  AuctionBetHeaderBoxStyled,
  AuctionBetRootPaperStyled,
  AuctionBetValueLabelTypographyStyled,
  AuctionBetValueRowBoxStyled,
  AuctionBetValuesBoxStyled,
} from '@/pages/auction-bets/styles/auction-bets.styles';
import type { IAuctionBetCardProps } from '@/pages/auction-bets/types/auction-bets';
import {
  formatDateTime,
  formatDisplayValue,
  formatMoney,
} from '@/shared/helpers/format-display-value';

const EMPTY_VALUE = '—';

export function AuctionBetCard({ bet }: IAuctionBetCardProps) {
  return (
    <AuctionBetRootPaperStyled variant="outlined">
      <AuctionBetHeaderBoxStyled>
        <div>
          <Typography variant="h6" component="h2">
            {formatDisplayValue(bet.organization_name, EMPTY_VALUE)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ИНН {formatDisplayValue(bet.organization_inn, EMPTY_VALUE)}
          </Typography>
        </div>

        <Typography variant="body2" color="text.secondary">
          {formatDateTime(bet.created_at, EMPTY_VALUE)}
        </Typography>
      </AuctionBetHeaderBoxStyled>

      <AuctionBetChipsBoxStyled>
        {bet.is_win && <Chip label="Победитель" color="success" size="small" />}
        {bet.is_rejected && <Chip label="Отменена" color="error" size="small" />}
        {bet.is_counter && <Chip label="Встречная" color="info" size="small" />}
      </AuctionBetChipsBoxStyled>

      <Divider />

      <AuctionBetValuesBoxStyled>
        <AuctionBetValueRowBoxStyled>
          <AuctionBetValueLabelTypographyStyled variant="body2">
            Цена с НДС
          </AuctionBetValueLabelTypographyStyled>
          <Typography>{formatMoney(bet.price_with_vat, '643', EMPTY_VALUE)}</Typography>
        </AuctionBetValueRowBoxStyled>

        <AuctionBetValueRowBoxStyled>
          <AuctionBetValueLabelTypographyStyled variant="body2">
            Цена без НДС
          </AuctionBetValueLabelTypographyStyled>
          <Typography>{formatMoney(bet.price_no_vat, '643', EMPTY_VALUE)}</Typography>
        </AuctionBetValueRowBoxStyled>

        <AuctionBetValueRowBoxStyled>
          <AuctionBetValueLabelTypographyStyled variant="body2">
            Место в рейтинге
          </AuctionBetValueLabelTypographyStyled>
          <Typography>{formatDisplayValue(bet.place, EMPTY_VALUE)}</Typography>
        </AuctionBetValueRowBoxStyled>

        <AuctionBetValueRowBoxStyled>
          <AuctionBetValueLabelTypographyStyled variant="body2">
            Тип оплаты
          </AuctionBetValueLabelTypographyStyled>
          <Typography>{formatDisplayValue(bet.price_info.payment_type, EMPTY_VALUE)}</Typography>
        </AuctionBetValueRowBoxStyled>

        <AuctionBetValueRowBoxStyled>
          <AuctionBetValueLabelTypographyStyled variant="body2">
            Ставка НДС
          </AuctionBetValueLabelTypographyStyled>
          <Typography>{formatDisplayValue(bet.price_info.vat_rate, EMPTY_VALUE)}</Typography>
        </AuctionBetValueRowBoxStyled>

        <AuctionBetValueRowBoxStyled>
          <AuctionBetValueLabelTypographyStyled variant="body2">
            Контакт
          </AuctionBetValueLabelTypographyStyled>
          <Typography>{formatDisplayValue(bet.contact_name, EMPTY_VALUE)}</Typography>
        </AuctionBetValueRowBoxStyled>

        <AuctionBetValueRowBoxStyled>
          <AuctionBetValueLabelTypographyStyled variant="body2">
            Телефон
          </AuctionBetValueLabelTypographyStyled>
          <Typography>{formatDisplayValue(bet.contact_phone, EMPTY_VALUE)}</Typography>
        </AuctionBetValueRowBoxStyled>

        <AuctionBetValueRowBoxStyled>
          <AuctionBetValueLabelTypographyStyled variant="body2">
            Комментарий
          </AuctionBetValueLabelTypographyStyled>
          <Typography>{formatDisplayValue(bet.transporter_comment, EMPTY_VALUE)}</Typography>
        </AuctionBetValueRowBoxStyled>

        {bet.is_rejected && (
          <AuctionBetValueRowBoxStyled>
            <AuctionBetValueLabelTypographyStyled variant="body2">
              Причина отмены
            </AuctionBetValueLabelTypographyStyled>
            <Typography color="error.main">
              {formatDisplayValue(bet.cancel_reason, EMPTY_VALUE)}
            </Typography>
          </AuctionBetValueRowBoxStyled>
        )}
      </AuctionBetValuesBoxStyled>
    </AuctionBetRootPaperStyled>
  );
}

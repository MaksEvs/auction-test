import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import {
  formatAuctionBetDateTime,
  formatAuctionBetMoney,
  formatAuctionBetValue,
} from '@/pages/auction-bets/helpers/format-auction-bet-value'
import {
  AuctionBetChipsBoxStyled,
  AuctionBetHeaderBoxStyled,
  AuctionBetRootPaperStyled,
  AuctionBetValueLabelTypographyStyled,
  AuctionBetValueRowBoxStyled,
  AuctionBetValuesBoxStyled,
} from '@/pages/auction-bets/styles/auction-bets.styles'
import type { IAuctionBetCardProps } from '@/pages/auction-bets/types/auction-bets'

export function AuctionBetCard({ bet }: IAuctionBetCardProps) {
  return (
    <AuctionBetRootPaperStyled variant="outlined">
      <AuctionBetHeaderBoxStyled>
        <div>
          <Typography variant="h6" component="h2">
            {formatAuctionBetValue(bet.organization_name)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ИНН {formatAuctionBetValue(bet.organization_inn)}
          </Typography>
        </div>

        <Typography variant="body2" color="text.secondary">
          {formatAuctionBetDateTime(bet.created_at)}
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
          <Typography>{formatAuctionBetMoney(bet.price_with_vat)}</Typography>
        </AuctionBetValueRowBoxStyled>

        <AuctionBetValueRowBoxStyled>
          <AuctionBetValueLabelTypographyStyled variant="body2">
            Цена без НДС
          </AuctionBetValueLabelTypographyStyled>
          <Typography>{formatAuctionBetMoney(bet.price_no_vat)}</Typography>
        </AuctionBetValueRowBoxStyled>

        <AuctionBetValueRowBoxStyled>
          <AuctionBetValueLabelTypographyStyled variant="body2">
            Место в рейтинге
          </AuctionBetValueLabelTypographyStyled>
          <Typography>{formatAuctionBetValue(bet.place)}</Typography>
        </AuctionBetValueRowBoxStyled>

        <AuctionBetValueRowBoxStyled>
          <AuctionBetValueLabelTypographyStyled variant="body2">
            Тип оплаты
          </AuctionBetValueLabelTypographyStyled>
          <Typography>{formatAuctionBetValue(bet.price_info.payment_type)}</Typography>
        </AuctionBetValueRowBoxStyled>

        <AuctionBetValueRowBoxStyled>
          <AuctionBetValueLabelTypographyStyled variant="body2">
            Ставка НДС
          </AuctionBetValueLabelTypographyStyled>
          <Typography>{formatAuctionBetValue(bet.price_info.vat_rate)}</Typography>
        </AuctionBetValueRowBoxStyled>

        <AuctionBetValueRowBoxStyled>
          <AuctionBetValueLabelTypographyStyled variant="body2">
            Контакт
          </AuctionBetValueLabelTypographyStyled>
          <Typography>{formatAuctionBetValue(bet.contact_name)}</Typography>
        </AuctionBetValueRowBoxStyled>

        <AuctionBetValueRowBoxStyled>
          <AuctionBetValueLabelTypographyStyled variant="body2">
            Телефон
          </AuctionBetValueLabelTypographyStyled>
          <Typography>{formatAuctionBetValue(bet.contact_phone)}</Typography>
        </AuctionBetValueRowBoxStyled>

        <AuctionBetValueRowBoxStyled>
          <AuctionBetValueLabelTypographyStyled variant="body2">
            Комментарий
          </AuctionBetValueLabelTypographyStyled>
          <Typography>{formatAuctionBetValue(bet.transporter_comment)}</Typography>
        </AuctionBetValueRowBoxStyled>

        {bet.is_rejected && (
          <AuctionBetValueRowBoxStyled>
            <AuctionBetValueLabelTypographyStyled variant="body2">
              Причина отмены
            </AuctionBetValueLabelTypographyStyled>
            <Typography color="error.main">
              {formatAuctionBetValue(bet.cancel_reason)}
            </Typography>
          </AuctionBetValueRowBoxStyled>
        )}
      </AuctionBetValuesBoxStyled>
    </AuctionBetRootPaperStyled>
  )
}
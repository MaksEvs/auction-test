import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { EAuctionTypeLabel } from '@/entities/auction/constants/auction-list-card.constants'
import {
  AUCTION_TRADING_SETTING_LABELS,
  EAuctionBidMeasurementTypeLabel,
} from '@/pages/auction-details/constants/auction-details.constants'
import {
  formatAuctionDetailsDateTime,
  formatAuctionDetailsMoney,
  formatAuctionDetailsValue,
  formatAuctionDetailsValueWithUnit,
} from '@/pages/auction-details/helpers/format-auction-details-value'
import {
  AuctionDetailsChipsBoxStyled,
  AuctionDetailsCompactValuesBoxStyled,
  AuctionDetailsFullWidthSectionPaperStyled,
  AuctionDetailsValueLabelTypographyStyled,
  AuctionDetailsValueRowBoxStyled,
} from '@/pages/auction-details/styles/auction-details.styles'
import type { IAuctionDetailsTradingSectionProps } from '@/pages/auction-details/types/auction-details-sections'

export function AuctionDetailsTradingSection({
  auctionType,
  trading,
  currencyCode,
}: IAuctionDetailsTradingSectionProps) {
  return (
    <AuctionDetailsFullWidthSectionPaperStyled variant="outlined">
      <Typography variant="h5" component="h2">
        Торги и ставка
      </Typography>

      <AuctionDetailsChipsBoxStyled>
        <Chip
          label={trading.can_set_bet ? 'Ставка доступна' : 'Ставка недоступна'}
          color={trading.can_set_bet ? 'success' : 'default'}
        />
        <Chip
          label={
            trading.allow_counter_bets
              ? 'Контрставки разрешены'
              : 'Контрставки запрещены'
          }
          variant="outlined"
        />
        {trading.your.win && <Chip label="Вы победитель" color="success" />}
      </AuctionDetailsChipsBoxStyled>

      {trading.no_view_cargo_price && (
        <Alert severity="info">
          Организатор ограничил просмотр ценовых данных груза.
        </Alert>
      )}

      {trading.hide_bets_history && (
        <Alert severity="info">
          История ставок скрыта. На странице отображается только доступное текущее состояние.
        </Alert>
      )}

      <AuctionDetailsCompactValuesBoxStyled>
        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Начало торгов
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{formatAuctionDetailsDateTime(trading.start_time)}</Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Окончание торгов
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{formatAuctionDetailsDateTime(trading.stop_time)}</Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Единица ставки
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>
            {trading.bid_measurement_type
              ? EAuctionBidMeasurementTypeLabel[trading.bid_measurement_type]
              : formatAuctionDetailsValue(null)}
          </Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Участник торгов
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{trading.is_bidder ? 'Да' : 'Нет'}</Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Тип аукциона
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{EAuctionTypeLabel[auctionType]}</Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            В избранном
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{trading.is_favorite ? 'Да' : 'Нет'}</Typography>
        </AuctionDetailsValueRowBoxStyled>
      </AuctionDetailsCompactValuesBoxStyled>

      <Divider />

      <Typography variant="h6" component="h3">
        Цены с НДС
      </Typography>

      <AuctionDetailsCompactValuesBoxStyled>
        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Начальная цена
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{formatAuctionDetailsMoney(trading.price.start, currencyCode)}</Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Текущая цена
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{formatAuctionDetailsMoney(trading.price.current, currencyCode)}</Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Доступная ставка
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>
            {formatAuctionDetailsMoney(trading.price.available, currencyCode)}
          </Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Минимальная ставка
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{formatAuctionDetailsMoney(trading.price.min, currencyCode)}</Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Максимальная ставка
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{formatAuctionDetailsMoney(trading.price.max, currencyCode)}</Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Шаг ставки
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{formatAuctionDetailsMoney(trading.price.step, currencyCode)}</Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Цена за км
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>
            {formatAuctionDetailsMoney(trading.price.price_per_km, currencyCode)}
          </Typography>
        </AuctionDetailsValueRowBoxStyled>
      </AuctionDetailsCompactValuesBoxStyled>

      <Divider />

      <Typography variant="h6" component="h3">
        Цены без НДС
      </Typography>

      <AuctionDetailsCompactValuesBoxStyled>
        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Начальная цена
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>
            {formatAuctionDetailsMoney(trading.price.start_no_vat, currencyCode)}
          </Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Текущая цена
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>
            {formatAuctionDetailsMoney(trading.price.current_no_vat, currencyCode)}
          </Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Доступная ставка
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>
            {formatAuctionDetailsMoney(
              trading.price.available_no_vat,
              currencyCode,
            )}
          </Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Шаг ставки
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>
            {formatAuctionDetailsMoney(trading.price.step_no_vat, currencyCode)}
          </Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Минимальная ставка
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>
            {formatAuctionDetailsMoney(trading.price.min_no_vat, currencyCode)}
          </Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Максимальная ставка
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>
            {formatAuctionDetailsMoney(trading.price.max_no_vat, currencyCode)}
          </Typography>
        </AuctionDetailsValueRowBoxStyled>
      </AuctionDetailsCompactValuesBoxStyled>

      <Divider />

      <Typography variant="h6" component="h3">
        Моя ставка
      </Typography>

      <AuctionDetailsCompactValuesBoxStyled>
        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Ставка сделана
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{trading.your.bet ? 'Да' : 'Нет'}</Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Последняя ставка без НДС
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>
            {formatAuctionDetailsMoney(trading.your.last_bet, currencyCode)}
          </Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Последняя ставка с НДС
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>
            {formatAuctionDetailsMoney(trading.your.last_bet_with_vat, currencyCode)}
          </Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Победа
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{trading.your.win ? 'Да' : 'Нет'}</Typography>
        </AuctionDetailsValueRowBoxStyled>
      </AuctionDetailsCompactValuesBoxStyled>

      <Divider />

      <Typography variant="h6" component="h3">
        Настройки торгов
      </Typography>

      <AuctionDetailsCompactValuesBoxStyled>
        {AUCTION_TRADING_SETTING_LABELS.map(({ key, label, unit }) => (
          <AuctionDetailsValueRowBoxStyled key={key}>
            <AuctionDetailsValueLabelTypographyStyled>
              {label}
            </AuctionDetailsValueLabelTypographyStyled>
            <Typography>
              {formatAuctionDetailsValueWithUnit(trading.settings[key], unit)}
            </Typography>
          </AuctionDetailsValueRowBoxStyled>
        ))}
      </AuctionDetailsCompactValuesBoxStyled>
    </AuctionDetailsFullWidthSectionPaperStyled>
  )
}
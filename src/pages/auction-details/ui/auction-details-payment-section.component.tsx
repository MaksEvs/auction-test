import Typography from '@mui/material/Typography';
import { EAuctionPaymentDelayTypeLabel } from '@/pages/auction-details/constants/auction-details.constants';
import {
  formatAuctionDetailsValue,
  formatAuctionDetailsValueWithUnit,
} from '@/pages/auction-details/helpers/format-auction-details-value';
import {
  AuctionDetailsSectionPaperStyled,
  AuctionDetailsValueLabelTypographyStyled,
  AuctionDetailsValueRowBoxStyled,
  AuctionDetailsValuesBoxStyled,
} from '@/pages/auction-details/styles/auction-details.styles';
import type { IAuctionDetailsPaymentSectionProps } from '@/pages/auction-details/types/auction-details-sections';
import { formatCurrencyCode } from '@/shared/helpers/format-currency-code';

export function AuctionDetailsPaymentSection({ payment }: IAuctionDetailsPaymentSectionProps) {
  const delayUnit = EAuctionPaymentDelayTypeLabel[payment.delay_type];

  return (
    <AuctionDetailsSectionPaperStyled variant="outlined">
      <Typography variant="h5" component="h2">
        Условия оплаты
      </Typography>

      <AuctionDetailsValuesBoxStyled>
        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Форма оплаты
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{formatAuctionDetailsValue(payment.form)}</Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Условие оплаты
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{formatAuctionDetailsValue(payment.condition)}</Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Код условия
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{formatAuctionDetailsValue(payment.condition_predefined)}</Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Предоплата
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{formatAuctionDetailsValueWithUnit(payment.prepay, '%')}</Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Отсрочка
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{formatAuctionDetailsValueWithUnit(payment.delay, delayUnit)}</Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Валюта
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{formatCurrencyCode(payment.currency_code)}</Typography>
        </AuctionDetailsValueRowBoxStyled>
      </AuctionDetailsValuesBoxStyled>
    </AuctionDetailsSectionPaperStyled>
  );
}

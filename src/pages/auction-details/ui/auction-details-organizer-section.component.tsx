import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { formatAuctionDetailsValue } from '@/pages/auction-details/helpers/format-auction-details-value'
import {
  AuctionDetailsSectionPaperStyled,
  AuctionDetailsValueLabelTypographyStyled,
  AuctionDetailsValueRowBoxStyled,
  AuctionDetailsValuesBoxStyled,
} from '@/pages/auction-details/styles/auction-details.styles'
import type { IAuctionDetailsOrganizerSectionProps } from '@/pages/auction-details/types/auction-details-sections'

export function AuctionDetailsOrganizerSection({
  organizer,
  contacts,
  areContactsHidden,
}: IAuctionDetailsOrganizerSectionProps) {
  return (
    <AuctionDetailsSectionPaperStyled variant="outlined">
      <Typography variant="h5" component="h2">
        Организатор
      </Typography>

      <AuctionDetailsValuesBoxStyled>
        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Организация
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{formatAuctionDetailsValue(organizer.organization_name)}</Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            ИНН
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{formatAuctionDetailsValue(organizer.organization_inn)}</Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            КПП
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{formatAuctionDetailsValue(organizer.organization_kpp)}</Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Код подписчика
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{formatAuctionDetailsValue(organizer.subscriber_code)}</Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Код инфобазы
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{formatAuctionDetailsValue(organizer.infobase_code)}</Typography>
        </AuctionDetailsValueRowBoxStyled>
      </AuctionDetailsValuesBoxStyled>

      <Divider />

      <Typography variant="h6" component="h3">
        Контакты
      </Typography>

      {areContactsHidden ? (
        <Alert severity="info">
          Контактные данные скрыты организатором до выполнения условий аукциона.
        </Alert>
      ) : contacts.length === 0 ? (
        <Alert severity="info">Контактные данные не указаны.</Alert>
      ) : (
        <AuctionDetailsValuesBoxStyled>
          {contacts.map((contact, index) => (
            <AuctionDetailsValuesBoxStyled key={contact.uid ?? index}>
              <Typography variant="subtitle2">
                Контакт {index + 1}
              </Typography>

              <AuctionDetailsValueRowBoxStyled>
                <AuctionDetailsValueLabelTypographyStyled>
                  Имя
                </AuctionDetailsValueLabelTypographyStyled>
                <Typography>{formatAuctionDetailsValue(contact.name)}</Typography>
              </AuctionDetailsValueRowBoxStyled>

              <AuctionDetailsValueRowBoxStyled>
                <AuctionDetailsValueLabelTypographyStyled>
                  Телефон
                </AuctionDetailsValueLabelTypographyStyled>
                <Typography>{formatAuctionDetailsValue(contact.phone)}</Typography>
              </AuctionDetailsValueRowBoxStyled>

              <AuctionDetailsValueRowBoxStyled>
                <AuctionDetailsValueLabelTypographyStyled>
                  Рабочий телефон
                </AuctionDetailsValueLabelTypographyStyled>
                <Typography>{formatAuctionDetailsValue(contact.work_phone)}</Typography>
              </AuctionDetailsValueRowBoxStyled>

              <AuctionDetailsValueRowBoxStyled>
                <AuctionDetailsValueLabelTypographyStyled>
                  Email
                </AuctionDetailsValueLabelTypographyStyled>
                <Typography sx={{ overflowWrap: 'anywhere' }}>
                  {formatAuctionDetailsValue(contact.email)}
                </Typography>
              </AuctionDetailsValueRowBoxStyled>
            </AuctionDetailsValuesBoxStyled>
          ))}
        </AuctionDetailsValuesBoxStyled>
      )}
    </AuctionDetailsSectionPaperStyled>
  )
}
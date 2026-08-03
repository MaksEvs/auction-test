import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { EAuctionOperationTypeLabel } from '@/pages/auction-details/constants/auction-details.constants';
import {
  formatAuctionDetailsDateTime,
  formatAuctionDetailsValue,
  formatAuctionDetailsValueWithUnit,
} from '@/pages/auction-details/helpers/format-auction-details-value';
import {
  AuctionDetailsChipsBoxStyled,
  AuctionDetailsCompactValuesBoxStyled,
  AuctionDetailsFullWidthSectionPaperStyled,
  AuctionDetailsRoutePointPaperStyled,
  AuctionDetailsRoutePointsBoxStyled,
  AuctionDetailsValueLabelTypographyStyled,
  AuctionDetailsValueRowBoxStyled,
} from '@/pages/auction-details/styles/auction-details.styles';
import type { IAuctionDetailsRouteSectionProps } from '@/pages/auction-details/types/auction-details-sections';

export function AuctionDetailsRouteSection({
  routes,
  areAddressesAndContactsHidden,
}: IAuctionDetailsRouteSectionProps) {
  return (
    <AuctionDetailsFullWidthSectionPaperStyled variant="outlined">
      <Typography variant="h5" component="h2">
        Маршрут
      </Typography>

      {areAddressesAndContactsHidden && (
        <Alert severity="info">Точные адреса и контакты точек маршрута скрыты организатором.</Alert>
      )}

      {routes.length === 0 ? (
        <Alert severity="info">Точки маршрута не указаны.</Alert>
      ) : (
        <AuctionDetailsRoutePointsBoxStyled>
          {routes.map((routePoint) => (
            <AuctionDetailsRoutePointPaperStyled key={routePoint.row_num} variant="outlined">
              <AuctionDetailsChipsBoxStyled>
                <Chip
                  label={`${routePoint.row_num}. ${EAuctionOperationTypeLabel[routePoint.op_type]}`}
                  color={routePoint.op_type === 'Loading' ? 'primary' : 'secondary'}
                  size="small"
                />
                {routePoint.cargo.oversized && (
                  <Chip label="Негабаритный груз" color="warning" size="small" />
                )}
              </AuctionDetailsChipsBoxStyled>

              <Typography variant="h6" component="h3">
                {formatAuctionDetailsValue(routePoint.location.city_full_name)}
              </Typography>

              <AuctionDetailsCompactValuesBoxStyled>
                <AuctionDetailsValueRowBoxStyled>
                  <AuctionDetailsValueLabelTypographyStyled>
                    Начало
                  </AuctionDetailsValueLabelTypographyStyled>
                  <Typography>{formatAuctionDetailsDateTime(routePoint.start_date)}</Typography>
                </AuctionDetailsValueRowBoxStyled>

                <AuctionDetailsValueRowBoxStyled>
                  <AuctionDetailsValueLabelTypographyStyled>
                    Окончание
                  </AuctionDetailsValueLabelTypographyStyled>
                  <Typography>{formatAuctionDetailsDateTime(routePoint.end_date)}</Typography>
                </AuctionDetailsValueRowBoxStyled>

                {!areAddressesAndContactsHidden && (
                  <>
                    <AuctionDetailsValueRowBoxStyled>
                      <AuctionDetailsValueLabelTypographyStyled>
                        Адрес
                      </AuctionDetailsValueLabelTypographyStyled>
                      <Typography>
                        {formatAuctionDetailsValue(routePoint.location.loading_address)}
                      </Typography>
                    </AuctionDetailsValueRowBoxStyled>

                    <AuctionDetailsValueRowBoxStyled>
                      <AuctionDetailsValueLabelTypographyStyled>
                        Контрагент
                      </AuctionDetailsValueLabelTypographyStyled>
                      <Typography>{formatAuctionDetailsValue(routePoint.contractor)}</Typography>
                    </AuctionDetailsValueRowBoxStyled>

                    <AuctionDetailsValueRowBoxStyled>
                      <AuctionDetailsValueLabelTypographyStyled>
                        ИНН контрагента
                      </AuctionDetailsValueLabelTypographyStyled>
                      <Typography>
                        {formatAuctionDetailsValue(routePoint.contractor_inn)}
                      </Typography>
                    </AuctionDetailsValueRowBoxStyled>

                    <AuctionDetailsValueRowBoxStyled>
                      <AuctionDetailsValueLabelTypographyStyled>
                        Контакт
                      </AuctionDetailsValueLabelTypographyStyled>
                      <Typography>
                        {formatAuctionDetailsValue(routePoint.contact.name)} ·{' '}
                        {formatAuctionDetailsValue(routePoint.contact.phone)}
                      </Typography>
                    </AuctionDetailsValueRowBoxStyled>
                  </>
                )}
              </AuctionDetailsCompactValuesBoxStyled>

              <Divider />

              <AuctionDetailsCompactValuesBoxStyled>
                <AuctionDetailsValueRowBoxStyled>
                  <AuctionDetailsValueLabelTypographyStyled>
                    Груз
                  </AuctionDetailsValueLabelTypographyStyled>
                  <Typography>{formatAuctionDetailsValue(routePoint.cargo.name)}</Typography>
                </AuctionDetailsValueRowBoxStyled>

                <AuctionDetailsValueRowBoxStyled>
                  <AuctionDetailsValueLabelTypographyStyled>
                    Упаковка
                  </AuctionDetailsValueLabelTypographyStyled>
                  <Typography>
                    {formatAuctionDetailsValue(routePoint.cargo.package_name)}
                  </Typography>
                </AuctionDetailsValueRowBoxStyled>

                <AuctionDetailsValueRowBoxStyled>
                  <AuctionDetailsValueLabelTypographyStyled>
                    Вес
                  </AuctionDetailsValueLabelTypographyStyled>
                  <Typography>
                    {formatAuctionDetailsValueWithUnit(routePoint.cargo.weight, 'т')}
                  </Typography>
                </AuctionDetailsValueRowBoxStyled>

                <AuctionDetailsValueRowBoxStyled>
                  <AuctionDetailsValueLabelTypographyStyled>
                    Объём
                  </AuctionDetailsValueLabelTypographyStyled>
                  <Typography>
                    {formatAuctionDetailsValueWithUnit(routePoint.cargo.volume, 'м³')}
                  </Typography>
                </AuctionDetailsValueRowBoxStyled>

                <AuctionDetailsValueRowBoxStyled>
                  <AuctionDetailsValueLabelTypographyStyled>
                    Количество мест
                  </AuctionDetailsValueLabelTypographyStyled>
                  <Typography>
                    {formatAuctionDetailsValue(routePoint.cargo.package_amount)}
                  </Typography>
                </AuctionDetailsValueRowBoxStyled>

                <AuctionDetailsValueRowBoxStyled>
                  <AuctionDetailsValueLabelTypographyStyled>
                    Комментарий
                  </AuctionDetailsValueLabelTypographyStyled>
                  <Typography>{formatAuctionDetailsValue(routePoint.comment)}</Typography>
                </AuctionDetailsValueRowBoxStyled>
              </AuctionDetailsCompactValuesBoxStyled>
            </AuctionDetailsRoutePointPaperStyled>
          ))}
        </AuctionDetailsRoutePointsBoxStyled>
      )}
    </AuctionDetailsFullWidthSectionPaperStyled>
  );
}

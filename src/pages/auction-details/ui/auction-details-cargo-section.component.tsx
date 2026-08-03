import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import {
  AUCTION_DOCUMENT_LABELS,
  AUCTION_LOADING_TYPE_LABELS,
  AUCTION_VEHICLE_REQUIREMENT_LABELS,
} from '@/pages/auction-details/constants/auction-details.constants';
import {
  formatAuctionDetailsMoney,
  formatAuctionDetailsValue,
  formatAuctionDetailsValueWithUnit,
} from '@/pages/auction-details/helpers/format-auction-details-value';
import {
  AuctionDetailsCargoOptionBoxStyled,
  AuctionDetailsCargoOptionsGridStyled,
  AuctionDetailsChipsBoxStyled,
  AuctionDetailsCompactValuesBoxStyled,
  AuctionDetailsFullWidthSectionPaperStyled,
  AuctionDetailsValueLabelTypographyStyled,
  AuctionDetailsValueRowBoxStyled,
} from '@/pages/auction-details/styles/auction-details.styles';
import type { IAuctionDetailsCargoSectionProps } from '@/pages/auction-details/types/auction-details-sections';

export function AuctionDetailsCargoSection({
  cargo,
  routes,
  isCargoPriceHidden,
  currencyCode,
}: IAuctionDetailsCargoSectionProps) {
  const cargoPrice = cargo.price.trim().length > 0 ? Number(cargo.price) : null;
  const hasAdditionalRequirements =
    (cargo.adr !== null && cargo.adr > 0) ||
    (cargo.conics !== null && cargo.conics > 0) ||
    (cargo.belts !== null && cargo.belts > 0) ||
    cargo.coupling ||
    cargo.air_pass ||
    cargo.low_loader ||
    cargo.additional_load;
  const activeLoadingTypes = AUCTION_LOADING_TYPE_LABELS.filter(
    ({ key }) => cargo.loading_types[key],
  );
  const activeDocuments = AUCTION_DOCUMENT_LABELS.filter(({ key }) => cargo.docs[key]);

  return (
    <AuctionDetailsFullWidthSectionPaperStyled variant="outlined">
      <Typography variant="h5" component="h2">
        Груз и транспорт
      </Typography>

      <AuctionDetailsCompactValuesBoxStyled>
        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Наименование груза
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{formatAuctionDetailsValue(routes[0]?.cargo.name)}</Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Стоимость груза
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>
            {isCargoPriceHidden
              ? 'Скрыта организатором'
              : formatAuctionDetailsMoney(cargoPrice, currencyCode)}
          </Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Расстояние
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{formatAuctionDetailsValueWithUnit(cargo.distance, 'км')}</Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Количество машин
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{formatAuctionDetailsValue(cargo.truck_count)}</Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Тип кузова
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{formatAuctionDetailsValue(cargo.body_type)}</Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Температурный режим
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>
            {formatAuctionDetailsValueWithUnit(cargo.temp_from, '°C')} —{' '}
            {formatAuctionDetailsValueWithUnit(cargo.temp_to, '°C')}
          </Typography>
        </AuctionDetailsValueRowBoxStyled>

        <AuctionDetailsValueRowBoxStyled>
          <AuctionDetailsValueLabelTypographyStyled>
            Международная перевозка
          </AuctionDetailsValueLabelTypographyStyled>
          <Typography>{cargo.is_international ? 'Да' : 'Нет'}</Typography>
        </AuctionDetailsValueRowBoxStyled>
      </AuctionDetailsCompactValuesBoxStyled>

      <Divider />

      <AuctionDetailsCargoOptionsGridStyled>
        <AuctionDetailsCargoOptionBoxStyled>
          <Typography variant="h6" component="h3">
            Дополнительные требования
          </Typography>
          {hasAdditionalRequirements ? (
            <AuctionDetailsChipsBoxStyled>
              {cargo.adr !== null && cargo.adr > 0 && (
                <Chip label={`ADR: ${cargo.adr}`} size="small" color="warning" />
              )}
              {cargo.conics !== null && cargo.conics > 0 && (
                <Chip label={`Коники: ${cargo.conics}`} size="small" />
              )}
              {cargo.belts !== null && cargo.belts > 0 && (
                <Chip label={`Ремни: ${cargo.belts}`} size="small" />
              )}
              {cargo.coupling && <Chip label="Сцепка" size="small" />}
              {cargo.air_pass && <Chip label="Пневмоподвеска" size="small" />}
              {cargo.low_loader && <Chip label="Низкорамный трал" size="small" />}
              {cargo.additional_load && <Chip label="Догруз" size="small" />}
            </AuctionDetailsChipsBoxStyled>
          ) : (
            <Alert severity="info">Дополнительные требования не указаны.</Alert>
          )}
        </AuctionDetailsCargoOptionBoxStyled>

        <AuctionDetailsCargoOptionBoxStyled>
          <Typography variant="h6" component="h3">
            Способы загрузки
          </Typography>
          {activeLoadingTypes.length > 0 ? (
            <AuctionDetailsChipsBoxStyled>
              {activeLoadingTypes.map(({ key, label }) => (
                <Chip key={key} label={label} size="small" />
              ))}
            </AuctionDetailsChipsBoxStyled>
          ) : (
            <Alert severity="info">Способы загрузки не указаны.</Alert>
          )}
        </AuctionDetailsCargoOptionBoxStyled>

        <AuctionDetailsCargoOptionBoxStyled>
          <Typography variant="h6" component="h3">
            Документы
          </Typography>
          {activeDocuments.length > 0 ? (
            <AuctionDetailsChipsBoxStyled>
              {activeDocuments.map(({ key, label }) => (
                <Chip key={key} label={label} size="small" />
              ))}
            </AuctionDetailsChipsBoxStyled>
          ) : (
            <Alert severity="info">Документы не указаны.</Alert>
          )}
        </AuctionDetailsCargoOptionBoxStyled>

        <AuctionDetailsCargoOptionBoxStyled>
          <Typography variant="h6" component="h3">
            Контейнер
          </Typography>
          {cargo.containered ? (
            <AuctionDetailsCompactValuesBoxStyled>
              <AuctionDetailsValueRowBoxStyled>
                <AuctionDetailsValueLabelTypographyStyled>
                  Тип
                </AuctionDetailsValueLabelTypographyStyled>
                <Typography>{formatAuctionDetailsValue(cargo.container_type)}</Typography>
              </AuctionDetailsValueRowBoxStyled>
              <AuctionDetailsValueRowBoxStyled>
                <AuctionDetailsValueLabelTypographyStyled>
                  Размер
                </AuctionDetailsValueLabelTypographyStyled>
                <Typography>{formatAuctionDetailsValue(cargo.container_size)}</Typography>
              </AuctionDetailsValueRowBoxStyled>
            </AuctionDetailsCompactValuesBoxStyled>
          ) : (
            <Alert severity="info">Контейнер не требуется.</Alert>
          )}
        </AuctionDetailsCargoOptionBoxStyled>
      </AuctionDetailsCargoOptionsGridStyled>

      <Divider />

      <Typography variant="h6" component="h3">
        Требования к ТС
      </Typography>

      {cargo.car ? (
        <AuctionDetailsCompactValuesBoxStyled>
          <AuctionDetailsValueRowBoxStyled>
            <AuctionDetailsValueLabelTypographyStyled>
              Тип ТС
            </AuctionDetailsValueLabelTypographyStyled>
            <Typography>{formatAuctionDetailsValue(cargo.car.type)}</Typography>
          </AuctionDetailsValueRowBoxStyled>

          {AUCTION_VEHICLE_REQUIREMENT_LABELS.map(({ key, label, unit }) => (
            <AuctionDetailsValueRowBoxStyled key={key}>
              <AuctionDetailsValueLabelTypographyStyled>
                {label}
              </AuctionDetailsValueLabelTypographyStyled>
              <Typography>{formatAuctionDetailsValueWithUnit(cargo.car?.[key], unit)}</Typography>
            </AuctionDetailsValueRowBoxStyled>
          ))}
        </AuctionDetailsCompactValuesBoxStyled>
      ) : (
        <Alert severity="info">Дополнительные требования к ТС не указаны.</Alert>
      )}
    </AuctionDetailsFullWidthSectionPaperStyled>
  );
}

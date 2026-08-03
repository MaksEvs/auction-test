import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useSetAuctionBetMutation } from '@/entities/auction/api/use-set-auction-bet-mutation'
import { mapSetAuctionBetFormValuesToRequest } from '@/features/set-auction-bet/helpers/map-set-auction-bet-form-values-to-request'
import { createSetAuctionBetFormSchema } from '@/features/set-auction-bet/model/create-set-auction-bet-form-schema'
import {
  SetAuctionBetActionsBoxStyled,
  SetAuctionBetFormStyled,
  SetAuctionBetSummaryBoxStyled,
  SetAuctionBetSummaryItemStyled,
} from '@/features/set-auction-bet/styles/set-auction-bet-form.styles'
import type {
  ISetAuctionBetConstraints,
  ISetAuctionBetFormProps,
  ISetAuctionBetFormValues,
} from '@/features/set-auction-bet/types/set-auction-bet'
import { isApiValidationError } from '@/shared/api/is-api-validation-error'
import { formatCurrencyCode } from '@/shared/helpers/format-currency-code'
import { formatMoney } from '@/shared/helpers/format-display-value'
import { useNotificationStore } from '@/shared/model/notification-store'

export function SetAuctionBetForm({
  auctionUuid,
  auctionType,
  trading,
  currencyCode,
  onCancel,
  onSuccess,
}: ISetAuctionBetFormProps) {
  const constraints = useMemo<ISetAuctionBetConstraints>(() => ({
    auctionType,
    available: trading.price.available,
    min: trading.price.min,
    max: trading.price.max,
    step: trading.price.step,
  }), [auctionType, trading.price])
  const schema = useMemo(
    () => createSetAuctionBetFormSchema(constraints),
    [constraints],
  )
  const defaultPrice = trading.your.bet
    ? trading.your.last_bet_with_vat
      ?? trading.your.last_bet
      ?? trading.price.available
    : trading.price.available
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ISetAuctionBetFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      price: defaultPrice === null ? '' : String(defaultPrice),
    },
  })
  const setAuctionBetMutation = useSetAuctionBetMutation({ auctionUuid })
  const queryClient = useQueryClient()
  const showNotification = useNotificationStore(
    (state) => state.showNotification,
  )
  const measurementLabel = trading.bid_measurement_type === 'PerKm'
    ? 'за км'
    : 'за рейс'

  async function submitForm(values: ISetAuctionBetFormValues) {
    clearErrors('root.server')

    try {
      await setAuctionBetMutation.mutateAsync(
        mapSetAuctionBetFormValuesToRequest(values),
      )
      showNotification(
        trading.your.bet
          ? 'Ставка успешно изменена'
          : 'Ставка успешно сделана',
        'success',
      )
      onSuccess()
    } catch (error) {
      if (isApiValidationError(error)) {
        const priceError = error.data.errors.find(({ field }) => field === 'price')

        setError('price', {
          type: 'server',
          message: priceError?.message ?? error.data.message,
        })
        await queryClient.invalidateQueries({
          queryKey: ['auctions', 'details', auctionUuid],
        })
        return
      }

      const errorMessage = error instanceof Error
        ? error.message
        : 'Не удалось сохранить ставку'

      setError('root.server', {
        type: 'server',
        message: errorMessage,
      })
      showNotification(errorMessage, 'error')
    }
  }

  return (
    <SetAuctionBetFormStyled onSubmit={handleSubmit(submitForm)} noValidate>
      <SetAuctionBetSummaryBoxStyled>
        <SetAuctionBetSummaryItemStyled>
          <Typography variant="caption" color="text.secondary">
            Текущая цена
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {formatMoney(trading.price.current, currencyCode)}
          </Typography>
        </SetAuctionBetSummaryItemStyled>

        <SetAuctionBetSummaryItemStyled>
          <Typography variant="caption" color="text.secondary">
            Доступная цена
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {formatMoney(trading.price.available, currencyCode)}
          </Typography>
        </SetAuctionBetSummaryItemStyled>

        {trading.price.min !== null && (
          <SetAuctionBetSummaryItemStyled>
            <Typography variant="caption" color="text.secondary">
              Минимальная цена
            </Typography>
            <Typography variant="body1">
              {formatMoney(trading.price.min, currencyCode)}
            </Typography>
          </SetAuctionBetSummaryItemStyled>
        )}

        {trading.price.max !== null && (
          <SetAuctionBetSummaryItemStyled>
            <Typography variant="caption" color="text.secondary">
              Максимальная цена
            </Typography>
            <Typography variant="body1">
              {formatMoney(trading.price.max, currencyCode)}
            </Typography>
          </SetAuctionBetSummaryItemStyled>
        )}

        {trading.price.step !== null && (
          <SetAuctionBetSummaryItemStyled>
            <Typography variant="caption" color="text.secondary">
              Шаг ставки
            </Typography>
            <Typography variant="body1">
              {formatMoney(trading.price.step, currencyCode)}
            </Typography>
          </SetAuctionBetSummaryItemStyled>
        )}

        {trading.your.last_bet !== null && (
          <SetAuctionBetSummaryItemStyled>
            <Typography variant="caption" color="text.secondary">
              Ваша последняя ставка
            </Typography>
            <Typography variant="body1">
              {formatMoney(
                trading.your.last_bet_with_vat ?? trading.your.last_bet,
                currencyCode,
              )}
            </Typography>
          </SetAuctionBetSummaryItemStyled>
        )}
      </SetAuctionBetSummaryBoxStyled>

      <TextField
        label={`Цена ставки, ${measurementLabel}`}
        type="number"
        required
        fullWidth
        disabled={setAuctionBetMutation.isPending}
        error={Boolean(errors.price)}
        helperText={
          errors.price?.message ?? `Валюта: ${formatCurrencyCode(currencyCode)}`
        }
        slotProps={{
          htmlInput: {
            min: constraints.min ?? undefined,
            max: constraints.max ?? undefined,
            step: constraints.step ?? 'any',
          },
        }}
        {...register('price')}
      />

      {errors.root?.server?.message && (
        <Alert severity="error">{errors.root.server.message}</Alert>
      )}

      <SetAuctionBetActionsBoxStyled>
        <Button
          type="button"
          variant="outlined"
          disabled={setAuctionBetMutation.isPending}
          onClick={onCancel}
        >
          К аукциону
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={setAuctionBetMutation.isPending}
        >
          {setAuctionBetMutation.isPending
            ? 'Сохранение...'
            : trading.your.bet
              ? 'Изменить ставку'
              : 'Сделать ставку'}
        </Button>
      </SetAuctionBetActionsBoxStyled>
    </SetAuctionBetFormStyled>
  )
}
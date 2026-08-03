import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {
  AUCTION_CITY_FILTER_OPTIONS,
  AUCTION_STATUS_FILTER_OPTIONS,
  AUCTION_TYPE_FILTER_OPTIONS,
  BOOLEAN_FILTER_OPTIONS,
  TRADING_STATUS_FILTER_OPTIONS,
} from '@/features/auctions-list-filters/constants/auctions-list-filters.constants';
import { auctionsListFiltersFormSchema } from '@/features/auctions-list-filters/model/auctions-list-filters-form';
import {
  AuctionsListFiltersActionsBoxStyled,
  AuctionsListFiltersFieldsBoxStyled,
  AuctionsListFiltersRootPaperStyled,
} from '@/features/auctions-list-filters/styles/auctions-list-filters.styles';
import type {
  IAuctionsListFiltersFormValues,
  IAuctionsListFiltersProps,
} from '@/features/auctions-list-filters/types/auctions-list-filters';
import { getSelectedOptions } from '@/features/auctions-list-filters/helpers/get-selected-options';

export function AuctionsListFilters({
  values,
  isLoading = false,
  onSubmit,
  onReset,
}: IAuctionsListFiltersProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAuctionsListFiltersFormValues>({
    resolver: zodResolver(auctionsListFiltersFormSchema),
    defaultValues: values,
  });

  useEffect(() => {
    reset(values);
  }, [reset, values]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AuctionsListFiltersRootPaperStyled variant="outlined">
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Фильтры
        </Typography>

        <AuctionsListFiltersFieldsBoxStyled>
          <TextField
            label="Номер заявки"
            size="small"
            disabled={isLoading}
            {...register('cargo_num')}
          />

          <Controller
            name="auc_type"
            control={control}
            render={({ field }) => (
              <Autocomplete
                multiple
                size="small"
                options={AUCTION_TYPE_FILTER_OPTIONS}
                value={getSelectedOptions(AUCTION_TYPE_FILTER_OPTIONS, field.value)}
                disabled={isLoading}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onChange={(_, options) => field.onChange(options.map((option) => option.value))}
                renderInput={(params) => <TextField {...params} label="Тип аукциона" />}
              />
            )}
          />

          <Controller
            name="statuses"
            control={control}
            render={({ field }) => (
              <Autocomplete
                multiple
                size="small"
                options={AUCTION_STATUS_FILTER_OPTIONS}
                value={getSelectedOptions(AUCTION_STATUS_FILTER_OPTIONS, field.value)}
                disabled={isLoading}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onChange={(_, options) => field.onChange(options.map((option) => option.value))}
                renderInput={(params) => <TextField {...params} label="Статус аукциона" />}
              />
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Autocomplete
                multiple
                size="small"
                options={TRADING_STATUS_FILTER_OPTIONS}
                value={getSelectedOptions(TRADING_STATUS_FILTER_OPTIONS, field.value)}
                disabled={isLoading}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onChange={(_, options) => field.onChange(options.map((option) => option.value))}
                renderInput={(params) => <TextField {...params} label="Мой статус" />}
              />
            )}
          />

          <Controller
            name="load_city"
            control={control}
            render={({ field }) => (
              <TextField
                select
                label="Город погрузки"
                size="small"
                disabled={isLoading}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                inputRef={field.ref}
              >
                <MenuItem value="">Все города</MenuItem>
                {AUCTION_CITY_FILTER_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="unload_city"
            control={control}
            render={({ field }) => (
              <TextField
                select
                label="Город выгрузки"
                size="small"
                disabled={isLoading}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                inputRef={field.ref}
              >
                <MenuItem value="">Все города</MenuItem>
                {AUCTION_CITY_FILTER_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <TextField
            label="Погрузка от"
            type="date"
            size="small"
            disabled={isLoading}
            slotProps={{ inputLabel: { shrink: true } }}
            error={Boolean(errors.load_date_from)}
            helperText={errors.load_date_from?.message}
            {...register('load_date_from')}
          />

          <TextField
            label="Погрузка до"
            type="date"
            size="small"
            disabled={isLoading}
            slotProps={{ inputLabel: { shrink: true } }}
            error={Boolean(errors.load_date_to)}
            helperText={errors.load_date_to?.message}
            {...register('load_date_to')}
          />

          <Controller
            name="is_available"
            control={control}
            render={({ field }) => (
              <TextField
                select
                label="Доступен для ставки"
                size="small"
                disabled={isLoading}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                inputRef={field.ref}
              >
                {BOOLEAN_FILTER_OPTIONS.map((option) => (
                  <MenuItem key={option.value || 'all'} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="is_bidder"
            control={control}
            render={({ field }) => (
              <TextField
                select
                label="Есть моя ставка"
                size="small"
                disabled={isLoading}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                inputRef={field.ref}
              >
                {BOOLEAN_FILTER_OPTIONS.map((option) => (
                  <MenuItem key={option.value || 'all'} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <TextField
            label="Цена от"
            type="number"
            size="small"
            disabled={isLoading}
            slotProps={{ htmlInput: { min: 0 } }}
            error={Boolean(errors.current_price_from)}
            helperText={errors.current_price_from?.message}
            {...register('current_price_from')}
          />

          <TextField
            label="Цена до"
            type="number"
            size="small"
            disabled={isLoading}
            slotProps={{ htmlInput: { min: 0 } }}
            error={Boolean(errors.current_price_to)}
            helperText={errors.current_price_to?.message}
            {...register('current_price_to')}
          />
        </AuctionsListFiltersFieldsBoxStyled>

        <AuctionsListFiltersActionsBoxStyled>
          <Button type="button" color="inherit" disabled={isLoading} onClick={onReset}>
            Сбросить
          </Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            Применить
          </Button>
        </AuctionsListFiltersActionsBoxStyled>
      </AuctionsListFiltersRootPaperStyled>
    </form>
  );
}

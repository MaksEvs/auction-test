import type {
  IAuctionShowTradingSettings,
  ICarRequirements,
  IDocs,
  ILoadingTypes,
} from '@/entities/auction/types/auction-details';

export const AUCTION_DETAILS_EMPTY_VALUE = '—';

export enum EAuctionOperationTypeLabel {
  Loading = 'Погрузка',
  Unloading = 'Выгрузка',
  Unknown = 'Неизвестная операция',
}

export enum EAuctionBidMeasurementTypeLabel {
  PerRoute = 'За маршрут',
  PerKm = 'За километр',
  Unknown = 'Не указан',
}

export enum EAuctionPaymentDelayTypeLabel {
  CalendarDays = 'календарных дней',
  WorkDays = 'рабочих дней',
  Unknown = 'тип дней не указан',
}

export const AUCTION_LOADING_TYPE_LABELS = [
  { key: 'side', label: 'Боковая' },
  { key: 'top', label: 'Верхняя' },
  { key: 'rear', label: 'Задняя' },
  { key: 'full', label: 'Полная растентовка' },
] as const satisfies ReadonlyArray<{
  key: keyof ILoadingTypes;
  label: string;
}>;

export const AUCTION_DOCUMENT_LABELS = [
  { key: 'tir', label: 'TIR' },
  { key: 'cmr', label: 'CMR' },
  { key: 't1', label: 'T1' },
  { key: 'med', label: 'Медицинская книжка' },
] as const satisfies ReadonlyArray<{
  key: keyof IDocs;
  label: string;
}>;

export const AUCTION_VEHICLE_REQUIREMENT_LABELS = [
  { key: 'weight', label: 'Грузоподъёмность', unit: 'т' },
  { key: 'volume', label: 'Объём', unit: 'м³' },
  { key: 'width', label: 'Ширина', unit: 'м' },
  { key: 'length', label: 'Длина', unit: 'м' },
  { key: 'height', label: 'Высота', unit: 'м' },
] as const satisfies ReadonlyArray<{
  key: Exclude<keyof ICarRequirements, 'type'>;
  label: string;
  unit: string;
}>;

export const AUCTION_TRADING_SETTING_LABELS = [
  { key: 'prolong_after_bet', label: 'Продление после ставки', unit: 'мин' },
  { key: 'winner_confirm', label: 'Подтверждение победителя', unit: 'ч' },
  { key: 'winner_counter_mode', label: 'Режим встречного предложения', unit: '' },
  { key: 'transmission_time_in', label: 'Срок передачи данных', unit: 'ч' },
  { key: 'coefficient', label: 'Коэффициент', unit: '' },
] as const satisfies ReadonlyArray<{
  key: keyof IAuctionShowTradingSettings;
  label: string;
  unit: string;
}>;

import type { TTradingStatus } from '@/entities/auction/types/auction-list'
import type {
  IAuctionsListFilterOption,
  TAuctionFilterType,
  TBooleanFilterValue,
} from '@/features/auctions-list-filters/types/auctions-list-filters'

export const AUCTION_TYPE_VALUES = [
  'Request',
  'Up',
  'Down',
  'FixPrice',
] as const satisfies readonly TAuctionFilterType[]

export const TRADING_STATUS_VALUES = [
  'NotParticipating',
  'Leading',
  'Losing',
  'OnPending',
  'Confirmed',
  'ChoosingWinner',
  'Winner',
  'Accepted',
  'Unknown',
] as const satisfies readonly TTradingStatus[]

export const DATE_INPUT_REGEXP = /^\d{4}-\d{2}-\d{2}$/

export const AUCTION_TYPE_FILTER_OPTIONS: readonly IAuctionsListFilterOption<TAuctionFilterType>[] = [
  { value: 'Request', label: 'Заявочный' },
  { value: 'Up', label: 'На повышение' },
  { value: 'Down', label: 'На понижение' },
  { value: 'FixPrice', label: 'Фиксированная цена' },
]

export const AUCTION_STATUS_FILTER_OPTIONS: readonly IAuctionsListFilterOption<number>[] = [
  { value: 1, label: 'Планирование' },
  { value: 2, label: 'Идут торги' },
  { value: 3, label: 'Определение победителя' },
  { value: 4, label: 'Ожидание сделки' },
  { value: 5, label: 'В работе' },
  { value: 6, label: 'Завершён' },
  { value: 7, label: 'Остановлен' },
]

export const TRADING_STATUS_FILTER_OPTIONS: readonly IAuctionsListFilterOption<TTradingStatus>[] = [
  { value: 'NotParticipating', label: 'Не участвую' },
  { value: 'Leading', label: 'Лидирую' },
  { value: 'Losing', label: 'Ставка перебита' },
  { value: 'OnPending', label: 'На подтверждении' },
  { value: 'Confirmed', label: 'Подтверждён' },
  { value: 'ChoosingWinner', label: 'Ожидаю выбора' },
  { value: 'Winner', label: 'Победитель' },
  { value: 'Accepted', label: 'Принято' },
  { value: 'Unknown', label: 'Неизвестен' },
]

export const AUCTION_CITY_FILTER_OPTIONS: readonly IAuctionsListFilterOption<string>[] = [
  { value: 'Kazan', label: 'Казань' },
  { value: 'Krasnodar', label: 'Краснодар' },
  { value: 'Moscow', label: 'Москва' },
  { value: 'Nizhny Novgorod', label: 'Нижний Новгород' },
  { value: 'Novosibirsk', label: 'Новосибирск' },
  { value: 'Perm', label: 'Пермь' },
  { value: 'Rostov-on-Don', label: 'Ростов-на-Дону' },
  { value: 'Saint Petersburg', label: 'Санкт-Петербург' },
  { value: 'Samara', label: 'Самара' },
  { value: 'Yekaterinburg', label: 'Екатеринбург' },
]

export const BOOLEAN_FILTER_OPTIONS: readonly IAuctionsListFilterOption<TBooleanFilterValue>[] = [
  { value: '', label: 'Все' },
  { value: 'true', label: 'Да' },
  { value: 'false', label: 'Нет' },
]
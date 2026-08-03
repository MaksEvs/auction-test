import type { ChipProps } from '@mui/material/Chip';
import type { TAuctionStatus, TTradingStatus } from '@/entities/auction/types/auction-list';

export enum EAuctionStatusLabel {
  Planning = 'Планирование',
  Auction = 'Идут торги',
  DeterminateWinner = 'Выбор победителя',
  WaitDeal = 'Ожидание сделки',
  InProgress = 'В работе',
  Finished = 'Завершён',
  Stopped = 'Остановлен',
  Canceled = 'Отменён',
  Unknown = 'Неизвестен',
}

export enum EAuctionTypeLabel {
  Request = 'Заявочный',
  Up = 'На повышение',
  Down = 'На понижение',
  FixPrice = 'Фикс. цена',
  Unknown = 'Неизвестен',
}

export const AUCTION_STATUS_COLORS: Record<TAuctionStatus, ChipProps['color']> = {
  Planning: 'default',
  Auction: 'success',
  DeterminateWinner: 'warning',
  WaitDeal: 'warning',
  InProgress: 'info',
  Finished: 'default',
  Stopped: 'error',
  Canceled: 'error',
  Unknown: 'default',
};

export enum ETradingStatusLabel {
  NotParticipating = 'Не участвуете',
  Leading = 'Лидируете',
  Losing = 'Ставка перебита',
  OnPending = 'На подтверждении',
  Confirmed = 'Подтверждены',
  ChoosingWinner = 'Ожидаете выбора',
  Winner = 'Победитель',
  Accepted = 'Принято',
  Unknown = 'Неизвестен',
}

export const TRADING_STATUS_COLORS: Record<TTradingStatus, ChipProps['color']> = {
  NotParticipating: 'default',
  Leading: 'success',
  Losing: 'error',
  OnPending: 'warning',
  Confirmed: 'success',
  ChoosingWinner: 'warning',
  Winner: 'success',
  Accepted: 'success',
  Unknown: 'default',
};

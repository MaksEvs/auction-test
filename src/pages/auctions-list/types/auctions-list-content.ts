import type { IAuctionListResponseBase } from '@/entities/auction/types/auction-list';

export interface IAuctionsListContentProps {
  data: IAuctionListResponseBase | undefined;
  currentPage: number;
  isError: boolean;
  isPending: boolean;
  onPageChange: (page: number) => void;
}

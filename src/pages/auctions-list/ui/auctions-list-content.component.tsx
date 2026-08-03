import Alert from '@mui/material/Alert';
import Pagination from '@mui/material/Pagination';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { AuctionListCard } from '@/entities/auction/ui/auction-list-card.component';
import { AUCTIONS_LIST_PER_PAGE } from '@/pages/auctions-list/constants/auction-list-page.constants';
import {
  AuctionsListGridBoxStyled,
  AuctionsListPaginationBoxStyled,
  AuctionsListStateBoxStyled,
} from '@/pages/auctions-list/styles/auction-list-page.styles';
import type { IAuctionsListContentProps } from '@/pages/auctions-list/types/auctions-list-content';

export function AuctionsListContent({
  data,
  currentPage,
  isError,
  isPending,
  onPageChange,
}: IAuctionsListContentProps) {
  if (isPending) {
    return (
      <AuctionsListGridBoxStyled>
        {Array.from({ length: AUCTIONS_LIST_PER_PAGE }).map((_, index) => (
          <Skeleton key={index} variant="rounded" height={340} />
        ))}
      </AuctionsListGridBoxStyled>
    );
  }

  if (isError || !data) {
    return (
      <AuctionsListStateBoxStyled>
        <Alert severity="error">Не удалось загрузить список аукционов.</Alert>
      </AuctionsListStateBoxStyled>
    );
  }

  if (data.data.length === 0) {
    return (
      <AuctionsListStateBoxStyled>
        <Alert severity="info">По выбранным условиям аукционы не найдены.</Alert>
      </AuctionsListStateBoxStyled>
    );
  }

  return (
    <>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Показано: {data.meta.from}–{data.meta.to} из {data.meta.total}
      </Typography>

      <AuctionsListGridBoxStyled>
        {data.data.map((auction) => (
          <AuctionListCard key={auction.main.order_uid} auction={auction} />
        ))}
      </AuctionsListGridBoxStyled>

      {data.meta.last_page > 1 && (
        <AuctionsListPaginationBoxStyled>
          <Pagination
            page={currentPage}
            count={data.meta.last_page}
            color="primary"
            onChange={(_, nextPage) => onPageChange(nextPage)}
          />
        </AuctionsListPaginationBoxStyled>
      )}
    </>
  );
}

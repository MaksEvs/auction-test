import { useNavigate, useSearch } from '@tanstack/react-router';
import Typography from '@mui/material/Typography';
import { useAuctionsListQuery } from '@/entities/auction/api/use-auctions-list-query';
import {
  mapAuctionsListFiltersFormValuesToSearchParams,
  mapAuctionsListSearchParamsToFiltersFormValues,
} from '@/features/auctions-list-filters/helpers/map-auctions-list-filters';
import {
  mapAuctionsListSearchParamsToRequest,
  parseAuctionsListSearchParams,
} from '@/features/auctions-list-filters/model/auctions-list-search-params';
import type { IAuctionsListFiltersFormValues } from '@/features/auctions-list-filters/types/auctions-list-filters';
import { AuctionsListFilters } from '@/features/auctions-list-filters/ui/auctions-list-filters.component';
import {
  AuctionsListPageContainerStyled,
  AuctionsListPageContentBoxStyled,
} from '@/pages/auctions-list/styles/auction-list-page.styles';
import { AuctionsListContent } from '@/pages/auctions-list/ui/auctions-list-content.component';

export function AuctionsListPage() {
  const searchParams = useSearch({ from: '/' });
  const navigate = useNavigate({ from: '/' });

  const { data, isPending, isError } = useAuctionsListQuery(
    mapAuctionsListSearchParamsToRequest(searchParams),
  );

  const filtersValues = mapAuctionsListSearchParamsToFiltersFormValues(searchParams);

  function handleFiltersSubmit(values: IAuctionsListFiltersFormValues) {
    void navigate({
      search: {
        ...mapAuctionsListFiltersFormValuesToSearchParams(values),
        page: 1,
      },
    });
  }

  function handleFiltersReset() {
    void navigate({
      search: parseAuctionsListSearchParams({ page: 1 }),
    });
  }

  function handlePageChange(page: number) {
    void navigate({
      search: (currentSearchParams) => ({
        ...currentSearchParams,
        page,
      }),
    });
  }

  return (
    <AuctionsListPageContainerStyled>
      <AuctionsListPageContentBoxStyled>
        <Typography
          variant="h3"
          component="h1"
          sx={{ mb: 2, textAlign: 'center', fontWeight: 700, letterSpacing: '-0.02em' }}
        >
          Аукционы
        </Typography>

        <AuctionsListFilters
          values={filtersValues}
          isLoading={isPending}
          onSubmit={handleFiltersSubmit}
          onReset={handleFiltersReset}
        />

        <AuctionsListContent
          data={data}
          currentPage={searchParams.page}
          isError={isError}
          isPending={isPending}
          onPageChange={handlePageChange}
        />
      </AuctionsListPageContentBoxStyled>
    </AuctionsListPageContainerStyled>
  );
}

import type { ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useSetAuctionBetMutation } from '@/entities/auction/api/use-set-auction-bet-mutation'
import { createAuctionTradingFixture } from '@/features/set-auction-bet/ui/__tests__/set-auction-bet-form.fixtures'
import { SetAuctionBetForm } from '@/features/set-auction-bet/ui/set-auction-bet-form.component'
import { ApiError } from '@/shared/api/api-error'
import { useNotificationStore } from '@/shared/model/notification-store'
import type { IValidationProblem } from '@/shared/types/api-error'

vi.mock('@/entities/auction/api/use-set-auction-bet-mutation', () => ({
  useSetAuctionBetMutation: vi.fn(),
}))

const AUCTION_UUID = 'auction-test-uuid'
const mutateAsyncMock = vi.fn()
const onCancelMock = vi.fn()
const onSuccessMock = vi.fn()

function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
}

function renderForm(queryClient = createQueryClient()): {
  queryClient: QueryClient
  user: ReturnType<typeof userEvent.setup>
} {
  const view: ReactElement = (
    <QueryClientProvider client={queryClient}>
      <SetAuctionBetForm
        auctionUuid={AUCTION_UUID}
        auctionType="Down"
        trading={createAuctionTradingFixture()}
        currencyCode="643"
        onCancel={onCancelMock}
        onSuccess={onSuccessMock}
      />
    </QueryClientProvider>
  )

  render(view)

  return {
    queryClient,
    user: userEvent.setup(),
  }
}

describe('SetAuctionBetForm', () => {
  beforeEach(() => {
    mutateAsyncMock.mockReset()
    onCancelMock.mockReset()
    onSuccessMock.mockReset()
    vi.mocked(useSetAuctionBetMutation).mockReturnValue({
      mutateAsync: mutateAsyncMock,
      isPending: false,
    } as unknown as ReturnType<typeof useSetAuctionBetMutation>)
    useNotificationStore.setState({
      isOpen: false,
      message: '',
      severity: 'info',
    })
  })

  it('shows a client validation error and does not submit an empty price', async () => {
    const { user } = renderForm()
    const priceInput = screen.getByRole('spinbutton', { name: /Цена ставки/i })

    await user.clear(priceInput)
    await user.click(screen.getByRole('button', { name: 'Сделать ставку' }))

    expect(await screen.findByText('Укажите цену ставки')).toBeInTheDocument()
    expect(mutateAsyncMock).not.toHaveBeenCalled()
  })

  it('submits a valid price and shows a success notification', async () => {
    mutateAsyncMock.mockResolvedValue(undefined)
    const { user } = renderForm()
    const priceInput = screen.getByRole('spinbutton', { name: /Цена ставки/i })

    await user.clear(priceInput)
    await user.type(priceInput, '29000')
    await user.click(screen.getByRole('button', { name: 'Сделать ставку' }))

    await waitFor(() => {
      expect(mutateAsyncMock).toHaveBeenCalledWith({ price: 29000 })
      expect(onSuccessMock).toHaveBeenCalledOnce()
    })
    expect(useNotificationStore.getState()).toMatchObject({
      isOpen: true,
      message: 'Ставка успешно сделана',
      severity: 'success',
    })
  })

  it('shows a server validation error and refreshes auction constraints', async () => {
    const validationProblem: IValidationProblem = {
      code: 'validation_failed',
      title: 'Ошибка валидации',
      message: 'Запрос содержит некорректные поля.',
      errors: [{
        field: 'price',
        code: 'auction_direction',
        message: 'Доступная цена изменилась. Обновите ставку.',
      }],
    }
    mutateAsyncMock.mockRejectedValue(
      new ApiError('Ошибка валидации', 422, validationProblem),
    )
    const queryClient = createQueryClient()
    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries')
    const { user } = renderForm(queryClient)
    const priceInput = screen.getByRole('spinbutton', { name: /Цена ставки/i })

    await user.clear(priceInput)
    await user.type(priceInput, '29000')
    await user.click(screen.getByRole('button', { name: 'Сделать ставку' }))

    expect(
      await screen.findByText('Доступная цена изменилась. Обновите ставку.'),
    ).toBeInTheDocument()
    expect(invalidateQueriesSpy).toHaveBeenCalledWith({
      queryKey: ['auctions', 'details', AUCTION_UUID],
    })
    expect(onSuccessMock).not.toHaveBeenCalled()
  })
})
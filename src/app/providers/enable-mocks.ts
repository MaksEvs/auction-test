export async function enableMocks() {
  if (!import.meta.env.DEV) {
    return
  }

  const { worker } = await import('@/app/mocks/browser')

  await worker.start({
    onUnhandledRequest: 'warn',
  })
}
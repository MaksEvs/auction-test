import type { RequestHandler } from 'msw';
import { auctionHandlers } from '@/app/mocks/handlers/auctions';

export const handlers: RequestHandler[] = [...auctionHandlers];

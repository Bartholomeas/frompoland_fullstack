import { TRANSACTION_URL } from '@/misc/constants';
import { ExchangeTransaction } from '../types/exchange-transaction.type';

export type GetLatestTransactionsResponse = (ExchangeTransaction & { id: number })[];
export const GET_LATEST_TRANSACTIONS_TAG = 'get-latest-transactions';
export const getLatestTransactions = async (): Promise<GetLatestTransactionsResponse> => {
  const response = await fetch(TRANSACTION_URL + '/latest', {
    cache: 'no-store',
    next: {
      tags: [GET_LATEST_TRANSACTIONS_TAG],
    },
  });

  if (!response.ok) throw new Error('Failed to fetch latest transactions');

  return response.json();
};

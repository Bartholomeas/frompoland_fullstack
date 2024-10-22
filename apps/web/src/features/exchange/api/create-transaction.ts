import { TRANSACTION_URL } from '@/misc/constants';
import { CreateTransactionPayload, createTransactionSchema } from '../schemas/create-transaction.schema';
import { CurrencyEnum } from '@/misc/schemas';

export interface CreateTransactionResponse {
  from: CurrencyEnum;
  to: CurrencyEnum;
  baseAmount: number;
  exchangedAmount: number;
  exchangeRate: number;
  createdAt: number;
}

export const createTransaction = async (payload: CreateTransactionPayload): Promise<CreateTransactionResponse> => {
  const parsedBody = createTransactionSchema.parse(payload);

  const res = await fetch(TRANSACTION_URL, {
    method: 'POST',
    body: JSON.stringify(parsedBody),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('Failed to create transaction');

  return res.json();
};

import { TRANSACTION_URL } from '@/misc/constants';
import { CreateTransactionPayload, createTransactionSchema } from '../schemas/create-transaction.schema';
import { ExchangeTransaction } from '../types/exchange-transaction.type';

export interface CreateTransactionResponse extends ExchangeTransaction {}

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

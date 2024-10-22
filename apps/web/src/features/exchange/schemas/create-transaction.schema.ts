import { z } from 'zod';
import { CurrencyEnumSchema } from '@/misc/schemas';

export const createTransactionSchema = z.object({
  from: CurrencyEnumSchema,
  to: CurrencyEnumSchema,
  amount: z.number({ message: 'Kwota musi być liczbą' }).min(0, { message: 'Kwota musi być większa od 0' }),
});

export type CreateTransactionPayload = z.infer<typeof createTransactionSchema>;

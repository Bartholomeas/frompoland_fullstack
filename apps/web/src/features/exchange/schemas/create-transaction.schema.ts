import { z } from 'zod';
import { CurrencyEnumSchema } from '@/misc/schemas';

export const createTransactionSchema = z.object({
  from: CurrencyEnumSchema,
  to: CurrencyEnumSchema,
  amount: z.number().min(0),
});

export type CreateTransactionPayload = z.infer<typeof createTransactionSchema>;

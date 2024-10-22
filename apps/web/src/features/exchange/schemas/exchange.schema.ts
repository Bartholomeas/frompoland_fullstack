import { z } from 'zod';

export const exchangeSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  amount: z.number().min(0),
});

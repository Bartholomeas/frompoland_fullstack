import { z } from 'zod';

export const CurrencyEnumSchema = z.enum(['PLN', 'EUR']);
export type CurrencyEnum = z.infer<typeof CurrencyEnumSchema>;

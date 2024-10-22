import { CurrencyEnum } from '@/misc/schemas';

export interface ExchangeTransaction {
  from: CurrencyEnum;
  to: CurrencyEnum;
  baseAmount: number;
  exchangedAmount: number;
  exchangeRate: number;
  createdAt: number;
}

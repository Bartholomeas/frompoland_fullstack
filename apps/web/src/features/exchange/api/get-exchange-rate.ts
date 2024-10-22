import { EXCHANGE_RATE_URL } from '@/misc/constants';
import { CurrencyEnum } from '@/misc/schemas';

interface ExchangeRateResponse {
  exchange_rate: number;
}

interface GetExchangeRatePayload {
  from: CurrencyEnum;
  to: CurrencyEnum;
}

export const getExchangeRate = async (payload: GetExchangeRatePayload): Promise<ExchangeRateResponse> => {
  // Simulation of API call params
  console.log(payload);

  const res = await fetch(EXCHANGE_RATE_URL, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('Failed to fetch exchange rate');

  return await res.json();
};

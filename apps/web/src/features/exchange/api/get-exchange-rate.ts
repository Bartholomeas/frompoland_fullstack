import { EXCHANGE_RATE_URL } from '@/misc/constants';

interface ExchangeRateResponse {
  exchange_rate: number;
}

export const getExchangeRate = async (): Promise<ExchangeRateResponse> => {
  console.log('Fifka2', EXCHANGE_RATE_URL);
  const res = await fetch(EXCHANGE_RATE_URL, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('Failed to fetch exchange rate');

  return await res.json();
};

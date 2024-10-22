import React from 'react';
import { CurrencyEnum } from "@/misc/schemas";

interface ExchangeRateProps {
  from: CurrencyEnum;
  to: CurrencyEnum;
  exchangeRate: number | undefined;
}

export const ExchangeRate = ({ from, to, exchangeRate }: ExchangeRateProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">{from} - {to}:</span>
      <span className="text-sm font-semibold">{exchangeRate}</span>
    </div>
  );
};


import React from 'react';

import { catchError } from "@/utils/catchError";

import { getExchangeRate } from "./api";

import { Card } from "@/components/ui/card";

import { ExchangeForm, ExchangeRate } from "./components";

export const Exchange = async () => {
  const { data, error } = await catchError(getExchangeRate({
    from: 'EUR',
    to: 'PLN',
  }));

  return (
    <Card>
      <ExchangeRate
        from="EUR"
        to="PLN"
        exchangeRate={data?.exchange_rate}
      />
      <ExchangeForm
      />
    </Card>
  );
};

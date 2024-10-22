
import React, { Suspense } from 'react';

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
      <Suspense fallback={<div>Loading...</div>}>
        <ExchangeForm
          exchangeRate={data?.exchange_rate}
        />
      </Suspense>
      {error ? <span className="text-sm text-destructive">{error.message}</span> : null}
    </Card>
  );
};


import React, { Suspense } from 'react';
import dynamic from "next/dynamic";

import { catchError } from "@/utils/catchError";

import { getExchangeRate } from "./api";

import { Card } from "@/components/ui/card";
import { ExchangeForm, ExchangeRate } from "./components";

const ExchangeTransactionsList = dynamic(() => import("./components/exchange-transactions-list").then((mod) => mod.ExchangeTransactionsList));


export const Exchange = async () => {
  const { data, error } = await catchError(getExchangeRate({
    from: 'EUR',
    to: 'PLN',
  }));

  return (
    <div className="flex flex-col gap-4">

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
      <Suspense fallback={<div>Loading...</div>}>
        <ExchangeTransactionsList />
      </Suspense>
    </div>
  );
};

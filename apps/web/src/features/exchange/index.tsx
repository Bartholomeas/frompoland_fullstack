
import React from 'react';

import { catchError } from "@/utils/catchError";

import { getExchangeRate } from "./api";

import { Card } from "@/components/ui/card";

import { ExchangeForm, ExchangeRate } from "./components";

export const Exchange = async () => {
  const [data, err] = await catchError(getExchangeRate());

  return (
    <Card>
      <ExchangeRate />
      <ExchangeForm />
    </Card>
  );
};

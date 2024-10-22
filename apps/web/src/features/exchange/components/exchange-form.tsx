'use client';

import React, { useCallback, useMemo } from 'react';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputControlled } from "@/components/form/input-controlled";

import { useFetch } from "@/hooks/useFetch";

import { getApproximateExchangedAmount } from "../utils";
import { createTransaction } from "../api/create-transaction";
import { CreateTransactionPayload, createTransactionSchema } from "../schemas/create-transaction.schema";

interface ExchangeFormProps {
  exchangeRate: number | undefined;
}

export const ExchangeForm = ({ exchangeRate }: ExchangeFormProps) => {
  const form = useForm<CreateTransactionPayload>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      from: 'EUR',
      to: 'PLN',
      amount: 100,
    },
  });

  const approximateExchangedAmount = useMemo(() => {
    return getApproximateExchangedAmount(form.watch('amount'), exchangeRate);
  }, [form.watch('amount'), exchangeRate]);

  const { mutate, isLoading } = useFetch();

  const clearValues = useCallback(() => {
    form.reset();
  }, [form]);

  const onSubmit = async (payload: CreateTransactionPayload) => {
    mutate(createTransaction(payload));
  };

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4">
        <InputControlled
          name="amount"
          label="Kwota do wymiany"
          type="number"
          min={0}
        />

        <div className="flex items-center gap-2">

          <Button
            variant={'outline'}
            onClick={clearValues}
          >
            Wyczyść
          </Button>
          <Button
            aria-disabled={isLoading}
            disabled={isLoading}
            type='submit'>
            Dokonaj transakcji
          </Button>
        </div>
        {approximateExchangedAmount ? <span className="text-sm text-foreground-muted">
          ~ {`${form.watch('amount')} ${form.watch('from')} => ${approximateExchangedAmount} ${form.watch('to')}`}
        </span> : null}
      </form>
    </Form>
  );
};

'use client';

import React from 'react';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputControlled } from "@/components/form/input-controlled";


import { createTransaction, CreateTransactionResponse } from "../api/create-transaction";
import { CreateTransactionPayload, createTransactionSchema } from "../schemas/create-transaction.schema";
import { useFetch } from "@/hooks/useFetch";

export const ExchangeForm = () => {
  const form = useForm<CreateTransactionPayload>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      from: 'EUR',
      to: 'PLN',
      amount: 100,
    },
  });

  const { mutate, isLoading } = useFetch({
    queryFn: createTransaction(form.getValues()),
  });

  const onSubmit = async (payload: CreateTransactionPayload) => {
    mutate(createTransaction(payload));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4">
        <InputControlled
          name="amount"
          label="Kwota do wymiany" />
        <div className="flex items-center gap-2">

          <Button variant={'outline'}>
            Przelicz
          </Button>
          <Button
            aria-disabled={isLoading}
            disabled={isLoading}
            type='submit'>
            Dokonaj transakcji
          </Button>
        </div>
      </form>
    </Form>
  );
};

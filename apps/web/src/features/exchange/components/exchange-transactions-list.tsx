import { Card } from "@/components/ui/card";
import React from 'react';
import { getLatestTransactions } from "../api/get-latest-transactions";
import { catchError } from "@/utils/catchError";
import { ExchangeTransaction } from "../types/exchange-transaction.type";

export const ExchangeTransactionsList = async () => {
  const { data: transactions } = await catchError(getLatestTransactions());

  return (
    <Card className="max-h-[500px] overflow-y-auto">
      <h2 className="font-semibold mb-4 text-xl">Ostatnie transakcje</h2>
      <div className="flex flex-col gap-2">
        {transactions?.map((transaction) => (
          <ExchangeTransactionItem
            key={transaction.id}
            transaction={transaction} />
        ))}
      </div>
    </Card>
  );
};


const ExchangeTransactionItem = ({ transaction }: { transaction: ExchangeTransaction; }) => {
  const createdAt = new Date(transaction.createdAt).toLocaleString('pl-PL', { dateStyle: 'short', timeStyle: 'short' });

  return <div className="border rounded p-2 flex gap-2 flex-col">
    <div className="flex items-center justify-between w-full">
      <span className="text-sm">{transaction.from} {transaction.baseAmount} </span>
      <span className="text-sm"> {`->`}</span>
      <span className="text-sm font-semibold">{transaction.to} {transaction.exchangedAmount} </span>
    </div>
    <span className="text-sm self-end text-muted-foreground">{createdAt}</span>
    <span className="self-end text-sm font-bold">Kurs: {transaction.exchangeRate}</span>
  </div>;
};

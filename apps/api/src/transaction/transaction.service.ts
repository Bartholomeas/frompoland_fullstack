import { Injectable } from '@nestjs/common';

import { ExchangeRateService } from 'src/exchange-rate/exchange-rate.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionResultDto } from './dto/transaction-result.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  async createTransaction({
    from,
    to,
    amount,
  }: CreateTransactionDto): Promise<TransactionResultDto> {
    const { exchange_rate } = await this.exchangeRateService.getExchangeRate({
      from,
      to,
    });

    const exchangeAmount = parseFloat(
      (Math.round(amount * exchange_rate * 100) / 100).toFixed(2),
    );

    const result = new TransactionResultDto({
      from,
      to,
      amount: exchangeAmount,
      exchangeRate: exchange_rate,
      createdAt: Date.now(),
    });

    return result;
  }
}

import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { ExchangeRateService } from 'src/exchange-rate/exchange-rate.service';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionResultDto } from './dto/transaction-result.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    private readonly exchangeRateService: ExchangeRateService,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

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
    await this.saveTransaction(result);

    return result;
  }

  private async saveTransaction(transaction: TransactionResultDto) {
    const newTransaction = new Transaction();
    Object.assign(newTransaction, transaction);

    await this.transactionRepository.save(newTransaction);
  }
}

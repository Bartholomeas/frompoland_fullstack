import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ExchangeRateService } from 'src/exchange-rate/exchange-rate.service';

import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';

@Module({
  imports: [HttpModule],
  controllers: [TransactionController],
  providers: [TransactionService, ExchangeRateService],
})
export class TransactionModule {}

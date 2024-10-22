import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ExchangeRateService } from 'src/exchange-rate/exchange-rate.service';

import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction } from './entities/transaction.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Transaction])],
  controllers: [TransactionController],
  providers: [TransactionService, ExchangeRateService],
})
export class TransactionModule {}

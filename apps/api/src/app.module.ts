import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({ isGlobal: true, ttl: 60 }),
    ExchangeRateModule,
    TransactionModule,
  ],
})
export class AppModule {}

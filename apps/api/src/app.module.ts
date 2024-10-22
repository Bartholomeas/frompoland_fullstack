import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { TransactionModule } from './transaction/transaction.module';
import { Transaction } from './transaction/entities/transaction.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({ isGlobal: true, ttl: 60 }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'db/sql.db',
      synchronize: true,
      entities: [Transaction],
    }),
    ExchangeRateModule,
    TransactionModule,
  ],
})
export class AppModule {}

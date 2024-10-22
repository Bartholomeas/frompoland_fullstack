import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { HttpCacheInterceptor } from 'src/common/interceptors/http-cache.interceptor';
import { ExchangeRateService } from './exchange-rate.service';

@ApiTags('Exchange Rate')
@Controller('exchange-rate')
@UseInterceptors(HttpCacheInterceptor)
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  @Get()
  async getExchangeRate() {
    try {
      return this.exchangeRateService.getExchangeRate();
    } catch (err) {}
  }
}

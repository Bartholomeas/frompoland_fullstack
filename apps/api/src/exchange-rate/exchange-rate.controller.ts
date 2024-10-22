import { Controller, Get } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('exchange-rate')
@ApiTags('Exchange Rate')
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  @Get()
  async getExchangeRate() {
    try {
      return this.exchangeRateService.getExchangeRate();
    } catch (err) {}
  }
}

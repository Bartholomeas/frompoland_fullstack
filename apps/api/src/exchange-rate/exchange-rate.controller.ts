import {
  Controller,
  Get,
  HttpException,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateDto } from './dto/exchange-rate.dto';

@ApiTags('Exchange Rate')
@Controller('exchange-rate')
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  @Get()
  @ApiOperation({ summary: 'Get exchange rate' })
  async getExchangeRate(@Query() exchangeRateDto: ExchangeRateDto) {
    try {
      return await this.exchangeRateService.getExchangeRate(exchangeRateDto);
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException();
    }
  }
}

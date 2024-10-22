import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExchangeRateService {
  constructor(private readonly configService: ConfigService) {}

  async getExchangeRate() {
    const res = await fetch(
      this.configService.get<string>('EXCHANGE_API_URL'),
      {
        headers: {
          'x-api-key': this.configService.get<string>('EXCHANGE_API_KEY'),
        },
      },
    );

    if (!res.ok) throw new BadRequestException('Failed to fetch exchange rate');

    return res.json();
  }
}

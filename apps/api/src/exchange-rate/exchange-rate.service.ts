import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { firstValueFrom } from 'rxjs';

@Injectable()
export class ExchangeRateService {
  private readonly exchangeApiUrl =
    this.configService.get<string>('EXCHANGE_API_URL');
  private readonly exchangeApiKey =
    this.configService.get<string>('EXCHANGE_API_KEY');

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getExchangeRate() {
    const { data } = await firstValueFrom(
      this.httpService.get(this.exchangeApiUrl, {
        headers: {
          'x-api-key': this.exchangeApiKey,
        },
      }),
    );

    return data;
  }
}

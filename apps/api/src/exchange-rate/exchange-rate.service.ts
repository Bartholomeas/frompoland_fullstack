import { HttpService } from '@nestjs/axios';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { firstValueFrom } from 'rxjs';
import { ExchangeRateCacheKey } from './exchange-rate.enum';
import { ExchangeRateDto } from './dto/exchange-rate.dto';

@Injectable()
export class ExchangeRateService {
  private readonly exchangeApiUrl =
    this.configService.get<string>('EXCHANGE_API_URL');
  private readonly exchangeApiKey =
    this.configService.get<string>('EXCHANGE_API_KEY');

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // Add DTO with from and to; to simulate real app flow (as it probably would need to handle multiple configurations of currencies).
  async getExchangeRate({ from, to }: ExchangeRateDto) {
    // As it will be used in another module like a service (not endpoint) i need to handle cache 'by hand', as interceptors are applicable to controllers only.
    const cachedExchangeRate = await this.cacheManager.get(
      `${ExchangeRateCacheKey.EXCHANGE_RATE}-${from}-${to}`,
    );

    if (cachedExchangeRate) return cachedExchangeRate;

    // There would be passing of from/to params (if api would support these params)
    const { data } = await firstValueFrom(
      this.httpService.get(this.exchangeApiUrl, {
        headers: {
          'x-api-key': this.exchangeApiKey,
        },
      }),
    );
    await this.cacheManager.set(
      `${ExchangeRateCacheKey.EXCHANGE_RATE}-${from}-${to}`,
      data,
    );

    return data;
  }
}

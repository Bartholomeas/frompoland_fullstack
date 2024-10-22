import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Currency } from 'src/common/enums/currency.enum';

export class ExchangeRateDto {
  @IsString()
  @IsOptional()
  @IsEnum(Currency)
  from: Currency = Currency.EUR;

  @IsString()
  @IsOptional()
  @IsEnum(Currency)
  to: Currency = Currency.PLN;
}

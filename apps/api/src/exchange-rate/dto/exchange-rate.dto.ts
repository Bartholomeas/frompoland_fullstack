import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Currency } from 'src/common/enums/currency.enum';

export class ExchangeRateDto {
  @ApiProperty({
    default: Currency.EUR,
    enum: Currency,
  })
  @IsString()
  @IsOptional()
  @IsEnum(Currency)
  from: Currency = Currency.EUR;

  @ApiProperty({
    default: Currency.PLN,
    enum: Currency,
  })
  @IsString()
  @IsOptional()
  @IsEnum(Currency)
  to: Currency = Currency.PLN;
}

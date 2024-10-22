import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

import { Currency } from 'src/common/enums/currency.enum';

export class TransactionResultDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  @IsPositive()
  amount: number;

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

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsPositive()
  exchangeRate: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsPositive()
  createdAt: number;

  constructor(partial: Partial<TransactionResultDto>) {
    Object.assign(this, partial);
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

import { ExchangeRateDto } from 'src/exchange-rate/dto/exchange-rate.dto';

export class CreateTransactionDto extends ExchangeRateDto {
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  amount: number;
}

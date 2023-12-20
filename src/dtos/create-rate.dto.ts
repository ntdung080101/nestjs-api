import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateRateDto {
  @IsNumber()
  @ApiProperty({ type: 'int', required: false, default: 0 })
  productCode!: number;

  @IsNumber()
  @ApiProperty({ type: 'int', required: false, default: 0 })
  score!: number;
}

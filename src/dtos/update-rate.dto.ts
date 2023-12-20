import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateRateDto {
  @IsNumber()
  @ApiProperty({
    type: 'int',
    required: false,
    default: 0,
  })
  code!: number;

  @IsNumber()
  @ApiProperty({
    type: 'int',
    required: false,
    default: 0,
  })
  score!: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ListAllDetailOrderDto {
  @IsNumber()
  @ApiProperty({
    type: 'int',
    default: 0,
    required: true,
  })
  orderCode!: number;
}

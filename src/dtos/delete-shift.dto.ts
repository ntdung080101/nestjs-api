import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeleteShiftDto {
  @IsNumber()
  @ApiProperty({
    type: 'int',
    default: 0,
    required: true,
  })
  code!: number;
}

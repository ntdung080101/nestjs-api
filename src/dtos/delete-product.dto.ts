import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class DeleteProductDto {
  @Transform(({ value }) => +value)
  @IsNumber()
  @ApiProperty({
    type: 'int',
    required: false,
    default: 0,
  })
  code!: number;
}

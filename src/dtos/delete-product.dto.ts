import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric } from 'class-validator';

export class DeleteProductDto {
  @IsAlphanumeric()
  @ApiProperty({
    type: 'int',
    required: false,
    default: 0,
  })
  code!: number;
}

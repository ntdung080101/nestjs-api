import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric } from 'class-validator';

export class DeleteProductImageDto {
  @IsAlphanumeric()
  @ApiProperty({
    type: 'int',
    required: false,
    default: 0,
  })
  code!: number;

  @IsAlphanumeric()
  @ApiProperty({
    type: 'int',
    required: false,
    default: 0,
  })
  productCode!: number;
}

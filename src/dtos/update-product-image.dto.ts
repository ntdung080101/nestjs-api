import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsString } from 'class-validator';

export class UpdateProductImageDto {
  @IsAlphanumeric()
  @ApiProperty({
    type: 'int',
    required: false,
    default: 0,
  })
  productCode!: number;

  @IsString()
  @ApiProperty({
    type: 'varchar',
    required: true,
    default: '',
  })
  oldPath!: string;
}

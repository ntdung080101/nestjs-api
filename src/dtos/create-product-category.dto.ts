import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProductCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(30)
  @ApiProperty({
    type: 'varchar',
    default: 'name',
    maximum: 30,
    required: true,
    minimum: 1,
  })
  ten!: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty({
    type: 'text',
    default: '',
    maximum: 255,
    required: false,
  })
  mota = '';
}

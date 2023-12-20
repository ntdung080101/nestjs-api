import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateCategoryDto {
  @IsNumber()
  @ApiProperty({
    type: 'int',
    default: 0,
    required: true,
  })
  code!: number;

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
  name!: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty({
    type: 'text',
    default: '',
    maximum: 255,
    required: false,
  })
  describe = '';
}

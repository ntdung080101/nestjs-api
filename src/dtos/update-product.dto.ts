import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateProductDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({ type: 'int', required: false, default: 0 })
  code!: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(30)
  @ApiProperty({
    type: 'varchar',
    default: 'name',
    maximum: 20,
    required: true,
    minimum: 1,
  })
  name!: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ type: 'int', required: false, default: 0, minimum: 0 })
  price!: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ type: 'int', required: false, default: 0, minimum: 0 })
  categoryCode!: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ type: 'int', required: false, default: 0 })
  count!: number;

  @IsString()
  @MaxLength(255)
  @ApiProperty({
    type: 'varchar',
    default: '',
    maximum: 255,
    required: false,
  })
  ram = '';

  @IsString()
  @MaxLength(255)
  @ApiProperty({
    type: 'varchar',
    default: '',
    maximum: 255,
    required: false,
  })
  hardDrive = '';

  @IsString()
  @MaxLength(255)
  @ApiProperty({
    type: 'varchar',
    default: '',
    maximum: 255,
    required: false,
  })
  screen = '';

  @IsString()
  @ApiProperty({
    type: 'text',
    default: '',
    maximum: 255,
    required: false,
  })
  describe = '';
}

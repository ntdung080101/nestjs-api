import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateProviderDto {
  @IsNumber()
  @ApiProperty({
    type: 'int',
    required: false,
    default: 0,
  })
  code!: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  @ApiProperty({
    type: 'varchar',
    required: true,
    minimum: 1,
    maximum: 100,
    default: 'name',
  })
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  @ApiProperty({
    type: 'varchar',
    required: true,
    minimum: 1,
    maximum: 100,
    default: 'address',
  })
  address!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(10)
  @ApiProperty({
    type: 'char',
    required: true,
    minimum: 1,
    maximum: 10,
    default: '0123456789',
  })
  phoneNumber!: string;
}

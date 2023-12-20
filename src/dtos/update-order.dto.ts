import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateOrderDto {
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
  customerCode!: number;

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

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(10)
  @ApiProperty({
    type: 'char',
    default: '0123456789',
    maximum: 10,
    required: true,
    minimum: 1,
  })
  phoneNumber!: string;

  @IsNumber()
  @ApiProperty({
    type: 'float',
    default: 10,
    required: true,
  })
  discount!: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  @ApiProperty({
    type: 'varchar',
    default: 'address',
    maximum: 100,
    required: true,
    minimum: 1,
  })
  address!: string;

  @IsAlphanumeric()
  @ApiProperty({
    type: 'int',
    required: false,
    default: 0,
  })
  statusOrder!: number;
}

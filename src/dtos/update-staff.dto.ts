import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateStaffDto {
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
  @ApiProperty({
    type: 'varchar',
    default: 'name',
    required: true,
    minimum: 1,
  })
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({
    type: 'varchar',
    default: 'name',
    required: true,
    minimum: 1,
  })
  address!: string;

  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(1)
  @ApiProperty({
    type: 'char',
    default: '0123456789',
    required: true,
    minimum: 1,
  })
  phoneNumber!: string;

  @IsNumber()
  @ApiProperty({
    type: 'int',
    default: 0,
    required: true,
    minimum: 1,
  })
  permission!: number;

  @IsNumber()
  @ApiProperty({
    type: 'int',
    default: 0,
    required: true,
    minimum: 1,
  })
  gender!: number;
}

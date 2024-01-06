import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateStaffDto {
  @Transform(({ value }) => +value)
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

  @Transform(({ value }) => +value)
  @IsNumber()
  @ApiProperty({
    type: 'int',
    default: 0,
    required: true,
    minimum: 1,
  })
  permission!: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @ApiProperty({
    type: 'int',
    default: 0,
    required: true,
    minimum: 1,
  })
  gender!: number;
}

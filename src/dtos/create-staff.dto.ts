import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({ required: true, default: 'username', minimum: 1 })
  username!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({
    type: 'varchar',
    required: true,
    default: 'password',
    minimum: 1,
  })
  password!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({ type: 'varchar', required: true, default: 'name', minimum: 1 })
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({
    type: 'varchar',
    required: true,
    default: 'address',
    minimum: 1,
  })
  address!: string;

  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(1)
  @ApiProperty({
    type: 'varchar',
    required: true,
    default: '0123456789',
    minimum: 1,
  })
  phoneNumber!: string;

  @Transform(({ value }) => +value)
  @IsNumber()
  @ApiProperty({ required: true, default: 0, type: 'int' })
  gender!: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @ApiProperty({ required: true, default: 0, type: 'int' })
  role!: number;
}

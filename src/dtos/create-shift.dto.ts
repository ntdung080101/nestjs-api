import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateShiftDto {
  @IsNumber()
  @ApiProperty({
    type: 'int',
    default: 0,
    required: true,
  })
  staffCode!: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(20)
  @ApiProperty({
    type: 'varchar',
    default: 'name',
    required: true,
    maximum: 20,
    minimum: 1,
  })
  name!: string;

  @IsNumber()
  @ApiProperty({
    type: 'int',
    default: 0,
    required: true,
  })
  salary!: number;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    type: 'dateTime',
    default: new Date().toISOString(),
    required: true,
  })
  startTime!: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    type: 'dateTime',
    default: new Date().toISOString(),
    required: true,
  })
  endTime!: string;
}

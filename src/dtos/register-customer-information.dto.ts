import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
} from 'class-validator';

export class RegisterCustomerInformationDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @ApiProperty({ required: true, default: 'name', maximum: 20 })
  name!: string;

  @IsString()
  @MaxLength(50)
  @ApiProperty({ required: false, maximum: 50 })
  address?: string;

  @IsString()
  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(10)
  @ApiProperty({ required: true, default: '0123456789', maximum: 10 })
  phoneNumber!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: true })
  code!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: true })
  gmail!: string;
}

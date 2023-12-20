import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AccountDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  @ApiProperty({ required: true, type: 'string' })
  gmail!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ required: true, type: 'string' })
  password!: string;
}

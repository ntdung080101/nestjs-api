import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyRegisterCode {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: true })
  code!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: true })
  gmail!: string;
}

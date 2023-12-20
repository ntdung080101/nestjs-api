import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeleteStaffByCodeDto {
  @IsNumber()
  @ApiProperty({ type: 'int', required: true, default: 0 })
  code!: number;
}

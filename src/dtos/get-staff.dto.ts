import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric } from 'class-validator';

export class GetStaffDto {
  @IsAlphanumeric()
  @ApiProperty({ type: 'int', required: false, default: 0 })
  code!: number;
}

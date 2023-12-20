import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric } from 'class-validator';

export class ListAllCommentDto {
  @IsAlphanumeric()
  @ApiProperty({ type: 'int', required: false, default: 0 })
  productCode!: number;
}

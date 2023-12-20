import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  @ApiProperty({ type: 'int', required: false, default: 0 })
  customerCode!: number;

  @IsNumber()
  @ApiProperty({ type: 'int', required: false, default: 0 })
  productCode!: number;

  @IsNumber()
  @ApiProperty({ type: 'int', required: false, default: 0 })
  rely!: number | null;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  @ApiProperty({
    type: 'text',
    required: true,
    minimum: 1,
    default: 'content',
  })
  content!: string;
}

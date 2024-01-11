import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCommentDto {
  @Transform(({ value }) => +value)
  @IsNumber()
  @ApiProperty({ type: 'int', required: false, default: 0 })
  productCode!: number;

  @Transform(({ value }) => +value)
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

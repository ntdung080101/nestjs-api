import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class UpdateCommentDto {
  @IsNumber()
  @ApiProperty({
    type: 'int',
    required: false,
    default: 0,
  })
  code!: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({
    type: 'text',
    required: true,
    minimum: 1,
    maximum: 10,
    default: 'content',
  })
  content!: string;
}

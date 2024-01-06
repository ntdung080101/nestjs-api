import { Transform } from 'class-transformer';
import { IsDefined, IsNumber } from 'class-validator';

export class GetCategoryDto {
  @Transform(({ value }) => +value)
  @IsDefined()
  @IsNumber()
  code!: number;
}

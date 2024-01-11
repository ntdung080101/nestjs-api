import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ListAllProductDto {
  @Transform(({ value }) => +value)
  @IsNumber()
  page = 1;

  @Transform(({ value }) => +value)
  @IsNumber()
  limit = 20;
}

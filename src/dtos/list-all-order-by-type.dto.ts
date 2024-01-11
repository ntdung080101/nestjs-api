import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ListAllOrderByTypeDto {
  @Transform(({ value }) => +value)
  @IsNumber()
  type!: number;
}

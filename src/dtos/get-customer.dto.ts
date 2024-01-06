import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetCustomerDto {
  @Transform(({ value }) => +value)
  @IsNumber()
  code!: number;
}

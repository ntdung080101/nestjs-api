import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class DeleteCustomerDto {
  @Transform(({ value }) => +value)
  @IsNumber()
  code!: number;
}

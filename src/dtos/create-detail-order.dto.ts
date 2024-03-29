import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class CreateDetailOrderDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({ type: 'int', required: false, default: 0, minimum: 0 })
  price!: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ type: 'int', required: false, default: 0, minimum: 0 })
  count!: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ type: 'int', required: false, default: 0, minimum: 0 })
  orderCode!: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ type: 'int', required: false, default: 0, minimum: 0 })
  productCode!: Array<number>;
}

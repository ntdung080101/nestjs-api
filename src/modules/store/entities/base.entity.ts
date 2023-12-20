import { PrimaryColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryColumn({ type: 'int', generated: 'increment' })
  ma!: number;
}

import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({
  name: 'san_pham',
})
export class ProductEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  ten!: string;

  @Column({ type: 'float' })
  gia!: number;

  @Column({ type: 'int' })
  ma_loai!: number;

  @Column({ type: 'int' })
  so_luong!: number;

  @Column({ type: 'text' })
  mo_ta!: string;

  @Column({ type: 'varchar', length: 100 })
  ram!: string;

  @Column({ type: 'varchar', length: 100 })
  o_cung!: string;

  @Column({ type: 'varchar', length: 100 })
  man_hinh!: string;
}

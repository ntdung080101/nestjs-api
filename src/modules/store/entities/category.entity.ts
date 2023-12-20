import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({
  name: 'loai_san_pham',
})
export class CategoryEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30 })
  ten!: string;

  @Column({ type: 'varchar' })
  mo_ta!: string;
}

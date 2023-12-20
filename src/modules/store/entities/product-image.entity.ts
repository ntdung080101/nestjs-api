import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({
  name: 'hinh_san_pham',
})
export class ProductImageEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  hinh_anh!: string;

  @Column({ type: 'int' })
  ma_san_pham!: number;
}

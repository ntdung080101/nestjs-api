import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({
  name: 'chi_tiet_order',
})
export class DetailOrderEntity extends BaseEntity {
  @Column({ type: 'int' })
  ma_don!: number;

  @Column({ type: 'int', nullable: true })
  ma_san_pham!: number;

  @Column({ type: 'float' })
  don_gia!: number;

  @Column({ type: 'int' })
  so_luong!: number;
}

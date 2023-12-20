import { Column, Entity } from 'typeorm';

import { CURRENT_TIMESTAMP } from '../../../constraint';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'phieu_nhap_hang',
})
export class CouponEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  ten!: string;

  @Column({ type: 'float' })
  don_gia!: string;

  @Column({ type: 'int' })
  so_luong!: string;

  @Column({ type: 'datetime', default: () => CURRENT_TIMESTAMP })
  thoi_gian = Date.now();

  @Column({ type: 'int' })
  ma_nhan_vien!: number;
}

import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({
  name: 'chi_tiet_phieu_nhap_hang',
})
export class CouponDetailEntity extends BaseEntity {
  @Column({ type: 'int' })
  ma_san_pham!: number;

  @Column({ type: 'datetime' })
  thoi_gian = Date.now();

  @Column({ type: 'int' })
  so_luong!: number;

  @Column({ type: 'float' })
  don_gia!: number;

  @Column({ type: 'text' })
  thong_tin!: string;
}

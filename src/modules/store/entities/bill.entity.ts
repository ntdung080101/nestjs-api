import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({
  name: 'hoa_don',
})
export class BillEntity extends BaseEntity {
  @Column({ type: 'float' })
  tong_tien!: number;

  @Column({ type: 'datetime' })
  thoi_gian_thanh_toan!: Date | null;

  @Column({ type: 'int' })
  ma_nhan_vien!: number;

  @Column({ type: 'int' })
  ma_khach_hang!: number;
}

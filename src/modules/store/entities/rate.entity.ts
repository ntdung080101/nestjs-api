import { Column, Entity } from 'typeorm';

import { CURRENT_TIMESTAMP } from '../../../constraint';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'danh_gia',
})
export class RateEntity extends BaseEntity {
  @Column({ type: 'int' })
  diem!: number;

  @Column({ type: 'datetime', default: () => CURRENT_TIMESTAMP })
  thoi_gian = new Date().toISOString();

  @Column({ type: 'int' })
  ma_khach_hang!: number;

  @Column({ type: 'int' })
  ma_san_pham!: number;
}

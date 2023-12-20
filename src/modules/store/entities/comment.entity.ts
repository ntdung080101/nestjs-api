import { Column, Entity } from 'typeorm';

import { CURRENT_TIMESTAMP } from '../../../constraint';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'binh_luan',
})
export class CommentEntity extends BaseEntity {
  @Column({ type: 'text' })
  noi_dung!: string;

  @Column({ type: 'datetime', default: () => CURRENT_TIMESTAMP })
  thoi_gian = Date.now();

  @Column({ type: 'int' })
  ma_khach_hang!: number;

  @Column({ type: 'int' })
  ma_san_pham!: number;

  @Column({ type: 'int' })
  tra_loi!: number | null;
}

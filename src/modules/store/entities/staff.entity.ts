import { Column, Entity } from 'typeorm';

import { CURRENT_TIMESTAMP } from '../../../constraint';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'nhan_vien',
})
export class StaffEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 20 })
  ten!: string;

  @Column({ type: 'varchar', nullable: true, length: 50, default: null })
  dia_chi: string | null = null;

  @Column({ type: 'char', length: 10 })
  so_dien_thoai!: string;

  @Column({ type: 'int' })
  chuc_vu!: number;

  @Column({ type: 'date', default: () => CURRENT_TIMESTAMP })
  ngay_vao_lam!: Date;

  @Column({ type: 'tinyint', default: 1 })
  gioi_tinh: number = 1;

  @Column({ type: 'int', default: 1 })
  phan_quyen: number = 1;

  @Column({ type: 'int' })
  ma_tai_khoan!: number;

  @Column({ type: 'varchar', default: '' })
  hinh_anh?: string = '';
}

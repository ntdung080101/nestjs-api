import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({
  name: 'khach_hang',
})
export class CustomerEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30 })
  ten!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  dia_chi?: string | null = null;

  @Column({ type: 'char', length: 10 })
  so_dien_thoai!: string;

  @Column({ type: 'int', default: 0 })
  diem_tich_luy: number = 0;

  @Column({ type: 'int' })
  ma_tai_khoan!: number;

  @Column({ type: 'varchar', default: '' })
  hinh_anh?: string;
}

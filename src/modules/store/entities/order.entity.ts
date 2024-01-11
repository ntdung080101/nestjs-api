import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({
  name: 'order',
})
export class OrderEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30 })
  ten_khach_hang!: string;

  @Column({ type: 'char', length: 10 })
  so_dien_thoai!: string;

  @Column({ type: 'varchar', length: 100 })
  dia_chi!: string;

  @Column({ type: 'float' })
  khuyen_mai!: number;

  @Column({ type: 'char' })
  ma_khach_hang!: number;

  @Column({ type: 'int' })
  trang_thai: number = 0;

  @Column({ type: 'varchar' })
  ngay_dat: string = new Date().toISOString();

  @Column({ type: 'int' })
  tong_tien: number = 0;

  @Column({ type: 'int' })
  loai: number = 0;
}

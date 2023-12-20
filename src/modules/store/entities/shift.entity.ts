import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({
  name: 'ca_lam_viec',
})
export class ShiftEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 20 })
  ten!: string;

  @Column({ type: 'datetime' })
  gio_bat_dau!: Date;

  @Column({ type: 'datetime' })
  gio_ket_thuc!: Date;

  @Column({ type: 'float' })
  so_tien!: number;

  @Column({ type: 'int' })
  ma_nhan_vien!: number;
}

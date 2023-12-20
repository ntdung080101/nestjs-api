import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({
  name: 'tai_khoan',
})
export class AccountEntity extends BaseEntity {
  @Column({ type: 'char', length: 100 })
  ten_dang_nhap!: string;

  @Column({ type: 'char', length: 100 })
  mat_khau!: string;

  @Column({ type: 'int', default: 1 })
  role!: number;
}

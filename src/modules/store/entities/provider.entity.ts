import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({
  name: 'nha_cung_cap',
})
export class ProviderEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  ten!: string;

  @Column({ type: 'char', length: 10 })
  so_dien_thoai!: string;

  @Column({ type: 'varchar', length: 100 })
  dia_chi!: string;
}

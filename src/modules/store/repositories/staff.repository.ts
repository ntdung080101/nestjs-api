import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StaffPermission, StaffRules } from '../../../enums/role.enum';
import { StaffEntity } from '../entities/staff.entity';

@Injectable()
export class StaffRepository {
  private logger = new Logger(StaffRepository.name);
  constructor(
    @InjectRepository(StaffEntity)
    private readonly staffRepository: Repository<StaffEntity>,
  ) {}

  async findOneAccountByCode(id: number): Promise<StaffEntity | Error> {
    try {
      this.logger.verbose('.findOneCustomer');

      const result = await this.staffRepository.findOne({
        where: { ma_tai_khoan: id },
      });

      if (result === null) {
        return new Error('Staff not found');
      }

      return result;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async listAllStaff(): Promise<Array<StaffEntity> | Error> {
    try {
      this.logger.verbose('.listAllStaff');

      return this.staffRepository.find({});
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async findOneStaffByCode(id: number): Promise<StaffEntity | Error> {
    try {
      this.logger.verbose('.findOneStaffByCode', { id });

      const result = await this.staffRepository.findOne({
        where: { ma: id },
      });

      if (result === null) {
        return new Error('Staff not found');
      }

      return result;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async deleteStaffByCode(id: number): Promise<boolean | Error> {
    try {
      this.logger.verbose('.deleteStaffByCode', { id });

      const result = await this.staffRepository.delete({
        ma: id,
      });

      this.logger.debug(JSON.stringify(result, null, 2));

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async updateStaff(
    id: number,
    name: string,
    address: string,
    phoneNumber: string,
    gender: number,
    permission: number,
  ): Promise<boolean | Error> {
    try {
      this.logger.verbose('updateStaff', {
        id,
        name,
        address,
        phoneNumber,
        gender,
        permission,
      });

      const result = await this.staffRepository.update(
        { ma: id },
        {
          ten: name,
          dia_chi: address,
          so_dien_thoai: phoneNumber,
          gioi_tinh: gender,
          phan_quyen: permission,
        },
      );

      this.logger.debug(JSON.stringify(result, null, 2));

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async createStaff(
    name: string,
    address: string,
    gender: number,
    phoneNumber: string,
    role: StaffRules,
    accountCode: number,
  ): Promise<boolean | Error> {
    try {
      this.logger.verbose('createStaff');

      const result = await this.staffRepository.insert({
        ten: name,
        dia_chi: address,
        gioi_tinh: gender,
        chuc_vu: role,
        phan_quyen: StaffPermission.STAFF,
        so_dien_thoai: phoneNumber,
        ma_tai_khoan: accountCode,
      });

      this.logger.debug(JSON.stringify(result, null, 2));

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }
}

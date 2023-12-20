import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ShiftEntity } from '../entities/shift.entity';

export class ShiftRepository {
  private logger = new Logger(ShiftRepository.name);
  constructor(
    @InjectRepository(ShiftEntity)
    private readonly shiftRepository: Repository<ShiftEntity>,
  ) {}

  async listAllShift(): Promise<Array<ShiftEntity> | Error> {
    try {
      this.logger.verbose('.listAllShift');

      return this.shiftRepository.find({});
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async getOneShift(code: number): Promise<ShiftEntity | Error> {
    try {
      this.logger.verbose('.getOneShift'), { code };

      const result = await this.shiftRepository.findOne({
        where: { ma: code },
      });

      if (result === null) {
        return new Error('shift not found');
      }

      return result;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async createShift(
    name: string,
    staffCode: number,
    salary: number,
    startTime: string,
    endTime: string,
  ): Promise<boolean | Error> {
    try {
      this.logger.verbose('.createShift', {
        name,
        staffCode,
        salary,
        startTime,
        endTime,
      });

      const result = await this.shiftRepository.insert({
        gio_bat_dau: startTime,
        gio_ket_thuc: endTime,
        ten: name,
        so_tien: salary,
        ma_nhan_vien: staffCode,
      });

      this.logger.debug(JSON.stringify(result, null, 2));

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async updateShift(
    code: number,
    name: string,
    staffCode: number,
    salary: number,
    startTime: string,
    endTime: string,
  ): Promise<boolean | Error> {
    try {
      this.logger.verbose('.updateShift', {
        code,
        name,
        staffCode,
        salary,
        startTime,
        endTime,
      });

      const result = await this.shiftRepository.update(
        { ma: code },
        {
          gio_bat_dau: startTime,
          gio_ket_thuc: endTime,
          ten: name,
          so_tien: salary,
          ma_nhan_vien: staffCode,
        },
      );

      this.logger.debug(JSON.stringify(result, null, 2));

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async deleteShift(code: number): Promise<boolean | Error> {
    try {
      this.logger.verbose('.deleteShift', {
        code,
      });

      const result = await this.shiftRepository.delete({ ma: code });

      this.logger.debug(JSON.stringify(result, null, 2));

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }
}

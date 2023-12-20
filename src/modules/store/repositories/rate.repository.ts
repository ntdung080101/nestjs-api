import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RateEntity } from '../entities/rate.entity';

export class RateRepository {
  private logger = new Logger(RateRepository.name);
  constructor(
    @InjectRepository(RateEntity)
    private readonly rateRepository: Repository<RateEntity>,
  ) {}

  async listAllRate(productCode: number): Promise<Array<RateEntity> | Error> {
    try {
      this.logger.verbose('.listAllRate', { productCode });

      return this.rateRepository.find({ where: { ma_san_pham: productCode } });
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async getOneRate(code: number): Promise<RateEntity | Error> {
    try {
      this.logger.verbose('.getOneRate'), { code };

      const result = await this.rateRepository.findOne({
        where: { ma: code },
      });

      if (result === null) {
        return new Error('Rate not found');
      }

      return result;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async createRate(
    score: number,
    productCode: number,
    customerCode: number,
  ): Promise<boolean | Error> {
    try {
      this.logger.verbose('.createRate', {
        score,
        productCode,
        customerCode,
      });

      const result = await this.rateRepository.insert({
        diem: score,
        ma_san_pham: productCode,
        ma_khach_hang: customerCode,
      });

      this.logger.debug(JSON.stringify(result, null, 2));

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async updateRate(
    code: number,
    score: number,
    customerCode: number,
  ): Promise<boolean | Error> {
    try {
      this.logger.verbose('.updateRate', {
        code,
        customerCode,
        score,
      });

      const result = await this.rateRepository.update(
        { ma: code, ma_khach_hang: customerCode },
        {
          diem: score,
        },
      );

      this.logger.debug(JSON.stringify(result, null, 2));

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async deleteRate(
    code: number,
    customerCode: number,
  ): Promise<boolean | Error> {
    try {
      this.logger.verbose('.deleteRate', {
        code,
        customerCode,
      });

      const result = await this.rateRepository.delete({
        ma: code,
        ma_khach_hang: customerCode,
      });

      this.logger.debug(JSON.stringify(result, null, 2));

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }
}

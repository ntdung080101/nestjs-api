import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DetailOrderEntity } from '../entities/detail-order.entity';

export class DetailOrderRepository {
  private logger = new Logger(DetailOrderRepository.name);
  constructor(
    @InjectRepository(DetailOrderEntity)
    private readonly rateRepository: Repository<DetailOrderEntity>,
  ) {}

  async listAllDetailOrder(
    orderCode: number,
  ): Promise<Array<DetailOrderEntity> | Error> {
    try {
      this.logger.verbose('.listAllDetailOrder', { orderCode });

      return this.rateRepository.find({ where: { ma_don: orderCode } });
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async getOneDetailOrder(code: number): Promise<DetailOrderEntity | Error> {
    try {
      this.logger.verbose('.getOneDetailOrder'), { code };

      const result = await this.rateRepository.findOne({
        where: { ma: code },
      });

      if (result === null) {
        return new Error('Detail order not found');
      }

      return result;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async createDetailOrder(
    orderCode: number,
    productCode: number,
    count: number,
    price: number,
  ): Promise<boolean | Error> {
    try {
      this.logger.verbose('.createDetailOrder', {
        orderCode,
        price,
        count,
        productCode,
      });

      const result = await this.rateRepository.insert({
        ma_don: orderCode,
        so_luong: count,
        don_gia: price,
        ma_san_pham: productCode,
      });

      this.logger.debug(JSON.stringify(result, null, 2));

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async updateDetailOrder(
    code: number,
    orderCode: number,
    count: number,
    price: number,
  ): Promise<boolean | Error> {
    try {
      this.logger.verbose('.updateDetailOrder', {
        code,
        orderCode,
        price,
        count,
      });

      const result = await this.rateRepository.update(
        { ma: code, ma_don: orderCode },
        {
          so_luong: count,
          don_gia: price,
        },
      );

      this.logger.debug(JSON.stringify(result, null, 2));

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async deleteDetailOrder(code: number): Promise<boolean | Error> {
    try {
      this.logger.verbose('.deleteDetailOrder', {
        code,
      });

      const result = await this.rateRepository.delete({
        ma: code,
      });

      this.logger.debug(JSON.stringify(result, null, 2));

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }
}

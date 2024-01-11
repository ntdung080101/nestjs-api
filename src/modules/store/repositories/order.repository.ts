import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class OrderRepository {
  private logger = new Logger(OrderRepository.name);
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async listAllOrder(): Promise<Array<OrderEntity> | Error> {
    try {
      this.logger.verbose('.listAllOrder');

      return this.orderRepository.find();
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async listAllOrderByType(type: number): Promise<Array<OrderEntity> | Error> {
    try {
      this.logger.verbose('.listAllOrderByType');

      return this.orderRepository.find({
        where: {
          loai: type,
        },
      });
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async listOrderOfMe(
    customerCode: number,
  ): Promise<Array<OrderEntity> | Error> {
    try {
      this.logger.verbose('.listOrderOfMe');

      return this.orderRepository.find({
        where: { ma_khach_hang: customerCode },
      });
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async findOneOrder(code: number): Promise<OrderEntity | Error> {
    try {
      this.logger.verbose('.findOneOrder', { code });

      const result = await this.orderRepository.findOne({
        where: { ma: code },
      });

      if (result === null) {
        return new Error('Not found order');
      }

      return result;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async createOrder(
    name: string,
    phoneNumber: string,
    discount: number,
    address: string,
    customerCode: number,
  ): Promise<boolean | Error> {
    try {
      this.logger.verbose('.createOrder', {
        name,
        phoneNumber,
        discount,
        address,
        customerCode,
      });

      const insertResult = await this.orderRepository.insert({
        ma_khach_hang: customerCode,
        dia_chi: address,
        khuyen_mai: discount,
        so_dien_thoai: phoneNumber,
        ten_khach_hang: name,
      });

      this.logger.debug(JSON.stringify(insertResult, null, 2));

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async updateOrder(
    code: number,
    name: string,
    phoneNumber: string,
    discount: number,
    address: string,
    customerCode: number,
    statusOrder: number,
  ): Promise<boolean | Error> {
    try {
      this.logger.verbose('.updateOrder', {
        code,
        name,
        phoneNumber,
        discount,
        address,
        customerCode,
      });

      const insertResult = await this.orderRepository.update(
        {
          ma: code,
        },
        {
          ma_khach_hang: customerCode,
          dia_chi: address,
          khuyen_mai: discount,
          so_dien_thoai: phoneNumber,
          ten_khach_hang: name,
          trang_thai: statusOrder,
        },
      );

      this.logger.debug(JSON.stringify(insertResult, null, 2));

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async deleteOrder(code: number): Promise<boolean | Error> {
    try {
      this.logger.verbose('.deleteOrder', { code });

      const result = await this.orderRepository.delete({
        ma: code,
      });

      this.logger.debug(JSON.stringify(result, null, 2));

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async deleteOrderOfMe(
    code: number,
    customerCode: number,
  ): Promise<boolean | Error> {
    try {
      this.logger.verbose('.deleteOrderOfMe', { code, customerCode });

      const result = await this.orderRepository.delete({
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

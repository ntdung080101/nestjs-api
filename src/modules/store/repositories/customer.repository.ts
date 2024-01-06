import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CustomerEntity } from '../entities/customer.entity';

@Injectable()
export class CustomerRepository {
  private logger = new Logger(CustomerRepository.name);
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async listCustomer(): Promise<Array<CustomerEntity> | Error> {
    try {
      this.logger.verbose('.listCustomer');

      return await this.customerRepository.find({});
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async deleteCustomer(code: number): Promise<boolean | Error> {
    try {
      this.logger.verbose('.deleteCustomer');

      await this.customerRepository.delete({ ma: code });

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async getCustomer(id: number): Promise<CustomerEntity | Error> {
    try {
      this.logger.verbose('.getCustomer', { id });

      const result = await this.customerRepository.findOne({
        where: { ma: id },
      });

      if (result === null) {
        return new Error('Customer not found');
      }

      return result;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async findOneAccountByCode(id: number): Promise<CustomerEntity | Error> {
    try {
      this.logger.verbose('.findOneCustomer', { id });

      const result = await this.customerRepository.findOne({
        where: { ma_tai_khoan: id },
      });

      if (result === null) {
        return new Error('Customer not found');
      }

      return result;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async createOneAccount(
    name: string,
    phoneNumber: string,
    accountCode: number,
    address: string | undefined,
  ): Promise<CustomerEntity | Error> {
    try {
      this.logger.verbose('.createOneAccount', {
        name,
        phoneNumber,
        accountCode,
        address,
      });

      const inserResult = await this.customerRepository.insert({
        dia_chi: address,
        ten: name,
        so_dien_thoai: phoneNumber,
        ma_tai_khoan: accountCode,
      });

      return inserResult.raw as CustomerEntity;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }
}

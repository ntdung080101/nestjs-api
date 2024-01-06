import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductEntity } from '../entities/product.entity';

export class ProductRepository {
  private logger = new Logger(ProductRepository.name);
  constructor(
    @InjectRepository(ProductEntity)
    private readonly rateRepository: Repository<ProductEntity>,
  ) {}

  async listAllProduct(): Promise<Array<ProductEntity> | Error> {
    try {
      this.logger.verbose('.listAllProduct');

      return this.rateRepository.find();
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async getOneProduct(code: number): Promise<ProductEntity | Error> {
    try {
      this.logger.verbose('.getOneProduct'), { code };

      const result = await this.rateRepository.findOne({
        where: { ma: code },
      });

      if (result === null) {
        return new Error('Product not found');
      }

      return result;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async createProduct(
    name: string,
    price: number,
    categoryCode: number,
    count: number,
    describe: string,
    ram: string,
    hardDrive: string,
    screen: string,
  ): Promise<number | Error> {
    try {
      this.logger.verbose('.createProduct', {
        name,
        price,
        categoryCode,
        count,
        describe,
        ram,
        hardDrive,
        screen,
      });

      const result = await this.rateRepository.insert({
        ram,
        gia: price,
        ma_loai: categoryCode,
        ten: name,
        man_hinh: screen,
        mo_ta: describe,
        o_cung: hardDrive,
        so_luong: count,
      });

      return result.identifiers[0].ma;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async updateProduct(
    code: number,
    name: string,
    price: number,
    categoryCode: number,
    count: number,
    describe: string,
    ram: string,
    hardDrive: string,
    screen: string,
  ): Promise<boolean | Error> {
    try {
      this.logger.verbose('.updateProduct', {
        code,
        ram,
        gia: price,
        ma_loai: categoryCode,
        ten: name,
        man_hinh: screen,
        mo_ta: describe,
        o_cung: hardDrive,
        so_luong: count,
      });

      const result = await this.rateRepository.update(
        { ma: code },
        {
          ram,
          gia: price,
          ma_loai: categoryCode,
          ten: name,
          man_hinh: screen,
          mo_ta: describe,
          o_cung: hardDrive,
          so_luong: count,
        },
      );

      this.logger.debug(JSON.stringify(result, null, 2));

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async deleteProduct(code: number): Promise<boolean | Error> {
    try {
      this.logger.verbose('.deleteProduct', {
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

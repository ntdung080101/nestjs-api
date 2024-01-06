import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductImageEntity } from '../entities/product-image.entity';

@Injectable()
export class ProductImageRepository {
  private logger = new Logger(ProductImageRepository.name);
  constructor(
    @InjectRepository(ProductImageEntity)
    private readonly productImageRepository: Repository<ProductImageEntity>,
  ) {}

  async findOneImageByCode(code: number): Promise<ProductImageEntity | Error> {
    this.logger.verbose('.findOneImageByCode', { code });

    try {
      const result = await this.productImageRepository.findOne({
        where: { ma: code },
      });

      if (result === null) {
        return new Error('Image not found');
      }

      return result;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async listProductImage(
    productCode: number,
  ): Promise<Array<ProductImageEntity> | Error> {
    try {
      this.logger.verbose('.listCategory', { imageCode: productCode });

      return this.productImageRepository.find({
        where: { ma_san_pham: productCode },
      });
    } catch (e) {
      this.logger.error((e as Error).message);

      return new Error((e as Error).message);
    }
  }

  async getProductImage(
    productCode: number,
    imagePath: string,
  ): Promise<Array<ProductImageEntity> | Error> {
    try {
      this.logger.verbose('.getProductImage', { productCode, imagePath });

      return this.productImageRepository.find({
        where: { ma_san_pham: productCode, hinh_anh: imagePath },
      });
    } catch (e) {
      this.logger.error((e as Error).message);

      return new Error((e as Error).message);
    }
  }

  async createImage(
    productCode: number,
    image: string,
  ): Promise<boolean | Error> {
    try {
      this.logger.verbose('.createImage', { productCode, image });

      const insertResult = await this.productImageRepository.insert({
        ma_san_pham: productCode,
        hinh_anh: image,
      });

      this.logger.debug(JSON.stringify(insertResult, null, 2));

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async deleteImage(
    code: number,
    productCode: number,
  ): Promise<boolean | Error> {
    try {
      this.logger.verbose('.deleteImage', { code });

      const result = await this.productImageRepository.delete({
        ma: code,
        ma_san_pham: productCode,
      });

      this.logger.debug(JSON.stringify(result, null, 2));

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async updateImage(
    code: number,
    oldPath: string,
    newPath: string,
  ): Promise<boolean | Error> {
    try {
      this.logger.verbose('.updateImage', { code, oldPath, newPath });

      const result = await this.productImageRepository.update(
        { ma_san_pham: code, hinh_anh: oldPath },
        { hinh_anh: newPath },
      );

      this.logger.debug(JSON.stringify(result, null, 2));

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }
}

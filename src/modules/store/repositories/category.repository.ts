import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoryRepository {
  private logger = new Logger(CategoryRepository.name);
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findOneCategoryByCode(code: number): Promise<CategoryEntity | Error> {
    this.logger.verbose('.findOneCategoryByCode', { code });

    try {
      const result = await this.categoryRepository.findOne({
        where: { ma: code },
      });

      if (result === null) {
        return new Error('Category not found');
      }

      return result;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async getCategory(code: number): Promise<CategoryEntity | Error> {
    try {
      this.logger.verbose('.getCategory', { code });

      const category = await this.categoryRepository.findOne({
        where: { ma: code },
      });

      if (category === null) {
        return Error('Category not found');
      }

      return category;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async listCategory(): Promise<Array<CategoryEntity> | Error> {
    try {
      this.logger.verbose('.listCategory');

      return this.categoryRepository.find({});
    } catch (e) {
      this.logger.error((e as Error).message);

      return new Error((e as Error).message);
    }
  }

  async createCategory(
    name: string,
    describe: string,
  ): Promise<CategoryEntity | Error> {
    try {
      this.logger.verbose('.createCategory');

      const insertResult = await this.categoryRepository.insert({
        ten: name,
        mo_ta: describe,
      });

      const category = await this.findOneCategoryByCode(
        insertResult.raw.insertId as number,
      );

      return category;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async updateCategory(
    code: number,
    name: string,
    describe: string,
  ): Promise<boolean | Error> {
    try {
      this.logger.verbose('.updateCategory', { code, name, describe });

      const result = await this.categoryRepository.update(
        { ma: code },
        { ten: name, mo_ta: describe },
      );
      this.logger.debug(JSON.stringify(result, null, 2));

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }

  async deleteCategory(code: number): Promise<boolean | Error> {
    try {
      this.logger.verbose('.deleteCategory', { code });

      const result = await this.categoryRepository.delete({ ma: code });

      this.logger.debug(JSON.stringify(result, null, 2));

      return true;
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }
}

import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { CategoryEntity } from '../../../store/entities/category.entity';
import { CategoryRepository } from '../../../store/repositories/category.repository';
import { ListCategoryQuery } from '../impl';

@QueryHandler(ListCategoryQuery)
export class ListCategoryHandler implements IQueryHandler<ListCategoryQuery> {
  private logger = new Logger(ListCategoryHandler.name);

  constructor(private categoryRepository: CategoryRepository) {}

  async execute(
    query: ListCategoryQuery,
  ): Promise<Array<CategoryEntity> | Error> {
    this.logger.verbose('.execute', { query });

    return this.categoryRepository.listCategory();
  }
}

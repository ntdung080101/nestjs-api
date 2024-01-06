import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { CategoryEntity } from '../../../store/entities/category.entity';
import { CategoryRepository } from '../../../store/repositories/category.repository';
import { GetCategoryQuery } from '../impl';

@QueryHandler(GetCategoryQuery)
export class GetCategoryHandler implements IQueryHandler<GetCategoryQuery> {
  private logger = new Logger(GetCategoryHandler.name);

  constructor(private categoryRepository: CategoryRepository) {}

  async execute(query: GetCategoryQuery): Promise<CategoryEntity | Error> {
    this.logger.verbose('.execute', { query });

    return this.categoryRepository.getCategory(query.code);
  }
}

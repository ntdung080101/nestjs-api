import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CategoryEntity } from '../../../store/entities/category.entity';
import { CategoryRepository } from '../../../store/repositories/category.repository';
import { CreateCategoryCommand } from '../impl';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler
  implements ICommandHandler<CreateCategoryCommand>
{
  private logger = new Logger(CreateCategoryHandler.name);

  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(query: CreateCategoryCommand): Promise<CategoryEntity | Error> {
    this.logger.verbose('.execute', { query });

    return this.categoryRepository.createCategory(query.name, query.describe);
  }
}

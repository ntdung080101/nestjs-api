import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CategoryRepository } from '../../../store/repositories/category.repository';
import { UpdateCategoryCommand } from '../impl';

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler
  implements ICommandHandler<UpdateCategoryCommand>
{
  private readonly logger = new Logger(UpdateCategoryHandler.name);

  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(query: UpdateCategoryCommand): Promise<boolean | Error> {
    this.logger.verbose('execute', { query });

    return this.categoryRepository.updateCategory(
      query.code,
      query.name,
      query.describe,
    );
  }
}

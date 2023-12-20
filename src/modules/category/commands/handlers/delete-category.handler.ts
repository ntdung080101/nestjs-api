import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CategoryRepository } from '../../../store/repositories/category.repository';
import { DeleteCategoryCommand } from '../impl';

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler
  implements ICommandHandler<DeleteCategoryCommand>
{
  private readonly logger = new Logger();
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(query: DeleteCategoryCommand): Promise<boolean | Error> {
    this.logger.verbose('execute', { query });

    return this.categoryRepository.deleteCategory(query.code);
  }
}

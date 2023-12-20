import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ProductRepository } from '../../../store/repositories/product.repository';
import { DeleteProductCommand } from '../impl';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProductCommand>
{
  private readonly logger = new Logger(DeleteProductHandler.name);

  constructor(private readonly productRepository: ProductRepository) {}

  async execute(query: DeleteProductCommand): Promise<boolean | Error> {
    this.logger.verbose('.execute', { query });

    return this.productRepository.deleteProduct(query.code);
  }
}

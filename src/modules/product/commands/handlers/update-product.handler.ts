import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ProductRepository } from '../../../store/repositories/product.repository';
import { UpdateProductCommand } from '../impl';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand>
{
  private readonly logger = new Logger(UpdateProductHandler.name);

  constructor(private readonly productRepository: ProductRepository) {}
  async execute(query: UpdateProductCommand): Promise<boolean | Error> {
    this.logger.verbose('.execute', { query });

    return this.productRepository.updateProduct(
      query.code,
      query.name,
      query.price,
      query.categoryCode,
      query.count,
      query.describe,
      query.ram,
      query.hardDrive,
      query.screen,
    );
  }
}

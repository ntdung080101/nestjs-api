import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ProductRepository } from '../../../store/repositories/product.repository';
import { CreateProductCommand } from '../impl';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  private readonly logger = new Logger(CreateProductHandler.name);

  constructor(private readonly productRepository: ProductRepository) {}

  async execute(query: CreateProductCommand): Promise<boolean | Error> {
    this.logger.verbose('.execute', { query });

    return this.productRepository.createProduct(
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

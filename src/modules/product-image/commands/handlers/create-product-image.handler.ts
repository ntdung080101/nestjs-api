import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ProductImageRepository } from '../../../store/repositories/product-image.repository';
import { CreateProductImageCommand } from '../impl';

@CommandHandler(CreateProductImageCommand)
export class CreateProductImageHandler
  implements ICommandHandler<CreateProductImageCommand>
{
  private logger = new Logger(CreateProductImageHandler.name);

  constructor(
    private readonly productImageRepository: ProductImageRepository,
  ) {}

  async execute(query: CreateProductImageCommand): Promise<boolean | Error> {
    this.logger.verbose('.execute', { query });

    for (let index = 0; index < query.image.length; index++) {
      const result = await this.productImageRepository.createImage(
        query.productCode,
        query.image[index],
      );

      if (result instanceof Error) {
        return result;
      }
    }

    return true;
  }
}

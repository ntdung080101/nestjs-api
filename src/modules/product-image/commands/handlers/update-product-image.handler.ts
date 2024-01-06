import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ProductImageRepository } from '../../../store/repositories/product-image.repository';
import { UpdateProductImageCommand } from '../impl';

@CommandHandler(UpdateProductImageCommand)
export class UpdateProductImageHandler
  implements ICommandHandler<UpdateProductImageCommand>
{
  private logger = new Logger(UpdateProductImageHandler.name);

  constructor(
    private readonly productImageRepository: ProductImageRepository,
  ) {}

  async execute(query: UpdateProductImageCommand): Promise<boolean | Error> {
    this.logger.verbose('.execute', { query });

    return await this.productImageRepository.updateImage(
      query.code,
      query.oldPath,
      query.newPath,
    );
  }
}

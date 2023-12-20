import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ProductImageRepository } from '../../../store/repositories/product-image.repository';
import { DeleteProductImageCommand } from '../impl';

@CommandHandler(DeleteProductImageCommand)
export class DeleteProductImageHandler
  implements ICommandHandler<DeleteProductImageCommand>
{
  private readonly logger = new Logger();
  constructor(
    private readonly productImageRepository: ProductImageRepository,
  ) {}

  async execute(query: DeleteProductImageCommand): Promise<boolean | Error> {
    this.logger.verbose('execute', { query });

    return this.productImageRepository.deleteImage(
      query.code,
      query.productCode,
    );
  }
}

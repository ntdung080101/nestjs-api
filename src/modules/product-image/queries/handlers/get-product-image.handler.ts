import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ProductImageEntity } from '../../../store/entities/product-image.entity';
import { ProductImageRepository } from '../../../store/repositories/product-image.repository';
import { GetProductImageQuery } from '../impl';

@QueryHandler(GetProductImageQuery)
export class GetProductImageHandler
  implements IQueryHandler<GetProductImageQuery>
{
  private logger = new Logger(GetProductImageHandler.name);

  constructor(private productImageRepository: ProductImageRepository) {}

  async execute(
    query: GetProductImageQuery,
  ): Promise<Array<ProductImageEntity> | Error> {
    this.logger.verbose('.execute', { query });

    return this.productImageRepository.getProductImage(
      query.code,
      query.imagePath,
    );
  }
}

import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ProductImageEntity } from '../../../store/entities/product-image.entity';
import { ProductImageRepository } from '../../../store/repositories/product-image.repository';
import { ListProductImageQuery } from '../impl';

@QueryHandler(ListProductImageQuery)
export class ListProductImageHandler
  implements IQueryHandler<ListProductImageQuery>
{
  private logger = new Logger(ListProductImageHandler.name);

  constructor(private productImageRepository: ProductImageRepository) {}

  async execute(
    query: ListProductImageQuery,
  ): Promise<Array<ProductImageEntity> | Error> {
    this.logger.verbose('.execute', { query });

    return this.productImageRepository.listProductImage(query.productCode);
  }
}

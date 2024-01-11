import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ProductEntity } from '../../../store/entities/product.entity';
import { ProductRepository } from '../../../store/repositories/product.repository';
import { ListAllProductQuery } from '../impl';

@QueryHandler(ListAllProductQuery)
export class ListAllProductHandler
  implements IQueryHandler<ListAllProductQuery>
{
  private readonly logger = new Logger(ListAllProductQuery.name);

  constructor(private readonly productRepository: ProductRepository) {}

  async execute(
    query: ListAllProductQuery,
  ): Promise<Array<ProductEntity> | Error> {
    this.logger.verbose('.execute', { query });

    return this.productRepository.listAllProduct(query.page, query.limit);
  }
}

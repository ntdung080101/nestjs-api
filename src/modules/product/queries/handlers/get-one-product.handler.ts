import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ProductEntity } from '../../../store/entities/product.entity';
import { ProductRepository } from '../../../store/repositories/product.repository';
import { GetOneProductQuery } from '../impl';

@QueryHandler(GetOneProductQuery)
export class GetOneProductHandler implements IQueryHandler<GetOneProductQuery> {
  private readonly logger = new Logger(GetOneProductHandler.name);

  constructor(private readonly productRepository: ProductRepository) {}

  async execute(query: GetOneProductQuery): Promise<ProductEntity | Error> {
    this.logger.verbose('.execute', { query });

    return this.productRepository.getOneProduct(query.code);
  }
}

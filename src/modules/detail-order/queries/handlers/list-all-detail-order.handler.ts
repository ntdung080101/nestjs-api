import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { DetailOrderEntity } from '../../../store/entities/detail-order.entity';
import { DetailOrderRepository } from '../../../store/repositories/detail-order.repository';
import { ListAllDetailOrderQuery } from '../impl';

@QueryHandler(ListAllDetailOrderQuery)
export class ListAllDetailOrderHandler
  implements IQueryHandler<ListAllDetailOrderQuery>
{
  private readonly logger = new Logger(ListAllDetailOrderQuery.name);

  constructor(private readonly detailOrderRepository: DetailOrderRepository) {}

  async execute(
    query: ListAllDetailOrderQuery,
  ): Promise<Array<DetailOrderEntity> | Error> {
    this.logger.verbose('.execute', { query });

    return this.detailOrderRepository.listAllDetailOrder(query.orderCode);
  }
}

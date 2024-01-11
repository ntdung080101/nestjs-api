import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { OrderEntity } from '../../../store/entities/order.entity';
import { OrderRepository } from '../../../store/repositories/order.repository';
import { ListOrderByTypeQuery } from '../impl';

@QueryHandler(ListOrderByTypeQuery)
export class ListOrderByTypeHandler
  implements IQueryHandler<ListOrderByTypeQuery>
{
  private readonly logger = new Logger(ListOrderByTypeHandler.name);

  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(
    query: ListOrderByTypeQuery,
  ): Promise<Array<OrderEntity> | Error> {
    this.logger.verbose('.execute', { query });

    return this.orderRepository.listAllOrderByType(query.type);
  }
}

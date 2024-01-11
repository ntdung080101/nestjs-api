import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { OrderEntity } from '../../../store/entities/order.entity';
import { OrderRepository } from '../../../store/repositories/order.repository';
import { ListOrderOfMeQuery } from '../impl';

@QueryHandler(ListOrderOfMeQuery)
export class ListOrderOfMeHandler implements IQueryHandler<ListOrderOfMeQuery> {
  private readonly logger = new Logger(ListOrderOfMeHandler.name);

  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(
    query: ListOrderOfMeQuery,
  ): Promise<Array<OrderEntity> | Error> {
    this.logger.verbose('.execute', { query });

    return this.orderRepository.listOrderOfMe(query.userId);
  }
}

import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { OrderEntity } from '../../../store/entities/order.entity';
import { OrderRepository } from '../../../store/repositories/order.repository';
import { ListAllOrderQuery } from '../impl';

@QueryHandler(ListAllOrderQuery)
export class ListAllOrderHandler implements IQueryHandler<ListAllOrderQuery> {
  private readonly logger = new Logger(ListAllOrderQuery.name);

  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(query: ListAllOrderQuery): Promise<Array<OrderEntity> | Error> {
    this.logger.verbose('.execute', { query });

    return this.orderRepository.listAllOrder();
  }
}

import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { OrderEntity } from '../../../store/entities/order.entity';
import { OrderRepository } from '../../../store/repositories/order.repository';
import { GetOneOrderQuery } from '../impl';

@QueryHandler(GetOneOrderQuery)
export class GetOneOrderHandler implements IQueryHandler<GetOneOrderQuery> {
  private readonly logger = new Logger(GetOneOrderHandler.name);

  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(query: GetOneOrderQuery): Promise<OrderEntity | Error> {
    this.logger.verbose('.execute', { query });

    return this.orderRepository.findOneOrder(query.code);
  }
}

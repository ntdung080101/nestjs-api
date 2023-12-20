import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { OrderRepository } from '../../../store/repositories/order.repository';
import { CreateOrderCommand } from '../impl';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  private readonly logger = new Logger(CreateOrderHandler.name);

  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(query: CreateOrderCommand): Promise<boolean | Error> {
    this.logger.verbose('.execute', { query });

    return this.orderRepository.createOrder(
      query.name,
      query.phoneNumber,
      query.discount,
      query.address,
      query.customerCode,
    );
  }
}

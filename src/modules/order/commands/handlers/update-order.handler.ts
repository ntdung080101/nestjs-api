import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { OrderRepository } from '../../../store/repositories/order.repository';
import { UpdateOrderCommand } from '../impl';

@CommandHandler(UpdateOrderCommand)
export class UpdateOrderHandler implements ICommandHandler<UpdateOrderCommand> {
  private readonly logger = new Logger(UpdateOrderHandler.name);

  constructor(private readonly orderRepository: OrderRepository) {}
  async execute(query: UpdateOrderCommand): Promise<boolean | Error> {
    this.logger.verbose('.execute', { query });

    return this.orderRepository.updateOrder(
      query.code,
      query.name,
      query.phoneNumber,
      query.discount,
      query.address,
      query.customerCode,
      query.statusOrder,
    );
  }
}

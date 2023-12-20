import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { OrderRepository } from '../../../store/repositories/order.repository';
import { DeleteOrderCommand } from '../impl';

@CommandHandler(DeleteOrderCommand)
export class DeleteOrderHandler implements ICommandHandler<DeleteOrderCommand> {
  private readonly logger = new Logger(DeleteOrderHandler.name);

  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(query: DeleteOrderCommand): Promise<boolean | Error> {
    this.logger.verbose('.execute', { query });

    return this.orderRepository.deleteOrder(query.code);
  }
}

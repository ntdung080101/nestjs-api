import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DetailOrderRepository } from '../../../store/repositories/detail-order.repository';
import { UpdateDetailOrderCommand } from '../impl';

@CommandHandler(UpdateDetailOrderCommand)
export class UpdateDetailOrderHandler
  implements ICommandHandler<UpdateDetailOrderCommand>
{
  private readonly logger = new Logger(UpdateDetailOrderHandler.name);

  constructor(private readonly detailOrderRepository: DetailOrderRepository) {}
  async execute(query: UpdateDetailOrderCommand): Promise<boolean | Error> {
    this.logger.verbose('.execute', { query });

    return this.detailOrderRepository.updateDetailOrder(
      query.code,
      query.orderCode,
      query.count,
      query.price,
    );
  }
}

import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DetailOrderRepository } from '../../../store/repositories/detail-order.repository';
import { DeleteDetailOrderCommand } from '../impl';

@CommandHandler(DeleteDetailOrderCommand)
export class DeleteDetailOrderHandler
  implements ICommandHandler<DeleteDetailOrderCommand>
{
  private readonly logger = new Logger(DeleteDetailOrderHandler.name);

  constructor(private readonly detailOrderRepository: DetailOrderRepository) {}

  async execute(query: DeleteDetailOrderCommand): Promise<boolean | Error> {
    this.logger.verbose('.execute', { query });

    return this.detailOrderRepository.deleteDetailOrder(query.code);
  }
}

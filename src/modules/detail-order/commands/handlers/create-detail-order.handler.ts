import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DetailOrderRepository } from '../../../store/repositories/detail-order.repository';
import { CreateDetailOrderCommand } from '../impl';

@CommandHandler(CreateDetailOrderCommand)
export class CreateDetailOrderHandler
  implements ICommandHandler<CreateDetailOrderCommand>
{
  private readonly logger = new Logger(CreateDetailOrderHandler.name);

  constructor(private readonly detailOrderRepository: DetailOrderRepository) {}

  async execute(query: CreateDetailOrderCommand): Promise<boolean | Error> {
    this.logger.verbose('.execute', { query });

    for (let index = 0; index < query.productCode.length; index++) {
      const productCode = query.productCode[index];

      await this.detailOrderRepository.createDetailOrder(
        query.orderCode,
        productCode,
        query.count,
        query.price,
      );
    }

    return true;
  }
}

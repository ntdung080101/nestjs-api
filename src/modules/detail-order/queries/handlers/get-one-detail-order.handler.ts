import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { DetailOrderEntity } from '../../../store/entities/detail-order.entity';
import { DetailOrderRepository } from '../../../store/repositories/detail-order.repository';
import { GetOneDetailOrderQuery } from '../impl';

@QueryHandler(GetOneDetailOrderQuery)
export class GetOneDetailOrderHandler
  implements IQueryHandler<GetOneDetailOrderQuery>
{
  private readonly logger = new Logger(GetOneDetailOrderHandler.name);

  constructor(private readonly detailOrderRepository: DetailOrderRepository) {}

  async execute(
    query: GetOneDetailOrderQuery,
  ): Promise<DetailOrderEntity | Error> {
    this.logger.verbose('.execute', { query });

    return this.detailOrderRepository.getOneDetailOrder(query.code);
  }
}

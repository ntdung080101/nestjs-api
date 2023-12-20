import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { RateEntity } from '../../../store/entities/rate.entity';
import { RateRepository } from '../../../store/repositories/rate.repository';
import { ListAllRateQuery } from '../impl';

@QueryHandler(ListAllRateQuery)
export class ListAllRateHandler implements IQueryHandler<ListAllRateQuery> {
  private readonly logger = new Logger(ListAllRateQuery.name);

  constructor(private readonly rateRepository: RateRepository) {}

  async execute(query: ListAllRateQuery): Promise<Array<RateEntity> | Error> {
    this.logger.verbose('.execute', { query });

    return this.rateRepository.listAllRate(query.productCode);
  }
}

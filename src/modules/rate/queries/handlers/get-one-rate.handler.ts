import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { RateEntity } from '../../../store/entities/rate.entity';
import { RateRepository } from '../../../store/repositories/rate.repository';
import { GetOneRateQuery } from '../impl';

@QueryHandler(GetOneRateQuery)
export class GetOneRateHandler implements IQueryHandler<GetOneRateQuery> {
  private readonly logger = new Logger(GetOneRateHandler.name);

  constructor(private readonly rateRepository: RateRepository) {}

  async execute(query: GetOneRateQuery): Promise<RateEntity | Error> {
    this.logger.verbose('.execute', { query });

    return this.rateRepository.getOneRate(query.code);
  }
}

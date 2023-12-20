import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RateRepository } from '../../../store/repositories/rate.repository';
import { CreateRateCommand } from '../impl';

@CommandHandler(CreateRateCommand)
export class CreateRateHandler implements ICommandHandler<CreateRateCommand> {
  private readonly logger = new Logger(CreateRateHandler.name);

  constructor(private readonly rateRepository: RateRepository) {}

  async execute(query: CreateRateCommand): Promise<boolean | Error> {
    this.logger.verbose('.execute', { query });

    return this.rateRepository.createRate(
      query.score,
      query.productCode,
      query.customerCode,
    );
  }
}

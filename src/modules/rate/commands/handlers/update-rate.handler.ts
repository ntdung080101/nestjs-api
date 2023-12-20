import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RateRepository } from '../../../store/repositories/rate.repository';
import { UpdateRateCommand } from '../impl';

@CommandHandler(UpdateRateCommand)
export class UpdateRateHandler implements ICommandHandler<UpdateRateCommand> {
  private readonly logger = new Logger(UpdateRateHandler.name);

  constructor(private readonly rateRepository: RateRepository) {}
  async execute(query: UpdateRateCommand): Promise<boolean | Error> {
    this.logger.verbose('.execute', { query });

    return this.rateRepository.updateRate(
      query.code,
      query.score,
      query.customerCode,
    );
  }
}

import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RateRepository } from '../../../store/repositories/rate.repository';
import { DeleteRateCommand } from '../impl';

@CommandHandler(DeleteRateCommand)
export class DeleteRateHandler implements ICommandHandler<DeleteRateCommand> {
  private readonly logger = new Logger(DeleteRateHandler.name);

  constructor(private readonly rateRepository: RateRepository) {}

  async execute(query: DeleteRateCommand): Promise<boolean | Error> {
    this.logger.verbose('.execute', { query });

    return this.rateRepository.deleteRate(query.code, query.customerCode);
  }
}

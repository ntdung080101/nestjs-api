import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ShiftRepository } from '../../../store/repositories/shift.repository';
import { CreateShiftCommand } from '../impl';

@CommandHandler(CreateShiftCommand)
export class CreateShiftHandler implements ICommandHandler<CreateShiftCommand> {
  private readonly logger = new Logger(CreateShiftHandler.name);

  constructor(private readonly shiftRepository: ShiftRepository) {}

  async execute(query: CreateShiftCommand): Promise<boolean | Error> {
    this.logger.verbose('.execute', { query });

    return this.shiftRepository.createShift(
      query.name,
      query.staffCode,
      query.salary,
      query.startTime,
      query.endTime,
    );
  }
}

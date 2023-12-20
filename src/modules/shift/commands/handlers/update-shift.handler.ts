import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ShiftRepository } from '../../../store/repositories/shift.repository';
import { UpdateShiftCommand } from '../impl';

@CommandHandler(UpdateShiftCommand)
export class UpdateShiftHandler implements ICommandHandler<UpdateShiftCommand> {
  private readonly logger = new Logger(UpdateShiftHandler.name);

  constructor(private readonly shiftRepository: ShiftRepository) {}

  async execute(query: UpdateShiftCommand): Promise<boolean | Error> {
    this.logger.verbose('.execute', { query });

    return this.shiftRepository.updateShift(
      query.code,
      query.name,
      query.staffCode,
      query.salary,
      query.startTime,
      query.endTime,
    );
  }
}

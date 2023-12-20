import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ShiftRepository } from '../../../store/repositories/shift.repository';
import { DeleteShiftCommand } from '../impl';

@CommandHandler(DeleteShiftCommand)
export class DeleteShiftHandler implements ICommandHandler<DeleteShiftCommand> {
  private readonly logger = new Logger(DeleteShiftHandler.name);

  constructor(private readonly shiftRepository: ShiftRepository) {}

  async execute(query: DeleteShiftCommand): Promise<boolean | Error> {
    this.logger.verbose('.execute', { query });

    return this.shiftRepository.deleteShift(query.code);
  }
}

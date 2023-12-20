import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { StaffRepository } from '../../../store/repositories';
import { DeleteStaffByCodeCommand } from '../impl';

@CommandHandler(DeleteStaffByCodeCommand)
export class DeleteStaffByCodeHandler
  implements ICommandHandler<DeleteStaffByCodeCommand>
{
  private readonly logger = new Logger(DeleteStaffByCodeHandler.name);

  constructor(private readonly staffRepository: StaffRepository) {}

  async execute(query: DeleteStaffByCodeCommand): Promise<boolean | Error> {
    this.logger.verbose('execute', { query });

    return this.staffRepository.deleteStaffByCode(query.code);
  }
}

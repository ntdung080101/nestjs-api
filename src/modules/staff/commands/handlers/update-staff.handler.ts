import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { StaffRepository } from '../../../store/repositories';
import { UpdateStaffCommand } from '../impl';

@CommandHandler(UpdateStaffCommand)
export class UpdateStaffHandler implements ICommandHandler<UpdateStaffCommand> {
  private readonly logger = new Logger(UpdateStaffHandler.name);

  constructor(private readonly staffRepository: StaffRepository) {}

  async execute(query: UpdateStaffCommand): Promise<boolean | Error> {
    this.logger.verbose('execute', { query });

    return this.staffRepository.updateStaff(
      query.code,
      query.name,
      query.address,
      query.phoneNumber,
      query.gender,
      query.role,
      query.avatar,
    );
  }
}

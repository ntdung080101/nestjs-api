import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { StaffRepository } from '../../../store/repositories';
import { CreateStaffCommand } from '../impl';

@CommandHandler(CreateStaffCommand)
export class CreateStaffHandler implements ICommandHandler<CreateStaffCommand> {
  private readonly logger = new Logger(CreateStaffHandler.name);

  constructor(private readonly staffRepository: StaffRepository) {}
  async execute(query: CreateStaffCommand): Promise<boolean | Error> {
    this.logger.verbose('execute', { query });

    return this.staffRepository.createStaff(
      query.name,
      query.address,
      query.gender,
      query.phoneNumber,
      query.role,
      query.accountCode,
      query.image,
    );
  }
}

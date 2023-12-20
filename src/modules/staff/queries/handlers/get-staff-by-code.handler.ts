import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { StaffEntity } from '../../../store/entities/staff.entity';
import { StaffRepository } from '../../../store/repositories';
import { GetStaffByCodeQuery } from '../impl';

@QueryHandler(GetStaffByCodeQuery)
export class GetStaffByCodeHandler
  implements IQueryHandler<GetStaffByCodeQuery>
{
  private readonly logger = new Logger(GetStaffByCodeHandler.name);

  constructor(private readonly staffRepository: StaffRepository) {}

  async execute(query: GetStaffByCodeQuery): Promise<StaffEntity | Error> {
    this.logger.verbose('execute', { query });

    return this.staffRepository.findOneStaffByCode(query.code);
  }
}

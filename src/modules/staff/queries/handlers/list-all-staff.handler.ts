import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { StaffEntity } from '../../../store/entities/staff.entity';
import { StaffRepository } from '../../../store/repositories';
import { ListAllStaffQuery } from '../impl';

@QueryHandler(ListAllStaffQuery)
export class ListAllStaffHandler implements IQueryHandler<ListAllStaffQuery> {
  private readonly logger = new Logger(ListAllStaffHandler.name);

  constructor(private readonly staffRepository: StaffRepository) {}
  async execute(query: ListAllStaffQuery): Promise<Array<StaffEntity> | Error> {
    this.logger.verbose('.execute', { query });

    return this.staffRepository.listAllStaff();
  }
}

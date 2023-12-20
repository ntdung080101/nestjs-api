import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ShiftEntity } from '../../../store/entities/shift.entity';
import { ShiftRepository } from '../../../store/repositories/shift.repository';
import { ListAllShiftQuery } from '../impl';

@QueryHandler(ListAllShiftQuery)
export class ListAllShiftHandler implements IQueryHandler<ListAllShiftQuery> {
  private readonly logger = new Logger(ListAllShiftHandler.name);

  constructor(private readonly shiftRepository: ShiftRepository) {}

  async execute(query: ListAllShiftQuery): Promise<Array<ShiftEntity> | Error> {
    this.logger.verbose('.execute', { query });

    return this.shiftRepository.listAllShift();
  }
}

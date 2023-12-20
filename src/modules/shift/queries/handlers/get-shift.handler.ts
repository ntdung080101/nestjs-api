import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ShiftEntity } from '../../../store/entities/shift.entity';
import { ShiftRepository } from '../../../store/repositories/shift.repository';
import { GetShiftQuery } from '../impl';

@QueryHandler(GetShiftQuery)
export class GetShiftHandler implements IQueryHandler<GetShiftQuery> {
  private readonly logger = new Logger(GetShiftHandler.name);

  constructor(private readonly shiftRepository: ShiftRepository) {}

  async execute(query: GetShiftQuery): Promise<ShiftEntity | Error> {
    this.logger.verbose('.execute', { query });

    return this.shiftRepository.getOneShift(query.code);
  }
}

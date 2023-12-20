import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ProviderEntity } from '../../../store/entities/provider.entity';
import { ProviderRepository } from '../../../store/repositories/provider.repository';
import { GetOneProviderQuery } from '../impl';

@QueryHandler(GetOneProviderQuery)
export class GetOneProviderHandler
  implements IQueryHandler<GetOneProviderQuery>
{
  private readonly logger = new Logger(GetOneProviderHandler.name);

  constructor(private readonly providerRepository: ProviderRepository) {}

  async execute(query: GetOneProviderQuery): Promise<ProviderEntity | Error> {
    this.logger.verbose('.execute', { query });

    return this.providerRepository.getProviderByCode(query.code);
  }
}

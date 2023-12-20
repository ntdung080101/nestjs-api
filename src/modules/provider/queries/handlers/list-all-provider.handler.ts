import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ProviderEntity } from '../../../store/entities/provider.entity';
import { ProviderRepository } from '../../../store/repositories/provider.repository';
import { ListAllProviderQuery } from '../impl';

@QueryHandler(ListAllProviderQuery)
export class ListAllProviderHandler
  implements IQueryHandler<ListAllProviderQuery>
{
  private readonly logger = new Logger(ListAllProviderQuery.name);

  constructor(private readonly providerRepository: ProviderRepository) {}

  async execute(
    query: ListAllProviderQuery,
  ): Promise<Array<ProviderEntity> | Error> {
    this.logger.verbose('.execute', { query });

    return this.providerRepository.listAllProvider();
  }
}

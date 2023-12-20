import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ProviderRepository } from '../../../store/repositories/provider.repository';
import { CreateProviderCommand } from '../impl';

@CommandHandler(CreateProviderCommand)
export class CreateProviderHandler
  implements ICommandHandler<CreateProviderCommand>
{
  private readonly logger = new Logger(CreateProviderHandler.name);

  constructor(private readonly providerRepository: ProviderRepository) {}

  async execute(query: CreateProviderCommand): Promise<boolean | Error> {
    this.logger.verbose('.execute', { query });

    return this.providerRepository.createProvider(
      query.name,
      query.address,
      query.phoneNumber,
    );
  }
}

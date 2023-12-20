import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ProviderRepository } from '../../../store/repositories/provider.repository';
import { UpdateProviderCommand } from '../impl';

@CommandHandler(UpdateProviderCommand)
export class UpdateProviderHandler
  implements ICommandHandler<UpdateProviderCommand>
{
  private readonly logger = new Logger(UpdateProviderHandler.name);

  constructor(private readonly providerRepository: ProviderRepository) {}
  async execute(query: UpdateProviderCommand): Promise<boolean | Error> {
    this.logger.verbose('.execute', { query });

    return this.providerRepository.updateProvider(
      query.code,
      query.name,
      query.address,
      query.phoneNumber,
    );
  }
}

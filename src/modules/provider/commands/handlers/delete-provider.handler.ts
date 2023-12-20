import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ProviderRepository } from '../../../store/repositories/provider.repository';
import { DeleteProviderCommand } from '../impl';

@CommandHandler(DeleteProviderCommand)
export class DeleteProviderHandler
  implements ICommandHandler<DeleteProviderCommand>
{
  private readonly logger = new Logger(DeleteProviderHandler.name);

  constructor(private readonly providerRepository: ProviderRepository) {}

  async execute(query: DeleteProviderCommand): Promise<boolean | Error> {
    this.logger.verbose('.execute', { query });

    return this.providerRepository.deleteProvider(query.code);
  }
}

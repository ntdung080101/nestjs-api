import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { hashing } from '../../../../utils/hashing';
import { AccountEntity } from '../../../store/entities';
import { AccountRepository } from '../../../store/repositories';
import { DeleteAccountCommand } from '../impl';

@CommandHandler(DeleteAccountCommand)
export class DeleteAccountHandler
  implements ICommandHandler<DeleteAccountCommand>
{
  private readonly logger = new Logger(DeleteAccountHandler.name);
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(query: DeleteAccountCommand): Promise<boolean | Error> {
    this.logger.verbose('.execute', { query });

    return this.accountRepository.deleteAccount(query.code);
  }
}

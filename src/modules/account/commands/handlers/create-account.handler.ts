import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { hashing } from '../../../../utils/hashing';
import { AccountEntity } from '../../../store/entities';
import { AccountRepository } from '../../../store/repositories';
import { CreateAccountCommand } from '../impl';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler
  implements ICommandHandler<CreateAccountCommand>
{
  private readonly logger = new Logger(CreateAccountHandler.name);
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(query: CreateAccountCommand): Promise<AccountEntity | Error> {
    try {
      this.logger.verbose('.execute', { query });

      const hashPassword = await hashing(query.password);
      return this.accountRepository.createAccount(
        query.gmail,
        hashPassword,
        query.role,
      );
    } catch (e) {
      this.logger.error((e as Error).message);

      return e as Error;
    }
  }
}

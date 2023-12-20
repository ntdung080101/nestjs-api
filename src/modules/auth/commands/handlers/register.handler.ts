import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AccountRepository } from '../../../store/repositories';
import { RegisterCommand } from '../impl';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  private readonly logger = new Logger(RegisterHandler.name);

  constructor(private readonly taiKhoanRepository: AccountRepository) {}

  async execute({ gmail, password }: RegisterCommand): Promise<unknown> {
    try {
      this.logger.verbose('.execute', { gmail, password });
    } catch (e) {
      this.logger.error((e as Error).message);

      return e;
    }
  }
}

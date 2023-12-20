import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { StoreModule } from '../store/store.module';
import { AccountController } from './account.controller';
import { ACCOUNT_COMMAND_HANDLERS } from './commands/handlers';

@Module({
  imports: [CqrsModule, StoreModule],
  providers: ACCOUNT_COMMAND_HANDLERS,
  controllers: [AccountController],
})
export class AccountModule {}

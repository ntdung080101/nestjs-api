import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { StoreModule } from '../store/store.module';
import { ACCOUNT_COMMAND_HANDLERS } from './commands/handlers';

@Module({
  imports: [CqrsModule, StoreModule],
  providers: ACCOUNT_COMMAND_HANDLERS,
})
export class AccountModule {}

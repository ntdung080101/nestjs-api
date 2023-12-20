import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { StoreModule } from '../store/store.module';
import { CUSTOMER_COMMAND_HANDLERS } from './commands/handlers';
import { CustomerController } from './customer.controller';

@Module({
  imports: [CqrsModule, StoreModule],
  controllers: [CustomerController],
  providers: CUSTOMER_COMMAND_HANDLERS,
})
export class CustomerModule {}

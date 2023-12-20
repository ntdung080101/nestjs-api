import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { StoreModule } from '../store/store.module';
import { STAFF_COMMAND_HANDLERS } from './commands/handlers';
import { STAFF_QUERY_HANDLERS } from './queries/handlers';
import { StaffController } from './staff.controller';

@Module({
  imports: [StoreModule, CqrsModule],
  providers: [...STAFF_COMMAND_HANDLERS, ...STAFF_QUERY_HANDLERS],
  controllers: [StaffController],
})
export class StaffModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'staff/update', method: RequestMethod.PUT })
      .apply(AuthMiddleware)
      .forRoutes({ path: 'staff/create', method: RequestMethod.POST })
      .apply(AuthMiddleware)
      .forRoutes({ path: 'staff/delete', method: RequestMethod.DELETE });
  }
}

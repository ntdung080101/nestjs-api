import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { StoreModule } from '../store/store.module';
import { SHIFT_COMMAND_HANDLERS } from './commands/handlers';
import { SHIFT_QUERY_HANDLERS } from './queries/handlers';
import { ShiftController } from './shift.controller';

@Module({
  imports: [CqrsModule, StoreModule],
  controllers: [ShiftController],
  providers: [...SHIFT_COMMAND_HANDLERS, ...SHIFT_QUERY_HANDLERS],
})
export class ShiftModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'shift/update', method: RequestMethod.PUT })
      .apply(AuthMiddleware)
      .forRoutes({ path: 'shift/create', method: RequestMethod.POST })
      .apply(AuthMiddleware)
      .forRoutes({ path: 'shift/delete', method: RequestMethod.DELETE });
  }
}

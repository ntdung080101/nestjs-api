import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { StoreModule } from '../store/store.module';
import { ORDER_COMMAND_HANDLERS } from './commands/handlers';
import { OrderController } from './order.controller';
import { ORDER_QUERY_HANDLERS } from './queries/handlers';

@Module({
  imports: [CqrsModule, StoreModule],
  providers: [...ORDER_COMMAND_HANDLERS, ...ORDER_QUERY_HANDLERS],
  controllers: [OrderController],
})
export class OrderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'order/update', method: RequestMethod.PUT })
      .apply(AuthMiddleware)
      .forRoutes({ path: 'order/list-order-of-me', method: RequestMethod.GET })
      .apply(AuthMiddleware)
      .forRoutes({ path: 'order/create', method: RequestMethod.POST })
      .apply(AuthMiddleware)
      .forRoutes({ path: 'order/delete', method: RequestMethod.DELETE });
  }
}

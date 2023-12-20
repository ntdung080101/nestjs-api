import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { StoreModule } from '../store/store.module';
import { DETAIL_ORDER_COMMAND_HANDLERS } from './commands/handlers';
import { DetailOrderController } from './detail-order.controller';
import { DETAIL_ORDER_QUERY_HANDLERS } from './queries/handlers';

@Module({
  imports: [CqrsModule, StoreModule],
  providers: [...DETAIL_ORDER_COMMAND_HANDLERS, ...DETAIL_ORDER_QUERY_HANDLERS],
  controllers: [DetailOrderController],
})
export class DetailOrderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'detail-order/update', method: RequestMethod.PUT })
      .apply(AuthMiddleware)
      .forRoutes({ path: 'detail-order/create', method: RequestMethod.POST })
      .apply(AuthMiddleware)
      .forRoutes({ path: 'detail-order/delete', method: RequestMethod.DELETE });
  }
}

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { StoreModule } from '../store/store.module';
import { RATE_COMMAND_HANDLERS } from './commands/handlers';
import { RATE_QUERY_HANDLERS } from './queries/handlers';
import { RateController } from './rate.controller';

@Module({
  imports: [CqrsModule, StoreModule],
  providers: [...RATE_COMMAND_HANDLERS, ...RATE_QUERY_HANDLERS],
  controllers: [RateController],
})
export class RateModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'rate/update', method: RequestMethod.PUT })
      .apply(AuthMiddleware)
      .forRoutes({ path: 'rate/create', method: RequestMethod.POST })
      .apply(AuthMiddleware)
      .forRoutes({ path: 'rate/delete', method: RequestMethod.DELETE });
  }
}

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { StoreModule } from '../store/store.module';
import { PROVIDER_COMMAND_HANDLERS } from './commands/handlers';
import { ProviderController } from './provider.controller';
import { PROVIDER_QUERY_HANDLERS } from './queries/handlers';

@Module({
  imports: [CqrsModule, StoreModule],
  controllers: [ProviderController],
  providers: [...PROVIDER_COMMAND_HANDLERS, ...PROVIDER_QUERY_HANDLERS],
})
export class ProviderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'provider/update', method: RequestMethod.PUT })
      .apply(AuthMiddleware)
      .forRoutes({ path: 'provider/create', method: RequestMethod.POST })
      .apply(AuthMiddleware)
      .forRoutes({ path: 'provider/delete', method: RequestMethod.DELETE });
  }
}

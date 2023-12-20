import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { StoreModule } from '../store/store.module';
import { CategoryController } from './category.controller';
import { CATEGORY_COMMAND_HANDLERS } from './commands/handlers';
import { CATEGORY_QUERY_HANDLERS } from './queries/handlers';

@Module({
  imports: [CqrsModule, StoreModule],
  providers: [...CATEGORY_QUERY_HANDLERS, ...CATEGORY_COMMAND_HANDLERS],
  controllers: [CategoryController],
})
export class CategoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'category/update', method: RequestMethod.PUT })
      .apply(AuthMiddleware)
      .forRoutes({ path: 'category/create', method: RequestMethod.POST })
      .apply(AuthMiddleware)
      .forRoutes({ path: 'category/delete', method: RequestMethod.DELETE });
  }
}

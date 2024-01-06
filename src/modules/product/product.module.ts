import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MulterModule } from '@nestjs/platform-express';

import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { StoreModule } from '../store/store.module';
import { PRODUCT_COMMAND_HANDLERS } from './commands/handlers';
import { ProductController } from './product.controller';
import { PRODUCT_QUERY_HANDLERS } from './queries/handlers';

@Module({
  imports: [
    CqrsModule,
    StoreModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: 'access',
      }),
    }),
  ],
  providers: [...PRODUCT_COMMAND_HANDLERS, ...PRODUCT_QUERY_HANDLERS],
  controllers: [ProductController],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'product/update', method: RequestMethod.PUT })
      .apply(AuthMiddleware)
      .forRoutes({ path: 'product/create', method: RequestMethod.POST })
      .apply(AuthMiddleware)
      .forRoutes({ path: 'product/delete', method: RequestMethod.DELETE });
  }
}

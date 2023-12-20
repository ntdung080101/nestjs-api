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
import { PRODUCT_IMAGE_COMMAND_HANDLERS } from './commands/handlers';
import { ProductImageController } from './product-image.controller';
import { PRODUCT_IMAGE_QUERY_HANDLERS } from './queries/handlers';

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
  providers: [
    ...PRODUCT_IMAGE_COMMAND_HANDLERS,
    ...PRODUCT_IMAGE_QUERY_HANDLERS,
  ],
  controllers: [ProductImageController],
})
export class ProductImageModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'product-image/update', method: RequestMethod.PUT })
      .apply(AuthMiddleware)
      .forRoutes({ path: 'product-image/create', method: RequestMethod.POST })
      .apply(AuthMiddleware);
    // .forRoutes({
    //   path: 'product-image/delete',
    //   method: RequestMethod.DELETE,
    // });
  }
}

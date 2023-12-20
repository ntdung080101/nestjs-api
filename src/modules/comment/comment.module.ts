import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { StoreModule } from '../store/store.module';
import { COMMENT_COMMAND_HANDLERS } from './commands/handlers';
import { CommentController } from './comment.controller';
import { COMMENT_QUERY_HANDLERS } from './queries/handlers';

@Module({
  imports: [CqrsModule, StoreModule],
  controllers: [CommentController],
  providers: [...COMMENT_COMMAND_HANDLERS, ...COMMENT_QUERY_HANDLERS],
})
export class CommentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'comment/update', method: RequestMethod.PUT })
      .apply(AuthMiddleware)
      .forRoutes({ path: 'comment/create', method: RequestMethod.POST })
      .apply(AuthMiddleware)
      .forRoutes({ path: 'comment/delete', method: RequestMethod.DELETE });
  }
}

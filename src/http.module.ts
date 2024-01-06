import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { CommentModule } from './modules/comment/comment.module';
import { CustomerModule } from './modules/customer/customer.module';
import { DetailOrderModule } from './modules/detail-order/detail-order.module';
import { ImageModule } from './modules/image/image.module';
import { MailModule } from './modules/mail/mail.module';
import { OrderModule } from './modules/order/order.module';
import { ProductModule } from './modules/product/product.module';
import { ProductImageModule } from './modules/product-image/product-image.module';
import { ProviderModule } from './modules/provider/provider.module';
import { RateModule } from './modules/rate/rate.module';
import { ShiftModule } from './modules/shift/shift.module';
import { StaffModule } from './modules/staff/staff.module';
import { StoreModule } from './modules/store/store.module';
import { loadConfiguration } from './utils/load-configuration';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'access'), // <-- path to the static files
    }),
    CqrsModule,
    StoreModule,
    AuthModule,
    CacheModule.register({
      ttl: 600, // 60s * 10
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      load: [loadConfiguration],
      isGlobal: true,
    }),
    MailModule,
    AccountModule,
    CategoryModule,
    CustomerModule,
    StaffModule,
    ProviderModule,
    ShiftModule,
    RateModule,
    CommentModule,
    OrderModule,
    ProductModule,
    ProductImageModule,
    DetailOrderModule,
    ImageModule,
  ],
  controllers: [],
  providers: [],
})
export class HttpModule {}

import { AccountEntity } from './account.entity';
import { BillEntity } from './bill.entity';
import { CategoryEntity } from './category.entity';
import { CommentEntity } from './comment.entity';
import { CouponEntity } from './coupon.entity';
import { CouponDetailEntity } from './coupon-detail.entity';
import { CustomerEntity } from './customer.entity';
import { DetailOrderEntity } from './detail-order.entity';
import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';
import { ProductImageEntity } from './product-image.entity';
import { ProviderEntity } from './provider.entity';
import { RateEntity } from './rate.entity';
import { ShiftEntity } from './shift.entity';
import { StaffEntity } from './staff.entity';

export * from './account.entity';

export const DatabaseEntity = [
  AccountEntity,
  StaffEntity,
  CustomerEntity,
  ProductEntity,
  CouponEntity,
  OrderEntity,
  ProviderEntity,
  CategoryEntity,
  BillEntity,
  ProductImageEntity,
  RateEntity,
  CouponDetailEntity,
  DetailOrderEntity,
  ShiftEntity,
  CommentEntity,
];

import { AccountRepository } from './account.repository';
import { CategoryRepository } from './category.repository';
import { CommentRepository } from './comment.repository';
import { CustomerRepository } from './customer.repository';
import { DetailOrderRepository } from './detail-order.repository';
import { OrderRepository } from './order.repository';
import { ProductRepository } from './product.repository';
import { ProductImageRepository } from './product-image.repository';
import { ProviderRepository } from './provider.repository';
import { RateRepository } from './rate.repository';
import { ShiftRepository } from './shift.repository';
import { StaffRepository } from './staff.repository';

export * from './account.repository';
export * from './customer.repository';
export * from './staff.repository';
export const DatabaseRepositories = [
  AccountRepository,
  StaffRepository,
  CustomerRepository,
  CategoryRepository,
  ProviderRepository,
  ShiftRepository,
  RateRepository,
  CommentRepository,
  ProductRepository,
  ProductImageRepository,
  OrderRepository,
  DetailOrderRepository,
];

import { GetOneProductHandler } from './get-one-product.handler';
import { ListAllProductHandler } from './list-all-product.handler';

export const PRODUCT_QUERY_HANDLERS = [
  ListAllProductHandler,
  GetOneProductHandler,
];

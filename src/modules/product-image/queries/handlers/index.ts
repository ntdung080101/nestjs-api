import { GetProductImageHandler } from './get-product-image.handler';
import { ListProductImageHandler } from './list-product-image.handler';

export const PRODUCT_IMAGE_QUERY_HANDLERS = [
  ListProductImageHandler,
  GetProductImageHandler,
];

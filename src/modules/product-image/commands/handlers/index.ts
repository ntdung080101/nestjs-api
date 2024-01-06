import { CreateProductImageHandler } from './create-product-image.handler';
import { DeleteProductImageHandler } from './delete-product-image.handler';
import { UpdateProductImageHandler } from './update-product-image.handler';

export const PRODUCT_IMAGE_COMMAND_HANDLERS = [
  CreateProductImageHandler,
  DeleteProductImageHandler,
  UpdateProductImageHandler,
];

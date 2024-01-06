import { GetCategoryHandler } from './get-category.handler';
import { ListCategoryHandler } from './list-category.handler';

export const CATEGORY_QUERY_HANDLERS = [
  ListCategoryHandler,
  GetCategoryHandler,
];

import { GetOneOrderHandler } from './get-one-order.handler';
import { ListAllOrderHandler } from './list-all-order.handler';
import { ListOrderByTypeHandler } from './list-order-by-type.handler';
import { ListOrderOfMeHandler } from './list-order-of-me.handler';

export const ORDER_QUERY_HANDLERS = [
  ListAllOrderHandler,
  GetOneOrderHandler,
  ListOrderByTypeHandler,
  ListOrderOfMeHandler,
];

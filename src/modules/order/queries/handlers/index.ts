import { GetOneOrderHandler } from './get-one-order.handler';
import { ListAllOrderHandler } from './list-all-order.handler';

export const ORDER_QUERY_HANDLERS = [ListAllOrderHandler, GetOneOrderHandler];

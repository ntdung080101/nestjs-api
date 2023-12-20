import { GetOneDetailOrderHandler } from './get-one-detail-order.handler';
import { ListAllDetailOrderHandler } from './list-all-detail-order.handler';

export const DETAIL_ORDER_QUERY_HANDLERS = [
  ListAllDetailOrderHandler,
  GetOneDetailOrderHandler,
];

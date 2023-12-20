import { CreateDetailOrderHandler } from './create-detail-order.handler';
import { DeleteDetailOrderHandler } from './delete-detail-order.handler';
import { UpdateDetailOrderHandler } from './update-detail-order.handler';

export const DETAIL_ORDER_COMMAND_HANDLERS = [
  CreateDetailOrderHandler,
  UpdateDetailOrderHandler,
  DeleteDetailOrderHandler,
];

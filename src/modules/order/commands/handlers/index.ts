import { CreateOrderHandler } from './create-order.handler';
import { DeleteOrderHandler } from './delete-order.handler';
import { UpdateOrderHandler } from './update-order.handler';

export const ORDER_COMMAND_HANDLERS = [
  CreateOrderHandler,
  UpdateOrderHandler,
  DeleteOrderHandler,
];

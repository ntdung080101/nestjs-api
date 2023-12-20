import { CreateRateHandler } from './create-rate.handler';
import { DeleteRateHandler } from './delete-rate.handler';
import { UpdateRateHandler } from './update-rate.handler';

export const RATE_COMMAND_HANDLERS = [
  CreateRateHandler,
  UpdateRateHandler,
  DeleteRateHandler,
];

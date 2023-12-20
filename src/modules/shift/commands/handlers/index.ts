import { CreateShiftHandler } from './create-shift.handler';
import { DeleteShiftHandler } from './delete-shift.handler';
import { UpdateShiftHandler } from './update-shift.handler';

export const SHIFT_COMMAND_HANDLERS = [
  CreateShiftHandler,
  UpdateShiftHandler,
  DeleteShiftHandler,
];

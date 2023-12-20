import { CreateStaffHandler } from './create-staff.handler';
import { DeleteStaffByCodeHandler } from './delete-staff-by-code.handler';
import { UpdateStaffHandler } from './update-staff.handler';

export const STAFF_COMMAND_HANDLERS = [
  DeleteStaffByCodeHandler,
  UpdateStaffHandler,
  CreateStaffHandler,
];

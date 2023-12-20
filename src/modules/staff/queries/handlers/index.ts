import { GetStaffByCodeHandler } from './get-staff-by-code.handler';
import { ListAllStaffHandler } from './list-all-staff.handler';

export const STAFF_QUERY_HANDLERS = [
  ListAllStaffHandler,
  GetStaffByCodeHandler,
];

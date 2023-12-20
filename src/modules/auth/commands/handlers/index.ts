import { RegisterHandler } from './register.handler';
import { RegisterCustomerInformationHandler } from './register-customer-information.handler';

export const AUTH_COMMAND_HANDLERS = [
  RegisterHandler,
  RegisterCustomerInformationHandler,
];

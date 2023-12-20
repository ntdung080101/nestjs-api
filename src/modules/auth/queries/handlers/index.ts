import { CheckCustomerAccountHandler } from './check-customer-account.handler';
import { LoginHandler } from './login.handler';
import { VerifyRegisterCustomerHandler } from './verify-register-customer.handler';

export const AUTH_QUERY_HANDLERS = [
  LoginHandler,
  CheckCustomerAccountHandler,
  VerifyRegisterCustomerHandler,
];

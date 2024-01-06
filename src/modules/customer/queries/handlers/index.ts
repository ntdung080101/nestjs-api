import { GetCustomerHandler } from './get-customer.handler';
import { ListCustomerHandler } from './list-customer.handler';

export const QUERY_HANDLERS = [ListCustomerHandler, GetCustomerHandler];

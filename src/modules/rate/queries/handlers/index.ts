import { GetOneRateHandler } from './get-one-rate.handler';
import { ListAllRateHandler } from './list-all-rate.handler';

export const RATE_QUERY_HANDLERS = [ListAllRateHandler, GetOneRateHandler];

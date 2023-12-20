import { GetOneProviderHandler } from './get-one-provider.handler';
import { ListAllProviderHandler } from './list-all-provider.handler';

export const PROVIDER_QUERY_HANDLERS = [
  ListAllProviderHandler,
  GetOneProviderHandler,
];

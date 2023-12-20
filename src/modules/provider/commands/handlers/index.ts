import { CreateProviderHandler } from './create-provider.handler';
import { DeleteProviderHandler } from './delete-provider.handler';
import { UpdateProviderHandler } from './update-provider.handler';

export const PROVIDER_COMMAND_HANDLERS = [
  CreateProviderHandler,
  UpdateProviderHandler,
  DeleteProviderHandler,
];

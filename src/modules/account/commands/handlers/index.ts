import { CreateAccountHandler } from './create-account.handler';
import {DeleteAccountHandler} from "./delete-account.handler";

export const ACCOUNT_COMMAND_HANDLERS = [CreateAccountHandler,DeleteAccountHandler];

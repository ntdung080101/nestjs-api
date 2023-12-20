import { AccountRules } from '../../../../enums/role.enum';

export class CreateAccountCommand {
  constructor(
    public readonly gmail: string,
    public readonly password: string,
    public readonly role: AccountRules,
  ) {}
}

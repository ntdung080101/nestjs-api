import { AccountRules } from '../../../../enums/role.enum';

export class LoginQuery {
  constructor(
    public readonly username: string,
    public readonly password: string,
    public readonly role: AccountRules,
  ) {}
}

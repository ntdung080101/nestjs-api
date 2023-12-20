import { StaffRules } from '../../../../enums/role.enum';

export class UpdateStaffCommand {
  constructor(
    public readonly code: number,
    public readonly name: string,
    public readonly address: string,
    public readonly phoneNumber: string,
    public readonly gender: number,
    public readonly role: StaffRules,
  ) {}
}

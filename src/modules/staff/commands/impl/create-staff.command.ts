export class CreateStaffCommand {
  constructor(
    public readonly name: string,
    public readonly address: string,
    public readonly gender: number,
    public readonly phoneNumber: string,
    public readonly role: number,
    public readonly accountCode: number,
  ) {}
}

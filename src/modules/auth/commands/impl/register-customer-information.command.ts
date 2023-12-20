export class RegisterCustomerInformationCommand {
  constructor(
    public readonly name: string,
    public readonly address: string | undefined,
    public readonly phoneNumber: string,
    public readonly accountCode: number,
  ) {}
}

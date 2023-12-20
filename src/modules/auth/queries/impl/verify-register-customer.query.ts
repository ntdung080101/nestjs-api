export class VerifyRegisterCustomerQuery {
  constructor(
    public readonly gmail: string,
    public readonly code: string,
  ) {}
}

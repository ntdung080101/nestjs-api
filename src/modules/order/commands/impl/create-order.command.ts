export class CreateOrderCommand {
  constructor(
    public readonly name: string,
    public readonly phoneNumber: string,
    public readonly discount: number,
    public readonly address: string,
    public readonly customerCode: number,
  ) {}
}

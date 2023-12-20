export class UpdateOrderCommand {
  constructor(
    public readonly code: number,
    public readonly name: string,
    public readonly phoneNumber: string,
    public readonly discount: number,
    public readonly address: string,
    public readonly customerCode: number,
    public readonly statusOrder: number,
  ) {}
}

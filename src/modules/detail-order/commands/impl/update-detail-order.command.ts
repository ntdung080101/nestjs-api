export class UpdateDetailOrderCommand {
  constructor(
    public readonly code: number,
    public readonly price: number,
    public readonly count: number,
    public readonly orderCode: number,
    public readonly productCode: number,
  ) {}
}

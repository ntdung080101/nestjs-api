export class CreateDetailOrderCommand {
  constructor(
    public readonly price: number,
    public readonly count: number,
    public readonly orderCode: number,
    public readonly productCode: Array<number>,
  ) {}
}
